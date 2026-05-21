"use client";

interface AffixSlot { name: string; tier: string; }

interface Props {
  itemClass: string;
  base: string;
  ilvl: number;
  budget: string;
  prefixes: AffixSlot[];
  suffixes: AffixSlot[];
}

const BUDGET_COLOURS: Record<string, string> = {
  "league-start": "text-zinc-400",
  mid: "text-blue-400",
  high: "text-amber-400",
  mirror: "text-fuchsia-400",
};

export default function ItemPreview({ itemClass, base, ilvl, budget, prefixes, suffixes }: Props) {
  const filledPrefixes = prefixes.filter((p) => p.name);
  const filledSuffixes = suffixes.filter((s) => s.name);
  const budgetColour = BUDGET_COLOURS[budget] ?? "text-zinc-400";

  return (
    <div className="border border-zinc-700 rounded-lg p-4 bg-zinc-800/50 min-h-[180px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-amber-400 font-semibold text-sm">{base || "— select a base —"}</p>
          <p className="text-zinc-500 text-xs">{itemClass} · iLvl {ilvl || "?"}</p>
        </div>
        {budget && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded bg-zinc-700 ${budgetColour}`}>
            {budget}
          </span>
        )}
      </div>

      {(filledPrefixes.length > 0 || filledSuffixes.length > 0) ? (
        <div className="mt-3 space-y-1">
          {filledPrefixes.map((p, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-blue-300">{p.name}</span>
              <span className="text-zinc-500">{p.tier}</span>
            </div>
          ))}
          {filledPrefixes.length > 0 && filledSuffixes.length > 0 && (
            <div className="border-t border-zinc-700 my-1" />
          )}
          {filledSuffixes.map((s, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-green-300">{s.name}</span>
              <span className="text-zinc-500">{s.tier}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 text-xs mt-3">Select affixes to preview the item</p>
      )}

      <div className="mt-3 pt-2 border-t border-zinc-700 flex gap-3 text-xs text-zinc-600">
        <span>{filledPrefixes.length}/3 prefixes</span>
        <span>{filledSuffixes.length}/3 suffixes</span>
      </div>
    </div>
  );
}
