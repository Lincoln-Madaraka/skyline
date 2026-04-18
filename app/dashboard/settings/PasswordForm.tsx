"use client";
import { useState } from "react";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (next.length < 6) return setStatus("New password must be at least 6 characters.");
    if (next !== confirm) return setStatus("Passwords don't match.");
    setLoading(true);
    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (res.ok) {
      setStatus("Password changed.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } else {
      setStatus(data.error || "Failed to change password.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="auth-field">
          <span>Current password</span>
          <input type="password" required autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </label>
        <div />
        <label className="auth-field">
          <span>New password</span>
          <input type="password" required minLength={6} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} />
        </label>
        <label className="auth-field">
          <span>Confirm new password</span>
          <input type="password" required minLength={6} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem", alignItems: "center" }}>
        <button className="btn-sm" type="submit" disabled={loading}>{loading ? "Saving…" : "Change password"}</button>
        {status && <span style={{ fontSize: "0.85rem", color: status === "Password changed." ? "var(--olive)" : "#8a2a1f" }}>{status}</span>}
      </div>
    </form>
  );
}
