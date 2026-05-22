"use client";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

interface Props {
  /**
   * The logged-in user's email, resolved server-side by the root layout.
   * Null means unauthenticated. Passed as a prop to eliminate client-side
   * fetch and the resulting flash of unauthenticated state.
   */
  userEmail: string | null;
}

export default function NavBar({ userEmail }: Props) {
  const logout = useLogout();

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

        {/* Right actions — rendered correctly on first paint (no flash) */}
        <div className="flex items-center gap-3">
          {userEmail ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}
