import { createContext, useContext, type ReactNode } from "react";
import { ArrowRight } from "../components/Icons";
import { LANG, localize, setLang, type Lang } from "../i18n";
import { CONTACT_EMAIL, DOWNLOAD_URL, RELEASES_URL, REPO_URL } from "../links";

const COPY = localize({
  en: {
    home: "Home",
    homeLabel: "Mundus home",
    download: "Download",
    preview: "app preview",
    apps: "Apps",
    releases: "Releases",
    contact: "Contact",
    tagline: "Local-first. Your data stays on your devices.",
  },
  ru: {
    home: "Главная",
    homeLabel: "Главная Mundus",
    download: "Скачать",
    preview: "превью приложения",
    apps: "Приложения",
    releases: "Релизы",
    contact: "Контакты",
    tagline: "Local-first. Ваши данные остаются на ваших устройствах.",
  },
});

const NAV = [
  { label: COPY.home, href: "/" },
  { label: "Agenda", href: "/agenda" },
];

export function Nav({ current }: { current?: string }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="/" aria-label={COPY.homeLabel}>
          <img src="/mundus-icon.png" alt="" width={22} height={22} />
          Mundus
        </a>
        <nav className="nav-links" aria-label="Site">
          {NAV.map((link) => (
            <a key={link.label} href={link.href} aria-current={link.href === current ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <a className="btn btn-outline btn-sm" href={REPO_URL}>
            GitHub
          </a>
          <a className="btn btn-light btn-sm" href={DOWNLOAD_URL}>
            {COPY.download}
          </a>
        </div>
      </div>
    </header>
  );
}

// Inside the Mundus shell an app has no chrome of its own, only its body.
export const Shelled = createContext(false);

export function Window({ title, children }: { title: string; children: ReactNode }) {
  if (useContext(Shelled)) return <div className="window-body">{children}</div>;
  return (
    <figure className="window" aria-label={`${title} ${COPY.preview}`}>
      <div className="window-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="window-body">{children}</div>
    </figure>
  );
}

// Public-domain paintings, via Wikimedia Commons.
const ART = {
  haystacks: { artist: "Claude Monet", title: "Haystacks, end of Summer", year: "1891" },
  sierra: { artist: "Albert Bierstadt", title: "Among the Sierra Nevada, California", year: "1868" },
  fuji: { artist: "Katsushika Hokusai", title: "Fine Wind, Clear Morning", year: "c. 1831" },
  etretat: { artist: "Claude Monet", title: "The Beach at Étretat", year: "1885" },
  pines: { artist: "Ivan Shishkin", title: "Morning in a Pine Forest", year: "1889" },
} as const;

export type Art = keyof typeof ART;

export function Stage({ art, children, className = "" }: { art: Art; children: ReactNode; className?: string }) {
  const { artist, title, year } = ART[art];
  return (
    <div className={`stage ${className}`}>
      <img className="stage-art" src={`/art/${art}.webp`} alt="" loading="lazy" decoding="async" />
      {children}
      <small className="stage-credit">
        {artist}, <i>{title}</i>, {year}
      </small>
    </div>
  );
}

export function Row({
  title,
  body,
  link,
  art,
  children,
}: {
  title: string;
  body: string;
  link?: { label: string; href: string };
  art: Art;
  children: ReactNode;
}) {
  return (
    <article className="row rise">
      <div className="row-copy">
        <h3 className="h2">{title}</h3>
        <p className="h2 muted">{body}</p>
        {link && (
          <a className="link" href={link.href}>
            {link.label}
            <ArrowRight />
          </a>
        )}
      </div>
      <Stage art={art}>{children}</Stage>
    </article>
  );
}

export function Cta({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="wrap cta">
      <h2 className="h2-lg">{title}</h2>
      <div className="actions">{children}</div>
    </section>
  );
}

const FOOTER = [
  {
    title: COPY.apps,
    links: [
      { label: "Agenda", href: "/agenda" },
    ],
  },
  {
    title: "Mundus",
    links: [
      { label: COPY.download, href: DOWNLOAD_URL },
      { label: COPY.releases, href: RELEASES_URL },
      { label: "GitHub", href: REPO_URL },
    ],
  },
  { title: COPY.contact, links: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }] },
];

const LANGS: [Lang, string][] = [
  ["en", "English"],
  ["ru", "Русский"],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <a className="brand" href="/">
            <img src="/mundus-icon.png" alt="" width={22} height={22} />
            Mundus
          </a>
          {FOOTER.map((col) => (
            <div key={col.title} className="footer-col">
              <p>{col.title}</p>
              {col.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Mundus</span>
          <span>{COPY.tagline}</span>
          <div className="segmented" role="group" aria-label="Language">
            {LANGS.map(([lang, label]) => (
              <button key={lang} type="button" lang={lang} aria-pressed={lang === LANG} onClick={() => setLang(lang)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
