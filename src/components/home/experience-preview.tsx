import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dateRange, experience } from "@/data/portfolio";
import { SectionHeading, TagList } from "@/components/ui/primitives";

export function ExperiencePreview() {
  if (!experience.length) return null;
  const [primary, ...others] = experience;
  return (
    <section className="section shell exp-preview" aria-labelledby="exp-title">
      <SectionHeading
        index="02"
        kicker="Experience"
        title={
          <span id="exp-title">
            Current <span className="serif-accent">trajectory.</span>
          </span>
        }
        link={{ href: "/experience", label: "Full timeline" }}
      />
      <div className="exp-preview-grid">
        <article className="exp-primary" data-reveal>
          <div className="exp-primary-orbit" aria-hidden="true">
            <span />
            <span />
            <i />
          </div>
          <p className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            {dateRange(primary.startDate, primary.endDate)}
            {primary.location && ` · ${primary.location}`}
          </p>
          <h3>{primary.organization}</h3>
          {primary.role && <p className="exp-role serif-accent">{primary.role}</p>}
          {primary.summary && <p className="exp-summary">{primary.summary}</p>}
          {primary.bullets.length > 0 && (
            <ul className="bullet-list is-compact" data-stagger>
              {primary.bullets.slice(0, 3).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          <TagList tags={primary.tags.slice(0, 6)} label={`${primary.shortName ?? primary.organization} focus areas`} />
        </article>
        <ol className="exp-secondary" data-reveal data-stagger>
          {others.map((e) => (
            <li key={e.id}>
              <span className="exp-node" aria-hidden="true" />
              <p className="tech-label">{dateRange(e.startDate, e.endDate)}</p>
              <h3>{e.role ?? e.shortName}</h3>
              <p className="exp-org">{e.organization}</p>
              {e.summary && <p className="exp-summary">{e.summary}</p>}
            </li>
          ))}
          <li className="exp-more">
            <Link href="/experience" className="text-link">
              Every role, bullet and tool
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
