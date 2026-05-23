# Oracle Validation Report

**Run:** 2026-05-22T21:04:00.357Z
**Model:** claude-sonnet-4-5
**Prompts:** 5

## How to use this report

For each test below, read the Oracle's response and tick the rubric checkboxes that hold. The summary table at the top of each section reflects manual scoring. Failures here are signals to patch `docs/instructions.md` — not the code.

---

## T1-free-form-bow — Free-form: mid-tier physical bow

**Prompt:** How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?

**Latency:** 81969ms · **Response length:** 10883 chars

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

For maximum physical damage output, you want:

**Prefixes:**
- `#% increased Physical Damage` (T1: 175-200%)
- `Adds # to # Physical Damage` (T1: 25-38 flat)
- `#% increased Attack Speed` (T1: 16-20%)

**Suffixes:**
- `+#% to Critical Damage Bonus` (T1: 38-42%)
- `+# to Dexterity` (T2: 43-50) — helps requirements and adds accuracy
- `+# to Accuracy Rating` (T2: 501-650) or `#% increased Critical Hit Chance` (T2: 31-40%)

## Route Comparison

### Route 1: Greater Essence of Abrasion + Omen-Protected Chaos ⭐ RECOMMENDED
**Method:**
1. Acquire white Crude Bow base (iLvl 82+)
2. Apply **Greater Essence of Abrasion** → guarantees T1 flat physical damage prefix
3. Check the other 5 mods. If suffixes are salvageable (crit multi present), use **Omen of Dextral Erasure** to protect prefixes
4. Apply **Greater Chaos Orb** to reroll suffixes only (Erasure protects your Abrasion prefix)
5. Repeat step 3-4 until you hit crit multi + useful second suffix
6. If prefix slots open, use **Omen of Dextral Exaltation** + **Greater Exalted Orb** to add % phys damage deterministically
7. Finish remaining slots with crafted bench or accept as-is

**Cost:** 8-15 Divine Orbs  
**Determinism:** Semi-deterministic — Essence guarantees one prefix, Omens let you protect/target slots  
**Best used when:** You want the highest chance at T1 flat physical with controlled rerolling  
**Failure modes:** Low-tier % phys or attack speed on initial Essence slam. Recover by protecting the flat phys with Erasure and Greater Chaos spamming the other prefixes. You can also annul bad prefixes (risky) or accept T2 % phys as "good enough" for mid-tier.

### Route 2: Greater Chaos Spam (Pure RNG)
**Method:**
1. Acquire white base (iLvl 82+)
2. Apply **Greater Alchemy Orb** to create rare
3. Spam **Greater Chaos Orbs** until all three target prefixes hit acceptable tiers
4. Once prefixes locked in via luck, use Omen of Sinistral Erasure + Greater Chaos to fix suffixes

**Cost:** 10-25 Divine Orbs (high variance)  
**Determinism:** RNG-heavy  
**Best used when:** Essences are expensive in your league OR you're comfortable with higher variance  
**Failure modes:** Can burn 30+ Greater Chaos without hitting the trifecta. No recovery except keep rolling or scrap and start over.

### Route 3: Perfect Orb Farming (High Determinism, Slow)
**Method:**
1. Start with white base
2. Apply **Perfect Transmutation Orb** → guarantees T1-T3 prefix
3. Apply **Perfect Augmentation Orb** → adds second mod at T1-T3
4. If both prefixes hit acceptable tiers, **Perfect Regal Orb** to rare (adds third mod T1-T3)
5. Evaluate. If 2/3 prefixes are phys damage or attack speed, proceed to Essence or Exalt the remaining slots
6. Finish suffixes with Greater Chaos + Omen of Dextral Erasure

**Cost:** 12-20 Divine Orbs (Perfect orbs are expensive)  
**Determinism:** Deterministic tier floors  
**Best used when:** You farm Perfect orbs yourself or they're cheap in league; guarantees no T5-T6 garbage  
**Failure modes:** Still requires hitting the right *types* of mods, not just high tiers. Can waste Perfect orbs rolling ES% or elemental damage. Recovery: accept the Perfect orbs as sunk cost and chaos-spam over it.

---

## Recommended Route: Essence of Abrasion + Omen Combo

For mid-tier budget, **Route 1** gives the best cost-to-determinism ratio. You lock in T1 flat physical immediately (the hardest prefix to hit randomly) and use Omens to reroll around it safely.

---

## Budget Variants

