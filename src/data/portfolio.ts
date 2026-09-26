// All portfolio content comes from content/site.json.
// Strings that start with "TODO" mark missing content. They are removed here, once,
// so no component can render them: missing fields become undefined and TODO entries
// are dropped from arrays. Components only need to handle optional fields.
import raw from "../../content/site.json";

export const categories = [
  "Aerospace",
  "Nuclear robotics",
  "Space nuclear systems",
  "Materials research",
] as const;
export type Category = (typeof categories)[number];

export type Stat = { value: string; label: string; source?: string };
export type Photo = { src: string; alt: string; caption?: string };
export type Video = {
  title: string;
  src?: string;
  embedUrl?: string;
  poster?: Photo;
  captions?: string;
  captionLanguage?: string;
  transcript?: string;
  description?: string;
  orientation?: "vertical" | "landscape";
};
export type Document = { title: string; src: string; description?: string };

export type Profile = {
  fullName: string;
  firstName: string;
  degree: string;
  minor: string;
  university: string;
  program?: string;
  graduationYear?: string;
  tagline: string;
  thesis?: string;
  about: string[];
  gpa?: string;
  gpaScale?: string;
  languages: string[];
  interests: string[];
  portrait?: { src?: string; alt?: string };
};
export type Contact = {
  email?: string;
  linkedin?: string;
  github?: string;
  resume?: string;
};
export type Experience = {
  id: string;
  organization?: string;
  shortName?: string;
  role?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  bullets: string[];
  tags: string[];
  projectSlugs: string[];
};
export type Research = {
  id: string;
  title?: string;
  shortTitle?: string;
  experienceId?: string;
  organization?: string;
  context?: string;
  category?: Category;
  startDate?: string;
  endDate?: string;
  summary?: string;
  researchQuestion?: string;
  tools: string[];
  advisor?: string;
  publications: Document[];
  projectSlugs: string[];
};
export type ProjectSection = { heading?: string; body: string[] };
export type Project = {
  slug: string;
  title: string;
  category: Category;
  organization?: string;
  context?: string;
  experienceId?: string;
  researchId?: string;
  competitionId?: string;
  year?: string;
  role?: string;
  status?: string;
  featured?: boolean;
  summary?: string;
  sections: ProjectSection[];
  results?: string[];
  stats: Stat[];
  tools: string[];
  images: Photo[];
  videos: Video[];
  documents: Document[];
};
export type Award = {
  title: string;
  officialTitle?: string;
  organization?: string;
  competitionId?: string;
  date?: string;
  location?: string;
  description?: string;
};
export type Competition = {
  id: string;
  name: string;
  role?: string;
  team?: string;
  dates?: string;
  location?: string;
  summary?: string;
  results: string[];
  highlights: string[];
  projectSlugs: string[];
};
export type Leadership = {
  id: string;
  organization: string;
  chapter?: string;
  role?: string;
  dates?: string;
  summary?: string;
  stats: Stat[];
  bullets: string[];
};
// Phase 2: media items are added to content/site.json under media.items.
export type MediaItem = {
  kind: "short" | "television" | "interview" | "article" | "link";
  title: string;
  outlet?: string;
  date?: string;
  href?: string;
  description?: string;
  video?: Video;
  thumbnail?: Photo;
};
export type Media = { headline?: string; items: MediaItem[] };

type Site = {
  profile: Profile;
  contact: Contact;
  experience: Experience[];
  research: Research[];
  projects: Project[];
  awards: Award[];
  competitions: Competition[];
  leadership: Leadership[];
  media: Media;
  homepageStats: Stat[];
};

export const isMissing = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" &&
    (value.trim() === "" || value.trim().toUpperCase().startsWith("TODO")));

function sanitize(value: unknown): unknown {
  if (Array.isArray(value))
    return value.filter((v) => !isMissing(v)).map(sanitize);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value)) {
      if (key.startsWith("_") || isMissing(v)) continue;
      out[key] = sanitize(v);
    }
    return out;
  }
  return value;
}

const site = sanitize(raw) as Site;

export const {
  profile,
  contact,
  experience,
  research,
  projects,
  awards,
  competitions,
  leadership,
  media,
  homepageStats,
} = site;

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const getResearch = (id?: string) =>
  research.find((r) => r.id === id);
