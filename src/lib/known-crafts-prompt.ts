import fs from "fs";
import path from "path";

/**
 * Few-shot learning for the Oracle: load every `.md` file from
 * `docs/known-good-crafts/` and inject them as worked examples in the
 * system prompt. Each file is treated as ground truth — a craft the user
 * has verified works in-game.
 *
 * Rules-in-prose only get you so far. Concrete worked examples teach the
 * Oracle the correct patterns (currency ordering, state transitions, real
 * cost numbers, when to use omens, how to recover from bad rolls). The
 * Oracle adapts the pattern to new questions rather than reinventing
 * crafting logic from training data.
 *
 * Adding a new example: drop a markdown file in docs/known-good-crafts/.
 * The next deploy picks it up automatically — no code changes needed.
 *
 * Files starting with "TEMPLATE" or "_" are ignored (treated as drafts /
 * documentation).
 */
export function buildKnownCraftsPromptSection(): string {
  const dir = path.join(process.cwd(), "docs", "known-good-crafts");
  if (!fs.existsSync(dir)) {
    return ""; // No directory yet — produce no section, nothing injected.
  }

  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !f.startsWith("TEMPLATE") && !f.startsWith("_"))
    .sort();

  if (files.length === 0) {
    return "";
  }

  const examples: string[] = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf-8").trim();
    examples.push(`### Example: ${file.replace(/\.md$/, "").replace(/^\d+-/, "").replace(/-/g, " ")}\n\n${content}`);
  }

  return `## Known-Good Crafts — verified worked examples

The crafts below have been VERIFIED IN-GAME by the user. They represent the canonical, correct way to craft these item types. When the user asks about a similar craft (same item class, similar target affixes, comparable budget), STRONGLY PREFER the patterns shown here over reasoning from first principles.

Key things to learn from each example:
- The exact ORDER of currency applications (which state the item is in at each step)
- Which specific essences/omens are used and WHY
- Realistic cost estimates per step
- How the recipe handles failure (e.g. "if step 4 doesn't yield X, do Y")
- The canonical mod names used in the target list

When recommending a craft to a user:
- If their question matches one of these examples closely, BASE your recommendation on the matching example's pattern
- If only partially matching, adapt the closest example to the differences (e.g. swap essence type for a different damage type, scale budget down for league-start)
- If no example covers their question, fall back to the general rules from the other sections — but flag the answer as "no verified example for this exact craft" so the user knows it's less certain

There are ${files.length} verified example${files.length === 1 ? "" : "s"} below.

${examples.join("\n\n---\n\n")}
`;
}
