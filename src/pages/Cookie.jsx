import { Link } from "react-router-dom";
import { t } from "../i18n";

export default function Cookie() {
  return (
    <main className="min-h-[100svh] w-full overflow-x-clip bg-paper text-gray-900">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-24">
        <div className="mb-12 pb-6 border-b border-[#e6e1d6]">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-gray-600 hover:text-gray-900 transition-all"
          >
            <span className="text-[14px] transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            {t("Torna alla home", "Back to home")}
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl leading-none text-gray-900 mb-5 text-balance">
            {t("Cookie", "Cookies")}
          </h1>
          <div className="w-24 h-px bg-[#b01c24]" />
        </div>

       <div className="space-y-8 font-serif text-[1.12rem] md:text-[1.2rem] leading-[1.95] text-gray-800">

        <p>
          {t(
            "Il presente sito utilizza esclusivamente cookie tecnici, necessari al corretto funzionamento della piattaforma, in conformità alla Direttiva ePrivacy (2002/58/CE) e al Regolamento (UE) 2016/679 (GDPR).",
            "This site uses technical cookies only, which are necessary for the platform to function properly, in accordance with the ePrivacy Directive (2002/58/EC) and Regulation (EU) 2016/679 (GDPR).",
          )}
        </p>

        <p>
          {t(
            "I cookie tecnici non richiedono il consenso preventivo dell’utente, in quanto essenziali per la navigazione e la fruizione dei contenuti.",
            "Technical cookies do not require the user’s prior consent, as they are essential for browsing and for accessing content.",
          )}
        </p>

        <p>
          {t(
            "Non vengono utilizzati cookie di profilazione, marketing o tracciamento diretto da parte di questo sito.",
            "This site does not use profiling, marketing or direct tracking cookies.",
          )}
        </p>

        <p>
          {t(
            "Tuttavia, eventuali contenuti incorporati da piattaforme esterne (es. Spotify, YouTube) possono installare cookie propri, gestiti direttamente da tali servizi.",
            "However, any content embedded from external platforms (e.g. Spotify, YouTube) may install their own cookies, which are managed directly by those services.",
          )}
        </p>

        <p>
          {t(
            "Per maggiori informazioni, si invita a consultare le rispettive policy dei servizi terzi utilizzati.",
            "For more information, please consult the respective policies of the third-party services used.",
          )}
        </p>

       <div className="mt-12 pt-8 border-t border-[#e6e1d6] text-center">
 

        <p className="text-sm text-gray-500">
          {t(
            "Il presente documento ha finalità informative e può essere aggiornato nel tempo.",
            "This document is for informational purposes and may be updated over time.",
          )}
        </p>
               <p className="text-sm text-gray-500 mb-6">
          {t(
            "Puoi modificare in qualsiasi momento le tue preferenze sui cookie.",
            "You can change your cookie preferences at any time.",
          )}
        </p>

      <button
          type="button"
          onClick={() => {
            localStorage.removeItem("cookie-consent-v2");
            window.dispatchEvent(new Event("cookie-reset"));
          }}
          className="inline-flex items-center justify-center rounded-full border border-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:bg-[#b01c24] hover:text-white"
        >
          {t("Modifica preferenze cookie", "Change cookie preferences")}
        </button>
      </div>
      </div>
      
      </section>
    </main>
  );
}