export type Lang = "en" | "ru";

// The browser's first preferred language picks the copy; everything else falls back to English.
export const LANG: Lang = (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase().startsWith("ru")
  ? "ru"
  : "en";

export function localize<T>(copy: Record<Lang, T>): T {
  return copy[LANG];
}
