"use client";
import { useState } from "react";
import { useAccount } from "./AccountContext";

export default function AuthModal() {
  const { authOpen, closeAuth, signIn, openAuth } = useAccount();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);

  if (!authOpen) return null;
  const isSignup = authOpen === "signup";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    signIn({ name: name || email.split("@")[0], email });
    setName(""); setEmail(""); setPassword("");
  }

  return (
    <div className="modal-backdrop" onClick={closeAuth}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={closeAuth} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Logo */}
        <div className="auth-logo">
          <svg className="logo-mark" viewBox="0 0 32 32" width="36" height="36" aria-hidden="true">
            <g fill="var(--charcoal)">
              <rect x="5" y="17" width="4" height="10"/>
              <rect x="10" y="12" width="5" height="15"/>
              <rect x="16" y="8" width="4" height="19"/>
              <rect x="21" y="14" width="3" height="13"/>
              <rect x="25" y="19" width="2" height="8"/>
            </g>
            <rect x="3" y="27" width="26" height="1.2" fill="#c8a37a"/>
          </svg>
        </div>

        <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
        <p className="modal-lede">{isSignup ? "Save homes, request viewings and track your shortlist." : "Sign in to pick up where you left off."}</p>

        <form className="auth-form" onSubmit={onSubmit}>
          {isSignup && (
            <label className="auth-field">
              <span className="auth-field-label">Full name</span>
              <div className="auth-input-wrap">
                <svg className="auth-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
            </label>
          )}

          <label className="auth-field">
            <span className="auth-field-label">Email address</span>
            <div className="auth-input-wrap">
              <svg className="auth-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
            </div>
          </label>

          <label className="auth-field">
            <span className="auth-field-label">{isSignup ? "Create password" : "Password"}</span>
            <div className="auth-input-wrap">
              <svg className="auth-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input required type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignup ? "Min. 8 characters" : "Enter your password"} />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"}>
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </label>

          <div className="auth-options">
            <label className="auth-check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="auth-checkmark" />
              <span>Keep me signed in</span>
            </label>
            {!isSignup && <button type="button" className="auth-forgot" onClick={() => {}}>Forgot password?</button>}
          </div>

          <button className="btn auth-submit" type="submit">
            {isSignup ? (
              <>Create account <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></>
            ) : (
              <>Sign in <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg></>
            )}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <p className="modal-switch">
          {isSignup ? "Already have an account?" : "New to Skyline?"}{" "}
          <button className="linklike auth-switch-btn" onClick={() => openAuth(isSignup ? "signin" : "signup")}>
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}
