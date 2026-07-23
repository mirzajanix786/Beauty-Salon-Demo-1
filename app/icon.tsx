import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2B241E",
          color: "#C8A46A",
          fontSize: 20,
          fontWeight: 500,
          fontFamily: "serif",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
