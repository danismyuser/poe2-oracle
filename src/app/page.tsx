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
        className="flex flex-col items-center text-center px-6 py-24"
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        {/* Patch pill */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
          style={{
            background: "var(--gold-bg)",
            border: "1px solid var(--border-gold)",
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "var(--text-gold)",
          }}
        >
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--gold)",
            display: "inline-block",
            animation: "dot-pulse 2.5s ease-in-out infinite",
          }} />
          PATCH {patch} · THE LAST OF THE DRUIDS
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1.15,
            color: "var(--text-primary)",
            maxWidth: 680,
            marginBottom: "1.25rem",
          }}
        >
          The PoE2 Crafting{" "}
          <span style={{ color: "var(--gold)" }}>Oracle</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-200"
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            maxWidth: 500,
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          Describe any item. Get the optimal crafting route, three budget
          variants, and patch-accurate advice — drawn from real game data,
          not guesswork.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex gap-3 justify-center flex-wrap">
          <Link href="/signup" className="btn-primary px-8 py-3">
            Start Crafting Free
          </Link>
          <Link href="/login" className="btn-secondary px-6 py-3">
            Log In
          </Link>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────────────────── */}
      <section className="container-lg py-16">
        <p className="section-label text-center mb-10">What the Oracle does</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "⚗",
              title: "Ask Anything",
              body: "Describe your target item in plain language. The Oracle extracts your intent and generates a full crafting plan with route comparison.",
              delay: "delay-100",
            },
            {
              icon: "⚙",
              title: "Configure & Simulate",
              body: "Select your base, item level, and target affixes. Every viable route ranked by efficiency and determinism across three budget tiers.",
              delay: "delay-200",
            },
            {
              icon: "◉",
              title: "Always Patch-Aware",
              body: "Pulls live data from craftofexile.com and poe2db.tw. Flags when advice is based on cached data and offers a one-click refresh.",
              delay: "delay-300",
            },
          ].map(({ icon, title, body, delay }) => (
            <div
              key={title}
              className={`card animate-fade-up ${delay} p-6 flex flex-col gap-3`}
            >
              <span style={{ fontSize: "1.4rem", color: "var(--gold)" }}>{icon}</span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {title.toUpperCase()}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: 1.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Budget tiers ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container-lg py-16">
          <p className="section-label text-center mb-10">Every response includes three budget variants</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "League Start", range: "1–5 div", desc: "Affordable and functional. One or two tier drops to keep it reachable at day one prices." },
              { label: "Mid-tier", range: "5–20 div", desc: "The solid finished version. 2–3 T1/T2 affixes, the rest T2/T3. Best bang for your investment." },
              { label: "High-end / BIS", range: "20–50 div+", desc: "Best in slot. All T1, with Defiled or corruption layered on top where it fits." },
            ].map(({ label, range, desc }) => (
              <div key={label} className="card-gold p-5 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      color: "var(--text-gold)",
                      fontWeight: 600,
                    }}
                  >
                    {label.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      color: "var(--gold)",
                      background: "var(--gold-bg)",
                      padding: "0.1rem 0.5rem",
                      borderRadius: 4,
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    {range}
                  </span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="container-md py-20 text-center">
        <p className="section-label mb-4">Free to use</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: "1.5rem",
          }}
        >
          Stop guessing. Start crafting with precision.
        </h2>
        <Link href="/signup" className="btn-primary px-10 py-3">
          Consult the Oracle — Free
        </Link>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border-light)" }}>
        <div
          className="container-lg py-5 flex items-center justify-between flex-wrap gap-2"
          style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.12em" }}>
            ◈ &nbsp;POE2 CRAFTING ORACLE
          </span>
          <span>Patch {patch} · Not affiliated with Grinding Gear Games</span>
        </div>
      </footer>
    </main>
  );
}
