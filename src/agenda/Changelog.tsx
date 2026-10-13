import { useState, type ReactNode } from "react";
import { localize } from "../i18n";
import { DATE, useReleases } from "../ui/releases";

const COPY = localize({
  en: {
    title: "Changelog",
    platform: "Platform",
    loading: "Loading releases…",
    error: "GitHub did not answer. See the releases on",
    latest: "Latest",
    assets: "Downloads and assets",
  },
  ru: {
    title: "Что нового",
    platform: "Платформа",
    loading: "Загружаю релизы…",
    error: "GitHub не ответил. Релизы можно посмотреть на",
    latest: "Последний",
    assets: "Загрузки и файлы",
  },
});

export type Channel = { id: string; label: string; repo: string };

export const AGENDA_CHANNELS: readonly Channel[] = [
  { id: "desktop", label: "Windows · macOS", repo: "makekosmos/agenda-gpui" },
  { id: "android", label: "Android", repo: "makekosmos/agenda-android" },
];

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

export function Changelog({ channels = AGENDA_CHANNELS }: { channels?: readonly Channel[] }) {
  const [channel, setChannel] = useState<Channel>(channels[0]);
  const state = useReleases(channel.repo);

  return (
    <section className="section" id="changelog" aria-labelledby="changelog-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2-lg" id="changelog-title">
            {COPY.title}
          </h2>
          {channels.length > 1 && (
            <div className="segmented" role="tablist" aria-label={COPY.platform}>
              {channels.map((c) => (
                <button key={c.id} type="button" role="tab" aria-selected={c.id === channel.id} onClick={() => setChannel(c)}>
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {state.status === "loading" && (
          <ol className="releases" aria-label={COPY.loading}>
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="release release-skeleton" aria-hidden="true" />
            ))}
          </ol>
        )}
        {state.status === "error" && (
          <p className="muted">
            {COPY.error}{" "}
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
                    {index === 0 && <span className="badge">{COPY.latest}</span>}
                    <time dateTime={release.date}>{DATE.format(new Date(release.date))}</time>
                    <span className="release-chevron" aria-hidden="true" />
                  </summary>
                  <Notes body={release.body} />
                  <a className="release-link" href={release.url}>
                    {COPY.assets}
                  </a>
                </details>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
