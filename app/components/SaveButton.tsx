"use client";
import { useAccount } from "./AccountContext";

export default function SaveButton({ id, compact = false }: { id: string; compact?: boolean }) {
  const { saved, toggleSaved, user, openAuth } = useAccount();
  const isSaved = saved.includes(id);
  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openAuth("signup"); return; }
    toggleSaved(id);
  }
  return (
    <button
      className={`save-btn ${isSaved ? "active" : ""} ${compact ? "compact" : ""}`}
      onClick={onClick}
      aria-label={isSaved ? "Remove from saved" : "Save listing"}
      title={isSaved ? "Saved" : "Save for later"}
    >
      <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {!compact && <span>{isSaved ? "Saved" : "Save"}</span>}
    </button>
  );
}
