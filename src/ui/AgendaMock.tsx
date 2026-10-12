import { Window } from "./kit";

const SIDE = [
  { name: "Inbox", count: 3 },
  { name: "This week", active: true },
  { name: "Next week" },
  { name: "Someday" },
  { name: "Logbook" },
];

const WEEK = [
  { day: "Monday", tasks: [{ title: "Send the invoice to Studio North", done: true }] },
  {
    day: "Tuesday",
    tasks: [
      { title: "Call Anna about the flat", tags: ["Home"] },
      { title: "Review the draft", tags: ["Due Wed"] },
    ],
  },
  { day: "Thursday", tasks: [{ title: "Pay rent", tags: ["Every month"] }] },
];

export function AgendaMock() {
  return (
    <Window title="Agenda">
      <aside className="window-side">
        {SIDE.map((item) => (
          <span key={item.name} className={`side-item${item.active ? " active" : ""}`}>
            {item.name}
            {item.count && <em>{item.count}</em>}
          </span>
        ))}
        <span className="side-label">Projects</span>
        <span className="side-item">Home</span>
        <span className="side-item">Studio North</span>
      </aside>
      <div className="window-main">
        <p className="window-title">This week</p>
        <p className="entry">New task, e.g. “dentist on friday”</p>
        {WEEK.map((d) => (
          <div key={d.day} className="day">
            <span className="day-name">{d.day}</span>
            {d.tasks.map((task) => (
              <span key={task.title} className={`task${"done" in task ? " done" : ""}`}>
                <i className="box" />
                {task.title}
                {"tags" in task && task.tags.map((tag) => <small key={tag}>{tag}</small>)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}
