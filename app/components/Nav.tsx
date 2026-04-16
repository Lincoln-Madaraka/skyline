"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "./AccountContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/areas", label: "Areas" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { user, signOut, openAuth, saved } = useAccount();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onHero = true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const navClass = [
    "site-nav",
    onHero ? "on-hero" : "on-page",
    scrolled ? "scrolled" : "",
    open ? "open" : "",
  ].filter(Boolean).join(" ");

  return (
    <nav className={navClass}>
      <div className="nav-inner">
        <Link className="logo" href="/" aria-label="Skyline home">
          <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="currentColor">
              <rect x="5" y="17" width="4" height="10"/>
              <rect x="10" y="12" width="5" height="15"/>
              <rect x="16" y="8" width="4" height="19"/>
              <rect x="21" y="14" width="3" height="13"/>
              <rect x="25" y="19" width="2" height="8"/>
            </g>
            <rect x="3" y="27" width="26" height="1.2" fill="#c8a37a"/>
          </svg>
          <span className="logo-word">SKYLINE</span>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
          <span /><span /><span />
        </button>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link className={`nav-link ${isActive(l.href) ? "active" : ""}`} href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className={`nav-link nav-link-owner ${isActive("/list-your-property") ? "active" : ""}`} href="/list-your-property">
              List Your Property
            </Link>
          </li>
          <li className="nav-auth-wrap">
            {user ? (
              <div className="nav-user">
                <span className="nav-user-name">Hi {user.name.split(" ")[0]}</span>
                {saved.length > 0 && <span className="nav-saved-pill">{saved.length}</span>}
                <button className="linklike" onClick={signOut}>Sign out</button>
              </div>
            ) : (
              <div className="nav-auth">
                <button className="linklike" onClick={() => openAuth("signin")}>Sign in</button>
                <button className="btn small" onClick={() => openAuth("signup")}>Create account</button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
