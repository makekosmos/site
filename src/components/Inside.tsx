import { CONTACT_EMAIL } from "../links";
import type { Release } from "../useLatestRelease";
import { ArrowUpRight, Mail } from "./Icons";

const APPS = [
  { name: "Агенда", icon: "/apps/agenda.png" },
  { name: "Memoria", icon: "/apps/memoria.png" },
  { name: "Диктовка", icon: "/apps/dictation.png" },
];

export function Inside({ release }: { release: Release | null }) {
  return (
    <footer className="inside">
      <div className="inside-center">
        <ul className="inside-apps reveal" style={{ "--i": 4 } as React.CSSProperties} aria-label="Внутри Mundus">
          {APPS.map(({ name, icon }) => (
            <li key={name} className="app" tabIndex={0}>
              <img className="app-icon" src={icon} alt="" width={28} height={28} />
              <span className="app-name">
                <span>{name}</span>
              </span>
            </li>
          ))}
        </ul>
        {release && (
          <a className="glass-pill whats-new" href={release.url}>
            Что нового в v{release.version}
            <ArrowUpRight />
          </a>
        )}
      </div>
      <a className="app contact" href={`mailto:${CONTACT_EMAIL}`} aria-label={`Написать на ${CONTACT_EMAIL}`}>
        <span className="app-name">
          <span>{CONTACT_EMAIL}</span>
        </span>
        <span className="contact-icon">
          <Mail />
        </span>
      </a>
    </footer>
  );
}