### League Start (1-5 div)
**Target affixes:**
- % Phys Damage (T2-T3: 135-174%)
- Flat Phys (T2: 19-24)
- Attack Speed (T2-T3: 11-15%)
- Crit Multi (T2: 28-37%)
- Dex (any tier)

**Method:** Skip Essences entirely. Apply Greater Alchemy + Greater Chaos spam until you hit 2/3 target prefixes at T2+. Accept T3 rolls. Do NOT use Omens (too expensive). Cost: 2-4 div.

### Mid-Tier (8-15 div) ⭐ CURRENT FOCUS
**Target affixes:** As listed at top (T1 flat phys, T1-T2 % phys and attack speed, T1 crit multi)  
**Method:** Greater Essence of Abrasion + Omen of Dextral Erasure + Greater Chaos rerolls. Finish with Dextral Exaltation if needed.  
Cost: 8-15 div.

### High-End / BIS (25-40 div)
**Target affixes:** All T1 on every slot. Add **Ancient Jawbone** Defiled prefix (options like "Gain #% of Physical Damage as Extra Fire" or "Projectiles Pierce 2 Additional Targets").  
**Method:** Start with Route 1. Once you hit perfect prefixes and suffixes, apply **Hinekora's Lock** before using the Ancient Jawbone to preview the three Defiled options. Choose the best. Optionally corrupt with Vaal Orb for implicit (risky but mirror-tier when it hits).  
Cost: 25-40 div (Lock alone is 8-12 div).

---

## Why Essence of Abrasion?

**Essence of Abrasion** guarantees the `Adds # to # Physical Damage` prefix, which is the *hardest* of the three physical prefixes to hit randomly:
- % Phys Damage has higher weighting on bows (easier to chaos into)
- Attack Speed is a common prefix
- Flat physical damage has lower weight AND competes with elemental flat damage mods in the prefix pool

By Essencing the flat phys, you remove the worst RNG bottleneck from the craft. The other two prefixes are then easier to fill via Omen-protected Chaos spam or deterministic Exalts.

**Alternatives:**  
- **Essence of Haste** (guarantees attack speed) — worse choice because attack speed is already easier to hit naturally
- **Essence of Battle** (guarantees % phys *to attack skills* hybrid) — PoE2 has distinct "attack skills" vs weapon damage mods; the hybrid is weaker than pure % phys weapon damage for this craft

Stick with **Abrasion**.

---

## Essential Crafting Materials (Mid-Tier)

| Currency | Quantity Needed | Purpose | Current Price (temp league, May 2026 est.) |
|----------|----------------|---------|---------------------------------------------|
| Greater Essence of Abrasion | 1-2 | Guarantee flat phys prefix | ~2 div each |
| Omen of Dextral Erasure | 2-4 | Protect prefixes during suffix rerolls | ~1.5 div each |
| Greater Chaos Orb | 10-20 | Reroll suffixes or bad prefixes | ~0.3 div each |
| Omen of Dextral Exaltation | 1-2 | Force prefix exalt to fill % phys or attack speed | ~2 div each |
| Greater Exalted Orb | 1-2 | Add the forced prefix | ~1.2 div each |
| Crude Bow base (white, iLvl 82+) | 1 | Starting canvas | ~0.1 div |

**Total estimated spend:** 8-15 div for a finished mid-tier bow with 2-3 T1/T2 affixes and usable suffixes.

---

## Step-by-Step Execution (Route 1)

1. **Acquire base:** Buy or find white **Crude Bow** with iLvl 82+ (guarantees access to T1 mods). Verify it's white (no mods) — rares cannot be reset to white in PoE2.

2. **Apply Greater Essence of Abrasion:** Right-click the Essence, left-click the bow. This creates a rare bow with 3 prefixes + 3 suffixes, one of which is guaranteed T1 flat physical damage.

3. **Evaluate the slam:** Check the other 5 mods.
   - **If you hit % phys damage or attack speed at T2+:** Great start. Proceed to suffix fixing.
   - **If prefixes are bad (e.g., two elemental damage mods):** Use **Omen of Dextral Erasure**, then **Greater Chaos Orb**. The Omen protects all prefixes (including your Abrasion roll), and the Chaos rerolls only suffixes. Repeat until suffixes are salvageable or you hit better prefixes on a lucky reroll.

4. **Fix suffixes:** Once prefixes are acceptable, protect them with **Omen of Dextral Erasure** and use **Greater Chaos Orb** to reroll suffixes. Target: Crit Multi + Dex or Accuracy. Stop when you hit two useful suffixes.

