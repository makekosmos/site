import { useMemo } from "react";
import { DOWNLOAD_URL } from "../links";
import { detectPlatform } from "../platform";
import type { Release } from "../useLatestRelease";
import { AppleLogo, ArrowRight, WindowsLogo } from "./Icons";

const CTA_LABEL = {
  mac: "Download for macOS",
  windows: "Download for Windows",
} as const;

export function Hero({ release }: { release: Release | null }) {
  const platform = useMemo(detectPlatform, []);

  return (
    <section className="hero">
      <h1 className="hero-title reveal" style={{ "--i": 0 } as React.CSSProperties}>
        A personal world
        <br />
        for everything that matters
      </h1>
      <p className="hero-lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        Mundus brings tasks, notes, dictation and focus together in one local-first app.
        Native agents lend a hand, while your data stays with you, not in someone else's cloud.
      </p>

      <div className="cta reveal" style={{ "--i": 2 } as React.CSSProperties}>
        <a className="cta-tag" href={DOWNLOAD_URL} tabIndex={-1} aria-hidden="true">
          <span className="dot" />
          Beta
          {release && (
            <>
              <span className="cta-tag-sep">·</span>v{release.version}
            </>
          )}
        </a>
        <a className="pill pill-lg" href={DOWNLOAD_URL}>
          {platform ? CTA_LABEL[platform] : "Download Mundus"}
          <ArrowRight />
        </a>
      </div>

      <p className="hero-platforms reveal" style={{ "--i": 3 } as React.CSSProperties}>
        Available for{" "}
        <a href={DOWNLOAD_URL}>
          <AppleLogo />
          macOS
        </a>{" "}
        and{" "}
        <a href={DOWNLOAD_URL}>
          <WindowsLogo />
          Windows
        </a>
      </p>
    </section>
  );
}
