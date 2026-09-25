// Source: the owner's initial brief. Resume was not available at implementation time.
// Empty collections are intentional: never infer roles, dates, results or affiliations.
export const profile = {
  name: "Ana Sofía Chávez Salas",
  shortName: "Ana Sofía",
  degree: "Aerospace Engineering",
  university: "University of Cincinnati",
  minor: "Materials Engineering",
  email: "",
  linkedin: "",
  resume: "",
  portrait: {
    src: "/images/ana-sofia-portrait.webp",
    alt: "Ana Sofía Chávez Salas",
    caption: "Aerospace Engineering · University of Cincinnati",
  },
  introduction:
    "My work connects aerospace, nuclear robotics, space nuclear systems, and materials research.",
  about:
    "I’m Ana Sofía Chávez Salas, an Aerospace Engineering student at the University of Cincinnati, with a minor in Materials Engineering. My interests meet at the intersection of flight, robotic systems, nuclear technology, and the materials that make them possible.",
};
export const disciplines = [
  "Aerospace",
  "Nuclear robotics",
  "Space nuclear systems",
  "Materials research",
] as const;
export type Discipline = (typeof disciplines)[number];
export type Photo = { src: string; alt: string; caption: string };
export type Video = {
  title: string;
  src?: string;
  embedUrl?: string;
  poster?: Photo;
  captions?: string;
  captionLanguage?: string;
  transcript?: string;
  description?: string;
};
export type Document = { title: string; src: string; description?: string };
export type Project = {
  slug: string;
  title: string;
  category: Discipline;
  summary: string;
  status: "placeholder" | "published";
  year?: string;
  role?: string;
  sections: { title: string; body: string }[];
  photos: Photo[];
  binder?: string;
  cover?: Photo;
  problem?: string;
  process?: string;
  contribution?: string;
  results?: string;
  videos?: Video[];
  documents?: Document[];
};
export const projects: Project[] = [
  {
    slug: "aerospace",
    title: "Aerospace engineering",
    category: "Aerospace",
    summary: "A space for work exploring flight and aerospace systems.",
    status: "placeholder",
    sections: [],
    photos: [],
  },
  {
    slug: "nuclear-robotics",
    title: "Nuclear robotics",
    category: "Nuclear robotics",
    summary:
      "A space for work at the intersection of robotics and nuclear technology.",
    status: "placeholder",
    sections: [],
    photos: [],
  },
  {
    slug: "space-nuclear-systems",
    title: "Space nuclear systems",
    category: "Space nuclear systems",
    summary:
      "A space for work connecting nuclear systems and space exploration.",
    status: "placeholder",
    sections: [],
    photos: [],
  },
  {
    slug: "materials-research",
    title: "Materials research",
    category: "Materials research",
    summary:
      "A space for research into the materials behind engineering systems.",
    status: "placeholder",
    sections: [],
    photos: [],
  },
];
export type Entry = {
  title: string;
  organization: string;
  description: string;
  date?: string;
  href?: string;
  photo?: Photo;
  year?: string;
  photos?: Photo[];
  documents?: Document[];
  video?: Video;
  kind?: "Video" | "Interview" | "Article" | "Television";
};
export const experiences: Entry[] = [];
export const awards: Entry[] = [];
export const media: Entry[] = [];
export const competitions: Entry[] = [];
export const leadership: Entry[] = [];
export const photos: Photo[] = [];
// Reserved spaces, not claims of participation or results.
export const competitionSpaces = [
  "FIRST Robotics",
  "NASA Space Apps",
  "Future competitions",
];
export const navigation = [
  { href: "/about", label: "About me" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/recognition", label: "Recognition" },
  { href: "/contact", label: "Contact" },
];
