import { leadership, projects, sortedAwards, type Stat } from "@/data/portfolio";
import { StatCounter } from "@/components/motion/stat-counter";
import { CtaLink, CtaRow, SectionHeading } from "@/components/ui/primitives";

// A few meaningful numbers, each with its source. Every value comes from
// content/site.json; the full lists live on /recognition and /leadership.
export function Highlights() {
  const shetalks = leadership.find((l) => l.stats.length);
  const ranking = projects
    .flatMap((p) => p.stats.map((s) => ({ ...s, source: p.organization })))
    .find((s) => /ranking/i.test(s.label));
  const tiles: (Stat & { source?: string })[] = [
    ...(shetalks?.stats ?? []).map((s) => ({ ...s, source: shetalks?.organization })),
    ...(ranking ? [ranking] : []),
    ...(sortedAwards.length
      ? [{ value: String(sortedAwards.length), label: "awards & distinctions", source: sortedAwards[0].title }]
      : []),
  ].slice(0, 4);
  if (!tiles.length) return null;
  return (
    <section className="section shell highlights" aria-labelledby="highlights-title">
      <SectionHeading
        kicker="Highlights"
        align="center"
        title={
          <span id="highlights-title">
            Recognition <span className="serif-accent">and reach.</span>
          </span>
        }
      />
      <ul className="highlight-grid" data-reveal data-stagger>
        {tiles.map((t) => (
          <li key={t.label} className="highlight">
            <span className="highlight-value">
              <StatCounter value={t.value} />
            </span>
            <span className="highlight-label">{t.label}</span>
            {t.source && <span className="highlight-source">{t.source}</span>}
          </li>
        ))}
      </ul>
      <CtaRow>
        <CtaLink href="/recognition">See recognition</CtaLink>
        <CtaLink href="/leadership">See leadership</CtaLink>
      </CtaRow>
    </section>
  );
}
