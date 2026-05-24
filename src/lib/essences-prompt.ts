import { COE_ESSENCE_APPLICABILITY } from "@/lib/coe-lookup";

/**
 * Build a markdown section documenting which essences can be applied to which
 * base categories. Injected into the Oracle's system prompt so it cannot
 * recommend invalid combos like "Essence of Electricity on a Quiver" (which
 * a user caught in production).
 *
 * Source: each essence's `tiers` field in CoE's poec_data.json — keyed by
 * the id_base of every base the essence can roll its guaranteed mod on.
 */
export function buildEssencesPromptSection(): string {
  const names = Object.keys(COE_ESSENCE_APPLICABILITY).sort();
  let body = "";
  for (const name of names) {
    const app = COE_ESSENCE_APPLICABILITY[name];
    if (!app || !app.categories.length) continue;
    body += `- **${name}** → applies to: ${app.categories.join(", ")}\n`;
  }

  return `## Essence Applicability — which essences can target which bases

Each PoE2 essence rolls its guaranteed mod on a specific subset of item types only. Recommending an essence on a base it cannot apply to is a hard accuracy failure (a real bug reported in production: "Essence of Electricity on a Visceral Quiver" — Electricity only rolls on weapons, never quivers).

When you write a recipe that uses \`primaryMethod: "essence"\`, you MUST verify the \`essence\` field is valid for the base you chose. Use this table:

${body.trim()}

If an essence is not listed as applicable to the user's desired base, EITHER pick a different essence that IS applicable, OR pick a different crafting method (chaos / exalted / regal). NEVER recommend an essence on a base it doesn't apply to.
`;
}
