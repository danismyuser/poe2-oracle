"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import VerifyInCoE from "@/components/VerifyInCoE";
import { parseOracleResponse } from "@/lib/recipe-parser";
import { validateRecipe, type RecipeIssue } from "@/lib/recipe-validate";

interface Props {
  content: string;
}

/**
 * Unified renderer for any Oracle response. Extracts the structured recipe
 * block, validates it against authoritative PoE2 data (catches Oracle
 * hallucinations like "Essence of Electricity on a Quiver"), surfaces any
 * issues as a warning banner above the markdown, and renders cleaned
 * markdown below.
 */
export default function OracleResponse({ content }: Props) {
  const { markdown, recipe } = parseOracleResponse(content);
  const validation = recipe ? validateRecipe(recipe) : null;

  return (
    <>
      {validation && validation.issues.length > 0 && <ValidationWarning issues={validation.issues} />}
      {recipe && <VerifyInCoE recipe={recipe} />}
      <MarkdownRenderer content={markdown} />
    </>
  );
}

function ValidationWarning({ issues }: { issues: RecipeIssue[] }) {
  const hasCritical = issues.some((i) => i.severity === "critical");
  const color = hasCritical ? "var(--red)" : "var(--gold)";
  const bg = hasCritical ? "var(--red-bg)" : "var(--gold-bg)";
  const border = hasCritical ? "rgba(244,112,103,0.4)" : "var(--border-gold-strong)";
  const label = hasCritical ? "Recipe Has Critical Issues" : "Recipe Has Warnings";

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 6,
        padding: "0.85rem 1rem",
        marginBottom: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color, fontSize: "1.1rem", flexShrink: 0 }}>{hasCritical ? "⚠" : "◈"}</span>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color,
            margin: 0,
          }}
        >
          {label}
        </p>
      </div>
      <ul style={{ paddingLeft: "1.4rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {issues.map((issue, i) => (
          <li key={i} style={{ marginBottom: "0.3rem" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: issue.severity === "critical" ? "var(--red)" : "var(--gold)",
              background: "var(--bg-card)",
              border: `1px solid ${issue.severity === "critical" ? "rgba(244,112,103,0.3)" : "var(--border-gold)"}`,
              borderRadius: 3,
              padding: "0.05rem 0.4rem",
              marginRight: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {issue.field}
            </span>
            <span style={{ color: "var(--text-primary)" }}>{issue.message}</span>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", margin: 0, fontStyle: "italic" }}>
        The Oracle generated this craft despite the issues above. Read the response below carefully — some steps may be impossible as written.
      </p>
    </div>
  );
}
