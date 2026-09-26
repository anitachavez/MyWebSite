import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { awards, competitions, getProject } from "@/data/portfolio";
import { FactList, PageHero } from "@/components/ui/primitives";
import { VisualFrame } from "@/components/visuals/frame";
import { MechanicalMotif, NetworkMotif, PlanetaryMotif } from "@/components/visuals/motifs";

export const metadata: Metadata = { title: "Competitions" };

const motif: Record<string, (id: string) => ReactNode> = {
  "first-robotics": (id) => <MechanicalMotif id={id} />,
  "nasa-space-apps": (id) => <PlanetaryMotif id={id} />,
  "siemens-hackathon": (id) => <NetworkMotif id={id} />,
};

export default function Competitions() {
  return (
    <div className="page-wrap shell page-competitions">
      <PageHero
        kicker="Competitions · Under pressure"
        title={
          <>
            Ideas meet <span className="serif-accent">challenge.</span>
          </>
        }
        lead={competitions.map((c) => c.name).join(" · ")}
      />
      <div className="competition-list">
        {competitions.map((c, i) => {
          const projects = c.projectSlugs.map(getProject).filter((p) => p !== undefined);
          const relatedAwards = awards.filter((a) => a.competitionId === c.id);
          const render = motif[c.id] ?? ((id: string) => <NetworkMotif id={id} />);
          return (
            <section
              key={c.id}
              className={`competition ${i % 2 ? "is-flipped" : ""}`}
              aria-labelledby={`${c.id}-title`}
              data-reveal
            >
              <div className="competition-visual">
                <VisualFrame>
                  {render(`comp-${c.id}`)}
                </VisualFrame>
              </div>
              <div className="competition-body">
                <p className="eyebrow">
                  {[c.dates, c.location].filter(Boolean).join(" · ")}
                </p>
                <h2 id={`${c.id}-title`}>{c.name}</h2>
                {c.role && <p className="competition-role serif-accent">{c.role}</p>}
                {c.summary && <p className="competition-summary">{c.summary}</p>}
                {c.results.length > 0 && (
                  <ul className="result-list" aria-label="Results" data-stagger>
                    {c.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                <FactList facts={[["Team", c.team], ["Engineering highlight", c.highlights.join(" · ") || undefined]]} />
                {relatedAwards.length > 0 && (
                  <p className="competition-awards">
                    <span className="tech-label">Recognition</span>
                    {relatedAwards.map((a) => a.title).join(" · ")}
                  </p>
                )}
                {projects.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="text-link">
                    Project: {p.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
