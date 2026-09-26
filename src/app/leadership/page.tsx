import type { Metadata } from "next";
import type { ReactNode } from "react";
import { leadership, parseStat } from "@/data/portfolio";
import { BulletList, PageHero, StatList } from "@/components/ui/primitives";
import { VisualFrame } from "@/components/visuals/frame";
import { MechanicalMotif, NetworkMotif, SignalMotif } from "@/components/visuals/motifs";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
  return (
    <div className="page-wrap shell page-leadership">
      <PageHero
        kicker="Leadership · Involvement"
        title={
          <>
            Engineering, <span className="serif-accent">together.</span>
          </>
        }
        lead={leadership.map((l) => l.organization).join(" · ")}
      />
      <div className="leadership-list">
        {leadership.map((l, i) => {
          // SheTalks' broadcast motif shows one receiver per television appearance.
          const tv = l.stats.find((s) => /television|tv/i.test(s.label));
          const receivers = tv ? (parseStat(tv.value)?.number ?? 0) : 0;
          const visual: ReactNode =
            l.id === "shetalks" ? (
              <SignalMotif id={`lead-${l.id}`} receivers={Math.min(receivers, 8)} />
            ) : l.id === "first-captain" ? (
              <MechanicalMotif id={`lead-${l.id}`} />
            ) : (
              <NetworkMotif id={`lead-${l.id}`} />
            );
          return (
            <section
              key={l.id}
              className={`leader ${l.stats.length ? "has-stats" : ""}`}
              aria-labelledby={`${l.id}-title`}
              data-reveal
            >
              <div className="leader-body">
                <p className="eyebrow">
                  <span className="eyebrow-index">{String(i + 1).padStart(2, "0")}</span>
                  {l.dates}
                </p>
                <h2 id={`${l.id}-title`}>{l.organization}</h2>
                {(l.role || l.chapter) && (
                  <p className="leader-role">
                    {l.role && <span className="serif-accent">{l.role}</span>}
                    {l.chapter && <span className="leader-chapter">{l.chapter} chapter</span>}
                  </p>
                )}
                {l.summary && <p className="leader-summary">{l.summary}</p>}
                <BulletList items={l.bullets} />
              </div>
              <div className="leader-side">
                <StatList stats={l.stats} variant="large" />
                <VisualFrame code={`L-${String(i + 1).padStart(2, "0")}`} className="vframe-small">
                  {visual}
                </VisualFrame>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
