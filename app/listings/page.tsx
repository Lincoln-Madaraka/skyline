import { prisma } from "@/lib/prisma";
import { dbToListing } from "@/lib/propertyAdapter";
import ListingCard from "../components/ListingCard";
import Reveal from "../components/Reveal";

export const metadata = { title: "Listings — Skyline" };
export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const rows = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });
  const listings = rows.map(dbToListing);

  return (
    <>
      <header className="page-hero dark">
        <img className="ph-bg" src="/images/hero/hero-home-exterior-01.webp" alt="" aria-hidden="true" />
        <div className="page-hero-copy">
          <span className="kicker">All listings</span>
          <h1>Homes worth your time.</h1>
          <p>Every listing is on-brief, priced fairly and verified before it reaches this page.</p>
        </div>
      </header>
      <section>
        {listings.length === 0 ? (
          <div className="empty-state" style={{ padding: "4rem 1rem" }}>
            <strong>No listings yet</strong>
            Check back soon — new properties are added regularly.
          </div>
        ) : (
          <div className="grid">
            {listings.map((l, i) => (
              <Reveal key={l.dbId} delay={i * 70}><ListingCard l={l} dbId={l.dbId} /></Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
