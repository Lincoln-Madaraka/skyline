import { notFound } from "next/navigation";
import Link from "next/link";
import { findListing, listings } from "@/lib/listings";
import ListingCard from "@/app/components/ListingCard";
import ViewingRequest from "@/app/components/ViewingRequest";
import SaveButton from "@/app/components/SaveButton";
import Reveal from "@/app/components/Reveal";

export function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const l = findListing(params.id);
  return { title: l ? `${l.title} — Skyline` : "Listing — Skyline" };
}

export default function ListingDetail({ params }: { params: { id: string } }) {
  const l = findListing(params.id);
  if (!l) notFound();

  const related = listings.filter((x) => x.id !== l.id).slice(0, 3);

  return (
    <>
      <section className="detail-hero">
        <img src={l.image} alt={l.alt} />
        <div className="detail-hero-overlay" />
      </section>

      <section className="detail-top">
        <div className="detail-head">
          <span className="kicker">{l.area} · {l.propertyType} · {l.status}</span>
          <h1>{l.title}</h1>
          <p className="detail-summary">{l.summary}</p>
        </div>
        <div className="detail-price-card">
          <div className="detail-price">{l.price}</div>
          <ul className="detail-specs">
            <li><span>Beds</span><strong>{l.beds}</strong></li>
            <li><span>Baths</span><strong>{l.baths}</strong></li>
            {l.parking !== undefined && <li><span>Parking</span><strong>{l.parking}</strong></li>}
            {l.plotSize && <li><span>Size</span><strong>{l.plotSize}</strong></li>}
            {l.yearBuilt && <li><span>Built</span><strong>{l.yearBuilt}</strong></li>}
          </ul>
          <ViewingRequest listing={l} />
          <div className="detail-save"><SaveButton id={l.id} /></div>
        </div>
      </section>

      <section className="detail-body">
        <div className="detail-col">
          <Reveal>
            <h2>About this home</h2>
            {(l.about ?? [l.summary]).map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>

          <Reveal delay={80}>
            <h3>What stands out</h3>
            <div className="chip-row large">
              {l.highlights.map((h) => (
                <span className="feature-chip" key={h.label} tabIndex={0}>
                  {h.label}
                  <span className="feature-tooltip" role="tooltip">{h.tooltip}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {l.amenities && (
            <Reveal delay={160}>
              <h3>Amenities</h3>
              <ul className="amenity-list">
                {l.amenities.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Reveal>
          )}

          <Reveal delay={220}>
            <div className="detail-note">
              <strong>Skyline note:</strong> {l.quickFact}
            </div>
          </Reveal>
        </div>

        <aside className="detail-side">
          <Reveal>
            <div className="area-context">
              <span className="kicker">About {l.area}</span>
              <h3>Why buyers pick {l.area}</h3>
              <p>Read the full neighborhood profile before a viewing. It will tell you which questions to ask when you are on site.</p>
              <Link className="btn ghost" href={`/areas#${l.area.toLowerCase()}`}>Open {l.area} profile →</Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="area-context">
              <span className="kicker">Still deciding</span>
              <h3>Not sure yet?</h3>
              <p>Skyline will send a short brief comparing this home to two other on-brief options in your budget.</p>
              <Link className="btn ghost" href="/contact">Ask for a comparison →</Link>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="alt-bg">
        <Reveal><span className="kicker">Keep looking</span></Reveal>
        <Reveal delay={60}><h2>Related listings.</h2></Reveal>
        <div className="grid">
          {related.map((r, i) => (
            <Reveal key={r.id} delay={i * 80}><ListingCard l={r} /></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
