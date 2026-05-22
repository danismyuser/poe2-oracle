/** Shown by Next.js while the Dashboard server component loads (DB auth check). */
export default function DashboardLoading() {
  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* Sidebar skeleton */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-light)",
          padding: "1.5rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {/* Label */}
        <div style={{ height: 10, width: 70, background: "var(--bg-elevated)", borderRadius: 3, marginBottom: 6 }} />
        {/* Nav items */}
        {[80, 100, 72].map((w, i) => (
          <div key={i} style={{ height: 38, background: "var(--bg-elevated)", borderRadius: 4, opacity: 0.5 + i * 0.15, width: `${w}%` }} />
        ))}
      </aside>

      {/* Content skeleton */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header bar */}
        <div
          style={{
            padding: "1.75rem 2.5rem",
            borderBottom: "1px solid var(--border-light)",
            background: "var(--bg-subtle)",
          }}
        >
          <div style={{ height: 10, width: 100, background: "var(--bg-elevated)", borderRadius: 3, marginBottom: 10 }} />
          <div style={{ height: 28, width: 220, background: "var(--bg-elevated)", borderRadius: 4 }} />
        </div>
        {/* Body */}
        <div style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ height: 120, background: "var(--bg-card)", borderRadius: 6, border: "1px solid var(--border-light)" }} />
          <div style={{ height: 80, background: "var(--bg-card)", borderRadius: 6, border: "1px solid var(--border-light)", width: "70%" }} />
        </div>
      </div>
    </div>
  );
}
