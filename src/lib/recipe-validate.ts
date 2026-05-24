import type { Recipe } from "@/types/craft";
import { COE_ESSENCE_APPLICABILITY, lookupCoeBase } from "@/lib/coe-lookup";
import { MOD_DATA } from "@/lib/mod-weights";

export type IssueSeverity = "critical" | "warning";

export interface RecipeIssue {
  severity: IssueSeverity;
  field: "essence" | "prefix" | "suffix" | "base";
  message: string;
}

export interface ValidationResult {
  issues: RecipeIssue[];
  critical: boolean;
}

function normalizeModName(name: string): string {
  return name.toLowerCase().replace(/[#%+]/g, "").replace(/\s+to\s+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Validate that a Recipe is physically plausible — catches the Oracle's
 * occasional confident hallucinations even though all the data was in the
 * system prompt. Specifically catches the "Essence of Electricity on a
 * Quiver" failure reported in production: the mod IS valid for quivers
 * (rollable via chaos) but Essence of Electricity does not apply to
 * quivers, so the recommended ROUTE is impossible.
 */
export function validateRecipe(recipe: Recipe): ValidationResult {
  const issues: RecipeIssue[] = [];

  // Resolve the base's category — we need this for both essence and mod checks
  const base = lookupCoeBase(recipe.base);
  const baseCategory = base?.bn ?? null;

  // Check 1: essence ↔ base applicability
  if (recipe.primaryMethod === "essence" && recipe.essence) {
    // Strip tier prefix to match COE_ESSENCE_APPLICABILITY keys ("Essence of X")
    const canonicalEssence = recipe.essence.replace(/^(Greater|Perfect|Lesser|Normal)\s+/i, "");
    const app = COE_ESSENCE_APPLICABILITY[canonicalEssence] ?? COE_ESSENCE_APPLICABILITY[recipe.essence];
    if (app && baseCategory && !app.categories.includes(baseCategory)) {
      issues.push({
        severity: "critical",
        field: "essence",
        message: `"${recipe.essence}" cannot be applied to a ${recipe.base} (${baseCategory}). This essence only rolls on: ${app.categories.join(", ")}. Use a different essence or switch to a Chaos / Regal-based route.`,
      });
    } else if (!app) {
      issues.push({
        severity: "warning",
        field: "essence",
        message: `Could not verify essence "${recipe.essence}" against the applicability table — name may not match a known PoE2 essence.`,
      });
    }
  }

  // Check 2: target affix names actually roll on this base
  if (baseCategory) {
    const sheetKey = baseCategory.toUpperCase();
    const prefixIndex = buildNormalizedIndex(MOD_DATA[sheetKey]?.PREFIX);
    const suffixIndex = buildNormalizedIndex(MOD_DATA[sheetKey]?.SUFFIX);

    for (const slot of recipe.targetAffixes?.prefixes ?? []) {
      if (!slot.name) continue;
      if (!prefixIndex.has(normalizeModName(slot.name))) {
        // Maybe the Oracle put it in the wrong slot — check suffixes
        const inSuffixes = suffixIndex.has(normalizeModName(slot.name));
        issues.push({
          severity: inSuffixes ? "warning" : "critical",
          field: "prefix",
          message: inSuffixes
            ? `"${slot.name}" is listed as a PREFIX but on ${baseCategory} it's actually a SUFFIX — swap it.`
            : `"${slot.name}" is not a valid prefix on ${baseCategory}.`,
        });
      }
    }
    for (const slot of recipe.targetAffixes?.suffixes ?? []) {
      if (!slot.name) continue;
      if (!suffixIndex.has(normalizeModName(slot.name))) {
        const inPrefixes = prefixIndex.has(normalizeModName(slot.name));
        issues.push({
          severity: inPrefixes ? "warning" : "critical",
          field: "suffix",
          message: inPrefixes
            ? `"${slot.name}" is listed as a SUFFIX but on ${baseCategory} it's actually a PREFIX — swap it.`
            : `"${slot.name}" is not a valid suffix on ${baseCategory}.`,
        });
      }
    }
  }

  return {
    issues,
    critical: issues.some((i) => i.severity === "critical"),
  };
}

function buildNormalizedIndex(modBlock: Record<string, unknown> | undefined): Set<string> {
  const set = new Set<string>();
  if (!modBlock) return set;
  for (const name of Object.keys(modBlock)) set.add(normalizeModName(name));
  return set;
}
