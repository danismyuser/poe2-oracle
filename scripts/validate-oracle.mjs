// Phase-8 Oracle validation script.
// Runs the 5 canonical test prompts from docs/build-plan.md against askOracle
// and writes the responses to docs/validation-report.md for manual scoring.
//
// Usage: node scripts/validate-oracle.mjs
// Requires CLAUDE_API_KEY in .env.local.

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Load .env.local manually so we don't depend on dotenv
const envFile = path.join(projectRoot, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

if (!process.env.CLAUDE_API_KEY) {
  console.error("CLAUDE_API_KEY missing. Add it to .env.local.");
  process.exit(1);
}

// Same prompt construction as src/lib/oracle.ts
const docsDir = path.join(projectRoot, "docs");
const INSTRUCTIONS = fs.readFileSync(path.join(docsDir, "instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(docsDir, "data-sources.md"), "utf-8");

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. You must follow the rules in these two documents exactly and completely.

# instructions.md
${INSTRUCTIONS}

# data-sources.md
${DATA_SOURCES}

CRITICAL RULES — these override everything else:
- THIS IS PATH OF EXILE 2, NOT PATH OF EXILE 1. Every mod pool, currency, base item, and crafting mechanic you reference must be PoE2-specific. PoE1 items, mods, and mechanics do not exist in this game and must never appear in your answers.
- When referencing Craft of Exile data, the URL is always https://www.craftofexile.com/?game=poe2 — the ?game=poe2 parameter is mandatory. Without it the site shows PoE1 data. Never cite or reference craftofexile.com without this parameter.
- Mod pools are strictly scoped to the item type selected. Never suggest a mod that cannot legally roll on the chosen base in PoE2.
- Currency names must be exact PoE2 names: Greater Chaos Orb, Perfect Exalted Orb, Omen of Sinistral Erasure, Ancient Jawbone, Hinekora's Lock, Essence of Abrasion, etc. PoE1 currency names (Chaos Orb, Exalted Orb, Orb of Scouring) do not exist in PoE2.

Formatting rules:
- Lead with the answer, never with preamble or meta-commentary.
- Use the route-comparison and budget-variant structure from instructions.md sections 6–7 on every craft request.
- Cite the data source (craftofexile.com/?game=poe2, poe2db.tw, official trade) when a number comes from a live fetch.
- End every response that used cached knowledge with a brief footer noting the patch version (0.4) and offering a re-fetch.`;

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

const TEST_PROMPTS = [
  {
    id: "T1-free-form-bow",
    title: "Free-form: mid-tier physical bow",
    prompt: "How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?",
  },
  {
    id: "T2-energy-shield-armour",
    title: "Different item class: max ES on Sadist Garb",
    prompt: "Best deterministic route to max ES on Sadist Garb.",
  },
  {
    id: "T3-resistance-amulet",
    title: "Jewellery: mid-tier resistance amulet",
    prompt: "Mid-tier resistance amulet route.",
  },
  {
    id: "T4-mechanic-comparison",
    title: "Niche mechanic comparison: Ancient Jawbone vs Omen of the Liege",
    prompt: "When should I use Ancient Jawbone vs Omen of the Liege?",
  },
  {
    id: "T5-refresh-currency-price",
    title: "Refresh trigger: current price of Perfect Exalted Orb",
    prompt: "Refresh — what's the current price of a Perfect Exalted Orb?",
  },
];

async function ask(prompt) {
  const msg = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

async function main() {
  console.log("Running 5 validation prompts against the live Oracle…\n");

  const results = [];
  for (const test of TEST_PROMPTS) {
    const startedAt = Date.now();
    process.stdout.write(`  ${test.id} — ${test.title} … `);
    try {
      const response = await ask(test.prompt);
      const ms = Date.now() - startedAt;
      console.log(`ok (${ms}ms, ${response.length} chars)`);
      results.push({ ...test, response, ms, error: null });
    } catch (err) {
      console.log(`FAILED: ${err}`);
      results.push({ ...test, response: "", ms: 0, error: String(err) });
    }
  }

  // Write report
  const rubric = [
    "Patch version stated explicitly (0.4)",
    "Affixes valid for the item type (no impossible mods)",
    "Multiple routes compared, not just one",
    "Three budget variants present (league-start / mid / high)",
    "Currency names exact (Greater Chaos Orb, Perfect Exalted Orb — never PoE1 names)",
    "Route-engine + budget-variant structure from instructions.md sections 6–7",
    "Cited data source when quoting a number (or noted cached knowledge)",
  ];

  let report = `# Oracle Validation Report\n\n`;
  report += `**Run:** ${new Date().toISOString()}\n`;
  report += `**Model:** claude-sonnet-4-5\n`;
  report += `**Prompts:** ${TEST_PROMPTS.length}\n\n`;
  report += `## How to use this report\n\nFor each test below, read the Oracle's response and tick the rubric checkboxes that hold. The summary table at the top of each section reflects manual scoring. Failures here are signals to patch \`docs/instructions.md\` — not the code.\n\n`;
  report += `---\n\n`;

  for (const r of results) {
    report += `## ${r.id} — ${r.title}\n\n`;
    report += `**Prompt:** ${r.prompt}\n\n`;
    if (r.error) {
      report += `> ⚠️ Request failed: \`${r.error}\`\n\n`;
      report += `---\n\n`;
      continue;
    }
    report += `**Latency:** ${r.ms}ms · **Response length:** ${r.response.length} chars\n\n`;
    report += `### Rubric (tick after reading the response)\n\n`;
    for (const item of rubric) report += `- [ ] ${item}\n`;
    report += `\n### Response\n\n\`\`\`markdown\n${r.response}\n\`\`\`\n\n`;
    report += `---\n\n`;
  }

  const out = path.join(docsDir, "validation-report.md");
  fs.writeFileSync(out, report, "utf-8");
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
