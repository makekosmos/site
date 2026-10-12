import type { CSSProperties, ReactNode } from "react";

// Isometric projection: x runs to the lower right, y to the lower left, z straight up.
const C = Math.cos(Math.PI / 6);

export type P3 = [number, number, number];

export function pt([x, y, z]: P3): [number, number] {
  return [(x - y) * C, (x + y) / 2 - z];
}

const poly = (points: P3[]) => points.map((p) => pt(p).map((n) => n.toFixed(1)).join(",")).join(" ");

export type Tone = "engine" | "plate" | "tile" | "amber" | "phone";

export function Box({
  at: [x, y, z],
  size: [w, d, h],
  tone,
  className,
  style,
  children,
}: {
  at: P3;
  size: P3;
  tone: Tone;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <g className={`iso t-${tone}${className ? ` ${className}` : ""}`} style={style}>
      <polygon
        className="f-left"
        points={poly([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
      />
      <polygon
        className="f-right"
        points={poly([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h],
        ])}
      />
      <polygon
        className="f-top"
        points={poly([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
      />
      {children && <Flat at={[x, y, z + h]}>{children}</Flat>}
    </g>
  );
}

// Lays flat 2D content onto the horizontal plane at `at`, one unit per unit.
export function Flat({ at, children, className }: { at: P3; children: ReactNode; className?: string }) {
  const [X, Y] = pt(at);
  return (
    <g className={className} transform={`matrix(${C} 0.5 ${-C} 0.5 ${X.toFixed(1)} ${Y.toFixed(1)})`}>
      {children}
    </g>
  );
}

export function Fig({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="fig-art" viewBox="-120 -70 240 190" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

// Screen-space offset between two points, for packets that travel across the plane.
export function travel(from: P3, to: P3): CSSProperties {
  const [ax, ay] = pt(from);
  const [bx, by] = pt(to);
  return { "--dx": `${(bx - ax).toFixed(1)}px`, "--dy": `${(by - ay).toFixed(1)}px` } as CSSProperties;
}
