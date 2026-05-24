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

// Same prompt construction as src/lib/oracle.ts.
// Keep this in sync — validation only catches regressions if it sees the
// same system prompt production does.
const docsDir = path.join(projectRoot, "docs");
const INSTRUCTIONS = fs.readFileSync(path.join(docsDir, "instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(docsDir, "data-sources.md"), "utf-8");

// Parse POE2_BASES_GROUPED out of the auto-generated coe-lookup.ts and
// MOD_DATA out of mod-weights.ts so we build the same authoritative sections
// that src/lib/bases-prompt.ts and src/lib/mods-prompt.ts build.
const lookupTs = fs.readFileSync(path.join(projectRoot, "src/lib/coe-lookup.ts"), "utf-8");
const basesMatch = lookupTs.match(/export const POE2_BASES_GROUPED[^=]*=\s*(\{[\s\S]*?\});\s*\n/);
const POE2_BASES_GROUPED = basesMatch ? JSON.parse(basesMatch[1]) : {};

const weightsTs = fs.readFileSync(path.join(projectRoot, "src/lib/mod-weights.ts"), "utf-8");
const modDataMatch = weightsTs.match(/export const MOD_DATA[^=]*=\s*(\{[\s\S]*?\});\s*\n\/\*\*/);
const MOD_DATA = modDataMatch ? JSON.parse(modDataMatch[1]) : {};

const essAppMatch = lookupTs.match(/export const COE_ESSENCE_APPLICABILITY[^=]*=\s*(\{[\s\S]*?\});\s*$/m);
const COE_ESSENCE_APPLICABILITY = essAppMatch ? JSON.parse(essAppMatch[1]) : {};

function buildEssencesSection(app) {
  const names = Object.keys(app).sort();
  let body = "";
  for (const n of names) {
    const a = app[n];
    if (!a || !a.categories?.length) continue;
    body += `- **${n}** → applies to: ${a.categories.join(", ")}\n`;
  }
  return `## Essence Applicability — which essences can target which bases

Each PoE2 essence rolls its guaranteed mod on a specific subset of item types only. Recommending an essence on a base it cannot apply to is a hard accuracy failure (real reported bug: "Essence of Electricity on a Visceral Quiver" — Electricity only rolls on weapons, never quivers).

When you write a recipe with \`primaryMethod: "essence"\`, you MUST verify the \`essence\` is valid for the base. Use this table:

${body.trim()}

If an essence isn't applicable to the user's base, EITHER pick a different essence that IS, OR switch to chaos / exalted / regal. NEVER recommend an essence on an incompatible base.
`;
}

function buildModsSection(modData) {
  const bases = Object.keys(modData).sort();
  let total = 0;
  let body = "";
  for (const base of bases) {
    const prefixes = Object.keys(modData[base].PREFIX ?? {}).sort();
    const suffixes = Object.keys(modData[base].SUFFIX ?? {}).sort();
    if (!prefixes.length && !suffixes.length) continue;
    total += prefixes.length + suffixes.length;
    body += `### ${base}\n`;
    if (prefixes.length) body += `**Prefixes (${prefixes.length}):** ${prefixes.join(", ")}\n`;
    if (suffixes.length) body += `**Suffixes (${suffixes.length}):** ${suffixes.join(", ")}\n`;
    body += "\n";
  }
  return `## Authoritative PoE2 Mod Names — use ONLY these in recipe targetAffixes

When you populate a recipe block's \`targetAffixes\` array, the \`name\` field of each affix MUST be selected verbatim from the list below. These are the canonical mod names from the community-maintained PoE2 mod-weights spreadsheet. The app looks them up to build CoE's \`req=\` URL parameter — every paraphrase costs one manual click for the user in CoE.

**DO NOT paraphrase mod names.** Common failure modes to avoid:
- ❌ \`"% Phys Damage"\` → ✅ \`"#% increased Physical Damage"\`
- ❌ \`"Flat Phys"\` → ✅ \`"Adds # to # Physical Damage"\`
- ❌ \`"Crit Multi"\` → ✅ \`"+#% to Critical Damage Bonus"\`
- ❌ \`"Fire Res"\` → ✅ \`"#% to Fire Resistance"\`

\`#\` is a literal placeholder for numeric ranges — do NOT substitute actual numbers.

There are ${total} mods across ${bases.length} base categories. Mods must be valid for the chosen base.

${body.trim()}
`;
}

function buildBasesSection(grouped) {
  const cats = Object.keys(grouped).sort();
  let total = 0;
  let body = "";
  for (const cat of cats) {
    const list = grouped[cat];
    if (!list.length) continue;
    total += list.length;
    body += `### ${cat} (${list.length})\n${list.join(", ")}\n\n`;
  }
  return `## Authoritative PoE2 Base Items — use ONLY names from this list

When you recommend a specific base in any craft response, you MUST pick from the lists below. These names are sourced from craftofexile.com/?game=poe2 (the authoritative community source) and represent every base that legally exists in patch 0.4.

**DO NOT invent base names.** Common failure modes to avoid:
- "Crude Crossbow" — does NOT exist. Real PoE2 crossbows include Makeshift Crossbow, Tense Crossbow, Sturdy Crossbow.
- "Sadist Garb" — does NOT exist. Real PoE2 INT body armours include Tattered Robe, Silk Robe, Imperial Robe.
- Any PoE1 name like "Spine Bow", "Vaal Regalia", "Astral Plate" — do NOT use these.

If the user asks about a base you don't recognize, pick the closest valid base from the list below and explain the substitution. NEVER fabricate.

There are ${total} valid bases across ${cats.length} categories:

${body.trim()}
`;
}

const BASES_SECTION = buildBasesSection(POE2_BASES_GROUPED);
const MODS_SECTION = buildModsSection(MOD_DATA);
const ESSENCES_SECTION = buildEssencesSection(COE_ESSENCE_APPLICABILITY);

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. You must follow the rules in these two documents exactly and completely.

${BASES_SECTION}

${MODS_SECTION}

${ESSENCES_SECTION}

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
  {
    id: "T6-crossbow-hallucination-guard",
    title: "Crossbow craft — guards against 'Crude Crossbow' hallucination",
    prompt: "How do I craft a mid-tier elemental damage crossbow?",
  },
  {
    id: "T7-quiver-essence-mismatch",
    title: "Quiver craft — guards against essence/base mismatch + Perfect-on-white",
    prompt: "How do I craft a Visceral Quiver for a lightning bow build, mid-tier budget?",
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
  console.log(`Running ${TEST_PROMPTS.length} validation prompts against the live Oracle…\n`);

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
