import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Skyline — Nairobi Real Estate",
    short_name: "Skyline",
    description:
      "Premium homes, apartments and commercial listings across Nairobi.",
    start_url: "/",
    display: "standalone",
    background_color: "#2b2a28",
    theme_color: "#2b2a28",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
