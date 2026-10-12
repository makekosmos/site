import { AppleLogo, ArrowRight, Download, WindowsLogo } from "../components/Icons";
import { LANG, localize } from "../i18n";
import { DOWNLOAD_URL } from "../links";
import { detectPlatform } from "../platform";
import { Cta, Footer, Nav, Row, Stage } from "../ui/kit";
import { DATE } from "../ui/releases";
import { Changelog } from "./Changelog";
import data from "./features.json";
import { Shot } from "../ui/Shot";


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
    download: { mac: "Download for macOS", windows: "Download for Windows", any: "Download Agenda" },
    changelog: "Changelog",
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
    shots: {
      week: "Agenda on macOS: the week view with tasks for each day",
      quick: "Agenda on macOS: typing a new task in quick entry",
      phone: "Agenda on Android: the week view",
      stats: "Agenda statistics: completed tasks, streaks and activity",
    },
  },
  ru: {
    title: "Хватит держать день в голове.",
    lead: " Agenda помнит за вас. Вы делаете дело.",
    download: { mac: "Скачать для macOS", windows: "Скачать для Windows", any: "Скачать Agenda" },
    changelog: "Что нового",
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
    shots: {
      week: "Agenda на macOS: неделя с задачами по дням",
      quick: "Agenda на macOS: быстрый ввод новой задачи",
      phone: "Agenda на Android: неделя",
      stats: "Статистика Agenda: выполненные задачи, серии и активность",
    },
  },
});
const STATUS = COPY.status;

const total = groups.reduce((n, g) => n + g.features.length, 0);
const count = (id: (typeof PLATFORMS)[number]["id"]) =>
  groups.reduce((n, g) => n + g.features.filter((f) => f[id] === "yes").length, 0);

const PLATFORM = detectPlatform();
const PlatformIcon = PLATFORM === "mac" ? AppleLogo : PLATFORM === "windows" ? WindowsLogo : Download;

function Get() {
  return (
    <a className="btn btn-light" href={DOWNLOAD_URL}>
      {COPY.download[PLATFORM ?? "any"]}
      <PlatformIcon />
    </a>
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
            <a className="btn btn-dark" href="#changelog">
              {COPY.changelog}
              <ArrowRight />
            </a>
          </div>
          <Stage art="fuji" className="hero-stage">
            <Shot
              src="week"
              alt={COPY.shots.week}
              width={1600}
              height={963}
              eager
              narrow={{ src: "week-list", width: 720, height: 615 }}
            />
          </Stage>
        </section>

        <section className="section" aria-label={COPY.how}>
          <div className="wrap rows">
            <Row
              art="etretat"
              title={COPY.rows[0].title}
              body={COPY.rows[0].body}
            >
              <Shot
                src="quick"
                alt={COPY.shots.quick}
                width={1600}
                height={963}
                narrow={{ src: "quick-panel", width: 680, height: 560 }}
              />
            </Row>
            <Row
              art="sierra"
              title={COPY.rows[1].title}
              body={COPY.rows[1].body}
            >
              <Shot src="week-phone" alt={COPY.shots.phone} width={540} height={1200} phone />
            </Row>
            <Row
              art="pines"
              title={COPY.rows[2].title}
              body={COPY.rows[2].body}
            >
              <Shot src="stats" alt={COPY.shots.stats} width={1600} height={663} />
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
