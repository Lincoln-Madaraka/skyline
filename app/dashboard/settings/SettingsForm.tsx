"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  initial: { id: string; name: string; email: string; phone: string | null; bio: string | null };
};

export default function SettingsForm({ initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [bio, setBio] = useState(initial.bio ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, phone: phone || null, bio: bio || null }),
    });
    setLoading(false);
    if (res.ok) {
      setStatus("Saved.");
      router.refresh();
    } else {
      setStatus("Failed to save.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="auth-field">
          <span>Name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="auth-field">
          <span>Email</span>
          <input value={initial.email} disabled />
        </label>
        <label className="auth-field">
          <span>Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 700 000 000" />
        </label>
        <label className="auth-field full">
          <span>Short bio</span>
          <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description shown to other users." />
        </label>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <button className="btn-sm" type="submit" disabled={loading}>{loading ? "Saving…" : "Save profile"}</button>
        {status && <span style={{ fontSize: "0.85rem", color: status === "Saved." ? "var(--olive)" : "#8a2a1f" }}>{status}</span>}
      </div>
    </form>
  );
}
