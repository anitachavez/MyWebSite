import { experience, getProject, research } from "@/data/portfolio";
import { CtaLink, SectionHeading } from "@/components/ui/primitives";
import { VisualFrame } from "@/components/visuals/frame";
import { HotCellVisual } from "@/components/visuals/project-visuals";
import { SystemFlowVisual } from "@/components/visuals/system-flow";

// Two balanced cards: the current role and the current research, each with a
// visual, one or two sentences and one large action. Details live on /experience.
export function Trajectory() {
  const role = experience[0];
  const study = research.find((r) => r.category === "Space nuclear systems") ?? research[0];
  const studyProject = getProject(study?.projectSlugs[0] ?? "");
  if (!role && !study) return null;
  return (
    <section className="section shell trajectory" aria-labelledby="trajectory-title">
      <SectionHeading
        kicker="Current trajectory"
        align="center"
        title={
          <span id="trajectory-title">
            Where the work <span className="serif-accent">is happening now.</span>
          </span>
        }
      />
      <div className="trajectory-grid">
        {role && (
          <article className="trajectory-card" data-reveal>
            <VisualFrame className="trajectory-visual">
              <HotCellVisual id="traj-hotcell" />
            </VisualFrame>
            <div className="trajectory-body">
              <p className="eyebrow">
                <span className="live-dot" aria-hidden="true" />
                Experience · {role.endDate === "Present" ? "Now" : role.endDate}
              </p>
              <h3>{role.organization}</h3>
              {role.role && <p className="trajectory-role serif-accent">{role.role}</p>}
              {role.summary && <p className="trajectory-text">{role.summary}</p>}
              <CtaLink href="/experience">Explore experience</CtaLink>
            </div>
          </article>
        )}
        {study && (
          <article className="trajectory-card" data-reveal>
            <VisualFrame className="trajectory-visual is-flow">
              <SystemFlowVisual id="traj-flow" labels={false} />
            </VisualFrame>
            <div className="trajectory-body">
              <p className="eyebrow">
                <span className="live-dot" aria-hidden="true" />
                Research · {study.endDate === "Present" ? "Now" : study.endDate}
              </p>
              <h3>{study.shortTitle ?? study.title}</h3>
              <p className="trajectory-role serif-accent">{study.category}</p>
              {(studyProject?.summary ?? study.summary) && (
                <p className="trajectory-text">{studyProject?.summary ?? study.summary}</p>
              )}
              <CtaLink href="/experience#research">View research</CtaLink>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
