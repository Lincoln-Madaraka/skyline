"use client";
import { useState } from "react";
import { useAccount } from "./AccountContext";

export default function AuthModal() {
  const { authOpen, closeAuth, signIn, openAuth } = useAccount();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!authOpen) return null;
  const isSignup = authOpen === "signup";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    signIn({ name: name || email.split("@")[0], email });
    setName(""); setEmail("");
  }

  return (
    <div className="modal-backdrop" onClick={closeAuth}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={closeAuth} aria-label="Close">×</button>
        <span className="kicker">{isSignup ? "Create account" : "Sign in"}</span>
        <h2>{isSignup ? "Save homes and request viewings in one click." : "Welcome back."}</h2>
        <p className="modal-lede">{isSignup ? "A lightweight account so you can save listings and request viewings without re-typing your details." : "Enter the email you signed up with to pick up where you left off."}</p>
        <form className="contact-form inline" onSubmit={onSubmit}>
          {isSignup && (
            <label className="field">
              <span>Your name</span>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </label>
          )}
          <label className="field">
            <span>Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
          </label>
          <button className="btn" type="submit">{isSignup ? "Create account" : "Sign in"}</button>
        </form>
        <p className="modal-switch">
          {isSignup ? "Already have an account?" : "New to Skyline?"}{" "}
          <button className="linklike" onClick={() => openAuth(isSignup ? "signin" : "signup")}>
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
