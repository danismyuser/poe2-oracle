/**
 * Authoritative PoE2 currency + omen reference.
 * Source: https://poe2db.tw/us/Currency, https://poe2db.tw/us/Omen,
 *         https://poe2db.tw/us/Essence, https://poe2db.tw/us/Crafting
 *
 * This is the single source of truth for:
 *  - the system-prompt currency reference (see currency-prompt.ts)
 *  - the recipe validator's currency-flow checks (see recipe-validate.ts)
 *  - the §11b instructions.md currency mechanics rules
 *
 * Common Oracle failure modes this catches:
 *  - "Apply Greater Essence to a white base" — non-Perfect essences need MAGIC
 *  - "Apply Perfect Essence to a white base" — Perfect essences need RARE
 *  - "Use Omen of Crystallisation to preview" — that omen doesn't exist; use Hinekora's Lock
 *  - "Use Chaos Orb on a white item" — Chaos needs RARE
 *  - "Use Exalt on a magic item" — Exalt needs RARE with open slot
 */

export type ItemRarity = "normal" | "magic" | "rare" | "unique" | "corrupted";

export interface CurrencyDef {
  /** Display name as it appears in-game. */
  name: string;
  /** Logical family for grouping (so Greater/Perfect variants of one base aren't sprinkled). */
  family: string;
  /** What item rarities this currency can legally be applied to. */
  appliesTo: ItemRarity[];
  /** Short description of effect — should be copy-pasted from poe2db where possible. */
  effect: string;
  /** Tier within a family. "base" = no prefix, "lesser/greater/perfect" otherwise. */
  tier?: "base" | "lesser" | "greater" | "perfect";
  /** Minimum modifier level guaranteed (Greater = 35 for most, Perfect = 50; Greater Trans/Aug = 55, Perfect = 70). */
  modLevelMin?: number;
  /** Hard requirement that the item must have at least one open affix slot (true for Exalt/Augment, etc). */
  requiresOpenSlot?: boolean;
  /** Additional gameplay notes. */
  notes?: string;
}

