export type Platform = "mac" | "windows" | null;

export function detectPlatform(): Platform {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const name = `${nav.userAgentData?.platform ?? ""} ${navigator.userAgent}`.toLowerCase();
  if (/iphone|ipad|android/.test(name)) return null;
  if (/mac/.test(name)) return "mac";
  if (/win/.test(name)) return "windows";
  return null;
}
