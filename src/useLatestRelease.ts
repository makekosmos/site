import { useEffect, useState } from "react";

export type Release = { version: string; url: string };

const API_URL = "https://api.github.com/repos/makekosmos/cortex/releases/latest";

export function useLatestRelease() {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { tag_name?: unknown; html_url?: unknown } | null) => {
        if (typeof data?.tag_name === "string" && typeof data.html_url === "string") {
          setRelease({ version: data.tag_name.replace(/^v/, ""), url: data.html_url });
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
}
