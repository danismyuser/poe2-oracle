# Verified Craft: BIS Crossbow for Deadeye (poe2fun)

A high-DPS crossbow craft built around Fractured Critical Hit Chance as the foundation, with deterministic lightning damage from Perfect Essence of Electricity and a Desecrated physical damage prefix. Targeted at PoE2 Deadeye builds for clearing the Atlas in Patch 0.4.0.

## What this craft makes

**Item class:** Crossbow
**Specific base:** any iLvl 82+ crossbow base with a natural roll of **+4.5% or higher Critical Hit Chance** (the base implicit crit, used as the fracture target — buy from trade until you find one)
**iLvl:** 82+ (for T1 prefixes)
**Budget:** mid-to-high (requires Fracturing Orb, Perfect Essences, Perfect Exalted Orb-equivalents, multiple omens)
**Final outcome:** 6-mod crossbow with:
- Fractured T1 Critical Hit Chance (suffix)
- T1/T2 Flat Physical Damage OR T1/T2 % Increased Physical Damage (chaos-rolled prefix from step 3)
- `Gain (25–33)% of Damage as Extra Lightning Damage` (suffix from Perfect Essence of Electricity — 25-33% is the 2H/Crossbow magnitude)
- `+6 to Level of all Attack Skills` (suffix, per the guide — see Notes)
- `(20–25)% chance to gain Onslaught on Killing Hits with this Weapon` (suffix from Perfect Essence of Haste)
- T1/T2 Physical Damage (the OTHER physical prefix variant not landed in step 3 — from Desecrated unveil)

## Target affixes

