import { leadership } from "@/data/portfolio";
import { SectionHeading, StatList } from "@/components/ui/primitives";

export function LeadershipPreview() {
  if (!leadership.length) return null;
  const withStats = leadership.find((l) => l.stats.length) ?? leadership[0];
  const others = leadership.filter((l) => l !== withStats);
  return (
    <section className="section shell lead-preview" aria-labelledby="lead-title">
      <SectionHeading
        index="05"
        kicker="Leadership"
        title={
          <span id="lead-title">
            Building <span className="serif-accent">the community around the work.</span>
          </span>
        }
        link={{ href: "/leadership", label: "Leadership & involvement" }}
      />
      <div className="lead-preview-grid">
        <article className="lead-signal" data-reveal>
          <p className="eyebrow">
            {[withStats.role, withStats.dates].filter(Boolean).join(" · ")}
          </p>
          <h3>{withStats.organization}</h3>
          {withStats.summary && <p className="lead-summary">{withStats.summary}</p>}
          <StatList stats={withStats.stats} variant="large" />
        </article>
        <ul className="lead-roles" data-reveal data-stagger>
          {others.map((l) => (
            <li key={l.id}>
              <p className="tech-label">{l.dates}</p>
              <h3>{l.organization}</h3>
              {l.role && <p className="serif-accent">{l.role}</p>}
              {l.chapter && <p className="lead-chapter">{l.chapter} chapter</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