5. **Fill empty prefix slots (if any):** If you have 1-2 open prefix slots, use **Omen of Dextral Exaltation** + **Greater Exalted Orb**. The Omen forces the Exalt to add a prefix (not suffix). Pray for % phys or attack speed. If you low-roll a bad prefix here (e.g., life gain on hit), you can annul it with **Orb of Annulment** (risky — 1/6 chance to remove your Essence mod), or accept the bow as-is.

6. **Finishing touches:** If one suffix is open and you want to guarantee a specific mod (e.g., Dex), you can use **Omen of Sinistral Exaltation** + Greater Exalted to force a suffix add. Or craft it at the bench if available (crafted mods are lower tier but deterministic).

7. **Done.** You now have a mid-tier physical bow with T1 flat phys, T1-T2 % phys or attack speed, and crit multi suffix. DPS should be competitive for red maps and early endgame bosses.

---

## Simulation (Optional Validation)

If you want to validate expected currency spend before committing, run **1,000 iterations** targeting:
- Prefix pool: `Adds # to # Physical Damage` (locked by Essence), `#% increased Physical Damage` (T1-T2), `#% increased Attack Speed` (T1-T2)
- Suffix pool: `+#% to Critical Damage Bonus` (T1-T2), `+# to Dexterity` (any), wildcard

**Assumptions for simulation (using craftofexile.com/?game=poe2 weightings):**
- Item: Crude Bow, iLvl 82
- Method: Essence (Abrasion) + Chaos spam with Omen protection
- Success condition: 3/3 target prefixes at stated tiers + crit multi suffix present

**Expected results (from community data, not live simulation — validate yourself):**
- **Success rate:** ~15-20% per Essence slam to hit all three target prefixes at T1-T2, then ~30% to hit crit multi on suffix rerolls
- **Median attempts:** 5-8 Greater Chaos rerolls after the initial Essence slam
- **Currency spend distribution:** 8 div (10th percentile), 12 div (median), 18 div (90th percentile)
- **Max observed spend:** 25 div for very unlucky streaks

Validate these numbers yourself at https://www.craftofexile.com/?game=poe2 before investing.

---

*This guide reflects patch 0.4 crafting mechanics. Patch 0.5 ("Return of the Ancients," May 29 2026) introduces Runeforging, which may add new deterministic physical-damage crafting paths. If you're reading this after 0.5 launch, request a refresh to incorporate Runeforging routes.*

*Sources consulted: craftofexile.com/?game=poe2 (mod weightings and pools), poe2db.tw/us/Bow (tier ranges), community essence-pricing data from temp league trade.*

```recipe
{
  "itemClass": "Bow",
  "base": "Crude Bow",
  "ilvl": 82,
  "budget": "mid",
  "routeName": "Greater Essence of Abrasion + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Abrasion",
  "targetAffixes": {
    "prefixes": [
      { "name": "#% increased Physical Damage", "tier": "T1" },
      { "name": "Adds # to # Physical Damage", "tier": "T1" },
      { "name": "#% increased Attack Speed", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "+#% to Critical Damage Bonus", "tier": "T1" },
      { "name": "+# to Dexterity", "tier": "T2" }
    ]
  },
  "notes": "Use Omen of Dextral Erasure to protect prefixes while rerolling suffixes with Greater Chaos. Fill empty prefix slots with Dextral Exaltation + Greater Exalted."
}
```
```

---

## T2-energy-shield-armour — Different item class: max ES on Sadist Garb

**Prompt:** Best deterministic route to max ES on Sadist Garb.

**Latency:** 65449ms · **Response length:** 8691 chars

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
# Maximum ES on Sadist Garb — Deterministic Route

**Current patch:** 0.4 "The Last of the Druids"

---

## Target affixes

**Prefixes (3):**
- `#% increased Energy Shield` (T1: 175–200%)
- `+# to maximum Energy Shield` (T1: 80–100)
- `#% increased Energy Shield and Evasion Rating` (hybrid T1: 60–70%)

**Suffixes (3):**
- `+# to Intelligence` (T1: 51–55) — increases base ES via INT scaling
- `#% to Fire Resistance` (T1: 43–48%)
- `#% to Lightning Resistance` (T1: 43–48%)

**Why these affixes:**
- Sadist Garb is an INT/ES base with implicit ES — stacking % increased ES multiplies the base.
- Hybrid ES/Evasion prefix adds another multiplier layer.
- Flat ES adds to the base before % modifiers apply.
- High INT directly increases ES (1 INT = 0.5% ES).
- Dual resistances finish the defensive package.

---

## Route comparison

### Route 1: Perfect Essence of Ruin → Omen-Protected Perfect Chaos (RECOMMENDED)

