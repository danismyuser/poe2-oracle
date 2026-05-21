# PoE2 Crafting Oracle — MVP Build Plan

This is the step-by-step roadmap for building the MVP. Work through phases in order. Each phase has an **acceptance criteria** checklist — don't move to the next phase until the current one passes.

Update `docs/decisions-log.md` whenever a new architectural decision is made during a phase.

---

## Phase 0 — Prerequisites (before any code)

Verify the user has:

- [ ] **Claude API key** from https://console.anthropic.com (needs at least $5 in credit)
- [ ] **Node.js 20+** installed (`node --version` should print v20.x.x or higher)
- [ ] **Git** installed (`git --version`)
- [ ] **GitHub account** with a new empty repo ready to push to
- [ ] **Vercel account** (free tier OK) — sign up at https://vercel.com
- [ ] **Railway or Render account** (free tier OK) — for PostgreSQL hosting

If any of these are missing, prompt the user and pause before proceeding.

### Acceptance criteria
All checkboxes above are ticked. The user has the Claude API key copied to clipboard (don't ask them to paste it — they'll add it to `.env.local` in Phase 4).

---

## Phase 1 — Scaffold the project

### Commands

```bash
npx create-next-app@latest poe2-oracle \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint

cd poe2-oracle
git init
git add .
git commit -m "Initial Next.js scaffold"
```

### Then add the project context

Copy `CLAUDE.md`, `README.md`, `.env.example`, `.gitignore` (merge with Next.js default), and the entire `docs/` folder from the context bundle into the project root.

### Folder structure to establish

```
poe2-oracle/
├── CLAUDE.md
├── README.md
├── .env.example
├── .env.local              # NOT committed; create from .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── docs/
│   ├── instructions.md
│   ├── data-sources.md
│   ├── build-plan.md
│   └── decisions-log.md
├── prisma/
│   └── schema.prisma       # added in Phase 2
└── src/
    ├── app/                # Next.js App Router pages + API routes
    ├── components/         # React components
    ├── lib/                # Shared utilities (db client, claude client, auth helpers)
    └── types/              # TypeScript types
```

### Acceptance criteria

- [ ] `npm run dev` starts the Next.js dev server on port 3000 without errors
- [ ] Visiting `http://localhost:3000` shows the default Next.js landing page
- [ ] `docs/` folder is in place with all four files
- [ ] First commit is on `main` branch

---

## Phase 2 — Database setup

### Commands

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

### Provision the database

