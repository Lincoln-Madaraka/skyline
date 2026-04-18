import Link from "next/link";
import { areas } from "@/lib/areas";
import { prisma } from "@/lib/prisma";
import { dbToListing } from "@/lib/propertyAdapter";
import HeroSlideshow from "./components/HeroSlideshow";
import BrandMarquee from "./components/BrandMarquee";
import ListingCard from "./components/ListingCard";
import Reveal from "./components/Reveal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rows = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });
  const featuredListings = rows.map(dbToListing);
  const featuredAreas = areas.slice(0, 4);
  return (
    <>
      <HeroSlideshow />

      <section className="stats">
        <Reveal className="stat"><div><span className="stat-n">120+</span><span className="stat-l">Curated homes across Nairobi</span></div></Reveal>
        <Reveal className="stat" delay={80}><div><span className="stat-n">6</span><span className="stat-l">Focus neighborhoods</span></div></Reveal>
        <Reveal className="stat" delay={160}><div><span className="stat-n">KES 14M+</span><span className="stat-l">Entry price for featured stock</span></div></Reveal>
        <Reveal className="stat" delay={240}><div><span className="stat-n">100%</span><span className="stat-l">On-brief viewings only</span></div></Reveal>
      </section>

      <section id="areas">
        <Reveal><h2>Nairobi neighborhoods in demand</h2></Reveal>
        <Reveal delay={80}><p className="lede">Where serious buyers and owners concentrate. Pick a neighborhood to see the story behind the demand.</p></Reveal>
        <div className="area-grid">
          {featuredAreas.map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <Link className="area-card" href={`/areas#${a.slug}`}>
                <img src={a.image} alt={a.name} />
                <div className="area-card-body">
                  <h3>{a.name}</h3>
                  <p>{a.tagline}</p>
                  <span className="area-pill">{a.priceBand}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={360}><Link className="btn ghost" href="/areas">See all six areas →</Link></Reveal>
      </section>

      <section id="listings" className="alt-bg">
        <Reveal><h2>Featured listings this week</h2></Reveal>
        <Reveal delay={80}><p className="lede">A balanced mix of villas, apartments and townhouses across Nairobi's most sought-after neighborhoods.</p></Reveal>
        <div className="grid">
          {featuredListings.map((l, i) => (
            <Reveal key={l.dbId} delay={i * 100}><ListingCard l={l} dbId={l.dbId} /></Reveal>
          ))}
        </div>
        <Reveal delay={400}><Link className="btn ghost" href="/listings">View all listings →</Link></Reveal>
      </section>

      <BrandMarquee />

      <section className="support">
        <Reveal><img src="/images/sections/support-neighborhood-trust-01.webp" alt="Nairobi-inspired neighborhood streetscape" /></Reveal>
        <Reveal delay={120}>
          <div>
            <span className="kicker">Local knowledge</span>
            <h2>We only work the streets we actually know.</h2>
            <p className="lede">Skyline focuses on Nairobi's premium residential corridors: the compounds, the buildings and the quiet back roads that matter.</p>
            <Link className="btn" href="/areas">See all areas</Link>
          </div>
        </Reveal>
      </section>

      <section className="support flip">
        <Reveal><img src="/images/sections/support-owner-cta-01.webp" alt="Refined residential scene for property owners" /></Reveal>
        <Reveal delay={120}>
          <div>
            <span className="kicker">For Owners</span>
            <h2>List with people who actually sell.</h2>
            <p className="lede">Own a home in Karen, Runda, Lavington or similar? Reach a curated trust-first buyer pool through a team that screens before it markets.</p>
            <Link className="btn" href="/list-your-property">List your property</Link>
          </div>
        </Reveal>
      </section>

      <section className="cta-strip">
        <Reveal>
          <div>
            <h2>Ready to move forward?</h2>
            <p>Tell us what you are looking for and we will come back with three homes worth your time.</p>
            <Link className="btn" href="/contact">Get in touch</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
