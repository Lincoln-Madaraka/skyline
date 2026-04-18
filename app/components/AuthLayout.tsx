import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-page">
      <aside className="auth-visual" aria-hidden="true">
        <Image
          src="/images/hero/hero-home-exterior-01.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 55vw"
          className="auth-visual-img"
        />
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link className="auth-brand" href="/">
            <svg className="auth-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <rect x="5" y="17" width="4" height="10" />
                <rect x="10" y="12" width="5" height="15" />
                <rect x="16" y="8" width="4" height="19" />
                <rect x="21" y="14" width="3" height="13" />
                <rect x="25" y="19" width="2" height="8" />
              </g>
              <rect x="3" y="27" width="26" height="1.2" fill="#c8a37a" />
            </svg>
            <span className="auth-brand-word">SKYLINE</span>
          </Link>
          <div className="auth-visual-quote">
            <p>
              &ldquo;Every skyline tells a story. Find the one
              you&rsquo;ll call home.&rdquo;
            </p>
            <span>Nairobi&rsquo;s curated property collective</span>
          </div>
        </div>
      </aside>
      <section className="auth-panel">
        <Link className="auth-brand auth-brand-mobile" href="/">
          <svg className="auth-brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="currentColor">
              <rect x="5" y="17" width="4" height="10" />
              <rect x="10" y="12" width="5" height="15" />
              <rect x="16" y="8" width="4" height="19" />
              <rect x="21" y="14" width="3" height="13" />
              <rect x="25" y="19" width="2" height="8" />
            </g>
            <rect x="3" y="27" width="26" height="1.2" fill="#c8a37a" />
          </svg>
          <span className="auth-brand-word">SKYLINE</span>
        </Link>
        <div className="auth-card">{children}</div>
      </section>
    </main>
  );
}
