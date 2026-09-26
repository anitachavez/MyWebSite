import type { Metadata } from "next";
import { FileText } from "lucide-react";
import {
  dateRange,
  experience,
  languageParts,
  leadership,
  profile,
  research,
  sortedAwards,
  awardYear,
} from "@/data/portfolio";
import { resumeHref } from "@/lib/assets";
import { PdfViewer } from "@/components/assets";
import { PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Resume" };

// The PDF button and viewer appear only once /public/docs/... exists.
// The overview below is built from content/site.json and is always complete.
export default function ResumePage() {
  const pdf = resumeHref();
  return (
    <div className="page-wrap shell page-resume">
      <PageHero
        kicker="Resume · At a glance"
        title={
          <>
            The journey, <span className="serif-accent">in brief.</span>
          </>
        }
        lead={`${profile.degree} · ${profile.university}`}
        meta={
          pdf && (
            <a href={pdf} target="_blank" rel="noopener noreferrer" className="button button-primary orbit-button">
              Open resume PDF
              <FileText size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )
        }
      />
      {pdf && <PdfViewer title="Resume" src={pdf} />}

      <div className="resume-sheet" data-reveal>
        <section className="resume-block">
          <h2 className="tech-label is-accent">Education</h2>
          <div className="resume-row">
            <h3>{profile.university}</h3>
            <p>
              {profile.degree} · Minor in {profile.minor}
              {profile.program && ` · ${profile.program}`}
            </p>
            <p className="resume-when">
              {[profile.graduationYear && `Expected ${profile.graduationYear}`, profile.gpa && `GPA ${profile.gpa}${profile.gpaScale ? ` / ${profile.gpaScale}` : ""}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </section>

        <section className="resume-block">
          <h2 className="tech-label is-accent">Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="resume-row">
              <h3>{e.role}</h3>
              <p>{[e.organization, e.location].filter(Boolean).join(" · ")}</p>
              <p className="resume-when">{dateRange(e.startDate, e.endDate)}</p>
            </div>
          ))}
        </section>

        {research.length > 0 && (
          <section className="resume-block">
            <h2 className="tech-label is-accent">Research</h2>
            {research.map((r) => (
              <div key={r.id} className="resume-row">
                <h3>{r.title}</h3>
                <p>{r.context ?? r.organization}</p>
                <p className="resume-when">{dateRange(r.startDate, r.endDate)}</p>
              </div>
            ))}
          </section>
        )}

        <section className="resume-block">
          <h2 className="tech-label is-accent">Leadership</h2>
          {leadership.map((l) => (
            <div key={l.id} className="resume-row">
              <h3>{[l.role, l.organization].filter(Boolean).join(", ")}</h3>
              {l.summary && <p>{l.summary}</p>}
              <p className="resume-when">{l.dates}</p>
            </div>
          ))}
        </section>

        <section className="resume-block">
          <h2 className="tech-label is-accent">Awards</h2>
          <ul className="resume-awards">
            {sortedAwards.map((a) => (
              <li key={a.title}>
                <span>{a.title}</span>
                {awardYear(a) && <span className="resume-when">{awardYear(a)}</span>}
              </li>
            ))}
          </ul>
        </section>

        {profile.languages.length > 0 && (
          <section className="resume-block">
            <h2 className="tech-label is-accent">Languages</h2>
            <ul className="resume-awards">
              {profile.languages.map((l) => {
                const { name, level } = languageParts(l);
                return (
                  <li key={l}>
                    <span>{name}</span>
                    {level && <span className="resume-when">{level}</span>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
