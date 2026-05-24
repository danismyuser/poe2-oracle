// Build-time generator for src/lib/mod-weights.ts
// Fetches the community-maintained PoE2 mod-weights Google Sheet (the same one
// Craft of Exile uses) and generates a typed lookup of per-tier ilvl
// requirements + spawn weights + display names.
//
// Re-run when PoE2 patches change mod tables:
//   node scripts/build-mod-weights.mjs
//
// Source: https://docs.google.com/spreadsheets/d/1QSAu0A-ZKcHFlQ5QCcUJSMb0ebXq1nxpGRUVgHXVjW8

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outFile = path.join(projectRoot, "src/lib/mod-weights.ts");
const cacheDir = path.join(projectRoot, ".coe-data-cache");

const SHEET_ID = "1QSAu0A-ZKcHFlQ5QCcUJSMb0ebXq1nxpGRUVgHXVjW8";

// Tab GIDs discovered by inspecting the sheet's htmlview
const TABS = {
  weights:  "1418797281", // first tab — spawn weights per tier
  ilvls:    "492566948",  // ILVLS — iLvl required for each tier
  spawnlvls:"1652888001", // SPAWNLVLS — alias of ilvls
  names:    "380825024",  // NAMES — in-game tier names ("Unassailable", etc.)
  ids:      "1257586048", // IDS — internal modifier IDs (not used; we use CoE's numeric ids)
};

async function fetchTab(gid, label) {
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  const cacheFile = path.join(cacheDir, `sheet-${label}.csv`);
  if (fs.existsSync(cacheFile)) {
    const ageMs = Date.now() - fs.statSync(cacheFile).mtimeMs;
    if (ageMs < 24 * 60 * 60 * 1000) {
      console.log(`  ${label}: cached`);
      return fs.readFileSync(cacheFile, "utf-8");
    }
  }
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  console.log(`  ${label}: fetching ...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed for ${label}: HTTP ${res.status}`);
  const text = await res.text();
  fs.writeFileSync(cacheFile, text, "utf-8");
  return text;
}

/** Minimal CSV parser — handles quoted fields with embedded commas. */
function parseCsv(text) {
  const rows = [];
  let cur = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { cur.push(field); field = ""; }
    else if (c === "\n") { cur.push(field); rows.push(cur); cur = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field || cur.length) { cur.push(field); rows.push(cur); }
  return rows.filter((r) => r.length > 1);
}

function trimTrailingNulls(arr) {
  let end = arr.length;
  while (end > 0 && (arr[end - 1] === "" || arr[end - 1] == null)) end--;
  return arr.slice(0, end);
}

