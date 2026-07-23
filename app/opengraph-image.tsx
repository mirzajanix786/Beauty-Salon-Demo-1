import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2B241E 0%, #1c1712 55%, #2B241E 100%)",
          color: "#FBF6EF",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C8A46A",
            marginBottom: 28,
          }}
        >
          Est. Private Atelier
        </div>
        <div
          style={{
            fontFamily: "serif",
            fontSize: 96,
            fontWeight: 300,
            lineHeight: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Beauty,</span>
          <span style={{ color: "#C8A46A", fontStyle: "italic" }}>
            beyond time.
          </span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(247,242,236,0.6)",
          }}
        >
          Maison Lumière
        </div>
      </div>
    ),
    { ...size }
  );
}
