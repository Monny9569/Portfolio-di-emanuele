import { useState } from "react";
import { Link } from "react-router-dom";

import irene1 from "../assets/press/V01.jpg";
import irene2 from "../assets/press/V02.jpg";
import irene3 from "../assets/press/V03.jpg";

export default function IreneFornaciari() {
  const [openImage, setOpenImage] = useState(null);

  return (
    <main className="min-h-screen bg-[#f3efe6] text-gray-900">
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        
        {/* TORNA INDIETRO */}
       <div className="mb-20 pb-0 border-b border-[#e6e1d6]">
         <Link
            to="/#timeline"
            className="group inline-flex items-center gap-3 mb-10 rounded-full border border-gray-300 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Torna alla discografia
          </Link>
      
       </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          
      {/* IMMAGINI */}
      <div className="max-w-[560px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* immagine grande */}
          <div
            onClick={() => setOpenImage(irene1)}
            className="sm:col-span-2 cursor-zoom-in overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.16)] bg-white"
          >
            <img
              src={irene1}
              alt="Vintage Baby - copertina"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* due sotto */}
          <div
            onClick={() => setOpenImage(irene2)}
            className="cursor-zoom-in overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.16)] bg-white"
          >
            <img
              src={irene2}
              alt="Retro copertina"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div
            onClick={() => setOpenImage(irene3)}
            className="cursor-zoom-in overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.16)] bg-white"
          >
            <img
              src={irene3}
              alt="Dettaglio album"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-gray-500 text-center sm:text-left">
          Tocca l’immagine per ingrandire
        </p>
      </div>
          {/* TESTO */}
          <div className="max-w-[720px]">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
              Collaborazione discografica
            </p>

            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
              Irene Fornaciari
            </h1>

            <div className="w-24 h-px bg-[#9d2b2b] mb-8" />

            <div className="space-y-6 font-serif text-lg md:text-[1.22rem] leading-[1.9] text-gray-800">
              <p>
                Nel 2009 <strong>Emanuele Monetti</strong> ha collaborato con
                <strong> Irene Fornaciari</strong> all&apos;album
                <strong> VINTAGE BABY</strong>, firmando assieme a Irene il testo
                originale italiano del brano
                <strong> LA TIRITERA DELLA SERA</strong>{" "}
                <span className="italic">(cover di Ride My See-Saw)</span>.
              </p>

              <p>
                
              </p>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {openImage && (
          <div
            onClick={() => setOpenImage(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <img
              src={openImage}
              alt="Zoom"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </div>
        )}
      </section>
    </main>
  );
}