"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines, projects } from "@/data/portfolio";
import { Orbital } from "./orbital";
import { MediaImage } from "./assets";
export function ProjectGrid({ featured = false }: { featured?: boolean }) {
  const [filter, setFilter] = useState("All");
  const entries = (featured ? projects.slice(0, 2) : projects).filter(
    (p) => filter === "All" || p.category === filter,
  );
  return (
    <>
      {!featured && (
        <div className="filters" aria-label="Filter projects">
          {["All", ...disciplines].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
              {filter === label && (
                <span className="filter-dot" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {entries.length} {entries.length === 1 ? "entry" : "entries"} shown
      </p>
      <div className={`project-grid ${featured ? "project-featured" : ""}`}>
        {entries.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="project-card"
          >
            <div className="project-art">
              {project.cover ? (
                <MediaImage photo={project.cover} />
              ) : (
                <Orbital variant={projects.indexOf(project) % 4} />
              )}
              <span className="art-badge">
                {project.status === "placeholder"
                  ? "CASE STUDY TO COME"
                  : project.year}
              </span>
              <span className="card-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <div className="project-card-copy">
              <div className="project-meta">
                <span>
                  {String(projects.indexOf(project) + 1).padStart(2, "0")} /{" "}
                  {project.category}
                </span>
                <span>
                  {project.status === "placeholder"
                    ? "Content pending"
                    : project.year}
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
