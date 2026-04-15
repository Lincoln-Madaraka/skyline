import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TestimonialFloat from "./components/TestimonialFloat";

export const metadata: Metadata = {
  title: "Skyline — Nairobi Real Estate",
  description: "Premium homes and apartments across Nairobi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
        <TestimonialFloat />
      </body>
    </html>
  );
}