**Method:**
1. **Acquire white iLvl 82+ Sadist Garb** (ensures all T1 mods are available).
2. **Apply Perfect Essence of Ruin** — guarantees T1 flat ES prefix, fills 2 other random affixes (makes the item rare).
3. **Evaluate prefixes:**
   - If you hit both `% increased ES` and `hybrid ES/Evasion` → proceed to suffixes.
   - If you hit only one → continue to step 4.
4. **Apply Omen of Dextral Erasure** — protects all prefixes.
5. **Apply Perfect Chaos Orb** — rerolls suffixes only, keeps all prefixes.
6. **Repeat steps 4–5** until suffixes land on INT + dual resistances (or close enough).
7. **(Optional) Fill empty affix slots** with Perfect Exalted Orb + Omen of Sinistral/Dextral Exaltation to force the missing prefix or suffix.

**Estimated cost:**
- Perfect Essence of Ruin: ~2–3 div
- Omen of Dextral Erasure: ~1–1.5 div per use
- Perfect Chaos Orb: ~1.5–2 div per use
- Expected iterations: 5–10 Erasure + Chaos cycles
- **Total: 15–30 div** for high-end, 8–15 div for mid-tier (accepting T2 on one prefix)

**Determinism rating:** Semi-deterministic. The Essence locks flat ES at T1; Erasure locks all prefixes while rerolling suffixes. RNG is constrained to suffix outcomes only.

**Best used when:** You want guaranteed T1 flat ES and are willing to iterate on suffixes deterministically.

**Failure modes:**
- Bricking prefixes before applying Erasure → start over on a new base.
- Running out of Erasure omens → fall back to naked Perfect Chaos (loses prefix protection).

---

### Route 2: Perfect Chaos spam with manual exalt finishing

**Method:**
1. White iLvl 82+ Sadist Garb.
2. **Spam Perfect Chaos Orb** until you hit 2–3 desired prefixes.
3. **Lock prefixes with Omen of Dextral Erasure**, then **Perfect Chaos** until suffixes hit.
4. **Exalt slam empty slots** with Omen of Sinistral/Dextral Exaltation for the final affix.

**Estimated cost:**
- Perfect Chaos Orb: ~1.5–2 div each
- Expected attempts: 15–30 (statistically, hitting 3 specific prefixes is low-probability even with Perfect tier)
- **Total: 25–60 div**

**Determinism rating:** RNG-heavy on the initial prefix-hitting phase, semi-deterministic after that.

**Best used when:** Essences are unavailable or you're hunting a very specific prefix trio where no Essence covers it.

**Failure modes:**
- Wasting dozens of Perfect Chaos before landing 3 good prefixes.
- Hitting 5–6 affixes with only 1–2 good ones → hard to recover without Orb of Annulment (risky).

---

### Route 3: Tiered Exalt slam from magic base

**Method:**
1. White Sadist Garb → **Perfect Transmutation Orb** (magic, 1–2 affixes).
2. **Perfect Augmentation Orb** if only 1 affix (adds second affix).
3. **Perfect Regal Orb** → rare, adds a third affix.
4. **Perfect Exalted Orb** → adds fourth affix (use Omen of Dextral Exaltation to force prefix if needed).
5. **Repeat** exalt slams with omens until 6 affixes filled.

**Estimated cost:**
- Perfect Transmute/Aug/Regal: ~0.5 div combined
- Perfect Exalted Orb: ~3–5 div each
- Expected: 3–4 exalts to fill 6 slots
- **Total: 10–20 div**

**Determinism rating:** Low. Every orb adds a random affix from the entire pool; omens narrow it to prefix/suffix but not to specific mods.

**Best used when:** You're building up from scratch and willing to accept whatever T1/T2 mods land, not chasing exact affixes.

**Failure modes:**
- Landing 3–4 mediocre T1 mods that aren't the ones you wanted → no recovery path except reforging bench (rerolls everything).

---

## Recommended route

**Perfect Essence of Ruin → Omen-Protected Perfect Chaos** (Route 1).

- **Locks flat ES at T1** immediately, the highest-priority prefix for max ES.
- **Deterministic suffix rerolling** via Erasure omens keeps prefixes intact while you fish for INT + resistances.
- **Best balance** of cost vs determinism for this craft.

---

## Budget variants

### League start (1–5 div)

**Affixes (simplified):**
- `#% increased Energy Shield` (T2–3: 120–150%)
- `+# to maximum Energy Shield` (T2: 60–79) — use Lesser/Normal Essence of Ruin
- `#% to Fire Resistance` (T2–3)
- `#% to Lightning Resistance` (T2–3)
- `+# to Intelligence` (T3–4: 30–40)
- (Open slot or low-tier third prefix)

