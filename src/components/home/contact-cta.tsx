import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/portfolio";
import { CommsMotif } from "@/components/visuals/motifs";
import { CtaLink } from "@/components/ui/primitives";

export function ContactCta() {
  const links = [
    contact.linkedin && { href: contact.linkedin, label: "LinkedIn" },
    contact.github && { href: contact.github, label: "GitHub" },
  ].filter((l): l is { href: string; label: string } => Boolean(l));
  return (
    <section className="contact-cta shell" aria-labelledby="cta-title" data-reveal>
      <div className="contact-cta-copy">
        <p className="eyebrow">Contact</p>
        <h2 id="cta-title" className="section-title">
          Great ideas start with <span className="serif-accent">a conversation.</span>
        </h2>
        <div className="cta-row is-start">
          <CtaLink href="/contact" variant="primary">
            Contact me
          </CtaLink>
        </div>
        <div className="contact-links">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-link">
              {contact.email}
            </a>
          )}
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
              {l.label}
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      <div className="contact-cta-visual" aria-hidden="true">
        <CommsMotif id="cta-comms" />
      </div>
    </section>
  );
}
