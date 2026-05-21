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

    const onScroll = () => setScrolled(window.scrollY > 10);
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
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 8, 6, 0.92)"
          : "rgba(10, 8, 6, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(180, 140, 50, 0.2)"
          : "1px solid transparent",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="flex items-center gap-2.5 no-underline group"
        style={{ textDecoration: "none" }}
      >
        {/* Rune icon */}
        <span
          className="text-sm select-none"
          style={{ color: "var(--gold)", opacity: 0.8 }}
        >
          ◈
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--gold)",
            textShadow: "0 0 20px rgba(212, 168, 67, 0.35)",
            transition: "text-shadow 0.2s",
          }}
          className="group-hover:brightness-110 transition-all"
        >
          POE2 ORACLE
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex gap-5 items-center">
        {email ? (
          <>
            <Link
              href="/dashboard"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="hover:text-parchment"
            >
              DASHBOARD
            </Link>
            <button
              onClick={logout}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "var(--text-dim)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              className="hover:text-stone"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="hover:text-parchment"
            >
              LOG IN
            </Link>
            <Link
              href="/signup"
              className="btn-gold px-4 py-1.5 text-xs"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.1em", textDecoration: "none" }}
            >
              CONSULT FREE
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
