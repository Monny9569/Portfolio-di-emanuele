import { Link } from "react-router-dom";

export default function Privacy() {
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
            Torna alla home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl leading-none text-gray-900 mb-5 text-balance">
            Privacy
          </h1>
          <div className="w-24 h-px bg-[#b01c24]" />
        </div>

        <div className="space-y-8 font-serif text-[1.12rem] md:text-[1.2rem] leading-[1.95] text-gray-800">

            <p>
                Il presente sito è gestito nel rispetto del Regolamento (UE) 2016/679
                (“GDPR”) e della normativa nazionale vigente in materia di protezione
                dei dati personali.
            </p>

            <p>
                Questo sito non raccoglie dati personali degli utenti per finalità di
                profilazione o marketing. I dati eventualmente trasmessi volontariamente
                (ad esempio tramite contatti email) vengono utilizzati esclusivamente
                per rispondere alle richieste ricevute.
            </p>

            <p>
                La base giuridica del trattamento è costituita dal consenso espresso
                dell’utente o dalla necessità di rispondere a richieste dirette
                dell’interessato (art. 6 GDPR).
            </p>

            <p>
                Il sito può integrare contenuti di terze parti (es. servizi audio o video),
                i quali possono trattare dati personali secondo le proprie informative
                privacy, indipendenti da questo sito.
            </p>

            <p>
                Ai sensi degli articoli 15-22 del GDPR, l’utente ha diritto di accesso,
                rettifica, cancellazione, limitazione e opposizione al trattamento dei dati.
            </p>
            <p className="text-sm text-gray-500">
            Il presente documento ha finalità informative e può essere aggiornato nel tempo.
            </p>
            <p className="text-sm text-gray-500">
                Titolare del trattamento: Emanuele Monetti
            </p>

            </div>
      </section>
    </main>
  );
}