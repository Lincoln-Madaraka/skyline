import type { Listing } from "./listings";

export type DbProperty = {
  id: string;
  slug: string;
  title: string;
  area: string;
  beds: number;
  baths: number;
  priceLabel: string;
  coverImage: string | null;
  saleStatus: string;
  propertyType: string;
  summary: string;
  quickFact: string | null;
  highlights: string | null;
  plotSize: string | null;
  yearBuilt: number | null;
  parking: number | null;
  amenities: string | null;
  about: string | null;
  images?: { url: string; alt: string | null }[];
};

function safeParse<T>(s: string | null, fallback: T): T {
  if (!s) return fallback;
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

export function dbToListing(p: DbProperty): Listing & { dbId: string; slug: string } {
  const firstImage = p.coverImage ?? p.images?.[0]?.url ?? "/images/listings/placeholder.webp";
  const alt = p.images?.[0]?.alt ?? p.title;
  const highlights = safeParse<{ label: string; tooltip: string }[]>(p.highlights, []);

  return {
    id: p.slug, // keep slug for URLs so existing components work
    dbId: p.id,
    slug: p.slug,
    title: p.title,
    area: p.area,
    beds: p.beds,
    baths: p.baths,
    price: p.priceLabel,
    image: firstImage,
    alt,
    status: p.saleStatus,
    propertyType: p.propertyType,
    summary: p.summary,
    quickFact: p.quickFact ?? "",
    highlights,
    plotSize: p.plotSize ?? undefined,
    yearBuilt: p.yearBuilt ?? undefined,
    parking: p.parking ?? undefined,
    amenities: safeParse<string[]>(p.amenities, undefined as unknown as string[]) || undefined,
    about: safeParse<string[]>(p.about, undefined as unknown as string[]) || undefined,
  };
}
