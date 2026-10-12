import { useEffect, useRef, useState } from "react";
import { localize } from "../../i18n";
import { Window } from "../kit";

const COPY = localize({
  en: {
    spoken:
      "Hi Anna, Saturday works for me. Let's meet at the café on Rua das Flores at ten, and I will bring the keys for the flat.",
    window: "New message",
    to: "To",
    name: "Anna Petrova",
    subject: "Subject",
    topic: "Saturday",
    replay: "Replay dictation",
    phase: { idle: "Ready", listening: "Listening", done: "Inserted" },
  },
  ru: {
    spoken: "Привет, Аня! В субботу мне удобно. Давай встретимся в кафе на Rua das Flores в десять, я привезу ключи от квартиры.",
    window: "Новое письмо",
    to: "Кому",
    name: "Анна Петрова",
    subject: "Тема",
    topic: "Суббота",
    replay: "Повторить диктовку",
    phase: { idle: "Готово к записи", listening: "Слушаю", done: "Вставлено" },
  },
});

const WORDS = COPY.spoken.split(" ");

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
      <Window title={COPY.window}>
        <div className="pane mail">
          <p className="mail-field">
            <span className="faint">{COPY.to}</span> {COPY.name}
          </p>
          <p className="mail-field">
            <span className="faint">{COPY.subject}</span> {COPY.topic}
          </p>
          <p className="mail-text" aria-live="off">
            {WORDS.slice(0, count).join(" ")}
            {phase !== "done" && <i className="caret" />}
          </p>
        </div>
      </Window>
      <button type="button" className={`pill pill-${phase}`} onClick={restart} aria-label={COPY.replay}>
        <span className="pill-dot" />
        <span className="wave" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${(i * 97) % 600}ms` }} />
          ))}
        </span>
        <span className="pill-label">{COPY.phase[phase]}</span>
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
