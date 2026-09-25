import { notFound } from "next/navigation";

import { ArrowUpRight } from "lucide-react";
import {
  profile,
  experiences,
  awards,
  media,
  competitions,
  leadership,
  photos,
  type Entry,
} from "@/data/portfolio";
import { Gallery, PdfViewer } from "@/components/assets";
import { Collection } from "@/components/collection";
import { Portrait } from "@/components/portrait";
const pages: Record<
  string,
  {
    title: string;
    kicker: string;
    description: string;
    entries?: Entry[];
    pending?: string;
  }
> = {
  about: {
    title: "A little about me.",
    kicker: "THE PERSON / THE PERSPECTIVE",
    description: profile.about,
  },
  experience: {
    title: "An evolving journey.",
    kicker: "EXPERIENCE / TIMELINE",
    description: "Learning, research, and engineering practice.",
    entries: experiences,
    pending:
      "Verified roles, organizations, responsibilities, and dates will form this timeline.",
  },
  recognition: {
    title: "Awards & recognition.",
    kicker: "MILESTONES / ACKNOWLEDGMENTS",
    description: "A place for the milestones along the way.",
    entries: awards,
    pending:
      "Awards and distinctions will be added after verification against the resume.",
  },
  media: {
    title: "In conversation.",
    kicker: "MEDIA / INTERVIEWS",
    description: "Videos, articles, and television appearances.",
    entries: media,
    pending:
      "Verified appearances, original links, and publication dates will be collected here.",
  },
  competitions: {
    title: "Ideas meet challenge.",
    kicker: "COMPETITIONS / COLLABORATION",
    description: "A space for collaborative engineering challenges.",
    entries: competitions,
    pending:
      "FIRST Robotics, NASA Space Apps, and other event entries are reserved pending confirmation of participation, dates, roles, and results.",
  },
  leadership: {
    title: "Engineering together.",
    kicker: "LEADERSHIP / INVOLVEMENT",
    description: "The communities and collaborations around the work.",
    entries: leadership,
    pending:
      "Confirmed organizations, leadership roles, and activities will appear here.",
  },
  resume: {
    title: "The journey, on paper.",
    kicker: "RESUME / ACADEMIC & PROFESSIONAL",
    description: `${profile.degree} · ${profile.university}`,
  },
  contact: {
    title: "Let’s connect.",
    kicker: "CONTACT / NEW CONNECTIONS",
    description:
      "For conversations about aerospace, nuclear robotics, space nuclear systems, and materials research.",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return { title: pages[section]?.title ?? "Page not found" };
}
export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = pages[section];
  if (!page) notFound();
  return (
    <div className={`page-wrap shell section-${section}`}>
      <div className="page-heading" data-reveal>
        <p className="eyebrow">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
      {section === "about" && (
        <>
          <div className="about-story">
            <Portrait />
            <div className="about-details">
              <section>
                <p className="eyebrow">01 / EDUCATION</p>
                <h2>University of Cincinnati</h2>
                <p>Aerospace Engineering student</p>
                <p>Minor in Materials Engineering</p>
              </section>
              <section>
                <p className="eyebrow">02 / INTERESTS</p>
                <h2>At the intersections</h2>
                <p>
                  Aerospace · Nuclear robotics · Space nuclear systems ·
                  Materials research
                </p>
              </section>
            </div>
          </div>
          <Gallery photos={photos} title="Life beyond the equations" />
          <div className="editorial-note">
            A personal portrait and a fuller story will be added with approved
            material.
          </div>
        </>
      )}
      {page.entries && (
        <Collection
          entries={page.entries}
          section={section}
          pending={page.pending}
        />
      )}
      {section === "resume" && (
        <>
          <div className="resume-summary">
            <span className="eyebrow">ANA SOFÍA CHÁVEZ SALAS</span>
            <h2>{profile.degree}</h2>
            <p>
              {profile.university}
              <br />
              Minor in {profile.minor}
            </p>
          </div>
          <PdfViewer title="Resume" src={profile.resume} />
        </>
      )}
      {section === "contact" && (
        <div className="contact-details">
          <div>
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>A new point of connection.</h2>
            <p>
              {profile.email
                ? "Send a note to start a conversation."
                : "Contact details will be published here once confirmed."}
            </p>
            {profile.email && (
              <a className="text-link" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={18} />
              </a>
            )}
            {!profile.email && !profile.linkedin && (
              <span className="pending-label">CONTACT INFORMATION PENDING</span>
            )}
          </div>
          <span className="contact-illustration" aria-hidden="true">
            ✳
          </span>
        </div>
      )}
    </div>
  );
}
