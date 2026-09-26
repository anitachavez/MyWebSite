import { awardYear, sortedAwards } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/primitives";

// Horizontal mission log: year markers on one trajectory line.
export function RecognitionPreview() {
  if (!sortedAwards.length) return null;
  const shown = sortedAwards.slice(0, 5);
  return (
    <section className="section shell rec-preview" aria-labelledby="rec-title">
      <SectionHeading
        index="04"
        kicker="Recognition"
        title={
          <span id="rec-title">
            Milestones <span className="serif-accent">logged.</span>
          </span>
        }
        link={{ href: "/recognition", label: `All ${sortedAwards.length} awards` }}
      />
      <ol className="rec-track" data-reveal data-stagger>
        {shown.map((a) => {
          const year = awardYear(a);
          return (
            <li key={a.title} className={year ? "" : "is-undated"}>
              <span className="rec-node" aria-hidden="true" />
              <span className="rec-year">{year ?? "—"}</span>
              <h3>{a.title}</h3>
              {(a.location || (a.organization && !a.title.includes(a.organization))) && (
                <p>{a.location ?? a.organization}</p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
