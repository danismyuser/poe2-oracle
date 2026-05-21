export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 py-6" style={{ color: "var(--text-tertiary)" }}>
      {/* Spinning ring */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid var(--border-light)",
          borderTopColor: "var(--gold)",
          animation: "spin-rune 0.8s linear infinite",
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.68rem",
        letterSpacing: "0.15em",
        color: "var(--text-tertiary)",
      }}>
        THE ORACLE CONSULTS…
      </span>
    </div>
  );
}
