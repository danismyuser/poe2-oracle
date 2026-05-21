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
    <div className="flex flex-col gap-4">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label className="text-sm text-zinc-400">
          Ask the Oracle anything about PoE2 crafting:
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          placeholder="e.g. How do I craft a high physical damage bow on a mid-tier budget?"
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-none focus:border-amber-500"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            {loading ? "Thinking…" : "Ask Oracle"}
          </button>
          {response && (
            <button
              type="button"
              onClick={(e) => submit(e as unknown as React.FormEvent, true)}
              disabled={loading}
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Re-run with patch refresh
            </button>
          )}
        </div>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading && <LoadingSpinner />}

      {response && !loading && (
        <div className="mt-2">
          {savedId && (
            <p className="text-xs text-zinc-600 mb-3">
              ✓ Saved to your craft history · ID {savedId}
            </p>
          )}
          <div className="bg-zinc-800/40 border border-zinc-700 rounded-xl p-5">
            <MarkdownRenderer content={response} />
          </div>
        </div>
      )}
    </div>
  );
}
