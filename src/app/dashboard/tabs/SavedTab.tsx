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

  if (loading) return <LoadingSpinner text="Loading saved crafts…" />;

  if (crafts.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-600">
        <p className="text-2xl mb-2">📋</p>
        <p>No saved crafts yet.</p>
        <p className="text-sm mt-1">Use Ask or Configure tabs to generate your first guide.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {attemptMsg && (
        <div className="bg-green-900/30 border border-green-700 text-green-300 text-sm px-4 py-2 rounded-lg">
          {attemptMsg}
        </div>
      )}

      {crafts.map((craft) => (
        <div key={craft.id} className="border border-zinc-700 rounded-xl overflow-hidden">
          {/* Summary row */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/40">
            <button
              onClick={() => expand(craft.id)}
              className="flex-1 text-left flex gap-3 items-center"
            >
              <span className="text-sm font-medium text-zinc-200">
                {craft.itemType === "free-form"
                  ? (craft.question?.slice(0, 60) ?? "Free-form question") + "…"
                  : `${craft.base} · ${craft.itemType}`}
              </span>
              <span className="text-xs text-zinc-600 shrink-0">
                {craft.budget} · patch {craft.patchVersion} · {new Date(craft.createdAt).toLocaleDateString()}
              </span>
            </button>
            <div className="flex gap-2 ml-4 shrink-0">
              <button
                onClick={() => { setAttemptCraftId(craft.id); setAttemptMsg(""); }}
                className="text-xs border border-zinc-700 hover:border-amber-500 text-zinc-500 hover:text-amber-400 px-2 py-1 rounded transition-colors"
              >
                Log attempt
              </button>
              <button
                onClick={() => deleteCraft(craft.id)}
                className="text-xs border border-zinc-700 hover:border-red-600 text-zinc-500 hover:text-red-400 px-2 py-1 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Expanded response */}
          {expandedId === craft.id && (
            <div className="px-5 py-4 border-t border-zinc-700">
              {expandLoading
                ? <LoadingSpinner text="Loading response…" />
                : fullCraft && <MarkdownRenderer content={fullCraft.response} />
              }
            </div>
          )}

          {/* Log attempt form */}
          {attemptCraftId === craft.id && (
            <form onSubmit={logAttempt} className="px-4 py-3 border-t border-zinc-700 bg-zinc-900/40 flex flex-col gap-3">
              <p className="text-xs text-zinc-400 font-medium">Log a real-world craft attempt</p>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio" name="success" checked={attemptForm.success}
                    onChange={() => setAttemptForm((f) => ({ ...f, success: true }))}
                  />
                  <span className="text-green-400">Success</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio" name="success" checked={!attemptForm.success}
                    onChange={() => setAttemptForm((f) => ({ ...f, success: false }))}
                  />
                  <span className="text-red-400">Failed</span>
                </label>
              </div>
              <input
                required placeholder="Currency spent (e.g. 8 div)"
                value={attemptForm.currencySpent}
                onChange={(e) => setAttemptForm((f) => ({ ...f, currencySpent: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
              />
              <input
                placeholder="Notes (optional)"
                value={attemptForm.notes}
                onChange={(e) => setAttemptForm((f) => ({ ...f, notes: e.target.value }))}
                className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500"
              />
              <div className="flex gap-2">
                <button
                  type="submit" disabled={attemptSaving}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-semibold px-4 py-1.5 rounded text-sm"
                >
                  {attemptSaving ? "Saving…" : "Save attempt"}
                </button>
                <button
                  type="button"
                  onClick={() => setAttemptCraftId(null)}
                  className="text-zinc-500 hover:text-zinc-300 text-sm px-3"
                >
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