export const getExperience = (id?: string) =>
  experience.find((e) => e.id === id);
export const getCompetition = (id?: string) =>
  competitions.find((c) => c.id === id);

export const categoryCode: Record<Category, string> = {
  Aerospace: "AER",
  "Nuclear robotics": "NRB",
  "Space nuclear systems": "SNS",
  "Materials research": "MAT",
};

export const dateRange = (start?: string, end?: string) =>
  [start, end].filter(Boolean).join(" – ");

// Leading integer of a stat value, used to decide whether it can count up.
export function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { number: Number(match[1]), suffix: match[2] } : null;
}

export type SectionLink = {
  href: string;
  label: string;
  short: string;
  description: string;
};

const years = awards
  .map((a) => a.date?.match(/\d{4}/)?.[0])
  .filter((y): y is string => Boolean(y))
  .sort();

export const sections: SectionLink[] = [
  {
    href: "/about",
    label: "About",
    short: "About",
    description: `${profile.degree}, ${profile.university}. Languages and interests.`,
  },
  {
    href: "/experience",
    label: "Experience",
    short: "Experience",
    description: experience
      .map((e) => e.shortName ?? e.organization)
      .filter(Boolean)
      .join(" · "),
  },
  {
    href: "/projects",
    label: "Projects",
    short: "Projects",
    description: `${projects.length} projects across ${categories.length} fields.`,
  },
  {
    href: "/recognition",
    label: "Recognition",
    short: "Recognition",
    description: `${awards.length} awards${years.length ? `, ${years[0]}–${years[years.length - 1]}` : ""}.`,
  },
  {
    href: "/media",
    label: "Media",
    short: "Media",
    description: media.headline ?? "Television and interviews.",
  },
  {
    href: "/competitions",
    label: "Competitions",
    short: "Competitions",
    description: competitions.map((c) => c.name).join(" · "),
  },
  {
    href: "/leadership",
    label: "Leadership",
    short: "Leadership",
    description: leadership.map((l) => l.organization).join(" · "),
  },
  {
    href: "/contact",
    label: "Contact",
    short: "Contact",
    description: ["Email", contact.linkedin && "LinkedIn", contact.github && "GitHub"]
      .filter(Boolean)
      .join(", "),
  },
];

const byHref = (href: string) => sections.find((s) => s.href === href)!;

// Research has no route of its own: it lives on /experience (#research).
export const researchLink: SectionLink = {
  href: "/experience#research",
  label: "Research",
  short: "Research",
  description: research.map((r) => r.shortTitle ?? r.title).filter(Boolean).join(" · "),
};

// Header: Home plus four obvious destinations, everything else under "More".
export const homeLink: SectionLink = {
  href: "/",
  label: "Home",
  short: "Home",
  description: "Back to the start.",
};
export const primaryNav = [
  homeLink,
  ...["/projects", "/experience", "/about", "/contact"].map(byHref),
];
export const moreNav = [
  researchLink,
  ...["/recognition", "/competitions", "/leadership", "/media"].map(byHref),
];

// Newest first; awards without a date go last, in their site.json order.
export const sortedAwards = awards
  .map((a, i) => ({ a, i, y: Number(a.date?.match(/\d{4}/)?.[0] ?? 0) }))
  .sort((p, q) => q.y - p.y || p.i - q.i)
  .map((p) => p.a);

export const awardYear = (award: Award) => award.date?.match(/\d{4}/)?.[0];

// "projects.robotic-hot-cell" → "Robotic Hot Cell System"
export function statSource(source?: string) {
  if (!source) return undefined;
  const [kind, id] = source.split(".");
  if (kind === "projects") return getProject(id)?.title;
  if (kind === "leadership")
    return leadership.find((l) => l.id === id)?.organization;
  return undefined;
}

// Splits "statement: continuation" so the continuation can be set as an accent.
export function splitTagline(text: string) {
  const at = text.indexOf(":");
  return at === -1
    ? { lead: text, accent: "" }
    : { lead: text.slice(0, at + 1), accent: text.slice(at + 1).trim() };
}

// "English — C1, TOEFL iBT 100+" → { name: "English", level: "C1, TOEFL iBT 100+" }
export const languageParts = (entry: string) => {
  const [name, ...rest] = entry.split(/\s+[—–-]\s+/);
  return { name, level: rest.join(" — ") || undefined };
};
