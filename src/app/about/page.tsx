import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  categoryCode,
  languageParts,
  profile,
  projects,
  type Category,
} from "@/data/portfolio";
import { portraitPhoto } from "@/lib/assets";
import { FactList, PageHero, SectionHeading } from "@/components/ui/primitives";
import { OrbitalSystem } from "@/components/visuals/orbital-system";

export const metadata: Metadata = { title: "About" };

export default function About() {
  const [first, ...rest] = profile.about;
  const education: [string, string | undefined][] = [
    ["University", profile.university],
    ["Degree", profile.degree],
    ["Minor", profile.minor],
    ["Program", profile.program],
    ["Expected graduation", profile.graduationYear],
    ["GPA", profile.gpa && `${profile.gpa}${profile.gpaScale ? ` / ${profile.gpaScale}` : ""}`],
  ];
  return (
    <div className="page-wrap shell page-about">
      <PageHero
        kicker="About · The person behind the work"
        title={
          <>
            Engineering for <span className="serif-accent">extreme environments.</span>
          </>
        }
        lead={profile.tagline}
      />

      <section className="about-intro" aria-label="Introduction">
        <div className="about-portrait" data-reveal>
          <OrbitalSystem id="about-orb" variant="compact" portrait={portraitPhoto()} />
          <p className="tech-label about-portrait-caption" aria-hidden="true">
            {profile.fullName.toUpperCase()} · {profile.university.toUpperCase()}
          </p>
        </div>
        <div className="about-text" data-reveal>
          {first && <p className="about-lead">{first}</p>}
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="about-grid" aria-label="Education and languages">
        <div className="about-panel" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-index">01</span>Education
          </p>
          <h2>{profile.university}</h2>
          <FactList facts={education} />
        </div>
        {profile.languages.length > 0 && (
          <div className="about-panel" data-reveal>
            <p className="eyebrow">
              <span className="eyebrow-index">02</span>Languages
            </p>
            <h2>
              {profile.languages.length} <span className="serif-accent">languages</span>
            </h2>
            <ul className="language-list" data-stagger>
              {profile.languages.map((l) => {
                const { name, level } = languageParts(l);
                return (
                  <li key={l}>
                    <span className="language-name">{name}</span>
                    {level && <span className="language-level">{level}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {profile.interests.length > 0 && (
        <section className="section about-interests" aria-labelledby="interests-title">
          <SectionHeading
            index="03"
            kicker="Engineering interests"
            title={
              <span id="interests-title">
                Connected fields, <span className="serif-accent">one direction.</span>
              </span>
            }
          />
          <ul className="interest-grid" data-reveal data-stagger>
            {profile.interests.map((interest) => {
              const related = projects.filter((p) => p.category === interest);
              const code = categoryCode[interest as Category];
              return (
                <li key={interest} className="interest">
                  {code && <span className="tech-label is-accent">{code}</span>}
                  <h3>{interest}</h3>
                  {related.length > 0 && (
                    <ul className="interest-projects">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/projects/${p.slug}`} className="text-link">
                            {p.title}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
