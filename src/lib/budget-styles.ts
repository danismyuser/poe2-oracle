import type { BudgetKey, BudgetStyle } from "@/types/craft";

/**
 * Single source of truth for budget-tier visual styles.
 * Used by ItemPreview, SavedTab, and anywhere budgets are rendered.
 */
export const BUDGET_STYLES: Record<BudgetKey, BudgetStyle> = {
  "league-start": {
    label: "League Start",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.25)",
  },
  mid: {
    label: "Mid-tier",
    color: "var(--blue-light)",
    bg: "var(--blue-bg)",
    border: "var(--border-blue)",
  },
  high: {
    label: "High-end",
    color: "var(--gold)",
    bg: "var(--gold-bg)",
    border: "var(--border-gold)",
  },
  mirror: {
    label: "Mirror",
    color: "#C084FC",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.3)",
  },
};

/** Returns the style for any budget string, falling back to league-start. */
export function getBudgetStyle(budget: string): BudgetStyle {
  return BUDGET_STYLES[budget as BudgetKey] ?? BUDGET_STYLES["league-start"];
}
