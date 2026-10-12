import { useEffect, useState } from "react";

export type Release = { tag: string; name: string; url: string; date: string; body: string };
export type ReleasesState = { status: "loading" } | { status: "error" } | { status: "ready"; releases: Release[] };

export function useReleases(repo: string, limit = 30) {
  const [state, setState] = useState<ReleasesState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetch(`https://api.github.com/repos/${repo}/releases?per_page=${limit}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: Array<Record<string, unknown>>) =>
        setState({
          status: "ready",
          releases: data
            .filter((r) => !r.draft && !r.prerelease)
            .map((r) => ({
              tag: String(r.tag_name),
              name: String(r.name || r.tag_name),
              url: String(r.html_url),
              date: String(r.published_at),
              body: String(r.body ?? ""),
            })),
        }),
      )
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setState({ status: "error" });
      });
    return () => controller.abort();
  }, [repo, limit]);

  return state;
}

export const DATE = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" });
