import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  dateRange,
  experience,
  getProject,
  research,
} from "@/data/portfolio";
import {
  BulletList,
  PageHero,
  SectionHeading,
  TagList,
} from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="page-wrap shell page-experience">
      <PageHero
        kicker="Experience · Timeline"
        title={
          <>
            An engineering <span className="serif-accent">trajectory.</span>
          </>
        }
        lead={`${experience.length} ${experience.every((e) => e.endDate === "Present") ? "current " : ""}roles: nuclear robotics, multiphysics research and peer tutoring.`}
      />

      <ol className="timeline" aria-label="Experience timeline">
        {experience.map((e, i) => {
          const related = e.projectSlugs.map(getProject).filter((p) => p !== undefined);
          return (
            <li key={e.id} className={`timeline-item ${i === 0 ? "is-primary" : ""}`} data-reveal>
              <div className="timeline-when">
                {(e.startDate || e.endDate) && (
                  <p className="timeline-dates">
                    {e.startDate}
                    {e.endDate && (
                      <>
                        <span aria-hidden="true"> → </span>
                        <span className="sr-only"> to </span>
                        <span className={e.endDate === "Present" ? "is-live" : ""}>{e.endDate}</span>
                      </>
                    )}
                  </p>
                )}
                {e.location && <p className="timeline-location">{e.location}</p>}
              </div>
              <div className="timeline-node" aria-hidden="true">
                <span className="node-ring" />
                <span className="node-core" />
                {i === 0 && <span className="node-orbit"><i /></span>}
              </div>
              <article className="timeline-card">
                <h2>{e.organization}</h2>
                {e.role && <p className="timeline-role serif-accent">{e.role}</p>}
                {e.summary && <p className="timeline-summary">{e.summary}</p>}
                <BulletList items={e.bullets} />
                <TagList tags={e.tags} label={`${e.shortName ?? e.organization} tools and focus areas`} />
                {related.length > 0 && (
                  <div className="timeline-related">
                    <span className="tech-label">Related projects</span>
                    {related.map((p) => (
                      <Link key={p.slug} href={`/projects/${p.slug}`} className="text-link">
                        {p.title}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      {research.length > 0 && (
        <section id="research" className="section research-list" aria-labelledby="research-title">
          <SectionHeading
            index="R"
            kicker="Research"
            title={
              <span id="research-title">
                Research <span className="serif-accent">threads.</span>
              </span>
            }
          />
          <div className="research-cards">
            {research.map((r) => {
              const project = getProject(r.projectSlugs[0]);
              return (
                <article key={r.id} className="research-card" data-reveal>
                  <p className="tech-label is-accent">
                    {[r.category, dateRange(r.startDate, r.endDate)].filter(Boolean).join(" · ")}
                  </p>
                  <h3>{r.title}</h3>
                  {(r.context ?? r.organization) && (
                    <p className="research-context">{r.context ?? r.organization}</p>
                  )}
                  {r.summary && <p>{r.summary}</p>}
                  {r.researchQuestion && (
                    <details className="research-question">
                      <summary>
                        <span className="tech-label">RQ</span>
                        The research question
                      </summary>
                      <p>{r.researchQuestion}</p>
                    </details>
                  )}
                  <TagList tags={r.tools} label="Research tools" />
                  {project && (
                    <Link href={`/projects/${project.slug}`} className="text-link">
                      {project.title}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
