import { useState } from "react";

import pressFull from "../assets/press/dikdik-article-full.jpg";

/* Irene Fornaciari */
import irene1 from "../assets/press/V01.jpg";
import irene2 from "../assets/press/V02.jpg";
import irene3 from "../assets/press/V03.jpg";

/* Dik Dik */
import dikdik1 from "../assets/press/V04.jpg";
import dikdik2 from "../assets/press/V05.jpg";
import dikdik3 from "../assets/press/V06.jpg";
import dikdik4 from "../assets/press/V07.jpg";

export default function PressArticle() {
  const [openImage, setOpenImage] = useState(null);
  const [openDikDikModal, setOpenDikDikModal] = useState(false);

  const dikDikTracks = [
    {
      title: "Parole d’amore",
      authors: "Emanuele Monetti",
      musicians:
        "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (seconda voce), Joe Vescovi (organo Hammond)",
    },
    {
      title: "L’ultimo battito del cuore",
      authors: "Emanuele Monetti",
      musicians:
        "Maurizio Solieri (solo guitar), Joe Vescovi (organo Hammond)",
    },
    {
      title: "La frenesia",
      authors: "Emanuele Monetti",
      musicians:
        "Maurizio Solieri (seconda voce), Maurizio Solieri (solo guitar)",
    },
    {
      title: "Il temporale",
      authors: "Emanuele Monetti",
      musicians:
        "Ricky Gianco (seconda voce), Pietruccio Montalbetti (armonica), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
    },
    {
      title: "La spesa",
      authors: "Emanuele Monetti",
      musicians:
        "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (coro), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
    },
    {
      title: "Come il vento",
      authors: "Emanuele Monetti",
      musicians:
        "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Joe Vescovi (organo Hammond)",
    },
    {
      title: "Si ripeterà",
      authors: "Emanuele Monetti",
      musicians:
        "Dario Baldan Bembo (organo Hammond), Riccardo Eterno (coro), Marco Ferradini (coro)",
    },
    {
      title: "Come fosse una canzone",
      authors: "Emanuele Monetti",
      musicians:
        "Dario Baldan Bembo (organo Hammond), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (chitarra solista)",
    },
    {
      title: "Negli occhi miei",
      authors: "Emanuele Monetti",
      musicians:
        "Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (solo guitar), Pietruccio Montalbetti (armonica), Joe Vescovi (organo Hammond)",
    },
    {
      title: "I ragazzi della via Stendhal",
      authors:
        "Piercarlo D’Amato, Gioachino Lanotte, Emanuele Monetti, Pietruccio Montalbetti",
      musicians:
        "Donato Begotti (solo guitar), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Pietruccio Montalbetti (armonica), Mario Neri (organo Hammond)",
    },
  ];

  return (
    <section
      id="collaborations"
      className="max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-24 md:py-28"
    >
      {/* Titolo sezione */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-serif italic text-gray-900 leading-none text-5xl md:text-6xl">
          Collaborazioni
        </h2>
        <div className="w-24 h-[2px] bg-artist mt-5" />
      </div>

      {/* BLOCCO 1 - DIK DIK */}
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
        {/* mosaico immagini */}
        <div className="max-w-[620px]">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setOpenImage(dikdik1)}
              className="group overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
            >
              <img
                src={dikdik1}
                alt="Dik Dik - retro copertina"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </button>

            <button
              type="button"
              onClick={() => setOpenImage(dikdik2)}
              className="group overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
            >
              <img
                src={dikdik2}
                alt="Dik Dik - foto gruppo"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </button>

            <button
              type="button"
              onClick={() => setOpenImage(dikdik3)}
              className="group overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
            >
              <img
                src={dikdik3}
                alt="Dik Dik - CD"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </button>

            <button
              type="button"
              onClick={() => setOpenImage(dikdik4)}
              className="group overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
            >
              <img
                src={dikdik4}
                alt="Dik Dik - tracklist retro"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </button>
          </div>
        </div>

        {/* testo */}
        <div className="max-w-[560px]">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
            Collaborazione discografica
          </p>

          <h3 className="font-serif italic text-gray-900 text-4xl md:text-5xl leading-none mb-5">
            Dik Dik
          </h3>

          <div className="w-20 h-px bg-artist mb-8" />

          <p className="font-serif text-lg md:text-[1.3rem] text-gray-800 leading-[1.9]">
            Nel 1997 i <strong>Dik Dik</strong> tornano con{" "}
            <strong>Isole in viaggio</strong>, un album di inediti affidato alla
            scrittura di <strong>Emanuele Monetti</strong> e prodotto da{" "}
            <strong>Ricky Gianco</strong>. Un progetto ambizioso, arricchito dalla
            partecipazione di musicisti come <strong>Dario Baldan Bembo</strong>,{" "}
            <strong>Maurizio Solieri</strong> e{" "}
            <strong>Marco Ferradini</strong>.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => setOpenDikDikModal(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-gray-300 bg-transparent px-7 py-3 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            >
              Approfondisci
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => setOpenImage(pressFull)}
              className="group inline-flex items-center gap-3 rounded-full border border-gray-300 bg-transparent px-7 py-3 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            >
              Articolo Corriere
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-gray-500">
            Rassegna stampa collegata disponibile nell’articolo del Corriere della Sera.
          </p>
        </div>
      </div>

      {/* separatore */}
      <div className="my-20 md:my-24">
        <div className="w-full h-px bg-black/6" />
      </div>

      {/* BLOCCO 2 - IRENE FORNACIARI */}
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-[560px]">
          <div className="grid grid-cols-[1fr_0.62fr] gap-4">
            <button
              type="button"
              onClick={() => setOpenImage(irene1)}
              className="group overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
            >
              <img
                src={irene1}
                alt="Vintage Baby cover"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </button>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setOpenImage(irene2)}
                className="group overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.18)]"
              >
                <img
                  src={irene2}
                  alt="Retro album Vintage Baby"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </button>

              <button
                type="button"
                onClick={() => setOpenImage(irene3)}
                className="group overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.18)]"
              >
                <img
                  src={irene3}
                  alt="Irene Fornaciari"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[560px]">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
            Collaborazione discografica
          </p>

          <h3 className="font-serif italic text-gray-900 text-4xl md:text-5xl leading-none mb-5">
            Irene Fornaciari
          </h3>

          <div className="w-20 h-px bg-artist mb-8" />

          <p className="font-serif text-lg md:text-[1.3rem] text-gray-800 leading-[1.9]">
            Nel 2009 <strong>Emanuele Monetti</strong> ha collaborato con
            <strong> Irene Fornaciari</strong> all&apos;album
            <strong> VINTAGE BABY</strong> dove ha firmato assieme ad Irene il
            testo originale italiano del brano
            <strong> LA TIRITERA DELLA SERA</strong>{" "}
            <span className="italic">(cover di Ride My See-Saw)</span> presente
            nell&apos;album.
          </p>

         
        </div>
      </div>

      {/* MODAL IMMAGINI / ARTICOLO */}
      {openImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6"
          onClick={() => setOpenImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-[1100px] overflow-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={openImage}
              alt="Anteprima ingrandita"
              className="w-full h-auto"
            />

            <button
              onClick={() => setOpenImage(null)}
              className="absolute top-4 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white text-2xl leading-none backdrop-blur-sm transition hover:bg-black/75"
              aria-label="Chiudi immagine"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* MODAL APPROFONDIMENTO DIK DIK */}
      {openDikDikModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6"
          onClick={() => setOpenDikDikModal(false)}
        >
          <div
            className="relative w-full max-w-[1200px] max-h-[90vh] overflow-auto rounded-3xl bg-paper-soft p-8 md:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenDikDikModal(false)}
              className="absolute top-4 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/10 text-gray-900 text-2xl leading-none transition hover:bg-black/20"
              aria-label="Chiudi approfondimento"
            >
              ×
            </button>

            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
                Approfondimento
              </p>

              <h3 className="font-serif italic text-gray-900 text-4xl md:text-5xl leading-none mb-5">
                Dik Dik — Isole in viaggio
              </h3>

              <div className="w-20 h-px bg-artist mb-8" />
            </div>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              {/* pagina sinistra */}
              <div>
                <p className="font-serif text-lg md:text-[1.2rem] text-gray-800 leading-[1.95]">
                  Nel 1997 la storica band italiana <strong>Dik Dik</strong> decide
                  di tornare con un album di canzoni inedite dopo quasi vent’anni.
                  Per l’occasione sceglie come autore{" "}
                  <strong>Emanuele Monetti</strong>, da loro considerato{" "}
                  <span className="italic">“il nuovo Battisti”</span>. Monetti
                  firmerà tutti i brani dell’album <strong>Isole in viaggio</strong>,
                  prodotto da <strong>Ricky Gianco</strong>. Il progetto, molto
                  ambizioso, vede la collaborazione di musicisti come{" "}
                  <strong>Dario Baldan Bembo</strong>,{" "}
                  <strong>Maurizio Solieri</strong> e{" "}
                  <strong>Marco Ferradini</strong>, tra gli altri. La promozione
                  dell’album non sarà però all’altezza, e per questo resterà lontano
                  da radio e classifiche. Resta comunque, ancora oggi, uno dei lavori
                  più apprezzati dello storico gruppo.
                </p>

                <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <img
                    src={dikdik1}
                    alt="Dik Dik - Isole in viaggio"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-gray-500">
                  Rassegna stampa disponibile tramite il pulsante “Articolo Corriere”.
                </p>
              </div>

              {/* pagina destra / libro */}
              <div className="rounded-[28px] bg-white/70 border border-black/5 shadow-[0_25px_70px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {dikDikTracks.map((track, index) => (
                    <div
                      key={track.title}
                      className="p-6 border-b border-black/5 md:[&:nth-last-child(-n+2)]:border-b-0 md:odd:border-r md:border-black/5"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400 mb-3">
                        {(index + 1).toString().padStart(2, "0")}
                      </p>

                      <h4 className="font-serif italic text-[22px] text-gray-900 leading-tight mb-3">
                        {track.title}
                      </h4>

                      <p className="text-sm leading-6 text-gray-700">
                        <span className="font-semibold text-gray-900">Autori:</span>{" "}
                        {track.authors}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        <span className="font-semibold text-gray-900">
                          Musicisti:
                        </span>{" "}
                        {track.musicians}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}