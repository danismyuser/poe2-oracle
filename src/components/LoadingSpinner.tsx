export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Spinning rune ring */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid var(--border-dim)",
          borderTopColor: "var(--gold)",
          animation: "spin-rune 1s linear infinite",
          position: "relative",
        }}
      >
        {/* Inner glow dot */}
        <div
          style={{
            position: "absolute",
            inset: "30%",
            borderRadius: "50%",
            background: "var(--gold)",
            opacity: 0.4,
            animation: "ember-pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "var(--text-dim)",
          animation: "ember-pulse 2s ease-in-out infinite",
        }}
      >
        THE ORACLE CONSULTS…
      </p>
    </div>
  );
}
