import { useMemo } from "react";
import { AppleLogo, ArrowRight, Branch, Download, Monitor, Phone, WindowsLogo } from "./components/Icons";
import { localize } from "./i18n";
import { DOWNLOAD_URL, RELEASES_URL } from "./links";
import { detectPlatform } from "./platform";
import { ArkFigure, EngineFigure, SystemFigure } from "./ui/figures/Figures";
import { Cta, Footer, Nav, Row, Stage } from "./ui/kit";
import { AgendaMock } from "./ui/mocks/AgendaMock";
import { DictationMock } from "./ui/mocks/DictationMock";
import { MemoriaMock } from "./ui/mocks/MemoriaMock";
import { MundusMock } from "./ui/mocks/MundusMock";
import { ReleaseStrip } from "./ui/ReleaseStrip";

const COPY = localize({
  en: {
    title: "Mundus is a small engine on your computer that your apps plug into.",
    lead: " Tasks, notes and voice share one local core. No account, no cloud copy.",
    download: { mac: "Download for macOS", windows: "Download for Windows", any: "Download Mundus" },
    how: "How it works",
    howTitle: "One engine, three jobs",
    howLead: "Mundus is not one big app. It is an engine that runs quietly in the background and gives every app the same data, the same sync and safe access to your system.",
    figs: [
      {
        title: "Apps plug into the Engine",
        body: "Agenda, Memoria and Dictation install from the Engine's store and talk to it through one API. An app never opens the database or the system on its own.",
        facts: ["Engine API", "App store", "Auto-updates"],
      },
      {
        title: "The Engine talks to your system",
        body: "Focus mode, the microphone, global hotkeys and pasting into other apps all need system access. Only the Engine has it, and you grant it once.",
        facts: ["Focus", "Microphone", "Hotkeys", "Paste"],
      },
      {
        title: "ARK keeps your data and syncs it",
        body: "ARK is the data core inside the Engine. Every change is appended, never overwritten, so devices merge without conflicts. Your phone syncs straight with your computer.",
        facts: ["Rust + SQLite", "Append-only", "Peer-to-peer"],
      },
    ],
    appsTitle: "The apps",
    apps: {
      agenda: {
        title: "Agenda keeps the week in order",
        body: "Type a task the way you say it. “Call mum friday” lands on Friday. Tick it and it moves to the Logbook.",
        link: "Explore Agenda",
      },
      memoria: {
        title: "Memoria is a notebook with a memory",
        body: "Markdown notes with live preview, a daily diary and stickers that float above every window. Imports an Obsidian vault.",
      },
      dictation: {
        title: "Dictation types for you, anywhere",
        body: "Hold a hotkey, speak, and the text lands in whatever app has the cursor. Mail, chat, code.",
      },
    },
    principles: [
      { Icon: Phone, title: "No account", body: "Your phone pairs with your computer directly. Nothing to sign up for." },
      { Icon: Monitor, title: "Windows and macOS", body: "A native desktop app for both, from the same code." },
      { Icon: Branch, title: "Built in the open", body: "Every release and its notes are published on GitHub." },
    ],
    cta: "Try Mundus now.",
  },
  ru: {
    title: "Mundus — небольшой движок на вашем компьютере, к которому подключаются приложения.",
    lead: " Задачи, заметки и голос живут в одном локальном ядре. Без аккаунта и копии в облаке.",
    download: { mac: "Скачать для macOS", windows: "Скачать для Windows", any: "Скачать Mundus" },
    how: "Как это устроено",
    howTitle: "Один движок, три задачи",
    howLead: "Mundus — не одно большое приложение. Это движок, который тихо работает в фоне и даёт каждому приложению общие данные, синхронизацию и безопасный доступ к системе.",
    figs: [
      {
        title: "Приложения подключаются к движку",
        body: "Agenda, Memoria и Dictation ставятся из магазина движка и общаются с ним через один API. Приложение никогда не лезет в базу или систему напрямую.",
        facts: ["Engine API", "Магазин приложений", "Автообновления"],
      },
      {
        title: "Движок говорит с системой",
        body: "Режиму фокуса, микрофону, горячим клавишам и вставке текста в другие приложения нужен доступ к системе. Он есть только у движка, и вы выдаёте его один раз.",
        facts: ["Фокус", "Микрофон", "Горячие клавиши", "Вставка"],
      },
      {
        title: "ARK хранит данные и синхронизирует их",
        body: "ARK — ядро данных внутри движка. Изменения только дописываются и никогда не перезаписываются, поэтому устройства сливаются без конфликтов. Телефон синхронизируется с компьютером напрямую.",
        facts: ["Rust + SQLite", "Только дозапись", "P2P"],
      },
    ],
    appsTitle: "Приложения",
    apps: {
      agenda: {
        title: "Agenda держит неделю в порядке",
        body: "Пишите задачу так, как говорите. «Позвонить маме в пятницу» встанет на пятницу. Отметьте её, и она уйдёт в журнал.",
        link: "Подробнее об Agenda",
      },
      memoria: {
        title: "Memoria — блокнот с памятью",
        body: "Заметки в Markdown с живым превью, ежедневный дневник и стикеры поверх всех окон. Импортирует хранилище Obsidian.",
      },
      dictation: {
        title: "Dictation печатает за вас где угодно",
        body: "Зажмите клавишу, скажите, и текст появится там, где стоит курсор. Почта, чат, код.",
      },
    },
    principles: [
      { Icon: Phone, title: "Без аккаунта", body: "Телефон подключается к компьютеру напрямую. Регистрироваться не нужно." },
      { Icon: Monitor, title: "Windows и macOS", body: "Нативное приложение для обеих систем из одного кода." },
      { Icon: Branch, title: "Открытая разработка", body: "Каждый релиз и его описание публикуются на GitHub." },
    ],
    cta: "Попробуйте Mundus.",
  },
});

