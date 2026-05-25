# Verified Craft: +3 Double-Crit Deterministic Amulet (Belton's Method)

End-game caster amulet craft for a Gloam or Tenebrous Amulet. Targets +3 Spell Skill Levels, T1 crit chance, T1 crit bonus, T1 spirit, T1 life regen, 22 all attributes, and a chosen second prefix (ES%, Armour%, Evasion%). With Sanctification at the end, has a 1/10.25 (4/41) chance to upgrade +3 → +4.

## What this craft makes

**Item class:** Amulet
**Specific base:**
- **Gloam Amulet** — fracture target is T1 SPIRIT; suited to high-spirit caster builds
- **Tenebrous Amulet** — fracture target is T1 CRIT CHANCE; suited to crit-stacking caster builds
- Both bases are 4-suffix/2-prefix OR 5-suffix/1-prefix (the unusual slot configuration is what makes this craft work)
**iLvl:** 75+ for ES%/Armour%, 77+ for Evasion% (the second prefix you choose). Most mods are ilvl 75.
**Budget:** high-end / mirror-tier (uses Preserved Collarbone, Perfect Chaos, multiple Omens, Sanctification + Vaal + Lock combo)
**Final outcome:** 6×T1 amulet with +3 (or +4 after Sanctification corruption), T1 crit chance, T1 crit bonus, T1 spirit OR chosen second prefix, T1 life regen (desecrated), 22 to all attributes, plus an anoint. Perfect-divined to 100%.

## Target affixes — Gloam variant

**Prefixes (2 — Gloam is 4s/2p):**
1. **T1 Spirit** (50, ilvl 78) — FRACTURED via step 7b
2. Chosen second prefix — ES %, Armour %, or Evasion % (all 1000 weight, easy to hit)

**Suffixes (4):**
1. **+3 to Level of all [chosen] Spell Skills** (ilvl 75)
2. **T1 Critical Hit Chance** (suffix on amulet)
3. **T1 Critical Damage Bonus** (suffix on amulet)
4. **22 to all Attributes** (ilvl 75) — falls out naturally per step 13 reasoning
5. (slot 5 if 5s/1p variant) **T1 Life Regen** (desecrated)

## Target affixes — Tenebrous variant

