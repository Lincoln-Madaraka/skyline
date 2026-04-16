"use client";
import LegalModal, { useLegalModal } from "./LegalModal";

export default function LegalLinks() {
  const { legalType, openLegal, closeLegal } = useLegalModal();

  return (
    <>
      <div className="legal">
        <button className="legal-link" onClick={() => openLegal("privacy")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Privacy
        </button>
        <button className="legal-link" onClick={() => openLegal("terms")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          Terms
        </button>
        <button className="legal-link" onClick={() => openLegal("cookies")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>
          Cookies
        </button>
      </div>
      <LegalModal type={legalType} onClose={closeLegal} />
    </>
  );
}
