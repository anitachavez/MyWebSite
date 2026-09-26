// Smaller decorative motifs for competitions, leadership, media and contact.
import { ellipsePath, Particle } from "./frame";

const r2 = (n: number) => Math.round(n * 100) / 100;

function gearPath(teeth: number, outer: number, inner: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    [
      [a, inner],
      [a + step * 0.12, outer],
      [a + step * 0.46, outer],
      [a + step * 0.58, inner],
    ].forEach(([ang, rad]) =>
      pts.push(`${r2(Math.cos(ang) * rad)} ${r2(Math.sin(ang) * rad)}`),
    );
  }
  return `M${pts.join(" L")} Z`;
}
const bigGear = gearPath(18, 62, 54);
const smallGear = gearPath(10, 34, 27);

/* FIRST Robotics: meshing gears, linkage, dimension marks */
export function MechanicalMotif({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <path id={`${id}-arc`} d="M232 196 A 120 120 0 0 1 352 76" />
      </defs>
      <g transform="translate(132 138)">
        <g className="v-spin is-gear">
          <path d={bigGear} className="v-line" />
          <circle r="36" className="v-faint" />
          <path d="M-36 0H36M0 -36V36" className="v-faint" />
        </g>
        <circle r="6" className="v-node" />
      </g>
      <g transform="translate(222 88)">
        <g className="v-spin is-gear is-reverse">
          <path d={smallGear} className="v-line" />
          <circle r="14" className="v-faint" />
        </g>
        <circle r="4" className="v-accent-fill" />
      </g>
      <path d="M222 88 L300 150 L352 76" className="v-link" />
      <circle cx="300" cy="150" r="4" className="v-node" />
      <use href={`#${id}-arc`} className="v-trace" />
      <Particle path={`${id}-arc`} dur={9} tone="accent" r={2.4} />
      <path d="M70 226H194M70 222V230M194 222V230" className="v-faint" />
      <g className="v-labels">
        <text x="112" y="246">Ø</text>
        <text x="306" y="170">J2</text>
        <text x="360" y="72">EE</text>
      </g>
    </svg>
  );
}

/* NASA Space Apps: planet, orbit and transfer trajectory */
export function PlanetaryMotif({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <path id={`${id}-orbit`} d={ellipsePath(96, 38)} />
        <path id={`${id}-transfer`} d="M226 150 C 270 60, 330 50, 366 64" />
      </defs>
      <g transform="translate(130 140)">
        <circle r="44" className="v-planet" />
        {[-26, -10, 8, 24].map((y) => (
          <ellipse key={y} cy={y} rx={r2(Math.sqrt(44 * 44 - y * y))} ry="4" className="v-faint" />
        ))}
        <g transform="rotate(-16)">
          <use href={`#${id}-orbit`} className="v-line" />
          <Particle path={`${id}-orbit`} dur={16} tone="light" r={2.4} />
        </g>
      </g>
      <use href={`#${id}-transfer`} className="v-trace" />
      <Particle path={`${id}-transfer`} dur={10} tone="accent" r={2.4} />
      <circle cx="366" cy="64" r="10" className="v-pulse" />
      <circle cx="366" cy="64" r="3.4" className="v-accent-fill" />
      <g className="v-labels">
        <text x="332" y="92">TARGET</text>
        <text x="96" y="222">ORBIT</text>
      </g>
    </svg>
  );
}

/* Siemens / SWE: system network with signals on its edges */
const netNodes = [
  [60, 130],
  [130, 70],
  [140, 190],
  [210, 120],
  [280, 60],
  [290, 190],
  [350, 124],
];
const netEdges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [1, 4],
  [2, 5],
];
const hot = [0, 1, 3, 5, 6];

