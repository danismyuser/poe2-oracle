import { CURRENCIES, OMENS } from "@/lib/currency-data";

/**
 * Compact authoritative currency + omen reference for system-prompt injection.
 * Built from src/lib/currency-data.ts which is the single source of truth.
 *
 * Stops the Oracle from common errors like:
 *  - "Apply Greater Essence to a white base" (Greater needs MAGIC)
 *  - "Use Omen of Crystallisation to preview" (doesn't exist — Hinekora's Lock is the preview tool)
 *  - "Use Chaos Orb on a white item" (Chaos needs RARE)
 */
export function buildCurrencyPromptSection(): string {
  const byFamily: Record<string, typeof CURRENCIES> = {};
  for (const c of CURRENCIES) {
    byFamily[c.family] ??= [];
    byFamily[c.family].push(c);
  }

  let curBody = "";
  for (const family of Object.keys(byFamily)) {
    const list = byFamily[family];
    for (const c of list) {
      const reqs = c.appliesTo.map((r) => r.toUpperCase()).join(" | ");
      const ml = c.modLevelMin ? ` · min mod level ${c.modLevelMin}` : "";
      const open = c.requiresOpenSlot ? " · requires open affix slot" : "";
      curBody += `- **${c.name}** [requires: ${reqs}${ml}${open}] — ${c.effect}\n`;
    }
    curBody += "\n";
  }

  let omenBody = "";
  for (const o of OMENS) {
    const tgt = o.modifies ? `modifies next ${o.modifies}` : "passive";
    omenBody += `- **${o.name}** [${tgt}] — ${o.effect}\n`;
  }

  return `## Authoritative PoE2 Currency Reference — non-negotiable mechanics

**Source:** poe2db.tw. When you recommend a currency, the recipe step MUST respect the item-state requirement listed in brackets below.

### Currencies — required item state + effect

${curBody.trim()}

### Omens — modify the NEXT currency use

Omens are consumed when the targeted currency is used. They do NOT modify the item themselves; they steer the result of the next use of the named currency.

${omenBody.trim()}

### Critical rules to internalize

1. **Non-Perfect essences (Lesser / base / Greater) require MAGIC items, NOT white.** To craft a white → essence-rare item: (a) Orb of Transmutation (white → magic), then (b) Essence (magic → rare with guaranteed mod). You may use Alchemy as a shortcut but Alchemy gives no guaranteed mod.
2. **Perfect essences require an EXISTING RARE.** They REPLACE a random affix with the guaranteed mod. Use Omen of Sinistral/Dextral Crystallisation to control which affix slot is replaced.
3. **Perfect essences produce DIFFERENT modifiers than Greater essences**, not just better tiers. Verify the Perfect essence's actual effect in the Essence Applicability table before recommending it.
4. **There is NO "Omen of Crystallisation".** The preview-before-commit mechanism is **Hinekora's Lock**. Use it when describing safe Perfect-tier slams.
5. **Chaos Orbs REPLACE an affix** (remove one + add one — net 0). They do NOT just add to a magic item; they need RARE.
6. **Exalted Orbs require an OPEN affix slot.** A rare with all 6 affixes filled cannot be exalted further without first annulling.
7. **Greater/Perfect tiers gate by MODIFIER LEVEL**, not tier. The mod's tier depends on the item's ilvl and the mod's tier table. Greater Chaos = min mod level 35, Perfect = 50. Greater Trans/Aug = 55, Perfect = 70.
`;
}
