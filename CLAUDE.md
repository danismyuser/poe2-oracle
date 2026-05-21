# CLAUDE.md — Claude Code Instructions

You are continuing work on the **PoE2 Crafting Oracle**, a SaaS web app that produces accurate, patch-aware Path of Exile 2 crafting guides for players.

## Read these documents in order before doing anything

1. **`docs/instructions.md`** — the project heartbeat. Vision, objectives, game context, mod pool rules, route engine, budget variants, simulation spec, visualization spec, hard rules. **Section 13 contains the SaaS architecture and the MVP-first principle. Read this carefully.**
2. **`docs/data-sources.md`** — companion to instructions.md. Lists the external sources the Oracle is allowed to consult (craftofexile.com, poe2db.tw, official PoE2 trade site, official news forum) with fetch patterns, fallback rules, decision tree, and citation format.
3. **`docs/build-plan.md`** — the MVP step-by-step. Your task list for building the app, broken into phases with specific commands, file paths, and acceptance criteria.
4. **`docs/decisions-log.md`** — record of strategic decisions made so far and open questions. Append to this whenever a new decision is made.

## Your prime directive

Ship a working, accurate MVP **before** layering on payments, accounts, advanced learning analytics, or any premium features. The MVP exists to validate the Oracle produces correct crafting guides for real PoE2 players. Everything else waits.

## Hard rules — non-negotiable

- **Every LLM call in the app injects `docs/instructions.md` and `docs/data-sources.md` as system context.** Without them the Oracle is just a chatbot.
- **Every craft request and response is logged** to the `saved_crafts` table. No silent calls.
- **No payment logic in the MVP.** Stripe integration is deferred to v3.
- **Update `docs/instructions.md` first** whenever strategy changes. The heartbeat doc is the source of truth; code follows it, not the other way around.
- **Update `docs/decisions-log.md`** every time a new architectural or strategic decision is made.

## First action

Start with **`docs/build-plan.md` → Phase 0 (Prerequisites)**. Verify the user has:
- A Claude API key from https://console.anthropic.com
- Node.js 20+ installed (`node --version`)
- Git installed and a GitHub account
- A target hosting platform decided (Vercel recommended)

Prompt the user for anything missing before proceeding to Phase 1.

## When in doubt

- If a code change implies a strategy change, **pause and ask the user** before making it. Then update `docs/instructions.md` to reflect the new strategy before writing code.
- If a PoE2 game-mechanic detail is unclear, **fetch from poe2db.tw or craftofexile.com per `docs/data-sources.md`**. Do not guess.
- If the user describes a new feature not in `docs/instructions.md`, **propose adding it to the roadmap** (instructions.md section 14) before building it.

## Project context (1-line summary)

A commercial-bound SaaS website where PoE2 players configure a target item, receive optimal crafting routes with budget variants and simulations, and the system learns from collective craft data to improve over time. Built on Next.js + PostgreSQL + Claude API, deploying to Vercel + Railway.
