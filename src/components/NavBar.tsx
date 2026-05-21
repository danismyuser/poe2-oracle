"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setEmail(u?.email ?? null))
      .catch(() => setEmail(null));

    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setEmail(null);
    router.push("/");
    router.refresh();
  }

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "rgba(250, 248, 244, 0.95)" : "var(--bg-base)",
        borderBottom: `1px solid ${scrolled ? "var(--border-light)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container-lg flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-2">
          <span style={{ color: "var(--gold)", fontSize: "0.8rem", lineHeight: 1 }}>◈</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "var(--text-primary)",
            }}
          >
            POE2 ORACLE
          </span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-5">
          {email ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                className="hover:text-ink"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--text-tertiary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
                className="hover:text-ink-2"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                className="hover:text-ink"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary" style={{ fontSize: "0.72rem" }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
