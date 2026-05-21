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

      {/* Invocation box */}
      <div className="arcane-card p-6 flex flex-col gap-4">
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "var(--text-dim)",
              marginBottom: "0.5rem",
            }}
          >
            ◈ &nbsp; INVOKE THE ORACLE
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontStyle: "italic" }}>
            Describe your target item or ask any PoE2 crafting question.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            placeholder="e.g. How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?"
            className="arcane-input px-4 py-3 w-full resize-none"
            style={{ fontSize: "1rem", lineHeight: 1.6 }}
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
              className="btn-gold px-6 py-2"
              style={{ fontSize: "0.78rem", letterSpacing: "0.12em" }}
            >
              {loading ? "CONSULTING…" : "CONSULT ORACLE"}
            </button>

            {response && !loading && (
              <button
                type="button"
                onClick={(e) => submit(e as unknown as React.FormEvent, true)}
                disabled={loading}
                className="btn-ghost px-4 py-2 text-xs"
                style={{ letterSpacing: "0.08em", fontFamily: "var(--font-display)" }}
              >
                ↻ &nbsp; REFRESH PATCH DATA
              </button>
            )}

            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-dim)",
                fontStyle: "italic",
                marginLeft: "auto",
              }}
            >
              {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+Enter to submit
            </span>
          </div>
        </form>
      </div>

      {/* Error */}
      {error && (
        <p
          className="animate-fade-in"
          style={{ color: "var(--red-accent)", fontSize: "0.9rem", fontStyle: "italic", padding: "0 0.25rem" }}
        >
          {error}
        </p>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Response */}
      {response && !loading && (
        <div className="animate-shimmer flex flex-col gap-3">
          {savedId && (
            <div
              className="flex items-center gap-2"
              style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}
            >
              <span style={{ color: "var(--teal)" }}>◆</span>
              Saved to craft history &nbsp;·&nbsp; ID {savedId.slice(0, 8)}…
            </div>
          )}
          <div className="arcane-card p-6">
            <MarkdownRenderer content={response} />
          </div>
        </div>
      )}
    </div>
  );
}
