"use client";
import { getBudgetStyle } from "@/lib/budget-styles";
import type { AffixSlot } from "@/types/craft";

interface Props {
  itemClass: string;
  base: string;
  ilvl: number;
  budget: string;
  prefixes: AffixSlot[];
  suffixes: AffixSlot[];
}

export default function ItemPreview({ itemClass, base, ilvl, budget, prefixes, suffixes }: Props) {
  const filledPrefixes = prefixes.filter((p) => p.name);
  const filledSuffixes = suffixes.filter((s) => s.name);
  const budgetStyle = getBudgetStyle(budget);

  return (
    <div
      style={{
        background: "var(--bg-subtle)",
        border: "1px solid var(--border-mid)",
        borderRadius: 10,
        padding: "1.1rem 1.25rem",
        minHeight: 180,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Budget-coloured top accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 2,
        background: budgetStyle.color,
        opacity: 0.6,
      }} />

      {/* Item name + class row */}
      <div className="flex justify-between items-start mb-3" style={{ paddingTop: "0.35rem" }}>
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
              color: budgetStyle.color,
              lineHeight: 1.2,
            }}
          >
            {base || "— select a base —"}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 2 }}>
            {itemClass}
            <span style={{ margin: "0 5px", opacity: 0.4 }}>·</span>
            iLvl {ilvl}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: budgetStyle.color,
            background: budgetStyle.bg,
            border: `1px solid ${budgetStyle.border}`,
            borderRadius: 5,
            padding: "0.15rem 0.6rem",
          }}
        >
          {budgetStyle.label}
        </span>
      </div>

      <div style={{ borderTop: "1px solid var(--border-light)", marginBottom: "0.75rem" }} />

      {/* Affixes */}
      {(filledPrefixes.length > 0 || filledSuffixes.length > 0) ? (
        <div className="flex flex-col gap-1.5">
          {filledPrefixes.map((p, i) => (
            <div key={i} className="flex justify-between items-center">
              <span style={{ fontSize: "0.82rem", color: "var(--blue-light)" }}>{p.name}</span>
              {p.tier && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-tertiary)",
                    background: "var(--blue-bg)",
                    border: "1px solid var(--border-blue)",
                    borderRadius: 3,
                    padding: "0.05rem 0.4rem",
                  }}
                >
                  {p.tier}
                </span>
              )}
            </div>
          ))}

          {filledPrefixes.length > 0 && filledSuffixes.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.25rem 0" }} />
          )}

          {filledSuffixes.map((s, i) => (
            <div key={i} className="flex justify-between items-center">
              <span style={{ fontSize: "0.82rem", color: "var(--gold)" }}>{s.name}</span>
              {s.tier && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--text-tertiary)",
                    background: "var(--gold-bg)",
                    border: "1px solid var(--border-gold)",
                    borderRadius: 3,
                    padding: "0.05rem 0.4rem",
                  }}
                >
                  {s.tier}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--text-tertiary)", fontSize: "0.83rem", fontStyle: "italic" }}>
          Select affixes to preview your item
        </p>
      )}

      {/* Footer count */}
      <div
        className="flex gap-4"
        style={{ marginTop: "0.9rem", paddingTop: "0.65rem", borderTop: "1px solid var(--border-light)" }}
      >
        <span style={{ fontSize: "0.72rem", color: "var(--blue-light)" }}>
          {filledPrefixes.length}<span style={{ opacity: 0.4 }}>/3</span> prefixes
        </span>
        <span style={{ fontSize: "0.72rem", color: "var(--gold)" }}>
          {filledSuffixes.length}<span style={{ opacity: 0.4 }}>/3</span> suffixes
        </span>
      </div>
    </div>
  );
}
