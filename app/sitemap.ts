import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://skyline-nairobi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/listings",
    "/areas",
    "/careers",
    "/contact",
    "/list-your-property",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/listings" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/listings" ? 0.9 : 0.6,
  }));
}
