import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, splitTagline } from "@/data/portfolio";
import { portraitPhoto, resumeHref } from "@/lib/assets";
import { OrbitalSystem } from "@/components/visuals/orbital-system";

function Words({ text, start, className }: { text: string; start: number; className?: string }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className={`hero-word ${className ?? ""}`} style={{ "--i": start + i } as CSSProperties}>
        {w}
      </span>{" "}
    </Fragment>
  ));
}

// Calm hero: name → fields → thesis → two actions. Details (GPA, languages,
// current role) live on About, Experience and Resume.
export function Hero() {
  const { lead, accent } = splitTagline(profile.tagline);
  const leadCount = lead.split(" ").length;
  const resume = resumeHref();
  // "B.S. Aerospace Engineering" → "Aerospace Engineering", then the next two fields.
  const fields = [
    profile.degree.replace(/^[A-Z]\.[A-Z]\.\s*/, ""),
    ...profile.interests.filter((i) => i !== "Aerospace").slice(0, 2),
  ];
  return (
    <section className="hero shell" aria-labelledby="hero-name">
      <div className="hero-copy">
        <h1 id="hero-name" className="hero-name">
          <span className="hero-first">
            Ana <span className="serif-accent">Sofía</span>
          </span>
          <span className="hero-surname">Chávez Salas</span>
        </h1>
        <p className="hero-fields">
          {fields.map((f, i) => (
            <Fragment key={f}>
              {i > 0 && (
                <span className="hero-field-sep" aria-hidden="true">
                  ·
                </span>
              )}
              <span style={{ "--i": i } as CSSProperties}>{f}</span>
            </Fragment>
          ))}
        </p>
        <p className="hero-thesis">
          <Words text={lead} start={0} />
          {accent && <Words text={accent} start={leadCount} className="serif-accent" />}
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="button button-primary button-large orbit-button">
            View projects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/about" className="button button-outline button-large orbit-button">
            About me
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        {resume ? (
          <a href={resume} target="_blank" rel="noopener noreferrer" className="text-link hero-resume">
            Resume (PDF)
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <Link href="/resume" className="text-link hero-resume">
            Resume
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="hero-visual">
        <OrbitalSystem id="hero-orb" portrait={portraitPhoto()} />
      </div>
    </section>
  );
}
