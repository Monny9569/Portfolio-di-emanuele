import { useEffect, useState } from "react";
import {
  COOKIE_KEY,
  defaultConsent,
  getCookieConsent,
  saveCookieConsent,
} from "../utils/cookieConsent";
import { t } from "../i18n";

function Toggle({ checked, disabled = false, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      aria-label={label}
      className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
        checked ? "bg-[#b01c24]" : "bg-gray-400"
      } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 ${
          checked ? "left-9" : "left-1"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultConsent);

    useEffect(() => {
    const checkConsent = () => {
        const consent = getCookieConsent();

        if (!consent) {
        setIsOpen(true);
        }
    };

    checkConsent();

    const handleReset = () => {
        setPreferences(defaultConsent);
        setIsOpen(true);
    };

    window.addEventListener("cookie-reset", handleReset);

    return () => {
        window.removeEventListener("cookie-reset", handleReset);
    };
    }, []);

  const updatePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAcceptAll = () => {
    const next = {
      necessary: true,
      externalMedia: true,
    };

    saveCookieConsent(next);
    setPreferences(next);
    setIsOpen(false);
    window.location.reload();
  };

  const handleRejectOptional = () => {
    const next = {
      necessary: true,
      externalMedia: false,
    };

    saveCookieConsent(next);
    setPreferences(next);
    setIsOpen(false);
    window.location.reload();
  };

  const handleSave = () => {
    saveCookieConsent(preferences);
    setIsOpen(false);
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/35 p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
      <div className="max-h-[min(88svh,100%)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-[#e6e1d6] bg-[#f3efe6] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-6 md:max-h-none md:p-8">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-3">
          {t("Preferenze privacy", "Privacy preferences")}
        </p>

        <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 text-balance">
          {t("Cookie e contenuti esterni", "Cookies and external content")}
        </h2>

        <div className="w-20 h-px bg-[#b01c24] mb-6" />

        <div className="space-y-4 font-serif text-[1.05rem] leading-[1.85] text-gray-800 mb-8">
          <p>
            {t(
              "Puoi scegliere quali categorie attivare. I cookie necessari restano sempre attivi, mentre i contenuti esterni possono essere abilitati o disabilitati in base alle tue preferenze.",
              "You can choose which categories to enable. Necessary cookies always remain active, while external content can be enabled or disabled according to your preferences.",
            )}
          </p>
        </div>

        <div className="space-y-5">
          {/* Necessari */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#e6e1d6] bg-white/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0 sm:pr-4">
              <h3 className="text-lg font-serif text-gray-900">
                {t("Necessari", "Necessary")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t(
                  "Essenziali per il corretto funzionamento del sito. Sempre attivi.",
                  "Essential for the site to work properly. Always active.",
                )}
              </p>
            </div>

            <Toggle checked={true} disabled={true} label={t(
                "Cookie necessari (sempre attivi)",
                "Necessary cookies (always active)",
              )} />
          </div>

          {/* Contenuti esterni */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#e6e1d6] bg-white/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="min-w-0 sm:pr-4">
              <h3 className="text-lg font-serif text-gray-900">
                {t("Contenuti esterni", "External content")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t(
                  "Consente il caricamento di player e contenuti incorporati da servizi come Spotify o YouTube.",
                  "Allows players and embedded content from services such as Spotify or YouTube to load.",
                )}
              </p>
            </div>

            <Toggle
              checked={preferences.externalMedia}
              label={t(
                "Contenuti esterni (YouTube, Spotify)",
                "External content (YouTube, Spotify)",
              )}
              onChange={() => updatePreference("externalMedia")}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleRejectOptional}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:w-auto"
          >
            {t("Rifiuta opzionali", "Reject optional")}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:bg-[#b01c24] hover:text-white sm:w-auto"
          >
            {t("Salva preferenze", "Save preferences")}
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[#b01c24] bg-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-all duration-300 hover:opacity-90 sm:w-auto"
          >
            {t("Accetta tutti", "Accept all")}
          </button>
        </div>
      </div>
    </div>
  );
}
