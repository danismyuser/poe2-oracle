// Tests validateCurrencyFlow against good/bad recipe descriptions.
// Uses a faithful copy of the TS logic so we don't depend on a TS runner.

const cases = [
  { label: "BAD: Greater Essence on white",   text: "Step 1: Acquire white iLvl 82 Visceral Quiver. Step 2: Apply Greater Essence of Electricity to guarantee Lightning Damage." },
  { label: "BAD: Perfect Essence on white",   text: "Use a white Crude Bow and apply Perfect Essence of Abrasion to get T1 flat phys." },
  { label: "BAD: Perfect Essence on magic",   text: "After Transmuting, apply Perfect Essence of Ruin to your magic Sacramental Robe." },
  { label: "BAD: Omen of Crystallisation",    text: "Use Omen of Crystallisation before the next Chaos to preview the outcome." },
  { label: "BAD: Chaos Orb on white base",    text: "Spam Greater Chaos Orb on the white base until you hit good mods." },
  { label: "GOOD: Trans → Essence",           text: "Apply Orb of Transmutation to your white base, then apply Greater Essence of Abrasion to the magic item." },
  { label: "GOOD: Sinistral Crystallisation", text: "Use Omen of Sinistral Crystallisation before your Perfect Essence to remove a prefix." },
  { label: "GOOD: Hinekora preview",          text: "Apply Hinekora's Lock before the Perfect Exalt slam to preview the outcome." },
  { label: "GOOD: Alchemy → Perfect Essence", text: "Apply Orb of Alchemy to your white base. Then Perfect Essence of Abrasion to replace an unwanted affix." },
];

function essenceDirectlyOnWhite(md, essencePattern) {
  const essSrc = essencePattern.source;
  const explicitApply = new RegExp("\\b(apply|use|slam)\\b[\\s\\S]{0,60}?(" + essSrc + ")[\\s\\S]{0,40}?\\b(to|on)\\b\\s+(a|the|your)?\\s*white\\b", "i");
  if (explicitApply.test(md)) return true;
  const revRe = new RegExp("\\bwhite\\b[\\s\\S]{0,120}?(?:apply|use|slam)\\b[\\s\\S]{0,40}?(" + essSrc + ")[\\s\\S]{0,80}", "i");
  const rev = md.match(revRe);
  if (rev) {
    const extendedSpan = rev[0];
    const earlier = md.slice(0, rev.index || 0);
    const hasUpgradeBefore = /\b(Orb of Transmutation|Greater Orb of Transmutation|Perfect Orb of Transmutation|Orb of Alchemy|Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(earlier);
    const hasUpgradeIn    = /\b(Orb of Transmutation|Greater Orb of Transmutation|Perfect Orb of Transmutation|Orb of Alchemy|Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(extendedSpan);
    const hasMagicRouting = /\b(to|on)\s+(a|the|your)?\s*magic\b/i.test(extendedSpan);
    if (!hasUpgradeBefore && !hasUpgradeIn && !hasMagicRouting) return true;
  }
  return false;
}

function check(md) {
  const issues = [];
  if (essenceDirectlyOnWhite(md, /(?:Lesser|Greater)\s+Essence/)) issues.push("Non-Perfect Essence on white");
  if (essenceDirectlyOnWhite(md, /Perfect\s+Essence/))             issues.push("Perfect Essence on white");
  const pm = md.match(/Perfect\s+Essence[\s\S]{0,250}?\bmagic\b|\bmagic\b[\s\S]{0,250}?Perfect\s+Essence/i);
  if (pm && !/\b(Regal Orb|Greater Regal Orb|Perfect Regal Orb)\b/i.test(pm[0])) issues.push("Perfect Essence on magic");
  for (const m of md.matchAll(/(\w+\s+)?Omen\s+of\s+Crystallisation/gi)) {
    const pre = (m[1] || "").trim();
    if (!/^(Sinistral|Dextral)$/i.test(pre)) { issues.push("Omen of Crystallisation (fake)"); break; }
  }
  if (/\b(Greater\s+|Perfect\s+)?Chaos\s+Orb\b[\s\S]{0,150}?\b(white|magic)\s+(base|item)\b/i.test(md)) issues.push("Chaos on white/magic");
  return issues;
}

let pass = 0, fail = 0;
for (const c of cases) {
  const r = check(c.text);
  const isBad = c.label.startsWith("BAD");
  const isGood = c.label.startsWith("GOOD");
  const expected = isBad ? "(flagged)" : "(clean)";
  const got = r.length > 0 ? "(flagged)" : "(clean)";
  const ok = (isBad && r.length > 0) || (isGood && r.length === 0);
  console.log(`${ok ? "✓" : "✗"} ${c.label}  expected ${expected}  got ${got}`);
  if (r.length) r.forEach((i) => console.log("    - " + i));
  if (ok) pass++; else fail++;
}
console.log(`\n${pass}/${cases.length} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
