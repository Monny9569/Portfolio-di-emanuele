import { Link } from "react-router-dom";
import FlipCard from "../components/FlipCard";

/* Irene Fornaciari */
import irene1 from "../assets/press/V01.jpg";
import irene2 from "../assets/press/V02.jpg";
/*import irene3 from "../assets/press/V03.jpg";*/

/* Dik Dik */
import dikdikBack from "../assets/press/V04.jpg";
import dikdikFront from "../assets/press/V05.jpg";

export default function PressArticle() {
  

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
          <FlipCard
            frontImage={dikdikFront}
            backImage={dikdikBack}
            altFront="Dik Dik - copertina"
            altBack="Dik Dik - retro copertina"
            aspectClass="aspect-[1/1]"
            roundedClass="0"
          />
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
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
        {/* cover flip */}
              <div className="max-w-[420px] w-full">
          <FlipCard
            frontImage={irene1}
            backImage={irene2}
            altFront="Irene Fornaciari - copertina"
            altBack="Irene Fornaciari - retro copertina"
            aspectClass="aspect-[1/1]"
            roundedClass="0"
          />
        </div>

        {/* testo */}
        <div className="max-w-[560px]">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
            Collaborazione discografica
          </p>

          <h3 className="font-serif italic text-gray-900 text-4xl md:text-5xl leading-none mb-5">
            Irene Fornaciari
          </h3>

          <div className="w-20 h-px bg-artist mb-8" />

          <div className="mt-10">
            <Link
              to="/irene-fornaciari"
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
    </section>
  );
}