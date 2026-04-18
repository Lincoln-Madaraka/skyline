"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";

type RoleChoice = "BUYER" | "REALTOR";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleChoice>("BUYER");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create account.");
        setLoading(false);
        return;
      }
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (!loginRes || loginRes.error) {
        router.push("/login");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-sub">Join Skyline as a buyer or a realtor.</p>

        <div className="role-picker">
          <button
            type="button"
            className={`role-option ${role === "BUYER" ? "is-active" : ""}`}
            onClick={() => setRole("BUYER")}
          >
            <strong>Buyer</strong>
            <span>Explore and save listings, send inquiries.</span>
          </button>
          <button
            type="button"
            className={`role-option ${role === "REALTOR" ? "is-active" : ""}`}
            onClick={() => setRole("REALTOR")}
          >
            <strong>Realtor</strong>
            <span>List properties (admin approval required).</span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <label className="auth-field">
            <span>Full name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </label>
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
            <span>Phone (optional)</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 700 000 000"
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

      <div className="auth-meta">
        <span>Already have an account?</span>
        <Link href="/login">Sign in</Link>
      </div>
    </AuthLayout>
  );
}
