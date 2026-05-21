"use client";
import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  async function deleteCraft(id: string) {
    if (!confirm("Delete this saved craft?")) return;
    await fetch(`/api/saved-crafts/${id}`, { method: "DELETE" });
    setCrafts((prev) => prev.filter((c) => c.id !== id));
    if (expandedId === id) { setExpandedId(null); setFullCraft(null); }
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
      setAttemptMsg("Attempt logged!");
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
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span style={{ fontSize: "1.5rem", color: "var(--gold)", opacity: 0.4 }}>◈</span>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.18em", color: "var(--text-tertiary)" }}>
          NO SAVED CRAFTS YET
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "0.88rem" }}>
          Use Ask the Oracle or Configure &amp; Simulate to generate your first guide.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      {attemptMsg && (
        <div className="px-4 py-2 rounded-lg text-sm"
          style={{ background: "rgba(30,126,90,0.08)", border: "1px solid rgba(30,126,90,0.25)", color: "var(--green)" }}>
          {attemptMsg}
        </div>
      )}

      {crafts.map((craft) => (
        <div key={craft.id} className="card overflow-hidden">
          {/* Summary row */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ background: "var(--bg-subtle)", borderBottom: expandedId === craft.id || attemptCraftId === craft.id ? "1px solid var(--border-light)" : "none" }}>
            <button onClick={() => expand(craft.id)} className="flex-1 text-left flex items-center gap-3">
              <span style={{ color: "var(--gold)", fontSize: "0.7rem", flexShrink: 0 }}>
                {expandedId === craft.id ? "▾" : "▸"}
              </span>
              <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", lineHeight: 1.4 }}>
                {craft.itemType === "free-form"
                  ? (craft.question?.slice(0, 70) ?? "Free-form question") + "…"
                  : `${craft.base} · ${craft.itemType}`}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", flexShrink: 0 }}>
                {craft.budget} · patch {craft.patchVersion} · {new Date(craft.createdAt).toLocaleDateString()}
              </span>
            </button>
            <div className="flex gap-2 ml-4 shrink-0">
              <button onClick={() => { setAttemptCraftId(craft.id); setAttemptMsg(""); }}
                className="btn-ghost">Log</button>
              <button onClick={() => deleteCraft(craft.id)}
                className="btn-ghost"
                style={{ color: "var(--red)", borderColor: "rgba(192,57,43,0.25)" }}>Delete</button>
            </div>
          </div>

          {/* Expanded response */}
          {expandedId === craft.id && (
            <div className="px-5 py-5 animate-fade-in">
              {expandLoading ? <LoadingSpinner /> : fullCraft && <MarkdownRenderer content={fullCraft.response} />}
            </div>
          )}

          {/* Log attempt form */}
          {attemptCraftId === craft.id && (
            <form onSubmit={logAttempt} className="px-4 py-4 flex flex-col gap-3"
              style={{ background: "var(--bg-subtle)" }}>
              <p className="section-label">Log real-world attempt</p>
              <div className="flex gap-5 items-center">
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--green)" }}>
                  <input type="radio" name="success" checked={attemptForm.success}
                    onChange={() => setAttemptForm((f) => ({ ...f, success: true }))} />
                  Success
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--red)" }}>
                  <input type="radio" name="success" checked={!attemptForm.success}
                    onChange={() => setAttemptForm((f) => ({ ...f, success: false }))} />
                  Failed
                </label>
              </div>
              <input required placeholder="Currency spent (e.g. 8 div)"
                value={attemptForm.currencySpent}
                onChange={(e) => setAttemptForm((f) => ({ ...f, currencySpent: e.target.value }))}
                className="field px-3 py-2" />
              <input placeholder="Notes (optional)"
                value={attemptForm.notes}
                onChange={(e) => setAttemptForm((f) => ({ ...f, notes: e.target.value }))}
                className="field px-3 py-2" />
              <div className="flex gap-2">
                <button type="submit" disabled={attemptSaving} className="btn-primary px-5 py-2">
                  {attemptSaving ? "Saving…" : "Save attempt"}
                </button>
                <button type="button" onClick={() => setAttemptCraftId(null)} className="btn-secondary px-4 py-2">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
