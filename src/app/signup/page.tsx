"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OracleLogo from "@/components/OracleLogo";

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
    <main className="flex-1 flex" style={{ minHeight: "calc(100vh - 52px)" }}>

      {/* ── Left — brand panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          flexShrink: 0,
          background: "var(--bg-subtle)",
          borderRight: "1px solid var(--border-light)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "3rem",
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(56,139,253,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
          pointerEvents: "none",
        }} />
        {/* Center glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%", paddingBottom: "60%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,111,235,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Corner brackets */}
        {[
          { top: 20, left: 20, borderTop: "1px solid", borderLeft: "1px solid", width: 28, height: 28 },
          { top: 20, right: 20, borderTop: "1px solid", borderRight: "1px solid", width: 28, height: 28 },
          { bottom: 20, left: 20, borderBottom: "1px solid", borderLeft: "1px solid", width: 28, height: 28 },
          { bottom: 20, right: 20, borderBottom: "1px solid", borderRight: "1px solid", width: 28, height: 28 },
        ].map((s, i) => <div key={i} style={{ position: "absolute", borderColor: "rgba(56,139,253,0.22)", ...s }} />)}

        <div style={{ position: "relative", zIndex: 1 }}>
          <OracleLogo scale={0.85} tagline />
        </div>

        <p style={{
          position: "absolute", bottom: 28,
          fontFamily: "var(--font-display)",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          opacity: 0.5,
        }}>
          Join thousands of exiles crafting smarter
        </p>
      </div>

      {/* ── Right — form ───────────────────────────────────────────────────── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-14"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8">
            <p className="section-label mb-3" style={{ color: "var(--blue-bright)" }}>
              ◈ &nbsp;Oracle Chamber
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                lineHeight: 1.0,
                marginBottom: "0.5rem",
              }}
            >
              Get Started Free
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              No credit card required. Start crafting in seconds.
            </p>
          </div>

          <div className="card p-8" style={{ borderColor: "var(--border-blue)", display: "flex", flexDirection: "column", gap: 20 }}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  placeholder="exile@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field px-4 py-3"
                />
              </div>
              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field px-4 py-3"
                />
              </div>

              {error && (
                <div style={{ background: "var(--red-bg)", border: "1px solid rgba(244,112,103,0.3)", borderRadius: 5, padding: "0.7rem 1rem", color: "var(--red)", fontSize: "0.88rem" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full" style={{ padding: "0.85rem", fontSize: "0.95rem" }}>
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>

            <div className="divider">already have an account</div>

            <Link href="/login" className="btn-secondary w-full" style={{ padding: "0.75rem", textAlign: "center" }}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