**Prefixes (~3):**
1. **T1/T2 Flat Physical Damage** (`Adds # to # Physical Damage`) OR **T1/T2 % Increased Physical Damage** (`#% increased Physical Damage`) — chaos-rolled
2. **T1/T2 Physical Damage** (the variant not landed in #1) — desecrated unveil
3. (optional 3rd from Sinistral Necromancy + Jawbone)

**Suffixes (3):**
1. **T1 Critical Hit Chance** — FRACTURED on the base (the whole craft depends on this)
2. **`Gain (25–33)% of Damage as Extra Lightning Damage`** — from Perfect Essence of Electricity (Crossbow outcome)
3. **`+# to Level of all Attack Skills`** — from Perfect Essence of Battle (+5 on 2H/Crossbow per our data; guide says target is +6 combined with…)
4. **`(20–25)% chance to gain Onslaught on Killing Hits`** — from Perfect Essence of Haste (Martial Weapon outcome)

> **Note on the "+6 Attack Skills" target:** Our authoritative essence data has Perfect Essence of Battle on 2H/Crossbow producing `+5 to Level of all Attack Skills`. The poe2fun guide targets "+6 Level to all Attack Skills" specifically — possibly a 0.4.0-era value, possibly a combined-mod interpretation. Take the guide's target as a goal but check actual roll values in-game; +5 is what current data confirms.

## Step-by-step craft

### Step 1 — The Fracture (locking Crit)
- Buy **Crossbow bases that have a natural roll of +4.5% or higher Critical Hit Chance** (this is the base item's implicit crit, not a rolled mod — high-crit bases are sold separately).
- Apply **Fracturing Orb** (requires the rare to have at least 4 modifiers — chaos a couple onto the base first if needed).
- **Goal:** the fracture lands on Critical Hit Chance. If it fails, buy another base and try again. Fracturing locks the mod permanently so it can't be removed by any later step.

### Step 2 — Clean the Base
- Apply **Orbs of Annulment** until the item has ONLY the fractured Critical Hit Chance modifier remaining.

### Step 3 — Rolling Physical Damage (chaos spam)
- Apply **Chaos Orbs** repeatedly to the item.
- **Goal:** stop when you hit **T1 or T2 Flat Physical Damage** OR **T1 or T2 % Increased Physical Damage** as a prefix.
- This creates the solid physical damage foundation for the weapon.

### Step 4 — Adding Lightning Damage (deterministic)
This is the core deterministic trick — add the Extra Lightning Damage suffix without losing the physical prefix.

- Apply **Omen of Dextral Exaltation** (forces next Exalt to add a SUFFIX).
- Use an **Exalted Orb** (this adds a random suffix — we don't care what).
- Apply **Omen of Dextral Crystallisation** (forces next Perfect/Corrupted Essence to remove only a SUFFIX).
- Apply **Perfect Essence of Electricity**.
- **Result:** the essence REMOVES the random suffix you just added and ADDS `Gain (25–33)% of Damage as Extra Lightning Damage` (the Crossbow-specific 2H outcome of Perfect Essence of Electricity). Net effect: Lightning Damage suffix landed without risking the prefix.

### Step 5 — Preparing for Unveil
Set up the item for the final prefix via Desecration.

- Apply **Omen of Sinistral Necromancy** (next Desecration adds only PREFIXES — protects your suffixes).
- Use a **Preserved Jawbone** (Desecration item for rare weapons — adds a Desecrated/Veiled prefix).
- **Result:** the item now has a Desecrated (Veiled) Prefix slot ready to be unveiled.

### Step 6 — Completing the Suffixes
Roll for the specific attack-suffix combination.

- Repeatedly apply **Perfect Essence of Battle** and/or **Perfect Essence of Haste**.
- **Goal:** end up with **`+# to Level of all Attack Skills`** (from Battle — our data: +5 on 2H/Crossbow) AND **`Gain Onslaught on Killing Hits with this Weapon`** (from Haste — our data: 20-25% chance on Martial Weapon).
- **Note:** this step may require multiple attempts to hit both desired suffixes together. The essences remove a random suffix before adding their own — keep going until both land.

### Step 7 — The Final Unveil
Reveal the Desecrated prefix that was added in step 5.

- Apply **Omen of Abyssal Echoes** (allows you to reroll the unveil options once — safety net).
- Unveil the Desecrated modifier (at the Well of Souls or in the in-game Desecration UI).
- **Goal:** unveil **Tier 1 or Tier 2 Physical Damage** — specifically the VARIANT you DIDN'T land in step 3 (if step 3 gave you Flat Phys, target % Phys here, and vice versa).

**Contingency:** if you don't see the mod you want among the unveil options:
- Apply **Omen of Light** (next Annulment removes only DESECRATED modifiers — protects all your good non-desecrated mods).
- Apply **Orb of Annulment**.
- This safely removes the Desecrated mod without risking anything else.
- Return to step 5 and try again.

## Summary

The craft bypasses normal crit RNG via fracturing, then uses two omen+essence combos (Dextral Exalt + Dextral Crystallisation + Electricity essence, then Sinistral Necromancy + Jawbone) to add specific mods deterministically. Patch 0.4.0 era — Deadeye-focused.

## Why this craft works

- **Fractured T1 Crit Chance** uses the base implicit (not a rolled mod) as the foundation — bypasses the rarest suffix bottleneck for crit builds.
- **Annul-to-clean** then chaos for the first prefix is cheap because physical damage prefixes have decent weights.
- **Dextral Exalt + Dextral Crystallisation + Perfect Essence of Electricity** is the deterministic lightning damage suffix — the random suffix from the Exalt is the "consumable" the Crystallisation+Essence then replaces.
- **Sinistral Necromancy + Jawbone** adds the desecrated prefix without risking suffixes.
- **Perfect Essence Battle + Haste** for the +Attack Skills and Onslaught suffixes — both essence outcomes are deterministic.
- **Omen of Light + Annul** for safe Desecrated removal — the unveil loop has no real downside thanks to this contingency.

## Failure modes & recovery

- **Fracture missed (step 1):** sell the base, buy another with high natural crit. Don't try to recover.
- **Bad essence outcome in step 6:** Battle and Haste essences both consume a random suffix before adding theirs — you may end up with the wrong combination. Use **Omen of Dextral Crystallisation** to control which suffix gets replaced (it picks the suffix the essence removes).
- **Couldn't unveil the right physical variant in step 7:** Omen of Light + Annul loop until you do. Belton's "Omen of Light is your friend" applies here too.
- **Out of currency for Ancient Jawbone:** the guide uses Preserved Jawbone here, not Ancient — Preserved is the cheaper option since the unveil pool for physical mods is small enough that Preserved's lower T1 weight isn't catastrophic.

## Citation

poe2fun.com — "PoE2 Crossbow Crafting Guide" (https://poe2fun.com/guides/crossbow-crafting-guide). Patch 0.4.0. Targeted at Deadeye builds.
