import { useState } from "react";

import pressThumb from "../assets/press/dikdik-article-thumb.jpg";
import pressFull from "../assets/press/dikdik-article-full.jpg";

export default function PressArticle() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="collaborations"
      className="max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-24 md:py-28"
    >
      {/* intestazione sezione */}
      <div className="mb-14 md:mb-16">
        <p className="text-[12px] uppercase tracking-[0.42em] text-gray-500 mb-4">
          Collaborazioni
        </p>

        <h2 className="font-serif italic text-gray-900 leading-none text-5xl md:text-6xl">
          Corriere della Sera
        </h2>

        <div className="w-24 h-[2px] bg-artist mt-5" />
      </div>

      {/* contenuto */}
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* immagine articolo */}
        <div
          onClick={() => setOpen(true)}
          className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-4 w-full max-w-[500px] aspect-[4/5] shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.22)] hover:-translate-y-1"
        >
          <img
            src={pressThumb}
            alt="Anteprima articolo Corriere della Sera"
            className="w-full h-full object-contain transition duration-700 group-hover:scale-[1.02]"
          />
        </div>

        {/* testo */}
        <div className="max-w-[520px]">
          <p className="font-serif text-lg md:text-[1.45rem] text-gray-800 leading-[1.9]">
            Un articolo del <strong>Corriere della Sera</strong> cita le canzoni di
            <strong> Emanuele Monetti</strong> tra i nuovi brani realizzati per i
            Dik Dik, all’interno di un progetto prodotto da Ricky Gianco.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-gray-300 bg-transparent px-7 py-3 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
          >
            Leggi articolo
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      {/* modal articolo */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-[1100px] overflow-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={pressFull}
              alt="Articolo completo Corriere della Sera"
              className="w-full h-auto"
            />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white text-2xl leading-none backdrop-blur-sm transition hover:bg-black/75"
              aria-label="Chiudi articolo"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}