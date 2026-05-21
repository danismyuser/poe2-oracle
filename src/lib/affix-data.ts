// PoE2 Affix Data — verified against fextralife PoE2 wiki, poe2db.tw, and craftofexile.com/?game=poe2
// Last updated: 2026-05-21 (patch 0.4 "The Last of the Druids")
//
// IMPORTANT: These are PATH OF EXILE 2 mod names. Key differences from PoE1:
//   - "Critical Hit Chance" (not "Critical Strike Chance")
//   - "Critical Damage Bonus" (not "Critical Strike Multiplier")
//   - "Bow Attacks fire an additional Arrow" (exact in-game text)
//   - "+X to Level of all Projectile Skills" (bow suffix)
//   - No Orb of Scouring, no PoE1-only crafting

export interface AffixDef {
  name: string;
  tiers: string[];
}

export interface ModPool {
  prefixes: AffixDef[];
  suffixes: AffixDef[];
}

export const ITEM_CLASSES = [
  "Bow",
  "Crossbow",
  "Quiver",
  "One-Handed Sword",
  "Two-Handed Sword",
  "One-Handed Axe",
  "Two-Handed Axe",
  "One-Handed Mace",
  "Two-Handed Mace",
  "Spear",
  "Quarterstaff",
  "Wand",
  "Sceptre",
  "Focus",
  "Helmet",
  "Body Armour",
  "Gloves",
  "Boots",
  "Shield",
  "Amulet",
  "Ring",
  "Belt",
] as const;

export type ItemClass = (typeof ITEM_CLASSES)[number];

export const BASES: Record<ItemClass, string[]> = {
  Bow: ["Crude Bow", "Short Bow", "Long Bow", "Composite Bow", "Recurve Bow", "Expert Recurve Bow", "Spine Bow", "Expert Spine Bow", "Decimation Bow", "Expert Decimation Bow"],
  Crossbow: ["Crude Crossbow", "Crossbow", "Arbalest", "Expert Arbalest", "Siege Crossbow", "Expert Siege Crossbow"],
  Quiver: ["Serrated Arrow Quiver", "Broadhead Arrow Quiver", "Penetrating Arrow Quiver", "Blunt Arrow Quiver", "Conductive Arrow Quiver"],
  "One-Handed Sword": ["Rusted Sword", "Corroded Blade", "Antique Sword", "Sabre", "Cutlass", "Expert Cutlass", "Gemstone Sword", "Expert Gemstone Sword"],
  "Two-Handed Sword": ["Rusted Greatsword", "Corroded Greatsword", "Antique Greatsword", "Claymore", "Expert Claymore", "Reaver Sword", "Expert Reaver Sword"],
  "One-Handed Axe": ["Rusted Hatchet", "Hatchet", "Cleaver", "Axe", "Expert Axe", "Gemstone Axe", "Expert Gemstone Axe"],
  "Two-Handed Axe": ["Rusted Greataxe", "Greataxe", "Felling Axe", "Expert Felling Axe", "Vaal Axe", "Expert Vaal Axe"],
  "One-Handed Mace": ["Driftwood Club", "Stone Hammer", "Mace", "War Hammer", "Expert War Hammer", "Gavel", "Expert Gavel"],
  "Two-Handed Mace": ["Driftwood Maul", "Maul", "Great Mace", "Expert Great Mace", "Piledriver", "Expert Piledriver"],
  Spear: ["Crude Spear", "Spear", "War Spear", "Expert War Spear", "Glaive", "Expert Glaive"],
  Quarterstaff: ["Gnarled Branch", "Quarterstaff", "Expert Quarterstaff", "Rune Quarterstaff", "Expert Rune Quarterstaff"],
  Wand: ["Driftwood Wand", "Wand", "Expert Wand", "Carved Wand", "Expert Carved Wand", "Imbued Wand", "Expert Imbued Wand"],
  Sceptre: ["Driftwood Sceptre", "Sceptre", "Expert Sceptre", "Sekhem", "Expert Sekhem", "Void Sceptre", "Expert Void Sceptre"],
  Focus: ["Twig Spirit Shield", "Spirit Shield", "Expert Spirit Shield", "Mosaic Kite Shield", "Expert Mosaic Kite Shield"],
  Helmet: ["Rusted Helm", "Iron Hat", "Leather Cap", "Battered Helm", "Soldier Helmet", "Expert Soldier Helmet", "Close Helmet", "Expert Close Helmet", "Sallet", "Expert Sallet"],
  "Body Armour": ["Crude Vest", "Scale Vest", "Scale Doublet", "Full Plate", "Expert Full Plate", "Sadist Garb", "Expert Sadist Garb", "Occultist Vestments", "Expert Occultist Vestments"],
  Gloves: ["Rawhide Gloves", "Leather Gloves", "Fishscale Gauntlets", "Antique Gauntlets", "Expert Antique Gauntlets", "Slink Gloves", "Expert Slink Gloves"],
  Boots: ["Rawhide Boots", "Leather Boots", "Iron Greaves", "Antique Greaves", "Expert Antique Greaves", "Slink Boots", "Expert Slink Boots"],
  Shield: ["Splintered Tower Shield", "Tower Shield", "Expert Tower Shield", "Kite Shield", "Expert Kite Shield", "Mosaic Kite Shield", "Expert Mosaic Kite Shield"],
  Amulet: ["Crimson Amulet", "Azure Amulet", "Amber Amulet", "Jade Amulet", "Lapis Amulet", "Lunar Amulet", "Bloodstone Amulet", "Stellar Amulet", "Solar Amulet", "Gold Amulet"],
  Ring: ["Iron Ring", "Lazuli Ring", "Ruby Ring", "Sapphire Ring", "Topaz Ring", "Amethyst Ring", "Emerald Ring", "Pearl Ring", "Prismatic Ring", "Gold Ring", "Unset Ring", "Golden Hoop"],
  Belt: ["Rawhide Belt", "Linen Belt", "Wide Belt", "Long Belt", "Plate Belt", "Ornate Belt", "Mail Belt", "Double Belt", "Heavy Belt", "Utility Belt", "Fine Belt", "Golden Obi"],
};

