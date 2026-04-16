"use client";
import { useState } from "react";

type LegalType = "privacy" | "terms" | "cookies" | null;

const content: Record<Exclude<LegalType, null>, {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  sections: { icon: JSX.Element; title: string; body: string }[];
}> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we handle your personal information",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    sections: [
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
        title: "What we collect",
        body: "We collect your name, email address, phone number and property preferences when you submit a form or create an account. We do not collect data passively beyond standard server logs."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
        title: "How we protect it",
        body: "All data is encrypted in transit via TLS. Account credentials are hashed. We do not sell, rent or share your personal information with third parties for marketing purposes."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>,
        title: "Your rights",
        body: "You may request access to, correction of, or deletion of your personal data at any time by emailing us. We will respond within 5 working days."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
        title: "Third-party services",
        body: "We use essential analytics and email delivery tools only. No advertising trackers are installed. Your data stays within the services required to operate Skyline."
      },
    ]
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Rules of engagement when using Skyline",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
    sections: [
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
        title: "Acceptance",
        body: "By using Skyline you agree to these terms. If you do not agree, please do not use our services. We may update terms from time to time and continued use constitutes acceptance."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
        title: "Listings & accuracy",
        body: "Skyline curates listings in good faith but does not guarantee the accuracy of prices, availability or property details. All information should be independently verified before making a commitment."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
        title: "Fees & payments",
        body: "Skyline does not charge buyers for browsing or requesting viewings. Seller listing fees are agreed on a case-by-case basis before any marketing begins."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
        title: "Limitation of liability",
        body: "Skyline acts as an intermediary and is not liable for disputes between buyers and sellers, property defects, or transaction outcomes. Use our services at your own discretion."
      },
    ]
  },
  cookies: {
    title: "Cookie Policy",
    subtitle: "How we use cookies on this site",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="8" r="1" fill="currentColor"/><circle cx="10" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><circle cx="12" cy="11" r="1" fill="currentColor"/></svg>,
    sections: [
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
        title: "What are cookies?",
        body: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
        title: "Essential cookies",
        body: "We use essential cookies to keep you signed in and remember your saved listings. These cannot be disabled as they are required for the site to function."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
        title: "Analytics cookies",
        body: "We use minimal analytics to understand which pages are visited and how the site performs. No personal data is shared with advertising networks."
      },
      {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
        title: "Managing cookies",
        body: "You can clear cookies through your browser settings at any time. Note that clearing essential cookies will sign you out and remove your saved listings."
      },
    ]
  },
};

export default function LegalModal({ type, onClose }: { type: LegalType; onClose: () => void }) {
  if (!type) return null;
  const data = content[type];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal legal-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="legal-header">
          <div className="legal-header-icon">{data.icon}</div>
          <h2>{data.title}</h2>
          <p className="modal-lede">{data.subtitle}</p>
        </div>

        <div className="legal-sections">
          {data.sections.map((s, i) => (
            <div className="legal-section" key={i}>
              <div className="legal-section-icon">{s.icon}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="legal-footer">
          <p>Last updated: April 2026. Questions? <a href="mailto:softwares.lincoln@gmail.com">Email us</a>.</p>
        </div>
      </div>
    </div>
  );
}

export function useLegalModal() {
  const [legalType, setLegalType] = useState<LegalType>(null);
  return { legalType, openLegal: setLegalType, closeLegal: () => setLegalType(null) };
}
