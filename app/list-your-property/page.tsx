import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata = { title: "List Your Property — Skyline" };

const steps = [
  {
    n: "01", title: "Introduce your home",
    body: "Share the basics: area, price expectation, current tenancy and any timing you care about.",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    n: "02", title: "We qualify the market",
    body: "Skyline sets the listing brief, runs comparables and pre-screens the buyer pool before any outreach.",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>,
  },
  {
    n: "03", title: "On-brief viewings only",
    body: "We only bring buyers whose intent matches your home. No time wasters, no mass open-days.",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  },
  {
    n: "04", title: "Close cleanly",
    body: "A coordinated close: offer review, legal routing and hand-over without surprises.",
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
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
                <div className="step-head">
                  <div className="step-icon">{s.icon}</div>
                  <span className="step-n">{s.n}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              {i < steps.length - 1 && <div className="step-arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="alt-bg">
        <Reveal><h2>What owners get.</h2></Reveal>
        <Reveal delay={40}><p className="lede">A listing experience built around trust, discretion and results — not volume.</p></Reveal>
        <div className="benefits">
          {[
            {
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              title: "Pre-screened buyers",
              body: "Every viewing request is filtered on intent, budget and timeline before you hear about it.",
              tip: "We reject ~60% of enquiries before they reach you"
            },
            {
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
              title: "Honest comparables",
              body: "We price off real closes, not asking prices. You get the full picture before you commit.",
              tip: "Based on verified Nairobi transaction data"
            },
            {
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
              title: "Cleaner process",
              body: "One point of contact, one document trail, one coordinated close.",
              tip: "Average close: 45 days from first viewing"
            },
            {
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: "Discreet marketing",
              body: "Optional off-market listing for owners who prefer privacy over public exposure.",
              tip: "~30% of our closes happen off-market"
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="benefit">
                <div className="benefit-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="benefit-tip">{item.tip}</span>
              </div>
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
