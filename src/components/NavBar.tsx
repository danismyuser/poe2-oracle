"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "New Craft", href: "/dashboard" },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setEmail(u?.email ?? null))
      .catch(() => setEmail(null));

    const onScroll = () => setScrolled(window.scrollY > 4);
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
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled
          ? "rgba(5, 8, 16, 0.97)"
          : "rgba(5, 8, 16, 0.85)",
        borderBottom: `1px solid ${scrolled ? "rgba(37, 99, 235, 0.2)" : "rgba(255,255,255,0.05)"}`,
        backdropFilter: "blur(12px)",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div className="container-lg flex items-center justify-between" style={{ height: 60 }}>

        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: "none" }} className="flex items-center gap-3">
          <span
            style={{
              color: "var(--blue-bright)",
              fontSize: "1.1rem",
              lineHeight: 1,
              textShadow: "0 0 12px var(--blue-glow)",
              display: "inline-block",
            }}
          >
            ◈
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.15rem",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            POE2 Oracle
          </span>
        </Link>

        {/* ── Nav right ── */}
        <div className="flex items-center gap-4">
          {mounted && email ? (
            /* ── Logged in ── */
            <>
              <Link
                href="/dashboard"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: pathname === "/dashboard" ? "var(--blue-light)" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  borderBottom: pathname === "/dashboard" ? "2px solid var(--blue)" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  background: "none",
                  border: "1px solid var(--border-light)",
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: "0.4rem 1rem",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--red)";
                  (e.target as HTMLElement).style.borderColor = "rgba(239,68,68,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-tertiary)";
                  (e.target as HTMLElement).style.borderColor = "var(--border-light)";
                }}
              >
                Log out
              </button>
            </>
          ) : mounted ? (
            /* ── Logged out ── */
            <>
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
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
              <Link
                href="/signup"
                className="btn-primary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 1.25rem" }}
              >
                Get Started
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
