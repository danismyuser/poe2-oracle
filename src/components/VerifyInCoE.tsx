"use client";
import { useState } from "react";
import type { Recipe } from "@/types/craft";
import { buildCoeUrl } from "@/lib/coe-url";

interface Props {
  recipe: Recipe;
}

/**
 * "Verify in Craft of Exile" button — opens CoE's emulator in a new tab,
 * deep-linked to the recipe's base, item level, and primary method. Shows
 * a hover tooltip listing anything the user will need to set manually.
 */
export default function VerifyInCoE({ recipe }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const result = buildCoeUrl(recipe);

  const completenessLabel =
    result.completeness === "complete" ? `Fully pre-filled · ${result.affixesResolved}/${result.affixesRequested} affixes` :
    result.completeness === "full" ? "Base + method pre-filled" :
    result.completeness === "partial" ? "Method pre-filled · base manual" :
    "Opens in PoE2 mode";

  const completenessColor =
    result.completeness === "complete" ? "var(--green)" :
    result.completeness === "full" ? "var(--green)" :
    result.completeness === "partial" ? "var(--gold)" :
    "var(--text-tertiary)";

  return (
    <div
      style={{
        position: "relative",
        background: "var(--bg-subtle)",
        border: "1px solid var(--border-blue)",
        borderRadius: 6,
        padding: "0.85rem 1rem",
        marginBottom: "1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 240px", minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: 4,
          }}
        >
          Validate this craft
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", lineHeight: 1.4 }}>
          <strong style={{ color: "var(--blue-light)" }}>{recipe.base}</strong>
          <span style={{ color: "var(--text-tertiary)", margin: "0 0.4rem" }}>·</span>
          iLvl {recipe.ilvl}
          <span style={{ color: "var(--text-tertiary)", margin: "0 0.4rem" }}>·</span>
          {recipe.routeName}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: completenessColor,
            marginTop: 4,
          }}
        >
          ◈ {completenessLabel}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {result.missing.length > 0 && (
          <button
            type="button"
            onClick={() => setShowHelp((s) => !s)}
            className="btn-ghost"
            style={{ fontSize: "0.72rem", padding: "0.35rem 0.7rem" }}
          >
            {showHelp ? "Hide" : "Setup notes"}
          </button>
        )}
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontSize: "0.78rem", padding: "0.5rem 1.1rem" }}
        >
          🔬 Verify in Craft of Exile ↗
        </a>
      </div>

      {showHelp && result.missing.length > 0 && (
        <div
          className="animate-fade-in"
          style={{
            width: "100%",
            marginTop: 4,
            padding: "0.65rem 0.9rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            borderRadius: 4,
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            lineHeight: 1.55,
          }}
        >
          <p style={{ marginBottom: 6, color: "var(--text-tertiary)", fontFamily: "var(--font-display)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            You will need to set manually:
          </p>
          <ul style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
            {result.missing.map((m) => (
              <li key={m} style={{ marginBottom: 2 }}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
