import { LANG } from "../i18n";
import "./features.css";

export type Status = "yes" | "partial" | "no";
type Label = { name: string; note?: string };
export type Platform<Id extends string> = { id: Id; label: string };
export type Feature<Id extends string> = Label & { ru: Label } & Record<Id, Status>;
export type FeatureGroup<Id extends string> = { name: string; ru: string; features: Feature<Id>[] };

type Props<Id extends string> = {
  groups: FeatureGroup<Id>[];
  platforms: readonly Platform<Id>[];
  featureLabel: string;
  status: Record<Status, string>;
};

const label = <Id extends string>(f: Feature<Id>): Label => (LANG === "ru" ? f.ru : f);

export function featureTotal<Id extends string>(groups: FeatureGroup<Id>[]) {
  return groups.reduce((n, g) => n + g.features.length, 0);
}

export function FeatureTable<Id extends string>({ groups, platforms, featureLabel, status }: Props<Id>) {
  const total = featureTotal(groups);
  const count = (id: Id) => groups.reduce((n, g) => n + g.features.filter((f) => f[id] === "yes").length, 0);

  return (
    <>
      <div className="table-card">
        <table className="features">
          <thead>
            <tr>
              <th scope="col">{featureLabel}</th>
              {platforms.map((p) => (
                <th key={p.id} scope="col" className="platform">
                  {p.label}
                  <span className="score mono">
                    {count(p.id)}/{total}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.name}>
              <tr className="group">
                <th colSpan={platforms.length + 1} scope="colgroup">
                  {LANG === "ru" ? group.ru : group.name}
                </th>
              </tr>
              {group.features.map((f) => (
                <tr key={f.name}>
                  <th scope="row">
                    {label(f).name}
                    {label(f).note && <span className="note-text">{label(f).note}</span>}
                  </th>
                  {platforms.map((p) => (
                    <td key={p.id}>
                      <span className={`mark ${f[p.id]}`} title={status[f[p.id]]} />
                      <span className="sr">{status[f[p.id]]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="legend">
        {(Object.keys(status) as Status[]).map((key) => (
          <li key={key}>
            <span className={`mark ${key}`} aria-hidden="true" /> {status[key]}
          </li>
        ))}
      </ul>
    </>
  );
}
