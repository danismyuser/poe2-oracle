# Verified Craft: Triple-Flat-Damage Attack Gloves (5 Divine Budget)

A budget-friendly attack gloves craft that produces gloves worth 10+ Divines for ~5 Divines of investment. The result is the offensive ceiling for attack gloves: 3× T1 flat damage prefixes + T1 attack speed + T1 critical damage bonus + 100% increased effect of Socketed Items.

## What this craft makes

**Item class:** Gloves (any attribute variant — DEX / STR / INT / hybrids)
**Specific base:** any iLvl 82+ gloves base that fits your build's defence type
**iLvl:** 82+ (required for T1 flat damage mods on attacks)
**Budget:** ~5 Divines (low-mid)
**Final outcome (6 mods):**
- **3× T1 flat damage prefixes** (any combination of Physical, Fire, Cold, Lightning — "to Attacks" because gloves are off-weapon, the canonical mod name on gloves is `Adds # to # X damage to Attacks`)
- **T1 Attack Speed** suffix (fractured at the start)
- **T1 Critical Damage Bonus** suffix (from Essence of Hysteria)
- **100% increased effect of Socketed Items** suffix (from Essence of Horror)

## Target affixes

**Prefixes (3):**
1. `Adds # to # X damage to Attacks` — T1, X = first damage type rolled (Phys / Fire / Cold / Lightning)
2. `Adds # to # Y damage to Attacks` — T1, second damage type (different from #1)
3. `Adds # to # Z damage to Attacks` — T1, third damage type (from desecrated reveal)

**Suffixes (3):**
1. **`#% increased Attack Speed`** — T1 — **FRACTURED on the base** (the whole craft depends on this)
2. **`#% increased Critical Damage Bonus`** — from Essence of Hysteria (which gives "(25-29)% increased Critical Damage Bonus" outcome on gloves)
3. **`100% increased effect of Socketed Items`** — from Essence of Horror (which gives this exact outcome on gloves or boots)

## Step-by-step craft

### Step 1 — The Foundation (fractured base)
- Start with **gloves that have a fractured T1 Attack Speed suffix**. Buy from trade — T1 IAS on gloves has very low spawn weight, so fracturing it first is mathematically necessary to keep the total craft cost under control. Trying to roll T1 IAS naturally while ALSO rolling 3 specific prefixes is "statistically almost impossible" per poe2fun's analysis.
- State: RARE with at least 1 mod (the fractured T1 IAS suffix). Other mods will get re-rolled.

### Step 2 — The First Flat Damage (chaos spam)
- Apply **Chaos Orbs** repeatedly to the rare gloves.
- **Goal:** Hit any T1 Flat Damage prefix — `Adds # to # Physical damage to Attacks`, `Adds # to # Fire damage to Attacks`, `Adds # to # Cold damage to Attacks`, or `Adds # to # Lightning damage to Attacks`. You're not picky about WHICH damage type — accept the first T1 you land.
- **Stop** as soon as you hit one T1 Flat mod.

### Step 3 — The Targeted Slam (second flat)
- Apply **Omen of Sinistral Exaltation** (forces the next Exalted Orb to add a PREFIX) + **Perfect Exalted Orb** (guarantees min mod level 50 → T1-tier on iLvl 82 base).
- **Success:** you hit a second `Adds # to # X damage to Attacks` T1 prefix. Move to step 4.
- **Fail:** you hit a different prefix.
  - **Recovery:** apply **Orb of Annulment**.
  - If the Annul removes the bad prefix → retry step 3.
  - If the Annul removes the T1 Flat from step 2 → go back to step 2 (chaos spam again).

### Step 4 — The Ancient Unveil (third flat — THE critical step)
This step uses the Desecration mechanic to force the FINAL damage prefix deterministically. Without desecration, hitting 3 T1 flat damage prefixes of different types via random rolls is prohibitively expensive.

- Apply **Omen of Sinistral Necromancy** (next Desecration adds only a PREFIX — protects suffixes).
- Apply **Ancient Rib** (Desecration item for rare armour; the higher-tier Rib variant — see Pro Tips for why).
- Apply **Omen of Abyssal Echoes** (next Desecration gets one reroll of the revealed options — safety net).
- **Unveil the Prefix** at the Well of Souls (or in-game Desecration UI).
- **Goal:** unveil the T1 Flat Damage type you're MISSING (you already have two from steps 2-3).

**Fail Recovery (the loop):**
- If you don't get the mod you want, apply **Omen of Light** (next Annulment removes only Desecrated mods — protects all your good non-desecrated mods).
- Apply **Orb of Annulment**.
- This **guarantees** removal of the Desecrated mod without risking your other T1 mods.
- Loop step 4 until you hit the third T1 flat damage you want.

### Step 5 — The Double Essence Finisher (fill suffixes)
- Apply **Perfect Exalted Orb** twice to fill the remaining suffix slots (if not already full from earlier steps).
- Apply **Essence of Horror** (corrupted essence — outcome on gloves or boots: `60% increased effect of Socketed Items` per the underlying CoE data, OR `100% increased effect of Socketed Items` per the patch 0.4.0 published article).
- Apply **Essence of Hysteria** (corrupted essence — outcome on gloves: `(25-29)% increased Critical Damage Bonus`).

> **Patch 0.4.0 note:** Using these corrupted essences on a full-suffix item allows you to replace specific suffix slots with the guaranteed essence outcomes (this is the standard Perfect/Corrupted Essence "remove + add" mechanic from the currency reference).

**Result:** the ultimate offensive gloves with 3× T1 Damage prefixes + Attack Speed (fractured) + Crit Damage Bonus + Socket Juice (100% increased effect of Socketed Items).

## Pro Tips

- **Why fracture Attack Speed at the start?** Rolling T1 Attack Speed naturally while ALSO looking for 3 specific Flat Damage prefixes is statistically near-impossible. Locking IAS in via fracture at the start is the ONLY way to keep this craft cost under control (poe2fun's analysis: under 500 Divines).
- **Don't cheap out on the Rib.** Using a normal **Preserved Rib** instead of **Ancient Rib** might seem cheaper per attempt, but the T1 Damage unveil weight on Preserved is terrible. You'll spend more on Omens of Light and Annulments cleaning up bad reveals than you save on the Rib itself. **Ancient Rib is mathematically cheaper long-run for this craft.**

## Why this craft works

- **Fractured T1 IAS** removes the rarest-suffix bottleneck — no chaos spam ever risks losing it.
- **Chaos spam to land the first T1 Flat** is cheap because there are 4 flat damage prefixes and we accept any of them.
- **Omen of Sinistral Exaltation + Perfect Exalt** forces the second prefix to a prefix slot, and Perfect tier guarantees a high-quality roll.
- **Ancient Rib + Sinistral Necromancy + Abyssal Echoes** deterministically targets the third prefix from the Desecration pool — and Omen of Light protects against bad reveals by guaranteeing removal of ONLY desecrated mods.
- **Essence of Horror + Essence of Hysteria** as a "double essence finisher" on a full-suffix item lets us replace random suffixes with guaranteed `100% increased effect of Socketed Items` and `T1 Crit Damage Bonus` outcomes — no Sinistral/Dextral Crystallisation omens needed because the slots are already full and the corrupted essence simply replaces one.

## Failure modes & recovery

- **Bad prefix from Step 3 Exalt:** Annul → check what was removed → retry from step 2 or step 3 depending on which mod was lost.
- **Bad Desecration outcome in step 4:** apply Omen of Light + Orb of Annulment → guarantees removal of ONLY the Desecrated mod → loop step 4.
- **Bad Essence outcome in step 5:** if Essence of Horror or Hysteria removes a mod you wanted to keep, you'd have to start parts of the craft over. Consider applying Hinekora's Lock before the final essence applications to preview and abort.
- **Couldn't afford Ancient Rib:** the Pro Tips section is emphatic — DON'T substitute Preserved Rib. Save up for Ancient.

## Citation

poe2fun.com — "PoE2 Attack Gloves Crafting (0.4.0): Triple Flat Damage On Low Budget" (https://poe2fun.com/guides/poe2-attack-gloves-crafting-guide). Patch 0.4.0.
