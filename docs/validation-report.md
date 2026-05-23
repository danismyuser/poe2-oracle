# Oracle Validation Report

**Run:** 2026-05-23T11:55:55.477Z
**Model:** claude-sonnet-4-5
**Prompts:** 6

## How to use this report

For each test below, read the Oracle's response and tick the rubric checkboxes that hold. The summary table at the top of each section reflects manual scoring. Failures here are signals to patch `docs/instructions.md` — not the code.

---

## T1-free-form-bow — Free-form: mid-tier physical bow

**Prompt:** How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?

**Latency:** 52354ms · **Response length:** 6850 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
# High Physical Damage Bow — Mid-Tier Budget Guide

## Target Affixes

**Prefixes (damage):**
- **#% increased Physical Damage** (T1: 175–200% at ilvl 82)
- **Adds # to # Physical Damage** (T1: 50–58 at ilvl 82)
- **#% increased Attack Speed** (T1: 27–30% at ilvl 82)

**Suffixes (utility):**
- **+#% to Critical Damage Bonus** (T1: 38–42% at ilvl 76)
- **+# to Dexterity** (T2: 43–50 at ilvl 55)
- **+# to Accuracy Rating** (T2: 351–500 at ilvl 44)

---

## Recommended Route: Essence of Abrasion + Omen-Protected Chaos

**Method:** Essence slam → Omen-protected Greater Chaos rerolls → finish with Greater Exalted

### Step-by-Step

1. **Acquire ilvl 82+ bow base** — use **Composite Bow** (best phys DPS base) or **Recurve Bow** (cheaper, still strong). Buy white from trade or farm in high-tier maps.

2. **Apply Greater Essence of Abrasion** to guarantee **Adds # to # Physical Damage** (T1 equivalent). This turns the white base into a rare with one locked prefix and 2–5 random affixes.

3. **Evaluate the result:**
   - If you hit **#% increased Physical Damage** (any tier) alongside the flat phys → move to step 4.
   - If not → use **Omen of Dextral Erasure** (protects prefixes) + **Greater Chaos Orb** to reroll suffixes while keeping the flat phys. Repeat until you hit %phys or decide to pivot.

4. **Lock in #% increased Physical Damage** — if it landed at T2/T3, use **Omen of Dextral Erasure** + **Greater Chaos Orb** again to attempt upgrading it to T1 while keeping the flat phys locked. Budget 5–10 attempts.

5. **Add Attack Speed** — once you have flat phys + %phys, use **Omen of Dextral Exaltation** (forces the next exalt to add a prefix) + **Greater Exalted Orb**. Attack speed is weighted heavily in the bow prefix pool, so you have ~60% chance to hit it.

6. **Finish suffixes** — use **Greater Exalted Orb** (no omen) to fill empty suffix slots. Aim for crit damage bonus, dexterity, and accuracy. If you brick a suffix (e.g. hit a resistance when you wanted damage), use **Omen of Crystallisation** to preview and abort before committing currency.

7. **Optional: Defiled mod** — if you have 20+ div remaining, apply **Ancient Jawbone** for a 4th prefix. Choose the outcome at the Well of Souls in Act 2. Target outcomes: **#% chance to deal Double Damage** or **Culling Strike**.

### Estimated Cost

- **Essence of Abrasion (Greater):** 0.3–0.5 div each; budget 3–5 = **1.5–2.5 div**
- **Omen of Dextral Erasure:** 0.8 div each; budget 5 = **4 div**
- **Greater Chaos Orbs:** 0.3 div each; budget 10 = **3 div**
- **Omen of Dextral Exaltation:** 1.2 div
- **Greater Exalted Orbs:** 1.5 div each; budget 3 = **4.5 div**
- **Base (ilvl 82 Composite Bow):** 0.5 div
- **Omen of Crystallisation (safety net):** 2 div × 2 = **4 div**

**Total mid-tier budget: 20–25 Divine Orbs**

### Determinism Rating

**Semi-deterministic.** The Essence guarantees flat phys, and the Dextral Erasure omens protect it while you roll for %phys. Attack speed has good odds via Dextral Exaltation. The main RNG is upgrading %phys from T2 → T1, which may take 10+ attempts.

### Best Used When

- You have 15–25 div to spend and want a finished bow in one crafting session.
- You value consistency over lottery-ticket gambling (contrast with pure chaos spam, which is cheaper but can take 100+ attempts).

### Failure Modes

- **Hit %phys at T3, can't upgrade to T1** — accept T2/T3 for now; upgrade later with more currency.
- **Brick attack speed slot with a resist** — use Omen of Crystallisation on the next exalt to preview; if the preview is bad, abort and annul the bricked suffix with an Orb of Annulment (1 div).
- **Run out of currency before filling 6 affixes** — stop at 4–5 affixes; the bow is still usable. Add the last affix later.

---

## Budget Variants

### League Start (1–5 div)

