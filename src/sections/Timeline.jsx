import { PlayIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";
import BottomSpotifyPlayer from "../components/BottomSpotifyPlayer";
import FlipCard from "../components/FlipCard";
import Footprint from "../components/Footprint";
import releasesData from "../data/releases";

export default function Timeline() {
  const showFootprints = false;

  const [openArticle, setOpenArticle] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const releases = releasesData.filter((item) => item.disabled !== true);

  return (
    <>
      <section
        id="timeline"
        className="relative py-24 md:py-40 bg-paper overflow-hidden"
      >
        {showFootprints && <Footprint />}

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
          {/* titolo sezione */}
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900">
              Discografia
            </h2>
            <div className="w-24 h-px bg-[#b01c24] mx-auto mt-4" />
          </div>

          {/* linea centrale fissa */}
          <div className="absolute left-1/2 top-32 md:top-36 bottom-0 -translate-x-1/2 w-px bg-[#d8d3c7]" />

          {/* contenuti */}
          <div className="relative">
            {releases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`group relative flex items-center justify-between mb-28 md:mb-36 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* colonna immagine */}
                <div className="w-[44%] flex justify-center">
                  <div className="w-full max-w-[460px]">
                    {item.type === "press" ? (
                      <button
                        type="button"
                        onClick={() => setOpenArticle(item)}
                        className="w-full text-left transition-transform duration-500 hover:scale-[1.015]"
                      >
                        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_50px_rgba(0,0,0,0.12)]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    ) : (
                      <FlipCard
                        frontImage={item.image}
                        backImage={item.backImage || item.image}
                        altFront={item.title}
                        altBack={`${item.title} retro`}
                        className="h-full"
                        aspectClass="aspect-square"
                        roundedClass="0"
                        shadowClass="shadow-[0_30px_50px_rgba(0,0,0,0.12)]"
                        buttonStyle="dark"
                      />
                    )}
                  </div>
                </div>

                {/* pallino centrale */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <span className="mb-2 text-[11px] tracking-[0.35em] uppercase text-gray-500">
                    {item.date}
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600 shadow-[0_0_0_6px_rgba(243,239,230,1)]" />
                </div>

                {/* colonna testo */}
                <div className="w-[44%]">
                  <div className="max-w-[470px]">
                    <h3 className="font-serif italic text-[2rem] md:text-[2.5rem] leading-none text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    
              {/*Linea Rossa*/ }
                    <div className="w-16 h-px bg-[#b01c24] mb-5" />
                    {/* inserisco il formato se LP,ALbum o Singolo */}
                     {item.format && item.format.trim() !== "" && (
                      <p className="inline-block text-[10px] uppercase tracking-[0.35em] text-[#b01c24] border border-[#b01c24] px-3 py-1 mb-4">
                        {item.format}
                      </p>
                    )}

                    {/* inserisco un sottotitolo */}
                    {item.subtitle && (
                      <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mb-3">
                        {item.subtitle}
                      </p>
                    )}
                    {/* inserisco la descrizione */}
                   <p className="font-serif text-[1.1rem] leading-[1.9] text-gray-700 mb-6 max-w-[520px]">
                      {item.description}
                    </p>

                    {item.credits && item.credits.length > 0 && (
                      <div className="mb-6 space-y-2">
                        {item.credits.map((credit, i) => (
                          <p
                            key={i}
                           className="text-[0.9rem] leading-[1.6] text-gray-500 italic">
                          
                            {credit}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {item.type === "music" && item.spotifyEmbed && (
                        <button
                          type="button"
                        onClick={() =>
                                setCurrentPlayer((prev) =>
                                  prev?.embed === item.spotifyEmbed
                                    ? null
                                    : {
                                        title: item.title,
                                        embed: item.spotifyEmbed,
                                      }
                                )
                              }
                          className="group inline-flex items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                          <PlayIcon className="h-4 w-4" />
                          Ascolta
                        </button>
                      )}

                      {item.type === "music" &&
                        item.spotifyLink &&
                        !item.spotifyEmbed && (
                          <a
                            href={item.spotifyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                          >
                            <PlayIcon className="h-4 w-4" />
                            Ascolta
                          </a>
                        )}

                      {item.type === "music" &&
                        item.buyLink &&
                        item.buyLink !== "https://..." && (
                          <a
                            href={item.buyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                          >
                            <ShoppingBagIcon className="h-4 w-4" />
                            Compra
                          </a>
                        )}

                      {item.type === "press" && (
                        <button
                          type="button"
                          onClick={() => setOpenArticle(item)}
                          className="group inline-flex items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                          Leggi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* player spotify */}
     {currentPlayer && (
        <BottomSpotifyPlayer
          player={currentPlayer}
          onClose={() => setCurrentPlayer(null)}
        />
      )}

      {/* modal articolo */}
      {openArticle && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenArticle(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenArticle(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-900 shadow-lg"
            >
              Chiudi
            </button>

            <div className="bg-white  overflow-hidden shadow-2xl">
              <img
                src={openArticle.fullImage || openArticle.image}
                alt={openArticle.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}