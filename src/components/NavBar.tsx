"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setEmail(u?.email ?? null))
      .catch(() => setEmail(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setEmail(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 52,
        background: "rgba(6, 10, 18, 0.97)",
        borderBottom: "1px solid var(--border-light)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container-lg flex items-center justify-between" style={{ height: "100%" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          {/* PoE-style bracket logo */}
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--blue-bright)",
            letterSpacing: "0.1em",
          }}>
            [
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}>
            POE2 Oracle
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--blue-bright)",
            letterSpacing: "0.1em",
          }}>
            ]
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {mounted && email ? (
            /* Logged in — sidebar handles main nav, just show minimal info */
            <>
              <Link
                href="/dashboard"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  padding: "0.3rem 0.6rem",
                }}
              >
                Dashboard
              </Link>
            </>
          ) : mounted ? (
            /* Logged out */
            <>
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                Log In
              </Link>
              <Link href="/signup" className="btn-primary" style={{ fontSize: "0.78rem", padding: "0.4rem 1.1rem" }}>
                Get Started
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