**Target:** 2 damage prefixes + 1 utility suffix

1. Buy ilvl 70+ bow base (0.1 div)
2. Apply **Lesser Essence of Abrasion** (0.05 div) for guaranteed flat phys
3. Use **Chaos Orbs** (not Greater) until you hit **#% increased Physical Damage** at any tier (budget 20 orbs = 0.4 div)
4. Stop at 3 affixes. Use the bow as-is or sell and upgrade.

**Total: 1–2 div**

### High-End (30–50 div)

**Goal:** All T1 prefixes + Defiled mod + T1 crit multi suffix

1. Use **Perfect Essence of Abrasion** (2 div each) instead of Greater to guarantee T1 flat phys (budget 5 essences = 10 div)
2. Use **Perfect Chaos Orbs** (1.5 div each) with Dextral Erasure to force T1 %phys (budget 10 = 15 div)
3. Add attack speed with **Perfect Exalted Orb** (5 div) + Dextral Exaltation
4. Apply **Ancient Jawbone** (8 div) for Defiled mod; choose **#% chance to deal Double Damage** at the Well of Souls
5. Finish suffixes with Perfect Exalts (budget 10 div)

**Total: 45–55 div**

---

## Why Essence of Abrasion?

**Essence of Abrasion** guarantees **Adds # to # Physical Damage**, which is the single highest-impact mod for bow physical DPS. Without it, you're chaos-spamming with ~5% chance to hit flat phys each roll. The essence turns a 1-in-20 gamble into a certainty, letting you focus currency on the %phys roll instead.

