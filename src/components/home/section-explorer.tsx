"use client";
// Orbital map of the site. Desktop: section nodes sit on an elliptical orbit
// around a central node; hovering or focusing a node lights its trajectory and
// shows its description in the centre. Mobile: the same list becomes a vertical
// mission path. It is always a plain list of links for keyboard and screen readers.
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SectionLink } from "@/data/portfolio";

const RX = 40;
const RY = 36;

// Node positions are fixed in advance (8 nodes, 45° apart) so server and client agree.
const unit = [
  [0, -1],
  [0.7071, -0.7071],
  [1, 0],
  [0.7071, 0.7071],
  [0, 1],
  [-0.7071, 0.7071],
  [-1, 0],
  [-0.7071, -0.7071],
];

export function SectionExplorer({
  sections,
  centerTitle,
  centerSubtitle,
}: {
  sections: SectionLink[];
  centerTitle: string;
  centerSubtitle: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const nodes = sections.slice(0, unit.length).map((s, i) => {
    const [ux, uy] = unit[i];
    const x = Math.round((50 + ux * RX) * 100) / 100;
    const y = Math.round((50 + uy * RY) * 100) / 100;
    // Control point bends each trajectory slightly clockwise.
    const cx = Math.round((50 + (ux * 0.5 - uy * 0.22) * RX) * 100) / 100;
    const cy = Math.round((50 + (uy * 0.5 + ux * 0.22) * RY) * 100) / 100;
    return { ...s, x, y, d: `M50 50 Q${cx} ${cy} ${x} ${y}` };
  });
  const current = active === null ? null : nodes[active];

  return (
    <div className={`explorer ${active !== null ? "has-active" : ""}`} data-reveal>
      <svg
        className="explorer-map"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <ellipse cx="50" cy="50" rx={RX} ry={RY} className="explorer-orbit" />
        <ellipse cx="50" cy="50" rx={RX * 0.52} ry={RY * 0.52} className="explorer-orbit is-inner" />
        <ellipse cx="50" cy="50" rx={RX * 1.12} ry={RY * 1.1} className="explorer-orbit is-outer" />
        {nodes.map((n, i) => (
          <path
            key={n.href}
            d={n.d}
            className={`explorer-path ${active === i ? "is-active" : ""}`}
            style={{ "--d": `${200 + i * 90}ms` } as CSSProperties}
          />
        ))}
      </svg>

      <div className="explorer-center" aria-hidden="true">
        <span className="explorer-core" />
        <strong>{current ? current.short : centerTitle}</strong>
        <span className="explorer-center-text">
          {current ? current.description : centerSubtitle}
        </span>
      </div>

      <ol className="explorer-nodes" data-stagger>
        {nodes.map((n, i) => (
          <li
            key={n.href}
            style={{ "--x": `${n.x}%`, "--y": `${n.y}%` } as CSSProperties}
            className={`${n.y > 60 ? "is-below" : ""} ${n.x < 40 ? "is-left" : n.x > 60 ? "is-right" : ""}`}
          >
            <Link
              href={n.href}
              className={active === i ? "is-active" : undefined}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="explorer-dot" aria-hidden="true" />
              <span className="explorer-title-row">
                <span className="explorer-label">{n.short}</span>
                <ArrowUpRight className="explorer-arrow" size={17} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
