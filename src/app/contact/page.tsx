import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { contact, profile } from "@/data/portfolio";
import { CopyEmail } from "@/components/ui/copy-email";
import { PageHero } from "@/components/ui/primitives";
import { VisualFrame } from "@/components/visuals/frame";
import { CommsMotif } from "@/components/visuals/motifs";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const channels = [
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin, handle: contact.linkedin.replace(/^https:\/\/(www\.)?/, "") },
    contact.github && { label: "GitHub", href: contact.github, handle: contact.github.replace(/^https:\/\/(www\.)?/, "") },
  ].filter((c): c is { label: string; href: string; handle: string } => Boolean(c));
  return (
    <div className="page-wrap shell page-contact">
      <PageHero
        kicker="Contact · Open channel"
        title={
          <>
            Let’s <span className="serif-accent">connect.</span>
          </>
        }
        lead={`For conversations about ${profile.interests.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}.`}
      />
      <div className="contact-layout">
        <div className="contact-channels">
          {contact.email && (
            <section className="channel is-primary" aria-labelledby="ch-email" data-reveal>
              <p className="tech-label is-accent">CH-01</p>
              <h2 id="ch-email">Email</h2>
              <a className="channel-email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <CopyEmail email={contact.email} />
            </section>
          )}
          {channels.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="channel"
              data-reveal
            >
              <span className="tech-label">CH-{String(i + 2).padStart(2, "0")}</span>
              <span className="channel-name">{c.label}</span>
              <span className="channel-handle">{c.handle}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
        <div className="contact-visual" data-reveal>
          <VisualFrame code="COMMS" label="LINK">
            <CommsMotif id="contact-comms" />
          </VisualFrame>
        </div>
      </div>
    </div>
  );
}
