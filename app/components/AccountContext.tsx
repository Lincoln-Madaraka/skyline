"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut as nextSignOut } from "next-auth/react";
import type { Role } from "@prisma/client";

type SessionUser = { id: string; name: string; email: string; role: Role; realtorApproved: boolean } | null;

type Ctx = {
  user: SessionUser;
  saved: string[];
  signOut: () => void;
  toggleSaved: (id: string) => void;
  openAuth: (mode?: "signin" | "signup") => void;
};

const AccountCtx = createContext<Ctx | null>(null);

export function useAccount() {
  const v = useContext(AccountCtx);
  if (!v) throw new Error("useAccount must be used inside AccountProvider");
  return v;
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const user: SessionUser = session?.user
    ? {
        id: session.user.id,
        name: session.user.name || session.user.email || "",
        email: session.user.email || "",
        role: session.user.role,
        realtorApproved: session.user.realtorApproved,
      }
    : null;

  // Load saved: from DB if logged in, else localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (user) {
        try {
          const res = await fetch("/api/saved");
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) setSaved(data.saved.map((s: { propertyId: string }) => s.propertyId));
          }
        } catch {}
      } else {
        try {
          const s = localStorage.getItem("skyline_saved");
          if (s && !cancelled) setSaved(JSON.parse(s));
        } catch {}
      }
      if (!cancelled) setHydrated(true);
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) localStorage.setItem("skyline_saved", JSON.stringify(saved));
  }, [saved, user, hydrated]);

  async function toggleSaved(id: string) {
    if (!user) {
      setSaved((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
      return;
    }
    const isSaved = saved.includes(id);
    setSaved((prev) => (isSaved ? prev.filter((p) => p !== id) : [...prev, id]));
    try {
      await fetch("/api/saved", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ propertyId: id }),
      });
    } catch {}
  }

  const value: Ctx = {
    user,
    saved,
    signOut: async () => {
      await nextSignOut({ redirect: false });
      router.push("/");
      router.refresh();
    },
    toggleSaved,
    openAuth: (mode = "signin") => {
      router.push(mode === "signup" ? "/signup" : "/login");
    },
  };
  return <AccountCtx.Provider value={value}>{children}</AccountCtx.Provider>;
}
