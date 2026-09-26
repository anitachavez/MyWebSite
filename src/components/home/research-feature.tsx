import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dateRange, getProject, research } from "@/data/portfolio";
import { SectionHeading, TagList } from "@/components/ui/primitives";
import { VisualFrame } from "@/components/visuals/frame";
import { SystemFlowVisual } from "@/components/visuals/system-flow";

export function ResearchFeature() {
  const item =
    research.find((r) => r.category === "Space nuclear systems") ?? research[0];
  if (!item) return null;
  const project = getProject(item.projectSlugs[0]);
  const others = research.filter((r) => r !== item);
  return (
    <section className="research-feature" aria-labelledby="research-title">
      <div className="shell">
        <SectionHeading
          index="03"
          kicker="Research · Space nuclear systems"
          title={
            <span id="research-title">
              Power for <span className="serif-accent">deep space.</span>
            </span>
          }
          aside={item.context}
        />
        <div className="research-diagram" data-reveal>
          <VisualFrame code="SNS-R1" label="SYSTEM FLOW" className="vframe-wide">
            <SystemFlowVisual id="home-flow" />
          </VisualFrame>
        </div>
        <div className="research-body" data-reveal>
          <div className="research-copy">
            <p className="tech-label is-accent">
              {dateRange(item.startDate, item.endDate)}
            </p>
            <h3>{item.title}</h3>
            {item.summary && <p>{item.summary}</p>}
          </div>
          <div className="research-side">
            {item.researchQuestion && (
              <details className="research-question">
                <summary>
                  <span className="tech-label">RQ</span>
                  The research question
                </summary>
                <p>{item.researchQuestion}</p>
              </details>
            )}
            <TagList tags={item.tools} label="Research tools" />
            <div className="research-links">
              {project && (
                <Link href={`/projects/${project.slug}`} className="button button-outline orbit-button">
                  Read the project
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              )}
              {others.map((r) => {
                const p = getProject(r.projectSlugs[0]);
                return p ? (
                  <Link key={r.id} href={`/projects/${p.slug}`} className="text-link">
                    Also: {r.shortTitle ?? r.title}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
