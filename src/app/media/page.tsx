import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { leadership, media, parseStat } from "@/data/portfolio";
import { StatCounter } from "@/components/motion/stat-counter";
import { SignalFeed } from "@/components/media/signal-feed";
import { SignalMotif } from "@/components/visuals/motifs";

export const metadata: Metadata = { title: "Media" };

export default function MediaPage() {
  const host = leadership.find((l) => l.id === "shetalks");
  const tv = host?.stats.find((s) => /television|tv/i.test(s.label));
  const receivers = tv ? (parseStat(tv.value)?.number ?? 0) : 0;
  return (
    <div className="page-wrap shell page-media">
      <header className="media-hero" data-reveal>
        <div className="media-hero-copy">
          <p className="eyebrow">
            <span className="tiny-dot" aria-hidden="true" />
            Media · Signal
          </p>
          <h1>
            {media.headline ?? (
              <>
                In <span className="serif-accent">conversation.</span>
              </>
            )}
          </h1>
          {host?.summary && <p className="page-lead">{host.summary}</p>}
          <div className="media-hero-stats">
            {host?.stats.map((s) => (
              <p key={s.label} className="media-stat">
                <span className="media-stat-value">
                  <StatCounter value={s.value} />
                </span>
                <span className="media-stat-label">{s.label}</span>
              </p>
            ))}
          </div>
          {host && (
            <Link href="/leadership" className="text-link">
              {host.organization}
              {host.role && ` · ${host.role}`}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="media-hero-visual" aria-hidden="true">
          <SignalMotif id="media-signal" receivers={Math.min(receivers, 8)} />
          <div className="media-scan">
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>
      <SignalFeed items={media.items} />
    </div>
  );
}
