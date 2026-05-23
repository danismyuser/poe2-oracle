import type { Recipe, AffixSlot } from "@/types/craft";
import { lookupCoeBase, lookupCoeEssence, lookupCoeModId } from "@/lib/coe-lookup";
import { lookupModTier } from "@/lib/mod-weights";

const COE_BASE_URL = "https://www.craftofexile.com/";

export interface CoeUrlResult {
  url: string;
  /**
   * How completely the URL pre-fills the CoE emulator:
   *  - "complete": base + ilvl + method + at least one target affix all resolved
   *  - "full":     base + ilvl + method (no target affixes resolved)
   *  - "partial":  method + ilvl only (base name didn't resolve)
   *  - "minimal":  just opens CoE in PoE2 mode
   */
  completeness: "complete" | "full" | "partial" | "minimal";
  /** Human-readable list of fields the user will need to set manually. */
  missing: string[];
  /** Count of target affixes successfully encoded into &req= (0 if none / none requested). */
  affixesResolved: number;
  /** Count of target affixes the recipe asked for. */
  affixesRequested: number;
}

/**
 * Parse "T1" / "T2" / "1" / "tier 3" etc. into a 1-based tier number.
 * Returns null if unrecognizable.
 */
function parseTier(raw: string | undefined | null): number | null {
  if (!raw) return null;
  const m = String(raw).match(/(\d+)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n >= 1 && n <= 20 ? n : null;
}

/**
 * Build CoE's `req=<json>` parameter from a list of target affixes.
 * Returns the JSON object (unstringified) plus the count of affixes that
 * successfully resolved to both a mod id and a tier ilvl.
 *
 * CoE's structure (reverse-engineered from poec_buildShareLink):
 *   req = { "<modId>": { "l": <ilvl>, "g": <groupIndex> } }
 */
function buildReqEntries(
  affixes: AffixSlot[] | undefined,
  type: "prefix" | "suffix",
  baseName: string | null | undefined,
  startGroup: number,
): { entries: Record<string, { l: number; g: number }>; resolved: number; unresolved: AffixSlot[]; nextGroup: number } {
  const entries: Record<string, { l: number; g: number }> = {};
  const unresolved: AffixSlot[] = [];
  let group = startGroup;
  if (!affixes || affixes.length === 0) return { entries, resolved: 0, unresolved, nextGroup: group };

  for (const slot of affixes) {
    if (!slot.name) continue;
    const modId = lookupCoeModId(type, slot.name);
    const tier = parseTier(slot.tier);
    const tierData = baseName && tier != null ? lookupModTier(baseName, type, slot.name, tier) : null;
    const ilvl = tierData?.ilvl;
    if (modId != null && ilvl != null) {
      entries[String(modId)] = { l: ilvl, g: group++ };
    } else {
      unresolved.push(slot);
    }
  }
  return { entries, resolved: Object.keys(entries).length, unresolved, nextGroup: group };
}

/**
 * Build a Craft of Exile deep-link URL from an Oracle-emitted Recipe.
 *
 * URL parameter schema reverse-engineered from CoE's poec_buildShareLink():
 *   game=poe2     — game mode (always poe2 for us)
 *   b=<id>        — base CATEGORY id (e.g. 20 for "Bow")
 *   bi=<id>       — specific base ITEM id (e.g. 231 for "Crude Bow")
 *   lv=<n>        — item level
 *   m=<id>        — crafting method (chaos / exalted / essence / ...)
 *   e=<id>        — essence id (required when m=essence)
 *   req=<json>    — target affixes: { "<modId>": { "l": <ilvl>, "g": <groupIdx> } }
 */
export function buildCoeUrl(recipe: Recipe): CoeUrlResult {
  const params: string[] = ["game=poe2"];
  const missing: string[] = [];
  let completeness: CoeUrlResult["completeness"] = "minimal";

  // Base lookup
  const base = lookupCoeBase(recipe.base);
  if (base) {
    params.push(`b=${base.b}`);
    if (base.bi != null) params.push(`bi=${base.bi}`);
    completeness = "partial";
  } else {
    missing.push(`base "${recipe.base}" (search manually in CoE)`);
  }

  if (Number.isFinite(recipe.ilvl) && recipe.ilvl > 0) {
    params.push(`lv=${recipe.ilvl}`);
  }

  if (recipe.primaryMethod) {
    params.push(`m=${recipe.primaryMethod}`);
  }

  // Essence ID — only relevant when method is "essence"
  if (recipe.primaryMethod === "essence" && recipe.essence) {
    const eid = lookupCoeEssence(recipe.essence);
    if (eid != null) {
      params.push(`e=${eid}`);
    } else {
      missing.push(`essence "${recipe.essence}" (select manually)`);
    }
  }

  if (base && recipe.primaryMethod) completeness = "full";

  // Target affixes — build the req= JSON if we have a base context to look up tier ilvls
  const sheetBase = base?.bn ?? null;
  const prefixCount = recipe.targetAffixes?.prefixes?.length ?? 0;
  const suffixCount = recipe.targetAffixes?.suffixes?.length ?? 0;
  const totalRequested = prefixCount + suffixCount;

  let affixesResolved = 0;
  if (totalRequested > 0) {
    const pre = buildReqEntries(recipe.targetAffixes?.prefixes, "prefix", sheetBase, 1);
    const suf = buildReqEntries(recipe.targetAffixes?.suffixes, "suffix", sheetBase, pre.nextGroup);
    const allEntries = { ...pre.entries, ...suf.entries };
    affixesResolved = pre.resolved + suf.resolved;

    if (affixesResolved > 0) {
      const reqJson = JSON.stringify(allEntries);
      params.push(`req=${encodeURIComponent(reqJson)}`);
      completeness = "complete";
    }

    const unresolved = [...pre.unresolved, ...suf.unresolved];
    if (unresolved.length > 0) {
      missing.push(
        `${unresolved.length} of ${totalRequested} target affix${unresolved.length === 1 ? "" : "es"} (click manually in CoE: ${
          unresolved.slice(0, 3).map((u) => u.name).filter(Boolean).join("; ")
        }${unresolved.length > 3 ? "; ..." : ""})`,
      );
    }
  }

  return {
    url: `${COE_BASE_URL}?${params.join("&")}`,
    completeness,
    missing,
    affixesResolved,
    affixesRequested: totalRequested,
  };
}
