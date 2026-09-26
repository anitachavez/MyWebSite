"use client";
// Category filter. Cards are rendered on the server and passed in as nodes,
// so this component only decides which ones are shown.
import { useState, type ReactNode } from "react";

export function ProjectFilter({
  categories,
  items,
}: {
  categories: readonly string[];
  items: { key: string; category: string; node: ReactNode }[];
}) {
  const [filter, setFilter] = useState("All");
  const shown = items.filter((i) => filter === "All" || i.category === filter);
  const count = (c: string) =>
    c === "All" ? items.length : items.filter((i) => i.category === c).length;
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by field">
        {["All", ...categories].map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
            disabled={count(label) === 0}
          >
            <span className="filter-node" aria-hidden="true" />
            {label}
            <span className="filter-count" aria-hidden="true">
              {String(count(label)).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
      </p>
      <div className="project-index">
        {shown.map((i) => (
          <div key={i.key} className="project-index-item">
            {i.node}
          </div>
        ))}
      </div>
    </>
  );
}
