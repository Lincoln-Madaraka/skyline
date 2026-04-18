"use client";
import { useState } from "react";
import { useAccount } from "./AccountContext";
import type { Listing } from "@/lib/listings";

export default function ViewingRequest({ listing, propertyId }: { listing: Listing; propertyId: string }) {
  const { user, openAuth } = useAccount();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [intent, setIntent] = useState<"viewing" | "more-info" | "agreement">("viewing");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);
    const prefix = intent === "viewing"
      ? `Viewing request${date ? ` — preferred date ${date}` : ""}:\n`
      : intent === "more-info" ? "More info request:\n" : "Start buying process:\n";
    const message = `${prefix}${note || "(no additional note)"}`;
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          name: user.name,
          email: user.email,
          message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const label: Record<string, string> = {
    viewing: "Request a viewing",
    "more-info": "Request more information",
    agreement: "Start purchase conversation",
  };

  return (
    <>
      <div className="cta-stack">
        <button className="btn" onClick={() => (user ? setOpen(true) : openAuth("signup"))}>
          {user ? "Request viewing" : "Sign up to request viewing"}
        </button>
        <button className="btn ghost" onClick={() => { setIntent("more-info"); user ? setOpen(true) : openAuth("signup"); }}>
          Ask for more info
        </button>
        <button className="btn ghost" onClick={() => { setIntent("agreement"); user ? setOpen(true) : openAuth("signup"); }}>
          Start buying process
        </button>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => !sent && setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
            {sent ? (
              <>
                <span className="kicker">Request received</span>
                <h2>We&apos;ve got it {user?.name}.</h2>
                <p className="modal-lede">Skyline will come back within one working day with next steps on <strong>{listing.title}</strong>. Check <strong>{user?.email}</strong> for the confirmation.</p>
                <button className="btn" onClick={() => setOpen(false)}>Close</button>
              </>
            ) : (
              <>
                <span className="kicker">{listing.area} · {listing.price}</span>
                <h2>{label[intent]}</h2>
                <p className="modal-lede">Property: <strong>{listing.title}</strong></p>
                <form className="contact-form inline" onSubmit={submit}>
                  <label className="field">
                    <span>Intent</span>
                    <select value={intent} onChange={(e) => setIntent(e.target.value as typeof intent)}>
                      <option value="viewing">Book a viewing</option>
                      <option value="more-info">Request more info</option>
                      <option value="agreement">Start the buying process</option>
                    </select>
                  </label>
                  {intent === "viewing" && (
                    <label className="field">
                      <span>Preferred date</span>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                  )}
                  <label className="field">
                    <span>Anything else?</span>
                    <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Financing questions specific rooms timing..." />
                  </label>
                  {error && <div className="auth-error">{error}</div>}
                  <div className="modal-meta">
                    Sending as <strong>{user?.name}</strong> &lt;{user?.email}&gt;
                  </div>
                  <button className="btn" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send request"}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
