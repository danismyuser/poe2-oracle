"use client";
import { useState } from "react";
import AskTab from "./tabs/AskTab";
import SimulateTab from "./tabs/SimulateTab";
import SavedTab from "./tabs/SavedTab";

const TABS = ["Ask the Oracle", "Configure & Simulate", "Saved Crafts"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, string> = {
  "Ask the Oracle": "⚗",
  "Configure & Simulate": "⚙",
  "Saved Crafts": "◈",
};

export default function DashboardClient({
  userEmail,
  initialTab = "Ask the Oracle",
}: {
  userEmail: string;
  initialTab?: Tab;
}) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  return (
    <div className="flex-1 flex flex-col" style={{ background: "var(--bg-base)" }}>

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border-light)",
          paddingTop: "2rem",
        }}
      >
        <div className="container-lg">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p
                className="section-label mb-2"
                style={{ color: "var(--blue-bright)" }}
              >
                ◈ &nbsp;Oracle Chamber
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  lineHeight: 1.0,
                }}
              >
                Dashboard
              </h1>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", paddingBottom: 4 }}>
              {userEmail}
            </p>
          </div>

          {/* ── Tab bar ──────────────────────────────────────────────────────── */}
          <div className="flex gap-1" style={{ marginBottom: "-1px" }}>
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                    background: active ? "var(--bg-card)" : "transparent",
                    border: "1px solid",
                    borderColor: active ? "var(--border-blue)" : "transparent",
                    borderBottom: active ? "1px solid var(--bg-card)" : "1px solid transparent",
                    borderRadius: "8px 8px 0 0",
                    padding: "0.65rem 1.25rem",
                    cursor: "pointer",
                    transition: "color 0.15s, background 0.15s",
                    whiteSpace: "nowrap",
                    position: "relative",
                    zIndex: active ? 1 : 0,
                  }}
                >
                  <span style={{ color: active ? "var(--blue-light)" : "var(--text-tertiary)", fontSize: "0.8rem" }}>
                    {TAB_ICONS[tab]}
                  </span>
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ────────────────────────────────────────────────────── */}
      <div
        className="flex-1"
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border-blue)",
        }}
      >
        <div className="container-lg py-8 animate-fade-in">
          {activeTab === "Ask the Oracle" && <AskTab />}
          {activeTab === "Configure & Simulate" && <SimulateTab />}
          {activeTab === "Saved Crafts" && <SavedTab />}
        </div>
      </div>
    </div>
  );
}
