import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="mark">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <g fill="#e8ddc9">
                <rect x="5" y="17" width="4" height="10"/>
                <rect x="10" y="12" width="5" height="15"/>
                <rect x="16" y="8" width="4" height="19"/>
                <rect x="21" y="14" width="3" height="13"/>
                <rect x="25" y="19" width="2" height="8"/>
              </g>
              <rect x="3" y="27" width="26" height="1.2" fill="#8a6a48"/>
            </svg>
            SKYLINE
          </div>
          <p>Premium residential homes and apartments across Nairobi curated for serious buyers and trusted owners.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link href="/listings">Listings</Link></li>
            <li><Link href="/areas">Areas</Link></li>
            <li><Link href="/list-your-property">List Your Property</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/list-your-property">For Owners</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in touch</h4>
          <div className="socials" aria-label="Contact and social">
            <a href="mailto:softwares.lincoln@gmail.com" aria-label="Email us" title="Email us">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
            <a href="tel:+254759725607" aria-label="Call us" title="Call us">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X (Twitter)" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.54 8.62L22.5 22h-6.79l-5.32-6.96L4.3 22H1.04l8.06-9.22L1 2h6.94l4.81 6.36L18.244 2zm-1.19 18h1.88L7.03 4H5.05l12.004 16z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/lincoln01/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Skyline. All rights reserved.</div>
        <div className="legal">
          <Link href="/contact">Privacy</Link>
          <Link href="/contact">Terms</Link>
          <Link href="/contact">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