export const CURRENCIES: CurrencyDef[] = [
  // ── Identification & quality (passive, no state requirement) ────────────
  { name: "Scroll of Wisdom",        family: "identification", appliesTo: ["normal", "magic", "rare"], effect: "Identifies an item." },
  { name: "Blacksmith's Whetstone",  family: "quality", appliesTo: ["normal","magic","rare"], effect: "Improves the quality of a martial weapon." },
  { name: "Arcanist's Etcher",       family: "quality", appliesTo: ["normal","magic","rare"], effect: "Improves the quality of a wand, staff or sceptre." },
  { name: "Armourer's Scrap",        family: "quality", appliesTo: ["normal","magic","rare"], effect: "Improves the quality of an armour." },
  { name: "Glassblower's Bauble",    family: "quality", appliesTo: ["normal","magic","rare"], effect: "Improves the quality of a flask." },
  { name: "Gemcutter's Prism",       family: "quality", appliesTo: ["normal","magic","rare"], effect: "Improves the quality of a Skill Gem." },

  // ── Upgrade rarity ──────────────────────────────────────────────────────
  { name: "Orb of Transmutation",         family: "transmutation", tier: "base",    appliesTo: ["normal"], effect: "Upgrades a Normal item to a Magic item with 1 modifier." },
  { name: "Greater Orb of Transmutation", family: "transmutation", tier: "greater", appliesTo: ["normal"], modLevelMin: 55, effect: "Upgrades a Normal item to a Magic item with 1 modifier (min mod level 55)." },
  { name: "Perfect Orb of Transmutation", family: "transmutation", tier: "perfect", appliesTo: ["normal"], modLevelMin: 70, effect: "Upgrades a Normal item to a Magic item with 1 modifier (min mod level 70)." },
  { name: "Orb of Augmentation",         family: "augmentation",   tier: "base",    appliesTo: ["magic"], requiresOpenSlot: true, effect: "Augments a Magic item with a new random modifier (must have an open affix slot — magic items have 2 slot max)." },
  { name: "Greater Orb of Augmentation", family: "augmentation",   tier: "greater", appliesTo: ["magic"], modLevelMin: 55, requiresOpenSlot: true, effect: "Augments a Magic item with a new modifier (min mod level 55)." },
  { name: "Perfect Orb of Augmentation", family: "augmentation",   tier: "perfect", appliesTo: ["magic"], modLevelMin: 70, requiresOpenSlot: true, effect: "Augments a Magic item with a new modifier (min mod level 70)." },
  { name: "Regal Orb",          family: "regal",   tier: "base",    appliesTo: ["magic"], effect: "Upgrades a Magic item to a Rare item, adding 1 modifier." },
  { name: "Greater Regal Orb",  family: "regal",   tier: "greater", appliesTo: ["magic"], modLevelMin: 35, effect: "Upgrades a Magic item to a Rare item, adding 1 modifier (min mod level 35)." },
  { name: "Perfect Regal Orb",  family: "regal",   tier: "perfect", appliesTo: ["magic"], modLevelMin: 50, effect: "Upgrades a Magic item to a Rare item, adding 1 modifier (min mod level 50)." },
  { name: "Orb of Alchemy",     family: "alchemy", tier: "base",    appliesTo: ["normal"], effect: "Upgrades a Normal item directly to a Rare item with 4 random modifiers (no guaranteed mod — for that use Transmute → Essence)." },
  { name: "Orb of Chance",      family: "chance",  appliesTo: ["normal"], effect: "Unpredictably either upgrades a Normal item to a Unique of the same item class, or destroys it." },

  // ── Add modifier to rare ────────────────────────────────────────────────
  { name: "Exalted Orb",         family: "exalted", tier: "base",    appliesTo: ["rare"], requiresOpenSlot: true, effect: "Adds 1 new random modifier to a Rare item (must have an open affix slot — 6 slot max)." },
  { name: "Greater Exalted Orb", family: "exalted", tier: "greater", appliesTo: ["rare"], modLevelMin: 35, requiresOpenSlot: true, effect: "Adds 1 new modifier (min mod level 35) to a Rare item with an open slot." },
  { name: "Perfect Exalted Orb", family: "exalted", tier: "perfect", appliesTo: ["rare"], modLevelMin: 50, requiresOpenSlot: true, effect: "Adds 1 new modifier (min mod level 50) to a Rare item with an open slot." },

  // ── Reroll modifiers ────────────────────────────────────────────────────
  { name: "Chaos Orb",         family: "chaos", tier: "base",    appliesTo: ["rare"], effect: "Removes a random modifier from a Rare item AND augments it with a new random modifier (net change: 0 affixes; 1 swapped)." },
  { name: "Greater Chaos Orb", family: "chaos", tier: "greater", appliesTo: ["rare"], modLevelMin: 35, effect: "Removes a random modifier and augments with a new one (min mod level 35)." },
  { name: "Perfect Chaos Orb", family: "chaos", tier: "perfect", appliesTo: ["rare"], modLevelMin: 50, effect: "Removes a random modifier and augments with a new one (min mod level 50)." },
  { name: "Orb of Annulment",  family: "annul", appliesTo: ["magic","rare"], effect: "Removes a random modifier from a Magic or Rare item, without affecting rarity." },
  { name: "Divine Orb",        family: "divine", appliesTo: ["magic","rare","unique"], effect: "Randomises the NUMERIC values of existing modifiers (does NOT add or remove mods)." },

  // ── Corruption / fracture / mirror / lock ────────────────────────────────
  { name: "Vaal Orb",         family: "vaal",       appliesTo: ["magic","rare","unique"], effect: "Modifies an item unpredictably AND Corrupts it (item can no longer be modified by regular currencies)." },
  { name: "Fracturing Orb",   family: "fracture",   appliesTo: ["rare"], effect: "Fractures (locks in place) a random modifier on a Rare item with at least 4 modifiers. Fractured mods cannot be removed.", notes: "Item must already have 4+ affixes." },
  { name: "Mirror of Kalandra", family: "mirror",   appliesTo: ["magic","rare","unique"], effect: "Creates a Mirrored copy of an item." },
  { name: "Hinekora's Lock",  family: "lock",       appliesTo: ["magic","rare"], effect: "Allows an item to FORESEE the result of the next currency item used on it. Modifying the item in any way removes the ability to foresee. This is PoE2's preview-before-commit mechanism — there is no Omen of Crystallisation." },

  // ── Skill gem sockets ───────────────────────────────────────────────────
  { name: "Lesser Jeweller's Orb",  family: "jeweller", tier: "lesser",  appliesTo: ["magic","rare","unique"], effect: "Sets a Skill Gem to have 3 Support Gem Sockets." },
  { name: "Greater Jeweller's Orb", family: "jeweller", tier: "greater", appliesTo: ["magic","rare","unique"], effect: "Sets a Skill Gem to have 4 Support Gem Sockets." },
  { name: "Perfect Jeweller's Orb", family: "jeweller", tier: "perfect", appliesTo: ["magic","rare","unique"], effect: "Sets a Skill Gem to have 5 Support Gem Sockets." },
  { name: "Artificer's Orb",        family: "artificer", appliesTo: ["normal","magic","rare"], effect: "Adds an Augment Socket to a Martial Weapon, wand, staff or Armour." },
];

