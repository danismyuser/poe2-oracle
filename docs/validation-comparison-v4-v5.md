# Validation Comparison: v4 → v5

**v4 baseline:** commit `2b498ad` (weapon-vs-quiver fix) — May 2026
**v5 (current):** commit `5fb755f` — after 9 commits adding per-base mods + 8 known-good-crafts examples (~70K chars of expert content)
**Validation date:** 2026-05-24 (this run)

## Headline result

**Recipe validity jumped from "many warnings + some critical" to "5 clean, 1 critical remaining"** — the critical one being the Oracle's persistent insistence on Perfect Essence of Electricity for "lightning bow" quiver crafts despite all prompt rules forbidding it.

## Recipe validator output — before vs after

| Test | v4 issues | v5 issues | Δ |
|------|-----------|-----------|---|
| T1 Bow | 2 WARNINGS (Attack Speed slot, Accuracy slot) | **CLEAN** | ✓ resolved |
| T2 Body Armour | CLEAN | **CLEAN** | = |
| T3 Amulet | 2 WARNINGS (Fire/Cold Res slot) | **CLEAN** | ✓ resolved |
| T4 Mechanic Q | N/A (no recipe) | N/A | = |
| T5 Currency Q | N/A (no recipe) | N/A | = |
| T6 Crossbow | CLEAN | **CLEAN** | = |
| T7 Quiver | 4 CRITICAL (essence + 3 invalid mods) | 1 CRITICAL (essence only) | ✓ 3 fewer |

**Total: 8 issues → 1 issue.** The remaining T7 issue is the Oracle pattern-matching on "lightning bow build" and recommending Lightning Essence on a Quiver — the validator catches and warns the user about it.

## URL builder affix resolution — before vs after

| Test | v4 | v5 |
|------|---:|---:|
| T1 Bow | 4/6 | **5/6** |
| T2 Body Armour | 5/5 (Imperial Robe) | 5/6 (Vile Robe) |
| T3 Amulet | 5/5 | 5/5 |
| T6 Crossbow | 6/6 | 6/6 |
| T7 Quiver | 5/6 | **6/6** |

## The Big Signal — base names match known-good-crafts

The most striking evidence that the examples are being USED, not just sitting in the prompt:

| Test | Recipe base chosen | Matches example? |
|------|-------------------|------------------|
| T1 Bow | **Artillery Bow** | ✓ Belton's physical-martial-weapon guide lists Artillery as a recommended endgame bow |
| T2 Body Armour | **Vile Robe** | ✓✓ Belton's ES chest guide is BUILT around Vile Robe as the gold-standard base |
| T6 Crossbow | **Sturdy Crossbow** | ✓ Belton's martial-weapon guide |
| T7 Quiver | **Visceral Quiver** | ✓✓ The user's known-good quiver craft uses Visceral Quiver |

The Oracle is choosing the same bases the verified examples use. Few-shot learning is working.

## Response-length growth (more reasoning, more detail)

| Test | v4 chars | v5 chars |
|------|---------:|---------:|
| T1 | 7572 | 9540 |
| T2 | 6416 | 10539 |
| T3 | 6090 | 8577 |
| T6 | 8469 | 8978 |
| T7 | 9750 | 8686 |

T2 in particular grew 64% — the Oracle is now producing longer, more detailed reasoning, presumably because it has the Belton ES chest example to draw on for structural elements.

## Persistent issue: T7 — "Lightning Bow Build" quiver still uses Electricity essence

This is the only remaining critical recipe issue. The Oracle:
- Has the essence applicability table in the prompt (says Electricity doesn't apply to Quiver)
- Has the hard rule in §12 forbidding incompatible essence/base combos
- Has the user's verified quiver craft showing the correct (chaos-based, no essence) approach for quivers
- BUT pattern-matches "lightning bow build" → "needs lightning damage" → "use Lightning essence"

**The validator backstop catches it 100%.** The warning banner above the response tells the user "Perfect Essence of Electricity cannot be applied to a Visceral Quiver (Quiver). Applies to: Bow, Crossbow, Dagger..."

So users are protected even when the Oracle goes wrong here. Could be improved further by:
- Adding a verified lightning-quiver-craft example to the known-good-crafts folder (most direct fix)
- Adding an even more pointed hard rule in instructions.md specifically about "if user mentions a damage type, that doesn't mean force-fit the matching essence — check applicability first"
- Auto-rejecting recipes that fail validation (regenerate)

## Verdict

The 9 commits of additional data + 8 verified craft examples produced real, measurable improvement:
- **Recipe validity:** 8 issues → 1 issue (87% reduction)
- **Affix resolution:** roughly stable but with better base choices
- **Base selection:** now mirrors expert examples for 4/4 craft questions
- **Response detail:** longer, more reasoned outputs

The validator backstop reliably catches the remaining issue. The Oracle is now genuinely good for the item classes the examples cover, and the warning system protects users from the residual hallucinations.
