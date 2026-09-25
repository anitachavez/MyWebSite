import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Orbital } from "@/components/orbital";
import {
  Gallery,
  MediaImage,
  PdfViewer,
  VideoPlayer,
} from "@/components/assets";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: projects.find((p) => p.slug === slug)?.title ?? "Project not found",
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const chapters = [
    {
      title: "The problem",
      body: project.problem,
      pending: "Project context and the engineering challenge are pending.",
    },
    {
      title: "The process",
      body: project.process,
      pending:
        "The engineering approach, tools, and design decisions are pending.",
    },
    {
      title: "My contribution",
      body: project.contribution,
      pending:
        "Individual responsibilities and contributions are pending verification.",
    },
    {
      title: "The results",
      body: project.results,
      pending: "Verified outcomes and supporting evidence are pending.",
    },
  ];
  return (
    <div className="page-wrap shell case-study">
      <Link className="text-link" href="/projects">
        <ArrowLeft size={16} />
        All projects
      </Link>
      <div className="page-heading" data-reveal>
        <p className="eyebrow">
          {project.category} /{" "}
          {project.status === "placeholder"
            ? "CASE STUDY PLACEHOLDER"
            : project.year}
        </p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </div>
      <div className="case-art">
        {project.cover ? (
          <MediaImage photo={project.cover} priority />
        ) : (
          <Orbital variant={projects.indexOf(project) % 4} />
        )}
      </div>
      {project.status === "placeholder" && (
        <div className="editorial-note">
          This is a reserved case study page. Project details, contributions,
          dates, and outcomes will be added after source verification and
          publication approval.
        </div>
      )}
      <div className="case-layout">
        <aside className="case-index">
          <p className="eyebrow">INSIDE THE PROJECT</p>
          {chapters.map((c, i) => (
            <a key={c.title} href={`#chapter-${i}`}>
              <span>0{i + 1}</span>
              {c.title}
            </a>
          ))}
          <a href="#project-gallery">
            <span>05</span>Gallery & media
          </a>
          <a href="#project-documents">
            <span>06</span>Technical documents
          </a>
          {project.role && (
            <div className="case-role">
              <span className="eyebrow">ROLE</span>
              <p>{project.role}</p>
            </div>
          )}
        </aside>
        <div className="case-sections">
          <div className="case-overview">
            <p className="eyebrow">OVERVIEW</p>
            <h2>The story behind the work</h2>
            {project.status === "placeholder" && (
              <p>
                Project context, the engineering approach, individual
                contributions, and verified outcomes are pending.
              </p>
            )}
          </div>
          {chapters.map((c, i) => (
            <section id={`chapter-${i}`} key={c.title} data-reveal>
              <span className="chapter-number">0{i + 1}</span>
              <div>
                <h2>{c.title}</h2>
                <p>{c.body ?? c.pending}</p>
                {!c.body && (
                  <span className="pending-label">CONTENT PENDING</span>
                )}
              </div>
            </section>
          ))}
          {project.sections.map((s, i) => (
            <section key={`${s.title}-${i}`} data-reveal>
              <div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
      <section id="project-gallery" className="case-media" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / A CLOSER LOOK</p>
            <h2>
              Visual <span className="serif-accent">field notes.</span>
            </h2>
          </div>
        </div>
        <Gallery photos={project.photos} />
        {project.videos?.length ? (
          <div className="video-grid">
            {project.videos.map((video, i) => (
              <VideoPlayer key={`${video.title}-${i}`} video={video} />
            ))}
          </div>
        ) : (
          <VideoPlayer />
        )}
      </section>
      <section id="project-documents" className="case-documents" data-reveal>
        <p className="eyebrow">06 / THE DOCUMENTATION</p>
        <PdfViewer title="Technical binder" src={project.binder} />
        {project.documents?.map((doc) => (
          <PdfViewer key={doc.src} {...doc} />
        ))}
      </section>
      <Link className="next-project" href={`/projects/${next.slug}`}>
        <div>
          <span className="eyebrow">NEXT AREA</span>
          <h2>{next.title}</h2>
        </div>
        <ArrowUpRight size={30} />
      </Link>
    </div>
  );
}
