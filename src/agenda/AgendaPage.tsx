import { ArrowRight } from "../components/Icons";
import { AgendaMock } from "../ui/AgendaMock";
import { Halftone } from "../ui/Halftone";
import { CtaPanel, Footer, Nav, SectionHead } from "../ui/kit";
import { Changelog } from "./Changelog";
import data from "./features.json";

const DESKTOP_URL = "https://github.com/makekosmos/cortex/releases/latest";
const ANDROID_URL = "https://github.com/makekosmos/agenda-android/releases/latest";

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

const STEPS = [
  {
    title: "Catch it",
    body: "Everything lands in the Inbox first. Type a task the way you say it. “Call Anna tomorrow” gets a date on its own.",
  },
  {
    title: "Plan the week",
    body: "Move tasks into this week or next week, give them a deadline, or park them in Someday until they matter.",
  },
  {
    title: "Get it done",
    body: "Tick it off. Finished work goes to the Logbook, and your streak and weekly stats show how it is going.",
  },
  {
    title: "Keep it yours",
    body: "Tasks live in the Mundus Engine on your computer and sync straight to your phone. No account, no cloud copy.",
  },
];

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function AgendaPage() {
  return (
    <>
      <Nav current="/agenda" />
      <main>
        <section className="agenda-hero">
          <div className="agenda-art" aria-hidden="true">
            <Halftone mark />
          </div>
          <div className="wrap agenda-copy">
            <img className="reveal" style={step(0)} src="/apps/agenda.png" alt="" width={56} height={56} />
            <p className="eyebrow reveal" style={step(1)}>
              Agenda · Task manager
            </p>
            <h1 className="display reveal" style={step(2)}>
              A calm list for everything you have to <span className="accent">do</span>.
            </h1>
            <p className="lede reveal" style={step(3)}>
              Agenda keeps your day, your week and someday in one place. On your computer and in your pocket, with
              nothing stored in someone else's cloud.
            </p>
            <div className="actions reveal" style={step(4)}>
              <a className="btn btn-primary" href={DESKTOP_URL}>
                Get it for desktop
                <ArrowRight />
              </a>
              <a className="btn btn-ghost" href={ANDROID_URL}>
                Android APK
              </a>
            </div>
            <p className="platform-chips reveal" style={step(5)}>
              {PLATFORMS.map((p) => (
                <span key={p.id} className="chip">
                  {p.label}
                </span>
              ))}
            </p>
          </div>
          <div className="wrap agenda-window reveal" style={step(6)}>
            <AgendaMock />
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <SectionHead
              eyebrow="How it works"
              title={
                <>
                  From a thought to <span className="accent">done</span> in four moves.
                </>
              }
            />
            <ol className="grid steps" style={{ "--cols": 4 } as React.CSSProperties}>
              {STEPS.map((s, i) => (
                <li key={s.title} className="card tile">
                  <span className="step-num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <SectionHead
              eyebrow="Features"
              title={
                <span id="features-title">
                  What works <span className="accent">where</span>.
                </span>
              }
            >
              <p className="muted">
                {total} features, checked against the code on {data.checked}.
              </p>
            </SectionHead>
            <div className="card table-card">
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
          </div>
        </section>

        <Changelog />

        <CtaPanel
          eyebrow="Agenda"
          title={
            <>
              Start with today. <span className="accent">Plan</span> the rest later.
            </>
          }
          actions={
            <>
              <a className="btn btn-primary" href={DESKTOP_URL}>
                Get it for desktop
                <ArrowRight />
              </a>
              <a className="btn btn-ghost" href={ANDROID_URL}>
                Android APK
              </a>
            </>
          }
        >
          <p className="muted">Comes with Mundus on Windows and macOS. A separate APK for Android.</p>
        </CtaPanel>
      </main>
      <Footer />
    </>
  );
}
