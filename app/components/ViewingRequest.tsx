"use client";
import { useState } from "react";
import { useAccount } from "./AccountContext";
import type { Listing } from "@/lib/listings";

export default function ViewingRequest({ listing }: { listing: Listing }) {
  const { user, openAuth } = useAccount();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [intent, setIntent] = useState<"viewing" | "more-info" | "agreement">("viewing");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: user?.name,
      email: user?.email,
      intent,
      listing: listing.id,
      listingTitle: listing.title,
      preferredDate: date,
      message: note,
      area: listing.area,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
    } catch {
      const subject = encodeURIComponent(`Skyline: ${intent} for ${listing.title}`);
      const body = encodeURIComponent(
        `Listing: ${listing.title} (${listing.id})\nArea: ${listing.area}\nPrice: ${listing.price}\nIntent: ${intent}\nPreferred date: ${date}\n\nFrom: ${user?.name} <${user?.email}>\n\n${note}`
      );
      window.location.href = `mailto:softwares.lincoln@gmail.com?subject=${subject}&body=${body}`;
    }
    setSent(true);
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
                  <div className="modal-meta">
                    Sending as <strong>{user?.name}</strong> &lt;{user?.email}&gt;
                  </div>
                  <button className="btn" type="submit">Send request</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