const FIGURES = [EngineFigure, SystemFigure, ArkFigure];

export default function App() {
  const platform = useMemo(detectPlatform, []);
  const DownloadIcon = platform === "mac" ? AppleLogo : platform === "windows" ? WindowsLogo : Download;

  const download = (
    <a className="btn btn-light" href={DOWNLOAD_URL}>
      {COPY.download[platform ?? "any"]}
      <DownloadIcon />
    </a>
  );

  return (
    <>
      <Nav current="/" />
      <main>
        <section className="wrap hero">
          <h1 className="title">
            {COPY.title}
            <span className="muted">{COPY.lead}</span>
          </h1>
          <div className="actions">
            {download}
            <a className="btn btn-dark" href="#how">
              {COPY.how}
              <ArrowRight />
            </a>
          </div>
          <Stage art="haystacks" className="hero-stage">
            <MundusMock />
          </Stage>
        </section>

        <section className="section" id="how" aria-labelledby="how-title">
          <div className="wrap">
            <div className="section-head section-head-stack">
              <h2 className="h2-lg" id="how-title">
                {COPY.howTitle}
              </h2>
              <p className="h2 muted">{COPY.howLead}</p>
            </div>
            <ol className="figs">
              {COPY.figs.map((fig, i) => {
                const Art = FIGURES[i];
                return (
                  <li key={fig.title}>
                    <figure className="fig rise">
                      <Art label={fig.title} />
                      <figcaption>
                        <span className="fig-num mono">Fig. {i + 1}</span>
                        <h3>{fig.title}</h3>
                        <p>{fig.body}</p>
                        <ul className="fig-facts mono">
                          {fig.facts.map((fact) => (
                            <li key={fact}>{fact}</li>
                          ))}
                        </ul>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="section" id="apps" aria-labelledby="apps-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2-lg" id="apps-title">
                {COPY.appsTitle}
              </h2>
            </div>
          </div>
          <div className="wrap rows">
            <Row
              art="heron"
              title={COPY.apps.agenda.title}
              body={COPY.apps.agenda.body}
              link={{ label: COPY.apps.agenda.link, href: "/agenda" }}
            >
              <AgendaMock />
            </Row>
            <Row art="lilies" title={COPY.apps.memoria.title} body={COPY.apps.memoria.body}>
              <MemoriaMock />
            </Row>
            <Row art="dnieper" title={COPY.apps.dictation.title} body={COPY.apps.dictation.body}>
              <DictationMock />
            </Row>
          </div>
        </section>

        <section className="section" aria-label="Mundus">
          <div className="wrap">
            <ul className="cards">
              {COPY.principles.map(({ Icon, title, body }) => (
                <li key={title} className="card rise">
                  <Icon className="icon" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ReleaseStrip repo="makekosmos/cortex" href={RELEASES_URL} />

        <Cta title={COPY.cta}>{download}</Cta>
      </main>
      <Footer />
    </>
  );
}
