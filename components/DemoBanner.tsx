/**
 * DemoBanner — a thin, non-intrusive notification bar rendered at the very
 * top of every page to indicate that this is a demonstration project built
 * for Cimple Tech.
 *
 * Kept deliberately subtle so it does not interfere with the existing luxury
 * design system.
 */
export function DemoBanner() {
  return (
    <div
      id="demo-banner"
      role="banner"
      aria-label="Demo website notice"
      style={{
        backgroundColor: "#F5F0E8",
        borderBottom: "1px solid #E0D6C0",
        padding: "7px 16px",
        textAlign: "center",
        fontSize: "11px",
        fontFamily:
          "'Space Grotesk', 'Manrope', system-ui, -apple-system, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.06em",
        color: "#6B5E45",
        lineHeight: 1.4,
        zIndex: 9999,
        position: "relative",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 6px",
        }}
      >
        Demo Website
        <span aria-hidden="true" style={{ color: "#C8A76A", margin: "0 2px" }}>
          •
        </span>
        Developed for Cimple Tech
        <span aria-hidden="true" style={{ color: "#C8A76A", margin: "0 2px" }}>
          •
        </span>
        For Client Presentation &amp; Development Purposes Only
      </span>
    </div>
  );
}
