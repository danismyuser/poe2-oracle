# Verified Craft: High-End Bow-Attack Quiver from Fractured Projectile Skills Base

## What this craft makes

**Item class:** Quiver
**Specific base:** Visceral Quiver
**iLvl:** 82
**Starting condition:** RARE, with a FRACTURED `+# to Level of all Projectile Skills` prefix (buy this from trade — it's the foundation; without the fracture you'd lose this mod during Chaos rerolling).
**Budget:** high-end
**Final outcome:** A 6-mod Visceral Quiver with the fractured `+# to Level of all Projectile Skills`, two additional strong prefixes (Mark of the Abyssal Lord from Abyss essence + `#% increased Damage with Bow Skills` from Hysteria essence + one Perfect-Exalt random prefix), and three T1 suffixes (Critical Hit Chance, Critical Damage Bonus, Attack Speed).

## Target affixes

**Prefixes (3):**
1. `+# to Level of all Projectile Skills` — T1, **fractured on the base** (purchased from trade)
2. `#% increased Damage with Bow Skills` — T2 (deterministically added via Essence of Hysteria in step 7)
3. `Bears the Mark of the Abyssal Lord` — added via Essence of the Abyss in step 6 (enables Desecration mechanic for the final prefix), OR a Perfect-Exalt prefix hit in steps 5/8/10 (Adds # to # Physical/Fire/Cold/Lightning damage to Attacks, or #% increased Projectile Speed)

**Suffixes (3):**
1. `#% increased Critical Hit Chance for Attacks` — T1
2. `#% increased Critical Damage Bonus for Attack Damage` — T1
3. `#% increased Attack Speed` — T1

## Step-by-step recipe

> **Item-state tracking:** the fractured prefix occupies one of the 3 prefix slots and CANNOT be removed by any currency (that's what fracturing locks in). All currency steps below operate on the remaining 2 prefix slots + 3 suffix slots.

### Step 1 — Acquire the fractured base
- Buy a **Visceral Quiver, iLvl 82, RARE, with fractured `+# to Level of all Projectile Skills`** from trade.
- State: RARE, fractured-prefix locked, other mods will get re-rolled below.

### Step 2 — Spam Greater Chaos Orb to land T1 suffixes
- Apply **Greater Chaos Orb** repeatedly. Each application removes 1 random non-fractured affix and adds 1 new modifier (min mod level 35 → at iLvl 82 that's high-tier).
- **Target:** all three of `#% increased Critical Hit Chance for Attacks`, `#% increased Critical Damage Bonus for Attack Damage`, `#% increased Attack Speed` at T1.
- Stop once all three suffixes are good.

### Step 3 — Perfect Exalt + Omen of Dextral Exaltation for the last suffix (if needed)
- If any suffix slot is still empty after step 2, apply **Omen of Dextral Exaltation** (forces the next Exalt to add a SUFFIX) + **Perfect Exalted Orb** (guarantees min mod level 50).
- **If hit a good suffix:** continue to step 5.
- **If hit a bad suffix:** continue to step 4.

### Step 4 — Annul + retry suffix work
- Apply **Orb of Annulment** to remove a random affix (with all 3 suffixes filled and 1 fractured prefix locked, the annul will hit a suffix more often than not — accept the risk that it might hit an open prefix slot if any exist).
- Return to step 2 or step 3 depending on what was removed.

### Step 5 — Perfect Exalt for the first prefix
- With all 3 suffixes filled, applying a bare **Perfect Exalted Orb** has only prefix slots available, so it deterministically adds a prefix.
- **Target outcomes** (all valid Quiver prefixes): `#% increased Damage with Bow Skills`, `#% increased Projectile Speed`, `Adds # to # Physical/Fire/Cold/Lightning damage to Attacks`.
- **If hit a good prefix:** continue to step 8.
- **If hit a bad prefix:** continue to step 6.

### Step 6 — Abyss essence + Desecration with Echoes
- Apply **Essence of the Abyss** (a corrupted essence that adds the guaranteed `Bears the Mark of the Abyssal Lord` prefix) together with **Omen of Sinistral Crystallisation** (forces the essence to REMOVE only a PREFIX — protects the fractured prefix is automatic since fractured mods can't be removed, and protects the suffixes).
- The item now has `Mark of the Abyssal Lord` as a prefix, which unlocks the Desecration mechanic.
- Apply **Ancient Jawbone** (Desecration on Rare Weapon/Quiver) together with **Omen of Abyssal Echoes** (grants 1 reroll of the Desecration options). Pick the best of the revealed prefix outcomes (Amanamu / Ulaman / Kurgal pools — Amanamu has the strongest damage mods for bow builds).
- **If hit a good Desecrated prefix:** continue to step 8.
- **If miss:** continue to step 7.

### Step 7 — Essence of Hysteria (Quiver-specific bow-damage prefix)
- Apply **Essence of Hysteria** (corrupted essence — Quiver outcome: `(43–50)% increased Damage with Bow Skills`) with **Omen of Sinistral Crystallisation** (removes only a PREFIX — protects suffixes and fractured prefix).
- Result: a guaranteed T2-equivalent `#% increased Damage with Bow Skills` prefix.

### Step 8 — Perfect Exalt for the second prefix
- With all suffixes full, a bare **Perfect Exalted Orb** lands on the remaining open prefix slot.
- **If hit a good prefix:** continue to step 10.
- **If hit a bad prefix:** continue to step 9.

### Step 9 — Annul + retry prefix work (branching)
- Apply **Orb of Annulment**.
  - **If it removed the just-added bad prefix:** repeat step 8.
  - **If it removed an earlier good prefix:** depending on which one, repeat step 6 (Abyss/Jawbone), step 7 (Hysteria), or accept and re-Exalt.
  - **If it removed a good suffix:** start the suffix-rebuild loop from step 2 — costly.
- You can layer **Omen of Sinistral Erasure** for the next Chaos to protect prefixes, but this is expensive.

### Step 10 — Final prefix via Perfect Exalt or Jawbone+Echoes
- For the last open prefix slot, either:
  - **Perfect Exalted Orb** (random prefix from the Quiver pool), OR
  - **Ancient Jawbone** + **Omen of Abyssal Echoes** (Desecrated prefix with 1 reroll — best if Mark of the Abyssal Lord is already on the item from step 6).
- **If hit:** DONE.
- **If miss:** repeat step 9 logic.

## Why this route over alternatives

- **Fractured-base foundation is non-negotiable.** Without fracturing the `+# to Level of all Projectile Skills` prefix, Chaos Orb spam in step 2 will eventually remove it — and re-obtaining it via plain currency is statistically very expensive. Buying the fractured base front-loads the cost into a single trade purchase.
- **Greater Chaos for suffixes before Perfect Exalt for prefixes.** Suffix slots fill via Chaos rerolls more cost-effectively than via Exalts. Filling suffixes first means Perfect-Exalt prefix rolls land deterministically (only prefix slots open).
- **Abyss + Hysteria essences over Perfect Essence of Battle for damage prefixes.** Hysteria on Quiver gives a guaranteed `#% increased Damage with Bow Skills` (T2-equivalent) — this is a Quiver-only outcome from Hysteria. Perfect Essence of Battle on Quiver only gives Accuracy Rating, which is much weaker for a bow-attack build.
- **Mark of the Abyssal Lord unlocks Desecration**, which lets you use Jawbone for additional deterministic prefix rolls with Echoes giving a reroll — much higher EV than pure Perfect Exalt spam on the final prefix.

## Failure modes & recovery

- **Lost a good suffix during Annulment (step 4 or 9):** restart suffix work from step 2. Painful but unavoidable.
- **Both prefix slots filled with bad mods after steps 5–8:** annul both (step 9) and retry — the fractured prefix protects you from losing your foundation.
- **Mark of the Abyssal Lord removed:** re-apply Essence of the Abyss (step 6). Won't lose the fracture.
- **Out of currency:** the recipe can be stopped at any point and the item is still functional with fewer affixes; you just won't reach the 6-mod ceiling.

## Sources / citation

User-verified craft (in-game confirmed).
