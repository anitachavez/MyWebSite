import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getCompetition,
  getExperience,
  getProject,
  getResearch,
  projects,
} from "@/data/portfolio";
import { assetExists, availablePhotos } from "@/lib/assets";
import { Gallery, PdfViewer, VideoPlayer } from "@/components/assets";
import { FactList, StatList, TagList } from "@/components/ui/primitives";
import { ProjectVisual, projectCode } from "@/components/visuals/project-visual";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Project not found",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const researchItem = getResearch(project.researchId);
  const exp = getExperience(project.experienceId);
  const competition = getCompetition(project.competitionId);

  // Phase 2 media: only assets that exist are shown; empty groups render nothing.
  const photos = availablePhotos(project.images);
  const videos = project.videos.filter((v) => v.embedUrl || assetExists(v.src));
  const documents = project.documents.filter((d) => assetExists(d.src));

  const chapters = [
    ...project.sections.map((s, i) => ({
      id: `section-${i + 1}`,
      title: s.heading ?? "Overview",
      body: s.body,
    })),
    ...(project.results?.length
      ? [{ id: "results", title: "Results", body: project.results }]
      : []),
  ];
  const toc = [
    ...(project.stats.length ? [{ id: "metrics", title: "Metrics" }] : []),
    ...chapters.map((c) => ({ id: c.id, title: c.title })),
    ...(researchItem?.researchQuestion ? [{ id: "question", title: "Research question" }] : []),
    ...(project.tools.length ? [{ id: "tools", title: "Tools" }] : []),
    ...(photos.length || videos.length ? [{ id: "media", title: "Media" }] : []),
    ...(documents.length ? [{ id: "documents", title: "Documents" }] : []),
  ];
  const related = [
    exp && { href: "/experience", label: exp.organization ?? exp.shortName, kind: "Experience" },
    competition && { href: "/competitions", label: competition.name, kind: "Competition" },
    researchItem && !exp && { href: "/experience#research-title", label: researchItem.shortTitle ?? researchItem.title, kind: "Research" },
  ].filter((r): r is { href: string; label: string; kind: string } => Boolean(r && r.label));

  return (
    <div className="page-wrap shell case-study">
      <Link className="text-link back-link" href="/projects">
        <ArrowLeft size={16} aria-hidden="true" />
        All projects
      </Link>

      <header className="case-header" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow-index">{projectCode(project)}</span>
          {project.category}
          {project.status && <span className="project-status">{project.status}</span>}
        </p>
        <h1>{project.title}</h1>
        {project.summary && <p className="page-lead">{project.summary}</p>}
        <FactList
          className="case-facts"
          facts={[
            ["Role", project.role],
            ["Organization", project.context ?? project.organization],
            ["Year", project.year],
            ["Status", project.status],
          ]}
        />
      </header>

      <div className="case-visual" data-reveal>
        <ProjectVisual project={project} context="detail" />
      </div>

      <div className="case-layout">
        {toc.length > 1 && (
          <nav className="case-index" aria-label="On this page">
            <p className="eyebrow">Technical index</p>
            <ol>
              {toc.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="tech-label">{String(i + 1).padStart(2, "0")}</span>
                    {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="case-sections">
          {project.stats.length > 0 && (
            <section id="metrics" className="case-block" data-reveal aria-label="Metrics">
              <StatList stats={project.stats} variant="large" />
            </section>
          )}

          {chapters.map((c, i) => (
            <section id={c.id} key={c.id} className="case-block case-chapter" data-reveal>
              <span className="chapter-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{c.title}</h2>
                {c.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {researchItem?.researchQuestion && (
            <section id="question" className="case-block case-question" data-reveal>
              <p className="eyebrow">Research question</p>
              <blockquote>{researchItem.researchQuestion}</blockquote>
              {researchItem.title && <p className="tech-label">{researchItem.title}</p>}
            </section>
          )}

          {project.tools.length > 0 && (
            <section id="tools" className="case-block" data-reveal>
              <h2 className="case-small-title">Tools</h2>
              <TagList tags={project.tools} label={`${project.title} tools`} />
            </section>
          )}

          {(photos.length > 0 || videos.length > 0) && (
            <section id="media" className="case-block case-media" data-reveal>
              <h2 className="case-small-title">Media</h2>
              {photos.length > 0 && <Gallery photos={photos} title={`${project.title} gallery`} />}
              {videos.length > 0 && (
                <div className="video-grid">
                  {videos.map((v, i) => (
                    <VideoPlayer key={`${v.title}-${i}`} video={v} />
                  ))}
                </div>
              )}
            </section>
          )}

          {documents.length > 0 && (
            <section id="documents" className="case-block" data-reveal>
              <h2 className="case-small-title">Documents</h2>
              {documents.map((d) => (
                <PdfViewer key={d.src} {...d} />
              ))}
            </section>
          )}

          {related.length > 0 && (
            <aside className="case-related" aria-label="Related">
              {related.map((r) => (
                <Link key={r.kind} href={r.href} className="text-link">
                  <span className="tech-label">{r.kind}</span>
                  {r.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </aside>
          )}
        </div>
      </div>

      {next !== project && (
        <Link className="next-project" href={`/projects/${next.slug}`}>
          <div>
            <span className="eyebrow">Next project · {projectCode(next)}</span>
            <h2>{next.title}</h2>
          </div>
          <ArrowUpRight size={30} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
