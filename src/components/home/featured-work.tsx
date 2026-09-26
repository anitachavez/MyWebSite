import { featuredProjects, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/ui/primitives";

export function FeaturedWork() {
  if (!featuredProjects.length) return null;
  const [lead, ...rest] = featuredProjects;
  const orgs = Array.from(
    new Set(featuredProjects.map((p) => p.organization).filter(Boolean)),
  ).join(" and ");
  return (
    <section id="featured" className="section shell featured" aria-labelledby="featured-title">
      <SectionHeading
        index="01"
        kicker="Featured work"
        title={
          <span id="featured-title">
            From hot cells <span className="serif-accent">to the competition floor.</span>
          </span>
        }
        aside={`${featuredProjects.length} of ${projects.length} projects${orgs ? `, from ${orgs}` : ""}.`}
        link={{ href: "/projects", label: "All projects" }}
      />
      <div className="featured-grid">
        <div className="featured-lead" data-reveal>
          <ProjectCard project={lead} size="large" />
        </div>
        <div className="featured-rest" data-reveal data-stagger>
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