**Prefixes (2 — same as Gloam):**
1. Chosen second prefix (Spirit OR ES%/Armour%/Evasion%) — populated via step 15
2. **T1 Critical Hit Chance** — FRACTURED via step 7a *(wait — crit chance is actually a SUFFIX on amulet; in this craft it's fractured-locked early to control the slot)*

Actually re-read: "on a tenebrous you want to fracture t1 crit chance" — Belton fractures the crit chance suffix. The 2 prefixes get filled later via desecration + global defence essences.

## Step-by-step strategy

> **Important terminology:**
> - "Whittle" = Omen of Whittling (next Chaos Orb removes the lowest-level modifier — fully deterministic, not random)
> - "Echoes" = Omen of Abyssal Echoes (next Desecration grants a reroll)
> - "Belton's regex" = a trade-search regex Belton publishes in his video that auto-highlights bases when they hit T1 spirit / crit / bonus / +3 — used to roll multiple amulets in parallel and skip the bad ones
> - "Sanctification" = applying Omen of Sanctification to make the next Divine Orb on a Rare Sanctify it (gives a chance to upgrade specific mods on corruption)

### Step 1 — Base requirement
- Acquire **Gloam Amulet** OR **Tenebrous Amulet** with 4s/2p or 5s/1p configuration. These are special amulets with unusual slot distributions that enable the deterministic prefix work in later steps.

### Step 2 — Decide your target prefix
- Pick which secondary prefix you want: **Spirit** (ilvl 78), **ES %** (ilvl 75), **Armour %** (ilvl 75), or **Evasion %** (ilvl 77).
- These are usually all 1000-weight, so any of them is reachable.

### Step 3 — Reduce to 3 modifiers
- Use **Orb of Annulment** to reduce the amulet to exactly 3 affixes total. This sets up the regex-roll phase.

### Step 4 — Roll multiple bases in parallel (Belton's regex)
- Belton publishes a trade-search regex that auto-highlights bases when they hit T1 spirit, T1 crit chance, T1 crit bonus, or +3 spell skills.
- Roll 2-3 amulets simultaneously. The regex saves time vs hand-checking each result.
- Continue until one of your bases has the target mod.

### Step 5 — Preserved Collarbone
- Apply **Preserved Collarbone** (Desecration on rare Necklace / Ring / Belt). Gives you a Desecrated mod slot — used later for T1 life regen targeting.

### Step 6 — Divine to 100%
- Apply **Divine Orb** until the existing modifiers roll to their maximum values. This is cheap insurance before the expensive Fracturing step.

### Step 7 — Fracture for 1/3 chance to hit your target
- Apply **Fracturing Orb** (requires 4+ mods on a rare — add suffixes first if you're below 4). The fracture lands on one random mod.
- **7a — Tenebrous variant:** you want the fracture to land on T1 Crit Chance.
- **7b — Gloam variant:** you want the fracture to land on T1 Spirit.
- ~1/3 chance per attempt. If it misses, the fracture locks a useless mod — sell and try another base.

### Step 8 — Reduce to 2 modifiers (the fractured one + 1 other)
- Annul down to just the fractured mod plus 1 keeper. This sets up the chaos-spam phase with maximum control.

### Step 9 — Chaos spam for +3
- Apply **Chaos Orb** (regular, not Greater/Perfect) until you hit **+3 to Level of all [chosen] Spell Skills** as one of your affixes.

### Step 10 — Desecrate T1 life regen
- **Omen of Dextral Necromancy** + **Preserved Collarbone** + **Omen of Abyssal Echoes** + **Omen of Light** (Omen of Light makes Annulment remove only Desecrated mods, used as recovery if you hit a bad desecrated mod).
- Iterate until you reveal **T1 Life Regen** as a desecrated suffix.
- **Optimization:** if you hit a lower-tier life regen first, you can `dextral exalt` once (adds a suffix) before using `omen of light` to remove the bad regen — the extra mod makes the next reveal of T1 life regen slightly more likely.

### Step 11 — Add 4th modifier if needed
- After T1 life regen is locked, if you didn't already exalt a 4th mod in step 10, do so now via **Greater Exalted Orb**.

### Step 12 — Whittle + Perfect Chaos for ilvl 75+ prefix
- Apply **Omen of Whittling** + **Perfect Chaos Orb**. Whittling forces the Chaos to remove the LOWEST-level modifier — given your item's mod composition, this removes a junk mod and adds a new one. Perfect Chaos guarantees min mod level 50.
- If you hit ANY ilvl 75+ prefix, KEEP IT. Then exalt a suffix again and whittle that.

### Step 13 — Why this converges deterministically
**Belton's key insight:** the ONLY ilvl 75 mods on this base are:
1. +3 Spell Skill Level (already have from step 9)
2. T1 Life Regen (already have from step 10)
3. 22 to all Attributes
*(Item Rarity used to be ilvl 75 but was nerfed.)*

So by Whittling and blocking the existing +3 + life regen, you are GUARANTEED to eventually hit 22 all attributes. This is a deterministic convergence — no real RNG risk.

### Step 14 — Get T1 crit chance + T1 crit bonus
- Exalt another suffix and continue **Whittle + Perfect Chaos** until you hit **T1 Crit Chance** or **T1 Crit Bonus**.
- Once one is on the item, remove the T1 life regen (desecrated) and re-desecrate the OTHER T1 crit mod via Preserved Collarbone + Necromancy + Echoes.
- Final state at this point: +3 / T1 Crit Chance / T1 Crit Bonus / 22 Attributes / T1 Spirit (fractured, Gloam) / 1 prefix slot open + ilvl 75 prefix.

### Step 15 — Second prefix (Gloam variant)
- Since the only rollable prefix mod on this base at this stage is the one currently there, you can use **Global Defence essence** (Essence of Enhancement variants give global defence %) AND/OR **Whittle + Sinistral Erasure** (removes prefixes only), OR **Sinistral Annul + Perfect Exalt with Catalyzing Omen**, until you get the 2nd prefix of your choosing.
- Defence % mods are 1000 weight and very easy to hit.

### Step 16 — Tenebrous variant complete sequence
- Fracture T1 Crit Chance (step 7a)
- Chaos spam +3 (step 9)
- Desecrate T1 Life Regen (step 10)
- Whittle + Perfect Chaos until 22 all attributes (keep any ilvl 75 prefix you hit along the way, exalt a suffix to continue whittling)
- Whittle + Perfect Chaos until T1 Crit Bonus
- Remove desecration
- **For attribute % suffix (10% Dex/Str/Int):** Use **Omen of Sinistral Crystallisation** + **Perfect Essence of the Infinite** to remove a prefix and add a suffix with the attribute %. This will be an ilvl 72 mod — if you get the wrong attribute, use a Whittle + low-level Chaos Orb (NOT Perfect) to reroll the % back to a prefix, then repeat.
- Once there's only 1 prefix, **Preserved Collarbone + Sinistral Necromancy + Global Defence essence spam (with Echoes if you like)** to get T1 Spirit or whatever prefix you want. Sinistral Necromancy means you can skip Omen of Light entirely.
- If you don't want Dex/Str/Int % as 5th suffix: desecrate whatever 5th suffix you want, then **Sinistral Erasure + Annul** the 1 prefix.

## Final polish — Sanctification + Vaal corruption

After you have 6×T1:

1. **Divine to 100%** — perfect-roll every mod.
2. **Add an anoint** to the amulet.
3. **Lock the item with Hinekora's Lock** (so you can preview the next currency use).
4. Hover with **Vaal Orb**, then **Vaal + Omen of Corruption** (corruption guaranteed to change), then **Omen of Sanctification + Divine Orb** for the Sanctify treatment.

**Sanctification odds:** 1/10.25 (4/41) chance to upgrade **+3 → +4** to all spell skills. You can also get **+1 to all skills** as a generic corruption outcome.

**Catalyst preservation:** to preserve the perfect divine numbers when you 20q a catalyst on, use this sequence:
- Change the catalyst 1 time using whatever catalyst you want (this REMOVES the Hinekora's Lock).
- Then 20q to the wanted catalyst.
- Then re-lock with Hinekora's Lock.

## Critical warnings

- **Anoints cannot be changed once the item is corrupted/sanctified.** Choose your anoint wisely BEFORE the corruption step. Have your Megalomaniac jewel sorted in advance, or pick a generic anoint you can live with.

## Why this works

- **Special amulet bases (Gloam/Tenebrous) have unusual prefix/suffix slot distributions** (4s/2p or 5s/1p) that limit which mods can roll — this constraint actually HELPS by reducing the prefix pool from which random rolls draw.
- **Fracturing locks your foundation** so chaos spam in step 9 can't destroy it.
- **The ilvl-75 mod cluster trick** (only 3 mods at ilvl 75 on this base — +3, life regen, 22 attributes) means Whittling + Perfect Chaos deterministically converges on the remaining one once you have the other two.
- **Crit chance + Crit Bonus are both T1 amulet suffixes** with high weight — pairing them via Whittle + Perfect Chaos is faster than rolling them on any other slot.
- **Global Defence essences are 1000-weight** so they fill the second prefix slot easily once the prefix pool is otherwise filtered down.
- **Sanctification gives a ~10% shot at +4** — the only deterministic way to push past +3 spell levels.

## Failure modes & recovery

- **Fracture missed (step 7):** sell the base, try another. Don't try to recover.
- **Couldn't hit +3 in step 9:** chaos spam is the bottleneck. May take many orbs. No deterministic alternative for the +3.
- **Bricked desecrated mod:** use the Belton ES-chest "undo trick" (Dextral Crystallisation + Perfect Essence of Seeking) to overwrite the bricked desecrated mod, then re-desecrate.
- **Anoint locked in before deciding:** stuck with it forever. Plan ahead.

## Citation

Belton — "+3 Double Crit Deterministic Crafting Guide" (Google Doc, user-shared). The doc title literally reads "ty for letting me be an autist while streaming."  YouTube: @BeltonPoE.
