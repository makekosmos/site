import { useRef, useState, type PointerEvent } from "react";
import { Calendar, Doc } from "../../components/Icons";
import { Window } from "../kit";
import { Check } from "./Check";

const FILES = ["Lisbon trip", "Packing list", "Reading 2026", "Studio North / brief"];

const SOURCE = `# Lisbon trip

Flights on **May 14**, back on the 20th. Stay near
[[Alfama]], walk everywhere.

## To sort out
- [x] Book the flat
- [ ] Ask Anna about the tram pass
- [ ] Print the [[Packing list]]

> Eat pastéis at Manteigaria, not Belém.`;

export function MemoriaMock() {
  const [mode, setMode] = useState<"preview" | "source">("preview");
  const [todo, setTodo] = useState([true, false, false]);
  const sticker = useDrag();

  const flip = (i: number) => setTodo((all) => all.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="memoria" ref={sticker.bounds}>
      <Window title="Memoria">
        <nav className="side" aria-label="Notes">
          <button type="button" className="side-item">
            <Calendar />
            Today's diary
          </button>
          <span className="side-label">Vault</span>
          {FILES.map((file, i) => (
            <button key={file} type="button" className="side-item" aria-pressed={i === 0}>
              <Doc />
              {file}
            </button>
          ))}
        </nav>
        <div className="pane note">
          <div className="segmented" role="group" aria-label="Editor mode">
            {(["preview", "source"] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {m === "preview" ? "Preview" : "Markdown"}
              </button>
            ))}
          </div>
          {mode === "source" ? (
            <pre className="note-source">{SOURCE}</pre>
          ) : (
            <div className="note-body">
              <h4>Lisbon trip</h4>
              <p>
                Flights on <strong>May 14</strong>, back on the 20th. Stay near <span className="wikilink">Alfama</span>, walk everywhere.
              </p>
              <h5>To sort out</h5>
              {["Book the flat", "Ask Anna about the tram pass", "Print the packing list"].map((item, i) => (
                <div key={item} className={`task${todo[i] ? " is-done" : ""}`}>
                  <Check done={todo[i]} onToggle={() => flip(i)} label={item} />
                  <span className="task-title">
                    {i === 2 ? (
                      <>
                        Print the <span className="wikilink">Packing list</span>
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </div>
              ))}
              <blockquote>Eat pastéis at Manteigaria, not Belém.</blockquote>
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
        Buy a SIM card at the airport
        <small>Drag me</small>
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
