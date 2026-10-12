import { useMemo, useState, type FormEvent } from "react";
import { Archive, Calendar, Inbox, Moon } from "../../components/Icons";
import { Window } from "../kit";
import { Check } from "./Check";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type Day = (typeof DAYS)[number];
type List = "inbox" | "week" | "someday";
type View = List | "logbook";
type Task = { id: number; title: string; list: List; day?: Day; tag?: string; done: boolean };

const today = DAYS[(new Date().getDay() + 6) % 7];
const dayAfter = (day: Day, n: number) => DAYS[(DAYS.indexOf(day) + n) % 7];
const LABELS = ["Today", "Tomorrow"];

const SEED: Task[] = [
  { id: 1, title: "Send the invoice to Studio North", list: "week", day: today, done: true },
  { id: 2, title: "Call Anna about the flat", list: "week", day: today, tag: "Home", done: false },
  { id: 3, title: "Review the onboarding draft", list: "week", day: dayAfter(today, 1), tag: "Studio North", done: false },
  { id: 4, title: "Pay rent", list: "week", day: dayAfter(today, 3), tag: "Every month", done: false },
  { id: 5, title: "Book a dentist appointment", list: "inbox", done: false },
  { id: 6, title: "Gift idea for Mila", list: "inbox", done: false },
  { id: 7, title: "Learn to make sourdough", list: "someday", done: false },
  { id: 8, title: "Weekend in Porto", list: "someday", done: false },
];

const VIEWS: { id: View; label: string; icon: typeof Inbox }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "week", label: "This week", icon: Calendar },
  { id: "someday", label: "Someday", icon: Moon },
  { id: "logbook", label: "Logbook", icon: Archive },
];

// "dentist friday" lands on Friday, "call mum tomorrow" on the next day, anything else in the Inbox.
function parse(text: string): Pick<Task, "title" | "list" | "day"> {
  const words = text.trim().split(/\s+/);
  const last = words.at(-1)?.toLowerCase() ?? "";
  const day =
    last === "today"
      ? today
      : last === "tomorrow"
        ? dayAfter(today, 1)
        : DAYS.find((d) => d.toLowerCase() === last || d.toLowerCase().slice(0, 3) === last);
  if (!day || words.length < 2) return { title: text.trim(), list: "inbox" };
  const title = words.slice(0, -1).join(" ");
  return { title: title[0].toUpperCase() + title.slice(1), list: "week", day };
}

export function AgendaMock({ initial = "week" }: { initial?: View }) {
  const [tasks, setTasks] = useState(SEED);
  const [view, setView] = useState<View>(initial);
  const [draft, setDraft] = useState("");

  const toggle = (id: number) => setTasks((all) => all.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const add = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    const task = { id: Date.now(), done: false, ...parse(draft) };
    setTasks((all) => [...all, task]);
    setView(task.list);
    setDraft("");
  };

  const counts = useMemo(
    () => ({
      inbox: tasks.filter((t) => t.list === "inbox" && !t.done).length,
      week: tasks.filter((t) => t.list === "week" && !t.done).length,
      someday: tasks.filter((t) => t.list === "someday" && !t.done).length,
      logbook: tasks.filter((t) => t.done).length,
    }),
    [tasks],
  );

  const shown = view === "logbook" ? tasks.filter((t) => t.done) : tasks.filter((t) => t.list === view);
  const groups =
    view === "week"
      ? DAYS.map((_, i) => dayAfter(today, i))
          .map((day, i) => ({ label: LABELS[i] ?? day, tasks: shown.filter((t) => t.day === day) }))
          .filter((g) => g.tasks.length)
      : [{ label: "", tasks: shown }];

  return (
    <Window title="Agenda">
      <nav className="side" aria-label="Lists">
        {VIEWS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className="side-item" aria-pressed={view === id} onClick={() => setView(id)}>
            <Icon />
            {label}
            {counts[id] > 0 && <em>{counts[id]}</em>}
          </button>
        ))}
        <span className="side-label">Projects</span>
        <span className="side-item">
          <i className="swatch" style={{ background: "#d69bd2" }} />
          Home
        </span>
        <span className="side-item">
          <i className="swatch" style={{ background: "#9d8bff" }} />
          Studio North
        </span>
      </nav>
      <div className="pane agenda-pane">
        <p className="pane-title">{VIEWS.find((v) => v.id === view)?.label}</p>
        <form className="entry" onSubmit={add}>
          <span aria-hidden="true">+</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="New task, try “call mum friday”"
            aria-label="New task"
          />
          {draft && <kbd>Enter</kbd>}
        </form>
        {groups.map((group) => (
          <div key={group.label} className="day">
            {group.label && <p className="day-name">{group.label}</p>}
            {group.tasks.map((task) => (
              <div key={task.id} className={`task${task.done ? " is-done" : ""}`}>
                <Check done={task.done} onToggle={() => toggle(task.id)} label={task.title} />
                <span className="task-title">{task.title}</span>
                {task.tag && <small>{task.tag}</small>}
              </div>
            ))}
          </div>
        ))}
        {shown.length === 0 && <p className="empty">Nothing here yet.</p>}
      </div>
    </Window>
  );
}
