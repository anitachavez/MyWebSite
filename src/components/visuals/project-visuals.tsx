// Abstract, decorative project visuals. They evoke each project's subject
// (workspace, planning graph, swerve modules, particle transport); they are
// not technically exact engineering diagrams.
import { Particle } from "./frame";

type VisualProps = { id: string };

/* ---------- Robotic hot cell: four arm positions, reach arcs, tool rack ---------- */
const arms = [
  { x: 120, y: 94, a: 30, b: -52, d: 13, n: "A1", lx: 70, ly: 62 },
  { x: 280, y: 94, a: 150, b: 52, d: 15, n: "A2", lx: 316, ly: 62 },
  { x: 120, y: 178, a: -28, b: 50, d: 14, n: "A3", lx: 70, ly: 214 },
  { x: 280, y: 178, a: -152, b: -50, d: 16, n: "A4", lx: 316, ly: 214 },
];
const rack = [152, 168, 184, 200, 216, 232, 248];

export function HotCellVisual({ id }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <clipPath id={`${id}-cell`}>
          <rect x="40" y="28" width="320" height="208" />
        </clipPath>
        <path id={`${id}-route`} d="M216 52 C 244 78, 236 112, 204 132" />
      </defs>
      <rect x="40" y="28" width="320" height="208" className="v-line" />
      <rect x="34" y="22" width="332" height="220" className="v-faint is-dashed" />
      <g clipPath={`url(#${id}-cell)`}>
        {arms.map((arm) => (
          <circle key={arm.n} cx={arm.x} cy={arm.y} r="80" className="v-reach" />
        ))}
      </g>
      {rack.map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="40" width="8" height="8" className={i === 4 ? "v-accent-fill" : "v-node-box"} />
        </g>
      ))}
      <path d="M146 54H254" className="v-faint" />
      <use href={`#${id}-route`} className="v-trace" />
      <g transform="translate(204 134)" className="v-specimen">
        <circle r="14" className="v-pulse" />
        <path d="M0 -6L6 0L0 6L-6 0Z" className="v-accent-fill" />
      </g>
      {arms.map((arm) => (
        <g key={arm.n} transform={`translate(${arm.x} ${arm.y}) rotate(${arm.a})`}>
          <g className="v-sway" style={{ animationDuration: `${arm.d}s` }}>
            <line x2="44" className="v-link" />
            <g transform={`translate(44 0) rotate(${arm.b})`}>
              <g className="v-sway is-reverse" style={{ animationDuration: `${arm.d - 4}s` }}>
                <line x2="30" className="v-link is-thin" />
                <path d="M30 0l6 -4M30 0l6 4" className="v-accent-line" />
              </g>
              <circle r="2.6" className="v-node" />
            </g>
          </g>
          <circle r="8" className="v-base" />
          <circle r="2.4" className="v-node" />
        </g>
      ))}
      <Particle path={`${id}-route`} dur={7} tone="accent" r={2} />
      <g className="v-labels">
        {arms.map((arm) => (
          <text key={arm.n} x={arm.lx} y={arm.ly}>
            {arm.n}
          </text>
        ))}
        <text x="258" y="47">TOOLS · 7</text>
        <text x="300" y="254" className="is-accent">
          UR10 × 4
        </text>
      </g>
    </svg>
  );
}

/* ---------- Path planning: start, goal, candidate paths, selected trajectory ---------- */
const obstacles = [
  { x: 120, y: 80, w: 70, h: 70 },
  { x: 226, y: 130, w: 60, h: 90 },
  { x: 300, y: 150, w: 40, h: 50 },
];
const inside = (x: number, y: number) =>
  obstacles.some((o) => x > o.x - 6 && x < o.x + o.w + 6 && y > o.y - 6 && y < o.y + o.h + 6);
const lattice = Array.from({ length: 11 * 6 }, (_, i) => ({
  x: 30 + (i % 11) * 34,
  y: 30 + Math.floor(i / 11) * 40,
})).filter((p) => !inside(p.x, p.y));
const candidates = [
  "M30 190 L64 110 L98 60 L166 50 L234 60 L302 50 L370 70",
  "M30 190 L98 230 L200 236 L300 232 L350 210 L360 130 L370 70",
  "M30 190 L64 160 L110 160 L206 160 L206 100 L240 110 L300 110 L370 70",
  "M30 190 L50 120 L90 70 L150 40 L260 30 L340 40 L370 70",
];
const selectedPts = [
  [30, 190], [98, 190], [132, 170], [200, 170], [214, 110], [268, 90], [336, 76], [370, 70],
];
const selected = selectedPts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

export function PathPlanningVisual({ id }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V6" className="v-hatch" />
        </pattern>
        <path id={`${id}-sel`} d={selected} />
      </defs>
      {lattice.map((p) => (
        <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="1.3" className="v-dot" />
      ))}
      {obstacles.map((o) => (
        <rect key={o.x} x={o.x} y={o.y} width={o.w} height={o.h} fill={`url(#${id}-hatch)`} className="v-obstacle" />
      ))}
      {candidates.map((d) => (
        <path key={d} d={d} className="v-candidate" />
      ))}
      <path d={selected} className="v-selected-glow" />
      <path d={selected} className="v-selected v-draw" pathLength={1} />
      {selectedPts.slice(1, -1).map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" className="v-waypoint" />
      ))}
      <g transform="translate(30 190)">
        <circle r="9" className="v-base" />
        <circle r="3" className="v-node" />
      </g>
      <g transform="translate(370 70)">
        <circle r="11" className="v-pulse" />
        <circle r="5" className="v-accent-fill" />
      </g>
      <Particle path={`${id}-sel`} dur={8} tone="accent" r={2.4} />
      <g className="v-labels">
        <text x="14" y="214">START</text>
        <text x="340" y="96">GOAL</text>
        <text x="290" y="254" className="is-accent">
          250 TRIALS
        </text>
      </g>
    </svg>
  );
}

