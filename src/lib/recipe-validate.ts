import type { Recipe } from "@/types/craft";
import { COE_ESSENCE_APPLICABILITY, lookupCoeBase, checkModOnBase } from "@/lib/coe-lookup";
import { MOD_DATA } from "@/lib/mod-weights";

export type IssueSeverity = "critical" | "warning";

export interface RecipeIssue {
  severity: IssueSeverity;
  field: "essence" | "prefix" | "suffix" | "base" | "currency-flow";
  message: string;
}

export interface ValidationResult {
  issues: RecipeIssue[];
  critical: boolean;
}

/**
 * Detect the most common currency-mechanic errors in the Oracle's prose.
 * Looks at the markdown response — these patterns can't be checked from the
 * structured recipe block alone because they're about the sequence of steps
 * described in the natural-language explanation.
 *
 * Rules sourced from poe2db.tw/us/Currency and /Essence — non-Perfect
 * essences require MAGIC (not white), Perfect essences require RARE,
 * Hinekora's Lock is the preview tool (no "Omen of Crystallisation"), etc.
 */
export function validateCurrencyFlow(markdown: string): RecipeIssue[] {
  const issues: RecipeIssue[] = [];
  const md = markdown;

  /** True when the markdown directly applies a Lesser/Greater/Perfect Essence
   *  to a white item — looks for explicit "Apply/Use [Essence] to/on (a) white"
   *  phrasing in a single clause, OR "[Essence] to a white [base-noun]" /
   *  "white [base-noun] ... Apply [Essence]" within ~120 chars and no upgrade
   *  currency in that span.
   *
   *  Deliberately narrow to avoid false positives on legal recipes like
   *  "Apply Transmutation to your white base, then Greater Essence to the
   *  magic item" — which spans white and essence but includes Transmutation
   *  before and routes through "magic". */
  function essenceDirectlyOnWhite(essencePattern: RegExp): boolean {
    const essSrc = essencePattern.source;

    // Pattern 1: explicit "to/on (a|the|your) white" right after the essence
    //   "Apply Greater Essence of Abrasion to a white bow"
    //   "Use Perfect Essence of Ruin on white"
    const explicitApply = new RegExp(`\\b(apply|use|slam)\\b[\\s\\S]{0,60}?(${essSrc})[\\s\\S]{0,40}?\\b(to|on)\\b\\s+(a|the|your)?\\s*white\\b`, "i");
    if (explicitApply.test(md)) return true;

    // Pattern 2: "white" within 120 chars BEFORE the essence in a way that
    //   implies direct application — but include 80 chars AFTER the essence
    //   so we catch trailing "to the magic item" qualifiers. Skip if any
    //   upgrade currency appears EARLIER in the markdown (before this rev
    //   match) OR the word "magic" appears in the extended span.
    const revRe = new RegExp(`\\bwhite\\b[\\s\\S]{0,120}?(?:apply|use|slam)\\b[\\s\\S]{0,40}?(${essSrc})[\\s\\S]{0,80}`, "i");
    const rev = md.match(revRe);
    if (rev) {
      const extendedSpan = rev[0];
      const startIndex = rev.index ?? 0;
      const earlier = md.slice(0, startIndex);
      const hasUpgradeBefore = /\b(Orb of Transmutation|Greater Orb of Transmutation|Perfect Orb of Transmutation|Orb of Alchemy|Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(earlier);
      const hasUpgradeIn    = /\b(Orb of Transmutation|Greater Orb of Transmutation|Perfect Orb of Transmutation|Orb of Alchemy|Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(extendedSpan);
      const hasMagicRouting = /\b(to|on)\s+(a|the|your)?\s*magic\b/i.test(extendedSpan);
      if (!hasUpgradeBefore && !hasUpgradeIn && !hasMagicRouting) return true;
    }
    return false;
  }

  // ❌ Non-Perfect Essence applied directly to a white base
  if (essenceDirectlyOnWhite(/(?:Lesser|Greater)\s+Essence/)) {
    issues.push({
      severity: "critical",
      field: "currency-flow",
      message: "Non-Perfect Essences (Lesser/Greater) require a MAGIC item, not white. Add an Orb of Transmutation step first (white → magic), then apply the Essence (magic → rare). Alternative: Orb of Alchemy gives white → rare directly but with no guaranteed mod.",
    });
  }

  // ❌ Perfect Essence applied directly to a white base
  if (essenceDirectlyOnWhite(/Perfect\s+Essence/)) {
    issues.push({
      severity: "critical",
      field: "currency-flow",
      message: "Perfect Essences require a RARE item (they REPLACE a random affix). Build the rare first (Alchemy, or Trans → Essence), then Perfect-essence over an unwanted affix.",
    });
  }

  // ❌ Perfect Essence on magic (no Regal between)
  const perfectMagicMatch = md.match(/Perfect\s+Essence[\s\S]{0,250}?\bmagic\b|\bmagic\b[\s\S]{0,250}?Perfect\s+Essence/i);
  if (perfectMagicMatch && !/\b(Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(perfectMagicMatch[0])) {
    issues.push({
      severity: "critical",
      field: "currency-flow",
      message: "Perfect Essences require a RARE item, not magic. The recipe references magic without a Regal Orb step before the Perfect Essence.",
    });
  }

  // ❌ "Omen of Crystallisation" used standalone — fabricated; not preceded by Sinistral/Dextral
  const omenMatches = [...md.matchAll(/(\w+\s+)?Omen\s+of\s+Crystallisation/gi)];
  for (const m of omenMatches) {
    const preceding = (m[1] ?? "").trim();
    if (!/^(Sinistral|Dextral)$/i.test(preceding)) {
      issues.push({
        severity: "critical",
        field: "currency-flow",
        message: "\"Omen of Crystallisation\" does not exist as a standalone omen. The preview-before-commit tool is Hinekora's Lock. (There ARE Omens of Sinistral/Dextral Crystallisation, but they modify Perfect-Essence prefix/suffix removal — not preview.)",
      });
      break;
    }
  }

  // ❌ Chaos Orb on white or magic
  if (/\b(Greater\s+|Perfect\s+)?Chaos\s+Orb\b[\s\S]{0,150}?\b(white|magic)\s+(base|item)\b/i.test(md)) {
    issues.push({
      severity: "critical",
      field: "currency-flow",
      message: "Chaos Orbs require a RARE item (they remove one affix and add one — net 0). Cannot be applied to white or magic. Upgrade first with Alchemy (white → rare) or Regal (magic → rare).",
    });
  }

  return issues;
}

/**
 * Catches the weapon-vs-quiver mod-naming confusion the user reported.
 * On weapons (Bow, Crossbow, Wand, Staff, etc.) elemental/physical damage
 * mods are named "Adds # to # X Damage". On Quivers they're named
 * "Adds # to # X Damage to Attacks" (because quivers don't deal damage
 * themselves — they add damage to the wielder's attacks). The Oracle
 * sometimes copies the Quiver naming onto weapon recipes.
 */
export function validateWeaponVsQuiverMods(recipe: Recipe | null): RecipeIssue[] {
  if (!recipe) return [];
  const issues: RecipeIssue[] = [];
  const weaponClasses = new Set([
    "Bow", "Crossbow", "Wand", "Staff", "Sceptre",
    "One Hand Sword", "Two Hand Sword", "One Hand Axe", "Two Hand Axe",
    "One Hand Mace", "Two Hand Mace", "Dagger", "Claw", "Flail", "Spear", "Warstaff",
    "Chaos Wand", "Fire Wand", "Ice Wand", "Lightning Wand", "Physical Wand",
    "Chaos Staff", "Fire Staff", "Ice Staff", "Lightning Staff", "Physical Staff",
  ]);
  const isWeapon = weaponClasses.has(recipe.itemClass) ||
    /\b(Bow|Crossbow|Wand|Staff|Sceptre|Sword|Axe|Mace|Dagger|Claw|Flail|Spear)\b/.test(recipe.itemClass);

  if (!isWeapon) return issues;

  for (const slot of [...(recipe.targetAffixes?.prefixes ?? []), ...(recipe.targetAffixes?.suffixes ?? [])]) {
    if (!slot.name) continue;
    if (/Adds\s+#\s+to\s+#\s+\w+\s+[Dd]amage\s+to\s+Attacks/i.test(slot.name)) {
      issues.push({
        severity: "critical",
        field: slot.name in (recipe.targetAffixes?.prefixes ?? []) ? "prefix" : "suffix",
        message: `"${slot.name}" uses Quiver naming on a ${recipe.itemClass}. On weapons the canonical name is "${slot.name.replace(/\s+to\s+Attacks/i, "")}" (no "to Attacks" suffix). That suffix is Quiver-only.`,
      });
    }
  }
  return issues;
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
  // PRIMARY check uses CoE's authoritative basemods table (checkModOnBase).
  // SECONDARY check falls back to the sheet's MOD_DATA — but only if CoE
  // says "invalid", and the sheet says "valid", we suppress the issue
  // (the sheet may have entries CoE's data doesn't, but CoE is the canonical
  // source for what shows up in their emulator).
  if (baseCategory) {
    const sheetKey = baseCategory.toUpperCase();
    const prefixIndex = buildNormalizedIndex(MOD_DATA[sheetKey]?.PREFIX);
    const suffixIndex = buildNormalizedIndex(MOD_DATA[sheetKey]?.SUFFIX);

    for (const slot of recipe.targetAffixes?.prefixes ?? []) {
      if (!slot.name) continue;
      const coeStatus = checkModOnBase(baseCategory, "prefix", slot.name);
      if (coeStatus === "valid") continue;
      // Wrong slot per CoE: warning regardless of sheet
      if (coeStatus === "wrong-slot") {
        issues.push({
          severity: "warning",
          field: "prefix",
          message: `"${slot.name}" is listed as a PREFIX but on ${baseCategory} it's actually a SUFFIX (per Craft of Exile data) — swap it.`,
        });
        continue;
      }
      // Invalid per CoE — check sheet as a sanity confirmation; if sheet also doesn't have it, escalate
      if (!prefixIndex.has(normalizeModName(slot.name))) {
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
      const coeStatus = checkModOnBase(baseCategory, "suffix", slot.name);
      if (coeStatus === "valid") continue;
      if (coeStatus === "wrong-slot") {
        issues.push({
          severity: "warning",
          field: "suffix",
          message: `"${slot.name}" is listed as a SUFFIX but on ${baseCategory} it's actually a PREFIX (per Craft of Exile data) — swap it.`,
        });
        continue;
      }
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