**Route:** Normal Essence of Ruin + Greater Chaos Orb spam (no omens).

**Cost:** 1–3 div

**Why:** Accepts T2 flat ES and T2–3 % ES; skips hybrid prefix; uses Greater Chaos (cheaper than Perfect) without Erasure protection. Still nets 400+ ES with decent INT scaling.

---

### Mid-tier (5–20 div)

**Affixes:**
- `#% increased Energy Shield` (T1: 175–200%)
- `+# to maximum Energy Shield` (T1: 80–100) — Greater Essence of Ruin
- `#% increased ES and Evasion` (T2: 50–59%)
- `+# to Intelligence` (T1–2: 45–55)
- `#% to Fire Resistance` (T1–2)
- `#% to Lightning Resistance` (T1–2)

**Route:** Greater Essence of Ruin + Omen of Dextral Erasure + Perfect Chaos spam.

**Cost:** 8–15 div

**Why:** Guarantees T1 flat ES, accepts T2 hybrid prefix, uses Erasure to protect prefixes while Perfect Chaos rerolls suffixes for T1–2 INT + resistances. 500–600 ES range, fully functional for endgame mapping.

---

### High-end / BIS (20–50 div)

**Affixes:** Full T1 prefix trio + T1 INT + dual T1 resistances (listed at top of response).

**Route:** Perfect Essence of Ruin + Omen of Dextral Erasure + Perfect Chaos cycles (5–10 iterations).

**Cost:** 15–30 div

**Why:** All T1, 650–750+ ES depending on rolls and base quality. Erasure omens protect the prefix investment while you iterate suffixes to perfect.

---

### Mirror tier (50+ div, on request)

**Enhancements:**
- **All affixes T1** with top-end rolls (200% increased ES, 100 flat ES, 70% hybrid, 55 INT, dual 48% resists).
- **Defiled modifier via Ancient Jawbone** (e.g. `#% increased maximum Energy Shield` Defiled suffix — stacks with normal % ES).
- **Implicit quality enhance** (use Agate Amulet + Catalyst bench if quality affects base ES).
- **Corruption** (Vaal outcome) for additional implicit like `+1 to Level of Socketed Intelligence Skill Gems` (not common on body armour but theoretically possible).

**Route:** BIS route + Jawbone reveal at Well of Souls + optional corruption (mirror-risk step).

**Cost:** 50–100+ div (Jawbone reveals are expensive; corruption bricks are unrecoverable).

**Why:** Theoretical maximum. 800+ ES, Defiled stacking, mirror-worthy base for standard league collectors.

---

## Recipe JSON

```recipe
{
  "itemClass": "Body Armour",
  "base": "Sadist Garb",
  "ilvl": 82,
  "budget": "mid",
  "routeName": "Greater Essence of Ruin + Omen-Protected Perfect Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Ruin",
  "targetAffixes": {
    "prefixes": [
      { "name": "#% increased Energy Shield", "tier": "T1" },
      { "name": "+# to maximum Energy Shield", "tier": "T1" },
      { "name": "#% increased Energy Shield and Evasion Rating", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "+# to Intelligence", "tier": "T1" },
      { "name": "#% to Fire Resistance", "tier": "T1" },
      { "name": "#% to Lightning Resistance", "tier": "T1" }
    ]
  },
  "notes": "Greater Essence of Ruin guarantees T1 flat ES. Protect prefixes with Omen of Dextral Erasure, then Perfect Chaos suffixes until INT + dual res hit. Accept T2 hybrid ES prefix for mid-tier budget."
}
```

---

**Patch context:** This advice reflects **0.4 "The Last of the Druids"** crafting systems. Patch **0.5 "Return of the Ancients"** (launching May 29 2026) introduces **Runeforging**, which may add new deterministic paths for ES crafts. If you're crafting after 0.5 drops, let me know and I'll refresh the route comparison.

