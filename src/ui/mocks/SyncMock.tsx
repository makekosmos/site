import { useState } from "react";
import { Window } from "../kit";
import { Check } from "./Check";

const TASKS = ["Call Anna about the flat", "Review the onboarding draft", "Pay rent", "Pick up the bike"];

export function SyncMock() {
  const [done, setDone] = useState([false, true, false, false]);
  const [pulse, setPulse] = useState(0);

  const toggle = (i: number) => {
    setDone((all) => all.map((v, j) => (j === i ? !v : v)));
    setPulse((n) => n + 1);
  };

  const list = (compact: boolean) =>
    TASKS.map((title, i) => (
      <div key={title} className={`task${done[i] ? " is-done" : ""}${compact ? " compact" : ""}`}>
        <Check done={done[i]} onToggle={() => toggle(i)} label={title} />
        <span className="task-title">{title}</span>
      </div>
    ));

  return (
    <div className="sync">
      <div className="sync-desktop">
        <Window title="Agenda · MacBook">
          <div className="pane">
            <p className="pane-title">Today</p>
            {list(false)}
          </div>
        </Window>
      </div>
      <div className="sync-link" aria-hidden="true">
        <span key={pulse} className="sync-beam" />
        <span className="sync-label mono">Wi-Fi · direct</span>
      </div>
      <div className="phone" aria-label="Agenda on Android">
        <div className="phone-screen">
          <p className="phone-status mono">
            <span>9:41</span>
            <span>●●●</span>
          </p>
          <p className="pane-title">Today</p>
          {list(true)}
        </div>
      </div>
    </div>
  );
}
