"use client";
import { useState } from "react";
import AskTab from "./tabs/AskTab";
import SimulateTab from "./tabs/SimulateTab";
import SavedTab from "./tabs/SavedTab";

const TABS = ["Ask the Oracle", "Configure & Simulate", "Saved Crafts"] as const;
type Tab = (typeof TABS)[number];

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("Ask the Oracle");

  return (
    <div className="flex-1 flex flex-col container-lg py-8">

      {/* Page header */}
      <div className="flex items-end justify-between mb-6 pb-5"
        style={{ borderBottom: "1px solid var(--border-light)" }}>
        <div>
          <p className="section-label mb-1">◈ &nbsp;Oracle Chamber</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.35rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
          }}>
            Dashboard
          </h1>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", paddingBottom: "2px" }}>
          {userEmail}
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6"
        style={{ borderBottom: "1px solid var(--border-light)" }}>
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: active ? 500 : 400,
                color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                background: "none",
                border: "none",
                borderBottom: active ? "2px solid var(--gold)" : "2px solid transparent",
                padding: "0.5rem 1rem",
                marginBottom: "-1px",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
                whiteSpace: "nowrap",
              }}
              className={active ? "" : "hover:text-ink-2"}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 animate-fade-in">
        {activeTab === "Ask the Oracle" && <AskTab />}
        {activeTab === "Configure & Simulate" && <SimulateTab />}
        {activeTab === "Saved Crafts" && <SavedTab />}
      </div>
    </div>
  );
}
