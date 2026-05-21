export interface AffixDef {
  name: string;
  tiers: string[];
}

export interface ModPool {
  prefixes: AffixDef[];
  suffixes: AffixDef[];
}

// Item classes shown in the UI
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

// Representative base items per class (not exhaustive — full list in v1.1 via live fetch)
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
  Amulet: ["Paua Amulet", "Coral Amulet", "Amber Amulet", "Jade Amulet", "Lapis Amulet", "Gold Amulet", "Turquoise Amulet", "Marble Amulet", "Citrine Amulet"],
  Ring: ["Paua Ring", "Coral Ring", "Iron Ring", "Unset Ring", "Sapphire Ring", "Topaz Ring", "Ruby Ring", "Diamond Ring", "Gold Ring", "Two-Stone Ring", "Three-Stone Ring"],
  Belt: ["Leather Belt", "Heavy Belt", "Cloth Belt", "Rustic Sash", "Studded Belt", "Vanguard Belt", "Crystal Belt"],
};

// Shared prefix/suffix pools by broad category
const LIFE_PREFIX: AffixDef = { name: "Maximum Life", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const MANA_PREFIX: AffixDef = { name: "Maximum Mana", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const ES_PREFIX: AffixDef = { name: "Maximum Energy Shield", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const ARMOUR_PREFIX: AffixDef = { name: "Armour", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const EVASION_PREFIX: AffixDef = { name: "Evasion Rating", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const FLAT_PHYS_PREFIX: AffixDef = { name: "Adds Physical Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const PHYS_PCT_PREFIX: AffixDef = { name: "% Increased Physical Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const FLAT_FIRE_PREFIX: AffixDef = { name: "Adds Fire Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const FLAT_COLD_PREFIX: AffixDef = { name: "Adds Cold Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const FLAT_LIGHTNING_PREFIX: AffixDef = { name: "Adds Lightning Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const SPELL_DMG_PREFIX: AffixDef = { name: "% Increased Spell Damage", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const CAST_SPEED_PREFIX: AffixDef = { name: "Cast Speed", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const ATK_SPEED_SUFFIX: AffixDef = { name: "Attack Speed", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const CRIT_CHANCE_SUFFIX: AffixDef = { name: "Critical Strike Chance", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const CRIT_MULTI_SUFFIX: AffixDef = { name: "Critical Strike Multiplier", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const FIRE_RES_SUFFIX: AffixDef = { name: "Fire Resistance", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const COLD_RES_SUFFIX: AffixDef = { name: "Cold Resistance", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const LIGHTNING_RES_SUFFIX: AffixDef = { name: "Lightning Resistance", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const CHAOS_RES_SUFFIX: AffixDef = { name: "Chaos Resistance", tiers: ["T1", "T2", "T3", "T4", "T5"] };
const STR_SUFFIX: AffixDef = { name: "Strength", tiers: ["T1", "T2", "T3", "T4"] };
const DEX_SUFFIX: AffixDef = { name: "Dexterity", tiers: ["T1", "T2", "T3", "T4"] };
const INT_SUFFIX: AffixDef = { name: "Intelligence", tiers: ["T1", "T2", "T3", "T4"] };
const ACCURACY_SUFFIX: AffixDef = { name: "Accuracy Rating", tiers: ["T1", "T2", "T3", "T4", "T5"] };

export const MOD_POOLS: Record<ItemClass, ModPool> = {
  Bow: {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX, { name: "Adds Chaos Damage", tiers: ["T1", "T2", "T3"] }],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, { name: "Additional Arrow", tiers: ["T1"] }, { name: "Projectile Speed", tiers: ["T1", "T2", "T3"] }, ACCURACY_SUFFIX, DEX_SUFFIX],
  },
  Crossbow: {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, { name: "Reload Speed", tiers: ["T1", "T2", "T3"] }, ACCURACY_SUFFIX, DEX_SUFFIX],
  },
  Quiver: {
    prefixes: [FLAT_PHYS_PREFIX, { name: "% Phys Damage with Bows", tiers: ["T1", "T2", "T3"] }, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, { name: "Additional Arrow", tiers: ["T1"] }, FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX],
  },
  "One-Handed Sword": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, DEX_SUFFIX, STR_SUFFIX],
  },
  "Two-Handed Sword": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, STR_SUFFIX],
  },
  "One-Handed Axe": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, STR_SUFFIX],
  },
  "Two-Handed Axe": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, STR_SUFFIX],
  },
  "One-Handed Mace": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, STR_SUFFIX],
  },
  "Two-Handed Mace": {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, STR_SUFFIX],
  },
  Spear: {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, ACCURACY_SUFFIX, DEX_SUFFIX, STR_SUFFIX],
  },
  Quarterstaff: {
    prefixes: [FLAT_PHYS_PREFIX, PHYS_PCT_PREFIX, SPELL_DMG_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, CAST_SPEED_PREFIX, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, STR_SUFFIX, INT_SUFFIX],
  },
  Wand: {
    prefixes: [SPELL_DMG_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX, { name: "Adds Chaos Damage to Spells", tiers: ["T1", "T2", "T3"] }, { name: "+1 to Level of Fire Spell Skills", tiers: ["T1"] }, { name: "+1 to Level of Cold Spell Skills", tiers: ["T1"] }, { name: "+1 to Level of Lightning Spell Skills", tiers: ["T1"] }],
    suffixes: [{ name: "Cast Speed", tiers: ["T1", "T2", "T3", "T4", "T5"] }, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, INT_SUFFIX],
  },
  Sceptre: {
    prefixes: [SPELL_DMG_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX, { name: "+1 to Level of Fire Spell Skills", tiers: ["T1"] }, { name: "+1 to Level of Cold Spell Skills", tiers: ["T1"] }, { name: "+1 to Level of Lightning Spell Skills", tiers: ["T1"] }],
    suffixes: [{ name: "Cast Speed", tiers: ["T1", "T2", "T3", "T4", "T5"] }, CRIT_CHANCE_SUFFIX, CRIT_MULTI_SUFFIX, INT_SUFFIX, STR_SUFFIX],
  },
  Focus: {
    prefixes: [SPELL_DMG_PREFIX, ES_PREFIX, MANA_PREFIX],
    suffixes: [{ name: "Cast Speed", tiers: ["T1", "T2", "T3", "T4", "T5"] }, CRIT_CHANCE_SUFFIX, FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, INT_SUFFIX],
  },
  Helmet: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, MANA_PREFIX],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX, INT_SUFFIX, ACCURACY_SUFFIX],
  },
  "Body Armour": {
    prefixes: [LIFE_PREFIX, ES_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, MANA_PREFIX],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX, INT_SUFFIX],
  },
  Gloves: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, FLAT_PHYS_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [ATK_SPEED_SUFFIX, FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX, ACCURACY_SUFFIX],
  },
  Boots: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, { name: "Movement Speed", tiers: ["T1", "T2", "T3", "T4"] }],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX],
  },
  Shield: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, MANA_PREFIX],
    suffixes: [{ name: "Chance to Block", tiers: ["T1", "T2", "T3"] }, { name: "Spell Block Chance", tiers: ["T1", "T2", "T3"] }, FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, INT_SUFFIX],
  },
  Amulet: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, MANA_PREFIX, FLAT_PHYS_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX, { name: "+1 to All Skill Gems", tiers: ["T1"] }],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, { name: "All Attributes", tiers: ["T1", "T2", "T3"] }, STR_SUFFIX, DEX_SUFFIX, INT_SUFFIX, CRIT_MULTI_SUFFIX, { name: "Movement Speed", tiers: ["T1", "T2", "T3"] }],
  },
  Ring: {
    prefixes: [LIFE_PREFIX, ES_PREFIX, MANA_PREFIX, FLAT_PHYS_PREFIX, FLAT_FIRE_PREFIX, FLAT_COLD_PREFIX, FLAT_LIGHTNING_PREFIX],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX, INT_SUFFIX, ACCURACY_SUFFIX, CRIT_MULTI_SUFFIX],
  },
  Belt: {
    prefixes: [LIFE_PREFIX, ARMOUR_PREFIX, EVASION_PREFIX, ES_PREFIX, { name: "Flask Effect Duration", tiers: ["T1", "T2", "T3"] }],
    suffixes: [FIRE_RES_SUFFIX, COLD_RES_SUFFIX, LIGHTNING_RES_SUFFIX, CHAOS_RES_SUFFIX, STR_SUFFIX, DEX_SUFFIX, { name: "Flask Charges Gained", tiers: ["T1", "T2", "T3"] }],
  },
};

export function getModPool(itemClass: ItemClass): ModPool {
  return MOD_POOLS[itemClass] ?? { prefixes: [], suffixes: [] };
}
