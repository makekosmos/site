import { Hero } from "./components/Hero";
import { Inside } from "./components/Inside";
import { Nav } from "./components/Nav";
import { Sky } from "./components/Sky";
import { useLatestRelease } from "./useLatestRelease";

export default function App() {
  const release = useLatestRelease();

  return (
    <div className="page">
      <Sky />
      <Nav />
      <main className="main">
        <Hero release={release} />
      </main>
      <Inside release={release} />
    </div>
  );
}
