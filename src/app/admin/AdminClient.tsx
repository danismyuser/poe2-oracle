"use client";
import { useState } from "react";
import OracleResponse from "@/components/OracleResponse";
import { getBudgetStyle } from "@/lib/budget-styles";

interface CraftRow {
  id: string;
  itemType: string;
  base: string;
  budget: string;
  question: string | null;
  response: string;
  patchVersion: string;
  createdAt: string;
  user: { email: string };
}

interface Props {
  crafts: CraftRow[];
  stats: {
    userCount: number;
    craftCount: number;
    attemptCount: number;
    craftsLast24h: number;
  };
}

export default function AdminClient({ crafts, stats }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <main className="flex-1" style={{ padding: "2rem 2.5rem", background: "var(--bg-base)" }}>
      <div className="max-w-5xl" style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Header */}
        <div>
          <p className="section-label mb-3" style={{ color: "var(--gold)" }}>
            ◈ &nbsp;Admin View · Internal Only
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            Oracle Activity
          </h1>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Users",         value: stats.userCount,     color: "var(--blue-light)" },
            { label: "Crafts (all)",  value: stats.craftCount,    color: "var(--blue-light)" },
            { label: "Crafts (24h)",  value: stats.craftsLast24h, color: "var(--gold)" },
            { label: "Attempts",      value: stats.attemptCount,  color: "var(--green)" },
          ].map(({ label, value, color }) => (
            <div key={label} className="card" style={{ padding: "1rem 1.25rem" }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: 6,
              }}>
                {label}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 700, color, lineHeight: 1 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Crafts list */}
        <div>
          <p className="section-label mb-3" style={{ color: "var(--text-tertiary)" }}>
            Recent Crafts &nbsp;·&nbsp; Showing {crafts.length}
          </p>

          {crafts.length === 0 ? (
            <div className="card" style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-tertiary)" }}>
              No crafts yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {crafts.map((craft) => {
                const budgetStyle = getBudgetStyle(craft.budget);
                const isExpanded = expandedId === craft.id;
                const summary =
                  craft.itemType === "free-form"
                    ? (craft.question?.slice(0, 80) ?? "Free-form") + "…"
                    : `${craft.base} · ${craft.itemType}`;

                return (
                  <div key={craft.id} className="card overflow-hidden" style={{ borderColor: isExpanded ? "var(--border-blue)" : undefined }}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : craft.id)}
                      className="w-full text-left flex items-center gap-3 px-4 py-3"
                      style={{
                        background: "var(--bg-subtle)",
                        borderBottom: isExpanded ? "1px solid var(--border-light)" : "none",
                      }}
                    >
                      <span style={{ color: "var(--blue-bright)", fontSize: "0.75rem", flexShrink: 0 }}>
                        {isExpanded ? "▾" : "▸"}
                      </span>
                      <span style={{
                        fontSize: "0.9rem",
                        color: "var(--text-primary)",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: 0,
                      }}>
                        {summary}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--text-tertiary)",
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-light)",
                          borderRadius: 4,
                          padding: "0.1rem 0.5rem",
                        }}>
                          {craft.user.email}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: budgetStyle.color,
                          background: budgetStyle.bg,
                          border: `1px solid ${budgetStyle.border}`,
                          borderRadius: 4,
                          padding: "0.1rem 0.5rem",
                        }}>
                          {craft.budget}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                          patch {craft.patchVersion}
                        </span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                          {new Date(craft.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 py-6 animate-fade-in">
                        {craft.question && (
                          <div style={{
                            background: "var(--blue-bg)",
                            border: "1px solid var(--border-blue)",
                            borderRadius: 6,
                            padding: "0.8rem 1rem",
                            marginBottom: "1.25rem",
                          }}>
                            <p style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--text-blue)",
                              marginBottom: 4,
                            }}>
                              Question
                            </p>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: 1.5 }}>
                              {craft.question}
                            </p>
                          </div>
                        )}
                        <OracleResponse content={craft.response} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
