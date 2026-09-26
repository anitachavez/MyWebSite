import { homepageStats, statSource } from "@/data/portfolio";
import { StatCounter } from "@/components/motion/stat-counter";

export function MetricsStrip() {
  if (!homepageStats.length) return null;
  return (
    <section id="metrics" className="metrics" aria-labelledby="metrics-title" data-reveal>
      <div className="shell">
        <h2 id="metrics-title" className="sr-only">
          Engineering metrics
        </h2>
        <ul className="metrics-list" data-stagger>
          {homepageStats.map((s, i) => {
            const source = statSource(s.source);
            return (
              <li key={`${s.value}-${s.label}`} className="metric">
                <span className="tech-label">M-{String(i + 1).padStart(2, "0")}</span>
                <span className="metric-value">
                  <StatCounter value={s.value} />
                </span>
                <span className="metric-label">{s.label}</span>
                {source && <span className="metric-source">{source}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
