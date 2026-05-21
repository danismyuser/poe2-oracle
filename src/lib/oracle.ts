import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

if (!process.env.CLAUDE_API_KEY) {
  throw new Error("CLAUDE_API_KEY is not set. Add it to .env.local before starting the server.");
}

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// Load both docs once at module init — these are injected on every Oracle call.
// Without them the Oracle is a generic chatbot and the product premise breaks.
const docsDir = path.join(process.cwd(), "docs");
const INSTRUCTIONS = fs.readFileSync(path.join(docsDir, "instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(docsDir, "data-sources.md"), "utf-8");

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. You must follow the rules in these two documents exactly and completely.

# instructions.md
${INSTRUCTIONS}

# data-sources.md
${DATA_SOURCES}

Formatting rules:
- Lead with the answer, never with preamble or meta-commentary.
- Use the route-comparison and budget-variant structure from instructions.md sections 6–7 on every craft request.
- Currency names must be exact: Greater Chaos Orb, Perfect Exalted Orb, Omen of Sinistral Erasure, etc. — never abbreviated.
- Cite the data source (craftofexile.com, poe2db, official trade) when a number comes from a live fetch.
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
