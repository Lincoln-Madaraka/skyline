import "./globals.css";
import type { Metadata } from "next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TestimonialFloat from "./components/TestimonialFloat";
import { AccountProvider } from "./components/AccountContext";
import AuthModal from "./components/AuthModal";

export const metadata: Metadata = {
  title: "Skyline — Nairobi Real Estate",
  description: "Premium homes and apartments across Nairobi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AccountProvider>
          <Nav />
          {children}
          <Footer />
          <TestimonialFloat />
          <AuthModal />
        </AccountProvider>
      </body>
    </html>
  );
}
