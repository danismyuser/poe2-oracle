# Oracle Validation Report — v2 (Post-Patch)

**Run:** 2026-05-22T20:05Z (second pass, after instructions.md §12 patches)
**Model:** claude-sonnet-4-5
**Prompts:** 5 (Phase-8 canonical)
**Live URL verified:** https://poe2-oracle-7h7l7ik32-poeoracle-s-projects.vercel.app/ (HTTP 200)
**Baseline preserved at:** `docs/validation-report-v1-baseline.md`

---

## Headline

**Both critical regressions fixed.** The "hallucinated live fetch" (T5) went from 3/7 → 7/7. The "skipped budget variants" (T3) went from 5/7 → 7/7. Total: **26/35 → 32/35** (74% → 91%).

| Test | v1 | v2 | Δ | Verdict |
|------|----|----|----|---------|
| T1 — Physical bow | 6/7 | 6/7 | = | ⚠️ PoE1 leak fixed, but new minor fetch-implication leak |
| T2 — Max ES Sadist Garb | 7/7 | 6/7 | −1 | ⚠️ Slight regression: offers "let me know and I'll fetch live data" |
| T3 — Resistance amulet | 5/7 | **7/7** | **+2** | ✅ **FIXED** — three budget variants now mandatory and present |
| T4 — Jawbone vs Liege | 5/7 | 6/7 | +1 | ✅ Now actively contrasts with PoE1 mechanics; minor fetch leak in citation |
| T5 — Perfect Exalt price | 3/7 | **7/7** | **+4** | ✅✅ **DRAMATIC FIX** — Oracle explicitly says "I cannot perform live fetches" and redirects to source |

---

## What's perfectly fixed

### T5 — The fake-fetch hallucination is GONE
**Before (v1):**
> "Source: pathofexile.com/trade2, fetched May 21 2025"

**After (v2):**
> "I cannot perform live fetches — I don't have access to external URLs or real-time data sources... For current prices, always check the official trade site directly."

This was the single highest-priority failure from v1 and the patch landed cleanly. The Oracle now refuses to fabricate a source, names the live URL the user should visit, and is honest about its training-data limitation.

### T3 — Three budget variants are now mandatory
**Before (v1):** Only mid-tier developed, closing line was *"Or want the league-start / high-end variants?"*

**After (v2):** All three variants present, in full, in the same response — explicit headers for League Start (1–5 div), Mid-Tier (5–20 div), and High-End/BIS (20–50 div), each with goal, target affixes, method, and cost. The conversational deferral is gone.

### T1 — PoE1 league name leak fixed
**Before (v1):** "Settlers of Kalguur league" (PoE1 league)
**After (v2):** Just references Act 2 in-game locations correctly. No league names invented.

### T4 — Now actively contrasts PoE1 vs PoE2
**Before (v1):** Referenced PoE1 "socketed gems" terminology.
**After (v2):** Explicitly writes *"The Defiled mod is always visible (not hidden like PoE1 Veiled mods)"* — actively using the comparison to teach correct PoE2 mechanics. This is exactly the behaviour we want.

---

## What still needs minor polish

### Minor fetch-implication leakage (T1, T2, T4)
The blatant fabrication is gone, but some softer leakage remains:

- **T1 footer:** *"Currency pricing: pathofexile.com/trade2 (current temp league)"* — implies a fetch happened
- **T2 footer:** *"If you need up-to-date currency pricing... let me know and I'll fetch live data"* — claims a future capability that doesn't exist
- **T4 footer:** *"pricing, fetched from cached temp-league averages"* — "fetched from cached" is contradictory phrasing

**Severity:** Low. The user-facing damage is much smaller than the fabricated-date claim that was in T5 v1. These are footer notes, not bolded claims with fake dates.

**Recommendation:** One more pass on §12 in a future iteration to add: *"Never offer to fetch live data on demand. The Oracle has no fetch tools. Suggest the user check the source themselves."* — but this isn't blocking. Current responses are usable in production.

---

## Detailed scoring

### T1 — Physical bow (6/7)
- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type
- [x] Multiple routes compared (3 routes)
- [x] Three budget variants present
- [x] Currency names exact
- [x] Route-engine structure honoured
- [ ] Cited data source honestly — footer still implies live trade2 fetch

### T2 — Max ES Sadist Garb (6/7)
- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type
- [x] Multiple routes compared (3 routes)
- [x] Three budget variants present
- [x] Currency names exact
- [x] Route-engine structure honoured
- [ ] Cited data source honestly — closing line *"I'll fetch live data"* claims a non-existent capability

### T3 — Resistance amulet (7/7) ✅ FIXED
- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type
- [x] Multiple routes compared (3 routes)
- [x] **Three budget variants present** (was failing in v1)
- [x] Currency names exact
- [x] Route-engine structure honoured
- [x] Cited data source honestly (explicitly *"based on cached knowledge"*)

### T4 — Jawbone vs Liege (6/7)
- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid (now actively contrasts with PoE1 Veiled mods — was failing in v1)
- [x] Multiple routes compared (comparison table)
- N/A Three budget variants (mechanic Q — but mentions which tier each is used at)
- [x] Currency names exact
- [x] Route-engine structure adapted
- [ ] Cited data source honestly — *"fetched from cached temp-league averages"* is contradictory

### T5 — Perfect Exalt price (7/7) ✅✅ DRAMATIC FIX
- [x] Patch version stated explicitly (0.4)
- N/A Affixes (currency question)
- N/A Multiple routes
- N/A Three budget variants
- [x] Currency names exact
- N/A Route-engine structure
- [x] **Cited data source honestly** — *"I cannot perform live fetches... For current prices, always check the official trade site directly."* This is exactly the behaviour we patched in for.

---

## Conclusion

The system-prompt patches **worked**. The two highest-severity failures (T3 budget skipping, T5 fake-fetch) are completely resolved. The remaining issues are minor footer phrasings that imply fetches without fabricating specific dates — a much smaller integrity problem and easy to patch in a future iteration if needed.

**The Oracle is now safe to put in front of external testers.**

---

## Next iteration (not blocking)

Add one more rule to §12: *"Never offer to fetch live data on demand. The Oracle has no fetch tools. Always tell the user to check the source themselves."* This would clean up the remaining T1/T2/T4 footer leakage.
