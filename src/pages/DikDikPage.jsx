import { Link } from "react-router-dom";
import FlipCard from "../components/FlipCard";

import dikdikFront from "../assets/press/V05.jpg";
import dikdikBack from "../assets/press/V04.jpg";
import dikdikcd1 from "../assets/press/V07.jpg";
import dikdikArticle from "../assets/press/dikdik-article-full.jpg";
import dikdikConference from "../assets/press/conf.jpg";

const ELENCO_BRANI_LATO_A = [
  {
    titolo: "PAROLE D'AMORE",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (seconda voce), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "L'ULTIMO BATTITO DEL CUORE",
    autori: "Emanuele Monetti",
    musicisti: "Maurizio Solieri (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "LA FRENESIA",
    autori: "Emanuele Monetti",
    musicisti:
      "Maurizio Solieri (seconda voce), Maurizio Solieri (solo guitar)",
  },
  {
    titolo: "IL TEMPORALE",
    autori: "Emanuele Monetti",
    musicisti:
      "Ricky Gianco (seconda voce), Pietruccio Montalbetti (armonica), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "LA SPESA",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (coro), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "COME IL VENTO",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "SI RIPETERÀ",
    autori: "Emanuele Monetti",
    musicisti:
      "Dario Baldan Bembo (organo Hammond), Riccardo Eterno (coro), Marco Ferradini (coro)",
  },
  {
    titolo: "COME FOSSE UNA CANZONE",
    autori: "Emanuele Monetti",
    musicisti:
      "Dario Baldan Bembo (organo Hammond), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (chitarra solista)",
  },
  {
    titolo: "NEGLI OCCHI MIEI",
    autori: "Emanuele Monetti",
    musicisti:
      "Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (solo guitar), Pietruccio Montalbetti (armonica), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "I RAGAZZI DELLA VIA STENDHAL",
    autori:
      "Piercarlo D'Amato, Gioachino Lanotte, Emanuele Monetti, Pietruccio Montalbetti",
    musicisti:
      "Donato Begotti (solo guitar), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Pietruccio Montalbetti (armonica), Mario Neri (organo Hammond)",
  },
];