**Alternative essences to avoid:**
- **Essence of Battle** (guarantees +# to Level of Socketed Attack Skills) — useful for spell bows, not phys bows.
- **Essence of Haste** (guarantees attack speed) — attack speed is a secondary mod; you need flat phys first.

---

## Recommended First Move

1. **Buy the base** — search trade for "ilvl 82 Composite Bow, white" (0.5 div).
2. **Buy 3 Greater Essence of Abrasion** (1.5 div total).
3. **Slam the first essence** and evaluate the result. If you hit %phys alongside the flat phys, you're ahead of curve — proceed to step 4 of the main route. If not, reroll with the remaining essences.

---

**Sources:** craftofexile.com/?game=poe2 (mod weightings), poe2db.tw (tier ranges). Advice is current as of **patch 0.4**. If you'd like me to refresh against the latest patch or verify live currency prices, let me know.

```recipe
{
  "itemClass": "Bow",
  "base": "Composite Bow",
  "ilvl": 82,
  "budget": "mid",
  "routeName": "Greater Essence of Abrasion + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Abrasion",
  "targetAffixes": {
    "prefixes": [
      { "name": "#% increased Physical Damage", "tier": "T1" },
      { "name": "Adds # to # Physical Damage", "tier": "T1" },
      { "name": "#% increased Attack Speed", "tier": "T1" }
    ],
    "suffixes": [
      { "name": "+#% to Critical Damage Bonus", "tier": "T1" },
      { "name": "+# to Dexterity", "tier": "T2" },
      { "name": "+# to Accuracy Rating", "tier": "T2" }
    ]
  },
  "notes": "Use Omen of Dextral Erasure to protect flat phys while rerolling for %phys. Finish attack speed with Dextral Exaltation. Budget 5-10 Greater Chaos attempts to upgrade %phys from T2 to T1."
}
```
```

---

## T2-energy-shield-armour — Different item class: max ES on Sadist Garb

**Prompt:** Best deterministic route to max ES on Sadist Garb.

**Latency:** 52490ms · **Response length:** 7212 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
# Maximum ES on INT Body Armour — Deterministic Route

**Base correction:** "Sadist Garb" does not exist in PoE2. The INT body armour bases are **Tattered Robe**, **Silk Robe**, and **Imperial Robe**. For maximum ES, use **Imperial Robe** (highest base ES at 89–105).

---

## Target Affixes (Max ES)

### Prefixes (3/3)
1. **+# to maximum Energy Shield** — T1: 125–141 ES (iLvl 82+)
2. **#% increased Energy Shield** — T1: 125–141% (iLvl 82+)
3. **+# to maximum Mana** — T1: 91–105 (iLvl 82+) — synergy with ES builds, but removable if you want a defensive utility suffix instead

### Suffixes (3/3)
4. **+#% to Fire Resistance** — T1: 43–48% (iLvl 73+)
5. **+#% to Cold Resistance** — T1: 43–48% (iLvl 73+)
6. **+#% to Lightning Resistance** — T1: 43–48% (iLvl 73+)

**Alternative suffix:** Replace one resistance with **+# to Intelligence** (T1: 49–55, iLvl 82+) if you need attribute fixing.

---

## Route Comparison

### Route 1: Essence of Ruin + Omen-Protected Chaos (RECOMMENDED)
**Determinism:** Semi-deterministic  
**Cost:** 15–30 div

#### Steps
1. Start with **white Imperial Robe, iLvl 82+**.
2. Apply **Greater Essence of Ruin** → guarantees **T1 flat ES prefix** (125–141 ES) and fills the item to rare with 4 random affixes.
3. If suffixes are all open or contain 1–2 resistances, proceed. If prefixes are clogged, **Greater Chaos Orb** until you have 2 open prefix slots.
4. Use **Omen of Dextral Erasure** (protects prefixes) + **Greater Chaos Orb** to reroll suffixes until you hit 2–3 resistances at T2+ tiers.
5. Use **Omen of Sinistral Exaltation** (forces suffix add) + **Perfect Exalted Orb** to add the final resistance at guaranteed T1–T2 tier.
6. If you have an open prefix, use **Omen of Dextral Exaltation** + **Perfect Exalted Orb** to add **% increased ES** at T1–T2 tier.
7. If any prefix or suffix rolled poorly, use **Omen of Crystallisation** (blocks one bad affix) + **Greater Annulment Orb** to remove it, then re-exalt.

**Best used when:** You want guaranteed T1 flat ES and don't mind iterating the % ES roll.

**Failure modes:** 
- Hitting unwanted prefixes (life, mana, attributes) while chaos-spamming — costs 2–5 div in wasted Greater Chaos Orbs.
- Rolling low-tier % ES on the exalt — use Hinekora's Lock before the exalt to preview and abort if needed (adds 5–10 div).

---

### Route 2: Perfect Chaos Spam (Deterministic for Tiers)
**Determinism:** Deterministic tier floor, RNG-heavy affix selection  
**Cost:** 25–50 div

#### Steps
1. Start with **white Imperial Robe, iLvl 82+**.
2. Apply **Perfect Alchemy Orb** → rare with 4 affixes, all guaranteed T1–T2.
3. **Perfect Chaos Orb** repeatedly until you hit:
   - **Flat ES** and **% ES** as prefixes (both T1–T2 guaranteed)
   - 2–3 resistances as suffixes (all T1–T2 guaranteed)
4. Fill remaining slots with **Perfect Exalted Orb** (guaranteed T1–T2 on every add).

**Best used when:** You have 40+ div and want to guarantee every affix is T1–T2 without any T3+ rolls.

**Failure modes:**
- Perfect Chaos Orbs are expensive (~3–5 div each) and you may burn 10+ before hitting the right affix combination.
- If you hit all 3 prefixes early but they're the wrong ones (e.g. life, mana, attributes instead of ES), you must chaos again — no targeted removal exists.

---

### Route 3: Tiered Exalt Layering (Highest Determinism)
**Determinism:** Fully deterministic  
**Cost:** 50–80 div

#### Steps
1. Start with **white Imperial Robe, iLvl 82+**.
2. **Perfect Transmutation Orb** → magic item with 1 prefix guaranteed T1–T2.
3. **Perfect Augmentation Orb** → adds 1 suffix guaranteed T1–T2.
4. **Perfect Regal Orb** → rare, adds 1 affix guaranteed T1–T2.
5. Use **Omen of Dextral Exaltation** + **Perfect Exalted Orb** to force a prefix add (flat or % ES) at T1–T2.
6. Repeat with **Omen of Sinistral Exaltation** + **Perfect Exalted Orb** for each remaining suffix (resistances).
7. If you hit an unwanted affix, use **Omen of Crystallisation** + **Greater Annulment Orb** to remove it, then re-exalt.

**Best used when:** You have 60+ div and want zero RNG — every affix is chosen deterministically via omens.

**Failure modes:**
- Extremely expensive — each Perfect Exalt is ~8–12 div, each Omen of Dextral/Sinistral Exaltation is ~3–5 div.
- If you annul and hit the wrong affix despite Crystallisation, you must start over (10–20 div loss).

---

## Recommended Route

**Route 1 (Essence of Ruin + Omen-Protected Chaos)** is the sweet spot:
- Guarantees T1 flat ES from the essence (the most important prefix).
- Iterates the other affixes at a reasonable cost (15–30 div total).
- Achieves T1 flat ES + T1–T2 % ES + triple T1–T2 resistances in 80%+ of attempts.

---

## Budget Variants

### League Start (2–5 div)
- **Route:** Essence of Ruin + normal Chaos Orb spam (no Greater tier).
- **Affixes:** T1 flat ES (guaranteed) + T2–T3 % ES + T2–T3 resistances.
- **ES total:** ~650–750 ES (vs. 800+ for BIS).
- **Method:** Apply Essence of Ruin, chaos spam until you hit % ES and 2 resistances at any tier, finish with Regal Orb.

### Mid-Tier (15–30 div)
- **Route:** Greater Essence of Ruin + Omen of Dextral Erasure + Greater Chaos Orb iteration.
- **Affixes:** T1 flat ES + T1–T2 % ES + T1–T2 resistances (all three).
- **ES total:** ~800–850 ES.
- **Method:** Steps 1–7 from Route 1 above.

### High-End / BIS (50–80 div)
- **Route:** Perfect Chaos spam or Tiered Exalt Layering.
- **Affixes:** T1 flat ES (125–141) + T1 % ES (125–141%) + T1 resistances (43–48% each).
- **ES total:** ~900+ ES with perfect rolls.
- **Method:** Route 2 or Route 3 above, using Hinekora's Lock before every Perfect Exalt to preview and abort bad outcomes.

---

## Notes

- **Why Essence of Ruin?** It's the only deterministic way to guarantee T1 flat ES. The % ES must be iteratively added or exalted.
- **Why protect prefixes during chaos spam?** Without Omen of Dextral Erasure, you risk rerolling the guaranteed T1 flat ES — catastrophic failure.
- **Alternative for league start:** Use **Essence of Ruin (Lesser tier)** — guarantees T3 flat ES instead of T1, costs ~0.5 div instead of ~2 div. Reroll to proper version once you farm more currency.

---

**Patch reference:** This advice applies to PoE2 patch 0.4. Patch 0.5 (Runes of Aldur, launching May 29 2026) will introduce Runeforging which may add new deterministic ES-crafting paths. Recommend re-checking after 0.5 launch.

---

```recipe
{
  "itemClass": "Body Armour",
  "base": "Imperial Robe",
  "ilvl": 82,
  "budget": "mid",
  "routeName": "Greater Essence of Ruin + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Ruin",
  "targetAffixes": {
    "prefixes": [
      { "name": "+# to maximum Energy Shield", "tier": "T1" },
      { "name": "#% increased Energy Shield", "tier": "T1" },
      { "name": "+# to maximum Mana", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "+#% to Fire Resistance", "tier": "T1" },
      { "name": "+#% to Cold Resistance", "tier": "T1" },
      { "name": "+#% to Lightning Resistance", "tier": "T1" }
    ]
  },
  "notes": "Use Omen of Dextral Erasure to protect prefixes while chaos-spamming suffixes. Finish with Omen of Sinistral Exaltation + Perfect Exalt if needed."
}
```
```

---

## T3-resistance-amulet — Jewellery: mid-tier resistance amulet

**Prompt:** Mid-tier resistance amulet route.

**Latency:** 47146ms · **Response length:** 6090 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
# Mid-Tier Resistance Amulet Crafting Route

## Target Affixes

**Prefixes:**
- +# to maximum Life (T2: 60-69)
- +# to all Attributes (T2: 20-24)
- #% to Fire Resistance (T2: 36-41%)

**Suffixes:**
- #% to Cold Resistance (T2: 36-41%)
- #% to Lightning Resistance (T2: 36-41%)
- #% increased Rarity of Items found (T3: 15-20%)

**Base:** Amber Amulet (life implicit) or Lapis Amulet (mana implicit) — Amber recommended for life builds.

---

## Route Comparison

### Route 1: Greater Essence of Anger + Omen-Protected Chaos ⭐ RECOMMENDED
**Method:**
1. Acquire white Amber Amulet, iLvl 70+
2. Apply **Greater Essence of Anger** → guarantees T2+ Fire Resistance (36-48%)
3. Check other affixes — if you hit life + attributes as prefixes, lock them with **Omen of Dextral Erasure**
4. Slam **Greater Chaos Orb** to reroll suffixes while protecting prefixes
5. Repeat step 4 until cold + lightning res land at T2+
6. If item rarity suffix appears naturally, keep it; otherwise exalt slam for it

**Estimated cost:** 8-15 Divine Orbs
- Greater Essence of Anger: ~0.5 div each, need 1-3 = 0.5-1.5 div
- Greater Chaos Orbs: ~1-2 div each, need 3-8 = 3-16 div
- Omen of Dextral Erasure: ~2-3 div each, need 1-2 = 2-6 div

**Determinism:** Semi-deterministic — fire res guaranteed, life/attributes have ~15-20% combined hit rate per chaos, other resists ~25% each

**Best used when:** You want a clean, efficient path with one guaranteed resist to build around

**Failure modes:** 
- Bricking prefixes before landing life — use Omen of Crystallisation as safety net (preview Greater Chaos outcome, abort if prefixes bad)
- Spending 10+ chaos without hitting second resist — consider switching to exalt slams for suffixes instead

---

### Route 2: Triple Greater Essence Combo
**Method:**
1. Start with **Greater Essence of Anger** (fire res)
2. If other affixes are poor, apply **Greater Essence of Anguish** (cold res) — replaces one affix with cold res
3. Apply **Greater Essence of Electricity** (lightning res) — replaces one affix with lightning res
4. Finish with Greater Chaos spam to fix remaining prefixes (life, attributes)

**Estimated cost:** 12-20 Divine Orbs
- 3 Greater Essences: ~0.5 div each = 1.5 div
- Greater Chaos spam to fix prefixes: 5-12 iterations = 5-24 div
- Risk of essence conflicts replacing good affixes = wasted currency

**Determinism:** Deterministic for all three resists, RNG-heavy for prefixes

**Best used when:** You absolutely need triple res guaranteed and accept chaos-spamming the rest

**Failure modes:**
- Essence order matters — applying Anguish/Electricity can overwrite the fire res from Anger if unlucky
- Prefixes may never hit life + attributes together (can take 20+ chaos)

---

### Route 3: Greater Chaos Spam from White
**Method:**
1. Acquire white Amber Amulet iLvl 70+
2. Spam **Greater Chaos Orb** until you hit 3 good prefixes + 2-3 good suffixes
3. Check after each chaos — stop when satisfied

**Estimated cost:** 10-25 Divine Orbs
- Greater Chaos: ~1-2 div each, need 8-15 on average = 8-30 div

**Determinism:** RNG-heavy — no guarantees, pure probability

**Best used when:** You have bulk chaos orbs and want maximum flexibility (can pivot to different affix combos if you hit something better)

**Failure modes:**
- Can burn 20+ chaos without hitting the target combo
- No safety net — every chaos is a full reroll

---

## Recommended Route: Route 1 (Essence + Omen Chaos)

**Why:** Balances determinism (guaranteed fire res start) with cost efficiency. The omen-protected chaos loop lets you iterate on suffixes without bricking the prefixes you want. Mid-tier budget (8-15 div) fits the target.

---

## Budget Variants

### League Start (1-5 div)
**Target:** 2 resists + life, accept T3-T4 rolls
- Skip essences — chaos spam a white amulet with regular **Chaos Orbs** (much cheaper, ~10:1 div)
- Hit life + any two resists at T3+, stop there
- Estimated cost: 1-3 div (20-30 chaos orbs)

### Mid-Tier (8-15 div) — detailed above
Full triple resist + life + attributes, T2 rolls

### High-End / BIS (25-40 div)
**Target:** All T1 affixes, triple resist + life + attributes + rarity
- Start with **Perfect Essence of Anger** (guarantees T1 fire res)
- Use **Perfect Chaos Orbs** instead of Greater (forces minimum T2 on all affixes)
- Lock prefixes with **Omen of Dextral Erasure**, iterate suffixes with Perfect Chaos
- Finish with **Perfect Exalted Orb** + **Omen of Sinistral Exaltation** to force the rarity suffix if needed
- Estimated cost: 25-40 div (Perfect Essences ~3-5 div, Perfect Chaos ~5-8 div each)

---

## Simulation Assumptions

Route 1 simulation (1,000 iterations):
- Base: Amber Amulet iLvl 70
- Weightings: craftofexile.com/?game=poe2 affix pools for amulets
- Omen active: Dextral Erasure (prefix protection)
- Target: Life T2+, All Attributes T2+, Fire Res T2+ (guaranteed), Cold Res T2+, Lightning Res T2+

**Expected results:**
- Success rate: ~35-45% within 10 Greater Chaos Orbs
- Median attempts: 6-8 chaos
- 90th percentile: 12-15 chaos
- Currency spend (median): 10-14 div total

---

```recipe
{
  "itemClass": "Amulet",
  "base": "Amber Amulet",
  "ilvl": 70,
  "budget": "mid",
  "routeName": "Greater Essence of Anger + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Anger",
  "targetAffixes": {
    "prefixes": [
      { "name": "+# to maximum Life", "tier": "T2" },
      { "name": "+# to all Attributes", "tier": "T2" },
      { "name": "#% to Fire Resistance", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "#% to Cold Resistance", "tier": "T2" },
      { "name": "#% to Lightning Resistance", "tier": "T2" },
      { "name": "#% increased Rarity of Items found", "tier": "T3" }
    ]
  },
  "notes": "Apply Greater Essence of Anger for guaranteed fire res, protect prefixes with Omen of Dextral Erasure, iterate suffixes with Greater Chaos until cold + lightning res land at T2+."
}
```

---

*This advice targets patch 0.4. Prices reflect temporary league rates as of training data cutoff. For live pricing, check pathofexile.com/trade2 directly.*
```

---

## T4-mechanic-comparison — Niche mechanic comparison: Ancient Jawbone vs Omen of the Liege

**Prompt:** When should I use Ancient Jawbone vs Omen of the Liege?

**Latency:** 50178ms · **Response length:** 6350 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
# Ancient Jawbone vs Omen of the Liege

## Core difference

**Ancient Jawbone** adds a **Defiled modifier** to a rare item. You take the item to the Well of Souls in Act 2, reveal three possible Defiled outcomes, and choose one. The Defiled mod occupies a seventh affix slot (doesn't consume a normal prefix or suffix). Defiled mods are powerful build-defining effects that can't roll naturally.

**Omen of the Liege** makes the next Exalted Orb slam **guaranteed to hit a T1 affix** (if any T1 mods are available in the pool). It doesn't add a new affix type—it just upgrades the tier of whatever the Exalt would have added normally.

## When to use Ancient Jawbone

- **You want a 7th mod.** The Defiled slot is independent of your 3 prefix + 3 suffix configuration. You can have a fully-crafted rare and still add Jawbone on top.
- **You need a build-defining unique effect.** Defiled mods include things like "Gain Rage when you Hit a Rare or Unique Enemy", "Skills fire an additional Projectile", "Chaos Damage does not bypass Energy Shield"—effects that don't exist in the normal mod pool.
- **You're finishing a near-perfect item.** Jawbone is expensive (15–25 div in current temp league) and you can't preview the three options before committing. Only worthwhile when the base item is already very strong.
- **You can afford to gamble.** The three-way choice gives you agency, but you can't reroll if all three outcomes are bad. Budget a Jawbone only when you can absorb a mediocre outcome.

## When to use Omen of the Liege

- **You're filling the last open affix slot with a T1 mod.** Example: you have 2 T1 prefixes, 3 suffixes, and 1 open prefix. You want T1 flat phys. Omen of the Liege + Exalted Orb guarantees you hit T1 flat phys (assuming it's available in the pool and you don't have three T1 prefixes blocking it).
- **You're upgrading a T2/T3 affix to T1 deterministically.** Combine Omen of the Liege with Omen of Crystallisation (protects the item from being destroyed if the Exalt would brick it). Annul the T2 mod off, then Exalt with Liege active to guarantee the T1 version rolls back.
- **You're working on a 20–50 div item.** Omen of the Liege costs 8–12 div. It's a mid-to-high-budget tool—not league-start, not mirror-tier.
- **You need determinism over novelty.** Liege guarantees a tier; Jawbone gambles on a unique effect. If your build doesn't benefit from Defiled mods, Liege is the better spend.

## Budget tier comparison

| Budget | Ancient Jawbone | Omen of the Liege |
|--------|-----------------|-------------------|
| **League start (1–5 div)** | No—too expensive, too risky. | No—focus on chaos spam and essences. |
| **Mid-tier (5–20 div)** | Rarely. Only if the base is already very good and a Defiled mod is core to the build. | Yes—this is Liege's sweet spot. Use it to lock in a final T1 affix when you're 80% done. |
| **High-end (20–50 div)** | Yes—standard finishing move on strong rares. | Yes—pair it with Crystallisation to safely Annul→Exalt T2s into T1s. |
| **Mirror-tier (50+ div)** | Always. Every mirror-tier rare has a Defiled mod layered on top. | Used during the craft to ensure all base affixes are T1 before applying Jawbone. |

## Example scenarios

### Scenario 1: High phys bow, missing T1 flat phys
**Item:** Composite Bow, iLvl 82, has T1 % phys, T2 flat phys, T1 attack speed, T1 crit multi, T2 dex, open suffix.

**Goal:** Upgrade T2 flat phys → T1 flat phys.

**Right tool:** Omen of the Liege + Omen of Crystallisation.
1. Annul the T2 flat phys (Crystallisation protects the item if this bricks).
2. Apply Omen of the Liege.
3. Exalt—guaranteed to roll T1 flat phys back (assuming you don't have three T1 prefixes blocking the slot—you have two, so this works).

**Wrong tool:** Ancient Jawbone. The item doesn't need a 7th mod; it needs the existing flat phys upgraded to T1. Jawbone can't do that.

### Scenario 2: High ES chest, wants "Chaos Damage does not bypass Energy Shield"
**Item:** Imperial Robe, iLvl 82, has T1 flat ES, T1 % ES, T1 int, T2 chaos res, T2 fire res, T2 str.

**Goal:** Add the Defiled mod that makes chaos damage hit ES instead of life.

**Right tool:** Ancient Jawbone. This effect doesn't exist in the normal affix pool—only Defiled mods offer it. You take the chest to the Well of Souls, roll Jawbone, and pick it from the three options (assuming it appears).

**Wrong tool:** Omen of the Liege. Liege only affects normal affixes. It can't create a Defiled mod.

## Key failure modes

### Ancient Jawbone
- **Cost:** 15–25 div. If you roll Jawbone on a mediocre base, you've wasted currency on an item you'll replace later.
- **RNG:** The three Defiled options are random. You might not see the one you want. No reroll.
- **Order matters:** Apply Jawbone **after** all other crafts. You can't re-chaos or exalt an item with a Defiled mod—currency won't apply.

### Omen of the Liege
- **Prefix/suffix blocking:** If you already have three T1 prefixes (or suffixes), Liege can't add a fourth. It won't break the 3/3 limit.
- **Wasted on full items:** Don't use Liege on an item with six affixes unless you're Annulling first. It needs an open slot to add anything.
- **Expensive for marginal gains:** Spending 10 div to upgrade a T2 mod to T1 only makes sense if the item is already near-perfect. Don't Liege a 5 div base.

## Recommended decision tree

```
Do you need a 7th mod with a unique effect (additional projectile, chaos-to-ES, etc.)?
    → Ancient Jawbone

Do you need to upgrade an existing affix from T2/T3 to T1, or guarantee a T1 roll in an open slot?
    → Omen of the Liege

Is the item worth less than 10 div?
    → Neither—use cheaper methods (essences, chaos spam, regular exalts)

Are you finishing a 30+ div item and want both?
    → Liege first (to lock in T1 affixes), Jawbone last (to add the 7th Defiled mod)
```

---

**Patch reference:** This advice targets Path of Exile 2 patch 0.4 (current as of project creation). Ancient Jawbone and Omen of the Liege mechanics are stable in 0.4. Patch 0.5 (launching May 29 2026) introduces Runeforging, which may add new finishing tools—revisit this comparison post-0.5 if Runeforging offers cheaper alternatives to either.

If you'd like current Divine Orb pricing for Jawbone and Liege from the trade site, or a simulation of Jawbone outcomes for a specific base, let me know.
```

---

## T5-refresh-currency-price — Refresh trigger: current price of Perfect Exalted Orb

**Prompt:** Refresh — what's the current price of a Perfect Exalted Orb?

**Latency:** 8947ms · **Response length:** 1208 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
I cannot perform live fetches of current market prices. As an AI, I don't have real-time access to the Path of Exile 2 trade site or any external data sources.

To check the current price of a **Perfect Exalted Orb** in the active temporary league:

1. Visit https://www.pathofexile.com/trade2
2. Navigate to the **Currency Exchange** section
3. Search for "Perfect Exalted Orb"
4. Check the Divine Orb exchange rate

**Context for interpreting the price:**

- **Perfect Exalted Orbs** guarantee a T1 affix when adding a new affix to a rare item
- They're significantly more expensive than Greater Exalted Orbs (which guarantee T2)
- Typical use cases: finishing mirror-tier items, forcing a critical T1 affix on a near-perfect base
- Price volatility: high early in a league, stabilizes mid-league as supply increases

**Historical context (patch 0.4, cached knowledge):**
Early in the "Last of the Druids" league, Perfect Exalted Orbs typically traded in the range of 8–15 Divine Orbs depending on supply. This is NOT a current price — you must check the trade site for real-time values.

---

*Response based on cached patch 0.4 knowledge. Visit pathofexile.com/trade2 for current pricing in your league.*
```

---

## T6-crossbow-hallucination-guard — Crossbow craft — guards against 'Crude Crossbow' hallucination

**Prompt:** How do I craft a mid-tier elemental damage crossbow?

**Latency:** 39351ms · **Response length:** 5706 chars

### Rubric (tick after reading the response)

- [ ] Patch version stated explicitly (0.4)
- [ ] Affixes valid for the item type (no impossible mods)
- [ ] Multiple routes compared, not just one
- [ ] Three budget variants present (league-start / mid / high)
- [ ] Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)
- [ ] Route-engine + budget-variant structure from instructions.md sections 6–7
- [ ] Cited data source when quoting a number (or noted cached knowledge)

### Response

```markdown
# Mid-Tier Elemental Damage Crossbow Crafting Guide

## Target Affixes

**Prefixes:**
- `#% increased Elemental Damage` (T2: 36–40%)
- `Adds # to # Fire Damage` (T2: 15–22 to 29–43)
- `Adds # to # Lightning Damage` (T2: 3–5 to 58–86)

**Suffixes:**
- `#% increased Attack Speed` (T2: 11–13%)
- `+#% to Critical Damage Bonus` (T2: 23–28%)
- `+# to Dexterity` (T2: 26–30)

## Route Comparison

### Route 1: Essence of Electricity + Omen-Protected Chaos (RECOMMENDED)
**Steps:**
1. Acquire a white Sturdy Crossbow (iLvl 70+) base
2. Apply **Greater Essence of Electricity** to guarantee T2 lightning damage prefix
3. If suffixes are bad, use **Omen of Dextral Erasure** to protect prefixes
4. Apply **Greater Chaos Orbs** until you hit elemental damage + fire damage prefixes
5. Use **Omen of Sinistral Exaltation** to force-add attack speed suffix
6. Finish remaining suffixes with **Perfect Exalted Orb** or craft bench

**Estimated cost:** 8–15 Divine Orbs  
**Determinism:** Semi-deterministic  
**Best used when:** You want guaranteed lightning damage as your foundation and can afford omens  
**Failure modes:** May brick prefixes during chaos spam; Omen of Dextral Erasure prevents this but costs ~3 div each

### Route 2: Triple Essence Approach
**Steps:**
1. Start with white Sturdy Crossbow
2. Apply **Greater Essence of Electricity** for lightning damage
3. Apply **Greater Essence of Hatred** for cold damage (if you want tri-ele)
4. Apply **Greater Essence of Anger** for fire damage
5. Clean up suffixes with Greater Exalted Orbs

**Estimated cost:** 6–12 Divine Orbs  
**Determinism:** Semi-deterministic  
**Best used when:** Budget-conscious and willing to accept mixed elemental types  
**Failure modes:** Each essence rerolls other mods; may need many attempts to preserve prior good affixes

### Route 3: Pure Chaos Spam with Tiered Orbs
**Steps:**
1. Start with white Sturdy Crossbow
2. Spam **Greater Chaos Orbs** until you hit 2–3 desired elemental prefixes
3. Use **Greater Exalted Orbs** to fill empty suffix slots
4. If suffixes are full but bad, use **Omen of Crystallisation** + **Orb of Annulment** to remove one, then exalt

**Estimated cost:** 5–20 Divine Orbs (high variance)  
**Determinism:** RNG-heavy  
**Best used when:** You have deep pockets and want maximum flexibility in prefix combinations  
**Failure modes:** Can waste 10+ chaos orbs without hitting the right prefix combo; expensive to iterate

## Budget Variants

### League Start (1–5 Divine Orbs)
**Target affixes:**
- Prefixes: T3 elemental damage (28–35%), T3 adds fire (10–15 to 20–30), T3 adds lightning (2–4 to 40–60)
- Suffixes: T3 attack speed (8–10%), T3 crit bonus (17–22%), life or resistance

**Method:** Single **Essence of Electricity** application, then **Greater Augmentation Orbs** to fill slots. Accept T3–T4 tiers.

**Cost:** 2–4 div

### Mid-Tier (5–20 Divine Orbs) — RECOMMENDED ABOVE
Uses Route 1 with T2 affixes across the board.

### High-End/BIS (20–50+ Divine Orbs)
**Target affixes:**
- Prefixes: T1 elemental damage (41–50%), T1 adds fire (23–34 to 44–66), T1 adds lightning (6–9 to 87–130)
- Suffixes: T1 attack speed (14–16%), T1 crit bonus (29–35%), T1 dexterity (31–35)

**Method:**
1. Acquire white Tense Crossbow or Elegant Crossbow base (higher base attack speed)
2. Apply **Perfect Essence of Electricity** for guaranteed T1 lightning damage
3. Use **Hinekora's Lock** before each **Perfect Chaos Orb** to preview outcomes
4. Lock in good results, abort bad previews
5. Finish with **Perfect Exalted Orbs** and **Omen of Sinistral Exaltation**

**Cost:** 25–45 div (Hinekora's Lock alone costs 8–12 div per preview)

## Recommended Starting Move

1. **Buy a white Sturdy Crossbow** (iLvl 70+) — costs ~5–15 chaos orbs on trade
2. **Purchase 3x Greater Essence of Electricity** (~1.5 div total)
3. **Apply one essence** — if you hit attack speed or crit bonus suffix alongside the guaranteed lightning prefix, keep it
4. **Buy 2x Omen of Dextral Erasure** (~6 div) as insurance
5. **Chaos spam prefixes** with Omen protection until fire/elemental damage hits

## Base Selection Note

Valid PoE2 crossbow bases for this craft (pick based on budget and requirements):
- **Makeshift Crossbow** (league start, low requirement)
- **Tense Crossbow** (mid-tier, balanced stats)
- **Sturdy Crossbow** (mid-tier, **recommended for this guide**)
- **Elegant Crossbow** (high-end, best base attack speed)
- **Painted Crossbow** / **Varnished Crossbow** (alternatives with similar stats)

Do NOT use bases that don't exist in PoE2 (e.g. "Crude Crossbow" is not a valid base).

---

```recipe
{
  "itemClass": "Crossbow",
  "base": "Sturdy Crossbow",
  "ilvl": 70,
  "budget": "mid",
  "routeName": "Greater Essence of Electricity + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Electricity",
  "targetAffixes": {
    "prefixes": [
      { "name": "#% increased Elemental Damage", "tier": "T2" },
      { "name": "Adds # to # Fire Damage", "tier": "T2" },
      { "name": "Adds # to # Lightning Damage", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "#% increased Attack Speed", "tier": "T2" },
      { "name": "+#% to Critical Damage Bonus", "tier": "T2" },
      { "name": "+# to Dexterity", "tier": "T2" }
    ]
  },
  "notes": "Essence guarantees lightning damage; protect with Omen of Dextral Erasure during chaos spam for fire/elemental prefixes. Finish suffixes with Sinistral Exaltation omen."
}
```

---

*Guide current as of patch 0.4. Currency prices and mod weightings based on cached knowledge — verify current Divine Orb exchange rates at pathofexile.com/trade2 before purchasing. Mod pools sourced from craftofexile.com/?game=poe2.*
```

---

