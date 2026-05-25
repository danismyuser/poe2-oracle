"use client";
import type { AffixSlot } from "@/types/craft";
import { AffixDef } from "@/lib/affix-data";
import SearchableSelect from "@/components/SearchableSelect";

interface Props {
  label: string;
  slot: AffixSlot;
  affixPool: AffixDef[];
  onChange: (slot: AffixSlot) => void;
}

export default function AffixSelector({ label, slot, affixPool, onChange }: Props) {
  const tiers = affixPool.find((a) => a.name === slot.name)?.tiers ?? [];

  const modOptions = [
    { value: "", label: "— none —" },
    ...affixPool.map((a) => ({ value: a.name, label: a.name })),
  ];

  return (
    <div className="flex gap-2 items-center">
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          width: 52,
          flexShrink: 0,
        }}
      >
        {label}
      </span>

      {/* Mod name — searchable since pools can be 20-45 entries */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <SearchableSelect
          value={slot.name}
          onChange={(v) => onChange({ name: v, tier: "" })}
          options={modOptions}
          placeholder="— none —"
        />
      </div>

      {/* Tier — only ~5 options, native select is fine */}
      <select
        value={slot.tier}
        onChange={(e) => onChange({ ...slot, tier: e.target.value })}
        disabled={!slot.name}
        className="select-field"
        style={{
          width: 80,
          flexShrink: 0,
          opacity: slot.name ? 1 : 0.35,
          cursor: slot.name ? "pointer" : "not-allowed",
        }}
      >
        <option value="">Tier</option>
        {tiers.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
