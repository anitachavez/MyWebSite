import Image from "next/image";
import type { Photo } from "@/data/portfolio";
import { ellipsePath, Particle } from "./frame";

// Scientific orbital plot used in the hero and on /about.
// Layer order (back → front): reference plot, orbits, [portrait slot], particles
// and annotations. In Phase 2 a portrait passed as `portrait` sits between the
// orbit layers under a radial gradient mask, so orbits pass behind and particles
// in front of it; no rectangular card.
type Orbit = {
  id: string;
  rx: number;
  ry: number;
  rot: number;
  dur: number;
  particles: { begin: number; tone: "light" | "accent" | "blue"; r?: number }[];
  trail?: boolean;
  dashed?: boolean;
};

const orbits: Orbit[] = [
  {
    id: "o1",
    rx: 232,
    ry: 76,
    rot: -28,
    dur: 46,
    trail: true,
    particles: [{ begin: 4, tone: "accent", r: 3.4 }],
  },
  {
    id: "o2",
    rx: 214,
    ry: 98,
    rot: 36,
    dur: 62,
    particles: [
      { begin: 10, tone: "light" },
      { begin: 41, tone: "blue", r: 2 },
    ],
  },
  {
    id: "o3",
    rx: 252,
    ry: 58,
    rot: 82,
    dur: 74,
    particles: [{ begin: 30, tone: "light", r: 2.2 }],
  },
  {
    id: "o4",
    rx: 148,
    ry: 54,
    rot: -64,
    dur: 34,
    trail: true,
    particles: [{ begin: 12, tone: "accent", r: 2.6 }],
  },
  { id: "o5", rx: 118, ry: 118, rot: 0, dur: 90, dashed: true, particles: [] },
];

const ticks = Array.from({ length: 13 }, (_, i) => (i - 6) * 40);

export function OrbitalSystem({
  portrait,
  id = "orb",
  variant = "hero",
  caption,
}: {
  portrait?: Photo;
  id?: string;
  variant?: "hero" | "compact";
  caption?: string;
}) {
  const pid = (o: Orbit) => `${id}-${o.id}`;
  return (
    <div className={`orbital-stage orbital-${variant}`}>
      <svg
        className="orbital-layer layer-back"
        viewBox="-300 -300 600 600"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-core`}>
            <stop offset="0" stopColor="#ffe6f2" />
            <stop offset="0.45" stopColor="#efa1c5" stopOpacity="0.85" />
            <stop offset="1" stopColor="#efa1c5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="plot">
          {[80, 160, 240].map((r) => (
            <circle key={r} r={r} className="plot-ring" />
          ))}
          <path d="M-280 0H280M0 -280V280" className="plot-axis" />
          <path d="M-200 150L200 -150" className="plot-axis is-z" />
          {ticks.map((t) => (
            <path
              key={t}
              d={`M${t} -3V3M-3 ${t}H3`}
              className="plot-tick"
            />
          ))}
        </g>
        <g className="orbit-precess">
          {orbits.map((o) => (
            <g key={o.id} transform={`rotate(${o.rot})`}>
              <path
                d={ellipsePath(o.rx, o.ry)}
                className={`orbit-path ${o.dashed ? "is-dashed" : ""}`}
              />
              {o.trail && (
                <path
                  d={ellipsePath(o.rx, o.ry)}
                  pathLength={100}
                  className="orbit-trail"
                  style={{ animationDuration: `${o.dur}s` }}
                />
              )}
            </g>
          ))}
        </g>
        <circle r="46" fill={`url(#${id}-core)`} className="orbit-core-glow" />
      </svg>

      <div className="orbital-portrait">
        {portrait && (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(max-width: 760px) 80vw, 480px"
            preload={variant === "hero"}
          />
        )}
      </div>

      <svg
        className="orbital-layer layer-front"
        viewBox="-300 -300 600 600"
        aria-hidden="true"
        data-anim
      >
        <defs>
          {orbits.map((o) => (
            <path key={o.id} id={pid(o)} d={ellipsePath(o.rx, o.ry)} />
          ))}
        </defs>
        <g className="orbit-precess">
          {orbits.map((o) => (
            <g key={o.id} transform={`rotate(${o.rot})`}>
              {o.particles.map((p, i) => (
                <Particle
                  key={i}
                  path={pid(o)}
                  dur={o.dur}
                  begin={p.begin}
                  tone={p.tone}
                  r={p.r}
                />
              ))}
            </g>
          ))}
        </g>
        <g className="orbit-nucleus">
          <circle r="16" className="nucleus-ring" />
          <circle r="5.5" className="nucleus-core" />
          <path d="M-26 0H-19M19 0H26M0 -26V-19M0 19V26" className="plot-tick" />
        </g>
        <g className="plot-labels">
          <text x="266" y="-8">x</text>
          <text x="8" y="-270">y</text>
          <text x="186" y="-150">z</text>
          <text x="10" y="18">0</text>
          <path d="M62 0A62 62 0 0 0 54.7 -29.1" className="plot-angle" />
          <text x="68" y="-12" className="is-accent">θ = 28°</text>
        </g>
      </svg>
      {caption && <p className="orbital-caption">{caption}</p>}
    </div>
  );
}