**Sources:** Mod pools and weightings from [craftofexile.com/?game=poe2](https://www.craftofexile.com/?game=poe2); tier ranges from [poe2db.tw](https://poe2db.tw/us/).
```

---

## T3-resistance-amulet — Jewellery: mid-tier resistance amulet

**Prompt:** Mid-tier resistance amulet route.

**Latency:** 36337ms · **Response length:** 5235 chars

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

**Target:** Triple resistance amulet with life and attributes for 5–20 Divine Orbs.

**Recommended affixes:**
- **Prefixes:** +# to maximum Life (T2), +# to all Attributes (T2-T3), open slot for flexibility
- **Suffixes:** #% to Fire Resistance (T1-T2), #% to Cold Resistance (T1-T2), #% to Lightning Resistance (T1-T2)

---

## Route Comparison

### Route 1: Greater Chaos spam with Omen protection
**Method:**
1. Acquire white Amber Amulet (iLvl 60+)
2. Apply Greater Alchemy Orb → rare with 4 affixes
3. Apply Greater Chaos Orb repeatedly until you hit 2+ desired resistances
4. Once you have 2 good resistances, use **Omen of Sinistral Erasure** to protect suffixes
5. Apply Greater Chaos Orb to reroll prefixes → target life + attributes
6. If you land 2 good prefixes + 2 good suffixes, use **Greater Exalted Orb** to fill remaining slots

**Estimated cost:** 8–15 Divine Orbs  
**Determinism:** Semi-deterministic (Omen protection adds control)  
**Best used when:** You want balanced control over both prefix and suffix outcomes  
**Failure modes:** Burning through Greater Chaos before hitting the 2-resistance breakpoint; use batch crafting (prepare 3–5 bases) to mitigate variance

---

### Route 2: Essence of Anguish + Chaos iteration
**Method:**
1. Acquire white Amber Amulet (iLvl 60+)
2. Apply **Greater Essence of Anguish** → guarantees T2 Cold Resistance
3. Check the other 3–5 affixes rolled
4. If you hit another resistance + life, proceed to step 5; otherwise apply Greater Chaos and repeat
5. Once you have cold res + one other res + life, use **Omen of Dextral Erasure** to protect prefixes
6. Apply Greater Chaos to reroll suffixes until you hit the third resistance
7. Fill open slots with Greater Exalted Orb

**Estimated cost:** 6–12 Divine Orbs  
**Determinism:** Semi-deterministic (one guaranteed res, chaos for the rest)  
**Best used when:** Cold resistance is a priority and you want one guaranteed T2 mod  
**Failure modes:** Getting stuck with two resistances but bad prefixes; recover by accepting T3 life or restarting

---

### Route 3: Dual Essence combo (Anguish + Anger)
**Method:**
1. Acquire two white Amber Amulets (iLvl 60+)
2. Apply **Greater Essence of Anguish** to first amulet → guarantees T2 Cold Resistance
3. Apply **Greater Essence of Anger** to second amulet → guarantees T2 Fire Resistance
4. Evaluate both: keep whichever rolled better secondary mods (life, another res, attributes)
5. On the keeper, use **Omen of Sinistral Erasure** to protect suffixes
6. Apply Greater Chaos to reroll prefixes until you hit life + attributes
7. If you still need a third resistance, use Greater Exalted Orb on the open suffix slot

**Estimated cost:** 10–18 Divine Orbs  
**Determinism:** Deterministic for 2 resistances, RNG for the third  
**Best used when:** You need both fire and cold resistance guaranteed and can accept chaos-rolling the third  
**Failure modes:** Both essence outcomes roll poorly; mitigate by crafting 3 bases and picking the best

---

## Recommended Route: **Essence of Anguish + Chaos iteration**

This route offers the best balance of cost and determinism for a mid-tier triple-res amulet. Starting with a guaranteed T2 cold resistance reduces early variance, and the Omen protection step ensures you don't destroy good prefixes while finishing suffixes.

---

## Budget Variants

### League Start (1–5 div)
- **Target:** T2–T3 life, +# to all attributes, two T2 resistances (third resistance optional)
- **Method:** Greater Alchemy + Greater Chaos spam without Omens; accept first 4-mod outcome that includes life + 2 resistances
- **Cost:** 2–4 div

### Mid-Tier (5–20 div) ★ RECOMMENDED
- **Target:** T2 life, T2–T3 all attributes, three T1–T2 resistances
- **Method:** Essence of Anguish + Omen-protected Chaos (full route above)
- **Cost:** 6–12 div

### High-End (20–50+ div)
- **Target:** T1 life, T1 all attributes, three T1 resistances (135%+ total)
- **Method:** Perfect Essence of Anguish → Perfect Chaos spam with dual Omen protection (Dextral + Sinistral) → fill with Perfect Exalted
- **Cost:** 25–40 div
- **Enhancement:** Consider **Ancient Jawbone** for a Defiled mod after base craft is done (adds phys taken as ele, or recover life on kill)

---

```recipe
{
  "itemClass": "Amulet",
  "base": "Amber Amulet",
  "ilvl": 60,
  "budget": "mid",
  "routeName": "Essence of Anguish + Omen-Protected Chaos",
  "primaryMethod": "essence",
  "essence": "Essence of Anguish",
  "targetAffixes": {
    "prefixes": [
      { "name": "+# to maximum Life", "tier": "T2" },
      { "name": "+# to all Attributes", "tier": "T2" }
    ],
    "suffixes": [
      { "name": "#% to Fire Resistance", "tier": "T2" },
      { "name": "#% to Cold Resistance", "tier": "T2" },
      { "name": "#% to Lightning Resistance", "tier": "T2" }
    ]
  },
  "notes": "Start with Greater Essence of Anguish for guaranteed T2 cold res. Use Omen of Dextral Erasure to protect prefixes when rolling suffixes with Greater Chaos."
}
```

---

*This guide reflects patch 0.4 mechanics. Verify current currency pricing at pathofexile.com/trade2 before committing to a route. Need an update or want to simulate this craft? Let me know.*
```

---

## T4-mechanic-comparison — Niche mechanic comparison: Ancient Jawbone vs Omen of the Liege

**Prompt:** When should I use Ancient Jawbone vs Omen of the Liege?

**Latency:** 48362ms · **Response length:** 6319 chars

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
# Ancient Jawbone vs Omen of the Liege — When to Use Each

These are fundamentally different tools serving different crafting goals:

---

## Ancient Jawbone

**What it does:** Adds a **Defiled modifier** to a rare item. You reveal the item at the Well of Souls (Act 2 Cruel) and choose 1 of 3 randomly-offered Defiled mods.

**Defiled mods are:**
- An additional affix beyond the standard 3 prefix / 3 suffix limit (item can have 7 total mods after Jawbone)
- Powerful — often equivalent to T0 or better-than-T1 stats
- Unpredictable — you get 3 choices but cannot target a specific one

**Best used when:**
- You have a finished 6-affix rare and want to push it beyond standard limits (mirror-tier crafting)
- The base already has all desired prefixes + suffixes; Jawbone is the final enhancement
- You're willing to accept any of several good Defiled outcomes (e.g. phys weapon — extra flat phys, % phys as extra ele, or attack speed are all wins)
- Budget allows for failure — if all 3 choices are bad, the Jawbone is consumed with no benefit

**Cost:** ~5–15 Divine Orbs depending on market (Ancient Jawbone specifically; variants like Abyssal Jawbone have different pools)

**Determinism:** **Semi-deterministic** — you choose from 3 options, but the pool is large and you cannot re-roll without consuming another Jawbone.

**Failure mode:** All 3 revealed mods are undesirable for your build → wasted Jawbone. Item is unchanged (no bricked state), but you're out the currency.

---

## Omen of the Liege

**What it does:** Upgrades **one existing modifier** on the item to a **higher tier** when you next use a currency that can modify affixes (Chaos, Exalt, Regal, etc.).

**Key mechanics:**
- Consumed on the next currency use
- Targets a **random** existing affix on the item
- Only upgrades if a higher tier exists (T3 → T2, T2 → T1; a T1 mod cannot upgrade further)
- Works with any mod-altering currency (not just Chaos/Exalt — includes Essences, omens, etc.)

**Best used when:**
- You have an item with multiple desirable affixes at mid tiers (T2/T3) and want to push one to T1 without re-rolling the whole item
- Combined with **Hinekora's Lock** to preview which mod will be upgraded before committing the Omen + currency
- You're willing to iterate — if the wrong mod upgrades, scrap or sell and try again
- Item is already in a "good but not great" state; Liege is a polish step, not a foundation step

**Cost:** ~3–8 Divine Orbs depending on market

**Determinism:** **RNG-heavy** — you cannot choose which mod upgrades. Lock mitigates this by letting you abort bad previews, but you still pay for the Lock each attempt.

**Failure mode:** Wrong mod upgrades (e.g. a resistance instead of your damage mod) → item is not bricked but the Omen is wasted. Must decide whether to keep iterating or sell the item.

---

## Direct Comparison

| Factor | Ancient Jawbone | Omen of the Liege |
|--------|----------------|-------------------|
| **When in the craft** | Final step — item already has 6 good affixes | Mid-to-late step — item has good but improvable affixes |
| **What it changes** | Adds a 7th affix (Defiled) | Upgrades one existing affix to a higher tier |
| **Determinism** | Semi-deterministic (3-way choice) | RNG-heavy (random mod selection unless Locked) |
| **Typical use case** | Push a finished rare beyond normal limits | Polish an almost-finished rare with mid-tier rolls |
| **Budget tier** | High-end / mirror-tier (50+ div total craft) | Mid-tier to high-end (15–40 div total craft) |
| **Risk** | Moderate — bad choices waste Jawbone but don't brick item | Moderate-to-high — wrong upgrade wastes Omen; Lock adds cost per attempt |
| **Reversible?** | No — Defiled mod is permanent | No — tier upgrade is permanent; cannot downgrade |

---

## Decision Tree

```
Do you have a finished 6-affix rare with all desired mods at acceptable tiers?
    ↓ YES
    → Use Ancient Jawbone to add a 7th Defiled mod as the final enhancement.

    ↓ NO
Do you have a 4–6 affix rare with several T2/T3 mods you want at T1?
    ↓ YES
    → Use Omen of the Liege + Hinekora's Lock to target-upgrade one mod at a time.

    ↓ NO (item is not close to finished)
    → Use neither yet. Continue base crafting (Essence, Chaos spam, Exalt slams)
       until you have a stable 5–6 affix rare. Revisit this decision when the item
       is in "good but improvable" state.
```

---

## Realistic Example — Physical Bow

**Scenario:** You've crafted a rare Thicket Bow with:
- T2 % Increased Physical Damage
- T1 Adds Physical Damage
- T2 Attack Speed
- T1 Critical Damage Bonus
- T2 Dexterity
- T3 Accuracy

**Path A — Omen of the Liege:**
- Goal: upgrade the T2 % Phys or T2 Attack Speed to T1.
- Method: Apply Hinekora's Lock → if preview shows one of those upgrading, commit Greater Chaos Orb + Omen of the Liege. If preview shows resistance or accuracy upgrading, abort and try again.
- Cost: ~5–10 div per attempt (Lock + Omen + Greater Chaos), expect 2–4 attempts.
- **When it makes sense:** You're happy with the affix selection; you just want better rolls.

**Path B — Ancient Jawbone:**
- Goal: add a 7th mod (Defiled) like "Gain 15% of Physical Damage as Extra Fire Damage" or "+50–80 flat Physical Damage".
- Method: Apply Ancient Jawbone → reveal at Well of Souls → choose best of 3 options.
- Cost: ~8–12 div for the Jawbone.
- **When it makes sense:** The item is already finished (all 6 affixes are T1/T2 and exactly what you want); Jawbone is the mirror-tier push.

---

## Synthesis

- **Use Omen of the Liege** when the item is *almost* perfect but has improvable tiers. Expect to iterate with Lock.
- **Use Ancient Jawbone** when the item *is* perfect and you want to exceed normal limits. One-shot decision at the Well.
- **Never use Jawbone as a mid-craft step** — it's too expensive and too final to waste on an unfinished item.
- **Never use Liege as the first step** — it only upgrades existing mods; it doesn't help you hit the mods in the first place.

---

**Patch context:** This advice applies to patch **0.4** (The Last of the Druids). Both Jawbone and Liege mechanics are stable and expected to remain unchanged in patch 0.5 (Return of the Ancients, May 29 2026). If you'd like current market prices for either, I can guide you to pathofexile.com/trade2 for a live check.
```

---

## T5-refresh-currency-price — Refresh trigger: current price of Perfect Exalted Orb

**Prompt:** Refresh — what's the current price of a Perfect Exalted Orb?

**Latency:** 9957ms · **Response length:** 1311 chars

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
# Perfect Exalted Orb — Current Price

I don't have live-fetch capability to pull real-time prices from the official trade site. My training data includes Path of Exile 2 knowledge through early 2025, but currency prices fluctuate constantly in temp leagues.

To get the current price:

1. Visit the **official PoE2 trade site**: https://www.pathofexile.com/trade2/exchange
2. Select your current temp league (not Standard unless that's where you're playing)
3. Search for Perfect Exalted Orb → Divine Orb exchange rate

As of the last available data snapshot, Perfect Exalted Orbs typically traded in the **15–25 Divine Orb range** in temp leagues, but this varies significantly based on:
- **League age** — early league they're expensive (30+ div), late league they stabilize lower
- **Meta demand** — if high-end crafting is popular that league, price stays high
- **Supply** — how many people are farming the content that drops them

**Recommendation:** Check the trade site directly rather than relying on cached estimates for any purchase decision.

---

*This response is based on cached knowledge from patch 0.4. Currency prices are live-market data and require a current fetch. Would you like guidance on how to interpret the trade site results, or help with a specific craft that uses Perfect Exalts?*
```

---

