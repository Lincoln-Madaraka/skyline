import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";

export const metadata = { title: "Contact — Skyline" };

export default function ContactPage() {
  return (
    <>
      <header className="page-hero">
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
            <ul>
              <li>
                <span className="kicker">Email</span>
                <a href="mailto:softwares.lincoln@gmail.com">Send a direct email</a>
              </li>
              <li>
                <span className="kicker">Phone</span>
                <a href="tel:+254759725607">Call the Skyline desk</a>
              </li>
              <li>
                <span className="kicker">LinkedIn</span>
                <a href="https://www.linkedin.com/in/lincoln01/" target="_blank" rel="noopener">Message on LinkedIn</a>
              </li>
            </ul>
            <p className="contact-note">Typical reply time: same working day. Viewings are usually booked within 72 hours.</p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
