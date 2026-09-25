import {
  ArrowUpRight,
  Award,
  ArrowRight,
  AudioLines,
  Orbit,
} from "lucide-react";
import Link from "next/link";
import { competitionSpaces, type Entry } from "@/data/portfolio";
import { Gallery, MediaImage, PdfViewer, VideoPlayer } from "./assets";
export function Collection({
  entries,
  section,
  pending,
}: {
  entries: Entry[];
  section: string;
  pending?: string;
}) {
  if (!entries.length)
    return (
      <div className={`collection-empty empty-${section}`} data-reveal>
        <div className="empty-state">
          <p className="eyebrow">COLLECTION IN PROGRESS</p>
          <h2>
            A space for
            <br />
            the <span className="serif-accent">next chapter.</span>
          </h2>
          <p>{pending}</p>
          <Link className="text-link" href="/projects">
            Explore the research areas
            <ArrowRight size={16} />
          </Link>
        </div>
        {section === "competitions" ? (
          <div className="competition-reservations">
            {competitionSpaces.map((name, i) => (
              <div key={name}>
                <span className="eyebrow">0{i + 1} / RESERVED SPACE</span>
                <h3>{name}</h3>
                <p>
                  {i < 2
                    ? "Participation and details pending verification."
                    : "Future entries will be added here."}
                </p>
              </div>
            ))}
          </div>
        ) : section === "media" ? (
          <div className="media-reservation">
            <div className="media-reservation-art">
              <AudioLines size={64} strokeWidth={0.7} />
              <span className="eyebrow">STORIES & PERSPECTIVES</span>
            </div>
            <div>
              <span>01 / Videos & interviews</span>
              <span>02 / Articles & notes</span>
              <span>03 / Television</span>
            </div>
          </div>
        ) : section === "recognition" ? (
          <div className="recognition-reservation">
            <div className="award-orbits" aria-hidden="true">
              <Award size={62} strokeWidth={0.8} />
            </div>
            <span className="eyebrow">RECOGNITIONS TO COME</span>
            <p>
              Verified milestones.
              <br />
              Their own place in the story.
            </p>
          </div>
        ) : (
          <div className="timeline-reservation">
            <Orbit size={38} strokeWidth={1} />
            <div>
              <span className="eyebrow">
                {section === "experience"
                  ? "THE ENGINEERING JOURNEY"
                  : "COMMUNITY & CONNECTION"}
              </span>
              <h3>
                {section === "experience"
                  ? "Learning. Research. Practice."
                  : "People. Ideas. Shared purpose."}
              </h3>
              <p>Confirmed roles and dates will appear here.</p>
            </div>
          </div>
        )}
      </div>
    );
  return (
    <div className={`collection-list collection-${section}`}>
      {entries.map((entry, i) => (
        <article
          key={`${entry.title}-${i}`}
          className="collection-entry"
          data-reveal
        >
          {section === "recognition" && (
            <div className="award-year">
              <span>{entry.year ?? entry.date ?? "Year pending"}</span>
              <Award size={25} strokeWidth={1} />
            </div>
          )}
          {(section === "media" || entry.photo) && (
            <div className="entry-visual">
              {entry.video ? (
                <VideoPlayer video={entry.video} />
              ) : (
                <MediaImage photo={entry.photo} />
              )}
            </div>
          )}
          <div className="entry-copy">
            <p className="eyebrow">
              {entry.kind && `${entry.kind} / `}
              {entry.date ?? entry.year ?? "DATE NOT PROVIDED"}
            </p>
            <h2>{entry.title}</h2>
            <h3>{entry.organization}</h3>
            <p>{entry.description}</p>
            {entry.href && (
              <a
                className="text-link"
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.kind === "Article" ? "Read article" : "View source"}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          {entry.video && section !== "media" && !entry.photo && (
            <VideoPlayer video={entry.video} />
          )}
          {entry.photos?.length ? (
            <div className="entry-assets">
              <Gallery photos={entry.photos} title={entry.title} />
            </div>
          ) : null}
          {entry.documents?.map((doc) => (
            <div className="entry-assets" key={doc.src}>
              <PdfViewer {...doc} />
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
