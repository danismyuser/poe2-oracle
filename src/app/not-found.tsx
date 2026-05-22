import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center text-center"
      style={{ minHeight: "70vh", padding: "3rem 2rem" }}
    >
      {/* PoE2 diamond symbol */}
      <div
        style={{
          fontSize: "4rem",
          color: "var(--blue-bright)",
          opacity: 0.25,
          textShadow: "0 0 30px var(--blue-glow)",
          marginBottom: "1.5rem",
          animation: "glow-pulse 3s ease-in-out infinite",
        }}
      >
        ◈
      </div>

      <p className="section-label mb-3" style={{ color: "var(--text-tertiary)" }}>
        404 — Not Found
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "var(--text-primary)",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}
      >
        The Oracle<br />
        <span style={{ color: "var(--blue-bright)" }}>Cannot Find</span> This Page
      </h1>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 380, marginBottom: "2.5rem", lineHeight: 1.7 }}>
        The page you are looking for does not exist or has been moved. Return to the Oracle Chamber to continue crafting.
      </p>

      <Link href="/" className="btn-primary" style={{ padding: "0.85rem 2.5rem", fontSize: "0.95rem" }}>
        Return to Oracle
      </Link>
    </main>
  );
}