export default function DikDikPage() {


  return (
    <main className="project-page min-h-[100svh] w-full min-w-0 overflow-x-clip bg-[#f3efe6] text-gray-900 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
      <section className="mx-auto w-full min-w-0 max-w-[1300px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16">
      
       <div className="mb-20 pb-0 border-b border-[#e6e1d6]">
        <Link
          to="/#timeline"
          className="group mb-10 inline-flex min-h-[44px] max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:gap-3 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Torna al Diario di Bordo
        </Link>
      
       </div>
        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* COLONNA SINISTRA */}
          <div className="flex min-w-0 flex-col gap-8 max-w-[560px] w-full">
            {/* CARD COPERTINA */}
            <div className="w-full">
              <FlipCard
                frontImage={dikdikFront}
                backImage={dikdikcd1}
                altFront="Dik Dik - Isole in viaggio - copertina"
                altBack="Dik Dik - Isole in viaggio - retro copertina"
                aspectClass="aspect-square"
                roundedClass="0"
              />
            </div>

            {/* Disco: solo fronte, esposizione museale — niente flip / etichetta DUB */}
            <div className="group/disc w-full">
              <div className="cover-elevated relative aspect-square w-full overflow-hidden rounded-none bg-neutral-200">
                <img
                  src={dikdikBack}
                  alt="Dik Dik — ISOLE IN VIAGGIO — artwork CD"
                  className="h-full w-full object-cover motion-reduce:transition-none motion-reduce:group-hover/disc:scale-100 transition-[transform] duration-[1.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/disc:scale-[1.02] group-active/disc:scale-[1.01]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
</div>
          {/* COLONNA DESTRA */}
          <div className="max-w-[720px] w-full min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-gray-500 mb-4">
              Collaborazione 
            </p>

            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 break-words">
              Dik Dik
            </h1>

            <div className="w-24 h-px bg-[#9d2b2b] mb-8" />

            <div className="dikdik-prose dikdik-prose-stack max-w-[66ch] text-gray-800">
              <p>
              Nel 1997 la storica band italiana <strong> DIK DIK </strong> decide di uscire dopo quasi 20 anni con 
              un album di canzoni inedite. Per l'occasione scelgono come autore <strong>Emanuele Monetti</strong>.
              </p>

              <p>
                <span className="whitespace-normal">
                  Monetti firmerà tutti i brani dell’intero album
                  <strong> ISOLE&nbsp;IN&nbsp;VIAGGIO,&nbsp;</strong>
                </span>
                prodotto da
                <strong> Ricky&nbsp;Gianco</strong>. Il progetto è molto ambizioso e vede la
                collaborazione di musicisti come
                <strong> Dario&nbsp;Baldan&nbsp;Bembo</strong>,
                <strong> Maurizio Solieri</strong> e
                <strong> Marco&nbsp;Ferradini</strong> per citarne alcuni.
              </p>

              <p>
                La promozione dell’album non sarà all’altezza e per
                questo motivo resterà lontano da programmazioni radiotelevisive.
                Resta comunque ancora oggi, per gli operatori del settore, uno dei lavori più
                apprezzati dello storico gruppo.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-[22px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.14)]">
            <img
              src={dikdikConference}
              alt="Conferenza stampa dei Dik Dik a Milano, settembre 1997"
              className="w-full h-auto object-cover"
            />
          </div>
            <p className="mt-3 text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.22em] text-gray-500 leading-snug break-words">
              Da Sinistra:
              <br />
              <span className="sm:whitespace-nowrap">Ricky Gianco</span>,{' '}
              <span className="sm:whitespace-nowrap">PEPE (DikDik)</span>,{' '}
              <span className="sm:whitespace-nowrap">Piercarlo D'Amato</span>,{' '}
              <span className="sm:whitespace-nowrap">Emanuele Monetti</span>,{' '}
              <span className="sm:whitespace-nowrap">LALLO (DikDik)</span>,{' '}
              <span className="sm:whitespace-nowrap">PIETRUCCIO (DikDik)</span>
            </p>
          </div>
        </div>

        {/* separatore */}
        <div className="my-16 md:my-20">
          <div className="h-px w-full bg-black/10" />
        </div>

        {/* ELENCO BRANI */}
        <div className="max-w-[720px] md:max-w-[880px] w-full min-w-0 mb-12 md:mb-16 font-open-sans-sc font-medium">
          <h2 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-gray-500 mb-3 font-extrabold">
            Elenco Brani
          </h2>
          <div className="w-20 h-px bg-[#9d2b2b] mb-5" />
          <ol className="list-none pl-0 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-10 gap-y-5 md:gap-y-5">
            {ELENCO_BRANI_LATO_A.map((row, index) => (
              <li
                key={row.titolo}
                className="pb-5 border-b border-black/[0.08] md:border-b-0 md:pb-0 last:pb-0 last:border-b-0"
              >
                <div className="flex gap-2 items-baseline mb-2.5">
                  <span className="shrink-0 w-6 text-right text-[11px] text-gray-400 tabular-nums">
                    {index + 1}.
                  </span>
                  <h3 className="min-w-0 text-base md:text-[1.05rem] leading-tight text-gray-900 font-extrabold">
                    {row.titolo}
                  </h3>
                </div>
                <div className="ml-0 sm:ml-8 min-w-0 space-y-2.5">
                  <div className="border-l-2 border-[#9d2b2b]/50 pl-3 min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#9d2b2b] mb-1">
                      Autori
                    </p>
                    <p className="text-xs text-gray-700 leading-snug break-words">
                      {row.autori}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#5c6b7a]/45 pl-3 min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#5c6b7a] mb-1">
                      Musicisti
                    </p>
                    <p className="text-xs text-gray-700 leading-snug break-words">
                      {row.musicisti}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ARTICOLO GIORNALE */}
        <div className="max-w-[900px] w-full min-w-0">
          <h2 className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.38em] text-gray-500 mb-4 leading-relaxed break-words">
            Articolo di Mario Luzzatto Fegiz dal CORRIERE DELLA SERA
          </h2>

          <div className="w-20 h-px bg-[#9d2b2b] mb-8" />

          <div className="overflow-hidden rounded-[22px] shadow-[0_22px_60px_rgba(0,0,0,0.14)] bg-white">
            <img
              src={dikdikArticle}
              alt="Articolo di giornale dedicato ai Dik Dik e alla collaborazione con Emanuele Monetti"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}