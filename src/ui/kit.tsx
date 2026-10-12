import type { ReactNode } from "react";
import { ArrowRight } from "../components/Icons";
import { Logo } from "../components/Logo";
import { CONTACT_EMAIL, DOWNLOAD_URL, RELEASES_URL, REPO_URL } from "../links";
import { Halftone } from "./Halftone";

const NAV = [
  { label: "Apps", href: "/#apps" },
  { label: "Agenda", href: "/agenda" },
  { label: "Releases", href: RELEASES_URL },
  { label: "GitHub", href: REPO_URL },
];

export function Nav({ current }: { current?: string }) {
  return (
    <div className="nav-shell">
      <header className="nav">
        <a className="brand" href="/" aria-label="Mundus home">
          <Logo />
          <span>Mundus</span>
        </a>
        <nav className="nav-links" aria-label="Site">
          {NAV.map((link) => (
            <a key={link.label} href={link.href} aria-current={link.href === current ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary btn-sm" href={DOWNLOAD_URL}>
          Download
          <ArrowRight />
        </a>
      </header>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-head${center ? " center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading">{title}</h2>
      {children}
    </div>
  );
}

export function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="window" style={{ margin: 0 }} aria-label={title}>
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

export function CtaPanel({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="card cta-panel">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="heading">{title}</h2>
            {children}
            <div className="actions">{actions}</div>
          </div>
          <div className="cta-art" aria-hidden="true">
            <Halftone />
          </div>
        </div>
      </div>
    </section>
  );
}

const FOOTER = [
  {
    title: "Apps",
    links: [
      { label: "Agenda", href: "/agenda" },
      { label: "Agenda for Android", href: "https://github.com/makekosmos/agenda-android/releases/latest" },
    ],
  },
  {
    title: "Mundus",
    links: [
      { label: "Download", href: DOWNLOAD_URL },
      { label: "Releases", href: RELEASES_URL },
      { label: "GitHub", href: REPO_URL },
    ],
  },
  { title: "Contact", links: [{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }] },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <a className="brand" href="/">
            <Logo />
            <span>Mundus</span>
          </a>
          <div className="footer-cols">
            {FOOTER.map((col) => (
              <div key={col.title} className="footer-col">
                <p className="eyebrow">{col.title}</p>
                {col.links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          Mundus
        </p>
        <p className="footer-note">Local-first. Your data stays on your devices.</p>
      </div>
    </footer>
  );
}
