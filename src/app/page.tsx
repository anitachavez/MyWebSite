import Link from "next/link";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { ProjectGrid } from "@/components/project-grid";
import { Portrait } from "@/components/portrait";
import { Orbital } from "@/components/orbital";
import { profile } from "@/data/portfolio";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-dot" /> AEROSPACE ENGINEERING / MATERIALS
            RESEARCH
          </p>
          <p className="hero-greeting">Hi, I’m</p>
          <h1>
            Ana <span className="serif-accent">Sofía.</span>
            <span className="hero-surname">Chávez Salas</span>
          </h1>
          <p className="hero-manifesto">
            Curiosity beyond
            <br />
            the atmosphere.
          </p>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <Link
              href="/projects"
              className="button button-primary orbit-button"
            >
              Explore my work
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/resume" className="button button-outline orbit-button">
              Resume
              <FileText size={16} />
            </Link>
          </div>
          <Link href="/about" className="text-link hero-about-link">
            A little about me
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="hero-visual">
          <span className="hero-visual-label eyebrow">
            THE PERSON BEHIND THE POSSIBILITIES
          </span>
          <Portrait />
          <div className="hero-education">
            <span className="education-mark">UC</span>
            <div>
              {profile.university}
              <span>
                {profile.degree} · Minor in {profile.minor}
              </span>
            </div>
          </div>
        </div>
        <a href="#exploration" className="scroll-cue">
          <ArrowDown size={16} />
          <span>SCROLL TO EXPLORE</span>
        </a>
      </section>
      <div className="discipline-band">
        <div className="discipline-strip shell">
          <span>AEROSPACE</span>
          <i aria-hidden="true">✳</i>
          <span>NUCLEAR ROBOTICS</span>
          <i aria-hidden="true">✳</i>
          <span>SPACE NUCLEAR SYSTEMS</span>
          <i aria-hidden="true">✳</i>
          <span>MATERIALS RESEARCH</span>
        </div>
      </div>
      <section id="exploration" className="section shell" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / AREAS OF EXPLORATION</p>
            <h2>
              Different fields.
              <br />
              <span className="serif-accent">Connected curiosity.</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Four connected fields. A growing collection of engineering work.
              Case studies will appear here as approved material becomes
              available.
            </p>
            <Link href="/projects" className="text-link">
              Explore all areas
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <ProjectGrid featured />
      </section>
      <section className="about-band shell" data-reveal>
        <div className="about-orbital">
          <Orbital variant={2} />
        </div>
        <div className="about-band-copy">
          <p className="eyebrow">02 / THE PERSON BEHIND THE WORK</p>
          <h2>
            Big questions.
            <br />
            <span className="serif-accent">An engineer’s mindset.</span>
          </h2>
          <p>{profile.about}</p>
          <Link className="text-link" href="/about">
            Get to know me
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section shell journey-section" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / BEYOND THE PROJECTS</p>
            <h2>
              The wider <span className="serif-accent">journey.</span>
            </h2>
          </div>
          <p className="small-note">
            Experiences, communities,
            <br />
            and moments along the way.
          </p>
        </div>
        <div className="journey-links">
          {[
            {
              n: "01",
              title: "Experience",
              desc: "The engineering journey",
              url: "/experience",
            },
            {
              n: "02",
              title: "Awards & recognition",
              desc: "Milestones and acknowledgments",
              url: "/recognition",
            },
            {
              n: "03",
              title: "Media & interviews",
              desc: "Conversations and perspectives",
              url: "/media",
            },
            {
              n: "04",
              title: "Competitions",
              desc: "Challenges and collaboration",
              url: "/competitions",
            },
            {
              n: "05",
              title: "Leadership & involvement",
              desc: "Community and connection",
              url: "/leadership",
            },
          ].map((x) => (
            <Link href={x.url} key={x.n}>
              <span className="journey-index">{x.n}</span>
              <h3>{x.title}</h3>
              <span className="journey-description">{x.desc}</span>
              <span className="journey-arrow">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="contact-band shell" data-reveal>
        <p className="eyebrow">THE NEXT CONNECTION</p>
        <h2>
          Great ideas start with
          <br />
          <span className="serif-accent">a conversation.</span>
        </h2>
        <Link href="/contact" className="button button-primary orbit-button">
          Let’s connect
          <ArrowUpRight size={18} />
        </Link>
        <div className="contact-orbits" aria-hidden="true">
          <span />
          <span />
          <span className="contact-star">✳</span>
        </div>
      </section>
    </>
  );
}
