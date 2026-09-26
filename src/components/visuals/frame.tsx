import type { ReactNode } from "react";

// Technical frame shared by every abstract visual: corner marks, a code label,
// a figure label and a small "conceptual" note. Visuals are decorative, so the
// whole frame is hidden from assistive technology.
export function VisualFrame({
  code,
  label,
  note = "Conceptual illustration",
  className = "",
  children,
}: {
  code?: string;
  label?: string;
  note?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`vframe ${className}`} aria-hidden="true">
      <span className="vframe-corner c-tl" />
      <span className="vframe-corner c-tr" />
      <span className="vframe-corner c-bl" />
      <span className="vframe-corner c-br" />
      <span className="vframe-grid" />
      {code && <span className="vframe-label l-tl">{code}</span>}
      {label && <span className="vframe-label l-tr">{label}</span>}
      {note && <span className="vframe-label l-bl">{note}</span>}
      <div className="vframe-body">{children}</div>
    </div>
  );
}

// Deterministic pseudo-random numbers so server and client render identical SVG.
export function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Closed ellipse as a path (for <mpath> motion), centred on the origin.
export const ellipsePath = (rx: number, ry: number) =>
  `M ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0 Z`;

// A particle that travels a path defined elsewhere in the same SVG.
export function Particle({
  path,
  dur,
  begin = 0,
  r = 2.6,
  tone = "light",
  halo = true,
}: {
  path: string;
  dur: number;
  begin?: number;
  r?: number;
  tone?: "light" | "accent" | "blue";
  halo?: boolean;
}) {
  return (
    <g className={`v-particle tone-${tone}`}>
      {halo && <circle r={r * 3.2} className="v-particle-halo" />}
      <circle r={r} className="v-particle-core" />
      <animateMotion
        dur={`${dur}s`}
        begin={`${-begin}s`}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath href={`#${path}`} />
      </animateMotion>
    </g>
  );
}
