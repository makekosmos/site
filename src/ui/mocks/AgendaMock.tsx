import { useMemo, useState, type FormEvent } from "react";
import { Archive, Calendar, Inbox, Moon } from "../../components/Icons";
import { LANG, localize } from "../../i18n";
import { Window } from "../kit";
import { Check } from "./Check";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type Day = (typeof DAYS)[number];
type List = "inbox" | "week" | "someday";
type View = List | "logbook";
type Task = { id: number; title: string; list: List; day?: Day; tag?: string; done: boolean };

const COPY = localize({
  en: {
    labels: ["Today", "Tomorrow"],
    words: { today: "today", tomorrow: "tomorrow", on: ["on"] },
    views: { inbox: "Inbox", week: "This week", someday: "Someday", logbook: "Logbook" },
    lists: "Lists",
    projects: "Projects",
    home: "Home",
    month: "Every month",
    placeholder: "New task, try “call mum friday”",
    newTask: "New task",
    empty: "Nothing here yet.",
    seed: [
      "Send the invoice to Studio North",
      "Call Anna about the flat",
      "Review the onboarding draft",
      "Pay rent",
      "Book a dentist appointment",
      "Gift idea for Mila",
      "Learn to make sourdough",
      "Weekend in Porto",
    ],
  },
  ru: {
    labels: ["Сегодня", "Завтра"],
    words: { today: "сегодня", tomorrow: "завтра", on: ["в", "во"] },
    views: { inbox: "Входящие", week: "Эта неделя", someday: "Когда-нибудь", logbook: "Журнал" },
    lists: "Списки",
    projects: "Проекты",
    home: "Дом",
    month: "Каждый месяц",
    placeholder: "Новая задача, например «позвонить маме в пятницу»",
    newTask: "Новая задача",
    empty: "Пока пусто.",
    seed: [
      "Отправить счёт в Studio North",
      "Позвонить Ане насчёт квартиры",
      "Посмотреть черновик онбординга",
      "Оплатить аренду",
      "Записаться к стоматологу",
      "Идея подарка для Милы",
      "Научиться печь хлеб на закваске",
      "Выходные в Порту",
    ],
  },
});

// 5 January 2026 was a Monday, so day i of the week is that date plus i.
const WEEKDAY = new Intl.DateTimeFormat(LANG, { weekday: "long" });
const DAY_NAMES = DAYS.map((_, i) => {
  const name = WEEKDAY.format(new Date(2026, 0, 5 + i));
  return name[0].toUpperCase() + name.slice(1);
});
const dayName = (day: Day) => DAY_NAMES[DAYS.indexOf(day)];

const today = DAYS[(new Date().getDay() + 6) % 7];
const dayAfter = (day: Day, n: number) => DAYS[(DAYS.indexOf(day) + n) % 7];

const [s1, s2, s3, s4, s5, s6, s7, s8] = COPY.seed;
const SEED: Task[] = [
  { id: 1, title: s1, list: "week", day: today, done: true },
  { id: 2, title: s2, list: "week", day: today, tag: COPY.home, done: false },
  { id: 3, title: s3, list: "week", day: dayAfter(today, 1), tag: "Studio North", done: false },
  { id: 4, title: s4, list: "week", day: dayAfter(today, 3), tag: COPY.month, done: false },
  { id: 5, title: s5, list: "inbox", done: false },
  { id: 6, title: s6, list: "inbox", done: false },
  { id: 7, title: s7, list: "someday", done: false },
  { id: 8, title: s8, list: "someday", done: false },
];

const VIEWS: { id: View; label: string; icon: typeof Inbox }[] = [
  { id: "inbox", label: COPY.views.inbox, icon: Inbox },
  { id: "week", label: COPY.views.week, icon: Calendar },
  { id: "someday", label: COPY.views.someday, icon: Moon },
  { id: "logbook", label: COPY.views.logbook, icon: Archive },
];

// "dentist friday" lands on Friday, "call mum tomorrow" on the next day, anything else in the Inbox.
function parse(text: string): Pick<Task, "title" | "list" | "day"> {
  const words = text.trim().split(/\s+/);
  const last = words.at(-1)?.toLowerCase() ?? "";
  const day =
    last === COPY.words.today
      ? today
      : last === COPY.words.tomorrow
        ? dayAfter(today, 1)
        : DAYS.find((d) => last.length >= 3 && dayName(d).toLowerCase().startsWith(last.slice(0, 3)));
  if (!day || words.length < 2) return { title: text.trim(), list: "inbox" };
  const rest = words.slice(0, -1);
  if (rest.length > 1 && COPY.words.on.includes(rest.at(-1)!.toLowerCase())) rest.pop();
  const title = rest.join(" ");
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
          .map((day, i) => ({ label: COPY.labels[i] ?? dayName(day), tasks: shown.filter((t) => t.day === day) }))
          .filter((g) => g.tasks.length)
      : [{ label: "", tasks: shown }];

  return (
    <Window title="Agenda">
      <nav className="side" aria-label={COPY.lists}>
        {VIEWS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className="side-item" aria-pressed={view === id} onClick={() => setView(id)}>
            <Icon />
            {label}
            {counts[id] > 0 && <em>{counts[id]}</em>}
          </button>
        ))}
        <span className="side-label">{COPY.projects}</span>
        <span className="side-item">
          <i className="swatch" style={{ background: "#d69bd2" }} />
          {COPY.home}
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
            placeholder={COPY.placeholder}
            aria-label={COPY.newTask}
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
        {shown.length === 0 && <p className="empty">{COPY.empty}</p>}
      </div>
    </Window>
  );
}
