# Wand Crafting Reference (Belton's Average Andy League Start Cheat Sheet)

This is a **reference cheat sheet**, not a step-by-step recipe. It captures expert knowledge about PoE2 wand crafting that's hard to derive from raw mod data alone — specifically the **mutual exclusivity rules** and the **damage-type linking between prefixes and suffixes**. When the user asks about wand crafting, use this as ground truth for which mods can coexist.

**Source:** Belton's "Average Andy League Start Crafting Guide Cheat Sheets" (user-shared).

## Item class

**Item:** Wand (any specific wand base — Chaos Wand, Fire Wand, Ice Wand, Lightning Wand, Physical Wand)
**iLvl target:** 80+ for T1 mods, 70+ for T2, 60+ for T3
**Budget:** league-start (mainly Greater-tier currencies, occasional Perfect for the spike)

## Wand prefix pool — with weights and tier thresholds

| Class | Mod | T1 (max / ilvl / weight) | T2 | T3 |
|------|-----|-----|----|----|
| A | Spell Damage | 119% / ilvl 80 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| B | Lightning % | 119 / 81 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| B | Cold % | 119 / 81 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| B | Fire % | 119 / 81 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| B | Chaos % | 119 / 81 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| B | Spell Physical % | 119 / 81 / 50 | 104 / 70 / 100 | 89 / 60 / 200 |
| — | #% of Damage Gained as Extra Fire Damage | 30 / 80 / 500 | 27 / 60 / 500 | 24 / 46 / 500 |
| — | #% of Damage Gained as Extra Lightning Damage | 30 / 80 / 500 | 27 / 60 / 500 | 24 / 46 / 500 |
| — | #% of Damage Gained as Extra Cold Damage | 30 / 80 / 500 | 27 / 60 / 500 | 24 / 46 / 500 |

## Wand suffix pool — with weights and tier thresholds

| Class | Mod | T1 | T2 | T3 |
|------|-----|-----|----|----|
| D | Lightning Spell Skill Gem Level | +5 / ilvl 81 / 100 | +4 / 55 / 250 | +3 / 36 / 500 |
| D | Cold Spell Skill Gem Level | +5 / 81 / 100 | +4 / 55 / 250 | +3 / 36 / 500 |
| D | Fire Spell Skill Gem Level | +5 / 81 / 100 | +4 / 55 / 250 | +3 / 36 / 500 |
| D | Chaos Spell Skill Gem Level | +5 / 81 / 100 | +4 / 55 / 250 | +3 / 36 / 500 |
| D | Physical Spell Skill Gem Level | +5 / 81 / 100 | +4 / 55 / 250 | +3 / 36 / 500 |
| D | All Spell Skill Gem Level | +4 / 78 / 50 | +3 / 55 / 100 | +2 / 25 / 150 |
| C | Cast Speed | 35% / 80 / 250 | 32% / 70 / 500 | 28% / 60 / 1000 |
| — | Spell Crit Chance | 73 / 76 / 125 | 59 / 59 / 250 | 53 / 41 / 500 |
| — | Spell Crit Bonus | 39 / 73 / 125 | 34 / 59 / 250 | 29 / 44 / 500 |

## ⚠ CRITICAL — Wand mutual exclusivity rules

Wands enforce family-based mod exclusivity that the Oracle MUST respect when recommending target affixes:

- **Only 1 "A"-class modifier per item** (Spell Damage)
- **Only 1 "B"-class modifier per item** (one elemental/chaos/physical spell damage %)
- **Only 1 "C"-class modifier per item** (Cast Speed)
- **Only 1 "D"-class modifier per item** (one Spell Skill Gem Level)

**B ↔ D damage-type linking (the biggest gotcha):**
- An item with a "B" modifier can ONLY roll a "D" modifier of the SAME damage type, OR the generic "+All Spell Skills".
- Example: a wand with `#% increased Fire Spell Damage` can roll `Fire Spell Skill Gem Level` or `All Spell Skill Gem Level` — but NOT `Lightning Spell Skill Gem Level`.
- Conversely: an item with a damage-type-specific "D" (e.g. `Lightning Spell Skill Gem Level`) can ONLY roll a "B" of the same damage type.
- All Spell Skill Gem Level ("D" generic) can coexist with any "B" or no "B".

**When recommending a wand craft, the prefix + suffix selection MUST satisfy these constraints. If the user asks for, say, "Lightning Wand with cold spell damage", explain that the elemental type is locked.**

## Desecrated prefix pool (all mods iLvl 65)

Used via Mark of the Abyssal Lord + Jawbone:

| Class | Mod | Min | Max | Family |
|------|-----|----|----|--------|
| B | Elemental Damage % | 74 | 89 | Amanamu |
| A | Spell Damage with Life Spells That Cost Life | 74 | 89 | Amanamu |
| — | Minion Damage + Increased Spell Damage | 55 | 64 | Amanamu |
| — | Magnitude of Bleeding | 27 | 38 | Ulaman |
| — | Gain #% of Damage as Extra Physical Damage | 21 | 25 | Ulaman |
| A | Invocated Spells Deal % Increased Damage | 75 | 89 | Kurgal |

