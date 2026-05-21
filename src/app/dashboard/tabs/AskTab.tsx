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
    <div className="flex flex-col gap-5 max-w-3xl">

      {/* Input card */}
      <div className="card p-5 flex flex-col gap-4">
        <div>
          <p className="section-label mb-1">Ask the Oracle</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            Describe your target item or ask any PoE2 crafting question.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            placeholder="e.g. How do I craft a high physical damage bow on a mid-tier budget? What essences should I use?"
            className="field px-3.5 py-3 resize-none"
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
              className="btn-primary px-6 py-2"
            >
              {loading ? "Consulting…" : "Ask Oracle"}
            </button>

            {response && !loading && (
              <button
                type="button"
                onClick={(e) => submit(e as unknown as React.FormEvent, true)}
                disabled={loading}
                className="btn-secondary px-4 py-2"
                style={{ fontSize: "0.82rem" }}
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

      {/* Error */}
      {error && (
        <p className="animate-fade-in" style={{ color: "var(--red)", fontSize: "0.88rem" }}>
          {error}
        </p>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Response */}
      {response && !loading && (
        <div className="animate-fade-in flex flex-col gap-2">
          {savedId && (
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              <span style={{ color: "var(--green)" }}>✓</span>{" "}
              Saved to craft history · {savedId.slice(0, 8)}…
            </p>
          )}
          <div className="card p-6">
            <MarkdownRenderer content={response} />
          </div>
        </div>
      )}
    </div>
  );
}
