// PoE2 Affix Data — verified against poe2db.tw and craftofexile.com/?game=poe2
// Last updated: 2026-05-21 (patch 0.4 "The Last of the Druids")
//
// BASE ITEMS: All base item names sourced directly from poe2db.tw.
//   Every name is the exact PoE2 in-game name. No PoE1 bases appear here.
//
// MOD NAMES: All mod names are PoE2-specific. Key differences from PoE1:
//   - "Critical Hit Chance" (not "Critical Strike Chance")
//   - "Critical Damage Bonus" (not "Critical Strike Multiplier")
//   - "Bow Attacks fire an additional Arrow" (exact in-game text)
//   - "+X to Level of all Projectile Skills" (bow suffix)
//   - Focus is a caster off-hand item (NOT a shield)
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

// Base items sourced from poe2db.tw — patch 0.4 ("The Last of the Druids")
// All names are exact PoE2 in-game names. PoE1 bases do not exist here.
export const BASES: Record<ItemClass, string[]> = {

  // ── RANGED WEAPONS ────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Bows (26 bases)
  Bow: [
    "Crude Bow",
    "Shortbow",
    "Warden Bow",
    "Recurve Bow",
    "Composite Bow",
    "Dualstring Bow",
    "Cultist Bow",
    "Zealot Bow",
    "Artillery Bow",
    "Tribal Bow",
    "Greatbow",
    "Double Limb Bow",
    "Heavy Bow",
    "Snakewood Shortbow",
    "Protector Bow",
    "Rider Bow",
    "Twin Bow",
    "Adherent Bow",
    "Militant Bow",
    "Ironwood Shortbow",
    "Cavalry Bow",
    "Guardian Bow",
    "Gemini Bow",
    "Fanatic Bow",
    "Warmonger Bow",
    "Obliterator Bow",
  ],

  // Source: poe2db.tw/us/Crossbows (26 bases)
  Crossbow: [
    "Makeshift Crossbow",
    "Tense Crossbow",
    "Sturdy Crossbow",
    "Varnished Crossbow",
    "Dyad Crossbow",
    "Alloy Crossbow",
    "Bombard Crossbow",
    "Construct Crossbow",
    "Blackfire Crossbow",
    "Piercing Crossbow",
    "Cumbrous Crossbow",
    "Dedalian Crossbow",
    "Esoteric Crossbow",
    "Taut Crossbow",
    "Robust Crossbow",
    "Painted Crossbow",
    "Twin Crossbow",
    "Cannonade Crossbow",
    "Bleak Crossbow",
    "Stout Crossbow",
    "Engraved Crossbow",
    "Flexed Crossbow",
    "Gemini Crossbow",
    "Siege Crossbow",
    "Desolate Crossbow",
    "Elegant Crossbow",
  ],

  // Source: poe2db.tw/us/Quivers (11 bases)
  Quiver: [
    "Broadhead Quiver",
    "Fire Quiver",
    "Sacral Quiver",
    "Two-Point Quiver",
    "Blunt Quiver",
    "Toxic Quiver",
    "Serrated Quiver",
    "Primed Quiver",
    "Penetrating Quiver",
    "Volant Quiver",
    "Visceral Quiver",
  ],

  // ── SWORDS ────────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/One_Hand_Swords (13 bases)
  "One-Handed Sword": [
    "Shortsword",
    "Broadsword",
    "Vampiric Blade",
    "Scimitar",
    "Charred Shortsword",
    "Sickle Sword",
    "Falchion",
    "Treasured Blade",
    "Cutlass",
    "Runic Shortsword",
    "Messer",
    "Commander Sword",
    "Dark Blade",
  ],

  // Source: poe2db.tw/us/Two_Hand_Swords (13 bases)
  "Two-Handed Sword": [
    "Corroded Longsword",
    "Iron Greatsword",
    "Blessed Claymore",
    "Broad Greatsword",
    "Rippled Greatsword",
    "Arced Longsword",
    "Stone Greatsword",
    "Obsidian Greatsword",
    "Keen Greatsword",
    "Ancient Greatblade",
    "Flanged Greatblade",
    "Regalia Longsword",
    "Ultra Greatsword",
  ],

  // ── AXES ─────────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/One_Hand_Axes (13 bases)
  "One-Handed Axe": [
    "Dull Hatchet",
    "Hook Axe",
    "Bearded Axe",
    "Extended Cleaver",
    "Bandit Hatchet",
    "Crescent Axe",
    "Carving Hatchet",
    "Sacrificial Axe",
    "Boarding Hatchet",
    "Fury Cleaver",
    "Battle Axe",
    "Profane Cleaver",
    "Dread Hatchet",
  ],

  // Source: poe2db.tw/us/Two_Hand_Axes (13 bases)
  "Two-Handed Axe": [
    "Splitting Greataxe",
    "Light Halberd",
    "Executioner Greataxe",
    "Arched Greataxe",
    "Elegant Glaive",
    "Savage Greataxe",
    "Rending Halberd",
    "Jagged Greataxe",
    "Reaver Glaive",
    "Ember Greataxe",
    "Ceremonial Halberd",
    "Monument Greataxe",
    "Vile Greataxe",
  ],

  // ── MACES ────────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/One_Hand_Maces (27 bases)
  "One-Handed Mace": [
    "Wooden Club",
    "Smithing Hammer",
    "Slim Mace",
    "Spiked Club",
    "Warpick",
    "Plated Mace",
    "Brigand Mace",
    "Construct Hammer",
    "Morning Star",
    "Jade Club",
    "Lumen Mace",
    "Execratus Hammer",
    "Torment Club",
    "Kalguuran Forgehammer",
    "Calescent Hammer",
    "Flared Mace",
    "Battle Pick",
    "Marching Mace",
    "Bandit Mace",
    "Structured Hammer",
    "Flanged Mace",
    "Crown Mace",
    "Molten Hammer",
    "Strife Pick",
    "Fortified Hammer",
    "Marauding Mace",
    "Akoyan Club",
  ],

  // Source: poe2db.tw/us/Two_Hand_Maces (26 bases)
  "Two-Handed Mace": [
    "Felled Greatclub",
    "Oak Greathammer",
    "Forge Maul",
    "Studded Greatclub",
    "Cultist Greathammer",
    "Temple Maul",
    "Leaden Greathammer",
    "Crumbling Maul",
    "Pointed Maul",
    "Totemic Greatclub",
    "Greatmace",
    "Precise Greathammer",
    "Giant Maul",
    "Snakewood Greathammer",
    "Blacksmith Maul",
    "Zealot Greathammer",
    "Solemn Maul",
    "Heavy Greathammer",
    "Disintegrating Maul",
    "Anvil Maul",
    "Sacred Maul",
    "Ironwood Greathammer",
    "Fanatic Greathammer",
    "Ruination Maul",
    "Massive Greathammer",
    "Tawhoan Greatclub",
  ],

  // ── SPEARS ───────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Spears (28 bases)
  Spear: [
    "Hardwood Spear",
    "Ironhead Spear",
    "Hunting Spear",
    "Winged Spear",
    "War Spear",
    "Forked Spear",
    "Barbed Spear",
    "Broad Spear",
    "Crossblade Spear",
    "Seaglass Spear",
    "Sword Spear",
    "Striking Spear",
    "Helix Spear",
    "Steelhead Spear",
    "Coursing Spear",
    "Swift Spear",
    "Branched Spear",
    "Jagged Spear",
    "Massive Spear",
    "Orichalcum Spear",
    "Soaring Spear",
    "Pronged Spear",
    "Stalking Spear",
    "Flying Spear",
    "Grand Spear",
    "Spiked Spear",
    "Guardian Spear",
    "Akoyan Spear",
  ],

  // ── QUARTERSTAVES ────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Quarterstaves (27 bases)
  Quarterstaff: [
    "Wrapped Quarterstaff",
    "Long Quarterstaff",
    "Gothic Quarterstaff",
    "Crackling Quarterstaff",
    "Crescent Quarterstaff",
    "Steelpoint Quarterstaff",
    "Slicing Quarterstaff",
    "Barrier Quarterstaff",
    "Hefty Quarterstaff",
    "Smooth Quarterstaff",
    "Anima Quarterstaff",
    "Graceful Quarterstaff",
    "Wyrm Quarterstaff",
    "Reaching Quarterstaff",
    "Barbarous Quarterstaff",
    "Arcing Quarterstaff",
    "Waxing Quarterstaff",
    "Bladed Quarterstaff",
    "Guardian Quarterstaff",
    "Sinister Quarterstaff",
    "Lunar Quarterstaff",
    "Striking Quarterstaff",
    "Bolting Quarterstaff",
    "Aegis Quarterstaff",
    "Razor Quarterstaff",
    "Skullcrusher Quarterstaff",
    "Dreaming Quarterstaff",
  ],

  // ── CASTER WEAPONS ───────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Wands (13 bases)
  Wand: [
    "Withered Wand",
    "Bone Wand",
    "Attuned Wand",
    "Siphoning Wand",
    "Volatile Wand",
    "Galvanic Wand",
    "Acrid Wand",
    "Offering Wand",
    "Frigid Wand",
    "Torture Wand",
    "Critical Wand",
    "Primordial Wand",
    "Dueling Wand",
  ],

  // Source: poe2db.tw/us/Sceptres (13 bases)
  Sceptre: [
    "Rattling Sceptre",
    "Stoic Sceptre",
    "Lupine Sceptre",
    "Omen Sceptre",
    "Ochre Sceptre",
    "Shrine Sceptre",
    "Devouring Sceptre",
    "Clasped Sceptre",
    "Devotional Sceptre",
    "Wrath Sceptre",
    "Aromatic Sceptre",
    "Pious Sceptre",
    "Hallowed Sceptre",
  ],

  // Source: poe2db.tw/us/Foci (23 bases)
  // NOTE: Focus is a caster off-hand — NOT a shield. Previous data was wrong.
  Focus: [
    "Twig Focus",
    "Woven Focus",
    "Antler Focus",
    "Engraved Focus",
    "Tonal Focus",
    "Crystal Focus",
    "Voodoo Focus",
    "Plumed Focus",
    "Runed Focus",
    "Whorl Focus",
    "Elegant Focus",
    "Attuned Focus",
    "Magus Focus",
    "Wreath Focus",
    "Staghorn Focus",
    "Jingling Focus",
    "Arrayed Focus",
    "Cultist Focus",
    "Hallowed Focus",
    "Druidic Focus",
    "Leyline Focus",
    "Sacred Focus",
    "Tasalian Focus",
  ],

  // ── ARMOUR ───────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Helmets — representative selection by type
  Helmet: [
    // Strength (Greathelms)
    "Rusted Greathelm", "Soldier Greathelm", "Warrior Greathelm", "Commander Greathelm",
    "Sentinel Greathelm", "Goliath Greathelm", "Guardian Greathelm",
    // Dexterity (Hoods/Caps)
    "Shabby Hood", "Felt Cap", "Hunter Hood", "Corsair Cap",
    "Leatherbound Hood", "Velvet Cap", "Covert Hood",
    // Intelligence (Circlets/Tiaras)
    "Twig Circlet", "Beaded Circlet", "Gold Circlet",
    "Feathered Tiara", "Noble Circlet", "Magus Tiara",
    // Hybrid (Helms/Crowns/Masks)
    "Brimmed Helm", "Visored Helm", "Closed Helm", "Gallant Helm",
    "Iron Crown", "Cultist Crown", "Spiritbone Crown", "Archon Crown",
    "Hewn Mask", "Tribal Mask", "Death Mask", "Grand Visage",
  ],

  // Source: poe2db.tw/us/Body_Armours — representative selection by type
  "Body Armour": [
    // Strength (Cuirass/Plate)
    "Rusted Cuirass", "Iron Cuirass", "Steel Plate", "Full Plate",
    "Glorious Plate", "Conqueror Plate", "Golden Plate",
    // Dexterity (Vest/Coat)
    "Leather Vest", "Studded Vest", "Scout's Vest", "Serpentscale Coat",
    "Exquisite Vest", "Armoured Vest", "Wyrmscale Coat",
    // Intelligence (Robe/Raiment)
    "Tattered Robe", "Silk Robe", "Elementalist Robe",
    "Imperial Robe", "Arcane Raiment", "Luxurious Robe",
    // Hybrid Str/Dex
    "Chain Mail", "Scale Mail", "Knight Armour", "Tournament Mail",
    // Hybrid Str/Int
    "Pilgrim Vestments", "Mail Vestments", "Templar Vestments",
    // Hybrid Dex/Int
    "Hermit Garb", "Ascetic Garb", "Monastic Garb",
    // Tri-hybrid
    "Grand Regalia",
  ],

  // Source: poe2db.tw/us/Gloves — representative selection by type
  Gloves: [
    // Strength (Mitts)
    "Stocky Mitts", "Riveted Mitts", "Tempered Mitts",
    "Plated Mitts", "Knightly Mitts", "Ornate Mitts",
    // Dexterity (Bracers)
    "Suede Bracers", "Firm Bracers", "Sectioned Bracers",
    "Hunting Bracers", "Swift Bracers", "Stalking Bracers",
    // Intelligence (Gloves)
    "Torn Gloves", "Stitched Gloves", "Jewelled Gloves",
    "Intricate Gloves", "Embroidered Gloves", "Gold Gloves",
    // Hybrid (Gauntlets/Cuffs/Wraps)
    "Ringmail Gauntlets", "Plate Gauntlets", "Burnished Gauntlets",
    "Rope Cuffs", "Goldcast Cuffs", "Righteous Cuffs",
    "Gauze Wraps", "Buckled Wraps", "Utility Wraps",
  ],

  // Source: poe2db.tw/us/Boots — representative selection by type
  Boots: [
    // Strength (Greaves)
    "Rough Greaves", "Iron Greaves", "Stone Greaves",
    "Golden Greaves", "Plated Greaves", "Vaal Greaves",
    // Dexterity (Boots)
    "Rawhide Boots", "Laced Boots", "Embossed Boots",
    "Leatherplate Boots", "Cavalry Boots", "Dragonscale Boots",
    // Intelligence (Sandals/Slippers)
    "Straw Sandals", "Wrapped Sandals", "Silk Slippers",
    "Feathered Sandals", "Elegant Slippers", "Luxurious Slippers",
    // Hybrid (Sabatons/Leggings/Shoes)
    "Mail Sabatons", "Stacked Sabatons", "Noble Sabatons",
    "Padded Leggings", "Gilt Leggings", "Apostle Leggings",
    "Frayed Shoes", "Wanderer Shoes", "Quickslip Shoes",
  ],

  // Source: poe2db.tw/us/Shields — representative selection by type
  Shield: [
    // Tower Shields (Strength)
    "Splintered Tower Shield", "Painted Tower Shield", "Barricade Tower Shield",
    "Rampart Tower Shield", "Stone Tower Shield", "Phalanx Tower Shield",
    "Blacksteel Tower Shield", "Royal Tower Shield", "Vaal Tower Shield",
    // Targes (Str/Dex)
    "Hardwood Targe", "Studded Targe", "Feathered Targe",
    "Carved Targe", "Mosaic Targe", "Grand Targe",
    "Polished Targe", "Baroque Targe", "Golden Targe",
    // Crest Shields (Str/Int)
    "Blazon Crest Shield", "Sigil Crest Shield", "Sectarian Crest Shield",
    "Seer Crest Shield", "Stoic Crest Shield", "Deified Crest Shield",
    "Quartered Crest Shield", "Vaal Crest Shield",
  ],

  // ── JEWELLERY ────────────────────────────────────────────────────────────
  // Source: poe2db.tw/us/Amulets (16 bases)
  Amulet: [
    "Crimson Amulet",
    "Azure Amulet",
    "Amber Amulet",
    "Jade Amulet",
    "Lapis Amulet",
    "Lunar Amulet",
    "Bloodstone Amulet",
    "Stellar Amulet",
    "Solar Amulet",
    "Gold Amulet",
    "Pearlescent Amulet",
    "Dusk Amulet",
    "Gloam Amulet",
    "Penumbra Amulet",
    "Tenebrous Amulet",
    "Distorted Amulet",
  ],

  // Source: poe2db.tw/us/Rings (18 bases, excluding the bare "Ring" placeholder)
  Ring: [
    "Golden Hoop",
    "Iron Ring",
    "Lazuli Ring",
    "Ruby Ring",
    "Sapphire Ring",
    "Topaz Ring",
    "Amethyst Ring",
    "Emerald Ring",
    "Pearl Ring",
    "Prismatic Ring",
    "Gold Ring",
    "Unset Ring",
    "Abyssal Signet",
    "Dusk Ring",
    "Gloam Ring",
    "Penumbra Ring",
    "Tenebrous Ring",
    "Breach Ring",
  ],

  // Source: poe2db.tw/us/Belts (12 bases)
  Belt: [
    "Rawhide Belt",
    "Linen Belt",
    "Wide Belt",
    "Long Belt",
    "Plate Belt",
    "Ornate Belt",
    "Mail Belt",
    "Double Belt",
    "Heavy Belt",
    "Utility Belt",
    "Fine Belt",
    "Golden Obi",
  ],
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
