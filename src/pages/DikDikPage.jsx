import { Link } from "react-router-dom";
import FlipCard from "../components/FlipCard";

import dikdikFront from "../assets/press/V05.jpg";
import dikdikBack from "../assets/press/V04.jpg";
import dikdikcd from "../assets/press/V06.jpg";
import dikdikcd1 from "../assets/press/V07.jpg";
import dikdikArticle from "../assets/press/dikdik-article-full.jpg";
import dikdikConference from "../assets/press/conf.jpg";


export default function DikDikPage() {


  return (
    <main className="min-h-screen bg-[#f3efe6] text-gray-900">
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
      
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
          {/* COLONNA SINISTRA */}
          <div className="flex flex-col gap-8 max-w-[560px] w-full">
            {/* CARD COPERTINA */}
            <div className="w-full">
              <FlipCard
                frontImage={dikdikFront}
                backImage={dikdikcd1}
                altFront="Dik Dik - Isole in viaggio - copertina"
                altBack="Dik Dik - Isole in viaggio - retro copertina"
                aspectClass="aspect-square"
                shadowClass="shadow-[0_22px_60px_rgba(0,0,0,0.16)]"
                buttonStyle="light"
                roundedClass="0"
              />
            </div>

            {/* CARD DISCO */}
                       <div className="w-full">
              <FlipCard
                frontImage={dikdikBack}
                backImage={dikdikcd}
                altFront="Dik Dik - CD fronte"
                altBack="Dik Dik - CD retro"
                aspectClass="aspect-square"
                shadowClass="shadow-[0_22px_60px_rgba(0,0,0,0.16)]"
                buttonStyle="light"
                roundedClass="0"
              />
            </div>
</div>
          {/* COLONNA DESTRA */}
          <div className="max-w-[720px]">
            <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
              Collaborazione discografica
            </p>

            <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none mb-5">
              Dik Dik
            </h1>

            <div className="w-24 h-px bg-[#9d2b2b] mb-8" />

            <div className="space-y-6 font-serif text-lg md:text-[1.22rem] leading-[1.9] text-gray-800">
              <p>
                Nel 1997 la storica band italiana <strong>Dik Dik</strong> decide
                di tornare con un album di canzoni inedite. Per l’occasione viene
                scelto come autore <strong>Emanuele Monetti</strong>, da loro considerato
                come “il nuovo Battisti”.
              </p>

              <p>
                Monetti firma tutti i brani dell’intero album
                <strong> Isole in viaggio</strong>, prodotto da
                <strong> Ricky Gianco</strong>. Il progetto è molto ambizioso e vede la
                collaborazione di musicisti come
                <strong> Dario Baldan Bembo</strong>,
                <strong> Maurizio Solieri</strong> e
                <strong> Marco Ferradini</strong> per citarne alcuni.
              </p>

              <p>
                La promozione dell’album non sarà all’altezza e per
                questo motivo resterà lontano dalle  programmazioni radiofoniche e
                dalle classifiche. Resta comunque, ancora oggi, uno dei lavori più
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
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-gray-500">
              Conferenza stampa “Isole in viaggio”, Milano, settembre 1997
            </p>
          </div>
        </div>

        {/* separatore */}
        <div className="my-16 md:my-20">
          <div className="h-px w-full bg-black/10" />
        </div>

        {/* ARTICOLO GIORNALE */}
        <div className="max-w-[900px]">
          <p className="text-[11px] uppercase tracking-[0.38em] text-gray-500 mb-4">
            Rassegna stampa
          </p>

          <h2 className="font-serif italic text-3xl md:text-4xl leading-none mb-5">
            Articolo di giornale
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