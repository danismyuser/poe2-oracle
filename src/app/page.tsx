import Link from "next/link";
import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

async function getCachedPatch() {
  try {
    const latest = await prisma.patchCache.findFirst({ orderBy: { lastChecked: "desc" } });
    return latest?.version ?? "0.4";
  } catch {
    return "0.4";
  }
}

const HERO_IMG = "https://cdn.cloudflare.steamstatic.com/steam/apps/2694490/library_hero.jpg";

export default async function Home() {
  const [patch, user] = await Promise.all([getCachedPatch(), getUserFromCookie()]);

  /* ── Logged-in home ─────────────────────────────────────────────────────── */
  if (user) {
    return (
      <main className="flex-1 flex flex-col">

        {/* Hero — logged in */}
        <section
          style={{
            position: "relative",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Background art */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.25) saturate(0.8)",
          }} />
          {/* Blue gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(5,8,16,0.9) 0%, rgba(13,22,40,0.7) 50%, rgba(5,8,16,0.95) 100%)",
          }} />
          {/* Left glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(37,99,235,0.12) 0%, transparent 100%)",
          }} />

          <div className="container-lg" style={{ position: "relative", zIndex: 1, paddingTop: "4rem", paddingBottom: "4rem" }}>
            <p className="animate-fade-up section-label" style={{ color: "var(--blue-light)", marginBottom: "1rem" }}>
              ◈ &nbsp;ORACLE CHAMBER · PATCH {patch}
            </p>
            <h1
              className="animate-fade-up delay-100"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                maxWidth: 700,
              }}
            >
              Welcome back,{" "}
              <span style={{ color: "var(--blue-light)" }}>
                {user.email.split("@")[0]}
              </span>
            </h1>
            <p
              className="animate-fade-up delay-200"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                marginBottom: "2.5rem",
                maxWidth: 480,
              }}
            >
              What are we crafting today? The Oracle is ready.
            </p>

            <div className="animate-fade-up delay-300 flex gap-4 flex-wrap">
              <Link
                href="/dashboard"
                className="btn-primary"
                style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}
              >
                ⚗ &nbsp;Start New Craft
              </Link>
              <Link
                href="/dashboard?tab=saved"
                className="btn-secondary"
                style={{ fontSize: "0.95rem", padding: "0.9rem 2rem" }}
              >
                ◈ &nbsp;View Previous Crafts
              </Link>
            </div>
          </div>
        </section>

        {/* Quick feature grid */}
        <section className="container-lg py-14">
          <p className="section-label text-center mb-10" style={{ color: "var(--text-tertiary)" }}>Oracle Capabilities</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "⚗",
                color: "var(--blue-light)",
                bg: "var(--blue-bg)",
                border: "var(--border-blue)",
                title: "Ask the Oracle",
                body: "Describe your target in plain language. Get a full crafting plan with budget variants and route comparison.",
                href: "/dashboard",
              },
              {
                icon: "⚙",
                color: "var(--gold)",
                bg: "var(--gold-bg)",
                border: "var(--border-gold)",
                title: "Configure & Simulate",
                body: "Pick your base, item level, and affixes. Every viable route ranked by efficiency and determinism.",
                href: "/dashboard",
              },
              {
                icon: "◉",
                color: "#C084FC",
                bg: "rgba(168,85,247,0.08)",
                border: "rgba(168,85,247,0.3)",
                title: "Saved Crafts",
                body: "Review every Oracle guide you've generated. Log real-world attempts against predictions.",
                href: "/dashboard?tab=saved",
              },
            ].map(({ icon, color, bg, border, title, body, href }, i) => (
              <Link key={title} href={href} style={{ textDecoration: "none" }}>
                <div
                  className={`card animate-fade-up delay-${(i + 1) * 100} p-6 flex flex-col gap-3`}
                  style={{ cursor: "pointer", height: "100%" }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: bg,
                      border: `1px solid ${border}`,
                      fontSize: "1.2rem",
                      color,
                    }}
                  >
                    {icon}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                    }}
                  >
                    {title}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer patch={patch} />
      </main>
    );
  }

  /* ── Marketing home (logged out) ────────────────────────────────────────── */
  return (
    <main className="flex-1 flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background art */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          filter: "brightness(0.22) saturate(0.7)",
        }} />
        {/* Overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(5,8,16,0.97) 0%, rgba(5,8,16,0.6) 55%, rgba(5,8,16,0.9) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 55% 70% at 0% 50%, rgba(37,99,235,0.15) 0%, transparent 100%)",
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
          background: "linear-gradient(to bottom, transparent, var(--bg-base))",
        }} />

        <div className="container-lg" style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "6rem" }}>
          {/* Patch badge */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37,99,235,0.12)",
              border: "1px solid var(--border-blue)",
              borderRadius: 100,
              padding: "0.35rem 1rem",
              marginBottom: "1.75rem",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-blue)",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--blue-bright)",
              display: "inline-block",
              boxShadow: "0 0 8px var(--blue-bright)",
              animation: "dot-pulse 2.5s ease-in-out infinite",
            }} />
            LIVE · PATCH {patch}
          </div>

          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              lineHeight: 1.0,
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              maxWidth: 750,
            }}
          >
            The PoE2<br />
            <span style={{
              color: "transparent",
              backgroundImage: "linear-gradient(135deg, var(--blue-bright) 0%, var(--blue-light) 50%, #93C5FD 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}>
              Crafting Oracle
            </span>
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.15rem",
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Describe any item. Get the optimal crafting route, three budget
            variants, and patch-accurate advice — drawn from real game data,
            not guesswork.
          </p>

          <div className="animate-fade-up delay-300 flex gap-4 flex-wrap">
            <Link href="/signup" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}>
              Start Crafting Free
            </Link>
            <Link href="/login" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "0.9rem 2rem" }}>
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────────────────── */}
      <section className="container-lg py-20">
        <p className="section-label text-center mb-12">What the Oracle does</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "⚗",
              color: "var(--blue-light)",
              bg: "var(--blue-bg)",
              border: "var(--border-blue)",
              title: "Ask Anything",
              body: "Describe your target item in plain language. The Oracle extracts your intent and generates a full crafting plan with route comparison.",
              delay: "delay-100",
            },
            {
              icon: "⚙",
              color: "var(--gold)",
              bg: "var(--gold-bg)",
              border: "var(--border-gold)",
              title: "Configure & Simulate",
              body: "Select your base, item level, and target affixes. Every viable route ranked by efficiency and determinism across three budget tiers.",
              delay: "delay-200",
            },
            {
              icon: "◉",
              color: "#10B981",
              bg: "rgba(16,185,129,0.08)",
              border: "rgba(16,185,129,0.3)",
              title: "Always Patch-Aware",
              body: "Pulls live data from craftofexile.com and poe2db.tw. Flags when advice is based on cached data and offers a one-click refresh.",
              delay: "delay-300",
            },
          ].map(({ icon, color, bg, border, title, body, delay }) => (
            <div
              key={title}
              className={`card animate-fade-up ${delay} p-7 flex flex-col gap-4`}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: bg,
                  border: `1px solid ${border}`,
                  fontSize: "1.3rem",
                  color,
                }}
              >
                {icon}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                }}
              >
                {title}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.7 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Budget tiers ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container-lg py-20">
          <p className="section-label text-center mb-12">Every response includes three budget variants</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "League Start",
                range: "1–5 div",
                color: "#94A3B8",
                bg: "rgba(148,163,184,0.08)",
                border: "rgba(148,163,184,0.25)",
                desc: "Affordable and functional. One or two tier drops to keep it reachable at day-one prices.",
              },
              {
                label: "Mid-tier",
                range: "5–20 div",
                color: "var(--blue-light)",
                bg: "var(--blue-bg)",
                border: "var(--border-blue)",
                desc: "The solid finished version. 2–3 T1/T2 affixes, the rest T2/T3. Best bang for your investment.",
              },
              {
                label: "High-end / BIS",
                range: "20–50+ div",
                color: "var(--gold)",
                bg: "var(--gold-bg)",
                border: "var(--border-gold)",
                desc: "Best in slot. All T1, with Defiled or corruption layered on top where it fits.",
              },
            ].map(({ label, range, color, bg, border, desc }) => (
              <div
                key={label}
                className="card p-6 flex flex-col gap-3"
                style={{ borderColor: border }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color,
                      background: bg,
                      padding: "0.15rem 0.6rem",
                      borderRadius: 5,
                      border: `1px solid ${border}`,
                    }}
                  >
                    {range}
                  </span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="container-md py-24 text-center">
        <p className="section-label mb-5" style={{ color: "var(--text-tertiary)" }}>Free to use — no credit card</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            lineHeight: 1.15,
            marginBottom: "2rem",
          }}
        >
          Stop guessing.<br />
          <span style={{ color: "var(--blue-light)" }}>Craft with precision.</span>
        </h2>
        <Link href="/signup" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 3rem" }}>
          Consult the Oracle — Free
        </Link>
      </section>

      <Footer patch={patch} />
    </main>
  );
}

function Footer({ patch }: { patch: string }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-light)" }}>
      <div
        className="container-lg py-5 flex items-center justify-between flex-wrap gap-3"
        style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--blue-bright)", fontSize: "0.75rem" }}>◈</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            POE2 Crafting Oracle
          </span>
        </div>
        <span>Patch {patch} · Not affiliated with Grinding Gear Games</span>
      </div>
    </footer>
  );
}
