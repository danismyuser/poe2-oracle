"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main
      className="flex-1 flex flex-col items-center justify-center text-center"
      style={{ minHeight: "60vh", padding: "3rem 2rem" }}
    >
      <div style={{ marginBottom: "1.5rem", fontSize: "2.5rem", color: "var(--red)" }}>⚠</div>

      <p className="section-label mb-3" style={{ color: "var(--red)" }}>
        Oracle Error
      </p>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--text-primary)",
          marginBottom: "0.75rem",
        }}
      >
        Something went wrong
      </h2>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 400, marginBottom: "2rem" }}>
        The Oracle encountered an unexpected error. Your session is intact — try again or return home.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={reset} className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
          Try Again
        </button>
        <Link href="/" className="btn-secondary" style={{ padding: "0.75rem 2rem" }}>
          Return Home
        </Link>
      </div>

      {error.digest && (
        <p style={{ marginTop: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
          Error ID: {error.digest}
        </p>
      )}
    </main>
  );
}
