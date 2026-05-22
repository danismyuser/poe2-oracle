"use client";
import { useEffect, useState } from "react";
import OracleResponse from "@/components/OracleResponse";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getBudgetStyle } from "@/lib/budget-styles";

interface SavedCraft {
  id: string;
  itemType: string;
  base: string;
  budget: string;
  question: string | null;
  routeChosen: string | null;
  costEstimate: string | null;
  patchVersion: string;
  createdAt: string;
}

interface FullCraft extends SavedCraft {
  response: string;
}

interface AttemptForm {
  success: boolean;
  currencySpent: string;
  notes: string;
}

export default function SavedTab() {
  const [crafts, setCrafts] = useState<SavedCraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [fullCraft, setFullCraft] = useState<FullCraft | null>(null);
  const [expandLoading, setExpandLoading] = useState(false);
  const [attemptCraftId, setAttemptCraftId] = useState<string | null>(null);
  const [attemptForm, setAttemptForm] = useState<AttemptForm>({ success: true, currencySpent: "", notes: "" });
  const [attemptSaving, setAttemptSaving] = useState(false);
  const [attemptMsg, setAttemptMsg] = useState("");
  /** The craft ID pending inline delete confirmation (replaces browser confirm()). */
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => { loadCrafts(); }, []);

  async function loadCrafts() {
    setLoading(true);
    const res = await fetch("/api/saved-crafts");
    const data = await res.json();
    setCrafts(data.crafts ?? []);
    setLoading(false);
  }

  async function expand(id: string) {
    if (expandedId === id) { setExpandedId(null); setFullCraft(null); return; }
    setExpandedId(id);
    setFullCraft(null);
    setExpandLoading(true);
    const res = await fetch(`/api/saved-crafts/${id}`);
    const data = await res.json();
    setFullCraft(data);
    setExpandLoading(false);
  }

  async function confirmDelete(id: string) {
    await fetch(`/api/saved-crafts/${id}`, { method: "DELETE" });
    setCrafts((prev) => prev.filter((c) => c.id !== id));
    if (expandedId === id) { setExpandedId(null); setFullCraft(null); }
    setPendingDeleteId(null);
  }

  async function logAttempt(e: React.FormEvent) {
    e.preventDefault();
    if (!attemptCraftId) return;
    setAttemptSaving(true);
    const res = await fetch("/api/craft-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ craftId: attemptCraftId, ...attemptForm }),
    });
    setAttemptSaving(false);
    if (res.ok) {
      setAttemptMsg("Attempt logged successfully!");
      setAttemptCraftId(null);
      setAttemptForm({ success: true, currencySpent: "", notes: "" });
    } else {
      setAttemptMsg("Failed to log attempt.");
    }
    setTimeout(() => setAttemptMsg(""), 3000);
  }

  if (loading) return <LoadingSpinner />;

  if (crafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span style={{ fontSize: "3rem", color: "var(--blue-bright)", opacity: 0.2, textShadow: "0 0 20px var(--blue-glow)" }}>◈</span>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          No saved crafts yet
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem", maxWidth: 360 }}>
          Use Ask the Oracle or Configure &amp; Simulate to generate your first guide — it will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      {attemptMsg && (
        <div
          className="animate-fade-in px-4 py-3 rounded-lg text-sm"
          style={{
            background: attemptMsg.startsWith("Failed") ? "var(--red-bg)" : "var(--green-bg)",
            border: `1px solid ${attemptMsg.startsWith("Failed") ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
            color: attemptMsg.startsWith("Failed") ? "var(--red)" : "var(--green)",
          }}
        >
          {attemptMsg}
        </div>
      )}

      {crafts.map((craft) => {
        const budgetStyle = getBudgetStyle(craft.budget);
        const isExpanded = expandedId === craft.id;
        const isAttempt = attemptCraftId === craft.id;
        const isPendingDelete = pendingDeleteId === craft.id;

        return (
          <div
            key={craft.id}
            className="card overflow-hidden"
            style={{ borderColor: isExpanded ? "var(--border-blue)" : undefined }}
          >
            {/* ── Summary row ─────────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-4 py-3 gap-3"
              style={{
                background: "var(--bg-subtle)",
                borderBottom: isExpanded || isAttempt ? "1px solid var(--border-light)" : "none",
              }}
            >
              <button
                onClick={() => expand(craft.id)}
                className="flex-1 text-left flex items-center gap-3 min-w-0"
              >
                <span style={{ color: "var(--blue-bright)", fontSize: "0.75rem", flexShrink: 0 }}>
                  {isExpanded ? "▾" : "▸"}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                  }}
                >
                  {craft.itemType === "free-form"
                    ? (craft.question?.slice(0, 65) ?? "Free-form question") + "…"
                    : `${craft.base} · ${craft.itemType}`}
                </span>
                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: budgetStyle.color,
                      background: budgetStyle.bg,
                      border: `1px solid ${budgetStyle.border}`,
                      borderRadius: 4,
                      padding: "0.1rem 0.5rem",
                    }}
                  >
                    {craft.budget}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                    patch {craft.patchVersion}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                    {new Date(craft.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </button>

              {/* Action buttons — inline delete confirmation replaces browser confirm() */}
              <div className="flex gap-2 shrink-0 items-center">
                {isPendingDelete ? (
                  <>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                      Delete?
                    </span>
                    <button
                      onClick={() => confirmDelete(craft.id)}
                      className="btn-ghost"
                      style={{ color: "var(--red)", borderColor: "rgba(239,68,68,0.4)", fontSize: "0.78rem" }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setPendingDeleteId(null)}
                      className="btn-ghost"
                      style={{ fontSize: "0.78rem" }}
                    >
                      No
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setAttemptCraftId(craft.id); setAttemptMsg(""); setPendingDeleteId(null); }}
                      className="btn-ghost"
                      style={{ fontSize: "0.78rem" }}
                    >
                      Log
                    </button>
                    <button
                      onClick={() => { setPendingDeleteId(craft.id); setAttemptCraftId(null); }}
                      className="btn-ghost"
                      style={{ color: "var(--red)", borderColor: "rgba(239,68,68,0.25)", fontSize: "0.78rem" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── Expanded response ────────────────────────────────────────── */}
            {isExpanded && (
              <div className="px-6 py-6 animate-fade-in">
                {expandLoading ? <LoadingSpinner /> : fullCraft && <OracleResponse content={fullCraft.response} />}
              </div>
            )}

            {/* ── Log attempt form ─────────────────────────────────────────── */}
            {isAttempt && (
              <form
                onSubmit={logAttempt}
                className="px-5 py-5 flex flex-col gap-4 animate-fade-in"
                style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border-light)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  Log Real-World Attempt
                </p>

                <div className="flex gap-5 items-center">
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--green)" }}>
                    <input
                      type="radio"
                      name="success"
                      checked={attemptForm.success}
                      onChange={() => setAttemptForm((f) => ({ ...f, success: true }))}
                      style={{ accentColor: "var(--green)" }}
                    />
                    Success
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--red)" }}>
                    <input
                      type="radio"
                      name="success"
                      checked={!attemptForm.success}
                      onChange={() => setAttemptForm((f) => ({ ...f, success: false }))}
                      style={{ accentColor: "var(--red)" }}
                    />
                    Failed
                  </label>
                </div>

                <input
                  required
                  placeholder="Currency spent (e.g. 8 div)"
                  value={attemptForm.currencySpent}
                  onChange={(e) => setAttemptForm((f) => ({ ...f, currencySpent: e.target.value }))}
                  className="field px-4 py-2.5"
                />
                <input
                  placeholder="Notes (optional)"
                  value={attemptForm.notes}
                  onChange={(e) => setAttemptForm((f) => ({ ...f, notes: e.target.value }))}
                  className="field px-4 py-2.5"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={attemptSaving}
                    className="btn-primary"
                    style={{ padding: "0.6rem 1.75rem" }}
                  >
                    {attemptSaving ? "Saving…" : "Save Attempt"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttemptCraftId(null)}
                    className="btn-secondary"
                    style={{ padding: "0.6rem 1.25rem" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
