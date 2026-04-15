import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link className="logo" href="/" aria-label="Skyline home">
        <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
          <g fill="#ffffff">
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
      <ul className="nav-links">
        <li>
          <Link className="nav-link" href="/listings">
            <span className="nav-link-kicker">Explore</span>
            <span className="nav-link-label">Listings</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/areas">
            <span className="nav-link-kicker">Nairobi</span>
            <span className="nav-link-label">Areas</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/contact">
            <span className="nav-link-kicker">Hello</span>
            <span className="nav-link-label">Contact</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link nav-link-owner" href="/list-your-property">
            <span className="nav-link-kicker">For Owners</span>
            <span className="nav-link-label">List Your Property</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
