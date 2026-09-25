import type { Metadata } from "next";
import { Header, Footer, Reveal } from "@/components/site-shell";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Ana Sofía Chávez Salas — Engineering Portfolio",
    template: "%s | Ana Sofía Chávez Salas",
  },
  description:
    "Aerospace Engineering student at the University of Cincinnati. Exploring aerospace, nuclear robotics, space nuclear systems, and materials research.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <Reveal />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
