// Conceptual flow of an integrated space nuclear power system:
// reactor → closed Brayton cycle (turbine / compressor on a shared shaft) → radiator.
// Decorative only: no dimensions, temperatures or other engineering values.
import { Particle } from "./frame";

const rods = [
  [0, 0],
  [-12, -7],
  [12, -7],
  [-12, 7],
  [12, 7],
  [0, -14],
  [0, 14],
];
const fins = [110, 124, 138, 152, 166, 180, 194, 208];

export function SystemFlowVisual({
  id,
  labels = true,
}: {
  id: string;
  labels?: boolean;
}) {
  const loop = `${id}-loop`;
  return (
    <svg viewBox="0 0 700 340" className="v-svg v-flow" data-anim>
      <defs>
        <path id={loop} d="M110 118 V70 H540 V270 H110 Z" />
        <linearGradient id={`${id}-hot`} x1="0" x2="1">
          <stop offset="0" stopColor="#efa1c5" />
          <stop offset="1" stopColor="#f3c6db" />
        </linearGradient>
      </defs>

      {/* piping: hot leg (reactor → turbine → radiator), cold leg (radiator → compressor → reactor) */}
      <path d="M110 118 V70 H540 V115" className="v-pipe is-hot" stroke={`url(#${id}-hot)`} />
      <path d="M540 225 V270 H110 V222" className="v-pipe is-cold" />
      <path d="M110 118 V70 H540 V115" className="v-flowline is-hot" />
      <path d="M540 225 V270 H110 V222" className="v-flowline is-cold" />

      {/* reactor */}
      <g transform="translate(110 170)" className="v-reactor">
        <circle r="70" className="v-faint is-dashed" />
        <path d="M0 -52L45 -26V26L0 52L-45 26V-26Z" className="v-line" />
        <circle r="30" className="v-core-glow" />
        <circle r="30" className="v-line" />
        {rods.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.6" className="v-rod" />
        ))}
      </g>

      {/* turbine (top) and compressor (bottom) on one shaft, alternator between */}
      <path d="M330 60 L372 48 V92 L330 80 Z" className="v-machine" />
      <path d="M372 250 V292 L330 280 V260 Z" className="v-machine" />
      <path d="M351 92 V250" className="v-shaft" />
      <rect x="336" y="150" width="30" height="40" rx="3" className="v-machine is-alt" />
      <g transform="translate(351 170)">
        <g className="v-spin is-slow">
          <path d="M-9 0H9M0 -9V9" className="v-accent-line" />
        </g>
      </g>

      {/* radiator panels with fins */}
      <path d="M532 118 L466 100 V240 L532 222 Z" className="v-panel" />
      <path d="M548 118 L614 100 V240 L548 222 Z" className="v-panel" />
      {fins.map((y) => (
        <g key={y} className="v-fin">
          <path d={`M532 ${y + 10} L466 ${y - 4 + (y - 110) * 0.05}`} />
          <path d={`M548 ${y + 10} L614 ${y - 4 + (y - 110) * 0.05}`} />
        </g>
      ))}
      <path d="M540 115 V225" className="v-pipe is-manifold" />

      {/* heat rejection */}
      {[130, 170, 210].map((y, i) => (
        <path
          key={y}
          d={`M628 ${y} q8 -6 16 0 t16 0 t16 0`}
          className="v-heat"
          style={{ animationDelay: `${i * 1.2}s` }}
        />
      ))}

      {[0, 6, 12, 18].map((b, i) => (
        <Particle key={b} path={loop} dur={24} begin={b} tone={i % 2 ? "blue" : "accent"} r={3} />
      ))}

      {labels && (
        <g className="v-labels is-large">
          <text x="110" y="324" textAnchor="middle">
            01 · REACTOR
          </text>
          <text x="351" y="324" textAnchor="middle">
            02 · CLOSED BRAYTON CYCLE
          </text>
          <text x="540" y="324" textAnchor="middle">
            03 · RADIATOR
          </text>
          <text x="384" y="64">T</text>
          <text x="310" y="274">C</text>
          <text x="376" y="174">ALT</text>
          <text x="196" y="60" className="is-accent">
            Q in
          </text>
          <text x="632" y="116" className="is-accent">
            Q out
          </text>
          <text x="436" y="60">W</text>
        </g>
      )}
    </svg>
  );
}
