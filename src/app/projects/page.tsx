import type { Metadata } from "next";
import { categories, projects } from "@/data/portfolio";
import { PageHero } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <div className="page-wrap shell page-projects">
      <PageHero
        kicker="The work · Project index"
        title={
          <>
            Ideas into <span className="serif-accent">engineering.</span>
          </>
        }
        lead={`${projects.length} projects across ${categories.join(", ").replace(/, ([^,]*)$/, " and $1").toLowerCase()}.`}
      />
      <ProjectFilter
        categories={categories}
        items={projects.map((p) => ({
          key: p.slug,
          category: p.category,
          node: <ProjectCard project={p} headingLevel="h2" />,
        }))}
      />
    </div>
  );
}
