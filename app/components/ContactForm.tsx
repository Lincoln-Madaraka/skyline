"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", intent: "buy", area: "Karen", message: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      const subject = encodeURIComponent(`Skyline enquiry: ${form.intent} in ${form.area}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nIntent: ${form.intent}\nArea: ${form.area}\n\n${form.message}`
      );
      window.location.href = `mailto:softwares.lincoln@gmail.com?subject=${subject}&body=${body}`;
      setState("sent");
    }
  }

  if (state === "sent") {
    return (
      <div className="contact-thanks">
        <span className="kicker">Thanks {form.name || "—"}</span>
        <h3>We've got it.</h3>
        <p>Skyline will be in touch within one working day. If it is urgent call <a href="tel:+254759725607">the desk</a>.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Your name</span>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
        </label>
        <label className="field">
          <span>Email</span>
          <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@domain.com" />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Phone</span>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+254 ..." />
        </label>
        <label className="field">
          <span>Looking to</span>
          <select value={form.intent} onChange={(e) => set("intent", e.target.value)}>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell / List</option>
            <option value="invest">Invest</option>
          </select>
        </label>
      </div>
      <label className="field">
        <span>Preferred area</span>
        <select value={form.area} onChange={(e) => set("area", e.target.value)}>
          {["Karen","Runda","Lavington","Kilimani","Westlands","Kileleshwa","Open to suggestions"].map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>What are you looking for?</span>
        <textarea rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Budget bedrooms lifestyle timeline..." />
      </label>
      <button className="btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send enquiry"}
      </button>
      <p className="form-note">We reply within one working day. No marketing spam ever.</p>
    </form>
  );
}
