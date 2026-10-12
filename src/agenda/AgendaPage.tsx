import { Changelog } from "./Changelog";
import data from "./features.json";
import { HalftoneMark } from "./HalftoneMark";

const PLATFORMS = [
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
  { id: "android", label: "Android" },
] as const;

type Status = "yes" | "partial" | "no";
type Feature = { name: string; note?: string } & Record<(typeof PLATFORMS)[number]["id"], Status>;
const groups = data.groups as { name: string; features: Feature[] }[];

const STATUS: Record<Status, { mark: string; label: string }> = {
  yes: { mark: "●", label: "Available" },
  partial: { mark: "◐", label: "Partly, see note" },
  no: { mark: "○", label: "Not yet" },
};

const total = groups.reduce((n, g) => n + g.features.length, 0);
const count = (id: (typeof PLATFORMS)[number]["id"]) =>
  groups.reduce((n, g) => n + g.features.filter((f) => f[id] === "yes").length, 0);

export function AgendaPage() {
  return (
    <div className="agenda">
      <header className="top">
        <a className="brand" href="/">
          <img src="/mundus-icon.png" alt="" width={22} height={22} />
          Mundus
        </a>
        <nav>
          <a href="#features">Features</a>
          <a href="#changelog">Changelog</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <img src="/apps/agenda.png" alt="" width={20} height={20} />
            Agenda
          </p>
          <h1>Tasks that stay on your devices.</h1>
          <p className="lede">
            Inbox, this week, someday. Agenda runs on the Mundus Engine on your computer and syncs straight to your
            phone. No account, no cloud copy.
          </p>
          <div className="actions">
            <a className="cta" href="https://github.com/makekosmos/cortex/releases/latest">
              Get Mundus for desktop
            </a>
            <a className="cta ghost" href="https://github.com/makekosmos/agenda-android/releases/latest">
              Android APK
            </a>
          </div>
        </div>
        <HalftoneMark />
      </section>

      <section className="block" id="features" aria-labelledby="features-title">
        <div className="block-head">
          <h2 id="features-title">Features</h2>
          <p className="muted">
            Checked against the code on {data.checked}. {total} features.
          </p>
        </div>
        <div className="table-wrap">
          <table className="features">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {PLATFORMS.map((p) => (
                  <th key={p.id} scope="col" className="platform">
                    {p.label}
                    <span className="score">
                      {count(p.id)}/{total}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {groups.map((group) => (
              <tbody key={group.name}>
                <tr className="group">
                  <th colSpan={PLATFORMS.length + 1} scope="colgroup">
                    {group.name}
                  </th>
                </tr>
                {group.features.map((f) => (
                  <tr key={f.name}>
                    <th scope="row">
                      {f.name}
                      {f.note && <span className="note">{f.note}</span>}
                    </th>
                    {PLATFORMS.map((p) => (
                      <td key={p.id} className={`status ${f[p.id]}`}>
                        <span aria-hidden="true">{STATUS[f[p.id]].mark}</span>
                        <span className="sr">{STATUS[f[p.id]].label}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <ul className="legend">
          {Object.entries(STATUS).map(([key, s]) => (
            <li key={key} className={`status ${key}`}>
              <span aria-hidden="true">{s.mark}</span> {s.label}
            </li>
          ))}
        </ul>
      </section>

      <Changelog />

      <footer className="foot">
        <a href="/">Mundus</a>
        <a href="https://github.com/makekosmos/agenda-gpui">agenda-gpui</a>
        <a href="https://github.com/makekosmos/agenda-android">agenda-android</a>
      </footer>
    </div>
  );
}
