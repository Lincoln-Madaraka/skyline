import { listings } from "@/lib/listings";
import ListingCard from "../components/ListingCard";
import Reveal from "../components/Reveal";

export const metadata = { title: "Listings — Skyline" };

export default function ListingsPage() {
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
        <div className="grid">
          {listings.map((l, i) => (
            <Reveal key={l.id} delay={i * 70}><ListingCard l={l} /></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
