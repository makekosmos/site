import { useEffect, useRef } from "react";

const CELL = 9;

// The source image the dots sample: a lit checkbox with a check, drawn once
// at grid resolution. Each pixel's alpha is one dot's ink.
function drawSource(cols: number, rows: number) {
  const source = document.createElement("canvas");
  source.width = cols;
  source.height = rows;
  const ctx = source.getContext("2d", { willReadFrequently: true })!;
  const size = Math.min(cols, rows) * 0.62;
  const x = cols * 0.5 - size / 2;
  const y = rows * 0.5 - size / 2;

  const light = ctx.createRadialGradient(x + size * 0.3, y + size * 0.25, 0, x + size * 0.5, y + size * 0.5, size);
  light.addColorStop(0, "rgba(0,0,0,0.95)");
  light.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, size * 0.24);
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = size * 0.12;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x + size * 0.27, y + size * 0.52);
  ctx.lineTo(x + size * 0.44, y + size * 0.69);
  ctx.lineTo(x + size * 0.75, y + size * 0.33);
  ctx.stroke();

  ctx.globalCompositeOperation = "source-over";
  const halo = ctx.createRadialGradient(cols / 2, rows / 2, size * 0.5, cols / 2, rows / 2, size * 1.05);
  halo.addColorStop(0, "rgba(0,0,0,0.18)");
  halo.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, cols, rows);

  const { data } = ctx.getImageData(0, 0, cols, rows);
  const ink = new Float32Array(cols * rows);
  for (let i = 0; i < ink.length; i++) ink[i] = data[i * 4 + 3] / 255;
  return ink;
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
    let ink = new Float32Array();

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      ink = drawSource(cols, rows);
    };

    const paint = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const peach = ctx.createLinearGradient(0, 0, cols * CELL, rows * CELL);
      peach.addColorStop(0, "#9d8bff");
      peach.addColorStop(0.55, "#d69bd2");
      peach.addColorStop(1, "#ffdcc4");
      ctx.fillStyle = peach;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const shift = r % 2 ? CELL / 2 : 0;
        for (let c = 0; c < cols; c++) {
          const wave = still ? 1 : 0.86 + 0.14 * Math.sin(t * 1.4 - (c + r) * 0.18);
          const radius = (CELL / 2) * Math.sqrt(ink[r * cols + c]) * wave;
          if (radius < 0.35) continue;
          const cx = c * CELL + shift + CELL / 2;
          const cy = r * CELL + CELL / 2;
          ctx.moveTo(cx + radius, cy);
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();
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