async function main() {
  console.log("Fetching all 5 tabs from Google Sheet ...");
  const [weightsCsv, ilvlsCsv, namesCsv] = await Promise.all([
    fetchTab(TABS.weights, "weights"),
    fetchTab(TABS.ilvls, "ilvls"),
    fetchTab(TABS.names, "names"),
  ]);

  const weightsRows = parseCsv(weightsCsv);
  const ilvlsRows = parseCsv(ilvlsCsv);
  const namesRows = parseCsv(namesCsv);

  // All three tabs have the same row order: BASE, TYPE, NAME, 1..13, ItemClass.
  // We join them by row index (the spreadsheet maintains alignment by construction).
  const header = weightsRows[0];
  const tierCols = []; // column indices for "1".."13"
  for (let i = 3; i < header.length; i++) {
    if (/^\d+$/.test(header[i])) tierCols.push(i);
  }

  /**
   * Nested structure for fast lookup:
   *   MOD_DATA[base][type][modName] = {
   *     tiers: [{ ilvl, weight, tierName } | null, ...],   // index = tier-1
   *     itemClass
   *   }
   *
   * Keyed by the sheet's canonical BASE strings ("BOOTS (INT)", "BOW",
   * "BODY ARMOUR (DEX/INT)", etc).
   */
  const modData = {};
  let totalMods = 0;

  for (let r = 1; r < weightsRows.length; r++) {
    const w = weightsRows[r];
    const il = ilvlsRows[r];
    const nm = namesRows[r];
    if (!w || w.length < 4) continue;
    const base = w[0];
    const type = w[1]; // "PREFIX" or "SUFFIX"
    const name = w[2];
    const itemClass = w[w.length - 1];
    if (!base || !type || !name) continue;

    const tiers = [];
    for (const col of tierCols) {
      const weightStr = w[col]?.trim();
      const ilvlStr = il?.[col]?.trim();
      const tierName = nm?.[col]?.trim() || null;
      if (!weightStr && !ilvlStr) {
        tiers.push(null);
        continue;
      }
      tiers.push({
        weight: weightStr ? Number(weightStr) : null,
        ilvl: ilvlStr ? Number(ilvlStr) : null,
        tierName,
      });
    }
    const trimmedTiers = trimTrailingNulls(tiers);
    if (trimmedTiers.length === 0) continue;

    modData[base] ??= { PREFIX: {}, SUFFIX: {} };
    modData[base][type] ??= {};
    modData[base][type][name] = { tiers: trimmedTiers, itemClass };
    totalMods++;
  }

  const baseCount = Object.keys(modData).length;
  console.log(`Parsed ${totalMods} mods across ${baseCount} bases`);

  const out = `// AUTO-GENERATED by scripts/build-mod-weights.mjs — do not edit by hand.
// Source: https://docs.google.com/spreadsheets/d/${SHEET_ID}
// Generated: ${new Date().toISOString()}
// Bases: ${baseCount}, Total mods: ${totalMods}

export interface TierData {
  /** Spawn weight at this tier (probability). */
  weight: number | null;
  /** Item level required to roll this tier. */
  ilvl: number | null;
  /** In-game tier display name (e.g. "Unassailable"), null if not provided. */
  tierName: string | null;
}

export interface ModEntry {
  /** Indexed by tier-1 (i.e. tiers[0] = T1, tiers[6] = T7). null = tier doesn't exist. */
  tiers: (TierData | null)[];
  /** ItemClass column from the sheet ("Boots", "Bow", etc). */
  itemClass: string;
}

/**
 * MOD_DATA[baseName][type][modName] = ModEntry
 *
 * Base names use the sheet's canonical uppercase form: "BOOTS (INT)", "BOW",
 * "BODY ARMOUR (DEX/INT)", etc. To resolve from a specific PoE2 item name
 * (e.g. "Sacramental Robe") use COE_BITEMS[name].bn from coe-lookup.ts —
 * but note the sheet uppercases category names while coe-lookup preserves
 * Title Case (call .toUpperCase() before indexing).
 */
export const MOD_DATA: Record<
  string,
  Record<"PREFIX" | "SUFFIX", Record<string, ModEntry>>
> = ${JSON.stringify(modData, null, 2)};

/** All base names in MOD_DATA, useful for validation / autocomplete. */
export const MOD_DATA_BASES: string[] = ${JSON.stringify(Object.keys(modData).sort(), null, 2)};

/** Normalized form for fuzzy mod-name matching — strips +/#/% and collapses
 *  whitespace. Lets us match "+# to Dexterity" (Oracle paraphrase) against the
 *  sheet's "# to Dexterity" without an exact-string match. */
function normalizeModName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[#%+]/g, "")
    .replace(/\\s+to\\s+/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

/** Pre-computed normalized → canonical name map per base × type, built lazily. */
const NORMALIZED_INDEX: Record<string, Record<"PREFIX" | "SUFFIX", Record<string, string>>> = {};
function getNormalizedIndex(baseKey: string, typeKey: "PREFIX" | "SUFFIX"): Record<string, string> {
  if (!NORMALIZED_INDEX[baseKey]) NORMALIZED_INDEX[baseKey] = { PREFIX: {}, SUFFIX: {} };
  if (!Object.keys(NORMALIZED_INDEX[baseKey][typeKey]).length) {
    const mods = MOD_DATA[baseKey]?.[typeKey] ?? {};
    for (const canonical of Object.keys(mods)) {
      NORMALIZED_INDEX[baseKey][typeKey][normalizeModName(canonical)] = canonical;
    }
  }
  return NORMALIZED_INDEX[baseKey][typeKey];
}

/**
 * Look up a single (base, type, modName, tier) entry. Tries exact match
 * first, falls back to normalized matching if the Oracle paraphrased slightly
 * (e.g. wrote "+# to Dexterity" when the sheet has "# to Dexterity"). Returns
 * null if any step misses.
 */
export function lookupModTier(
  baseName: string,
  type: "prefix" | "suffix",
  modName: string,
  tier: number,
): TierData | null {
  const baseKey = baseName?.toUpperCase();
  if (!baseKey) return null;
  const typeKey = type.toUpperCase() as "PREFIX" | "SUFFIX";
  let entry = MOD_DATA[baseKey]?.[typeKey]?.[modName];
  if (!entry) {
    const canonical = getNormalizedIndex(baseKey, typeKey)[normalizeModName(modName)];
    if (canonical) entry = MOD_DATA[baseKey][typeKey][canonical];
  }
  if (!entry) return null;
  const td = entry.tiers[tier - 1];
  return td ?? null;
}
`;

  fs.writeFileSync(outFile, out, "utf-8");
  console.log(`Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