/** Quick lookup by exact name. */
export const CURRENCY_BY_NAME: Record<string, CurrencyDef> = Object.fromEntries(CURRENCIES.map((c) => [c.name, c]));

// ─── OMENS ────────────────────────────────────────────────────────────────
export interface OmenDef {
  name: string;
  /** Which currency this omen modifies. Empty string = passive/non-currency. */
  modifies: string;
  effect: string;
}

export const OMENS: OmenDef[] = [
  // Chaos modifiers
  { name: "Omen of Sinistral Erasure",    modifies: "Chaos Orb",    effect: "Next Chaos Orb removes only PREFIX modifiers (use to keep prefixes from being lost when targeting suffix rerolls)." },
  { name: "Omen of Dextral Erasure",      modifies: "Chaos Orb",    effect: "Next Chaos Orb removes only SUFFIX modifiers." },
  { name: "Omen of Whittling",            modifies: "Chaos Orb",    effect: "Next Chaos Orb removes the LOWEST-level modifier (deterministic, not random)." },
  // Alchemy modifiers
  { name: "Omen of Sinistral Alchemy",    modifies: "Orb of Alchemy", effect: "Next Orb of Alchemy results in the MAXIMUM number of prefix modifiers." },
  { name: "Omen of Dextral Alchemy",      modifies: "Orb of Alchemy", effect: "Next Orb of Alchemy results in the MAXIMUM number of suffix modifiers." },
  // Regal modifiers
  { name: "Omen of Sinistral Coronation", modifies: "Regal Orb",    effect: "Next Regal Orb adds only a PREFIX modifier." },
  { name: "Omen of Dextral Coronation",   modifies: "Regal Orb",    effect: "Next Regal Orb adds only a SUFFIX modifier." },
  { name: "Omen of Homogenising Coronation", modifies: "Regal Orb", effect: "Next Regal Orb adds a modifier of the SAME TYPE as one already on the item." },
  // Exalt modifiers
  { name: "Omen of Greater Exaltation",   modifies: "Exalted Orb",  effect: "Next Exalted Orb adds TWO random modifiers." },
  { name: "Omen of Sinistral Exaltation", modifies: "Exalted Orb",  effect: "Next Exalted Orb adds only a PREFIX." },
  { name: "Omen of Dextral Exaltation",   modifies: "Exalted Orb",  effect: "Next Exalted Orb adds only a SUFFIX." },
  { name: "Omen of Homogenising Exaltation", modifies: "Exalted Orb", effect: "Next Exalted Orb adds a modifier of the SAME TYPE as one already on the item." },
  { name: "Omen of Catalysing Exaltation", modifies: "Exalted Orb", effect: "Next Exalted Orb consumes all Catalyst quality on the item to bias the new modifier toward the catalysed type." },
  // Annul modifiers
  { name: "Omen of Greater Annulment",    modifies: "Orb of Annulment", effect: "Next Orb of Annulment removes TWO modifiers." },
  { name: "Omen of Sinistral Annulment",  modifies: "Orb of Annulment", effect: "Next Orb of Annulment removes only a PREFIX." },
  { name: "Omen of Dextral Annulment",    modifies: "Orb of Annulment", effect: "Next Orb of Annulment removes only a SUFFIX." },
  // Perfect Essence modifiers — replaces the fabricated "Omen of Crystallisation"!
  { name: "Omen of Sinistral Crystallisation", modifies: "Perfect Essence", effect: "Next Perfect or Corrupted Essence removes only a PREFIX (controlling which mod the essence replaces)." },
  { name: "Omen of Dextral Crystallisation",   modifies: "Perfect Essence", effect: "Next Perfect or Corrupted Essence removes only a SUFFIX." },
  // Divine modifiers
  { name: "Omen of the Blessed",          modifies: "Divine Orb",   effect: "Next Divine Orb will only reroll IMPLICIT modifiers." },
  { name: "Omen of Sanctification",       modifies: "Divine Orb",   effect: "Next Divine Orb used on a Rare item will Sanctify it." },
  // Chance modifiers
  { name: "Omen of Chance",               modifies: "Orb of Chance", effect: "Next Orb of Chance will NOT destroy the item." },
  { name: "Omen of the Ancients",         modifies: "Orb of Chance", effect: "Next Orb of Chance upgrades the item to a random Unique of the same item class." },
  // Vaal modifier
  { name: "Omen of Corruption",           modifies: "Vaal Orb",     effect: "Next Vaal Orb will always result in a CHANGE (no no-op outcomes)." },
  // Desecration (Abyss) modifiers
  { name: "Omen of the Sovereign",        modifies: "Desecration",  effect: "Next Weapon/Jewellery Desecration guarantees a random Ulaman modifier." },
  { name: "Omen of the Liege",            modifies: "Desecration",  effect: "Next Weapon/Jewellery Desecration guarantees a random Amanamu modifier." },
  { name: "Omen of the Blackblooded",     modifies: "Desecration",  effect: "Next Weapon/Jewellery Desecration guarantees a random Kurgal modifier." },
  { name: "Omen of Putrefaction",         modifies: "Desecration",  effect: "Next Desecration replaces all modifiers with up to 6 Desecrated affixes and Corrupts the item." },
  { name: "Omen of Light",                modifies: "Orb of Annulment", effect: "Next Orb of Annulment removes only DESECRATED modifiers." },
  { name: "Omen of Sinistral Necromancy", modifies: "Desecration",  effect: "Next Desecration roll grants only a PREFIX." },
  { name: "Omen of Dextral Necromancy",   modifies: "Desecration",  effect: "Next Desecration roll grants only a SUFFIX." },
  { name: "Omen of Abyssal Echoes",       modifies: "Desecration",  effect: "Next Desecration reveal allows one REROLL of the options." },
];

export const OMEN_BY_NAME: Record<string, OmenDef> = Object.fromEntries(OMENS.map((o) => [o.name, o]));

// ─── ESSENCE RARITY REQUIREMENTS (single source of truth) ─────────────────
// CRITICAL fix from poe2db: non-Perfect essences require MAGIC items, not white.
// Perfect essences require RARE items (they REPLACE a random affix with the guaranteed mod).
export const ESSENCE_RARITY_RULES = {
  /** Lesser, base, Greater all require MAGIC. They upgrade Magic → Rare with the guaranteed mod. */
  nonPerfect: ["magic"] as ItemRarity[],
  /** Perfect essences require RARE. They REMOVE a random affix and add the guaranteed mod in its place. */
  perfect: ["rare"] as ItemRarity[],
};
