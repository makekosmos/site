import { useMemo } from "react";
import { AppleLogo, ArrowRight, Branch, Download, Lock, Monitor, Phone, Sparkles, Timer, WindowsLogo } from "./components/Icons";
import { DOWNLOAD_URL, RELEASES_URL } from "./links";
import { detectPlatform } from "./platform";
import { Cta, Footer, Nav, Row, Stage } from "./ui/kit";
import { AgendaMock } from "./ui/mocks/AgendaMock";
import { DictationMock } from "./ui/mocks/DictationMock";
import { MemoriaMock } from "./ui/mocks/MemoriaMock";
import { MundusMock } from "./ui/mocks/MundusMock";
import { SyncMock } from "./ui/mocks/SyncMock";
import { ReleaseStrip } from "./ui/ReleaseStrip";

const PLATFORM = {
  mac: { label: "Download for macOS", Icon: AppleLogo },
  windows: { label: "Download for Windows", Icon: WindowsLogo },
} as const;

const PRINCIPLES = [
  { Icon: Lock, title: "Your data stays home", body: "Everything lives in the Mundus Engine on your computer." },
  { Icon: Phone, title: "No account", body: "Your phone pairs with your computer directly. Nothing to sign up for." },
  { Icon: Sparkles, title: "Native agents", body: "Agents work inside Mundus and lend a hand with what you keep." },
  { Icon: Timer, title: "One place to focus", body: "Tasks, notes and dictation together, so you stop switching." },
  { Icon: Monitor, title: "Windows and macOS", body: "A native desktop app for both, from the same code." },
  { Icon: Branch, title: "Built in the open", body: "Every release and its notes are published on GitHub." },
];

export default function App() {
  const platform = useMemo(detectPlatform, []);
  const cta = platform ? PLATFORM[platform] : { label: "Download Mundus", Icon: Download };

  const download = (
    <a className="btn btn-light" href={DOWNLOAD_URL}>
      {cta.label}
      <cta.Icon />
    </a>
  );

  return (
    <>
      <Nav />
      <main>
        <section className="wrap hero">
          <h1 className="title">
            Mundus is one calm place for your tasks, notes and voice.
            <span className="muted"> It runs on your computer, not in someone else's cloud.</span>
          </h1>
          <div className="actions">
            {download}
            <a className="btn btn-dark" href="#apps">
              See the apps
              <ArrowRight />
            </a>
          </div>
          <Stage art="haystacks" className="hero-stage">
            <MundusMock />
          </Stage>
        </section>

        <section className="section" id="apps" aria-label="Apps">
          <div className="wrap rows">
            <Row
              art="heron"
              title="Agenda keeps the week in order"
              body="Type a task the way you say it. “Call mum friday” lands on Friday. Tick it and it moves to the Logbook."
              link={{ label: "Explore Agenda", href: "/agenda" }}
            >
              <AgendaMock />
            </Row>
            <Row
              art="lilies"
              title="Memoria is a notebook with a memory"
              body="Markdown notes with live preview, a daily diary and stickers that float above every window. Imports an Obsidian vault."
            >
              <MemoriaMock />
            </Row>
            <Row
              art="dnieper"
              title="Dictation types for you, anywhere"
              body="Hold a hotkey, speak, and the text lands in whatever app has the cursor. Mail, chat, code."
            >
              <DictationMock />
            </Row>
            <Row
              art="sierra"
              title="Your computer is the cloud"
              body="Your phone syncs with your computer over the local network. Tick a task on one and watch it change on the other."
            >
              <SyncMock />
            </Row>
          </div>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2-lg" id="principles-title">
                Local-first, by design.
              </h2>
            </div>
            <ul className="cards">
              {PRINCIPLES.map(({ Icon, title, body }) => (
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

        <Cta title="Try Mundus now.">{download}</Cta>
      </main>
      <Footer />
    </>
  );
}