/* ---------- Swerve drive: four steerable modules, vectors, rotation ---------- */
const modules = [
  { x: 146, y: 66, n: "FL" },
  { x: 254, y: 66, n: "FR" },
  { x: 146, y: 194, n: "RL" },
  { x: 254, y: 194, n: "RR" },
];

export function SwerveVisual({ id }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L8 4L0 8Z" className="v-accent-fill" />
        </marker>
      </defs>
      <rect x="116" y="36" width="168" height="188" rx="6" className="v-line" />
      <rect x="126" y="46" width="148" height="168" rx="3" className="v-faint is-dashed" />
      {modules.map((m) => (
        <path key={m.n} d={`M200 130L${m.x} ${m.y}`} className="v-faint is-dashed" />
      ))}
      <g transform="translate(200 130)">
        <g className="v-spin">
          <path d="M34 0A34 34 0 1 1 0 -34" className="v-accent-line" markerEnd={`url(#${id}-arrow)`} />
        </g>
        <path d="M-6 0H6M0 -6V6" className="v-line" />
      </g>
      {modules.map((m) => (
        <g key={m.n} transform={`translate(${m.x} ${m.y})`}>
          <circle r="20" className="v-base" />
          <g className="v-steer">
            <rect x="-5" y="-12" width="10" height="24" rx="2" className="v-wheel" />
            <line y1="-14" y2="-40" className="v-accent-line" markerEnd={`url(#${id}-arrow)`} />
          </g>
        </g>
      ))}
      <path d="M116 22H284M116 18V26M284 18V26" className="v-faint" />
      <path d="M306 36V224M302 36H310M302 224H310" className="v-faint" />
      <g className="v-labels">
        {modules.map((m) => (
          <text key={m.n} x={m.x < 200 ? m.x - 58 : m.x + 30} y={m.y + 4}>
            {m.n}
          </text>
        ))}
        <text x="174" y="15">TRACK</text>
        <text x="316" y="134">WHEELBASE</text>
        <text x="220" y="100" className="is-accent">
          ω
        </text>
      </g>
    </svg>
  );
}

/* ---------- Particle transport: membrane, field lines, acoustic wave ---------- */
const wave = (y: number, amp: number, from = 0, to = 800) => {
  let d = `M${from} ${y}`;
  for (let x = from; x < to; x += 40) d += ` q10 ${-amp} 20 0 t20 0`;
  return d;
};
const crossing = [
  { d: "M60 40 C 70 90, 50 120, 64 160 S 80 210, 70 240", dur: 11, begin: 0 },
  { d: "M140 60 C 150 110, 128 130, 136 162 S 150 205, 140 236", dur: 13, begin: 5 },
  { d: "M222 34 C 230 100, 214 128, 224 164 S 236 214, 228 242", dur: 12, begin: 8 },
  { d: "M300 56 C 296 110, 312 130, 304 162 S 294 212, 306 238", dur: 14, begin: 3 },
];
const drifting = [
  { d: "M20 80 C 90 70, 150 96, 230 84 S 350 70, 400 90", dur: 18, begin: 2 },
  { d: "M0 112 C 80 104, 170 122, 250 110 S 360 104, 400 118", dur: 22, begin: 9 },
  { d: "M10 64 C 110 58, 200 76, 290 62 S 380 58, 400 66", dur: 20, begin: 14 },
];

export function TransportVisual({ id }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect width="400" height="260" />
        </clipPath>
        {[...crossing, ...drifting].map((p, i) => (
          <path key={i} id={`${id}-p${i}`} d={p.d} />
        ))}
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {[40, 130, 250, 350].map((x, i) => (
          <path
            key={x}
            d={`M${x} 0 C ${x + (i % 2 ? -34 : 34)} 90, ${x + (i % 2 ? 30 : -30)} 170, ${x} 260`}
            className="v-field"
          />
        ))}
        <g className="v-wave-track">
          <path d={wave(22, 7)} className="v-wave" />
        </g>
        <rect x="0" y="150" width="400" height="110" className="v-region" />
        <path d={wave(150, 5)} className="v-membrane" />
        <path d={wave(160, 5)} className="v-membrane is-inner" />
      </g>
      {drifting.map((p, i) => (
        <Particle key={`d${i}`} path={`${id}-p${i + crossing.length}`} dur={p.dur} begin={p.begin} tone="light" r={1.8} halo={false} />
      ))}
      {crossing.map((p, i) => (
        <Particle key={`c${i}`} path={`${id}-p${i}`} dur={p.dur} begin={p.begin} tone="accent" r={2.2} />
      ))}
      <g className="v-labels">
        <text x="14" y="46">∿ VIBRATION</text>
        <text x="300" y="46">FLOW →</text>
        <text x="330" y="178" className="is-accent">
          MEMBRANE
        </text>
        <text x="354" y="140">B</text>
      </g>
    </svg>
  );
}
