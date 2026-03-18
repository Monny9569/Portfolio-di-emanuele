import { useState } from "react";
import { Link } from "react-router-dom";

/* Irene Fornaciari */
import irene1 from "../assets/press/V01.jpg";
import irene2 from "../assets/press/V02.jpg";
import irene3 from "../assets/press/V03.jpg";

/* Dik Dik */
import dikdikBack from "../assets/press/V04.jpg";
import dikdikFront from "../assets/press/V05.jpg";

export default function PressArticle() {
  const [openImage, setOpenImage] = useState(null);

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
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
        {/* cover flip */}
        <div className="max-w-[420px] w-full">
          <div className="group relative w-full [perspective:1400px]">
            <div className="relative aspect-[1/1] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Fronte */}
              <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
                <img
                  src={dikdikFront}
                  alt="Dik Dik - copertina"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Retro */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
                <img
                  src={dikdikBack}
                  alt="Dik Dik - retro copertina"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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

          <div className="mt-10">
            <Link
              to="/dik-dik"
              className="group inline-flex items-center gap-3 rounded-full border border-gray-300 bg-transparent px-7 py-3 text-[12px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            >
              Info
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
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

      {/* MODAL IMMAGINI */}
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
    </section>
  );
}