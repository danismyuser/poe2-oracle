import type { Recipe } from "@/types/craft";

/**
 * Extracts the fenced ```recipe JSON block out of an Oracle response and
 * returns it parsed, alongside the response markdown with the block stripped
 * (so it doesn't appear as a literal code block in the rendered output).
 *
 * The Oracle is instructed in `docs/instructions.md` to emit this block at
 * the end of every craft response. Free-form / mechanic-comparison answers
 * may legitimately omit it — in which case `recipe` is null and `markdown`
 * is the unmodified response.
 */
export interface ParsedResponse {
  markdown: string;
  recipe: Recipe | null;
  parseError: string | null;
}

// Match ```recipe ... ``` (case-insensitive, multiline). The leading newline
// before the fence is optional so we tolerate either spacing.
const RECIPE_FENCE_RE = /\n?```recipe\s*\n([\s\S]*?)\n```\s*$/im;

export function parseOracleResponse(raw: string): ParsedResponse {
  const match = raw.match(RECIPE_FENCE_RE);
  if (!match) {
    return { markdown: raw, recipe: null, parseError: null };
  }

  const markdown = raw.replace(RECIPE_FENCE_RE, "").trimEnd();
  try {
    const recipe = JSON.parse(match[1]) as Recipe;
    // Light validation — the URL builder degrades gracefully on missing fields,
    // but we want to reject obviously malformed JSON early so the UI doesn't
    // render a broken Verify button.
    if (!recipe || typeof recipe !== "object" || !recipe.base || !recipe.itemClass) {
      return { markdown, recipe: null, parseError: "Recipe block missing required fields (base, itemClass)" };
    }
    return { markdown, recipe, parseError: null };
  } catch (err) {
    return { markdown, recipe: null, parseError: `Recipe JSON parse failed: ${String(err)}` };
  }
}
