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
    title: "Agenda is a calm list for everything you have to do.",
    lead: " Today, this week and someday, on your computer and your phone.",
    desktop: "Get it for desktop",
    how: "How Agenda works",
    rows: [
      {
        title: "Catch it before it slips",
        body: "Everything lands in the Inbox first. Write it the way you say it, and a day word puts it on that day.",
      },
      {
        title: "Same list on your phone",
        body: "Agenda for Android pairs with your computer over the local network. No account and no cloud copy.",
      },
      {
        title: "See how the week went",
        body: "Finished tasks go to the Logbook. Your streak and weekly stats show the pace without nagging.",
      },
    ],
    featuresTitle: "What works where",
    checked: (n: number, date: string) => `${n} features, checked against the code on ${date}`,
    feature: "Feature",
    status: { yes: "Available", partial: "Partly, see note", no: "Not yet" } as Record<Status, string>,
    cta: "Start with today.",
  },
  ru: {
    title: "Agenda — спокойный список всего, что нужно сделать.",
    lead: " Сегодня, на этой неделе и когда-нибудь, на компьютере и телефоне.",
    desktop: "Скачать для компьютера",
    how: "Как работает Agenda",
    rows: [
      {
        title: "Записать, пока не забылось",
        body: "Всё сначала попадает во Входящие. Пишите, как говорите, и день недели в тексте поставит задачу на этот день.",
      },
      {
        title: "Тот же список на телефоне",
        body: "Agenda для Android подключается к компьютеру по локальной сети. Без аккаунта и копии в облаке.",
      },
      {
        title: "Как прошла неделя",
        body: "Выполненные задачи уходят в журнал. Серия и статистика за неделю показывают темп, но не подгоняют.",
      },
    ],
    featuresTitle: "Что где работает",
    checked: (n: number, date: string) => `${n} функций, сверено с кодом ${date}`,
    feature: "Функция",
    status: { yes: "Есть", partial: "Частично, см. примечание", no: "Пока нет" } as Record<Status, string>,
    cta: "Начните с сегодняшнего дня.",
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
