import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionController } from "@/components/motion/motion-controller";
import { ScientificBackground } from "@/components/visuals/scientific-background";
import { moreNav, primaryNav, profile } from "@/data/portfolio";
import { resumeHref } from "@/lib/assets";
import "./globals.css";
// Design system, in cascade order (motion last so reduced-motion rules win):
// base (tokens, type, buttons, primitives) → layout (header, footer, page scaffolding)
// → visuals (background, orbital system, SVG visuals, explorer) → home → pages
// → media (Phase 2 asset components) → motion (keyframes, reveals, reduced motion).
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/visuals.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/media.css";
import "@/styles/motion.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.fullName} · Engineering Portfolio`,
    template: `%s | ${profile.fullName}`,
  },
  description: `${profile.degree} student at the ${profile.university}. ${profile.tagline}`,
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
        <ScientificBackground />
        <SiteHeader primary={primaryNav} more={moreNav} resumeHref={resumeHref()} />
        <MotionController />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
