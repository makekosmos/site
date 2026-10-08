import { useMemo } from "react";
import { DOWNLOAD_URL } from "../links";
import { detectPlatform } from "../platform";
import type { Release } from "../useLatestRelease";
import { AppleLogo, ArrowRight, WindowsLogo } from "./Icons";

const CTA_LABEL = {
  mac: "Скачать для macOS",
  windows: "Скачать для Windows",
} as const;

export function Hero({ release }: { release: Release | null }) {
  const platform = useMemo(detectPlatform, []);

  return (
    <section className="hero">
      <h1 className="hero-title reveal" style={{ "--i": 0 } as React.CSSProperties}>
        Личный мир
        <br />
        для всего важного
      </h1>
      <p className="hero-lede reveal" style={{ "--i": 1 } as React.CSSProperties}>
        Mundus собирает задачи, заметки, диктовку и фокус в одном local-first приложении.
        Нативные агенты помогают, а данные остаются у тебя, а не в чужом облаке.
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
          {platform ? CTA_LABEL[platform] : "Скачать Mundus"}
          <ArrowRight />
        </a>
      </div>

      <p className="hero-platforms reveal" style={{ "--i": 3 } as React.CSSProperties}>
        Доступно для{" "}
        <a href={DOWNLOAD_URL}>
          <AppleLogo />
          macOS
        </a>{" "}
        и{" "}
        <a href={DOWNLOAD_URL}>
          <WindowsLogo />
          Windows
        </a>
      </p>
    </section>
  );
}
