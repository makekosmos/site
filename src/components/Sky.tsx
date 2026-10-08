import { lazy, Suspense, useEffect, useState } from "react";

// The shader engine is ~800 kB gzipped, so the page paints with the CSS gradient on `.sky`
// and pulls the animated version in only once idle, and only where it can run and is wanted.
const SkyShader = lazy(() => import("./SkyShader"));

function shouldAnimate() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return (
    "gpu" in navigator &&
    !connection?.saveData &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Sky() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!shouldAnimate()) return;
    const start = () => setAnimated(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 1500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="sky" aria-hidden="true">
      {animated && (
        <Suspense>
          <SkyShader />
        </Suspense>
      )}
      <div className="sky-scrim" />
    </div>
  );
}
