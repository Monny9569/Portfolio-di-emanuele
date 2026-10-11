/**
 * i18n minimale: italiano di default, inglese per chi non e' italiano.
 *
 * Il locale e' deciso una sola volta all'avvio, quindi `t()` e' una funzione
 * semplice utilizzabile ovunque (componenti, dati a livello di modulo).
 *
 * Ordine di scelta:
 *   1. ?lang=it | ?lang=en nell'URL (salvato per la sessione)
 *   2. lingue del browser: se una qualsiasi e' italiana -> "it", altrimenti "en"
 */
const SUPPORTED = ["it", "en"];
const STORAGE_KEY = "site-lang";

function fromQuery() {
  try {
    const value = new URLSearchParams(window.location.search).get("lang");
    return SUPPORTED.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function fromStorage() {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function fromBrowser() {
  const langs =
    typeof navigator !== "undefined"
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : [];
  if (langs.length === 0) return "it";
  return langs.some((l) => String(l).toLowerCase().startsWith("it")) ? "it" : "en";
}

function detectLocale() {
  if (typeof window === "undefined") return "it";
  const queried = fromQuery();
  if (queried) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, queried);
    } catch {
      /* storage non disponibile */
    }
    return queried;
  }
  return fromStorage() ?? fromBrowser();
}

export const locale = detectLocale();
export const isItalian = locale === "it";

if (typeof document !== "undefined") {
  document.documentElement.lang = locale;
}

/** t("testo italiano", "english text") -> restituisce la versione nella lingua attiva. */
export function t(it, en) {
  return locale === "en" && en !== undefined ? en : it;
}