## Desecrated suffix pool (all mods iLvl 65)

| Class | Mod | Min | Max | Family |
|------|-----|----|----|--------|
| C | Cast Speed Per Different Spell Cast Recently | 3 | 5 | Kurgal |
| C | Cast Speed While on Full Mana | 26 | 36 | Kurgal |
| — | Hindered Enemies Take #% Increased Chaos Damage | 4 | 7 | Kurgal |
| — | Break #% increased Armour | 31 | 39 | Ulaman |
| — | Break Armour on Spell Crit (#% of Physical Damage) | 11 | 18 | Ulaman |
| — | Hindered Enemies Take #% Inc. Physical Damage | 4 | 7 | Ulaman |
| — | #% Mana Cost to Life Cost & Cost Efficiency | 15/5 | 25/10 | Amanamu |
| — | Hindered Enemies Take #% Inc. Elemental Damage | 4 | 7 | Amanamu |
| — | Spell Skills Have #% Inc. AoE | 8 | 16 | Amanamu |

## Recommended crafting materials (Belton's league-start kit)

**For mod generation:**
- **Perfect Augment Orb** — ilvl 70+ mod on a magic item
- **Perfect Orb of Transmutation** — ilvl 70+ mod on a normal item
- **Perfect Essence of Sorcery** (+3 to all Spell Skill Levels) — requires RARE item
- **Greater Essence of Sorcery** (spell damage prefix) — requires MAGIC item, makes it rare
- **Greater Essence of Alacrity** (cast speed suffix) — requires MAGIC item, makes it rare
- **Greater Essence of Seeking** (spell crit chance suffix) — requires MAGIC item, makes it rare

**For prefix/suffix removal targeting:**
- **Orb of Annulment** — removes a random modifier
- **Omen of Sinistral Crystallisation** — next Perfect/Corrupted Essence removes only a prefix
- **Omen of Dextral Crystallisation** — next Perfect/Corrupted Essence removes only a suffix
- *(Use these with Perfect Essence of Sorcery to control which affix is replaced.)*

**For exalt targeting:**
- **Greater Exalted Orb** — +1 ilvl-35+ mod on a rare with an open slot
- **Omen of Sinistral Exaltation** — next Exalted Orb adds a prefix

**For desecration (after Mark of the Abyssal Lord is on the item):**
- **Preserved or Ancient Jawbone** — Desecrate a rare weapon/quiver/wand
- **Omen of the Liege** — guarantees Amanamu family
- **Omen of the Sovereign** — guarantees Ulaman family
- **Omen of the Blackblooded** — guarantees Kurgal family
- **Omen of Abyssal Echoes** — reroll the desecrate options once
- **Omen of Sinistral Necromancy** — desecrate adds only a prefix
- **Omen of Dextral Necromancy** — desecrate adds only a suffix

**For locking in good rolls:**
- **Fracturing Orb** — locks a random mod permanently (requires rare with 4+ mods)

## Implied league-start wand recipe

This cheat sheet doesn't prescribe a single step-by-step, but the recommended materials imply a generic league-start wand recipe:

1. Acquire **white ilvl 80+** wand of the correct elemental type (e.g. Lightning Wand for a lightning-spell build).
2. Apply **Perfect Orb of Transmutation** (forces a min-ilvl-70 prefix) — item is now MAGIC with 1 high-tier mod.
3. Apply **Perfect Orb of Augmentation** (adds a min-ilvl-70 suffix) — item is MAGIC with 2 high-tier mods.
4. If both mods are desired, **Perfect Regal Orb** to upgrade to rare. If only one mod is good, apply Annul + Augment until both are good.
5. Once rare: **Greater Essence of Sorcery** (if not yet applied — wait, this requires MAGIC, so use it earlier in step 2/3 IF you want the guaranteed spell damage prefix). Or use **Greater Exalted Orb** + **Omen of Sinistral Exaltation** to force a spell damage prefix on the rare.
6. Fill remaining slots with **Greater Exalted Orbs** (random mod) — apply Omen of Sinistral Exalt for forced prefix, no omen for random.
7. For the final affix: apply **Essence of the Abyss** to add `Mark of the Abyssal Lord` (or use a Perfect Essence of Sorcery with Crystallisation omen to replace an unwanted mod).
8. With Mark of the Abyssal Lord on the item: apply **Ancient Jawbone** + appropriate **Omen of the X** to guarantee the Desecration family + **Omen of Abyssal Echoes** for the reroll.
9. **Fracture** a key mod with **Fracturing Orb** if you want to commit and reroll the rest.

Apply the mutual-exclusivity rules at every step: pick ONE damage type, ONE spell-damage % "B" mod, ONE matching-type Spell Skill Gem Level "D" mod.

## Sources / citation

Belton's "Average Andy League Start Crafting Guide Cheat Sheets" (Google Sheets, gid=0, user-shared).
