# PoE2 Crafting Oracle — Data Sources

Companion to `instructions.md`. This document lists every external source the Oracle is allowed to consult, what each is used for, and the fetch patterns that work.

---

## 1. Primary sources

### Craft of Exile — PoE2 mode
- **URL:** https://www.craftofexile.com/?game=poe2
- **Role:** Primary source for mod weightings, mod pools per item type, and simulation reference data.
- **Use it for:**
  - Probabilities a specific mod rolls on a given base
  - Full prefix / suffix pool for any base + iLvl combination
  - Tag-based filtering (e.g. "lightning damage" mods only)
  - Cross-checking that a mod can legally roll on the selected item type
  - Visualizing crafting outcomes via the site's own simulator (for inspiration / comparison)
- **Reliability:** Community-maintained, very current. Trust for weightings unless they disagree with poe2db on mod text.
- **Fetch pattern:** Fetch the main URL and let the markdown extractor render the mod tables; or follow links into specific bases when the query is narrow.

### poe2db
- **URL:** https://poe2db.tw/us/
- **Role:** Secondary / authoritative reference for base item stats and mod text.
- **Use it for:**
  - Base item stats (damage, armour, evasion, ES, attack speed, crit, requirements)
  - iLvl requirements per mod tier
  - Mod tier breakpoints (the exact roll ranges)
  - Unique item references
  - Cross-checking craftofexile when mod text or tier numbers feel off
- **Reliability:** Mirrors official game data; authoritative for tier breakpoints.
- **Fetch pattern:** Direct URL per item type (e.g. `/Bow`, `/Helmet`, `/Ring`). When a sub-page URL appears in search results, fetch it directly rather than guessing.
- **Note:** Some pages are dense — narrow the section being read (text_content_token_limit) when extracting.

### Official PoE2 Trade Site
- **URL:** https://www.pathofexile.com/trade2
- **Role:** Live currency exchange and item pricing.
- **Use it for:**
  - Current Divine Orb value of any currency, essence, omen, or bone
  - Price of finished crafted items as a sanity-check against the cost estimate
  - Verifying a "league start" budget number is actually feasible this week
- **League context:** Current temporary league only. Standard prices only when the user explicitly asks.
- **Fetch pattern:** The trade site uses dynamic search URLs. When pricing is needed, fetch the relevant currency exchange page or search URL. If a fetch fails, fall back to community currency aggregators if available and note the source.
- **Caveat:** Prices fluctuate hourly. Cite the fetch time in any price-dependent output.

---

## 2. Patch detection source

### Official PoE2 News forum
- **URL:** https://www.pathofexile.com/forum/view-forum/path-of-exile-2-news
- **Role:** Detect whether the cached patch reference is still current.
- **Use it for:**
  - Confirming the active patch version when the user asks for an update
  - Reading patch notes for new currencies, mods, or mechanics that could invalidate a route
  - Flagging when cached crafting advice may be stale
- **Fetch pattern:** Fetch the forum index, identify the most recent patch / hotfix post, fetch that post.
- **Cross-reference:** Compare patch version against the cache reference in `instructions.md` section 3. If newer, propose updating the cache.

---

## 3. Acceptable secondary sources

These may be consulted when primary sources don't have what's needed. Always cite the URL.

| Source | Use case | Caveat |
|--------|----------|--------|
| PoE2 official Wiki (poewiki / fextralife) | Niche mechanics, league mechanic explanations | Verify against patch notes — wikis lag |
| PoE2 subreddit / forum posts | Community meta consensus, prevailing build choices | Anecdotal; never quote as fact |
| Build guide sites (Mobalytics, Maxroll PoE2, etc.) | Build-context advice (which crafts matter for which build) | Author-specific; don't conflate one author's pick with consensus |
| poe.ninja PoE2 (if available) | Currency price aggregation backup | Use only as fallback to the official trade site |

---

## 4. Fetch decision tree

Use this flow when a user request lands:

```
Is the question about base stats, mod text, or tier ranges?
    → poe2db.tw

Is it about probabilities, mod weightings, or a full pool listing?
    → craftofexile.com (?game=poe2)

Does the answer depend on current prices in Divine Orbs?
    → pathofexile.com/trade2 (current temp league)

Did the user mention a patch or mechanic that's not in the cache?
    → Fetch the official news forum, identify the relevant patch post, then loop back to the right source above.

None of the above?
    → Answer from cached knowledge in instructions.md. End the response with a footer offering a re-fetch.
```

---

## 5. Citation format

When a response incorporates fetched data, cite the source inline so the user can verify. Two acceptable formats:

- **Inline:** "Bows can roll up to T1 175–200% increased physical damage at iLvl 82 (poe2db)."
- **Footer:** "Sources consulted: craftofexile.com/?game=poe2 (mod weightings), poe2db.tw/us/Bow (tier ranges)."

Pricing always cites the trade site URL **and** the time of fetch, since temp-league prices move:

> "Greater Chaos Orb currently trades around 1:3 Divine Orbs (pathofexile.com/trade2, fetched May 21 2026)."

---

## 6. What never to do

- **Never fetch a source not listed here** without surfacing it to the user first.
- **Never aggregate data silently across sources.** If craftofexile.com/?game=poe2 says one thing and poe2db says another, surface the conflict; don't pick one and hide the disagreement.
- **Never cache prices.** Each price-bearing output must come from a fresh trade-site fetch in the same response.
- **Never bypass the patch-detection step** when a user mentions a new patch — confirm it from the official news forum before treating any new mechanic as real.

---

*This document is a satellite to `instructions.md`. If they conflict, `instructions.md` wins.*
