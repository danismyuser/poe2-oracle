"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      className="flex-1 flex items-center justify-center px-4 py-16"
      style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(180,120,20,0.07) 0%, transparent 70%), var(--bg-base)",
      }}
    >
      <div className="w-full max-w-sm animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: "var(--text-dim)",
              marginBottom: "0.75rem",
            }}
          >
            ◈ &nbsp; POE2 ORACLE &nbsp; ◈
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--gold)",
              textShadow: "0 0 30px rgba(212,168,67,0.3)",
            }}
          >
            Seek the Oracle
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem", fontStyle: "italic" }}>
            Free consultation. No currency required.
          </p>
        </div>

        {/* Card */}
        <div className="arcane-card p-8 flex flex-col gap-5">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-dim)",
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="exile@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="arcane-input px-4 py-2.5 w-full"
                style={{ fontSize: "0.95rem" }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--text-dim)",
                }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="arcane-input px-4 py-2.5 w-full"
                style={{ fontSize: "0.95rem" }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "var(--red-accent)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-2.5 mt-1"
              style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
            >
              {loading ? "BINDING…" : "BIND YOUR SOUL"}
            </button>
          </form>

          <div className="rune-divider" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--text-dim)" }}>
            ALREADY BOUND
          </div>

          <Link
            href="/login"
            className="btn-ghost w-full py-2.5 text-center text-xs"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.12em",
              textDecoration: "none",
              display: "block",
            }}
          >
            LOG IN
          </Link>
        </div>

        <p
          className="text-center mt-5"
          style={{ fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.6 }}
        >
          Free to use. No card required.
        </p>
      </div>
    </main>
  );
}
