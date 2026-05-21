"use client";
import { AffixDef } from "@/lib/affix-data";

interface AffixSlot {
  name: string;
  tier: string;
}

interface Props {
  label: string;
  slot: AffixSlot;
  affixPool: AffixDef[];
  onChange: (slot: AffixSlot) => void;
}

export default function AffixSelector({ label, slot, affixPool, onChange }: Props) {
  const tiers = affixPool.find((a) => a.name === slot.name)?.tiers ?? [];

  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs text-zinc-500 w-16 shrink-0">{label}</span>
      <select
        value={slot.name}
        onChange={(e) => onChange({ name: e.target.value, tier: "" })}
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-amber-500"
      >
        <option value="">— none —</option>
        {affixPool.map((a) => (
          <option key={a.name} value={a.name}>{a.name}</option>
        ))}
      </select>
      <select
        value={slot.tier}
        onChange={(e) => onChange({ ...slot, tier: e.target.value })}
        disabled={!slot.name}
        className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-amber-500 disabled:opacity-40"
      >
        <option value="">Tier</option>
        {tiers.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
