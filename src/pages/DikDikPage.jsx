import { Link } from "react-router-dom";
import dikdikFront from "../assets/press/V05.jpg";
import dikdikBack from "../assets/press/V04.jpg";

export default function DikDikPage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] text-gray-900">
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="mb-10">
          <Link
            to="/#collaborations"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.24em] text-gray-600 transition hover:text-black"
          >
            ← Torna alla home
          </Link>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
         <div className="flex flex-col gap-6 max-w-[520px] w-full">
  
            {/* Fronte */}
            <div className="overflow-hidden  shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <img
                src={dikdikFront}
                alt="Dik Dik - fronte"
                className="w-full h-auto object-cover"
                />
            </div>

            {/* Retro */}
            <div className="overflow-hidden  shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <img
                src={dikdikBack}
                alt="Dik Dik - retro"
                className="w-full h-auto object-cover"
                />
            </div>

            </div>

          <div className="max-w-[720px]">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
              Collaborazione discografica
            </p>

            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
              Dik Dik
            </h1>

            <div className="w-24 h-px bg-[#9d2b2b] mb-8" />

            <div className="space-y-6 font-serif text-lg md:text-[1.28rem] leading-[1.9] text-gray-800">
              <p>
                Nel 1997 la storica band italiana <strong>Dik Dik</strong> decide di uscire dopo quasi 20 anni con un album di canzoni inedite,
                 per l'occasione scelgono come autore<strong> Emanuele Monetti</strong>, da loro considerato come "il nuovo Battisti". 
                 Monetti firmerà tutti i brani dell'intero album <strong>ISOLE IN VIAGGIO</strong> prodotto da <strong>RICKY GIANCO</strong>, 
                 il progetto è molto ambizioso e vede la collaborazione di musicisti come: <strong>Dario Baldan Bembo
                 Maurizio Solieri</strong> e <strong>Marco Ferradini</strong> per citarne alcuni . 
                 La promozione dell'album non sarà all'altezza e per questo motivo resterà lontano da programmazioni radio e classifiche.
                 Resta comunque a tutt'oggi uno dei lavori più apprezzati dello storico gruppo.
              </p>

              <p>
                Questa pagina può diventare la scheda completa dedicata alla
                collaborazione: testo, immagini, curiosità, crediti, rassegna
                stampa e tutto ciò che vorrai aggiungere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}