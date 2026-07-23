/**
 * DemoBanner — sticky notification bar pinned at the very top of the viewport.
 * The Navbar is offset by the banner height (36px) via `top-[36px]` so they
 * never overlap. Page content is pushed down by the combined height of both
 * (banner 36px + navbar ~72px) via a spacer div in layout.tsx.
 */
export function DemoBanner() {
  return (
    <>
      {/* The fixed banner itself */}
      <div
        id="demo-banner"
        role="banner"
        aria-label="Demo website notice"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8F5EF",
          borderBottom: "1px solid #E5E5E5",
          padding: "0 16px",
        }}
      >
        <span
          style={{
            fontFamily:
              "'Space Grotesk', 'Manrope', system-ui, -apple-system, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.055em",
            color: "#444444",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            display: "block",
            maxWidth: "100%",
          }}
        >
          {/* Full text on md+ screens */}
          <span className="hidden sm:inline">
            Demo Website&nbsp;&nbsp;•&nbsp;&nbsp;Developed for Cimple
            Tech&nbsp;&nbsp;•&nbsp;&nbsp;For Client Presentation &amp;
            Development Purposes Only
          </span>
          {/* Shorter text on small screens */}
          <span className="inline sm:hidden">
            Demo for Cimple Tech — Client Presentation Only
          </span>
        </span>
      </div>

      {/* Spacer so the document flow accounts for the fixed banner height */}
      <div style={{ height: "36px", flexShrink: 0 }} aria-hidden="true" />
    </>
  );
}
