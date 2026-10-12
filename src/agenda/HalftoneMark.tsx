import { useEffect, useRef } from "react";

const CELL = 11;
const STOPS = [
  [160, 224, 171],
  [255, 172, 46],
  [165, 45, 37],
] as const;
const BINS = 32;

const PALETTE = Array.from({ length: BINS }, (_, i) => {
  const t = (i / (BINS - 1)) * (STOPS.length - 1);
  const k = Math.min(Math.floor(t), STOPS.length - 2);
  const f = t - k;
  const [r, g, b] = STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f));
  return `rgb(${r} ${g} ${b})`;
});

// The Agenda check, carved out of the liquid. Drawn once per size at grid
// resolution; each pixel's alpha says how much of a dot to remove.
function drawCheck(cols: number, rows: number) {
  const mask = document.createElement("canvas");
  mask.width = cols;
  mask.height = rows;
  const ctx = mask.getContext("2d", { willReadFrequently: true })!;
  const size = Math.min(rows * 0.9, cols * 0.5);
  const x = cols * 0.68 - size / 2;
  const y = rows * 0.5 - size / 2;
  ctx.lineWidth = size * 0.13;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x + size * 0.12, y + size * 0.54);
  ctx.lineTo(x + size * 0.38, y + size * 0.8);
  ctx.lineTo(x + size * 0.9, y + size * 0.2);
  ctx.stroke();
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const cut = new Float32Array(cols * rows);
  for (let i = 0; i < cut.length; i++) cut[i] = data[i * 4 + 3] / 255;
  return cut;
}

export function HalftoneMark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let cols = 0;
    let rows = 0;
    let cut = new Float32Array();

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      cut = drawCheck(cols, rows);
    };

    const paint = (time: number) => {
      const t = still ? 8 : time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const blobs = [
        [0.3 + 0.18 * Math.sin(t * 0.21), 0.5 + 0.3 * Math.cos(t * 0.17), 0.34],
        [0.62 + 0.2 * Math.cos(t * 0.13), 0.45 + 0.28 * Math.sin(t * 0.23), 0.4],
        [0.85 + 0.1 * Math.sin(t * 0.19 + 2), 0.6 + 0.3 * Math.sin(t * 0.11), 0.28],
        [0.1 + 0.08 * Math.cos(t * 0.27), 0.3 + 0.25 * Math.cos(t * 0.15 + 1), 0.22],
      ];
      const paths = Array.from({ length: BINS }, () => new Path2D());
      const aspect = rows / cols;
      for (let r = 0; r < rows; r++) {
        const shift = r % 2 ? CELL / 2 : 0;
        const v = r / rows;
        const edge = Math.min(1, Math.sin(Math.PI * v) * 1.6);
        for (let c = 0; c < cols; c++) {
          const u = c / cols;
          let field = 0;
          for (const [bx, by, br] of blobs) {
            const dx = u - bx;
            const dy = (v - by) * aspect;
            field += (br * br * 0.18) / (dx * dx + dy * dy + 0.004);
          }
          const ink = Math.min(1, Math.max(0, field - 0.35)) * edge * (1 - cut[r * cols + c]);
          const radius = (CELL / 2) * 1.05 * Math.sqrt(ink);
          if (radius < 0.4) continue;
          const tone = 0.7 * u + 0.3 * Math.min(1, field * 0.45) - 0.08 + 0.08 * Math.sin(t * 0.4 + v * 3);
          const bin = Math.min(BINS - 1, Math.max(0, Math.round(tone * (BINS - 1))));
          const cx = c * CELL + shift;
          const cy = r * CELL;
          paths[bin].moveTo(cx + radius, cy);
          paths[bin].arc(cx, cy, radius, 0, Math.PI * 2);
        }
      }
      paths.forEach((path, i) => {
        ctx.fillStyle = PALETTE[i];
        ctx.fill(path);
      });
      if (!still) frame = requestAnimationFrame(paint);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (still) paint(0);
    });
    observer.observe(canvas);
    resize();
    frame = requestAnimationFrame(paint);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="halftone" aria-hidden="true" />;
}
