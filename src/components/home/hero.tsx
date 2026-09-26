import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import {
  experience,
  languageParts,
  profile,
  splitTagline,
} from "@/data/portfolio";
import { portraitPhoto, resumeHref } from "@/lib/assets";
import { OrbitalSystem } from "@/components/visuals/orbital-system";
import { FactList } from "@/components/ui/primitives";

function Words({ text, start, className }: { text: string; start: number; className?: string }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className={`hero-word ${className ?? ""}`} style={{ "--i": start + i } as CSSProperties}>
        {w}
      </span>{" "}
    </Fragment>
  ));
}

export function Hero() {
  const { lead, accent } = splitTagline(profile.tagline);
  const leadCount = lead.split(" ").length;
  const current = experience.find((e) => e.endDate === "Present" && e.id === "inl") ?? experience[0];
  const resume = resumeHref();
  const facts: [string, string | undefined][] = [
    ["GPA", profile.gpa && `${profile.gpa}${profile.gpaScale ? ` / ${profile.gpaScale}` : ""}`],
    ["Now", current && [current.shortName ?? current.organization, current.role].filter(Boolean).join(" · ")],
    ["Languages", profile.languages.map((l) => languageParts(l).name).join(" · ") || undefined],
  ];
  return (
    <section className="hero shell" aria-labelledby="hero-name">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker">
          <span className="tiny-dot" aria-hidden="true" />
          {profile.degree} · {profile.university}
        </p>
        <h1 id="hero-name" className="hero-name">
          <span className="hero-first">
            Ana <span className="serif-accent">Sofía</span>
          </span>
          <span className="hero-surname">Chávez Salas</span>
        </h1>
        <ul className="hero-fields" aria-label="Fields">
          {profile.interests.map((f, i) => (
            <li key={f} style={{ "--i": i } as CSSProperties}>
              {f}
            </li>
          ))}
        </ul>
        <p className="hero-thesis">
          <Words text={lead} start={0} />
          {accent && <Words text={accent} start={leadCount} className="serif-accent" />}
        </p>
        <FactList facts={facts} className="hero-facts" />
        <div className="hero-actions">
          <Link href="#featured" className="button button-primary orbit-button">
            Explore featured work
            <ArrowDown size={16} aria-hidden="true" />
          </Link>
          {resume ? (
            <a href={resume} target="_blank" rel="noopener noreferrer" className="button button-outline orbit-button">
              Resume
              <FileText size={16} aria-hidden="true" />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          ) : (
            <Link href="/resume" className="button button-outline orbit-button">
              Resume
              <FileText size={16} aria-hidden="true" />
            </Link>
          )}
          <Link href="/about" className="text-link">
            About me
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <OrbitalSystem id="hero-orb" portrait={portraitPhoto()} />
        <p className="hero-visual-note tech-label" aria-hidden="true">
          FIG. 00 · Orbital plot, conceptual
        </p>
      </div>
      <a href="#metrics" className="scroll-cue">
        <span className="scroll-line" aria-hidden="true" />
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}
