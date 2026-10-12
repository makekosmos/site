import { useRef, useState, type PointerEvent } from "react";
import { Calendar, Doc } from "../../components/Icons";
import { localize } from "../../i18n";
import { Window } from "../kit";
import { Check } from "./Check";

const COPY = localize({
  en: {
    diary: "Today's diary",
    vault: "Vault",
    notes: "Notes",
    mode: "Editor mode",
    preview: "Preview",
    files: ["Lisbon trip", "Packing list", "Reading 2026", "Studio North / brief"],
    flights: ["Flights on ", "May 14", ", back on the 20th. Stay near ", ", walk everywhere."],
    sort: "To sort out",
    todo: ["Book the flat", "Ask Anna about the tram pass", "Print the "],
    quote: "Eat pastéis at Manteigaria, not Belém.",
    sticker: "Buy a SIM card at the airport",
    drag: "Drag me",
  },
  ru: {
    diary: "Дневник за сегодня",
    vault: "Хранилище",
    notes: "Заметки",
    mode: "Режим редактора",
    preview: "Превью",
    files: ["Поездка в Лиссабон", "Список вещей", "Чтение 2026", "Studio North / бриф"],
    flights: ["Вылет ", "14 мая", ", обратно 20-го. Жить рядом с ", ", ходить пешком."],
    sort: "Разобраться",
    todo: ["Забронировать квартиру", "Спросить Аню про проездной", "Распечатать "],
    quote: "Паштейш есть в Manteigaria, а не в Белене.",
    sticker: "Купить SIM-карту в аэропорту",
    drag: "Перетащите",
  },
});

const [TRIP, PACKING] = COPY.files;
const [f1, f2, f3, f4] = COPY.flights;
const [t1, t2, t3] = COPY.todo;
const SOURCE = `# ${TRIP}

${f1}**${f2}**${f3}
[[Alfama]]${f4}

## ${COPY.sort}
- [x] ${t1}
- [ ] ${t2}
- [ ] ${t3}[[${PACKING}]]

> ${COPY.quote}`;

export function MemoriaMock() {
  const [mode, setMode] = useState<"preview" | "source">("preview");
  const [todo, setTodo] = useState([true, false, false]);
  const sticker = useDrag();

  const flip = (i: number) => setTodo((all) => all.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="memoria" ref={sticker.bounds}>
      <Window title="Memoria">
        <nav className="side" aria-label={COPY.notes}>
          <button type="button" className="side-item">
            <Calendar />
            {COPY.diary}
          </button>
          <span className="side-label">{COPY.vault}</span>
          {COPY.files.map((file, i) => (
            <button key={file} type="button" className="side-item" aria-pressed={i === 0}>
              <Doc />
              {file}
            </button>
          ))}
        </nav>
        <div className="pane note">
          <div className="segmented" role="group" aria-label={COPY.mode}>
            {(["preview", "source"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {m === "preview" ? COPY.preview : "Markdown"}
              </button>
            ))}
          </div>
          {mode === "source" ? (
            <pre className="note-source">{SOURCE}</pre>
          ) : (
            <div className="note-body">
              <h4>{TRIP}</h4>
              <p>
                {f1}
                <strong>{f2}</strong>
                {f3}
                <span className="wikilink">Alfama</span>
                {f4}
              </p>
              <h5>{COPY.sort}</h5>
              {[t1, t2, t3 + PACKING].map((item, i) => (
                <div key={item} className={`task${todo[i] ? " is-done" : ""}`}>
                  <Check done={todo[i]} onToggle={() => flip(i)} label={item} />
                  <span className="task-title">
                    {i === 2 ? (
                      <>
                        {t3}
                        <span className="wikilink">{PACKING}</span>
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </div>
              ))}
              <blockquote>{COPY.quote}</blockquote>
            </div>
          )}
        </div>
      </Window>
      <div
        className="sticker"
        style={{ transform: `translate(${sticker.pos.x}px, ${sticker.pos.y}px) rotate(-3deg)` }}
        {...sticker.handlers}
      >
        <span className="sticker-grip" aria-hidden="true" />
        {COPY.sticker}
        <small>{COPY.drag}</small>
      </div>
    </div>
  );
}

// Floating stickers stay on top of every window; here one drags within the stage.
function useDrag() {
  const bounds = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handlers = {
    onPointerDown(e: PointerEvent<HTMLDivElement>) {
      e.currentTarget.setPointerCapture(e.pointerId);
      start.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
    },
    onPointerMove(e: PointerEvent<HTMLDivElement>) {
      const s = start.current;
      const box = bounds.current?.getBoundingClientRect();
      if (!s || !box) return;
      const limitX = box.width * 0.75;
      const limitY = box.height * 0.6;
      setPos({
        x: Math.max(-limitX, Math.min(40, s.px + e.clientX - s.x)),
        y: Math.max(-40, Math.min(limitY, s.py + e.clientY - s.y)),
      });
    },
    onPointerUp() {
      start.current = null;
    },
  };

  return { bounds, pos, handlers };
}
