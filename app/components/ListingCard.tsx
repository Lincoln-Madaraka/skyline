import Link from "next/link";
import type { Listing } from "@/lib/listings";
import SaveButton from "./SaveButton";

export default function ListingCard({ l, dbId }: { l: Listing; dbId?: string }) {
  return (
    <article className="card">
      <Link href={`/listings/${l.id}`} className="card-link" aria-label={`${l.title} in ${l.area}`}>
        <div className="card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.image} alt={l.alt} />
          <div className="card-badges" aria-label={`Listing status and type for ${l.title}`}>
            <span className="badge badge-solid">{l.status}</span>
            <span className="badge">{l.propertyType}</span>
          </div>
          <div className="card-save"><SaveButton id={dbId ?? l.id} compact /></div>
        </div>
        <div className="card-body">
          <p className="card-kicker">{l.area} · {l.beds} bd · {l.baths} ba</p>
          <h3>{l.title}</h3>
          <p className="card-summary">{l.summary}</p>
          <div className="chip-row">
            {l.highlights.slice(0,3).map((h) => (
              <span className="feature-chip" key={h.label}>{h.label}</span>
            ))}
          </div>
          <p className="price-note">{l.quickFact}</p>
          <div className="card-footer">
            <p className="price">{l.price}</p>
            <span className="view-link">View details →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
