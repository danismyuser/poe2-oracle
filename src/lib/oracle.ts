import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { buildBasesPromptSection } from "@/lib/bases-prompt";
import { buildModsPromptSection } from "@/lib/mods-prompt";
import { buildEssencesPromptSection } from "@/lib/essences-prompt";
import { buildCurrencyPromptSection } from "@/lib/currency-prompt";
import { buildKnownCraftsPromptSection } from "@/lib/known-crafts-prompt";

if (!process.env.CLAUDE_API_KEY) {
  throw new Error("CLAUDE_API_KEY is not set. Add it to .env.local before starting the server.");
}

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// Load both docs once at module init — these are injected on every Oracle call.
// Without them the Oracle is a generic chatbot and the product premise breaks.
const docsDir = path.join(process.cwd(), "docs");
const INSTRUCTIONS = fs.readFileSync(path.join(docsDir, "instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(docsDir, "data-sources.md"), "utf-8");

// Authoritative lookups, computed once. Injected near the top of the system
// prompt so they have top-of-context salience. Stops the Oracle from
// hallucinating base names (e.g. "Crude Crossbow") or paraphrasing mod names
// (e.g. "% Phys Damage" instead of "#% increased Physical Damage").
// Both are large (~17K tokens combined) but Anthropic prompt caching makes
// them essentially free after the first call in a 5-minute window.
const BASES_SECTION = buildBasesPromptSection();
const MODS_SECTION = buildModsPromptSection();
const ESSENCES_SECTION = buildEssencesPromptSection();
const CURRENCY_SECTION = buildCurrencyPromptSection();
// User-curated verified crafts (docs/known-good-crafts/*.md). Highest-priority
// section — if a user's question matches one of these, the Oracle should base
// its recommendation on the example's pattern rather than reasoning from rules.
const KNOWN_CRAFTS_SECTION = buildKnownCraftsPromptSection();

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. You must follow the rules in these two documents exactly and completely.

${KNOWN_CRAFTS_SECTION}

${BASES_SECTION}

${MODS_SECTION}

${ESSENCES_SECTION}

${CURRENCY_SECTION}

# instructions.md
${INSTRUCTIONS}

# data-sources.md
${DATA_SOURCES}

CRITICAL RULES — these override everything else:
- THIS IS PATH OF EXILE 2, NOT PATH OF EXILE 1. Every mod pool, currency, base item, and crafting mechanic you reference must be PoE2-specific. PoE1 items, mods, and mechanics do not exist in this game and must never appear in your answers.
- When recommending a base item, you MUST pick a name from the "Authoritative PoE2 Base Items" list at the top of this prompt. Hallucinating a base (e.g. "Crude Crossbow", "Sadist Garb") is a hard violation.
- When referencing Craft of Exile data, the URL is always https://www.craftofexile.com/?game=poe2 — the ?game=poe2 parameter is mandatory. Without it the site shows PoE1 data. Never cite or reference craftofexile.com without this parameter.
- Mod pools are strictly scoped to the item type selected. Never suggest a mod that cannot legally roll on the chosen base in PoE2.
- Currency names must be exact PoE2 names: Greater Chaos Orb, Perfect Exalted Orb, Omen of Sinistral Erasure, Ancient Jawbone, Hinekora's Lock, Essence of Abrasion, etc. PoE1 currency names (Chaos Orb, Exalted Orb, Orb of Scouring) do not exist in PoE2.

Formatting rules:
- Lead with the answer, never with preamble or meta-commentary.
- Use the route-comparison and budget-variant structure from instructions.md sections 6–7 on every craft request.
- Cite the data source (craftofexile.com/?game=poe2, poe2db.tw, official trade) when a number comes from a live fetch.
- End every response that used cached knowledge with a brief footer noting the patch version (0.4) and offering a re-fetch.`;

export async function askOracle(userPrompt: string): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("\n");

  return text;
}
