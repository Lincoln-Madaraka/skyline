import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TestimonialFloat from "./components/TestimonialFloat";
import { AccountProvider } from "./components/AccountContext";
import SessionWrapper from "./components/SessionWrapper";
import ConditionalChrome from "./components/ConditionalChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skyline-nairobi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skyline — Nairobi Real Estate",
    template: "%s | Skyline Nairobi",
  },
  description:
    "Premium homes, apartments and commercial listings across Nairobi. Browse curated properties in Kilimani, Westlands, Karen, Lavington, Runda and more.",
  applicationName: "Skyline",
  keywords: [
    "Nairobi real estate",
    "Kenya property",
    "apartments Nairobi",
    "houses for sale Nairobi",
    "rentals Nairobi",
    "Kilimani",
    "Westlands",
    "Karen",
    "Lavington",
    "Runda",
    "Skyline",
  ],
  authors: [{ name: "Skyline" }],
  creator: "Skyline",
  publisher: "Skyline",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Skyline",
    title: "Skyline — Nairobi Real Estate",
    description:
      "Premium homes, apartments and commercial listings across Nairobi.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Skyline — Nairobi Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyline — Nairobi Real Estate",
    description:
      "Premium homes, apartments and commercial listings across Nairobi.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "real estate",
};

export const viewport = {
  themeColor: "#2b2a28",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <AccountProvider>
            <ConditionalChrome>
              <Nav />
            </ConditionalChrome>
            {children}
            <ConditionalChrome>
              <Footer />
              <TestimonialFloat />
            </ConditionalChrome>
          </AccountProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
