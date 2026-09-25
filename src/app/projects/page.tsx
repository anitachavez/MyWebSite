import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return (
    <div className="page-wrap shell">
      <div className="page-heading">
        <p className="eyebrow">THE WORK / PROJECT INDEX</p>
        <h1>
          Ideas into <span className="serif-accent">exploration.</span>
        </h1>
        <p>
          Aerospace, nuclear robotics, space nuclear systems, and materials
          research.
        </p>
      </div>
      <div className="editorial-note">
        This collection is taking shape. The entries below mark areas of
        interest; they are placeholders, not completed project claims.
      </div>
      <ProjectGrid />
    </div>
  );
}
