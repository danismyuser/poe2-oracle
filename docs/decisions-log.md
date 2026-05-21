# Decisions Log

Running record of strategic and architectural decisions made on the PoE2 Crafting Oracle project. Append new entries below; never delete old ones (overrule with a follow-up entry instead).

When a decision changes, the new entry references the old one (e.g. "supersedes 2026-05-21 entry on distribution model").

Format: `## YYYY-MM-DD — [Decision title]`

---

## 2026-05-21 — Distribution model: web app

**Decision:** Ship the Oracle as a hosted web application accessible from any browser. Not a desktop download, not an in-Claude artifact.

**Rationale:** Maximises reach (any PoE2 player can use it without installing anything), simplifies update distribution (push once, all users see the change), and matches the long-term commercial direction.

**Alternatives considered:**
- Desktop app (Electron / Tauri) — rejected: distribution friction, harder to push patch updates
- In-Claude project artifact — rejected: limited to Claude users only, no path to monetisation

---

## 2026-05-21 — End-user model: commercial SaaS

**Decision:** Build for a commercial PoE2 community audience. Free tier for general use, premium tiers for power features (paywall deferred to v3, post-MVP).

**Rationale:** Validates the product with a real audience before monetising. Free tier proves the Oracle is useful; premium features (advanced learning insights, live ticker, gear-set planning, etc.) become the upsell.

**Implication:** MVP must be friendly to anonymous-ish first-time visitors (low signup friction) and produce demonstrably accurate results that justify a future paywall.

---

## 2026-05-21 — Learning system: yes, collective improvement

**Decision:** Every craft request, response, and reported in-game outcome is logged. The dataset feeds back into refining the Oracle's recommendations over time.

**Rationale:** PoE2 crafting has known optimal strategies that drift with patches and community discoveries. A learning loop lets the Oracle improve faster than any individual player could on their own.

**MVP scope:** Just collect the data. Don't build the learning pipeline yet — that's v1.1+. The `CraftAttempt` table seeds the future dataset.

**Privacy:** Users are identifiable in their own data (account-based), but any analytics or learning derived from the collective dataset must be anonymised. This needs a privacy policy when payments are added in v3.

---

## 2026-05-21 — LLM backend: Anthropic Claude API

**Decision:** Use Claude (specifically `claude-sonnet-4-20250514` for MVP) as the sole LLM backend.

**Rationale:** Strong step-by-step reasoning, reliable instruction-following (essential for the heartbeat-doc pattern), and the project was built up in Claude. No fallback to another provider in MVP — simpler to debug, simpler to budget.

**Reconsider when:** scaling beyond ~1000 daily Oracle calls, or when a cheaper model proves equivalent quality on a held-out test set.

---

## 2026-05-21 — Tech stack: Next.js + PostgreSQL + Vercel + Railway

**Decision:**
- **Framework:** Next.js (App Router) with TypeScript and Tailwind
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Email + password + bcrypt + JWT in httpOnly cookie (MVP); OAuth later
- **App hosting:** Vercel (free tier)
- **DB hosting:** Railway or Render (free tier)
- **Payments:** None in MVP; Stripe planned for v3

**Rationale:** Single codebase (frontend + API routes co-located), zero-config deployment to Vercel, Prisma's type-safe queries, free-tier hosting sufficient to validate MVP.

**Alternatives considered:**
- Vue + Python (FastAPI) — rejected: more moving parts, slower iteration for a solo MVP
- Firebase/Supabase — rejected: vendor lock-in concerns at scale, prefer raw Postgres
- Stripe in MVP — rejected: payment compliance, tax handling, and account verification slow down MVP launch

---

## 2026-05-21 — MVP-first principle

**Decision:** Ship a working, accurate Oracle before any premium features, payments, or advanced learning analytics.

**Rationale:** The Oracle's value depends entirely on whether its recommendations are correct. Building payments on top of a Oracle that gives bad advice destroys credibility. Validate accuracy with real users first, monetise second.

**Concretely deferred to post-MVP:**
- Stripe / payment processing
- Free vs premium tier differentiation
- Usage limits / rate limiting on free tier
- The learning pipeline that mines `CraftAttempt` data
- Live currency price tickers in the UI
- Automated patch-detection cron jobs
- Gear-set planner (multi-item)
- Share/export functionality

---

## 2026-05-21 — Heartbeat-first principle

**Decision:** `docs/instructions.md` is the source of truth for the Oracle's behaviour and the project's strategy. When something changes, the heartbeat doc is updated FIRST. Code follows the doc.

**Rationale:** The Oracle's quality is determined by its system prompt. If the doc drifts from the code, the Oracle becomes inconsistent or wrong. Keeping the doc canonical forces deliberate strategy changes.

**Process for changes:**
1. Update `docs/instructions.md`
2. Append entry to `docs/decisions-log.md`
3. Update code to match
4. Test the Oracle against the new behaviour

---

## 2026-05-21 — Patch awareness as a hard feature

**Decision:** The Oracle must explicitly state the patch its advice targets, and offer to refresh when cached knowledge may be stale. Patch detection uses the official PoE2 news forum.

**Rationale:** PoE2 crafting changes substantively between patches. An out-of-date Oracle is worse than no Oracle — it misleads players into wasting currency.

**MVP implementation:** Manual refresh button (`POST /api/refresh-patch`). User clicks when they want to verify the cache. Automated daily cron deferred to v1.1.

---

## 2026-05-21 — Enforce PoE2-only data: mandatory ?game=poe2 parameter

**Decision:** All references to craftofexile.com throughout docs, code, and the Oracle system prompt must use the full URL `https://www.craftofexile.com/?game=poe2`. The `?game=poe2` query parameter is mandatory — omitting it loads PoE1 data. The system prompt now contains an explicit CRITICAL block forbidding PoE1 mod pools, PoE1 currency names, and any PoE1 mechanics from appearing in Oracle responses.

**Rationale:** During Phase 8 testing the Oracle was observed drawing on PoE1 knowledge (mod names, currency names, mechanics that don't exist in PoE2). The root cause was that short-form `craftofexile.com` references in the docs and system prompt did not include `?game=poe2`, allowing the model to default to its PoE1 training data.

**Implication:** The system prompt now explicitly labels the `?game=poe2` parameter as mandatory and warns that PoE1 data must never substitute for PoE2 data.

---

## Open questions (unresolved as of 2026-05-21)

These need answers before the relevant phase of `docs/build-plan.md` can complete.

| Question | Blocks phase | Notes |
|---|---|---|
| Does the user have a Claude API key yet? | Phase 0 | If not, sign up at console.anthropic.com (needs $5 credit minimum) |
| User's familiarity with Next.js / TypeScript? | Phase 1+ | If low, Claude Code should be more verbose with explanations and confirm each step |
| Timeline / deadline for live MVP? | Affects pacing across phases | Default assumption: 1-2 weeks of focused work |
| Domain name for the live site? | Phase 7 | Vercel provides `*.vercel.app` by default; custom domain optional |
| What's the project name for marketing? | Phase 6 home page | Currently "PoE2 Crafting Oracle" — may want something snappier before public launch |

---

## Template for future entries

```
## YYYY-MM-DD — [Short title of the decision]

**Decision:** [What was decided in one or two sentences.]

**Rationale:** [Why this over alternatives. Cite the alternatives explicitly.]

**Implication:** [What this means for the build / for users / for cost.]

**Supersedes:** [If applicable, link to the earlier decision being overruled.]
```
