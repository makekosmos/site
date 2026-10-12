import { useEffect, useRef, useState } from "react";
import { Window } from "../kit";

const SPOKEN =
  "Hi Anna, Saturday works for me. Let's meet at the café on Rua das Flores at ten, and I will bring the keys for the flat.";
const WORDS = SPOKEN.split(" ");

type Phase = "idle" | "listening" | "done";

export function DictationMock() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      setCount(WORDS.length);
      return;
    }
    if (!visible) return;
    let words = 0;
    let timer = setTimeout(function tick() {
      setPhase("listening");
      words += 1;
      setCount(words);
      timer = words < WORDS.length ? setTimeout(tick, 120 + Math.random() * 120) : setTimeout(() => setPhase("done"), 500);
    }, 900);
    return () => clearTimeout(timer);
  }, [visible, run]);

  useEffect(() => {
    if (phase !== "done" || !visible || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(restart, 3200);
    return () => clearTimeout(timer);
  }, [phase, visible]);

  function restart() {
    setPhase("idle");
    setCount(0);
    setRun((n) => n + 1);
  }

  return (
    <div className="dictation" ref={root}>
      <Window title="New message">
        <div className="pane mail">
          <p className="mail-field">
            <span className="faint">To</span> Anna Petrova
          </p>
          <p className="mail-field">
            <span className="faint">Subject</span> Saturday
          </p>
          <p className="mail-text" aria-live="off">
            {WORDS.slice(0, count).join(" ")}
            {phase !== "done" && <i className="caret" />}
          </p>
        </div>
      </Window>
      <button type="button" className={`pill pill-${phase}`} onClick={restart} aria-label="Replay dictation">
        <span className="pill-dot" />
        <span className="wave" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${(i * 97) % 600}ms` }} />
          ))}
        </span>
        <span className="pill-label">{phase === "done" ? "Inserted" : phase === "listening" ? "Listening" : "Ready"}</span>
        <kbd>⌥ Space</kbd>
      </button>
    </div>
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}
