import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contact } from "@/data/portfolio";
import { CommsMotif } from "@/components/visuals/motifs";

export function ContactCta() {
  return (
    <section className="contact-cta shell" aria-labelledby="cta-title" data-reveal>
      <div className="contact-cta-copy">
        <p className="eyebrow">
          <span className="eyebrow-index">07</span>Contact
        </p>
        <h2 id="cta-title" className="section-title">
          Great ideas start with <span className="serif-accent">a conversation.</span>
        </h2>
        <div className="hero-actions">
          <Link href="/contact" className="button button-primary orbit-button">
            Let’s connect
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-link">
              {contact.email}
            </a>
          )}
        </div>
      </div>
      <div className="contact-cta-visual" aria-hidden="true">
        <CommsMotif id="cta-comms" />
      </div>
    </section>
  );
}
