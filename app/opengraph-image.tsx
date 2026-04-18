import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Skyline — Nairobi Real Estate";
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
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #2b2a28 0%, #3a362f 55%, #5a4a34 100%)",
          color: "#e8ddc9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#e8ddc9" />
            <g fill="#2b2a28">
              <rect x="5" y="17" width="4" height="10" />
              <rect x="10" y="12" width="5" height="15" />
              <rect x="16" y="8" width="4" height="19" />
              <rect x="21" y="14" width="3" height="13" />
              <rect x="25" y="19" width="2" height="8" />
            </g>
            <rect x="3" y="27" width="26" height="1" fill="#8a6a48" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
            Skyline
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Nairobi Real Estate,
            <br />
            reimagined.
          </div>
          <div style={{ fontSize: 30, color: "#c8bba1", maxWidth: 900 }}>
            Premium homes, apartments and commercial listings across Kilimani,
            Westlands, Karen, Lavington and Runda.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8a6a48",
            borderTop: "1px solid #5a4a34",
            paddingTop: 24,
          }}
        >
          <div>skyline-nairobi.com</div>
          <div>Curated. Verified. Move-in ready.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
