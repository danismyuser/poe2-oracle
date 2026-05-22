"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AskTab from "./tabs/AskTab";
import SimulateTab from "./tabs/SimulateTab";
import SavedTab from "./tabs/SavedTab";

const TABS = ["Ask the Oracle", "Configure & Simulate", "Saved Crafts"] as const;
type Tab = (typeof TABS)[number];

const TAB_CONFIG: { key: Tab; icon: string; short: string }[] = [
  { key: "Ask the Oracle",      icon: "⚗", short: "Ask" },
  { key: "Configure & Simulate", icon: "⚙", short: "Simulate" },
  { key: "Saved Crafts",        icon: "◈", short: "Saved" },
];

export default function DashboardClient({
  userEmail,
  initialTab = "Ask the Oracle",
}: {
  userEmail: string;
  initialTab?: Tab;
}) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0.75rem",
          gap: "0.25rem",
          position: "sticky",
          top: 52,           /* NavBar height */
          height: "calc(100vh - 52px)",
          overflowY: "auto",
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            padding: "0 0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Navigation
        </p>

        {/* Nav links */}
        {TAB_CONFIG.map(({ key, icon, short }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`sidebar-link ${activeTab === key ? "active" : ""}`}
          >
            <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>{icon}</span>
            <span>{short}</span>
          </button>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border-light)", margin: "0.5rem 0" }} />

        {/* User info */}
        <div style={{ padding: "0.5rem" }}>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: "0.4rem",
          }}>
            Signed In
          </p>
          <p style={{
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "0.75rem",
          }}>
            {userEmail}
          </p>
          <button
            onClick={logout}
            className="btn-ghost"
            style={{ width: "100%", fontSize: "0.72rem" }}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Content header */}
        <div
          style={{
            padding: "1.75rem 2.5rem 0",
            borderBottom: "1px solid var(--border-light)",
            background: "var(--bg-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <p
                className="section-label"
                style={{ color: "var(--blue-bright)", marginBottom: "0.4rem" }}
              >
                {TAB_CONFIG.find(t => t.key === activeTab)?.icon} &nbsp;Oracle Chamber
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {activeTab}
              </h1>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div
          className="animate-fade-in"
          style={{
            flex: 1,
            padding: "2rem 2.5rem",
            background: "var(--bg-base)",
            overflowY: "auto",
          }}
        >
          {activeTab === "Ask the Oracle"       && <AskTab />}
          {activeTab === "Configure & Simulate" && <SimulateTab />}
          {activeTab === "Saved Crafts"         && <SavedTab />}
        </div>
      </div>
    </div>
  );
}
