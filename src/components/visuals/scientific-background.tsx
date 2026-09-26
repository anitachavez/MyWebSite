import { seeded } from "./frame";

// Fixed, page-wide atmosphere: sparse stars, faint coordinate marks, grid
// fragments and two very large orbital arcs. Layers drift slightly with the
// pointer (--px/--py) on desktop; everything is still under reduced motion.
const rand = seeded(1729);
const stars = Array.from({ length: 110 }, (_, i) => ({
  x: Math.round(rand() * 1440),
  y: Math.round(rand() * 900),
  r: rand() < 0.12 ? 1.3 : rand() < 0.5 ? 0.8 : 0.55,
  o: 0.25 + rand() * 0.5,
  twinkle: i % 7 === 0,
  delay: Math.round(rand() * 80) / 10,
}));
const crosses = [
  [118, 164],
  [1302, 118],
  [1196, 742],
  [236, 668],
  [742, 842],
];

export function ScientificBackground() {
  return (
    <div className="sci-bg" aria-hidden="true">
      <div className="sci-glow glow-a" />
      <div className="sci-glow glow-b" />
      <svg
        className="sci-layer layer-far"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            opacity={s.o}
            className={s.twinkle ? "sci-star twinkle" : "sci-star"}
            style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
          />
        ))}
      </svg>
      <svg
        className="sci-layer layer-mid"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        data-anim
      >
        <defs>
          <pattern id="sci-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" className="sci-grid-line" />
          </pattern>
          <radialGradient id="sci-fade">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="sci-grid-mask-a">
            <circle cx="1240" cy="220" r="170" fill="url(#sci-fade)" />
          </mask>
          <mask id="sci-grid-mask-b">
            <circle cx="160" cy="760" r="150" fill="url(#sci-fade)" />
          </mask>
          <path
            id="sci-trajectory"
            d="M -80 610 C 320 470, 760 520, 1520 250"
          />
        </defs>
        <rect width="1440" height="900" fill="url(#sci-grid)" mask="url(#sci-grid-mask-a)" />
        <rect width="1440" height="900" fill="url(#sci-grid)" mask="url(#sci-grid-mask-b)" />
        <g className="sci-arcs">
          <ellipse cx="1180" cy="170" rx="720" ry="230" transform="rotate(-18 1180 170)" />
          <ellipse cx="160" cy="880" rx="640" ry="190" transform="rotate(12 160 880)" />
        </g>
        <use href="#sci-trajectory" className="sci-trajectory" />
        <circle r="1.8" className="sci-comet">
          <animateMotion dur="90s" repeatCount="indefinite" begin="-30s">
            <mpath href="#sci-trajectory" />
          </animateMotion>
        </circle>
      </svg>
      <svg
        className="sci-layer layer-near"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {crosses.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x - 5} ${y}H${x + 5}M${x} ${y - 5}V${y + 5}`}
            className="sci-cross"
          />
        ))}
      </svg>
    </div>
  );
}
