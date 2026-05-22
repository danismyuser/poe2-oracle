"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import VerifyInCoE from "@/components/VerifyInCoE";
import { parseOracleResponse } from "@/lib/recipe-parser";

interface Props {
  /** Raw Oracle response text — may include a trailing ```recipe block. */
  content: string;
}

/**
 * Unified renderer for any Oracle response. Extracts the structured recipe
 * block (if present), shows the "Verify in Craft of Exile" button above
 * the markdown, and renders the cleaned markdown below.
 *
 * Used in AskTab, SimulateTab, SavedTab, and the admin view — same UX
 * everywhere a response is shown.
 */
export default function OracleResponse({ content }: Props) {
  const { markdown, recipe } = parseOracleResponse(content);

  return (
    <>
      {recipe && <VerifyInCoE recipe={recipe} />}
      <MarkdownRenderer content={markdown} />
    </>
  );
}
