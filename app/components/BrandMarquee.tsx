import { partners } from "@/lib/partners";

export default function BrandMarquee() {
  const loop = [...partners, ...partners];
  return (
    <section className="marquee-section">
      <div className="marquee-heading">
        <span className="kicker">Trusted alongside</span>
        <h3>Banks, valuers and developers we work with</h3>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((p, i) => (
            <span className="marquee-item" key={`${p.name}-${i}`}>{p.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
