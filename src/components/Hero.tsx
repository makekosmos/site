import { useMemo } from "react";
import { DOWNLOAD_URL } from "../links";
import { detectPlatform } from "../platform";
import { AgendaMock } from "../ui/AgendaMock";
import type { Release } from "../useLatestRelease";
import { AppleLogo, ArrowRight, WindowsLogo } from "./Icons";
import { Sky } from "./Sky";

const CTA_LABEL = {
  mac: "Download for macOS",
  windows: "Download for Windows",
} as const;

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero({ release }: { release: Release | null }) {
  const platform = useMemo(detectPlatform, []);

  return (
    <section className="hero">
      <Sky />
      <div className="hero-copy wrap">
        <a className="chip reveal" style={step(0)} href={release?.url ?? DOWNLOAD_URL}>
          <span className="dot" />
          Beta{release && ` · v${release.version}`}
        </a>
        <h1 className="display reveal" style={step(1)}>
          A personal world for everything that <span className="accent">matters</span>
        </h1>
        <p className="lede reveal" style={step(2)}>
          Mundus brings tasks, notes, dictation and focus together in one local-first app. Native agents lend a
          hand, while your data stays with you, not in someone else's cloud.
        </p>
        <div className="actions reveal" style={step(3)}>
          <a className="btn btn-primary" href={DOWNLOAD_URL}>
            {platform ? CTA_LABEL[platform] : "Download Mundus"}
            <ArrowRight />
          </a>
          <a className="btn btn-ghost" href="#apps">
            See what's inside
          </a>
        </div>
        <p className="platforms reveal" style={step(4)}>
          <AppleLogo /> macOS <span>·</span> <WindowsLogo /> Windows
        </p>
      </div>
      <div className="hero-window wrap reveal" style={step(5)}>
        <AgendaMock />
      </div>
    </section>
  );
}
