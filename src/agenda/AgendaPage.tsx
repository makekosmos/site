import { Download, Phone } from "../components/Icons";
import { Cta, Footer, Nav, Row, Stage } from "../ui/kit";
import { AgendaMock } from "../ui/mocks/AgendaMock";
import { StatsMock } from "../ui/mocks/StatsMock";
import { SyncMock } from "../ui/mocks/SyncMock";
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

const STATUS: Record<Status, string> = { yes: "Available", partial: "Partly, see note", no: "Not yet" };

const total = groups.reduce((n, g) => n + g.features.length, 0);
const count = (id: (typeof PLATFORMS)[number]["id"]) =>
  groups.reduce((n, g) => n + g.features.filter((f) => f[id] === "yes").length, 0);

function Get() {
  return (
    <>
      <a className="btn btn-light" href={DESKTOP_URL}>
        Get it for desktop
        <Download />
      </a>
      <a className="btn btn-dark" href={ANDROID_URL}>
        Android APK
        <Phone />
      </a>
    </>
  );
}

export function AgendaPage() {
  return (
    <>
      <Nav current="/agenda" />
      <main>
        <section className="wrap hero">
          <h1 className="title">
            Agenda is a calm list for everything you have to do.
            <span className="muted"> Today, this week and someday, on your computer and your phone.</span>
          </h1>
          <div className="actions">
            <Get />
          </div>
          <Stage art="fuji" className="hero-stage">
            <AgendaMock />
          </Stage>
        </section>

        <section className="section" aria-label="How Agenda works">
          <div className="wrap rows">
            <Row
              art="etretat"
              title="Catch it before it slips"
              body="Everything lands in the Inbox first. Write it the way you say it, and a day word puts it on that day."
            >
              <AgendaMock initial="inbox" />
            </Row>
            <Row
              art="sierra"
              title="Same list on your phone"
              body="Agenda for Android pairs with your computer over the local network. No account and no cloud copy."
            >
              <SyncMock />
            </Row>
            <Row
              art="pines"
              title="See how the week went"
              body="Finished tasks go to the Logbook. Your streak and weekly stats show the pace without nagging."
            >
              <StatsMock />
            </Row>
          </div>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2-lg" id="features-title">
                What works where
              </h2>
              <p className="muted">
                {total} features, checked against the code on {data.checked}.
              </p>
            </div>
            <div className="table-card">
              <table className="features">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    {PLATFORMS.map((p) => (
                      <th key={p.id} scope="col" className="platform">
                        {p.label}
                        <span className="score mono">
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
                          {f.note && <span className="note-text">{f.note}</span>}
                        </th>
                        {PLATFORMS.map((p) => (
                          <td key={p.id}>
                            <span className={`mark ${f[p.id]}`} title={STATUS[f[p.id]]} />
                            <span className="sr">{STATUS[f[p.id]]}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            <ul className="legend">
              {(Object.keys(STATUS) as Status[]).map((key) => (
                <li key={key}>
                  <span className={`mark ${key}`} aria-hidden="true" /> {STATUS[key]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Changelog />

        <Cta title="Start with today.">
          <Get />
        </Cta>
      </main>
      <Footer />
    </>
  );
}
