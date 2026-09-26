import { profile, sections } from "@/data/portfolio";
import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { Trajectory } from "@/components/home/trajectory";
import { Highlights } from "@/components/home/highlights";
import { SectionExplorer } from "@/components/home/section-explorer";
import { ContactCta } from "@/components/home/contact-cta";
import { SectionHeading } from "@/components/ui/primitives";

// Curated landing page: who, what, strongest work, a few highlights, where to go
// next, contact. Full detail lives on the dedicated pages.
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Trajectory />
      <Highlights />
      <section className="section shell explorer-section" aria-labelledby="explorer-title">
        <SectionHeading
          kicker="Explore"
          align="center"
          title={
            <span id="explorer-title">
              Chart <span className="serif-accent">a course.</span>
            </span>
          }
        />
        <SectionExplorer
          sections={sections}
          centerTitle={profile.firstName}
          centerSubtitle="Explore the portfolio"
        />
      </section>
      <ContactCta />
    </>
  );
}