// ─── Shared affix definitions (PoE2-correct names) ───────────────────────────

// Prefixes — defence
const LIFE_PREFIX: AffixDef =    { name: "Maximum Life",           tiers: ["T1","T2","T3","T4","T5","T6"] };
const MANA_PREFIX: AffixDef =    { name: "Maximum Mana",           tiers: ["T1","T2","T3","T4","T5"] };
const ES_PREFIX: AffixDef =      { name: "Maximum Energy Shield",  tiers: ["T1","T2","T3","T4","T5","T6"] };
const ARMOUR_PREFIX: AffixDef =  { name: "Armour",                 tiers: ["T1","T2","T3","T4","T5","T6"] };
const EVASION_PREFIX: AffixDef = { name: "Evasion Rating",         tiers: ["T1","T2","T3","T4","T5","T6"] };

// Prefixes — weapon offence (physical)
const FLAT_PHYS_PREFIX: AffixDef =  { name: "Adds Physical Damage to Attacks",   tiers: ["T1","T2","T3","T4","T5"] };
const PHYS_PCT_PREFIX: AffixDef =   { name: "% increased Physical Damage",        tiers: ["T1","T2","T3","T4","T5","T6","T7"] };

// Prefixes — weapon offence (elemental — attack)
const FLAT_FIRE_ATK_PREFIX: AffixDef =      { name: "Adds Fire Damage to Attacks",      tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_COLD_ATK_PREFIX: AffixDef =      { name: "Adds Cold Damage to Attacks",      tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_LIGHTNING_ATK_PREFIX: AffixDef = { name: "Adds Lightning Damage to Attacks", tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_CHAOS_ATK_PREFIX: AffixDef =     { name: "Adds Chaos Damage to Attacks",     tiers: ["T1","T2","T3"] };

// Prefixes — weapon offence (elemental — spell)
const FLAT_FIRE_SPELL_PREFIX: AffixDef =      { name: "Adds Fire Damage to Spells",      tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_COLD_SPELL_PREFIX: AffixDef =      { name: "Adds Cold Damage to Spells",      tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_LIGHTNING_SPELL_PREFIX: AffixDef = { name: "Adds Lightning Damage to Spells", tiers: ["T1","T2","T3","T4","T5"] };
const FLAT_CHAOS_SPELL_PREFIX: AffixDef =     { name: "Adds Chaos Damage to Spells",     tiers: ["T1","T2","T3"] };

// Prefixes — spell damage
const SPELL_DMG_PREFIX: AffixDef = { name: "% increased Spell Damage", tiers: ["T1","T2","T3","T4","T5","T6"] };

// Suffixes — attack
// NOTE: "Critical Hit Chance" and "Critical Damage Bonus" are the correct PoE2 names.
// PoE1 names ("Critical Strike Chance", "Critical Strike Multiplier") do NOT exist in PoE2.
const ATK_SPEED_SUFFIX: AffixDef =    { name: "% increased Attack Speed",  tiers: ["T1","T2","T3","T4","T5","T6"] };
const CRIT_CHANCE_SUFFIX: AffixDef =  { name: "Critical Hit Chance",        tiers: ["T1","T2","T3","T4","T5","T6"] };
const CRIT_DAMAGE_SUFFIX: AffixDef =  { name: "Critical Damage Bonus",       tiers: ["T1","T2","T3","T4","T5","T6"] };
const ACCURACY_SUFFIX: AffixDef =     { name: "Accuracy Rating",             tiers: ["T1","T2","T3","T4","T5","T6"] };

// Suffixes — spell
const CAST_SPEED_SUFFIX: AffixDef = { name: "% increased Cast Speed", tiers: ["T1","T2","T3","T4","T5","T6"] };

// Suffixes — resistances
const FIRE_RES_SUFFIX:      AffixDef = { name: "Fire Resistance",      tiers: ["T1","T2","T3","T4","T5","T6"] };
const COLD_RES_SUFFIX:      AffixDef = { name: "Cold Resistance",      tiers: ["T1","T2","T3","T4","T5","T6"] };
const LIGHTNING_RES_SUFFIX: AffixDef = { name: "Lightning Resistance", tiers: ["T1","T2","T3","T4","T5","T6"] };
const CHAOS_RES_SUFFIX:     AffixDef = { name: "Chaos Resistance",     tiers: ["T1","T2","T3","T4","T5"] };

// Suffixes — attributes
const STR_SUFFIX: AffixDef = { name: "Strength",     tiers: ["T1","T2","T3","T4"] };
const DEX_SUFFIX: AffixDef = { name: "Dexterity",    tiers: ["T1","T2","T3","T4"] };
const INT_SUFFIX: AffixDef = { name: "Intelligence", tiers: ["T1","T2","T3","T4"] };

// ─── Per-class mod pools ─────────────────────────────────────────────────────

export const MOD_POOLS: Record<ItemClass, ModPool> = {

  // ── RANGED WEAPONS ──────────────────────────────────────────────────────────

  Bow: {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "% increased Elemental Damage with Attacks", tiers: ["T1","T2","T3","T4"] },
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Cold Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      // PoE2-exact text for the arrow suffix (T1 = 1 arrow, T2 = 2 arrows)
      { name: "Bow Attacks fire an additional Arrow",   tiers: ["T1"] },
      { name: "Bow Attacks fire 2 additional Arrows",  tiers: ["T1"] },
      { name: "+X to Level of all Projectile Skills",  tiers: ["T1","T2","T3"] },
      { name: "Projectile Pierces an additional Target", tiers: ["T1","T2"] },
      { name: "Leeches % of Physical Damage as Life",  tiers: ["T1","T2","T3"] },
      { name: "Gain Life per Enemy Killed",            tiers: ["T1","T2","T3","T4"] },
      DEX_SUFFIX,
      { name: "% reduced Attribute Requirements",      tiers: ["T1","T2","T3"] },
    ],
  },

  Crossbow: {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "% increased Elemental Damage with Attacks", tiers: ["T1","T2","T3","T4"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      // Crossbows get Reload Speed instead of additional arrows
      { name: "% increased Reload Speed",              tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Projectile Skills",  tiers: ["T1","T2","T3"] },
      { name: "Leeches % of Physical Damage as Life",  tiers: ["T1","T2","T3"] },
      DEX_SUFFIX,
    ],
  },

  Quiver: {
    prefixes: [
      FLAT_PHYS_PREFIX,
      { name: "% increased Physical Damage with Bows",    tiers: ["T1","T2","T3","T4"] },
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Bow Attacks fire an additional Arrow",  tiers: ["T1"] },
      { name: "+X to Level of all Projectile Skills", tiers: ["T1","T2","T3"] },
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      DEX_SUFFIX,
    ],
  },

  // ── MELEE WEAPONS ───────────────────────────────────────────────────────────
  // All melee weapons share the same broad pool per instructions.md section 5.

  "One-Handed Sword": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Cold Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike",  tiers: ["T1"] },
      { name: "Knockback",       tiers: ["T1","T2"] },
      DEX_SUFFIX,
      STR_SUFFIX,
    ],
  },

  "Two-Handed Sword": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Cold Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      { name: "Knockback",      tiers: ["T1","T2"] },
      STR_SUFFIX,
      DEX_SUFFIX,
    ],
  },

  "One-Handed Axe": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      { name: "Knockback",      tiers: ["T1","T2"] },
      STR_SUFFIX,
    ],
  },

  "Two-Handed Axe": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      { name: "Knockback",      tiers: ["T1","T2"] },
      STR_SUFFIX,
    ],
  },

  "One-Handed Mace": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      { name: "Knockback",      tiers: ["T1","T2"] },
      STR_SUFFIX,
    ],
  },

  "Two-Handed Mace": {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      { name: "Knockback",      tiers: ["T1","T2"] },
      STR_SUFFIX,
    ],
  },

  Spear: {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
      { name: "Gain % of Physical Damage as Extra Fire Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Cold Damage",      tiers: ["T1","T2","T3"] },
      { name: "Gain % of Physical Damage as Extra Lightning Damage", tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Melee Skills",                     tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      DEX_SUFFIX,
      STR_SUFFIX,
    ],
  },

  // ── HYBRID WEAPON ───────────────────────────────────────────────────────────
  // Quarterstaves: attack + spell hybrid pool (instructions.md section 5)

  Quarterstaff: {
    prefixes: [
      FLAT_PHYS_PREFIX,
      PHYS_PCT_PREFIX,
      SPELL_DMG_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_FIRE_SPELL_PREFIX,
      FLAT_COLD_SPELL_PREFIX,
      FLAT_LIGHTNING_SPELL_PREFIX,
      { name: "+X to Level of all Melee Skills",         tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Spell Skills",         tiers: ["T1","T2","T3","T4","T5"] },
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CAST_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      ACCURACY_SUFFIX,
      { name: "Culling Strike", tiers: ["T1"] },
      STR_SUFFIX,
      INT_SUFFIX,
    ],
  },

  // ── CASTER WEAPONS ──────────────────────────────────────────────────────────
  // Wand, Sceptre, Focus: caster-only pool (instructions.md section 5)

  Wand: {
    prefixes: [
      SPELL_DMG_PREFIX,
      FLAT_FIRE_SPELL_PREFIX,
      FLAT_COLD_SPELL_PREFIX,
      FLAT_LIGHTNING_SPELL_PREFIX,
      FLAT_CHAOS_SPELL_PREFIX,
      { name: "+X to Level of all Fire Spell Skills",      tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Cold Spell Skills",      tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Lightning Spell Skills", tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Chaos Spell Skills",     tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Spell Skills",           tiers: ["T1","T2","T3","T4","T5"] },
    ],
    suffixes: [
      CAST_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      INT_SUFFIX,
    ],
  },

  Sceptre: {
    prefixes: [
      SPELL_DMG_PREFIX,
      FLAT_FIRE_SPELL_PREFIX,
      FLAT_COLD_SPELL_PREFIX,
      FLAT_LIGHTNING_SPELL_PREFIX,
      FLAT_CHAOS_SPELL_PREFIX,
      { name: "+X to Level of all Fire Spell Skills",      tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Cold Spell Skills",      tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Lightning Spell Skills", tiers: ["T1","T2","T3","T4","T5"] },
      { name: "+X to Level of all Chaos Spell Skills",     tiers: ["T1","T2","T3"] },
      { name: "+X to Level of all Spell Skills",           tiers: ["T1","T2","T3","T4","T5"] },
      // Sceptres also get some melee/attack hybrids
      { name: "+X to Level of all Melee Skills",           tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      CAST_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      INT_SUFFIX,
      STR_SUFFIX,
    ],
  },

  Focus: {
    prefixes: [
      SPELL_DMG_PREFIX,
      ES_PREFIX,
      MANA_PREFIX,
      FLAT_FIRE_SPELL_PREFIX,
      FLAT_COLD_SPELL_PREFIX,
      FLAT_LIGHTNING_SPELL_PREFIX,
      { name: "+X to Level of all Spell Skills", tiers: ["T1","T2","T3","T4","T5"] },
    ],
    suffixes: [
      CAST_SPEED_SUFFIX,
      CRIT_CHANCE_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      INT_SUFFIX,
    ],
  },

  // ── ARMOUR ──────────────────────────────────────────────────────────────────

  Helmet: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      MANA_PREFIX,
      { name: "Armour and Energy Shield",  tiers: ["T1","T2","T3","T4","T5"] },
      { name: "Armour and Evasion Rating", tiers: ["T1","T2","T3","T4","T5"] },
      { name: "Evasion Rating and Energy Shield", tiers: ["T1","T2","T3","T4","T5"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
      ACCURACY_SUFFIX,
    ],
  },

  "Body Armour": {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      MANA_PREFIX,
      { name: "Armour and Energy Shield",       tiers: ["T1","T2","T3","T4","T5"] },
      { name: "Armour and Evasion Rating",      tiers: ["T1","T2","T3","T4","T5"] },
      { name: "Evasion Rating and Energy Shield", tiers: ["T1","T2","T3","T4","T5"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
    ],
  },

  Gloves: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      MANA_PREFIX,
      FLAT_PHYS_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
    ],
    suffixes: [
      ATK_SPEED_SUFFIX,
      CAST_SPEED_SUFFIX,
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
      ACCURACY_SUFFIX,
    ],
  },

  Boots: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      MANA_PREFIX,
      // Movement Speed is a boots-exclusive prefix (instructions.md section 5)
      { name: "% increased Movement Speed", tiers: ["T1","T2","T3","T4"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
    ],
  },

  Shield: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      MANA_PREFIX,
      // Block is a shield-exclusive prefix (instructions.md section 5)
      { name: "% Chance to Block Attack Damage", tiers: ["T1","T2","T3"] },
      { name: "% Chance to Block Spell Damage",  tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
    ],
  },

  // ── JEWELLERY ───────────────────────────────────────────────────────────────

  Amulet: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      MANA_PREFIX,
      FLAT_PHYS_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_FIRE_SPELL_PREFIX,
      FLAT_COLD_SPELL_PREFIX,
      FLAT_LIGHTNING_SPELL_PREFIX,
      { name: "+X to Level of all Skill Gems",   tiers: ["T1"] },
      { name: "+X to Level of all Spell Skills", tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      { name: "All Attributes",         tiers: ["T1","T2","T3","T4"] },
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      // Amulets can have Movement Speed per instructions.md section 5
      { name: "% increased Movement Speed", tiers: ["T1","T2","T3"] },
    ],
  },

  Ring: {
    prefixes: [
      LIFE_PREFIX,
      ES_PREFIX,
      MANA_PREFIX,
      // Rings have flat damage to attacks (instructions.md section 5)
      FLAT_PHYS_PREFIX,
      FLAT_FIRE_ATK_PREFIX,
      FLAT_COLD_ATK_PREFIX,
      FLAT_LIGHTNING_ATK_PREFIX,
      FLAT_CHAOS_ATK_PREFIX,
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
      ACCURACY_SUFFIX,
      CRIT_DAMAGE_SUFFIX,
      CAST_SPEED_SUFFIX,
    ],
  },

  Belt: {
    prefixes: [
      LIFE_PREFIX,
      MANA_PREFIX,
      ARMOUR_PREFIX,
      EVASION_PREFIX,
      ES_PREFIX,
      // Belts have flask mods (instructions.md section 5)
      { name: "% increased Flask Effect Duration",   tiers: ["T1","T2","T3","T4"] },
      { name: "% increased Flask Charges gained",    tiers: ["T1","T2","T3","T4"] },
      { name: "% reduced Flask Charges used",        tiers: ["T1","T2","T3"] },
    ],
    suffixes: [
      FIRE_RES_SUFFIX,
      COLD_RES_SUFFIX,
      LIGHTNING_RES_SUFFIX,
      CHAOS_RES_SUFFIX,
      STR_SUFFIX,
      DEX_SUFFIX,
      INT_SUFFIX,
      { name: "% increased Stun Threshold",          tiers: ["T1","T2","T3"] },
      { name: "% increased Charm Effect Duration",   tiers: ["T1","T2","T3"] },
    ],
  },
};

export function getModPool(itemClass: ItemClass): ModPool {
  return MOD_POOLS[itemClass] ?? { prefixes: [], suffixes: [] };
}
