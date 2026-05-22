/** Shared domain types for crafting items, affixes, and budgets. */

export interface AffixSlot {
  name: string;
  tier: string;
}

export type BudgetKey = "league-start" | "mid" | "high" | "mirror";

export interface BudgetStyle {
  label: string;
  color: string;
  bg: string;
  border: string;
}

/**
 * The Craft of Exile emulator methods we can deep-link into for PoE2.
 * Mirrors poec_methods in CoE's poe2.js.
 */
export type CoeMethod =
  | "chaos"
  | "exalted"
  | "alchemy"
  | "augmentation"
  | "transmute"
  | "regal"
  | "annul"
  | "essence";

/**
 * Structured representation of a single recommended craft, emitted by the
 * Oracle as a fenced ```recipe``` JSON block alongside the markdown response.
 * Consumed by `buildCoeUrl()` to deep-link into Craft of Exile's emulator,
 * and later by our own simulator (v1.2).
 *
 * All fields except `itemClass`, `base`, `ilvl`, and `primaryMethod` are
 * optional — the Oracle should populate what it knows; we degrade gracefully.
 */
export interface Recipe {
  /** Item category, e.g. "Bow", "Body Armour", "Amulet". */
  itemClass: string;
  /** Specific base name as it appears in CoE / poe2db, e.g. "Crude Bow". */
  base: string;
  /** Item level the craft assumes. */
  ilvl: number;
  /** Budget tier this recipe targets. */
  budget: BudgetKey;
  /** Short human-readable route name, e.g. "Essence + Omen + Greater Chaos spam". */
  routeName: string;
  /** Primary CoE crafting method to start in. */
  primaryMethod: CoeMethod;
  /** Essence name if the route uses one, e.g. "Essence of Abrasion" or "Abrasion". */
  essence?: string;
  /** Target affixes the user is trying to land. */
  targetAffixes?: {
    prefixes?: AffixSlot[];
    suffixes?: AffixSlot[];
  };
  /** Free-form notes — not used for the URL but shown in the verify tooltip. */
  notes?: string;
}
