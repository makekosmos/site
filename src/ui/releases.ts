import { LANG } from "../i18n";
import { useEffect, useState } from "react";

export type Release = { tag: string; name: string; url: string; date: string; body: string };
export type ReleasesState = { status: "loading" } | { status: "error" } | { status: "ready"; releases: Release[] };

type Entry = { at: number; releases: Release[] };

// Releases change a few times a week; ten minutes keeps tab switches and revisits off the GitHub rate limit.
const FRESH_MS = 10 * 60 * 1000;
const memory = new Map<string, Entry>();

function cached(key: string): Entry | undefined {
  const hit = memory.get(key);
  if (hit) return hit;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    const entry = JSON.parse(raw) as Entry;
    memory.set(key, entry);
    return entry;
  } catch {
    return undefined;
  }
}

function store(key: string, releases: Release[]) {
  const entry = { at: Date.now(), releases };
  memory.set(key, entry);
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Storage full or blocked: the in-memory copy still serves this visit.
  }
}

const initial = (key: string): ReleasesState => {
  const hit = cached(key);
  return hit ? { status: "ready", releases: hit.releases } : { status: "loading" };
};

export function useReleases(repo: string, limit = 30) {
  const key = `releases:${repo}:${limit}`;
  const [state, setState] = useState<ReleasesState>(() => initial(key));

  useEffect(() => {
    const hit = cached(key);
    setState(initial(key));
    if (hit && Date.now() - hit.at < FRESH_MS) return;

    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repo}/releases?per_page=${limit}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: Array<Record<string, unknown>>) => {
        const releases = data
          .filter((r) => !r.draft && !r.prerelease)
          .map((r) => ({
            tag: String(r.tag_name),
            name: String(r.name || r.tag_name),
            url: String(r.html_url),
            date: String(r.published_at),
            body: String(r.body ?? ""),
          }));
        store(key, releases);
        setState({ status: "ready", releases });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!hit) setState({ status: "error" });
      });
    return () => controller.abort();
  }, [key, repo, limit]);

  return state;
}

export const DATE = new Intl.DateTimeFormat(LANG, { day: "numeric", month: "short", year: "numeric" });
