"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { name: string; email: string } | null;
type Ctx = {
  user: User;
  saved: string[];
  signIn: (u: { name: string; email: string }) => void;
  signOut: () => void;
  toggleSaved: (id: string) => void;
  openAuth: (mode?: "signin" | "signup") => void;
  closeAuth: () => void;
  authOpen: false | "signin" | "signup";
};

const AccountCtx = createContext<Ctx | null>(null);

export function useAccount() {
  const v = useContext(AccountCtx);
  if (!v) throw new Error("useAccount must be used inside AccountProvider");
  return v;
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [authOpen, setAuthOpen] = useState<false | "signin" | "signup">(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("skyline_user");
      const s = localStorage.getItem("skyline_saved");
      if (u) setUser(JSON.parse(u));
      if (s) setSaved(JSON.parse(s));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("skyline_user", JSON.stringify(user));
    else localStorage.removeItem("skyline_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("skyline_saved", JSON.stringify(saved));
  }, [saved]);

  const value: Ctx = {
    user,
    saved,
    signIn: (u) => { setUser(u); setAuthOpen(false); },
    signOut: () => setUser(null),
    toggleSaved: (id) =>
      setSaved((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])),
    openAuth: (mode = "signup") => setAuthOpen(mode),
    closeAuth: () => setAuthOpen(false),
    authOpen,
  };
  return <AccountCtx.Provider value={value}>{children}</AccountCtx.Provider>;
}
