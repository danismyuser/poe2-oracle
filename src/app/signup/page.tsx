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
    <main className="flex-1 flex items-center justify-center px-4 py-16"
      style={{ background: "var(--bg-base)" }}>
      <div className="w-full max-w-sm animate-fade-up">

        {/* Header */}
        <div className="text-center mb-7">
          <p className="section-label mb-3">◈ &nbsp;POE2 ORACLE</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
            marginBottom: "0.4rem",
          }}>
            Get started free
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            No credit card required.
          </p>
        </div>

        {/* Form card */}
        <div className="card p-7 flex flex-col gap-5">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                placeholder="exile@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field px-3.5 py-2.5"
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
                className="field px-3.5 py-2.5"
              />
            </div>

            {error && (
              <p style={{ color: "var(--red)", fontSize: "0.85rem" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 mt-1"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <div className="divider">already have an account</div>

          <Link href="/login" className="btn-secondary w-full py-2.5" style={{ fontSize: "0.875rem" }}>
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
