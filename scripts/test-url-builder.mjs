// Quick sanity check: extract recipes from the latest validation report,
// run them through buildCoeUrl(), print the generated URLs + completeness.
// Confirms the new &req= param works end-to-end without spending another
// Claude API call.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Import the URL builder — node 20+ can import .ts via the loader, but the
// safer path here is to inline the logic by importing the compiled JS. Since
// we don't have a separate build step for libs, we duplicate the import dance.
// (For Node ESM, we need to import the .ts source via a runtime that supports
// it; here we cheat by reading the runtime data files directly.)
const lookupTs = fs.readFileSync(path.join(root, "src/lib/coe-lookup.ts"), "utf-8");
const weightsTs = fs.readFileSync(path.join(root, "src/lib/mod-weights.ts"), "utf-8");

function extractConst(src, name) {
  // crude but works: find `export const NAME ... = {...}`
  const re = new RegExp(`export const ${name}[^=]*=\\s*(\\{[\\s\\S]*?\\});\\s*\\n(export|/\\*\\*|function|//)`, "m");
  const m = src.match(re);
  return m ? JSON.parse(m[1]) : null;
}

const COE_BITEMS = extractConst(lookupTs, "COE_BITEMS");
const COE_BASE_CATEGORIES = extractConst(lookupTs, "COE_BASE_CATEGORIES");
const COE_ESSENCES = extractConst(lookupTs, "COE_ESSENCES");
const COE_MOD_IDS = extractConst(lookupTs, "COE_MOD_IDS");
const COE_MOD_IDS_NORMALIZED = extractConst(lookupTs, "COE_MOD_IDS_NORMALIZED");
const MOD_DATA = extractConst(weightsTs, "MOD_DATA");

function normalize(name) {
  return name.toLowerCase().replace(/[#%+]/g, "").replace(/\s+to\s+/g, " ").replace(/\s+/g, " ").trim();
}

function lookupCoeBase(name) {
  return COE_BITEMS?.[name] ?? COE_BASE_CATEGORIES?.[name] ?? null;
}
function lookupCoeEssence(name) {
  if (!name) return null;
  const stripped = name.replace(/^(Greater|Perfect|Lesser|Normal)\s+/i, "");
  return COE_ESSENCES?.[stripped] ?? COE_ESSENCES?.[name] ?? null;
}
function lookupCoeModId(affix, name) {
  if (!name) return null;
  const key = `${affix.toUpperCase()}|${name}`;
  if (COE_MOD_IDS?.[key] != null) return COE_MOD_IDS[key];
  const nk = `${affix.toUpperCase()}|${normalize(name)}`;
  return COE_MOD_IDS_NORMALIZED?.[nk] ?? null;
}
// Pre-built normalized index for fuzzy mod-name matching — mirrors the
// runtime logic in src/lib/mod-weights.ts so this test reflects production.
const _normIndex = {};
function _getNorm(bk, tk) {
  if (!_normIndex[bk]) _normIndex[bk] = { PREFIX: {}, SUFFIX: {} };
  if (!Object.keys(_normIndex[bk][tk]).length) {
    const mods = MOD_DATA?.[bk]?.[tk] ?? {};
    for (const c of Object.keys(mods)) _normIndex[bk][tk][normalize(c)] = c;
  }
  return _normIndex[bk][tk];
}
function lookupModTier(baseName, type, modName, tier) {
  const bk = baseName?.toUpperCase();
  if (!bk) return null;
  const tk = type.toUpperCase();
  let e = MOD_DATA?.[bk]?.[tk]?.[modName];
  if (!e) {
    const canonical = _getNorm(bk, tk)[normalize(modName)];
    if (canonical) e = MOD_DATA[bk][tk][canonical];
  }
  if (!e) return null;
  return e.tiers[tier - 1] ?? null;
}
function parseTier(raw) {
  const m = String(raw ?? "").match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

function buildCoeUrl(recipe) {
  const params = ["game=poe2"];
  const missing = [];
  let completeness = "minimal";

  const base = lookupCoeBase(recipe.base);
  if (base) {
    params.push(`b=${base.b}`);
    if (base.bi != null) params.push(`bi=${base.bi}`);
    completeness = "partial";
  } else missing.push(`base "${recipe.base}"`);

  if (recipe.ilvl > 0) params.push(`lv=${recipe.ilvl}`);
  if (recipe.primaryMethod) params.push(`m=${recipe.primaryMethod}`);
  if (recipe.primaryMethod === "essence" && recipe.essence) {
    const eid = lookupCoeEssence(recipe.essence);
    if (eid != null) params.push(`e=${eid}`);
    else missing.push(`essence "${recipe.essence}"`);
  }
  if (base && recipe.primaryMethod) completeness = "full";

  const sheetBase = base?.bn ?? null;
  const entries = {};
  let group = 1, resolved = 0;
  const unresolved = [];
  for (const a of recipe.targetAffixes?.prefixes ?? []) {
    const modId = lookupCoeModId("prefix", a.name);
    const tier = parseTier(a.tier);
    const td = sheetBase && tier ? lookupModTier(sheetBase, "prefix", a.name, tier) : null;
    if (modId != null && td?.ilvl != null) { entries[modId] = { l: td.ilvl, g: group++ }; resolved++; }
    else unresolved.push({ type: "P", name: a.name, tier: a.tier });
  }
  for (const a of recipe.targetAffixes?.suffixes ?? []) {
    const modId = lookupCoeModId("suffix", a.name);
    const tier = parseTier(a.tier);
    const td = sheetBase && tier ? lookupModTier(sheetBase, "suffix", a.name, tier) : null;
    if (modId != null && td?.ilvl != null) { entries[modId] = { l: td.ilvl, g: group++ }; resolved++; }
    else unresolved.push({ type: "S", name: a.name, tier: a.tier });
  }
  if (resolved > 0) {
    params.push(`req=${encodeURIComponent(JSON.stringify(entries))}`);
    completeness = "complete";
  }
  return {
    url: `https://www.craftofexile.com/?${params.join("&")}`,
    completeness,
    missing,
    affixesResolved: resolved,
    affixesRequested: (recipe.targetAffixes?.prefixes?.length ?? 0) + (recipe.targetAffixes?.suffixes?.length ?? 0),
    unresolved,
    sheetBase,
  };
}

// Extract recipes from the latest validation report
const report = fs.readFileSync(path.join(root, "docs/validation-report.md"), "utf-8");
const tests = report.split(/^## (T\d+-[^\n]+)/m).slice(1);

console.log("=== URL builder validation ===\n");
for (let i = 0; i < tests.length; i += 2) {
  const title = tests[i];
  const body = tests[i + 1];
  const re = body.match(/```recipe\s*\n([\s\S]*?)\n```/);
  if (!re) { console.log(`${title}\n  no recipe block\n`); continue; }
  try {
    const recipe = JSON.parse(re[1]);
    const r = buildCoeUrl(recipe);
    console.log(title);
    console.log(`  base="${recipe.base}" → sheetBase="${r.sheetBase ?? "—"}"`);
    console.log(`  ${r.completeness.toUpperCase()} · affixes ${r.affixesResolved}/${r.affixesRequested} resolved`);
    if (r.unresolved.length) {
      console.log(`  unresolved:`);
      r.unresolved.forEach((u) => console.log(`    [${u.type}] ${JSON.stringify(u.name)} (tier ${u.tier})`));
    }
    console.log(`  URL: ${r.url.slice(0, 200)}${r.url.length > 200 ? "..." : ""}`);
    console.log();
  } catch (e) {
    console.log(`${title}\n  recipe parse failed: ${e.message}\n`);
  }
}
