import { useState } from "react";
import { Shelled, Window } from "../kit";
import { AgendaMock } from "./AgendaMock";
import { DictationMock } from "./DictationMock";
import { MemoriaMock } from "./MemoriaMock";

const APPS = [
  { id: "agenda", name: "Agenda", icon: "/apps/agenda.png", View: AgendaMock },
  { id: "memoria", name: "Memoria", icon: "/apps/memoria.png", View: MemoriaMock },
  { id: "dictation", name: "Dictation", icon: "/apps/dictation.png", View: DictationMock },
] as const;

export function MundusMock() {
  const [app, setApp] = useState<(typeof APPS)[number]["id"]>("agenda");
  const { View } = APPS.find((a) => a.id === app)!;

  return (
    <Window title="Mundus">
      <nav className="rail" aria-label="Apps">
        {APPS.map((a) => (
          <button
            key={a.id}
            type="button"
            className="rail-app"
            aria-pressed={a.id === app}
            aria-label={a.name}
            title={a.name}
            onClick={() => setApp(a.id)}
          >
            <img src={a.icon} alt="" width={26} height={26} />
          </button>
        ))}
      </nav>
      <div className="shell-app" key={app}>
        <Shelled.Provider value={true}>
          <View />
        </Shelled.Provider>
      </div>
    </Window>
  );
}
