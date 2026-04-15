"use client";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialFloat() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [visible, dismissed]);

  if (dismissed) return null;
  const t = testimonials[idx];

  return (
    <aside className={`testimonial-float ${visible ? "in" : ""}`} aria-live="polite">
      <button className="tf-close" onClick={() => setDismissed(true)} aria-label="Dismiss">×</button>
      <div className="tf-stars" aria-hidden="true">★★★★★</div>
      <p className="tf-quote">“{t.quote}”</p>
      <div className="tf-meta">
        <span className="tf-author">{t.author}</span>
        <span className="tf-role">{t.role}</span>
      </div>
      <div className="tf-dots" aria-hidden="true">
        {testimonials.map((_, i) => (
          <span key={i} className={`tf-dot ${i === idx ? "active" : ""}`} />
        ))}
      </div>
    </aside>
  );
}
