import { ArrowRight } from "../components/Icons";
import { DATE, useReleases, type Release } from "./releases";

const SKIP = /^(chore|test|ci|exp|docs|style|refactor)\b/i;

// Release notes list commits as "- <sha> <scope>: <subject> (<author>)"; the first real one headlines the card.
function headline(release: Release) {
  for (const raw of release.body.split(/\r?\n/)) {
    const commit = raw.match(/^[-*]\s+[0-9a-f]{7,}\s+(.*?)(?:\s+\([^()]*\))?$/);
    if (!commit || SKIP.test(commit[1])) continue;
    const text = commit[1].replace(/\s*\(KOS-\d+\)/g, "").replace(/^KOS-\d+:\s*/, "");
    const scoped = text.match(/^(?:fix\()?([\w-]+)\)?:\s*(.*)$/);
    const subject = scoped ? scoped[2] : text;
    return { scope: scoped?.[1], subject: subject.charAt(0).toUpperCase() + subject.slice(1) };
  }
  return { scope: undefined, subject: "Fixes and improvements" };
}

export function ReleaseStrip({ repo, href }: { repo: string; href: string }) {
  const state = useReleases(repo, 8);
  const releases = state.status === "ready" ? state.releases.slice(0, 4) : [];

  return (
    <section className="section" id="changelog" aria-labelledby="changelog-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2-lg" id="changelog-title">
            Changelog
          </h2>
        </div>
        <ol className="cards releases-strip" style={{ "--cols": 4 } as React.CSSProperties}>
          {state.status === "loading" &&
            Array.from({ length: 4 }, (_, i) => <li key={i} className="card release-card is-loading" aria-hidden="true" />)}
          {releases.map((release) => {
            const { scope, subject } = headline(release);
            return (
              <li key={release.tag}>
                <a className="card release-card" href={release.url}>
                  <span className="release-meta mono">
                    <span>{release.tag}</span>
                    <time dateTime={release.date}>{DATE.format(new Date(release.date))}</time>
                  </span>
                  <span className="release-subject">
                    {scope && <span className="release-scope">{scope}</span>}
                    {subject}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        {state.status === "error" && <p className="muted">GitHub did not answer.</p>}
        <a className="link section-foot" href={href}>
          See all releases
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
