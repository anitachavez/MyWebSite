import { profile, sections } from "@/data/portfolio";
import { Hero } from "@/components/home/hero";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { ResearchFeature } from "@/components/home/research-feature";
import { RecognitionPreview } from "@/components/home/recognition-preview";
import { LeadershipPreview } from "@/components/home/leadership-preview";
import { SectionExplorer } from "@/components/home/section-explorer";
import { ContactCta } from "@/components/home/contact-cta";
import { SectionHeading } from "@/components/ui/primitives";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <FeaturedWork />
      <ExperiencePreview />
      <ResearchFeature />
      <RecognitionPreview />
      <LeadershipPreview />
      <section className="section shell explorer-section" aria-labelledby="explorer-title">
        <SectionHeading
          index="06"
          kicker="Section explorer"
          title={
            <span id="explorer-title">
              Chart <span className="serif-accent">a course.</span>
            </span>
          }
          aside="Every part of the portfolio, one orbit away."
        />
        <SectionExplorer
          sections={sections}
          centerTitle={profile.firstName}
          centerSubtitle="Engineering portfolio"
        />
      </section>
      <ContactCta />
    </>
  );
}
