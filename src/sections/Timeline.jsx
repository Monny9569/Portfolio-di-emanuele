import { PlayIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import BottomSpotifyPlayer from "../components/BottomSpotifyPlayer";

import { releases } from "../components/releases";
import Footprint from "../components/Footprint";

export default function Timeline() {
  const showFootprints = false;
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

 
  const totalSteps = releases.length * 4;
  const startOffset = 4;
  const endOffset = 90;

  return (
    <>
      <section ref={sectionRef} id="timeline" className="py-24 bg-paper">
        <div className="max-w-5xl mx-auto px-6 relative">
          <h2 className="text-4xl font-serif italic text-center mb-20 text-gray-900 underline decoration-artist decoration-1 underline-offset-8">
            Il Percorso
          </h2>

          {/* Linea verticale animata */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-1/2 top-28 bottom-0 -translate-x-1/2 w-px bg-gray-300"
          />

          {/* Passi lungo il percorso */}
          {showFootprints &&
            Array.from({ length: totalSteps }).map((_, index) => {
              const topPosition =
                startOffset +
                (index / (totalSteps - 1)) * (endOffset - startOffset);

              return (
                <Footprint
                  key={index}
                  side={index % 2 === 0 ? "left" : "right"}
                  progress={scrollYProgress}
                  stepPosition={index / (totalSteps - 1)}
                  style={{
                    top: `${topPosition}%`,
                    marginTop: index % 2 === 0 ? "0px" : "4px",
                  }}
                />
              );
            })}

          {/* Card dei contenuti */}
          <div className="relative">
            {releases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group relative flex items-center justify-between mb-24 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Colonna immagine */}
                <div className="w-[42%]">
                  <div className="mb-6 [perspective:1200px]">
                    <div className="relative aspect-square w-full transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-2">
                      {item.type === "press" ? (
                        <div
                          className="relative h-full w-full rounded-xl bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.22)] overflow-hidden cursor-pointer"
                          onClick={() => setOpenArticle(item.fullImage)}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg border border-gray-100"
                          />

                          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                            <div className="absolute top-0 left-[-120%] h-full w-[60%] bg-white/10 skew-x-[-20deg] transition-all duration-700 group-hover:left-[140%]" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-full w-full rounded-xl transition-transform duration-500 [transition-delay:450ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Fronte */}
                          <div className="absolute inset-0 bg-white p-1.5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.28)] group-hover:ring-1 group-hover:ring-white/40 [backface-visibility:hidden] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-lg border border-gray-100"
                            />

                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                              <div className="absolute top-0 left-[-120%] h-full w-[60%] bg-white/10 skew-x-[-20deg] transition-all duration-700 group-hover:left-[140%]" />
                            </div>
                          </div>

                          {/* Retro */}
                          <div className="absolute inset-0 bg-white p-1.5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                            {item.backImage ? (
                              <img
                                src={item.backImage}
                                alt={`${item.title} retro`}
                                className="w-full h-full object-cover rounded-lg border border-gray-100"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-paper rounded-lg">
                                <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
                                  Retro CD
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Colonna testo */}
                <div className="w-[42%] transition-all duration-300">
                  <h3 className="text-3xl md:text-4xl font-serif italic mb-3 transition-all duration-300 ease-in-out origin-left group-hover:scale-[1.04] text-gray-900">
                    {item.title}
                  </h3>

                  <div className="w-20 h-px bg-artist mb-6" />

                  {item.subtitle && (
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500 mb-4">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="font-serif text-[18px] md:text-[20px] text-gray-700 leading-8 max-w-md tracking-[0.01em]">
                    {item.description}
                  </p>

                  {item.credits && (
                    <div className="mt-5 space-y-2 max-w-md">
                      {item.credits.map((credit, creditIndex) => (
                        <p
                          key={creditIndex}
                          className="text-sm text-gray-500 leading-6"
                        >
                          {credit}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 mt-6 transition-all duration-500 group-hover:translate-y-[-2px]">
                    {item.type === "press" ? (
                      <button
                        onClick={() => setOpenArticle(item.fullImage)}
                        className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
                      >
                        <span className="text-[10px] uppercase tracking-widest">
                          Leggi
                        </span>
                      </button>
                    ) : (
                      <>
                    <button
                        onClick={() => {
                          setActiveAlbum(index);
                          setCurrentPlayer({
                            title: item.title,
                            embed: item.spotifyEmbed,
                          });
                        }}
                        className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 group-hover:bg-[#1db954] group-hover:border-[#1db954] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(29,185,84,0.5)] group-hover:animate-[pulse_2s_ease-in-out_infinite]"
                      >
                        <PlayIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[2px]" />
                        <span className="text-[10px] uppercase tracking-widest">
                          Ascolta
                        </span>
                      </button>

                        {activeAlbum === index && (
                          <a
                            href={item.buyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full transition-all duration-500 hover:bg-black hover:text-white hover:scale-105 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-widest">
                              Compra
                            </span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Punto centrale + data */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">

                <span className="mb-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-gray-500 whitespace-nowrap">
                  {item.date}
                </span>

                <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal articolo */}
      {openArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <button
            onClick={() => setOpenArticle(null)}
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70 transition"
            aria-label="Chiudi articolo"
          >
            ×
          </button>
          <div className="max-h-[90vh] overflow-auto rounded-2xl shadow-2xl">
            <img
              src={openArticle}
              alt="Articolo"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      )}
      <BottomSpotifyPlayer
            player={currentPlayer}
            onClose={() => setCurrentPlayer(null)}
          />
    </>
  );
}