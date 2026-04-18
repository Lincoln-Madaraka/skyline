"use client";
import Link from "next/link";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, reason }),
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Reset your password</h1>

        {sent ? (
          <div className="auth-success">
            <p>Your reset request has been sent to the Skyline admin team.</p>
            <p>An administrator will review your request and share a temporary password with you shortly.</p>
            <div className="auth-meta">
              <Link href="/login">Back to sign in</Link>
            </div>
          </div>
        ) : (
          <>
            <p className="auth-sub">
              We&apos;ll notify our admin team, who will reset your password and reach out with a temporary one.
            </p>

            <form onSubmit={onSubmit} className="auth-form">
              <label className="auth-field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label className="auth-field">
                <span>Brief message (optional)</span>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Anything the admin should know"
                />
              </label>

              <button className="btn auth-submit" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Request password reset"}
              </button>
            </form>

            <div className="auth-meta">
              <Link href="/login">Back to sign in</Link>
            </div>
          </>
        )}
    </AuthLayout>
  );
}
