import { useEffect, useState, type ReactNode } from "react";

export const CHANNELS = [
  { id: "desktop", label: "Windows · macOS", repo: "makekosmos/agenda-gpui" },
  { id: "android", label: "Android", repo: "makekosmos/agenda-android" },
] as const;

type Channel = (typeof CHANNELS)[number];
type Release = { tag: string; name: string; url: string; date: string; body: string };
type State = { status: "loading" } | { status: "error" } | { status: "ready"; releases: Release[] };

function useReleases(repo: string) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetch(`https://api.github.com/repos/${repo}/releases?per_page=30`, {
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
  }, [repo]);

  return state;
}

const INLINE = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|(https:\/\/github\.com\/[^\s)]+)|@([A-Za-z0-9-]+)/g;

function shortGithub(url: string) {
  const pull = url.match(/\/(?:pull|issues)\/(\d+)$/);
  if (pull) return `#${pull[1]}`;
  const compare = url.match(/\/compare\/(.+)$/);
  return compare ? compare[1] : url.replace("https://github.com/", "");
}

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1]) out.push(<a key={key} href={m[2]}>{m[1]}</a>);
    else if (m[3]) out.push(<strong key={key}>{m[3]}</strong>);
    else if (m[4]) out.push(<code key={key}>{m[4]}</code>);
    else if (m[5]) out.push(<a key={key} href={m[5]}>{shortGithub(m[5])}</a>);
    else out.push(<a key={key} href={`https://github.com/${m[6]}`}>@{m[6]}</a>);
    last = key + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// GitHub release notes are a small markdown subset: headings, bullets, lines.
function Notes({ body }: { body: string }) {
  const blocks: ReactNode[] = [];
  let items: string[] = [];
  const flush = () => {
    if (items.length) blocks.push(<ul key={blocks.length}>{items.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>);
    items = [];
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      items.push(bullet[1]);
      continue;
    }
    flush();
    if (!line) continue;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    blocks.push(heading ? <h4 key={blocks.length}>{heading[1]}</h4> : <p key={blocks.length}>{inline(line)}</p>);
  }
  flush();
  return <div className="notes">{blocks}</div>;
}

const DATE = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" });

export function Changelog() {
  const [channel, setChannel] = useState<Channel>(CHANNELS[0]);
  const state = useReleases(channel.repo);

  return (
    <section className="block" id="changelog" aria-labelledby="changelog-title">
      <div className="block-head">
        <h2 id="changelog-title">Changelog</h2>
        <div className="tabs" role="tablist" aria-label="Platform">
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === channel.id}
              className="tab"
              onClick={() => setChannel(c)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      {state.status === "loading" && <p className="muted">Loading releases…</p>}
      {state.status === "error" && (
        <p className="muted">
          GitHub did not answer. See the releases on{" "}
          <a href={`https://github.com/${channel.repo}/releases`}>GitHub</a>.
        </p>
      )}
      {state.status === "ready" && (
        <ol className="releases">
          {state.releases.map((release, index) => (
            <li key={release.tag}>
              <details className="release" open={index === 0}>
                <summary>
                  <span className="release-tag">{release.tag}</span>
                  {index === 0 && <span className="badge">Latest</span>}
                  <time dateTime={release.date}>{DATE.format(new Date(release.date))}</time>
                </summary>
                <Notes body={release.body} />
                <a className="release-link" href={release.url}>
                  Downloads and assets
                </a>
              </details>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
