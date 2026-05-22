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
