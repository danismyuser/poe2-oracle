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
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-200">Dashboard</h1>
        <span className="text-xs text-zinc-600">{userEmail}</span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-zinc-800 mb-6 gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors ${
              activeTab === tab
                ? "text-amber-400 border-b-2 border-amber-400 -mb-px bg-transparent"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="flex-1">
        {activeTab === "Ask the Oracle" && <AskTab />}
        {activeTab === "Configure & Simulate" && <SimulateTab />}
        {activeTab === "Saved Crafts" && <SavedTab />}
      </div>
    </div>
  );
}
