// Test the recipe validator against actual recipes from the latest validation
// report. Re-runnable any time without spending Claude API.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const lookupTs = fs.readFileSync(path.join(root, "src/lib/coe-lookup.ts"), "utf-8");
const weightsTs = fs.readFileSync(path.join(root, "src/lib/mod-weights.ts"), "utf-8");

function extractConst(src, name) {
  const re = new RegExp(`export const ${name}[^=]*=\\s*(\\{[\\s\\S]*?\\});\\s*(?:export|function|/\\*\\*|interface|$)`, "m");
  const m = src.match(re);
  return m ? JSON.parse(m[1]) : null;
}

const COE_BITEMS = extractConst(lookupTs, "COE_BITEMS");
const COE_BASE_CATEGORIES = extractConst(lookupTs, "COE_BASE_CATEGORIES");
const COE_ESSENCE_APPLICABILITY = extractConst(lookupTs, "COE_ESSENCE_APPLICABILITY");
const MOD_DATA = extractConst(weightsTs, "MOD_DATA");

function lookupCoeBase(name) {
  return COE_BITEMS?.[name] ?? COE_BASE_CATEGORIES?.[name] ?? null;
}
function normalize(name) {
  return name.toLowerCase().replace(/[#%+]/g, "").replace(/\s+to\s+/g, " ").replace(/\s+/g, " ").trim();
}

function validateRecipe(recipe) {
  const issues = [];
  const base = lookupCoeBase(recipe.base);
  const baseCategory = base?.bn ?? null;

  if (recipe.primaryMethod === "essence" && recipe.essence) {
    const canonical = recipe.essence.replace(/^(Greater|Perfect|Lesser|Normal)\s+/i, "");
    const app = COE_ESSENCE_APPLICABILITY?.[canonical] ?? COE_ESSENCE_APPLICABILITY?.[recipe.essence];
    if (app && baseCategory && !app.categories.includes(baseCategory)) {
      issues.push({
        severity: "critical",
        field: "essence",
        message: `"${recipe.essence}" cannot be applied to a ${recipe.base} (${baseCategory}). Applies to: ${app.categories.join(", ")}.`,
      });
    }
  }

  if (baseCategory) {
    const sheetKey = baseCategory.toUpperCase();
    const prefixSet = new Set(Object.keys(MOD_DATA?.[sheetKey]?.PREFIX ?? {}).map(normalize));
    const suffixSet = new Set(Object.keys(MOD_DATA?.[sheetKey]?.SUFFIX ?? {}).map(normalize));
    for (const s of recipe.targetAffixes?.prefixes ?? []) {
      if (!s.name) continue;
      if (!prefixSet.has(normalize(s.name))) {
        const inSuffixes = suffixSet.has(normalize(s.name));
        issues.push({
          severity: inSuffixes ? "warning" : "critical",
          field: "prefix",
          message: inSuffixes
            ? `"${s.name}" listed as PREFIX but is actually a SUFFIX on ${baseCategory}.`
            : `"${s.name}" not a valid prefix on ${baseCategory}.`,
        });
      }
    }
    for (const s of recipe.targetAffixes?.suffixes ?? []) {
      if (!s.name) continue;
      if (!suffixSet.has(normalize(s.name))) {
        const inPrefixes = prefixSet.has(normalize(s.name));
        issues.push({
          severity: inPrefixes ? "warning" : "critical",
          field: "suffix",
          message: inPrefixes
            ? `"${s.name}" listed as SUFFIX but is actually a PREFIX on ${baseCategory}.`
            : `"${s.name}" not a valid suffix on ${baseCategory}.`,
        });
      }
    }
  }
  return { issues, critical: issues.some((i) => i.severity === "critical") };
}

const report = fs.readFileSync(path.join(root, "docs/validation-report.md"), "utf-8");
const tests = report.split(/^## (T\d+-[^\n]+)/m).slice(1);

console.log("=== Recipe validator output for all tests ===\n");
for (let i = 0; i < tests.length; i += 2) {
  const title = tests[i];
  const body = tests[i + 1];
  const re = body.match(/```recipe\s*\n([\s\S]*?)\n```/);
  if (!re) { console.log(`${title}\n  no recipe — skipped\n`); continue; }
  const recipe = JSON.parse(re[1]);
  const v = validateRecipe(recipe);
  console.log(title);
  console.log(`  base="${recipe.base}" method="${recipe.primaryMethod}" essence="${recipe.essence ?? "—"}"`);
  if (v.issues.length === 0) console.log("  ✓ NO ISSUES");
  else {
    console.log(`  ${v.critical ? "✗ CRITICAL" : "⚠ WARNING"} · ${v.issues.length} issue(s):`);
    v.issues.forEach((iss) => {
      const tag = iss.severity === "critical" ? "✗" : "⚠";
      console.log(`    ${tag} [${iss.field}] ${iss.message}`);
    });
  }
  console.log();
}
