import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";

export const metadata = { title: "Contact — Skyline" };

export default function ContactPage() {
  return (
    <>
      <header className="page-hero dark">
        <img className="ph-bg" src="/images/sections/support-owner-cta-01.webp" alt="" aria-hidden="true" />
        <div className="page-hero-copy">
          <span className="kicker">Say hello</span>
          <h1>Tell us what you're looking for.</h1>
          <p>Three homes on-brief, one honest conversation and no unsolicited follow-ups. Fill this in and we will be back within one working day.</p>
        </div>
      </header>

      <section className="contact-layout">
        <Reveal><ContactForm /></Reveal>
        <Reveal delay={120}>
          <aside className="contact-aside">
            <h3>Other ways to reach us</h3>
            <ul className="contact-methods">
              <li>
                <span className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <div>
                  <span className="kicker">Email</span>
                  <a href="mailto:softwares.lincoln@gmail.com">Send a direct email</a>
                </div>
              </li>
              <li>
                <span className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <span className="kicker">Phone</span>
                  <a href="tel:+254759725607">Call the Skyline desk</a>
                </div>
              </li>
              <li>
                <span className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </span>
                <div>
                  <span className="kicker">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/lincoln01/" target="_blank" rel="noopener">Message on LinkedIn</a>
                </div>
              </li>
            </ul>
            <p className="contact-note">Typical reply time: same working day. Viewings are usually booked within 72 hours.</p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