export function NetworkMotif({ id }: { id: string }) {
  const hotPath = hot.map((n, i) => `${i ? "L" : "M"}${netNodes[n][0]} ${netNodes[n][1]}`).join(" ");
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <path id={`${id}-hot`} d={hotPath} />
        <path id={`${id}-alt`} d="M60 130 L140 190 L290 190 L350 124" />
      </defs>
      {netEdges.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M${netNodes[a][0]} ${netNodes[a][1]}L${netNodes[b][0]} ${netNodes[b][1]}`}
          className="v-faint"
        />
      ))}
      <path d={hotPath} className="v-selected v-draw" pathLength={1} />
      {netNodes.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={hot.includes(i) ? 10 : 8} className="v-base" />
          <circle r="2.8" className={hot.includes(i) ? "v-accent-fill" : "v-node"} />
        </g>
      ))}
      <Particle path={`${id}-hot`} dur={8} tone="accent" r={2.4} />
      <Particle path={`${id}-alt`} dur={11} begin={4} tone="blue" r={2} />
      <g className="v-labels">
        <text x="48" y="160">IN</text>
        <text x="340" y="154">OUT</text>
      </g>
    </svg>
  );
}

/* Media / SheTalks: transmitter, expanding signal rings, waveforms, receivers */
const wavePath = (y: number, amp: number, len = 40) => {
  let d = `M150 ${y}`;
  for (let x = 150; x < 820; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
  return d;
};

export function SignalMotif({ id, receivers = 0 }: { id: string; receivers?: number }) {
  const ry = Array.from({ length: receivers }, (_, i) => 60 + (i * 140) / Math.max(1, receivers - 1));
  return (
    <svg viewBox="0 0 400 260" className="v-svg v-signal">
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x="150" y="0" width="196" height="260" />
        </clipPath>
      </defs>
      <g transform="translate(90 130)">
        {[0, 1, 2].map((i) => (
          <circle key={i} r="70" className="v-ring" style={{ animationDelay: `${i * 2}s` }} />
        ))}
        <circle r="30" className="v-faint" />
        <circle r="12" className="v-base" />
        <circle r="4.5" className="v-accent-fill" />
        <path d="M0 12V70M-14 70H14" className="v-line" />
      </g>
      <g clipPath={`url(#${id}-clip)`}>
        <g className="v-wave-track">
          <path d={wavePath(104, 10)} className="v-wave is-accent" />
          <path d={wavePath(130, 18, 60)} className="v-wave" />
          <path d={wavePath(156, 6, 30)} className="v-wave is-faint" />
        </g>
      </g>
      {ry.map((y, i) => (
        <g key={i} transform={`translate(366 ${r2(y)})`} className="v-receiver">
          <circle r="5" className="v-base" />
          <circle r="1.8" className="v-accent-fill" />
        </g>
      ))}
      <g className="v-labels">
        <text x="62" y="232">SOURCE</text>
        {receivers > 0 && (
          <text x="318" y="232" className="is-accent">
            RX × {receivers}
          </text>
        )}
      </g>
    </svg>
  );
}

/* Contact: a relay in orbit linking two ground nodes */
export function CommsMotif({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 400 260" className="v-svg" data-anim>
      <defs>
        <path id={`${id}-orbit`} d="M20 150 C 110 30, 290 30, 380 150" />
      </defs>
      <path d="M0 214 Q 200 176 400 214" className="v-line" />
      <use href={`#${id}-orbit`} className="v-faint is-dashed" />
      <path d="M80 204 L200 66 L322 204" className="v-link-signal" />
      <g transform="translate(200 66)">
        <circle r="16" className="v-pulse" />
        <rect x="-5" y="-5" width="10" height="10" className="v-accent-fill" />
        <path d="M-18 0H-7M7 0H18" className="v-line" />
      </g>
      <Particle path={`${id}-orbit`} dur={22} tone="light" r={2} />
      {[80, 322].map((x) => (
        <g key={x} transform={`translate(${x} 204)`}>
          <circle r="9" className="v-base" />
          <circle r="3" className="v-node" />
        </g>
      ))}
      <g className="v-labels">
        <text x="56" y="236">YOU</text>
        <text x="300" y="236" className="is-accent">
          ANA SOFÍA
        </text>
      </g>
    </svg>
  );
}
