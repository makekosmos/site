import { LANG, localize } from "../../i18n";
import { Window } from "../kit";

const COPY = localize({
  en: { window: "Agenda · Logbook", title: "This week", done: "tasks done", streak: "6 days", streakLabel: "streak", daily: "a day", aria: "Tasks done per day" },
  ru: { window: "Agenda · Журнал", title: "Эта неделя", done: "задач сделано", streak: "6 дней", streakLabel: "подряд", daily: "в день", aria: "Задач сделано по дням" },
});

// 5 January 2026 was a Monday.
const SHORT = new Intl.DateTimeFormat(LANG, { weekday: "short" });
const WEEK = [5, 3, 6, 2, 4, 1, 2].map((done, i) => ({ day: SHORT.format(new Date(2026, 0, 5 + i)), done }));
const MAX = Math.max(...WEEK.map((d) => d.done));
const TOTAL = WEEK.reduce((n, d) => n + d.done, 0);

export function StatsMock() {
  return (
    <Window title={COPY.window}>
      <div className="pane">
        <p className="pane-title">{COPY.title}</p>
        <div className="stats">
          <p className="stat">
            <b>{TOTAL}</b>
            <span>{COPY.done}</span>
          </p>
          <p className="stat">
            <b>{COPY.streak}</b>
            <span>{COPY.streakLabel}</span>
          </p>
          <p className="stat">
            <b>{(TOTAL / WEEK.length).toFixed(1)}</b>
            <span>{COPY.daily}</span>
          </p>
        </div>
        <div className="bars" role="img" aria-label={`${COPY.aria}: ${WEEK.map((d) => `${d.day} ${d.done}`).join(", ")}`}>
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
