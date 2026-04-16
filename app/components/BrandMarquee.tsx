"use client";
import { partners } from "@/lib/partners";
import { useState } from "react";

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="marquee-item">
      {!failed ? (
        <img
          src={logo}
          alt={name}
          className="marquee-logo"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <span className="marquee-fallback">{name.charAt(0)}</span>
      )}
      <span className="marquee-name">{name}</span>
    </span>
  );
}

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
            <PartnerLogo key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
