import { Download, Phone } from "../components/Icons";
import { LANG, localize } from "../i18n";
import { Cta, Footer, Nav, Row, Stage } from "../ui/kit";
import { DATE } from "../ui/releases";
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
type Label = { name: string; note?: string };
type Feature = Label & { ru: Label } & Record<(typeof PLATFORMS)[number]["id"], Status>;
const groups = data.groups as { name: string; ru: string; features: Feature[] }[];
const label = (f: Feature): Label => (LANG === "ru" ? f.ru : f);

const COPY = localize({
  en: {
    title: "Stop carrying your day in your head.",
    lead: " Agenda holds it. You do the work.",
    desktop: "Get it for desktop",
    how: "How Agenda works",
    rows: [
      {
        title: "Write it down. Let it go.",
        body: "Type it the way you'd say it. “Gym friday” lands on Friday. Your head is free again.",
      },
      {
        title: "One list. Every device.",
        body: "Your phone pairs with your computer. No account. No cloud. Just your list.",
      },
      {
        title: "Proof you showed up.",
        body: "Done tasks go to the Logbook. The streak grows. Rhythm beats motivation.",
      },
    ],
    featuresTitle: "What works where",
    checked: (n: number, date: string) => `${n} features, checked against the code on ${date}`,
    feature: "Feature",
    status: { yes: "Available", partial: "Partly, see note", no: "Not yet" } as Record<Status, string>,
    cta: "Clear your head. Start today.",
  },
  ru: {
    title: "Хватит держать день в голове.",
    lead: " Agenda помнит за вас. Вы делаете дело.",
    desktop: "Скачать для компьютера",
    how: "Как работает Agenda",
    rows: [
      {
        title: "Записал и забыл.",
        body: "Пишите, как говорите. «Зал в пятницу» встанет на пятницу. Голова снова свободна.",
      },
      {
        title: "Один список. Везде.",
        body: "Телефон подключается к компьютеру напрямую. Без аккаунта. Без облака. Только ваш список.",
      },
      {
        title: "Видно, что вы в деле.",
        body: "Сделанное уходит в журнал. Серия растёт. Ритм важнее мотивации.",
      },
    ],
    featuresTitle: "Что где работает",
    checked: (n: number, date: string) => `${n} функций, сверено с кодом ${date}`,
    feature: "Функция",
    status: { yes: "Есть", partial: "Частично, см. примечание", no: "Пока нет" } as Record<Status, string>,
    cta: "Освободите голову. Начните сегодня.",
  },
});
const STATUS = COPY.status;

const total = groups.reduce((n, g) => n + g.features.length, 0);
const count = (id: (typeof PLATFORMS)[number]["id"]) =>
  groups.reduce((n, g) => n + g.features.filter((f) => f[id] === "yes").length, 0);

function Get() {
  return (
    <>
      <a className="btn btn-light" href={DESKTOP_URL}>
        {COPY.desktop}
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
            {COPY.title}
            <span className="muted">{COPY.lead}</span>
          </h1>
          <div className="actions">
            <Get />
          </div>
          <Stage art="fuji" className="hero-stage">
            <AgendaMock />
          </Stage>
        </section>

        <section className="section" aria-label={COPY.how}>
          <div className="wrap rows">
            <Row
              art="etretat"
              title={COPY.rows[0].title}
              body={COPY.rows[0].body}
            >
              <AgendaMock initial="inbox" />
            </Row>
            <Row
              art="sierra"
              title={COPY.rows[1].title}
              body={COPY.rows[1].body}
            >
              <SyncMock />
            </Row>
            <Row
              art="pines"
              title={COPY.rows[2].title}
              body={COPY.rows[2].body}
            >
              <StatsMock />
            </Row>
          </div>
        </section>

        <section className="section" id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2-lg" id="features-title">
                {COPY.featuresTitle}
              </h2>
              <p className="muted">
                {COPY.checked(total, DATE.format(new Date(data.checked)))}
              </p>
            </div>
            <div className="table-card">
              <table className="features">
                <thead>
                  <tr>
                    <th scope="col">{COPY.feature}</th>
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
                        {LANG === "ru" ? group.ru : group.name}
                      </th>
                    </tr>
                    {group.features.map((f) => (
                      <tr key={f.name}>
                        <th scope="row">
                          {label(f).name}
                          {label(f).note && <span className="note-text">{label(f).note}</span>}
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

        <Cta title={COPY.cta}>
          <Get />
        </Cta>
      </main>
      <Footer />
    </>
  );
}
