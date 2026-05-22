"use client";
import { useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AskTab() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);

  async function submit(e: React.FormEvent, refresh = false) {
    e.preventDefault();
    if (!question.trim()) return;
    setError("");
    setResponse("");
    setSavedId(null);
    setLoading(true);

    const prompt = refresh
      ? `${question}\n\nPlease refresh against the latest patch data before answering.`
      : question;

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: prompt }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong"); return; }
    setResponse(data.response);
    setSavedId(data.id);
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* ── Input card ─────────────────────────────────────────────────────── */}
      <div className="card p-6 flex flex-col gap-5">
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              marginBottom: "0.35rem",
            }}
          >
            Ask the Oracle
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Describe your target item or ask any PoE2 crafting question.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={6}
            placeholder="e.g. How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?"
            className="field px-4 py-3 resize-none"
            style={{ lineHeight: 1.6 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                submit(e as unknown as React.FormEvent);
              }
            }}
          />

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="btn-primary"
              style={{ padding: "0.65rem 2rem" }}
            >
              {loading ? "Consulting…" : "⚗ Ask Oracle"}
            </button>

            {response && !loading && (
              <button
                type="button"
                onClick={(e) => submit(e as unknown as React.FormEvent, true)}
                disabled={loading}
                className="btn-secondary"
                style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
              >
                ↻ Refresh patch data
              </button>
            )}

            <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginLeft: "auto" }}>
              Ctrl+Enter to submit
            </span>
          </div>
        </form>
      </div>

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <div
          className="animate-fade-in"
          style={{
            background: "var(--red-bg)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8,
            padding: "0.85rem 1.1rem",
            color: "var(--red)",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      {/* ── Loading ─────────────────────────────────────────────────────────── */}
      {loading && <LoadingSpinner />}

      {/* ── Response ────────────────────────────────────────────────────────── */}
      {response && !loading && (
        <div className="animate-fade-in flex flex-col gap-3">
          {savedId && (
            <div className="flex items-center gap-2" style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
              <span style={{ color: "var(--green)" }}>✓</span>
              <span>Saved to craft history</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-light)",
                  borderRadius: 4,
                  padding: "0.05rem 0.4rem",
                  color: "var(--text-tertiary)",
                }}
              >
                {savedId.slice(0, 8)}…
              </span>
            </div>
          )}
          <div className="card p-7">
            <MarkdownRenderer content={response} />
          </div>
        </div>
      )}
    </div>
  );
}
