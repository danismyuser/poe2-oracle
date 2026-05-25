"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
  /** Optional grouping label — options with the same group string render together. */
  group?: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  /** Optional inline style overrides (used to match width with native fields). */
  style?: React.CSSProperties;
  /** Hide the search input until you click — keeps the field looking like a normal select when collapsed. */
}

/**
 * Searchable dropdown — type to filter, ↑↓ to navigate, Enter to select,
 * Esc to close, click-outside closes. Visually matches the existing
 * .select-field design.
 *
 * Handles optgroups: pass `group` on each SelectOption and matching options
 * render under shared headers (alphabetised). When the user is typing, group
 * headers are still shown for results that have one — useful context.
 */
export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = "Search...",
  disabled = false,
  style,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  /** Filter (case-insensitive substring match on label) + preserve group ordering. */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
    return base;
  }, [options, query]);

  /** Group filtered options by `group` for rendering, preserving insertion order. */
  const grouped = useMemo(() => {
    const groups = new Map<string, SelectOption[]>();
    for (const o of filtered) {
      const key = o.group ?? "";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(o);
    }
    return [...groups.entries()];
  }, [filtered]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Reset highlighted index when filter changes
  useEffect(() => {
    setHighlighted(0);
  }, [query, open]);

  // Scroll highlighted into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${highlighted}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  function select(opt: SelectOption) {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  }

  function onKey(e: React.KeyboardEvent) {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (!open) { setOpen(true); return; }
      const opt = filtered[highlighted];
      if (opt) { e.preventDefault(); select(opt); }
    } else if (e.key === "Escape") {
      if (open) { e.preventDefault(); setOpen(false); setQuery(""); }
    }
  }

  function openAndFocus() {
    if (disabled) return;
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", ...style }}
      onKeyDown={onKey}
    >
      {/* Trigger — looks like a regular .select-field when closed */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openAndFocus())}
        className="select-field"
        style={{
          textAlign: "left",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.35 : 1,
          color: selectedLabel ? "var(--text-primary)" : "var(--text-tertiary)",
        }}
      >
        {selectedLabel || placeholder}
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 100,
            background: "var(--bg-card)",
            border: "1px solid var(--border-blue)",
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            maxHeight: 320,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search… (${options.length} options)`}
            className="field"
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.85rem",
              borderRadius: 0,
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid var(--border-light)",
              flexShrink: 0,
            }}
            autoFocus
          />

          <div
            ref={listRef}
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "0.25rem 0",
            }}
          >
            {filtered.length === 0 ? (
              <div style={{
                padding: "0.75rem 0.9rem",
                fontSize: "0.82rem",
                color: "var(--text-tertiary)",
                fontStyle: "italic",
              }}>
                No matches.
              </div>
            ) : (
              (() => {
                let idx = 0;
                return grouped.map(([groupLabel, opts]) => (
                  <div key={groupLabel || "__no_group__"}>
                    {groupLabel && (
                      <div style={{
                        padding: "0.4rem 0.9rem 0.2rem",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-tertiary)",
                      }}>
                        {groupLabel}
                      </div>
                    )}
                    {opts.map((opt) => {
                      const myIdx = idx++;
                      const isHighlighted = myIdx === highlighted;
                      const isSelected = opt.value === value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          data-idx={myIdx}
                          onMouseDown={(e) => { e.preventDefault(); select(opt); }}
                          onMouseEnter={() => setHighlighted(myIdx)}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "0.4rem 0.9rem",
                            fontSize: "0.85rem",
                            fontFamily: "var(--font-body)",
                            color: isSelected ? "var(--text-blue)" : "var(--text-primary)",
                            background: isHighlighted ? "var(--bg-elevated)" : "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                ));
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}
