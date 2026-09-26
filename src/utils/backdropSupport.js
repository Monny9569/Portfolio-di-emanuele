/**
 * True when the browser reports backdrop-filter support (incl. -webkit-).
 * Old Chrome / embedded WebViews often lack it: semi-transparent Tailwind
 * backgrounds then look nearly invisible and fixed layers can stack oddly
 * against transformed content (e.g. timeline cards).
 */
let cachedBackdrop = null;

export function getBackdropFilterSupported() {
  if (typeof window === "undefined") return true;
  if (cachedBackdrop !== null) return cachedBackdrop;
  if (typeof CSS === "undefined") {
    cachedBackdrop = false;
    return cachedBackdrop;
  }
  cachedBackdrop =
    CSS.supports("backdrop-filter", "blur(4px)") ||
    CSS.supports("-webkit-backdrop-filter", "blur(4px)");
  return cachedBackdrop;
}
