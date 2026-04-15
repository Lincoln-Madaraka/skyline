import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata = { title: "Careers — Skyline" };

const roles = [
  {
    title: "Real Estate Advisor",
    focus: "Buyer-side advisory",
    blurb: "Owns a buyer from first enquiry to close. Runs viewings negotiates and keeps the client brief tight.",
    duties: [
      "Run qualified viewings in Karen Runda Lavington and Westlands",
      "Manage offer negotiation and closing documentation",
      "Keep our CRM honest and buyer updates on a weekly rhythm",
    ],
  },
  {
    title: "Listings Specialist",
    focus: "Seller-side channel",
    blurb: "Onboards owners prices listings and curates the buyer pool that actually gets shown a home.",
    duties: [
      "Run comparables and set listing price with the owner",
      "Vet buyer intent before booking any viewing",
      "Coordinate photographers floorplans and legal routing",
    ],
  },
  {
    title: "Client Experience Lead",
    focus: "Process and polish",
    blurb: "Keeps every Skyline interaction on-brand: reply times viewing logistics and handover quality.",
    duties: [
      "Own the end-to-end client journey standard",
      "Run the weekly pipeline review with the advisory team",
      "Ship small product and content improvements to the site",
    ],
  },
  {
    title: "Marketing & Content Associate",
    focus: "Demand generation",
    blurb: "Builds the top of funnel. Area write-ups investor briefings short videos and the occasional dinner.",
    duties: [
      "Produce neighborhood content and listing collateral",
      "Manage email and LinkedIn distribution",
      "Coordinate partner events with banks and developers",
    ],
  },
  {
    title: "Operations & Compliance",
    focus: "Back office",
    blurb: "Ensures the paper trail is always clean: KYC escrow routing and land-registry checks.",
    duties: [
      "Run KYC and AML checks on every transaction",
      "Manage the transaction calendar and deadlines",
      "Keep supplier and bank partners on the right contracts",
    ],
  },
  {
    title: "Product & Engineering",
    focus: "Internal tools",
    blurb: "Builds the tools the Skyline team uses. Lightweight focused and shipped in weeks not quarters.",
    duties: [
      "Maintain the listing CMS and public site",
      "Wire integrations with email CRM and analytics",
      "Prototype and ship internal dashboards for the advisory team",
    ],
  },
];

const values = [
  { title: "On-brief only", body: "We would rather show three right homes than thirty almost-right ones. Time is the real currency." },
  { title: "No spam ever", body: "We do not mass-market. Clients opt in to specific briefs and hear from us only when something fits." },
  { title: "Honest comparables", body: "We price from real closes. If a listing is over-priced we say so before we take it." },
  { title: "Quiet execution", body: "Fewer launches tighter process. The best Skyline week is the one where nothing went wrong." },
  { title: "Bias to owners", body: "Owners trust us with large decisions. We optimize for their long-term position over short-term fees." },
  { title: "Small team on purpose", body: "We stay deliberately lean. Every hire raises the bar of the team they join." },
];

export default function CareersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="page-hero-copy">
          <span className="kicker">Careers</span>
          <h1>Build the most trusted home for Nairobi real estate.</h1>
          <p>Skyline is a small deliberately-paced team. We hire quietly when a clear gap appears rather than on a rolling calendar. Here is the shape of the team and what to watch for when a role opens.</p>
        </div>
      </header>

      <section>
        <Reveal><span className="kicker">Current openings</span></Reveal>
        <Reveal delay={60}><h2>None at the moment.</h2></Reveal>
        <Reveal delay={120}>
          <p className="lede">We are not actively hiring right now. If one of the roles below resonates with you send a note. We keep warm introductions on file and come back to them when a seat opens up.</p>
        </Reveal>
        <Reveal delay={180}>
          <Link className="btn" href="/contact">Send a warm intro</Link>
        </Reveal>
      </section>

      <section className="alt-bg">
        <Reveal><span className="kicker">The roles we hire for</span></Reveal>
        <Reveal delay={60}><h2>Where Skyline makes new seats.</h2></Reveal>
        <Reveal delay={120}><p className="lede">These are the six functions that run the business. When we grow it is usually inside one of these buckets.</p></Reveal>
        <div className="roles-grid">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div className="role-card">
                <span className="role-status">{r.focus}</span>
                <h3>{r.title}</h3>
                <p>{r.blurb}</p>
                <ul>
                  {r.duties.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal><span className="kicker">How we work</span></Reveal>
        <Reveal delay={60}><h2>Work ethic in six lines.</h2></Reveal>
        <div className="values-grid">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="value"><h3>{v.title}</h3><p>{v.body}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <Reveal>
          <div>
            <h2>Think you would fit one of these?</h2>
            <p>Send a note with the role that resonates and a short paragraph on why. We will keep the intro on file for when we next open that seat.</p>
            <Link className="btn" href="/contact">Reach out</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
