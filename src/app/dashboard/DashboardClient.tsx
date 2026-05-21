"use client";
import { useState } from "react";
import AskTab from "./tabs/AskTab";
import SimulateTab from "./tabs/SimulateTab";
import SavedTab from "./tabs/SavedTab";

const TABS = ["Ask the Oracle", "Configure & Simulate", "Saved Crafts"] as const;
type Tab = (typeof TABS)[number];

const TAB_GLYPHS: Record<Tab, string> = {
  "Ask the Oracle": "⚗",
  "Configure & Simulate": "⚙",
  "Saved Crafts": "◈",
};

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("Ask the Oracle");

  return (
    <div
      className="flex-1 flex flex-col w-full"
      style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "var(--text-dim)",
              marginBottom: "0.4rem",
            }}
          >
            ◈ &nbsp; ORACLE CHAMBER
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--gold)",
              textShadow: "0 0 20px rgba(212,168,67,0.25)",
            }}
          >
            Dashboard
          </h1>
        </div>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-dim)",
            fontStyle: "italic",
            paddingBottom: "0.2rem",
          }}
        >
          {userEmail}
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 mb-6"
        style={{
          borderBottom: "1px solid var(--border-dim)",
          paddingBottom: "0",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: "0.6rem 1.25rem",
                borderRadius: "6px 6px 0 0",
                border: "1px solid transparent",
                borderBottom: "none",
                background: isActive ? "var(--bg-card)" : "transparent",
                color: isActive ? "var(--gold)" : "var(--text-dim)",
                borderColor: isActive ? "var(--border-dim)" : "transparent",
                borderBottomColor: isActive ? "var(--bg-card)" : "transparent",
                marginBottom: isActive ? "-1px" : 0,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              className={isActive ? "" : "hover:text-stone"}
            >
              <span style={{ opacity: isActive ? 1 : 0.5 }}>{TAB_GLYPHS[tab]}</span>
              {tab.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className="flex-1 animate-fade-in">
        {activeTab === "Ask the Oracle" && <AskTab />}
        {activeTab === "Configure & Simulate" && <SimulateTab />}
        {activeTab === "Saved Crafts" && <SavedTab />}
      </div>
    </div>
  );
}
