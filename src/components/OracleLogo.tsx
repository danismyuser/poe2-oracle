"use client";

interface Props {
  /** Controls overall scale. Default 1. */
  scale?: number;
  /** Show the tagline beneath the wordmark. Default true. */
  tagline?: boolean;
}

/**
 * Crafting Oracle brand mark — pure CSS, no images.
 * Inspired by PoE2 item-tooltip frames: horizontal rules, corner brackets, ◈.
 */
export default function OracleLogo({ scale = 1, tagline = true }: Props) {
  const s = (n: number) => n * scale;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        userSelect: "none",
      }}
    >
      {/* ── Top corner brackets ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: s(10) }}>
        <Corner dir="tl" scale={scale} />
        <Corner dir="tr" scale={scale} />
      </div>

      {/* ── Diamond symbol ──────────────────────────────────────────── */}
      <div
        style={{
          fontSize: s(38),
          lineHeight: 1,
          color: "var(--blue-bright)",
          textShadow: `0 0 ${s(24)}px var(--blue-glow), 0 0 ${s(48)}px rgba(29,111,235,0.25)`,
          marginBottom: s(10),
          animation: "glow-pulse 3s ease-in-out infinite",
        }}
      >
        ◈
      </div>

      {/* ── Top rule ────────────────────────────────────────────────── */}
      <Rule scale={scale} color="var(--blue-bright)" />

      {/* ── "CRAFTING" label ────────────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: s(11),
          fontWeight: 700,
          letterSpacing: `${s(6)}px`,
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          marginTop: s(14),
          marginBottom: s(2),
          paddingRight: `${s(6)}px`, /* optical centering for letter-spacing */
        }}
      >
        Crafting
      </div>

      {/* ── "ORACLE" wordmark ───────────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: s(64),
          fontWeight: 700,
          letterSpacing: `${s(8)}px`,
          textTransform: "uppercase",
          lineHeight: 1,
          color: "transparent",
          backgroundImage:
            "linear-gradient(135deg, var(--blue-bright) 0%, #79B8FF 45%, var(--gold-bright) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          paddingRight: `${s(8)}px`,
          marginBottom: s(14),
        }}
      >
        Oracle
      </div>

      {/* ── Bottom rule ─────────────────────────────────────────────── */}
      <Rule scale={scale} color="var(--gold)" />

      {/* ── Tagline ─────────────────────────────────────────────────── */}
      {tagline && (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: s(9.5),
            fontWeight: 700,
            letterSpacing: `${s(3.5)}px`,
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            opacity: 0.55,
            marginTop: s(12),
            paddingRight: `${s(3.5)}px`,
          }}
        >
          Path of Exile 2
        </div>
      )}

      {/* ── Bottom corner brackets ──────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingTop: s(10) }}>
        <Corner dir="bl" scale={scale} />
        <Corner dir="br" scale={scale} />
      </div>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function Rule({ scale, color }: { scale: number; color: string }) {
  const s = (n: number) => n * scale;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: s(8), width: "100%" }}>
      <div style={{
        height: 1,
        flex: 1,
        background: `linear-gradient(to right, transparent, ${color})`,
        opacity: 0.5,
      }} />
      <div style={{
        width: s(4), height: s(4),
        transform: "rotate(45deg)",
        background: color,
        opacity: 0.7,
        flexShrink: 0,
      }} />
      <div style={{
        height: 1,
        flex: 1,
        background: `linear-gradient(to left, transparent, ${color})`,
        opacity: 0.5,
      }} />
    </div>
  );
}

function Corner({ dir, scale }: { dir: "tl" | "tr" | "bl" | "br"; scale: number }) {
  const s = (n: number) => n * scale;
  const size = s(14);
  const thickness = 1.5;
  const color = "rgba(56,139,253,0.45)";

  const borderStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
  };

  if (dir === "tl") borderStyle.borderTopWidth = thickness, borderStyle.borderLeftWidth = thickness;
  if (dir === "tr") borderStyle.borderTopWidth = thickness, borderStyle.borderRightWidth = thickness;
  if (dir === "bl") borderStyle.borderBottomWidth = thickness, borderStyle.borderLeftWidth = thickness;
  if (dir === "br") borderStyle.borderBottomWidth = thickness, borderStyle.borderRightWidth = thickness;

  return <div style={borderStyle} />;
}
