import { DOWNLOAD_URL, RELEASES_URL, REPO_URL } from "../links";
import { ArrowRight } from "./Icons";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="nav">
      <a className="brand" href="/" aria-label="Mundus">
        <Logo />
        <span>Mundus</span>
      </a>
      <nav className="nav-links" aria-label="Ссылки">
        <a href={RELEASES_URL}>Релизы</a>
        <a href={REPO_URL}>GitHub</a>
      </nav>
      <a className="pill pill-sm" href={DOWNLOAD_URL}>
        Скачать
        <ArrowRight />
      </a>
    </header>
  );
}
