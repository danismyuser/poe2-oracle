import type { Recipe } from "@/types/craft";
import { lookupCoeBase, lookupCoeEssence } from "@/lib/coe-lookup";

const COE_BASE_URL = "https://www.craftofexile.com/";

export interface CoeUrlResult {
  url: string;
  /**
   * How completely the URL pre-fills the CoE emulator:
   *  - "full": base + ilvl + method (and essence if relevant) all resolved
   *  - "partial": method + ilvl only (base name didn't resolve to a CoE id)
   *  - "minimal": just opens CoE in PoE2 mode
   */
  completeness: "full" | "partial" | "minimal";
  /** Human-readable list of fields the user will need to set manually. */
  missing: string[];
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
 */
export function buildCoeUrl(recipe: Recipe): CoeUrlResult {
  const params: string[] = ["game=poe2"];
  const missing: string[] = [];
  let completeness: CoeUrlResult["completeness"] = "minimal";

  // Base lookup — try the specific-item table first, then the category table
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

  // Essence ID only relevant when the method is "essence"
  if (recipe.primaryMethod === "essence" && recipe.essence) {
    const eid = lookupCoeEssence(recipe.essence);
    if (eid != null) {
      params.push(`e=${eid}`);
    } else {
      missing.push(`essence "${recipe.essence}" (select manually)`);
    }
  }

  // If we resolved base AND method, that's a full pre-fill for our purposes
  // (target affixes are a future enhancement — see Recipe.targetAffixes)
  if (base && recipe.primaryMethod) completeness = "full";

  // Mention target affixes so the user knows to set them manually
  const prefixCount = recipe.targetAffixes?.prefixes?.length ?? 0;
  const suffixCount = recipe.targetAffixes?.suffixes?.length ?? 0;
  if (prefixCount + suffixCount > 0) {
    missing.push(`${prefixCount + suffixCount} target affix${prefixCount + suffixCount === 1 ? "" : "es"} (click in CoE's affix panel)`);
  }

  return {
    url: `${COE_BASE_URL}?${params.join("&")}`,
    completeness,
    missing,
  };
}
