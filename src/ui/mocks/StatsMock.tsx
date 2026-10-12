import { Window } from "../kit";

const WEEK = [
  { day: "Mon", done: 5 },
  { day: "Tue", done: 3 },
  { day: "Wed", done: 6 },
  { day: "Thu", done: 2 },
  { day: "Fri", done: 4 },
  { day: "Sat", done: 1 },
  { day: "Sun", done: 2 },
];
const MAX = Math.max(...WEEK.map((d) => d.done));
const TOTAL = WEEK.reduce((n, d) => n + d.done, 0);

export function StatsMock() {
  return (
    <Window title="Agenda · Logbook">
      <div className="pane">
        <p className="pane-title">This week</p>
        <div className="stats">
          <p className="stat">
            <b>{TOTAL}</b>
            <span>tasks done</span>
          </p>
          <p className="stat">
            <b>6 days</b>
            <span>streak</span>
          </p>
          <p className="stat">
            <b>{(TOTAL / WEEK.length).toFixed(1)}</b>
            <span>a day</span>
          </p>
        </div>
        <div className="bars" role="img" aria-label={`Tasks done per day: ${WEEK.map((d) => `${d.day} ${d.done}`).join(", ")}`}>
          {WEEK.map((d, i) => (
            <span key={d.day} className="bar" style={{ "--h": `${(d.done / MAX) * 100}%`, "--i": i } as React.CSSProperties}>
              <span>{d.day}</span>
            </span>
          ))}
        </div>
      </div>
    </Window>
  );
}
