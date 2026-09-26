import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contact, homeLink, profile, sections } from "@/data/portfolio";
import { resumeHref } from "@/lib/assets";

export function SiteFooter() {
  const resume = resumeHref();
  const external = [
    contact.linkedin && { href: contact.linkedin, label: "LinkedIn" },
    contact.github && { href: contact.github, label: "GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand">
              ana <span className="serif-accent">sofía.</span>
            </Link>
            <p className="footer-tagline">{profile.tagline}</p>
          </div>
          <nav className="footer-index" aria-label="Site index">
            <p className="eyebrow">Explore</p>
            <ol>
              {[homeLink, ...sections].map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.short}</Link>
                </li>
              ))}
              <li>
                {resume ? (
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    Resume
                    <span className="sr-only">(PDF, opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href="/resume">Resume</Link>
                )}
              </li>
            </ol>
          </nav>
          <div className="footer-contact">
            <p className="eyebrow">Contact</p>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="footer-email">
                {contact.email}
              </a>
            )}
            <ul>
              {external.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.fullName}
          </span>
          <span className="footer-signal" aria-hidden="true">
            <span className="tiny-dot" />
            {profile.degree} · {profile.university}
          </span>
          <a href="#top" className="text-link">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
