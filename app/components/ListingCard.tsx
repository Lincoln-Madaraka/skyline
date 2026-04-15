import type { Listing } from "@/lib/listings";

export default function ListingCard({ l }: { l: Listing }) {
  return (
    <article className="card">
      <div className="card-media">
        <img src={l.image} alt={l.alt} />
        <div className="card-badges" aria-label={`Listing status and type for ${l.title}`}>
          <span className="badge badge-solid">{l.status}</span>
          <span className="badge">{l.propertyType}</span>
        </div>
      </div>
      <div className="card-body">
        <p className="card-kicker">{l.area} · {l.beds} bd · {l.baths} ba</p>
        <h3>{l.title}</h3>
        <p className="card-summary">{l.summary}</p>
        <div className="chip-row" aria-label={`Highlights for ${l.title}`}>
          {l.highlights.map((h) => (
            <span className="feature-chip" key={h.label} tabIndex={0}>
              {h.label}
              <span className="feature-tooltip" role="tooltip">{h.tooltip}</span>
            </span>
          ))}
        </div>
        <p className="price-note">{l.quickFact}</p>
        <p className="price">{l.price}</p>
      </div>
    </article>
  );
}
