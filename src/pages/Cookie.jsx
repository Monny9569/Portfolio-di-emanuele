import { Link } from "react-router-dom";

export default function Cookie() {
  return (
    <main className="min-h-screen bg-paper text-gray-900">
      <section className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-24">
        <div className="mb-12 pb-6 border-b border-[#e6e1d6]">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-gray-600 hover:text-gray-900 transition-all"
          >
            <span className="text-[14px] transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Torna alla home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="font-serif italic text-5xl md:text-6xl leading-none text-gray-900 mb-5">
            Cookie
          </h1>
          <div className="w-24 h-px bg-[#b01c24]" />
        </div>

       <div className="space-y-8 font-serif text-[1.12rem] md:text-[1.2rem] leading-[1.95] text-gray-800">

        <p>
          Il presente sito utilizza esclusivamente cookie tecnici, necessari al
          corretto funzionamento della piattaforma, in conformità alla Direttiva
          ePrivacy (2002/58/CE) e al Regolamento (UE) 2016/679 (GDPR).
        </p>

        <p>
          I cookie tecnici non richiedono il consenso preventivo dell’utente,
          in quanto essenziali per la navigazione e la fruizione dei contenuti.
        </p>

        <p>
          Non vengono utilizzati cookie di profilazione, marketing o tracciamento
          diretto da parte di questo sito.
        </p>

        <p>
          Tuttavia, eventuali contenuti incorporati da piattaforme esterne
          (es. Spotify, YouTube) possono installare cookie propri, gestiti
          direttamente da tali servizi.
        </p>

        <p>
          Per maggiori informazioni, si invita a consultare le rispettive policy
          dei servizi terzi utilizzati.
        </p>

       <div className="mt-12 pt-8 border-t border-[#e6e1d6] text-center">
 

        <p className="text-sm text-gray-500">
          Il presente documento ha finalità informative e può essere aggiornato nel tempo.
        </p>
               <p className="text-sm text-gray-500 mb-6">
          Puoi modificare in qualsiasi momento le tue preferenze sui cookie.
        </p>

      <button
          type="button"
          onClick={() => {
            localStorage.removeItem("cookie-consent-v2");
            window.dispatchEvent(new Event("cookie-reset"));
          }}
          className="inline-flex items-center justify-center rounded-full border border-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:bg-[#b01c24] hover:text-white"
        >
          Modifica preferenze cookie
        </button>
      </div>
      </div>
      
      </section>
    </main>
  );
}