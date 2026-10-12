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

const WEEK = [
  { day: "Monday", tasks: [{ title: "Send the invoice to Studio North", done: true }] },
  {
    day: "Tuesday",
    tasks: [
      { title: "Call Anna about the flat", done: false, tag: "Home" },
      { title: "Review the draft", done: false, deadline: "Due Wed" },
    ],
  },
  { day: "Thursday", tasks: [{ title: "Pay rent", done: false, repeat: true }] },
];

function AppMock() {
  return (
    <figure className="mock" aria-label="Agenda showing the This week list">
      <aside className="mock-side">
        <span className="mock-item">
          Inbox <em>3</em>
        </span>
        <span className="mock-item active">This week</span>
        <span className="mock-item">Next week</span>
        <span className="mock-item">Someday</span>
        <span className="mock-item">Logbook</span>
        <span className="mock-label">Projects</span>
        <span className="mock-item">Home</span>
        <span className="mock-item">Studio North</span>
      </aside>
      <div className="mock-main">
        <p className="mock-title">This week</p>
        <p className="mock-entry">New task, e.g. “dentist on friday”</p>
        {WEEK.map((d) => (
          <div key={d.day} className="mock-day">
            <span className="mock-dayname">{d.day}</span>
            {d.tasks.map((task) => (
              <span key={task.title} className={`mock-task${task.done ? " done" : ""}`}>
                <i className="box" />
                {task.title}
                {"tag" in task && <small>{task.tag}</small>}
                {"deadline" in task && <small>{task.deadline}</small>}
                {"repeat" in task && <small>Every month</small>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

export function AgendaPage() {
  return (
    <div className="agenda">
      <header className="top wrap">
        <a className="brand" href="/">
          Mundus
        </a>
        <nav>
          <a href="#what">What it is</a>
          <a href="#features">Features</a>
          <a href="#changelog">Changelog</a>
          <a className="pill" href="https://github.com/makekosmos/cortex/releases/latest">
            Download
          </a>
        </nav>
      </header>

      <section className="hero wrap">
        <p className="label">Task manager · Windows · macOS · Android</p>
        <h1>Agenda</h1>
        <div className="hero-foot">
          <p className="statement">A calm list of what you have to do, on your computer and in your pocket.</p>
          <div className="actions">
            <a className="pill solid" href="https://github.com/makekosmos/cortex/releases/latest">
              Get it for desktop
            </a>
            <a className="pill" href="https://github.com/makekosmos/agenda-android/releases/latest">
              Android APK
            </a>
          </div>
        </div>
      </section>

      <HalftoneMark />

      <section className="what wrap" id="what" aria-labelledby="what-title">
        <div className="section-head">
          <p className="label">01 · What Agenda is</p>
          <h2 id="what-title">
            One list for the day, the week and someday. It goes from a thought to done in four moves.
          </h2>
        </div>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <AppMock />
      </section>

      <section className="wrap block" id="features" aria-labelledby="features-title">
        <div className="section-head">
          <p className="label">02 · Features</p>
          <h2 id="features-title">What works where.</h2>
          <p className="muted">
            {total} features, checked against the code on {data.checked}.
          </p>
        </div>
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
        <ul className="legend">
          {Object.entries(STATUS).map(([key, s]) => (
            <li key={key} className={`status ${key}`}>
              <span aria-hidden="true">{s.mark}</span> {s.label}
            </li>
          ))}
        </ul>
      </section>

      <Changelog />

      <footer className="foot wrap">
        <p className="foot-word" aria-hidden="true">
          Agenda
        </p>
        <div className="foot-links">
          <a href="/">Part of Mundus</a>
          <a href="https://github.com/makekosmos/agenda-gpui">agenda-gpui</a>
          <a href="https://github.com/makekosmos/agenda-android">agenda-android</a>
        </div>
      </footer>
    </div>
  );
}
