"use client";
import { useState } from "react";
import { ITEM_CLASSES, BASES, getModPool, ItemClass } from "@/lib/affix-data";
import type { AffixSlot } from "@/types/craft";
import AffixSelector from "@/components/AffixSelector";
import ItemPreview from "@/components/ItemPreview";
import OracleResponse from "@/components/OracleResponse";
import LoadingSpinner from "@/components/LoadingSpinner";

const EMPTY_SLOT = (): AffixSlot => ({ name: "", tier: "" });

/** Group ITEM_CLASSES by parent name so the dropdown renders 76 categories
 *  as collapsible-feeling optgroups: e.g. all "Body Armour (DEX)" / "(INT)" /
 *  ... sit under a "Body Armour" header. */
function buildItemClassGroups(classes: readonly string[]): { label: string; classes: string[] }[] {
  const groups = new Map<string, string[]>();
  for (const c of classes) {
    const parent = c.replace(/\s*\([^)]+\)\s*$/, "").trim();
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent)!.push(c);
  }
  return [...groups.entries()]
    .map(([label, list]) => ({ label, classes: list.sort() }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
const ITEM_CLASS_GROUPS = buildItemClassGroups(ITEM_CLASSES);

const BUDGETS = [
  { value: "league-start", label: "League Start", activeClass: "active-league" },
  { value: "mid",          label: "Mid-tier",     activeClass: "active-mid" },
  { value: "high",         label: "High-end",     activeClass: "active-high" },
  { value: "mirror",       label: "Mirror",       activeClass: "active-mirror" },
];

export default function SimulateTab() {
  const [itemClass, setItemClass] = useState<ItemClass>("Bow");
  const [base, setBase] = useState(BASES["Bow"][0]);
  const [ilvl, setIlvl] = useState(82);
  const [budget, setBudget] = useState("mid");
  const [prefixes, setPrefixes] = useState<AffixSlot[]>([EMPTY_SLOT(), EMPTY_SLOT(), EMPTY_SLOT()]);
  const [suffixes, setSuffixes] = useState<AffixSlot[]>([EMPTY_SLOT(), EMPTY_SLOT(), EMPTY_SLOT()]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pool = getModPool(itemClass);

  function changeClass(cls: ItemClass) {
    setItemClass(cls);
    setBase(BASES[cls][0]);
    setPrefixes([EMPTY_SLOT(), EMPTY_SLOT(), EMPTY_SLOT()]);
    setSuffixes([EMPTY_SLOT(), EMPTY_SLOT(), EMPTY_SLOT()]);
    setResponse("");
  }

  function updatePrefix(i: number, slot: AffixSlot) {
    setPrefixes((prev) => prev.map((p, idx) => (idx === i ? slot : p)));
  }
  function updateSuffix(i: number, slot: AffixSlot) {
    setSuffixes((prev) => prev.map((s, idx) => (idx === i ? slot : s)));
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResponse("");
    setLoading(true);
    const res = await fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemType: itemClass,
        base,
        ilvl,
        affixes: {
          prefixes: prefixes.filter((p) => p.name),
          suffixes: suffixes.filter((s) => s.name),
        },
        budget,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong"); return; }
    setResponse(data.response);
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={generate} className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ── Left — configuration ───────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Item class + base */}
          <div className="card p-5 flex flex-col gap-4">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              Item Setup
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Item Class</label>
                <select
                  value={itemClass}
                  onChange={(e) => changeClass(e.target.value as ItemClass)}
                  className="select-field"
                >
                  {ITEM_CLASS_GROUPS.map((group) =>
                    group.classes.length === 1 ? (
                      <option key={group.classes[0]} value={group.classes[0]}>
                        {group.classes[0]}
                      </option>
                    ) : (
                      <optgroup key={group.label} label={group.label}>
                        {group.classes.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                    ),
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="field-label">Base</label>
                <select
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="select-field"
                >
                  {BASES[itemClass].map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Item level slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="field-label" style={{ margin: 0 }}>Item Level</label>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: ilvl >= 82 ? "var(--gold)" : ilvl >= 68 ? "var(--blue-light)" : "var(--text-secondary)",
                  }}
                >
                  {ilvl}
                  {ilvl >= 82 && <span style={{ fontSize: "0.7rem", marginLeft: 4, color: "var(--text-gold)" }}>T1</span>}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={ilvl}
                onChange={(e) => setIlvl(Number(e.target.value))}
                style={{ accentColor: "var(--blue-bright)", width: "100%", cursor: "pointer" }}
              />
              <div className="flex justify-between" style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                <span>1</span>
                <span style={{ color: ilvl >= 68 ? "var(--blue-light)" : "var(--text-tertiary)" }}>68 (T2+)</span>
                <span style={{ color: ilvl >= 82 ? "var(--gold)" : "var(--text-tertiary)" }}>82+ (T1)</span>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="card p-5 flex flex-col gap-3">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              Budget
            </p>
            <div className="flex gap-2 flex-wrap">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  className={`budget-pill ${budget === b.value ? b.activeClass : ""}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Affixes */}
          <div className="card p-5 flex flex-col gap-4">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              Target Affixes
            </p>

            <div className="flex flex-col gap-2">
              <p style={{ fontSize: "0.72rem", color: "var(--blue-light)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Prefixes
              </p>
              {prefixes.map((p, i) => (
                <AffixSelector
                  key={i}
                  label={`Pre ${i + 1}`}
                  slot={p}
                  affixPool={pool.prefixes}
                  onChange={(slot) => updatePrefix(i, slot)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-2" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Suffixes
              </p>
              {suffixes.map((s, i) => (
                <AffixSelector
                  key={i}
                  label={`Suf ${i + 1}`}
                  slot={s}
                  affixPool={pool.suffixes}
                  onChange={(slot) => updateSuffix(i, slot)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ padding: "0.85rem", fontSize: "0.95rem" }}
          >
            {loading ? "Generating guide…" : "⚙ Generate Crafting Guide"}
          </button>
        </div>

        {/* ── Right — item preview ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="card p-5 flex flex-col gap-3">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}
            >
              Item Preview
            </p>
            <ItemPreview
              itemClass={itemClass}
              base={base}
              ilvl={ilvl}
              budget={budget}
              prefixes={prefixes}
              suffixes={suffixes}
            />
          </div>

          {/* Tips */}
          <div
            style={{
              background: "var(--blue-bg)",
              border: "1px solid var(--border-blue)",
              borderRadius: 10,
              padding: "1rem 1.25rem",
            }}
          >
            <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-blue)", marginBottom: "0.6rem" }}>
              Tips
            </p>
            <ul style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7, listStyle: "disc", paddingLeft: "1.2rem" }}>
              <li>Leave affixes blank to let the Oracle suggest the best ones</li>
              <li>iLvl 82+ unlocks T1 mods on most item types</li>
              <li>Budget affects which routes the Oracle recommends</li>
            </ul>
          </div>
        </div>
      </form>

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <div
          style={{
            background: "var(--red-bg)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8,
            padding: "0.85rem 1.1rem",
            color: "var(--red)",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {/* ── Response ────────────────────────────────────────────────────────── */}
      {response && !loading && (
        <div
          className="animate-fade-in card p-7"
          style={{ borderColor: "var(--border-blue)" }}
        >
          <OracleResponse content={response} />
        </div>
      )}
    </div>
  );
}
