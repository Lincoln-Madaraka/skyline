"use client";
import { useEffect, useState } from "react";

type Slide = { image: string; alt: string; eyebrow: string; title: string; copy: string };

const slides: Slide[] = [
  {
    image: "/images/hero/hero-home-exterior-01.webp",
    alt: "Premium modern home exterior with warm daylight",
    eyebrow: "Karen · Runda · Lavington",
    title: "Find a home that feels like Nairobi.",
    copy: "Curated residences in Karen, Kilimani, Lavington, Westlands, Kileleshwa and Runda.",
  },
  {
    image: "/images/listings/listing-kilimani-apartment-living-01.webp",
    alt: "Bright apartment living room with city-facing windows",
    eyebrow: "Kilimani · Westlands",
    title: "Apartments that actually light up.",
    copy: "City-facing living with investor-ready fundamentals and strong rental visibility.",
  },
  {
    image: "/images/listings/listing-runda-townhouse-exterior-01.webp",
    alt: "Townhouse exterior with compound context and curb appeal",
    eyebrow: "Runda · Gated Estates",
    title: "Compound living for serious families.",
    copy: "Secure townhouses and homes designed for long-term family routines.",
  },
];

export default function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[idx];
  return (
    <header className="hero">
      {slides.map((sl, i) => (
        <img
          key={sl.image}
          className={`hero-img ${i === idx ? "show" : ""}`}
          src={sl.image}
          alt={sl.alt}
        />
      ))}
      <div className="hero-overlay" />
      <div className="hero-copy">
        <span className="hero-eyebrow">{s.eyebrow}</span>
        <h1 key={s.title}>{s.title}</h1>
        <p key={s.copy}>{s.copy}</p>
        <div className="hero-cta-row">
          <a className="btn" href="/listings">Browse Listings</a>
          <a className="btn secondary" href="/areas">See Areas</a>
        </div>
      </div>
      <div className="hero-dots" aria-hidden="true">
        {slides.map((_, i) => (
          <button key={i} className={`hero-dot ${i === idx ? "active" : ""}`} onClick={() => setIdx(i)} aria-label={`Slide ${i+1}`} />
        ))}
      </div>
    </header>
  );
}