1. Log into Railway (https://railway.app) or Render
2. Create a new PostgreSQL instance (free tier)
3. Copy the connection string (looks like `postgresql://user:pass@host:port/dbname`)
4. Paste into `.env.local` as `DATABASE_URL=...`

### Schema

Write `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String        @id @default(cuid())
  email        String        @unique
  passwordHash String
  createdAt    DateTime      @default(now())
  savedCrafts  SavedCraft[]
  attempts     CraftAttempt[]
}

model SavedCraft {
  id           String        @id @default(cuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemType     String        // e.g. "bow", "helmet"
  base         String        // e.g. "Expert Spine Bow"
  ilvl         Int
  affixes      Json          // structured: { prefixes: [...], suffixes: [...] }
  budget       String        // "league-start" | "mid" | "high" | "mirror"
  question     String?       // for Ask Oracle saves; null for Configure-tab saves
  response     String        // full LLM response markdown
  routeChosen  String?       // method name of recommended route
  costEstimate String?       // e.g. "6-14 div"
  patchVersion String        // e.g. "0.4"
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  attempts     CraftAttempt[]

  @@index([userId, createdAt])
}

model CraftAttempt {
  id             String      @id @default(cuid())
  userId         String
  user           User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  craftId        String
  craft          SavedCraft  @relation(fields: [craftId], references: [id], onDelete: Cascade)
  success        Boolean
  currencySpent  String      // e.g. "12 div"
  notes          String?
  createdAt      DateTime    @default(now())

  @@index([craftId])
}

model PatchCache {
  version      String    @id   // e.g. "0.4"
  lastChecked  DateTime  @default(now())
  modPools     Json      // cached affix data per item type
  notes        String?
}
```

### Run migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Create the Prisma client singleton

Create `src/lib/db.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Acceptance criteria

- [ ] `npx prisma migrate dev` runs without errors
- [ ] Tables `User`, `SavedCraft`, `CraftAttempt`, `PatchCache` exist in the database
- [ ] `npx prisma studio` opens and shows the four empty tables
- [ ] `src/lib/db.ts` exports a working Prisma client

---

## Phase 3 — Authentication (minimal)

### Install dependencies

```bash
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### Add to `.env.local`

```
JWT_SECRET=<generate a 32-character random string>
```

Generate with `openssl rand -base64 32` or any random string generator.

### Auth helpers

Create `src/lib/auth.ts`:

- `hashPassword(plain: string): Promise<string>`
- `verifyPassword(plain: string, hash: string): Promise<boolean>`
- `signToken(userId: string): string`
- `verifyToken(token: string): { userId: string } | null`
- `getUserFromCookie(req): Promise<User | null>` — reads `auth-token` cookie and returns the user

### Auth endpoints

- **POST `/api/auth/signup`** — `{ email, password }` → creates User, returns JWT in httpOnly cookie
- **POST `/api/auth/login`** — `{ email, password }` → verifies, returns JWT
- **POST `/api/auth/logout`** — clears the cookie
- **GET `/api/auth/me`** — returns current user or 401

### Auth UI

- `/signup` page — form, calls `/api/auth/signup`, redirects to `/dashboard` on success
- `/login` page — form, calls `/api/auth/login`, redirects to `/dashboard` on success
- Layout includes auth-aware nav (Login/Sign Up vs Dashboard/Logout)

### Acceptance criteria

- [ ] Can sign up a new user via UI; record appears in `User` table
- [ ] Can log out, then log back in with the same credentials
- [ ] `/api/auth/me` returns the user when authenticated, 401 when not
- [ ] Wrong password returns 401 with a clear error
- [ ] Passwords are bcrypt-hashed (never stored plaintext)

---

## Phase 4 — Claude API integration

### Install SDK

```bash
npm install @anthropic-ai/sdk
```

### Add to `.env.local`

```
CLAUDE_API_KEY=<your key from console.anthropic.com>
```

### Create the Oracle wrapper

Create `src/lib/oracle.ts`:

```typescript
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY! });

// Load instructions + data-sources docs ONCE at module init
const docsDir = path.join(process.cwd(), "docs");
const INSTRUCTIONS = fs.readFileSync(path.join(docsDir, "instructions.md"), "utf-8");
const DATA_SOURCES = fs.readFileSync(path.join(docsDir, "data-sources.md"), "utf-8");

const SYSTEM_PROMPT = `You are the PoE2 Crafting Oracle. Follow these documents exactly:

# instructions.md
${INSTRUCTIONS}

# data-sources.md
${DATA_SOURCES}

Begin every response leading with the answer. Never preamble. Use the route-comparison and budget-variant structure consistently. Cite sources when a number comes from a live fetch.`;

export async function askOracle(userPrompt: string): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b: any) => b.text)
    .join("\n");

  return text;
}
```

**Critical:** the instructions and data-sources docs MUST be injected on every call. If `docs/` is missing or the files aren't read, the Oracle becomes a generic chatbot and the entire product premise breaks.

### Acceptance criteria

- [ ] `askOracle("test ping")` returns a coherent response in dev console
- [ ] Response cost is logged or visible in the Anthropic dashboard
- [ ] If `CLAUDE_API_KEY` is missing, the app fails fast with a clear error (not a silent fallback)

---

## Phase 5 — Core API endpoints

### POST `/api/ask`

Free-form question endpoint.

**Request:** `{ question: string }` (user must be authenticated)
**Behaviour:**
1. Verify auth cookie → get userId
2. Call `askOracle(question)`
3. Save to `SavedCraft` table with `question` field populated, `itemType`/`base` set to "free-form"
4. Return `{ id, response }`

### POST `/api/simulate`

Configured craft endpoint.

**Request:**
```json
{
  "itemType": "bow",
  "base": "Expert Spine Bow",
  "ilvl": 82,
  "affixes": { "prefixes": [...], "suffixes": [...] },
  "budget": "mid"
}
```

**Behaviour:**
1. Verify auth → userId
2. Build a structured prompt from the config (use the same template the in-Claude widget used: item details + budget + affix targets)
3. Call `askOracle(structuredPrompt)`
4. Save to `SavedCraft` with all fields populated, `question` null
5. Return `{ id, response }`

### GET `/api/saved-crafts`

Returns the authenticated user's saved crafts, ordered by `createdAt DESC`. Paginate at 50 per page.

### GET `/api/saved-crafts/:id`

Returns a single saved craft. Verify ownership before returning.

### DELETE `/api/saved-crafts/:id`

Deletes a saved craft. Verify ownership.

### POST `/api/craft-attempts`

Records a real-world craft attempt outcome (the learning dataset).

**Request:** `{ craftId, success, currencySpent, notes? }`
**Behaviour:** create `CraftAttempt` row. Verify the craft belongs to the user.

### POST `/api/refresh-patch` (manual trigger for MVP)

Triggers a patch check.

**Behaviour:**
1. Fetch the official PoE2 news forum URL (from `docs/data-sources.md`)
2. Extract the latest patch version
3. If newer than the latest `PatchCache.version`, create a new `PatchCache` entry (modPools can stay empty initially — will populate in v1.1)
4. Return the latest patch version

### Acceptance criteria

- [ ] Each endpoint above works via `curl` or Postman with a valid auth cookie
- [ ] Unauthenticated requests get 401
- [ ] All Oracle calls write to `SavedCraft`
- [ ] No silent failures — errors return clear JSON

---

## Phase 6 — Frontend UI

### Pages to build

#### `/` (Home — public landing)

- Hero: "The PoE2 Crafting Oracle" + one-line value prop
- Three feature cards:
  - "Ask anything" — describe an item, get a full crafting plan
  - "Configure & simulate" — pick base + affixes + budget, get routes ranked by efficiency
  - "Always patch-aware" — consults craftofexile.com and poe2db.tw, never out of date
- CTA: "Sign up free" → `/signup`
- Footer with patch status (current cached patch version)

#### `/signup` and `/login`

Built in Phase 3. Style with Tailwind, keep them clean and simple.

#### `/dashboard` (authenticated, three-tab layout)

**Tab 1: "Ask the Oracle"**
- Large text area
- Submit button
- Response area below, rendered as markdown
- "Save this craft" button (auto-saves but allows naming/tagging)
- "Re-run with refresh" button — calls `/api/ask` again but appends "Please refresh against the latest patch" to the prompt

**Tab 2: "Configure & Simulate"**
- Class dropdown → loads bases for that class
- Base dropdown → from base list per class
- iLvl dropdown
- Budget pill selector (league-start / mid / high / mirror)
- Up to 3 prefix slots + 3 suffix slots, each with affix dropdown + tier dropdown (mods filtered to item-type per `docs/instructions.md` section 5)
- Item preview card (live update as user configures)
- "Generate guide" button → calls `/api/simulate`
- Response area below

**Tab 3: "Saved Crafts"**
- List of past crafts, newest first
- Each item: short summary (item type + base + budget + date)
- Click to expand and view the full response
- Per-item buttons: "Log a craft attempt" (opens form for `success`/`currencySpent`/`notes`) and "Delete"

### Components to build

- `<Layout>` — top nav with logo/title + auth-aware right side (login/signup or dashboard/logout)
- `<MarkdownRenderer>` — renders the Oracle's markdown responses (use `react-markdown`)
- `<AffixSelector>` — the prefix/suffix dropdown + tier dropdown unit, reused 6 times
- `<ItemPreview>` — the live item card
- `<Tab>` and `<TabPanel>` — simple tabbed layout
- `<LoadingSpinner>` — for the "Oracle is thinking..." state

### Affix data

Embed the mod pool tables (from earlier work) as a TypeScript constant in `src/lib/affix-data.ts`. Structure:

```typescript
export const BASES: Record<string, string[]> = { ... };
export const MODS: Record<string, { prefixes: AffixDef[]; suffixes: AffixDef[] }> = { ... };
export const ALIAS: Record<string, string> = { sword1h: "_melee", ... };

export function getModPool(itemClass: string) { ... }
```

This way the affix UI logic is identical to the in-Claude widget but lives in the codebase. Copy the data structures from the widget code in the project context if available.

### Acceptance criteria

- [ ] Home page renders, signup CTA works
- [ ] Dashboard requires auth (unauthenticated → redirect to `/login`)
- [ ] Ask tab: question goes in, full markdown response comes out, saves to DB
- [ ] Configure tab: full item config produces a full crafting guide
- [ ] Saved tab: shows past crafts, can click to expand, can delete
- [ ] All three tabs work without page reload (client-side routing)

---

## Phase 7 — Deploy

### Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/poe2-oracle.git
git branch -M main
git push -u origin main
```

### Deploy to Vercel

1. Log into Vercel
2. "Add New Project" → import the GitHub repo
3. **Environment variables** (paste these in Vercel dashboard):
   - `CLAUDE_API_KEY`
   - `DATABASE_URL` (the Railway/Render Postgres URL)
   - `JWT_SECRET`
4. Click Deploy

### Post-deploy checks

- [ ] Visit the Vercel URL — home page loads
- [ ] Sign up a new user on the live site
- [ ] Run an Ask Oracle query — response comes back
- [ ] Check the Postgres database (via Railway dashboard or `prisma studio` with the prod URL) — user and saved craft exist

### Acceptance criteria

- [ ] Live URL works end-to-end
- [ ] No environment variables leaked in client bundle (check Vercel build logs)
- [ ] All three tabs functional on live

---

## Phase 8 — Test, validate, iterate

### Internal validation

Run these test prompts against the live Oracle and review each response against `docs/instructions.md`:

1. **Free-form (cached knowledge):** "How do I craft a high physical damage bow on a mid-tier budget?"
2. **Different item class:** "Best deterministic route to max ES on Sadist Garb"
3. **Jewellery:** "Mid-tier resistance amulet route"
4. **Niche mechanic:** "When should I use Ancient Jawbone vs Omen of the Liege?"
5. **Refresh trigger:** "Refresh — what's the current price of a Perfect Exalted Orb?"

For each response, verify:

- Patch is stated explicitly (0.4)
- Affixes suggested are valid for the item type (no impossible mods)
- Multiple routes compared, not just one
- Three budget variants present
- Currency names exact (`Greater Chaos Orb`, not "GCO" or "greater chaos")
- Hard rules from instructions.md section 12 are honoured
- If a craft references something new, the Oracle offers to refresh

### When you find an error

Patch `docs/instructions.md` first (the heartbeat-first principle from `CLAUDE.md`), then redeploy. The Oracle's behaviour changes because the system prompt changes.

### Invite testers

Once the five internal tests pass, invite 2–3 PoE2 players you trust to use the live site. Track:

- Crafts they configure (in the DB automatically)
- Outcomes when they craft in-game (use the "Log a craft attempt" button)
- Bugs or wrong recommendations (Discord/email/whatever)

### Acceptance criteria

- [ ] All five internal tests pass
- [ ] At least 2 external testers have run 5+ crafts each
- [ ] No critical accuracy bugs open
- [ ] DB has accumulated 50+ saved crafts and 10+ craft attempts (the seed dataset for v1.1)

---

## What comes AFTER the MVP

These are NOT part of the MVP. Note them in `docs/decisions-log.md` as deferred work, but do not build them yet.

- **v1.1 — Live data integration:** automated fetches of craftofexile mod weights, official trade prices, daily cron for patch detection
- **v1.2 — Runeforging:** when patch 0.5 lands (May 29 2026), add Runeforging to the route catalog
- **v2 — Sharing & multi-item:** export crafts as shareable URLs, gear-set planner for all 12 slots
- **v3 — Commercial phase:** Stripe payments, free vs premium tiers, usage limits, premium-only features like collective-learning insights and live currency tickers

The current MVP exists solely to prove the Oracle produces correct, useful crafting guides. Resist the urge to scope-creep.

---

## Heartbeat-first principle (repeated for emphasis)

If you find yourself wanting to make a strategic change — switch the LLM provider, add a feature, change the data model — **update `docs/instructions.md` first**. The doc drives the code. Never the reverse.

Then update `docs/decisions-log.md` with the rationale.

Then write the code.
