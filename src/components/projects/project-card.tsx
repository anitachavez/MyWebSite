import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual, projectCode } from "@/components/visuals/project-visual";
import { StatList } from "@/components/ui/primitives";

// Engineering-artifact card: framed visual, code + category, title, summary and
// integrated stats. Only present fields render.
export function ProjectCard({
  project,
  size = "regular",
  headingLevel = "h3",
}: {
  project: Project;
  size?: "regular" | "large";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const meta = [project.year, project.organization].filter(Boolean).join(" · ");
  return (
    <article className={`project-card is-${size}`}>
      <div className="project-card-art">
        <ProjectVisual project={project} context={size === "large" ? "feature" : "card"} />
        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="project-card-body">
        <p className="project-meta">
          <span className="project-code">{projectCode(project)}</span>
          <span>{project.category}</span>
          {project.status && <span className="project-status">{project.status}</span>}
        </p>
        <Heading className="project-title">
          <Link href={`/projects/${project.slug}`} className="card-link">
            {project.title}
          </Link>
        </Heading>
        {meta && <p className="project-context">{meta}</p>}
        {project.summary && <p className="project-summary">{project.summary}</p>}
        <StatList stats={project.stats.slice(0, size === "large" ? 3 : 2)} variant="card" />
      </div>
    </article>
  );
}
