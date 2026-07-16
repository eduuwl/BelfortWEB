import { ImageResponse } from "next/og";

export const alt = "Academia Belfort — Musculação e Cross Training em Belém";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#0D1F3C",
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(204,55,56,0.35) 0%, transparent 60%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#fff",
            display: "flex",
          }}
        >
          BEL<span style={{ color: "#CC3738" }}>FORT</span>
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)", marginTop: 24, display: "flex" }}>
          Musculação &amp; Cross Training em Belém
        </div>
      </div>
    ),
    { ...size },
  );
}
