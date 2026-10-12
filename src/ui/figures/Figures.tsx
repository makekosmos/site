import type { CSSProperties } from "react";
import { Box, Fig, Flat, pt, travel, type P3 } from "./iso";

const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

const APPS = ["agenda", "memoria", "dictation"];

export function EngineFigure({ label }: { label: string }) {
  return (
    <Fig label={label}>
      <g transform="translate(0 -12)">
        <Box at={[0, 0, 0]} size={[100, 100, 22]} tone="engine" />
        {APPS.map((app, i) => (
          <Flat key={app} at={[8 + i * 29, 37, 22]}>
            <rect className="socket" width={26} height={26} rx={3} style={delay(i * 0.9)} />
          </Flat>
        ))}
        {APPS.map((app, i) => (
          <Box key={app} at={[8 + i * 29, 37, 22]} size={[26, 26, 7]} tone="tile" className="dock" style={delay(i * 0.9)}>
            <image href={`/apps/${app}.png`} x={4} y={4} width={18} height={18} />
          </Box>
        ))}
      </g>
    </Fig>
  );
}

// One glyph per privileged operation, drawn in a 24-unit square on each tile.
const GLYPHS = [
  <>
    <circle cx={12} cy={12} r={7} />
    <circle cx={12} cy={12} r={2.5} />
  </>,
  <>
    <rect x={9} y={4} width={6} height={10} rx={3} />
    <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3" />
  </>,
  <>
    <rect x={5} y={6} width={14} height={12} rx={2.5} />
    <path d="M9 12h6" />
  </>,
  <>
    <rect x={6} y={5} width={12} height={15} rx={2} />
    <path d="M9.5 5V3.5h5V5M9 10h6M9 14h4" />
  </>,
];

const SYSTEM: P3[] = [
  [14, 14, 6],
  [14, 102, 6],
  [102, 14, 6],
  [102, 102, 6],
];

export function SystemFigure({ label }: { label: string }) {
  const center: P3 = [67, 67, 6];
  return (
    <Fig label={label}>
      <g transform="translate(0 -32) scale(0.85)">
        <Box at={[0, 0, 0]} size={[140, 140, 6]} tone="plate" />
        {SYSTEM.map(([x, y, z], i) => (
          <Box
            key={i}
            at={center}
            size={[6, 6, 6]}
            tone="engine"
            className="packet"
            style={{ ...travel(center, [x + 9, y + 9, z]), ...delay(i * 1.2) }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <SystemTile key={i} i={i} />
        ))}
        <Box at={[50, 50, 6]} size={[40, 40, 28]} tone="engine">
          <circle className="ring" cx={20} cy={20} r={9} />
        </Box>
        <SystemTile i={3} />
      </g>
    </Fig>
  );
}

function SystemTile({ i }: { i: number }) {
  return (
    <Box at={SYSTEM[i]} size={[24, 24, 6]} tone="tile">
      <rect className="lit" width={24} height={24} rx={2} style={delay(i * 1.2)} />
      <g className="glyph">{GLYPHS[i]}</g>
    </Box>
  );
}

const STACK = [0, 7, 14, 21];

export function ArkFigure({ label }: { label: string }) {
  const [ax, ay] = pt([25, 55, 0]);
  const [bx, by] = pt([97, 33, 0]);
  return (
    <Fig label={label}>
      <g transform="translate(-14 2) scale(1.2)">
        <line className="wire" x1={ax} y1={ay} x2={bx} y2={by} />
        {STACK.map((z) => (
          <Box key={z} at={[0, 30, z]} size={[50, 50, 5]} tone="record" />
        ))}
        <Box at={[0, 30, 28]} size={[50, 50, 5]} tone="record" className="drop" />
        <Box at={[82, 6, 0]} size={[30, 54, 5]} tone="phone" />
        {[5, 9].map((z) => (
          <Box key={z} at={[87, 23, z]} size={[20, 20, 3]} tone="record" />
        ))}
        <Box at={[87, 23, 13]} size={[20, 20, 3]} tone="record" className="drop drop-late" />
        <Box at={[22, 52, 34]} size={[6, 6, 6]} tone="record" className="hop" style={travel([22, 52, 34], [94, 30, 17])} />
      </g>
    </Fig>
  );
}
