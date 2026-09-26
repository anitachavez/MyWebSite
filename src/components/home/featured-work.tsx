import { featuredProjects, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/projects/project-card";
import { CtaLink, CtaRow, SectionHeading } from "@/components/ui/primitives";

export function FeaturedWork() {
  if (!featuredProjects.length) return null;
  const [lead, ...rest] = featuredProjects;
  return (
    <section id="featured" className="section shell featured" aria-labelledby="featured-title">
      <SectionHeading
        kicker="Selected work"
        align="center"
        title={
          <span id="featured-title">
            From hot cells <span className="serif-accent">to the competition floor.</span>
          </span>
        }
      />
      <div className="featured-lead" data-reveal>
        <ProjectCard project={lead} size="large" />
      </div>
      <div className="featured-rest" data-reveal data-stagger>
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <CtaRow>
        <CtaLink href="/projects" variant="primary">
          View all {projects.length} projects
        </CtaLink>
      </CtaRow>
    </section>
  );
}
