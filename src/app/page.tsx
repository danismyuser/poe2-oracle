import Link from "next/link";
import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

async function getCachedPatch() {
  try {
    const latest = await prisma.patchCache.findFirst({ orderBy: { lastChecked: "desc" } });
    return latest?.version ?? "0.4";
  } catch { return "0.4"; }
}

const HERO_IMG = "https://cdn.cloudflare.steamstatic.com/steam/apps/2694490/library_hero.jpg";
const PORTRAIT_IMG = "https://cdn.cloudflare.steamstatic.com/steam/apps/2694490/library_600x900.jpg";

export default async function Home() {
  const [patch, user] = await Promise.all([getCachedPatch(), getUserFromCookie()]);

  /* ── Logged-in ──────────────────────────────────────────────────────────── */
  if (user) {
    return (
      <main className="flex-1 flex flex-col">
        {/* Split hero — logged in */}
        <section style={{ display: "flex", minHeight: "70vh", position: "relative" }}>
          {/* Left — content */}
          <div
            className="animate-fade-left"
            style={{
              flex: "0 0 52%",
              background: "var(--bg-base)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "4rem 3rem 4rem 4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Vertical accent line */}
            <div style={{
              position: "absolute",
              left: 0, top: "20%", bottom: "20%",
              width: 3,
              background: "linear-gradient(to bottom, transparent, var(--blue-bright), transparent)",
            }} />

            <p
              className="section-label delay-100"
              style={{ color: "var(--blue-bright)", marginBottom: "1.25rem" }}
            >
              ◈ &nbsp;Oracle Chamber · Patch {patch}
            </p>

            <h1
              className="animate-fade-left delay-200"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                marginBottom: "0.4rem",
              }}
            >
              Welcome back
            </h1>
            <h2
              className="animate-fade-left delay-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "var(--blue-light)",
                marginBottom: "1.5rem",
              }}
            >
              {user.email.split("@")[0]}
            </h2>

            <p
              className="animate-fade-left delay-300"
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 400, lineHeight: 1.7, marginBottom: "2.5rem" }}
            >
              The Oracle is ready. What are we crafting today?
            </p>

            <div className="animate-fade-left delay-400 flex flex-col gap-3" style={{ maxWidth: 300 }}>
              <Link href="/dashboard" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                ⚗&nbsp;&nbsp;Start New Craft
              </Link>
              <Link href="/dashboard?tab=saved" className="btn-secondary" style={{ fontSize: "0.9rem", padding: "0.75rem 2rem" }}>
                ◈&nbsp;&nbsp;View Previous Crafts
              </Link>
            </div>

            {/* Stat strip */}
            <div
              className="animate-fade-left delay-500"
              style={{
                marginTop: "3rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                gap: "2.5rem",
              }}
            >
              {[
                { label: "Ask Oracle", desc: "Plain language crafting guides" },
                { label: "Simulate", desc: "Configure & compare routes" },
              ].map(({ label, desc }) => (
                <div key={label}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>{label}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", marginTop: 2 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — art panel */}
          <div style={{
            flex: "0 0 48%",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${PORTRAIT_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "brightness(0.55) saturate(0.9)",
            }} />
            {/* Left-edge fade to blend with content */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, var(--bg-base) 0%, rgba(6,10,18,0.3) 30%, transparent 100%)",
            }} />
            {/* Blue tint overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(29,111,235,0.12) 0%, transparent 100%)",
            }} />
            {/* HUD label top-right */}
            <div style={{
              position: "absolute",
              top: 24, right: 24,
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              textAlign: "right",
            }}>
              PATH OF EXILE 2<br />
              <span style={{ color: "var(--gold)", opacity: 0.7 }}>THE LAST OF THE DRUIDS</span>
            </div>
          </div>
        </section>

        <Footer patch={patch} />
      </main>
    );
  }

  /* ── Marketing / logged-out ─────────────────────────────────────────────── */
  return (
    <main className="flex-1 flex flex-col">

      {/* ── SPLIT HERO ────────────────────────────────────────────────────── */}
      <section style={{ display: "flex", minHeight: "88vh", position: "relative" }}>

        {/* Left — content panel */}
        <div
          style={{
            flex: "0 0 50%",
            background: "var(--bg-base)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem 3.5rem 5rem 4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Vertical accent line */}
          <div style={{
            position: "absolute",
            left: 0, top: "15%", bottom: "15%",
            width: 3,
            background: "linear-gradient(to bottom, transparent, var(--blue-bright) 30%, var(--gold) 70%, transparent)",
          }} />

          {/* Patch badge */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "2rem",
              alignSelf: "flex-start",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--blue-bright)",
              boxShadow: "0 0 8px var(--blue-bright)",
              flexShrink: 0,
              animation: "dot-pulse 2.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
            }}>
              Live · Patch {patch}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              lineHeight: 0.95,
              marginBottom: "1.75rem",
            }}
          >
            <span style={{ color: "var(--text-primary)", display: "block" }}>The PoE2</span>
            <span style={{ color: "var(--blue-bright)", display: "block" }}>Crafting</span>
            <span style={{
              color: "transparent",
              backgroundImage: "linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              display: "block",
            }}>
              Oracle
            </span>
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              maxWidth: 440,
              lineHeight: 1.75,
              marginBottom: "2.5rem",
            }}
          >
            Describe any item. Get the optimal crafting route, three budget
            variants, and patch-accurate advice drawn from real game data — not guesswork.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col gap-3" style={{ maxWidth: 320 }}>
            <Link href="/signup" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
              Start Crafting Free
            </Link>
            <Link href="/login" className="btn-secondary" style={{ fontSize: "0.9rem", padding: "0.75rem 2rem" }}>
              Log In
            </Link>
          </div>

          {/* Key features inline */}
          <div
            className="animate-fade-up delay-400"
            style={{
              marginTop: "3rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid var(--border-light)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {[
              { icon: "⚗", label: "Ask Anything" },
              { icon: "⚙", label: "Simulate Routes" },
              { icon: "◉", label: "Patch-Aware" },
              { icon: "◈", label: "Track History" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span style={{ color: "var(--blue-bright)", fontSize: "0.85rem" }}>{icon}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — art panel */}
        <div style={{ flex: "0 0 50%", position: "relative", overflow: "hidden" }}>
          {/* Main art */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${PORTRAIT_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.5) saturate(0.85)",
          }} />
          {/* Gradient blends left into content panel */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, var(--bg-base) 0%, rgba(6,10,18,0.2) 25%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 80% 30%, rgba(29,111,235,0.1) 0%, transparent 100%)",
          }} />
          {/* Bottom fade */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0, height: "35%",
            background: "linear-gradient(to bottom, transparent, var(--bg-base))",
          }} />
          {/* HUD text top-right */}
          <div style={{
            position: "absolute",
            top: 28, right: 28,
            textAlign: "right",
          }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
              Path of Exile 2
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,174,80,0.5)", marginTop: 3 }}>
              The Last of the Druids
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES — angled 3-panel strip ───────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-subtle)",
          borderTop: "1px solid var(--border-light)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container-lg py-16">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border-light)" }}>
            {[
              {
                num: "01",
                icon: "⚗",
                color: "var(--blue-bright)",
                bg: "var(--blue-bg)",
                title: "Ask Anything",
                body: "Describe your target item in plain language. The Oracle extracts your intent and produces a full crafting plan with route comparison.",
              },
              {
                num: "02",
                icon: "⚙",
                color: "var(--gold)",
                bg: "var(--gold-bg)",
                title: "Configure & Simulate",
                body: "Pick your base, item level, and affixes. Every viable route ranked by efficiency across league-start, mid, and high-end budgets.",
              },
              {
                num: "03",
                icon: "◉",
                color: "var(--green)",
                bg: "rgba(63,185,80,0.08)",
                title: "Always Current",
                body: "Pulls live data from craftofexile.com and poe2db.tw. Flags cached data and offers one-click patch refresh.",
              },
            ].map(({ num, icon, color, bg, title, body }) => (
              <div
                key={num}
                style={{
                  background: "var(--bg-card)",
                  padding: "2.5rem 2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Large background number */}
                <span style={{
                  position: "absolute",
                  top: -10, right: 16,
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}>
                  {num}
                </span>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 6,
                  background: bg,
                  border: `1px solid ${color}40`,
                  fontSize: "1.2rem",
                  color,
                  marginBottom: "1.25rem",
                }}>
                  {icon}
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                }}>
                  {title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUDGET TIERS — dark table style ───────────────────────────────── */}
      <section className="container-lg py-20">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p className="section-label mb-4">Budget Variants</p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}>
              Every build.<br />
              <span style={{ color: "var(--blue-bright)" }}>Every budget.</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Every Oracle response includes three crafting plans tailored to your wallet, not just the best-in-slot fantasy.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "League Start", range: "1–5 div", color: "var(--text-secondary)", border: "var(--border-mid)", desc: "Affordable and functional. One or two tier drops to keep it reachable day one." },
              { label: "Mid-tier",     range: "5–20 div", color: "var(--text-blue)", border: "var(--border-blue)", desc: "The solid finished version. 2–3 T1/T2 affixes. Best bang for investment." },
              { label: "High-end / BIS", range: "20–50+ div", color: "var(--gold)", border: "var(--border-gold)", desc: "Best in slot. All T1, with Defiled or corruption layered on top." },
            ].map(({ label, range, color, border, desc }) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "1.5rem",
                  alignItems: "center",
                  padding: "1.1rem 1.4rem",
                  border: `1px solid ${border}`,
                  borderRadius: 6,
                  background: "var(--bg-card)",
                  position: "relative",
                }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{label}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color, opacity: 0.7, marginTop: 2 }}>{range}</p>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-subtle)",
          borderTop: "1px solid var(--border-light)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Art bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          filter: "brightness(0.08) saturate(0.5)",
        }} />
        <div className="container-md py-24 text-center" style={{ position: "relative" }}>
          <p className="section-label mb-5" style={{ color: "var(--text-tertiary)" }}>Free to use — no credit card</p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "2rem",
          }}>
            Stop guessing.<br />
            <span style={{ color: "var(--blue-bright)" }}>Craft with precision.</span>
          </h2>
          <Link href="/signup" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 3rem" }}>
            Consult the Oracle — Free
          </Link>
        </div>
      </section>

      <Footer patch={patch} />
    </main>
  );
}

function Footer({ patch }: { patch: string }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-light)", background: "var(--bg-base)" }}>
      <div className="container-lg py-5 flex items-center justify-between flex-wrap gap-3" style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--blue-bright)" }}>◈</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            POE2 Crafting Oracle
          </span>
        </div>
        <span>Patch {patch} · Not affiliated with Grinding Gear Games</span>
      </div>
    </footer>
  );
}
