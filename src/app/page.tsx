import Link from "next/link";
import { prisma } from "@/lib/db";

async function getCachedPatch() {
  try {
    const latest = await prisma.patchCache.findFirst({ orderBy: { lastChecked: "desc" } });
    return latest?.version ?? "0.4";
  } catch {
    return "0.4";
  }
}

export default async function Home() {
  const patch = await getCachedPatch();

  return (
    <main className="flex-1 flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="hero-glow relative flex flex-col items-center justify-center text-center px-6 py-32 gap-8 overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        {/* Decorative top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.4), transparent)" }}
        />

        {/* Patch badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(180, 120, 20, 0.08)",
            border: "1px solid rgba(180, 140, 50, 0.3)",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "var(--gold)",
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--gold)",
              display: "inline-block",
              animation: "ember-pulse 2s ease-in-out infinite",
            }}
          />
          PATCH {patch} · THE LAST OF THE DRUIDS
        </div>

        {/* Heading */}
        <div className="animate-fade-up delay-100 flex flex-col items-center gap-2">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: "var(--text-dim)",
              marginBottom: "0.5rem",
            }}
          >
            ◈ &nbsp; PATH OF EXILE 2 &nbsp; ◈
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              maxWidth: 700,
            }}
          >
            The Crafting{" "}
            <span
              style={{
                color: "var(--gold)",
                textShadow: "0 0 40px rgba(212,168,67,0.4)",
              }}
            >
              Oracle
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-200"
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            maxWidth: 520,
            lineHeight: 1.7,
            fontStyle: "italic",
          }}
        >
          Describe any item. Receive the optimal crafting route, three budget
          variants, and patch-accurate advice — drawn from authoritative game
          data, not guesswork.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up delay-300 flex gap-3 mt-2">
          <Link href="/signup" className="btn-gold px-8 py-3 text-sm" style={{ textDecoration: "none" }}>
            Consult the Oracle
          </Link>
          <Link
            href="/login"
            className="btn-ghost px-6 py-3 text-sm"
            style={{ textDecoration: "none", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
          >
            Log In
          </Link>
        </div>

        {/* Decorative rune row */}
        <p
          className="animate-fade-up delay-400"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            color: "var(--text-dim)",
            marginTop: "2rem",
          }}
        >
          ◆ &nbsp; CRAFT &nbsp;·&nbsp; SIMULATE &nbsp;·&nbsp; OPTIMISE &nbsp; ◆
        </p>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }}
        />
      </section>

      {/* ── Feature cards ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-6">
        <div
          className="rune-divider mb-12"
          style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em" }}
        >
          WHAT THE ORACLE DOES
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            glyph="⚗"
            title="Ask Anything"
            desc="Describe your target item in plain language. The Oracle extracts your intent and generates a full crafting plan with ranked route comparison."
            delay="delay-100"
          />
          <FeatureCard
            glyph="⚙"
            title="Configure & Simulate"
            desc="Select your base, item level, and target affixes. Get every viable route ranked by efficiency and determinism across three budget variants."
            delay="delay-200"
          />
          <FeatureCard
            glyph="◉"
            title="Always Patch-Aware"
            desc="Consults craftofexile.com and poe2db.tw in real-time. Flags stale data. Never gives advice about mechanics that no longer exist."
            delay="delay-300"
          />
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-6 py-16">
        <div
          className="rune-divider mb-12"
          style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em" }}
        >
          HOW IT WORKS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "I", title: "Describe your goal", body: "Tell the Oracle what you're trying to craft — a physical damage bow, a caster helmet, a life-stacked belt. No form required." },
            { step: "II", title: "Receive your plan", body: "The Oracle compares every viable route — essence slams, chaos spam, omen combos, jawbone paths — and ranks them by efficiency." },
            { step: "III", title: "Choose your budget", body: "Three variants every time: League Start (1–5 div), Mid-tier (5–20 div), and High-end / BIS (20 div+)." },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--border-dim)",
                  lineHeight: 1,
                }}
              >
                {step}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.08em",
                  color: "var(--gold)",
                  fontWeight: 600,
                }}
              >
                {title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-24">
        <div
          className="arcane-card text-center py-14 px-8 flex flex-col items-center gap-5"
          style={{ background: "var(--bg-card)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "var(--gold-dim)",
            }}
          >
            ◈ &nbsp; FREE TO USE &nbsp; ◈
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              letterSpacing: "0.06em",
              color: "var(--text-primary)",
              maxWidth: 500,
              lineHeight: 1.25,
            }}
          >
            Stop guessing. Start crafting with precision.
          </h2>
          <Link href="/signup" className="btn-gold px-10 py-3 mt-2" style={{ textDecoration: "none", fontSize: "0.85rem" }}>
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-5 text-center"
        style={{
          borderColor: "var(--border-dim)",
          fontFamily: "var(--font-display)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          color: "var(--text-dim)",
        }}
      >
        POE2 CRAFTING ORACLE &nbsp;·&nbsp; PATCH {patch} &nbsp;·&nbsp; NOT AFFILIATED WITH GRINDING GEAR GAMES
      </footer>
    </main>
  );
}

function FeatureCard({
  glyph, title, desc, delay,
}: {
  glyph: string;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div className={`arcane-card animate-fade-up ${delay} p-6 flex flex-col gap-4`}>
      <span style={{ fontSize: "1.5rem", color: "var(--gold)", opacity: 0.7 }}>{glyph}</span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {title.toUpperCase()}
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
        {desc}
      </p>
    </div>
  );
}
