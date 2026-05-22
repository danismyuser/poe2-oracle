# Oracle Validation Report — Phase 8

**Run:** 2026-05-22
**Model:** claude-sonnet-4-5
**Prompts:** 5 (from `docs/build-plan.md` Phase 8)
**Scoring:** Manual, against the rubric in section 12 of `docs/instructions.md`

---

## Summary

| Test | Title | Score | Verdict |
|------|-------|------:|---------|
| T1 | Free-form: mid-tier physical bow | **6 / 7** | ⚠️ PASS with caveat |
| T2 | Different item class: max ES on Sadist Garb | **7 / 7** | ✅ CLEAN |
| T3 | Jewellery: mid-tier resistance amulet | **5 / 7** | ❌ FAIL |
| T4 | Niche mechanic: Ancient Jawbone vs Omen of the Liege | **5 / 7** | ⚠️ PARTIAL |
| T5 | Refresh trigger: current price of Perfect Exalted Orb | **3 / 7** | ❌ FAIL |

**Overall verdict:** The Oracle is **mostly accurate but has three reproducible failure patterns** that need to be fixed in `docs/instructions.md`. The system prompt is the right place — not the code.

---

## Failure patterns identified

### Pattern 1 — Hallucinated live fetches (T5, critical)
T5 response: *"Source: pathofexile.com/trade2, fetched May 21 2025"*

The Oracle fabricated a fetch that never happened, with a wrong date (2025 instead of 2026). The system does not currently have live-fetch tool capability — every response is built from training data + the system prompt. Claiming a live fetch is dishonest and undermines the product's core promise.

**Fix:** Add explicit rule against fabricating fetches. Until tool-use is wired up (v1.1), the Oracle must say "based on cached training knowledge" when it has no live source.

### Pattern 2 — Skipping budget variants (T3, high)
T3 only developed the mid-tier variant in detail, then asked at the end: *"Need a simulation run to validate expected attempts? Or want the league-start / high-end variants?"*

The instruction in section 7 says **every craft request** gets three variants. The Oracle decided to be conversational instead of complete.

**Fix:** Reinforce — three budget variants are **mandatory on every craft request**, no exceptions, no "let me know if you want them."

### Pattern 3 — Occasional PoE1 leakage (T1, T4, medium)
T1 mentioned *"Settlers of Kalguur league"* — that league is from PoE1, doesn't exist in PoE2.
T4 referenced *"+1 to level of socketed gems"* — PoE2 changed the gem system; "socketed gems" terminology is PoE1.

These are rare leakages but they do happen. The system prompt currently lists currency-name examples to avoid; we need to extend that to league names and mechanic terminology.

---

## What's working well

- **Currency names are consistently correct PoE2** across all 5 tests — Greater Chaos Orb, Perfect Exalted Orb, Omen of Sinistral Erasure, Hinekora's Lock, etc. No "Chaos Orb" or "Exalted Orb" by themselves.
- **Mod pool knowledge** for bows (T1), INT body armour (T2), and amulets (T3) is solid and seems base-appropriate.
- **Route comparison structure** is well-followed when the Oracle remembers it — T1 and T2 are textbook examples.
- **Patch awareness** is universal — all 5 responses state patch 0.4 explicitly, and several offer a refresh path for the upcoming 0.5.
- **Citation discipline** is present when the Oracle isn't fabricating — T2 correctly cites `craftofexile.com/?game=poe2`.

---

## Detailed scoring

### T1 — Free-form: mid-tier physical bow — 6/7

- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type (bow-appropriate mods)
- [x] Multiple routes compared (3 routes)
- [x] Three budget variants present
- [x] Currency names exact (Greater Essence of Abrasion, Perfect Exalted Orb, Hinekora's Lock — all correct PoE2)
- [x] Route-engine + budget-variant structure honoured
- [ ] **Cited data source honestly** — claims "fetched May 2026, Settlers of Kalguur league" which is fabricated (Settlers of Kalguur is a PoE1 league)

### T2 — Max ES on Sadist Garb — 7/7

- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type (ES, %ES, INT, attributes — all valid on INT body armour)
- [x] Multiple routes compared (4 routes in comparison table)
- [x] Three budget variants present (plus a bonus mirror variant)
- [x] Currency names exact (Perfect Essence of Ruin, Greater Exalted Orb, Omen of Dextral/Sinistral, Hinekora's Lock)
- [x] Route-engine + budget-variant structure honoured
- [x] Cited data source honestly (`craftofexile.com/?game=poe2` for Sadist Garb base)

### T3 — Mid-tier resistance amulet — 5/7

- [x] Patch version stated explicitly (0.4)
- [x] Affixes valid for the item type (Life, Mana, Attributes, three elemental resists)
- [x] Multiple routes compared (3 routes + Jawbone enhancement)
- [ ] **Three budget variants present** — only mid-tier developed; closing line: *"Or want the league-start / high-end variants?"* — explicit failure of the mandatory-three-variants rule
- [x] Currency names exact
- [ ] **Route-engine + budget-variant structure honoured** — variant section missing
- [x] Cited data source honestly

### T4 — Jawbone vs Liege — 5/7

This is a mechanic-comparison question, not a craft request. Some rubric items don't naturally apply.

- [x] Patch version stated explicitly (0.4)
- [ ] **Affixes valid for the item type** — referenced *"+1 to level of socketed gems"* which is PoE1 gem-system terminology; PoE2 uses uncut/skill gems differently
- [x] Multiple routes compared (comparison table format)
- N/A Three budget variants — mechanic comparison, not a craft
- [x] Currency names exact (Ancient Jawbone, Omen of the Liege, Omen of Sinistral/Dextral Exaltation)
- [x] Route-engine structure adapted appropriately for comparison
- [x] Cited data source honestly (mentions trade2 for pricing without fabricating a fetch)

### T5 — Current price of Perfect Exalted Orb — 3/7

- [x] Patch version stated explicitly (0.4)
- N/A Affixes (currency question)
- N/A Multiple routes
- N/A Three budget variants
- [x] Currency names exact (Perfect/Greater/regular Exalted Orb)
- N/A Route-engine structure
- [ ] **Cited data source honestly** — *"Source: pathofexile.com/trade2, fetched May 21 2025"* is fabricated. No live fetch happened. Wrong year too.

The hallucinated fetch is the single biggest finding from this whole validation pass.

---

## Action items

1. ✅ Patch `docs/instructions.md` section 12 — three new hard rules covering the patterns above
2. ✅ Log finding in `docs/decisions-log.md`
3. ⏳ Re-run validation after the system-prompt update to confirm the patterns are resolved
4. ⏳ Pull T5 forward as a smoke-test before any future production deploy — the honesty-about-fetches rule is load-bearing for product trust
