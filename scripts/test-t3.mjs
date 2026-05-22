// One-off: re-run T3 only against the patched system prompt to confirm
// the new "recipe block is MANDATORY" hard rule made the Oracle compliant.
import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const INSTRUCTIONS = fs.readFileSync(path.join(root, "docs/instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(root, "docs/data-sources.md"), "utf-8");

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. You must follow the rules in these two documents exactly and completely.

# instructions.md
${INSTRUCTIONS}

# data-sources.md
${DATA_SOURCES}

CRITICAL RULES — these override everything else:
- THIS IS PATH OF EXILE 2, NOT PATH OF EXILE 1.
- When referencing Craft of Exile data, the URL is always https://www.craftofexile.com/?game=poe2
- Mod pools are strictly scoped to the item type selected.
- Currency names must be exact PoE2 names.

Formatting rules:
- Lead with the answer.
- Use the route-comparison and budget-variant structure.
- Cite the data source.
- End every response that used cached knowledge with patch version footer.`;

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

console.log("Re-testing T3 with strengthened §12 recipe-block hard rule...");
const m = await client.messages.create({
  model: "claude-sonnet-4-5",
  max_tokens: 4096,
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: "Mid-tier resistance amulet route." }],
});
const text = m.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
const re = text.match(/```recipe\s*\n([\s\S]*?)\n```/);
if (re) {
  try {
    const r = JSON.parse(re[1]);
    console.log("\n✓ Recipe block emitted!");
    console.log(`  base=${JSON.stringify(r.base)} ilvl=${r.ilvl}`);
    console.log(`  budget=${JSON.stringify(r.budget)} method=${JSON.stringify(r.primaryMethod)}`);
    console.log(`  routeName=${JSON.stringify(r.routeName)}`);
    console.log(`  prefixes=${r.targetAffixes?.prefixes?.length ?? 0} suffixes=${r.targetAffixes?.suffixes?.length ?? 0}`);
  } catch (e) {
    console.log("\n✗ Block present but invalid JSON: " + e.message);
    console.log(re[1].slice(0, 400));
  }
} else {
  console.log("\n✗ Still no recipe block. Last 400 chars:");
  console.log(text.slice(-400));
}
