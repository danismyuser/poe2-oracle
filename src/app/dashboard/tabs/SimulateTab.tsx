"use client";
import { useState } from "react";
import { ITEM_CLASSES, BASES, getModPool, ItemClass } from "@/lib/affix-data";
import AffixSelector from "@/components/AffixSelector";
import ItemPreview from "@/components/ItemPreview";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AffixSlot { name: string; tier: string; }
const EMPTY_SLOT = (): AffixSlot => ({ name: "", tier: "" });

const BUDGETS = [
  { value: "league-start", label: "League Start", colour: "text-zinc-400" },
  { value: "mid", label: "Mid-tier", colour: "text-blue-400" },
  { value: "high", label: "High-end / BIS", colour: "text-amber-400" },
  { value: "mirror", label: "Mirror tier", colour: "text-fuchsia-400" },
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
      <form onSubmit={generate} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — config */}
        <div className="flex flex-col gap-4">
          {/* Class + Base + iLvl */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500">Item class</label>
              <select
                value={itemClass}
                onChange={(e) => changeClass(e.target.value as ItemClass)}
                className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-amber-500"
              >
                {ITEM_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500">Base</label>
              <select
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-amber-500"
              >
                {BASES[itemClass].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Item level: {ilvl}</label>
            <input
              type="range" min={1} max={100} value={ilvl}
              onChange={(e) => setIlvl(Number(e.target.value))}
              className="accent-amber-500"
            />
            <div className="flex justify-between text-xs text-zinc-600">
              <span>1</span><span>50</span><span>100</span>
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Budget</label>
            <div className="flex gap-2 flex-wrap">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    budget === b.value
                      ? `border-amber-500 bg-amber-500/10 ${b.colour}`
                      : "border-zinc-700 text-zinc-500 hover:border-zinc-500"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Affixes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-500 font-medium">Prefixes</label>
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

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-500 font-medium">Suffixes</label>
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

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-semibold py-2.5 rounded-lg text-sm mt-1 transition-colors"
          >
            {loading ? "Generating guide…" : "Generate crafting guide"}
          </button>
        </div>

        {/* Right — item preview */}
        <div className="flex flex-col gap-3">
          <label className="text-xs text-zinc-500">Item preview</label>
          <ItemPreview
            itemClass={itemClass}
            base={base}
            ilvl={ilvl}
            budget={budget}
            prefixes={prefixes}
            suffixes={suffixes}
          />
          <div className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-600 leading-relaxed">
            <p className="text-zinc-500 font-medium mb-1">Tips</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Leave affixes blank to let the Oracle suggest the best ones</li>
              <li>iLvl 82+ unlocks T1 mods on most item types</li>
              <li>Budget affects which routes the Oracle recommends</li>
            </ul>
          </div>
        </div>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {loading && <LoadingSpinner />}

      {response && !loading && (
        <div className="bg-zinc-800/40 border border-zinc-700 rounded-xl p-5">
          <MarkdownRenderer content={response} />
        </div>
      )}
    </div>
  );
}
