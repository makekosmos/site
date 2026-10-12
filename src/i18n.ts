export type Lang = "en" | "ru";

const KEY = "lang";

function stored(): Lang | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "en" || value === "ru" ? value : null;
  } catch {
    return null;
  }
}

// A choice made in the footer wins; otherwise the browser's first preferred language picks the copy.
export const LANG: Lang =
  stored() ??
  ((navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase().startsWith("ru") ? "ru" : "en");

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Storage blocked: the choice lasts only until reload.
    return;
  }
  location.reload();
}

export function localize<T>(copy: Record<Lang, T>): T {
  return copy[LANG];
}
