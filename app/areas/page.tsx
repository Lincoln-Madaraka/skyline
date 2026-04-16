import { areas } from "@/lib/areas";
import Reveal from "../components/Reveal";
import Link from "next/link";

export const metadata = { title: "Areas — Skyline" };

export default function AreasPage() {
  return (
    <>
      <header className="page-hero dark">
        <img className="ph-bg" src="/images/sections/support-neighborhood-trust-01.webp" alt="" aria-hidden="true" />
        <div className="page-hero-copy">
          <span className="kicker">Nairobi neighborhoods</span>
          <h1>Six corridors. One city.</h1>
          <p>Karen, Runda, Lavington, Kilimani, Westlands and Kileleshwa. The demand is not spread evenly. Here is how each neighborhood actually behaves.</p>
        </div>
      </header>

      <section>
        {areas.map((a, i) => (
          <Reveal key={a.slug} delay={i * 40}>
            <article id={a.slug} className={`area-row ${i % 2 ? "flip" : ""}`}>
              <img src={a.image} alt={a.name} />
              <div>
                <span className="kicker">{a.name} · Demand: {a.demand}</span>
                <h2>{a.tagline}</h2>
                <p>{a.intro}</p>
                <p className="area-vibe"><strong>Feel:</strong> {a.vibe}</p>
                <div className="area-meta">
                  <span><strong>Price band</strong><br/>{a.priceBand}</span>
                  <span><strong>Best for</strong><br/>{a.bestFor.join(" · ")}</span>
                </div>
                <Link className="btn ghost" href="/listings">See homes in {a.name} →</Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="cta-strip">
        <Reveal>
          <div>
            <h2>Not sure which area fits?</h2>
            <p>Tell us your budget household and timeline. We will match you to the right two or three corridors.</p>
            <Link className="btn" href="/contact">Talk to us</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
