import { useState } from "react";
import { Link } from "react-router-dom";

import irene1 from "../assets/press/V01.jpg";
import irene2 from "../assets/press/V02.jpg";
import irene3 from "../assets/press/V03.jpg";

export default function IreneFornaciari() {
  const [openImage, setOpenImage] = useState(null);

  return (
    <main className="project-page min-h-[100svh] w-full min-w-0 overflow-x-hidden bg-[#f3efe6] text-gray-900 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
      <section className="mx-auto w-full min-w-0 max-w-[1300px] px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16">
        
        {/* TORNA INDIETRO */}
       <div className="mb-20 pb-0 border-b border-[#e6e1d6]">
         <Link
            to="/#timeline"
            className="group mb-10 inline-flex min-h-[44px] max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-2.5 font-open-sans-sc font-medium text-[10px] uppercase tracking-[0.16em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:gap-3 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Torna al Diario di Bordo
          </Link>
      
       </div>

        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          
      {/* IMMAGINI */}
      <div className="order-2 lg:order-1 max-w-[560px] w-full min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* immagine grande */}
          <div
            onClick={() => setOpenImage(irene1)}
            className="cover-elevated sm:col-span-2 cursor-zoom-in bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={irene1}
                alt="Vintage Baby - copertina"
                className="block h-full w-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* due sotto */}
          <div
            onClick={() => setOpenImage(irene2)}
            className="cover-elevated cursor-zoom-in bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={irene2}
                alt="Retro copertina"
                className="block h-full w-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div
            onClick={() => setOpenImage(irene3)}
            className="cover-elevated cursor-zoom-in bg-white"
          >
            <div className="overflow-hidden">
              <img
                src={irene3}
                alt="Dettaglio album"
                className="block h-full w-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

        <p className="mt-5 font-open-sans-sc font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.24em] text-gray-500 text-center sm:text-left">
          Tocca l’immagine per ingrandire
        </p>
      </div>
          {/* TESTO */}
          <div className="order-1 lg:order-2 max-w-[720px] w-full min-w-0">
            <p className="font-open-sans-sc font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.38em] text-gray-500 mb-4">
              Collaborazione 
            </p>

            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 break-words">
              Irene Fornaciari
            </h1>

            <div className="w-24 h-px bg-[#9d2b2b] mb-8" />

            <div className="space-y-6 font-open-sans-sc font-medium text-base sm:text-lg md:text-[1.22rem] leading-[1.85] sm:leading-[1.9] text-gray-800 [&_strong]:font-extrabold">
              <p className="break-words">
                Nel 2009 <strong>Emanuele Monetti</strong> ha collaborato con
                <strong> Irene Fornaciari</strong> all&apos;album
                <strong> VINTAGE BABY</strong>, firmando assieme ad Irene il testo
                originale italiano del brano
                <strong> LA TIRITERA DELLA SERA</strong>{" "}
                <span className="italic">(cover di Ride My See-Saw)</span>.
              </p>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {openImage && (
          <div
            onClick={() => setOpenImage(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 supports-[backdrop-filter]:backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpenImage(null)}
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top,0px))] z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 px-4 text-xs uppercase tracking-[0.2em] text-gray-900 shadow-lg"
              aria-label="Chiudi immagine"
            >
              Chiudi
            </button>
            <img
              src={openImage}
              alt="Zoom"
              className="max-h-[min(88svh,100%)] max-w-full object-contain shadow-2xl"
            />
          </div>
        )}
      </section>
    </main>
  );
}