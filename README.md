# PoE2 Crafting Oracle

A patch-aware crafting advisor for Path of Exile 2. Configure a target item, get the optimal crafting route with budget variants, simulations, and visualizations.

## What this is

A SaaS web application that helps PoE2 players craft items efficiently. Instead of guessing or scrolling through wikis, players describe what they want and the Oracle produces:

- The ideal affix set for the goal
- Every viable crafting route compared (essence, chaos spam, omen combos, jawbone path, etc.) with cost estimates and determinism ratings
- Three budget variants per craft (league start / mid-tier / BIS)
- Simulations across N iterations to validate the route before spending real currency in-game
- Visualizations: probability bars, decision trees, cost distribution curves

The Oracle consults authoritative data sources (craftofexile.com, poe2db.tw, official PoE2 trade site) rather than relying on memory, and is patch-aware — it detects when patch notes change and refreshes its knowledge.

## Repository structure

```
poe2-oracle-mvp/
├── CLAUDE.md                # Claude Code's working instructions — read first if using Claude Code
├── README.md                # This file
├── .env.example             # Environment variable template
├── .gitignore               # Standard Next.js gitignore
└── docs/
    ├── instructions.md      # Project heartbeat — vision, rules, architecture
    ├── data-sources.md      # External source catalog and fetch protocol
    ├── build-plan.md        # MVP step-by-step build roadmap
    └── decisions-log.md     # Strategic decisions and open questions
```

## Where to start

- **Building the app:** read `CLAUDE.md`, then follow `docs/build-plan.md` starting at Phase 0.
- **Understanding the product:** read `docs/instructions.md`. Section 1 covers vision; sections 2–12 cover the Oracle's behaviour and constraints; sections 13–14 cover deployment strategy and roadmap.
- **Understanding data flow:** read `docs/data-sources.md`. It defines exactly which external URLs the Oracle is allowed to consult and when.
- **Tracking decisions:** `docs/decisions-log.md` is the running record of choices made and open questions.

## Tech stack (MVP)

- **Frontend + Backend:** Next.js (App Router) + TypeScript
- **Database:** PostgreSQL (managed via Prisma ORM)
- **LLM:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Auth:** Email + password with bcrypt + JWT (MVP); OAuth later
- **Hosting:** Vercel (app) + Railway/Render (database)
- **Payments:** Deferred to v3 (not in MVP)

## Status

**MVP phase.** Goal is a working, accurate Oracle before any payment, advanced learning analytics, or premium tier features. See `docs/instructions.md` section 13 for the MVP-first principle.

## License

TBD — proprietary for now, may open-source non-Oracle components later.
