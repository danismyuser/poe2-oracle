export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-4 py-6">
      {/* Glowing ring */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: "2px solid var(--border-blue)",
          borderTopColor: "var(--blue-bright)",
          animation: "spin-rune 0.75s linear infinite",
          flexShrink: 0,
          boxShadow: "0 0 10px var(--blue-glow)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
        }}
      >
        The Oracle Consults…
      </span>
    </div>
  );
}
