import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata = { title: "List Your Property — Skyline" };

const steps = [
  { n: "01", title: "Introduce your home", body: "Share the basics: area price expectation current tenancy and any timing you care about." },
  { n: "02", title: "We qualify the market", body: "Skyline sets the listing brief runs comparables and pre-screens the buyer pool before any outreach." },
  { n: "03", title: "On-brief viewings only", body: "We only bring buyers whose intent matches your home. No time wasters no mass open-days." },
  { n: "04", title: "Close cleanly", body: "A coordinated close: offer review legal routing and hand-over without surprises." },
];

export default function ListYourPropertyPage() {
  return (
    <>
      <header className="page-hero dark">
        <img className="ph-bg" src="/images/sections/support-owner-cta-01.webp" alt="" aria-hidden="true" />
        <div className="page-hero-copy">
          <span className="kicker">For Owners</span>
          <h1>List with people who actually sell.</h1>
          <p>Skyline is a curated trust-first channel for Nairobi residential sellers. Fewer listings tighter buyer pool faster close.</p>
          <Link className="btn" href="/contact">Start a listing conversation</Link>
        </div>
      </header>

      <section>
        <Reveal><span className="kicker">How it works</span></Reveal>
        <Reveal delay={60}><h2>A four-step listing process.</h2></Reveal>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="alt-bg">
        <Reveal><h2>What owners get.</h2></Reveal>
        <div className="benefits">
          {[
            ["Pre-screened buyers", "Every viewing request is filtered on intent budget and timeline before you hear about it."],
            ["Honest comparables", "We price off real closes not asking prices. You get the full picture before you commit."],
            ["Cleaner process", "One point of contact one document trail one coordinated close."],
            ["Discreet marketing", "Optional off-market listing for owners who prefer privacy over public exposure."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="benefit"><h3>{t}</h3><p>{b}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <Reveal>
          <div>
            <h2>Ready to list?</h2>
            <p>Tell us about your home and we will come back with a listing plan within one working day.</p>
            <Link className="btn" href="/contact">Start the conversation</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
