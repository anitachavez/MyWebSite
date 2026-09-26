import type { Metadata } from "next";
import { awardYear, sortedAwards, type Award } from "@/data/portfolio";
import { PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Recognition" };

// Mission log: awards grouped by year, newest first. Awards without a date are
// listed at the end without a year marker.
export default function Recognition() {
  const groups: { year?: string; items: Award[] }[] = [];
  for (const award of sortedAwards) {
    const year = awardYear(award);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push(award);
    else groups.push({ year, items: [award] });
  }
  const years = groups.map((g) => g.year).filter(Boolean);
  return (
    <div className="page-wrap shell page-recognition">
      <PageHero
        kicker="Recognition · Mission log"
        title={
          <>
            Awards & <span className="serif-accent">recognition.</span>
          </>
        }
        lead={`${sortedAwards.length} awards and distinctions${years.length ? `, ${years[years.length - 1]}–${years[0]}` : ""}.`}
      />
      <div className="mission-log">
        {groups.map((g) => (
          <section key={g.year ?? "additional"} className={`log-group ${g.year ? "" : "is-undated"}`} data-reveal>
            <h2 className="log-year">
              {g.year ?? <span className="log-year-text">Additional recognition</span>}
            </h2>
            <ol className="log-entries" data-stagger>
              {g.items.map((a) => {
                const org = a.organization && !a.title.includes(a.organization) ? a.organization : undefined;
                const meta = [org, a.location].filter(Boolean).join(" · ");
                return (
                  <li key={a.title} className="log-entry">
                    <span className="log-node" aria-hidden="true" />
                    <h3>{a.title}</h3>
                    {meta && <p className="log-meta">{meta}</p>}
                    {a.description && <p className="log-description">{a.description}</p>}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
