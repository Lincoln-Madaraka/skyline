"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import type { Role } from "@prisma/client";

type Item = { href: string; label: string };

const navByRole: Record<Role, Item[]> = {
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview" },
    { href: "/dashboard/admin/users", label: "Users" },
    { href: "/dashboard/admin/properties", label: "Properties" },
    { href: "/dashboard/admin/inquiries", label: "Inquiries" },
    { href: "/dashboard/admin/resets", label: "Password Resets" },
    { href: "/dashboard/settings", label: "Settings" },
  ],
  REALTOR: [
    { href: "/dashboard/realtor", label: "Overview" },
    { href: "/dashboard/realtor/properties", label: "My Properties" },
    { href: "/dashboard/realtor/properties/new", label: "Post Property" },
    { href: "/dashboard/realtor/inquiries", label: "Inquiries" },
    { href: "/dashboard/settings", label: "Settings" },
  ],
  BUYER: [
    { href: "/dashboard/buyer", label: "Overview" },
    { href: "/dashboard/buyer/saved", label: "Saved Listings" },
    { href: "/dashboard/buyer/inquiries", label: "My Inquiries" },
    { href: "/dashboard/settings", label: "Settings" },
  ],
};

export default function DashShell({
  user,
  children,
}: {
  user: { name?: string | null; email?: string | null; role: Role };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navByRole[user.role];

  function isActive(href: string) {
    if (href === `/dashboard/${user.role.toLowerCase()}`) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  async function onSignOut() {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dash-layout">
      <button className="dash-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu">☰</button>
      <aside className={`dash-sidebar ${open ? "open" : ""}`}>
        <Link className="dash-brand" href="/">
          <svg className="dash-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="currentColor">
              <rect x="5" y="17" width="4" height="10" />
              <rect x="10" y="12" width="5" height="15" />
              <rect x="16" y="8" width="4" height="19" />
              <rect x="21" y="14" width="3" height="13" />
              <rect x="25" y="19" width="2" height="8" />
            </g>
            <rect x="3" y="27" width="26" height="1.2" fill="#c8a37a" />
          </svg>
          <span>SKYLINE</span>
        </Link>
        <span className="dash-role-pill">{user.role}</span>
        <nav className="dash-nav">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={isActive(it.href) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="dash-user">
          <strong>{user.name || user.email}</strong>
          <span>{user.email}</span>
          <button onClick={onSignOut}>Sign out</button>
        </div>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  );
}
