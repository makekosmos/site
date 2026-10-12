import { useMemo } from "react";
import { AppleLogo, ArrowRight, Branch, Download, Monitor, Phone, WindowsLogo } from "./components/Icons";
import { localize } from "./i18n";
import { DOWNLOAD_URL, RELEASES_URL } from "./links";
import { detectPlatform } from "./platform";
import { ArkFigure, EngineFigure, SystemFigure } from "./ui/figures/Figures";
import { Cta, Footer, Nav, Stage } from "./ui/kit";
import { MundusMock } from "./ui/mocks/MundusMock";
import { ReleaseStrip } from "./ui/ReleaseStrip";

const COPY = localize({
  en: {
    title: "Mundus runs quietly on your computer. Your apps plug into it.",
    lead: " Your data stays with you. No account, no cloud.",
    download: { mac: "Download for macOS", windows: "Download for Windows", any: "Download Mundus" },
    how: "How it works",
    howTitle: "One engine. Everything else on top.",
    howLead: "It runs in the background. Apps plug in. Your data stays inside.",
    figs: [
      {
        title: "Apps plug in",
        body: "Install an app in one click. Every app runs on the same engine and updates on its own.",
        facts: ["One click", "Auto-updates"],
      },
      {
        title: "One permission, once",
        body: "The engine handles the microphone, hotkeys and focus mode. You allow it once, not for every app.",
        facts: ["Microphone", "Hotkeys", "Focus"],
      },
      {
        title: "Your data, your devices",
        body: "Everything lives on your computer and syncs straight to your phone. No server in between.",
        facts: ["Offline", "Phone sync", "No cloud"],
      },
    ],
    principles: [
      { Icon: Phone, title: "No account", body: "Your phone pairs with your computer directly. Nothing to sign up for." },
      { Icon: Monitor, title: "Windows and macOS", body: "A native app for both." },
      { Icon: Branch, title: "Built in the open", body: "Every release is published on GitHub." },
    ],
    cta: "Try Mundus now.",
  },
  ru: {
    title: "Mundus тихо работает на вашем компьютере. Приложения подключаются к нему.",
    lead: " Данные остаются у вас. Без аккаунта и облака.",
    download: { mac: "Скачать для macOS", windows: "Скачать для Windows", any: "Скачать Mundus" },
    how: "Как это работает",
    howTitle: "Один движок. Всё остальное сверху.",
    howLead: "Он работает в фоне. Приложения подключаются. Данные остаются внутри.",
    figs: [
      {
        title: "Приложения подключаются",
        body: "Приложение ставится в один клик. Все работают на одном движке и обновляются сами.",
        facts: ["Один клик", "Автообновления"],
      },
      {
        title: "Одно разрешение, один раз",
        body: "Микрофон, горячие клавиши и режим фокуса берёт на себя движок. Вы разрешаете один раз, а не каждому приложению.",
        facts: ["Микрофон", "Горячие клавиши", "Фокус"],
      },
      {
        title: "Ваши данные — на ваших устройствах",
        body: "Всё хранится на компьютере и напрямую синхронизируется с телефоном. Без сервера посередине.",
        facts: ["Офлайн", "Синхронизация", "Без облака"],
      },
    ],
    principles: [
      { Icon: Phone, title: "Без аккаунта", body: "Телефон подключается к компьютеру напрямую. Регистрироваться не нужно." },
      { Icon: Monitor, title: "Windows и macOS", body: "Нативное приложение для обеих систем." },
      { Icon: Branch, title: "Открытая разработка", body: "Каждый релиз публикуется на GitHub." },
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
