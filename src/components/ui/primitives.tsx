import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Stat } from "@/data/portfolio";
import { StatCounter } from "@/components/motion/stat-counter";

// Small monospace label used for indices, codes and coordinates.
export function TechLabel({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span className={`tech-label ${accent ? "is-accent" : ""} ${className}`}>
      {children}
    </span>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  aside,
  link,
  as: Tag = "h2",
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  link?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  return (
    <header className="section-heading" data-reveal>
      <div className="section-heading-main">
        <p className="eyebrow">
          {index && <span className="eyebrow-index">{index}</span>}
          {kicker}
        </p>
        <Tag className="section-title">{title}</Tag>
      </div>
      {(aside || link) && (
        <div className="section-heading-aside reveal-late">
          {aside && <p>{aside}</p>}
          {link && (
            <Link href={link.href} className="text-link">
              {link.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

// Interior page opening: kicker, editorial title, lead and an optional visual.
export function PageHero({
  kicker,
  title,
  lead,
  visual,
  meta,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  visual?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className={`page-hero ${visual ? "has-visual" : ""}`}>
      <div className="page-hero-copy" data-reveal>
        <p className="eyebrow">
          <span className="tiny-dot" aria-hidden="true" />
          {kicker}
        </p>
        <h1>{title}</h1>
        {lead && <p className="page-lead reveal-late">{lead}</p>}
        {meta && <div className="page-hero-meta reveal-late">{meta}</div>}
      </div>
      {visual && (
        <div className="page-hero-visual" data-reveal>
          {visual}
        </div>
      )}
    </header>
  );
}

export function StatList({
  stats,
  variant = "inline",
}: {
  stats: Stat[];
  variant?: "inline" | "large" | "card";
}) {
  if (!stats.length) return null;
  return (
    <dl className={`stat-list stat-${variant}`} data-stagger>
      {stats.map((s) => (
        <div key={`${s.value}-${s.label}`} className="stat">
          <dt className="stat-label">{s.label}</dt>
          <dd className="stat-value">
            <StatCounter value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TagList({
  tags,
  label,
}: {
  tags: string[];
  label?: string;
}) {
  if (!tags.length) return null;
  return (
    <ul className="tag-list" aria-label={label}>
      {tags.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="bullet-list" data-stagger>
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

// Key/value facts. Rows whose value is missing are skipped.
export function FactList({
  facts,
  className = "",
}: {
  facts: [string, ReactNode | undefined][];
  className?: string;
}) {
  const rows = facts.filter(([, v]) => v !== undefined && v !== "");
  if (!rows.length) return null;
  return (
    <dl className={`fact-list ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
