import { useState } from "react";

import pressThumb from "../assets/press/dikdik-article-thumb.jpg";
import pressFull from "../assets/press/dikdik-article-full.jpg";

export default function PressArticle() {

  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-14 lg:px-20 py-24">

      {/* titolo sezione */}
      <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
        Rassegna stampa
      </p>

      <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-3">
        Corriere della Sera
      </h2>

      <div className="w-20 h-px bg-artist mb-10" />

      {/* contenuto */}
      <div className="grid md:grid-cols-[260px_1fr] gap-12 items-start">

        {/* immagine preview */}
        <img
          src={pressThumb}
          alt="Anteprima articolo Corriere della Sera"
          className="rounded-xl shadow-md border border-gray-200 hover:scale-[1.03] transition"
        />

        {/* testo */}
        <div>

          <p className="font-serif text-lg text-gray-700 leading-8 max-w-xl">
            Un articolo del <strong>Corriere della Sera</strong> cita le canzoni di
            <strong> Emanuele Monetti</strong> tra i nuovi brani realizzati per i
            Dik Dik nel progetto prodotto da Ricky Gianco.
          </p>

          {/* pulsante */}
          <button
            onClick={() => setOpen(true)}
            className="mt-8 border border-gray-300 px-6 py-2 rounded-full text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition"
          >
            Leggi
          </button>

        </div>

      </div>

      {/* MODAL ARTICOLO */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

          {/* chiudi */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70 transition"
          >
            ×
          </button>

          {/* articolo */}
          <div className="max-h-[90vh] overflow-auto rounded-2xl shadow-2xl">
            <img
              src={pressFull}
              alt="Articolo Corriere della Sera"
              className="w-full h-auto"
            />
          </div>

        </div>
      )}

    </section>
  );
}