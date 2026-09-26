import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/data/portfolio";
import { VideoPlayer } from "@/components/assets";

// Signal Feed: renders media items from content/site.json (media.items).
// Supported kinds: "short" (vertical video), "television", "interview",
// "article" and "link". Renders nothing when there are no items.
const kindLabel: Record<MediaItem["kind"], string> = {
  short: "Short video",
  television: "Television",
  interview: "Interview",
  article: "Article",
  link: "Link",
};

function Meta({ item }: { item: MediaItem }) {
  return (
    <p className="signal-meta">
      <span className="tech-label is-accent">{kindLabel[item.kind]}</span>
      {[item.outlet, item.date].filter(Boolean).join(" · ")}
    </p>
  );
}

export function SignalFeed({ items }: { items: MediaItem[] }) {
  if (!items.length) return null;
  const shorts = items.filter((i) => i.kind === "short" && i.video);
  const broadcasts = items.filter(
    (i) => (i.kind === "television" || i.kind === "interview") && i.video,
  );
  const links = items.filter((i) => !shorts.includes(i) && !broadcasts.includes(i) && i.href);
  return (
    <div className="signal-feed">
      {broadcasts.length > 0 && (
        <section className="signal-group" aria-label="Television and interviews">
          <div className="signal-broadcasts">
            {broadcasts.map((item, i) => (
              <article key={`${item.title}-${i}`} className="signal-item" data-reveal>
                <Meta item={item} />
                <VideoPlayer video={item.video} />
              </article>
            ))}
          </div>
        </section>
      )}
      {shorts.length > 0 && (
        <section className="signal-group" aria-label="Short videos">
          <div className="signal-shorts">
            {shorts.map((item, i) => (
              <article key={`${item.title}-${i}`} className="signal-item is-vertical" data-reveal>
                <VideoPlayer video={{ ...item.video!, orientation: "vertical" }} />
                <Meta item={item} />
              </article>
            ))}
          </div>
        </section>
      )}
      {links.length > 0 && (
        <section className="signal-group" aria-label="Articles and links">
          <ul className="signal-links">
            {links.map((item, i) => (
              <li key={`${item.title}-${i}`}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <Meta item={item} />
                  <span className="signal-title">{item.title}</span>
                  {item.description && <span className="signal-desc">{item.description}</span>}
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
