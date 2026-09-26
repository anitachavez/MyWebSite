import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "@/components/visuals/project-visual";
import { StatList } from "@/components/ui/primitives";

// Visual first, then category, title, one sentence, up to two metrics and an
// explicit "View project" action. "full" (the /projects index) adds context.
export function ProjectCard({
  project,
  size = "regular",
  detail = "compact",
  headingLevel = "h3",
}: {
  project: Project;
  size?: "regular" | "large";
  detail?: "compact" | "full";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const context = [project.organization, project.year].filter(Boolean).join(" · ");
  return (
    <article className={`project-card is-${size}`}>
      <div className="project-card-art">
        <ProjectVisual project={project} context={size === "large" ? "feature" : "card"} />
      </div>
      <div className="project-card-body">
        <p className="project-meta">
          <span>{project.category}</span>
          {project.status && <span className="project-status">{project.status}</span>}
        </p>
        <Heading className="project-title">
          <Link href={`/projects/${project.slug}`} className="card-link">
            {project.title}
          </Link>
        </Heading>
        {detail === "full" && context && <p className="project-context">{context}</p>}
        {project.summary && <p className="project-summary">{project.summary}</p>}
        <StatList stats={project.stats.slice(0, 2)} variant="card" />
        <span className="card-cta" aria-hidden="true">
          View project
          <ArrowRight size={17} />
        </span>
      </div>
    </article>
  );
}
