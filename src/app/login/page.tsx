"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ART_IMG = "https://cdn.cloudflare.steamstatic.com/steam/apps/2694490/library_600x900.jpg";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
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
    <main className="flex-1 flex" style={{ minHeight: "calc(100vh - 60px)" }}>

      {/* ── Left art panel ─────────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${ART_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "brightness(0.45) saturate(0.8)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(5,8,16,0) 0%, rgba(5,8,16,0.95) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(37,99,235,0.18) 0%, transparent 100%)",
        }} />
        {/* Brand overlay */}
        <div style={{ position: "absolute", bottom: 40, left: 40, zIndex: 2 }}>
          <div className="flex items-center gap-3 mb-4">
            <span style={{ color: "var(--blue-bright)", fontSize: "1.5rem", textShadow: "0 0 20px var(--blue-glow)" }}>◈</span>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
            }}>
              POE2 Oracle
            </span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 260, lineHeight: 1.6 }}>
            Patch-accurate crafting guides powered by real game data.
          </p>
        </div>
      </div>

      {/* ── Right form panel ───────────────────────────────────────────────── */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-14"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="w-full max-w-md animate-fade-up">

          {/* Header */}
          <div className="mb-8">
            <p
              className="section-label mb-3"
              style={{ color: "var(--blue-bright)" }}
            >
              ◈ &nbsp;Oracle Chamber
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Log in to access your saved crafts and Oracle history.
            </p>
          </div>

          {/* Form */}
          <div
            className="card p-8 flex flex-col gap-5"
            style={{ borderColor: "var(--border-blue)" }}
          >
            <form onSubmit={submit} className="flex flex-col gap-5">
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
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field px-4 py-3"
                />
              </div>

              {error && (
                <div
                  style={{
                    background: "var(--red-bg)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: 7,
                    padding: "0.7rem 1rem",
                    color: "var(--red)",
                    fontSize: "0.88rem",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
                style={{ padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.25rem" }}
              >
                {loading ? "Logging in…" : "Log In"}
              </button>
            </form>

            <div className="divider">or</div>

            <Link
              href="/signup"
              className="btn-secondary w-full"
              style={{ padding: "0.75rem", textAlign: "center" }}
            >
              Create a free account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
