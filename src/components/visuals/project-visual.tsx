import type { ReactNode } from "react";
import { categoryCode, projects, type Project } from "@/data/portfolio";
import { VisualFrame } from "./frame";
import {
  HotCellVisual,
  PathPlanningVisual,
  SwerveVisual,
  TransportVisual,
} from "./project-visuals";
import { SystemFlowVisual } from "./system-flow";
import { PlanetaryMotif } from "./motifs";

// Each project gets its own abstract visual; future projects fall back to a
// visual chosen by category, so adding a project to site.json needs no code.
const bySlug: Record<string, (id: string) => ReactNode> = {
  "robotic-hot-cell": (id) => <HotCellVisual id={id} />,
  "path-planning-testbed": (id) => <PathPlanningVisual id={id} />,
  "swerve-drive-climber": (id) => <SwerveVisual id={id} />,
  "ntp-engine": (id) => <SystemFlowVisual id={id} labels={false} />,
  "inner-ear-delivery": (id) => <TransportVisual id={id} />,
};
const byCategory: Record<Project["category"], (id: string) => ReactNode> = {
  "Nuclear robotics": (id) => <HotCellVisual id={id} />,
  "Space nuclear systems": (id) => <SystemFlowVisual id={id} labels={false} />,
  "Materials research": (id) => <TransportVisual id={id} />,
  Aerospace: (id) => <PlanetaryMotif id={id} />,
};

export const projectCode = (project: Project) =>
  `${categoryCode[project.category]}-${String(projects.indexOf(project) + 1).padStart(2, "0")}`;

export function ProjectVisual({
  project,
  context = "card",
}: {
  project: Project;
  context?: "card" | "feature" | "detail";
}) {
  const id = `pv-${context}-${project.slug}`;
  const render = bySlug[project.slug] ?? byCategory[project.category];
  return (
    <VisualFrame
      code={context === "detail" ? project.category : undefined}
      note={context === "detail" ? "Conceptual illustration" : undefined}
      className={`vframe-project is-${context}`}
    >
      {render(id)}
    </VisualFrame>
  );
}
