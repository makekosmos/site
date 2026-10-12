import { Hero } from "./components/Hero";
import { ArrowRight, Branch, Lock, Monitor, Phone, Sparkles, Timer } from "./components/Icons";
import { DOWNLOAD_URL, RELEASES_URL } from "./links";
import { CtaPanel, Footer, Nav, SectionHead } from "./ui/kit";
import { useLatestRelease } from "./useLatestRelease";

const APPS = [
  {
    name: "Agenda",
    icon: "/apps/agenda.png",
    body: "Tasks for the day, the week and someday. On Windows, macOS and Android.",
    href: "/agenda",
  },
  { name: "Memoria", icon: "/apps/memoria.png", body: "Markdown notes with live preview, a diary and floating stickers. Imports an Obsidian vault." },
  { name: "Dictation", icon: "/apps/dictation.png", body: "Press a hotkey, speak, and the text lands in whatever app you are in." },
];

const PRINCIPLES = [
  {
    icon: Lock,
    title: "Your data stays home",
    body: "Everything lives in the Mundus Engine on your computer, not on someone else's server.",
  },
  {
    icon: Phone,
    title: "Straight to your phone",
    body: "Agenda syncs from your computer to Android directly. No account, no cloud copy.",
  },
  { icon: Sparkles, title: "Native agents", body: "Agents work inside Mundus and lend a hand with what you keep." },
  { icon: Timer, title: "One place to focus", body: "Tasks, notes, dictation and focus together, so you stop switching." },
  { icon: Monitor, title: "Windows and macOS", body: "A native desktop app for both, from the same code." },
  { icon: Branch, title: "Built in the open", body: "Every release and its notes are published on GitHub." },
];

export default function App() {
  const release = useLatestRelease();

  return (
    <>
      <Nav />
      <main>
        <Hero release={release} />

        <section className="section" id="apps">
          <div className="wrap">
            <SectionHead
              eyebrow="Inside Mundus"
              title={
                <>
                  Three apps, <span className="accent">one</span> world.
                </>
              }
            >
              <p className="lede">Each app does one thing well. Together they share your day.</p>
            </SectionHead>
            <ul className="grid apps" role="list">
              {APPS.map((app) => (
                <li key={app.name} className="card tile app-card">
                  <img src={app.icon} alt="" width={44} height={44} />
                  <h3>{app.name}</h3>
                  <p>{app.body}</p>
                  {app.href ? (
                    <a className="btn btn-ghost btn-sm" href={app.href}>
                      Explore {app.name}
                      <ArrowRight />
                    </a>
                  ) : (
                    <span className="chip">In Mundus</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section principles">
          <div className="wrap">
            <SectionHead
              eyebrow="Local-first"
              title={
                <>
                  Your computer is the <span className="accent">cloud</span>.
                </>
              }
            />
            <ul className="grid" role="list">
              {PRINCIPLES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="card tile">
                  <span className="icon-tile">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaPanel
          eyebrow={release ? `Beta · v${release.version}` : "Beta"}
          title={
            <>
              Bring everything that matters <span className="accent">home</span>.
            </>
          }
          actions={
            <>
              <a className="btn btn-primary" href={DOWNLOAD_URL}>
                Download Mundus
                <ArrowRight />
              </a>
              <a className="btn btn-ghost" href={release?.url ?? RELEASES_URL}>
                Release notes
              </a>
            </>
          }
        >
          <p className="muted">Mundus for macOS and Windows. Agenda for Android.</p>
        </CtaPanel>
      </main>
      <Footer />
    </>
  );
}
