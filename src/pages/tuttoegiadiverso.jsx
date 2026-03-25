import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// immagini principali della pagina
import coverFront from "../assets/albums/tutto-front.jpg";
import coverBack from "../assets/albums/tutto-back.jpg";
import interno from "../assets/albums/interno.jpg";
import label from "../assets/albums/label.jpg";
import credits from "../assets/albums/credits.jpg";
import articolo from "../assets/albums/articolo-la-nuova.jpg";
import sfondo from "../assets/sfondo.png";
import disco from "../assets/albums/discoa.jpg";

export default function TuttoEGiaDiversoPage() {
  // stato per aprire il modal con l'immagine ingrandita
  const [openImage, setOpenImage] = useState(null);
  // traccia attiva nella sezione tracklist
  const [activeTrackIndex, setActiveTrackIndex] = useState(null);

  // ref e altezza del blocco tracklist, usati per allineare la copertina
  const tracklistBlockRef = useRef(null);
  const [tracklistHeight, setTracklistHeight] = useState(0);

// ref e stato per animare la sezione immersiva quando entra in viewport
  const highlightRef = useRef(null);
  const [highlightVisible, setHighlightVisible] = useState(false);
  // tracklist del disco
  const tracks = [
    { title: "Giada", duration: "4.08" },
    { title: "Parole d’amore", duration: "4.06" },
    { title: "La spesa", duration: "3.49" },
    { title: "Come fosse una canzone", duration: "3.56" },
    { title: "Dopo di me", duration: "4.40" },
    { title: "Come il vento", duration: "4.20" },
    { title: "Negli occhi miei", duration: "4.15" },
    { title: "L’ultimo battito del cuore", duration: "3.53" },
    { title: "Sorriderai", duration: "4.09" },
    { title: "…Tutto è già diverso", duration: "4.05" },
  ];
  //************************************************ */
//track item con evidenziazione del brano attivo al click
  
function TrackItem({
      index,
      title,
      duration,
      activeTrackIndex,
      setActiveTrackIndex,
    }) {
      const itemRef = useRef(null);

      useEffect(() => {
        const node = itemRef.current;
        if (!node) return;

        const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
        if (!isMobile) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveTrackIndex(index);
            }
          },
          {
            threshold: 0.75,
          }
        );

        observer.observe(node);

        return () => observer.disconnect();
      }, [index, setActiveTrackIndex]);

      const isActive = activeTrackIndex === index;

      return (
        <li
          ref={itemRef}
          className="flex justify-between items-baseline gap-6 group cursor-default"
          onMouseEnter={() => setActiveTrackIndex(index)}
          onMouseLeave={() => {
            const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
            if (!isMobile) {
              setActiveTrackIndex(null);
            }
          }}
        >
          <span
            className={`
              font-serif
              text-[1.32rem] md:text-[1.48rem]
              leading-[1.45]
              transition-colors duration-300
              ${isActive ? "text-[#92484f]" : "text-gray-900"}
            `}
          >
            {String(index + 1).padStart(2, "0")}. {title}
          </span>

          <span
            className={`
              text-[1.18rem] md:text-[1.28rem]
              italic shrink-0
              transition-colors duration-300
              ${isActive ? "text-[#92484f]/80" : "text-gray-500/80"}
            `}
          >
            {duration}
          </span>
        </li>
      );
    }
//************************************************************************* */    
// effetto per aggiornare l'altezza del blocco tracklist al caricamento e al resize, usata per allineare la copertina a destra
   useEffect(() => {
  const node = tracklistBlockRef.current;
  if (!node) return;

  const updateTracklistHeight = () => {
    setTracklistHeight(node.offsetHeight);
  };

  updateTracklistHeight();

  const observer = new ResizeObserver(() => {
    updateTracklistHeight();
  });

  observer.observe(node);
  window.addEventListener("resize", updateTracklistHeight);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", updateTracklistHeight);
  };
}, []);

/******************************************************* */
// gruppi crediti
  const creditGroups = [
    {
      title: "Scrittura",
      lines: ["Testi e musiche di Emanuele Monetti"],
    },
    {
      title: "Produzione",
      lines: [
        "Produzione artistica Piercarlo D’Amato",
        "Produttore esecutivo Ricky Gianco",
      ],
    },
    {
      title: "Arrangiamenti",
      lines: [
        "Daniele Cimitan",
        "Piercarlo D’Amato",
        "Emanuele Monetti",
      ],
    },
    {
      title: "Musicisti",
      lines: [
        "Programmazione e tastiere: Daniele Cimitan",
        "Pianoforte: Emanuele Monetti, Francesco Sartori",
        "Chitarra elettrica e acustica: Al Guariento",
        "Basso: Massimo Vanzan",
        "Sax soprano ne 'L’ultimo battito del cuore': Maurizio Caldura",
      ],
    },
    {
      title: "Recording",
      lines: [
        "Registrato al New Tendency Studio da Daniele Cimitan",
        "Mixato al Condulmer Recording Studio da Sandro Franchin",
        "Mastering: Davide Trucco",
      ],
    },
  ];
 //**************************************************************************** */ 
//effetto per attivare l'animazione della sezione immersiva quando entra in viewport
    useEffect(() => {
  const node = highlightRef.current;
  if (!node) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      // quando entra → attiva animazione
      if (entry.isIntersecting) {
        setHighlightVisible(true);
      } else {
        // quando esce → resetta
        setHighlightVisible(false);
      }
    },
    {
      threshold: 0.3, // più alto = deve essere più visibile
    }
  );

  observer.observe(node);

  return () => observer.disconnect();
}, []);

//**************************************************************************** */

  return (
    <>
      {/* keyframes per il bordo animato del bottone Ascolta */}
      <style>
        {`
          @keyframes spinBorder {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* pagina principale */}
      <section className="bg-paper min-h-screen pt-28 md:pt-36 pb-24 overflow-hidden">
        {/* contenitore centrale del contenuto */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* bottone ritorno alla discografia */}
          <div className="mb-10 md:mb-14">
            <Link
              to="/#timeline"
              className="group inline-flex items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Torna alla discografia
            </Link>
          </div>

          {/* =========================================================
              1. HERO
              Titolo pagina + testo introduttivo + copertina album
             ========================================================= */}
          <section className="relative min-h-[760px] md:min-h-[860px] flex items-center py-10 md:py-16">
            {/* leggero gradiente di fondo */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-paper/80" />
            </div>

            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* colonna sinistra con testi */}
              <div className="md:col-span-7 flex flex-col items-start text-left">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 block">
                  Album · 2014
                </span>

                {/* titolo principale con ombra molto leggera */}
                <h1
                  className="
                    font-serif
                    text-5xl md:text-7xl lg:text-8xl
                    text-[#92484f]
                    leading-tight
                    mb-8
                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]
                  "
                >
                  ...Tutto è già <br />
                  <i className="font-normal">diverso</i>
                </h1>

                {/* testo introduttivo */}
                <p className="font-serif text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed italic opacity-90">
                  Un viaggio nel tempo interiore, dove musica e parola si fanno
                  memoria, e ogni brano lascia il segno di qualcosa che, nel
                  momento stesso in cui si ascolta, è già cambiato.
                </p>

                {/* pulsante ascolta con bordo animato sempre attivo
                    e riempimento rosso al passaggio del mouse */}
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="https://open.spotify.com/intl-it/album/2EPBkFcUQLkJA4dcOOTDoo"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      relative
                      inline-flex items-center justify-center
                      rounded-full
                      px-7 py-3
                      text-[11px] font-medium uppercase tracking-[0.24em]
                      text-gray-900
                      overflow-hidden
                      group
                    "
                  >
                    {/* bordo animato */}
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        padding: "1.5px",
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #92484f 310deg, #d46a73 340deg, transparent 360deg)",
                        animation: "spinBorder 3.5s linear infinite",
                      }}
                    />

                    {/* fondo interno che si riempie di rosso in hover */}
                    <span
                      className="
                        absolute inset-[1.5px]
                        rounded-full
                        bg-[#f3efe6]
                        transition-all duration-400 ease-out
                        group-hover:bg-[#92484f]
                      "
                    />

                    {/* bordo base */}
                    <span
                      className="
                        absolute inset-0
                        rounded-full
                        border border-gray-300
                        z-10
                        transition-all duration-300
                        group-hover:border-[#92484f]
                      "
                    />

                    {/* testo */}
                    <span
                      className="
                        relative z-20
                        transition-colors duration-300
                        group-hover:text-white
                      "
                    >
                      Ascolta
                    </span>
                  </a>
                </div>
              </div>

              {/* colonna destra con copertina album */}
              <div className="md:col-span-5 relative flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenImage(coverFront)}
                  className="group w-full flex justify-center items-center bg-transparent cursor-zoom-in"
                >
                  <img
                    src={coverFront}
                    alt="Copertina album Tutto è già diverso"
                    className="
                      max-h-[760px]
                      w-auto
                      object-contain
                      will-change-transform
                      drop-shadow-[0_30px_60px_rgba(0,0,0,0.28)]
                      transition-all duration-500 ease-out
                      group-hover:scale-[1.025]
                      group-hover:-translate-y-1
                      group-hover:drop-shadow-[0_38px_70px_rgba(0,0,0,0.34)]
                    "
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================
            2. SEZIONE FULL WIDTH CON SFONDO
            Questa sezione esce dal contenitore centrale e prende
            tutta la larghezza dello schermo
           ========================================================= */}
          <section
              ref={highlightRef}
              className={`
                relative
                w-screen
                left-1/2
                right-1/2
                -ml-[50vw]
                -mr-[50vw]
                h-[420px] md:h-[600px] lg:h-[750px]
                overflow-hidden
                my-10 md:my-16
                flex items-center justify-center
                transition-all duration-1000 ease-out
                ${
                  highlightVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              {/* immagine di background */}
              <img
                src={sfondo}
                alt="Sfondo emozionale album"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* overlay per migliorare la leggibilità del testo */}
              <div className="absolute inset-0 bg-black/20" />

              {/* contenuto centrale */}
              <div className="relative z-10 max-w-4xl px-6 text-center">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#92484f] block mb-6">
                  Brano in evidenza · Giada
                </span>

                <blockquote
                  className="
                    font-serif
                    text-2xl md:text-4xl lg:text-5xl
                    italic
                    text-[#92484f]
                    leading-[1.6]
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
                  "
                >
                  “E non c’è niente da capire, se non il tempo che ci passa sopra,
                  lasciando il segno di una vita intera…”
                </blockquote>

                <div className="mt-10 w-24 h-px bg-[#92484f]/40 mx-auto" />
              </div>
            </section>
        {/* il resto del contenuto torna dentro il contenitore centrale */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
{/* =========================================================
    3. TRACKLIST + COPERTINA + ARTICOLO
    Nuovo layout bilanciato:
    - sopra: tracklist a sinistra e copertina a destra
    - sotto: articolo giornale a tutta larghezza
   ========================================================= */}
          <section className="pt-20 pb-32">
            {/* BLOCCO SUPERIORE */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-24 items-start">
              {/* colonna sinistra: tracklist */}
              <div ref={tracklistBlockRef}>
                <header className="mb-8">
                  <h2 className="font-serif text-4xl text-[#725a43] mb-2">
                    Tracklist
                  </h2>
                  <div className="h-0.5 w-12 bg-[#725a43]/30" />
                </header>

                <ul className="text-gray-900 space-y-4">
                  {tracks.map((track, index) => (
                    <TrackItem
                      key={track.title}
                      index={index}
                      title={track.title}
                      duration={track.duration}
                      activeTrackIndex={activeTrackIndex}
                      setActiveTrackIndex={setActiveTrackIndex}
                    />
                  ))}
                </ul>
              </div>

              {/* colonna destra: copertina intera, proporzioni corrette */}
              <div className="flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={() => setOpenImage(coverBack)}
                  className="group cursor-zoom-in flex justify-center"
                >
                  <img
                    className="
                      w-full
                      max-w-[630px]
                      h-auto
                      object-contain
                      shadow-[0_25px_60px_rgba(0,0,0,0.16)]
                      transition-transform duration-300
                    "
                    alt="Retro copertina album"
                    src={coverBack}
                  />
                </button>
              </div>
            </div>


          {/* =========================================================
              4. CREDITI
             ========================================================= */}
          <section className="py-24 bg-[#eae8e4] relative mt-32 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center px-6 md:px-12">
              {/* testi crediti */}
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                  {creditGroups.map((group) => (
                    <div key={group.title} className="space-y-4">
                      <h4 className="uppercase tracking-widest text-[#92484f] text-xs">
                        {group.title}
                      </h4>
                      <div className="font-serif text-gray-700 leading-[1.8]">
                        {group.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* immagine crediti */}
              <div className="order-1 md:order-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenImage(credits)}
                    className="w-full cursor-zoom-in"
                  >
                    <img
                      className="w-full aspect-video object-cover shadow-inner opacity-85"
                      alt="Crediti album"
                      src={credits}
                    />
                  </button>

                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#92484f] rounded-full flex items-center justify-center text-white font-serif italic transform rotate-12 shadow-lg">
                    Credits
                  </div>
                </div>
              </div>
            </div>
          </section>

{/********************************************************** 
        Articolo giornale a tutta larghezza, con immagine cliccabile per ingrandiree didascalia
         **********************************************************/}
            {/* BLOCCO INFERIORE: articolo giornale */}
            <div className="mt-20">
              <div className="relative py-4 md:py-6">
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                  }}
                />

                <h2 className="font-serif text-3xl text-[#92484f] mb-6">
                  Uscita e risonanza
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed mb-8 font-serif max-w-3xl">
                  L’album arriva in un momento importante del percorso artistico
                  di Emanuele Monetti e trova spazio anche sulla stampa,
                  lasciando una testimonianza concreta della sua identità, della
                  sua scrittura e del valore del progetto.
                </p>

                <button
                    type="button"
                    onClick={() => setOpenImage(articolo)}
                    className="relative group mx-auto block w-fit text-left cursor-zoom-in"
                  >
                    <img
                      className="
                        block
                        max-w-full
                        h-auto
                        shadow-[0_30px_70px_rgba(0,0,0,0.22)]
                        transition-transform duration-700
                        group-hover:scale-[1.01]
                      "
                      alt="Articolo di giornale dedicato all'album"
                      src={articolo}
                    />
                  </button>

                <p className="text-[10px] uppercase tracking-widest mt-4 text-gray-500/70">
                  Rassegna stampa · La Nuova
                </p>
              </div>
            </div>
          </section>
          {/* =========================================================
              5. VISUAL ARCHIVE
             ========================================================= */}
          <section className="py-28">
            <header className="mb-20 text-center">
              <h2 className="font-serif text-4xl text-[#725a43] italic">
                Visual Archive
              </h2>
              <p className="text-sm text-gray-500 uppercase tracking-[0.4em] mt-4">
                Una memoria visiva del disco
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* immagine grande */}
              <button
                type="button"
                onClick={() => setOpenImage(interno)}
                className="md:col-span-8 group relative overflow-hidden aspect-[16/9] bg-[#efeeea] cursor-zoom-in"
              >
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  alt="Interno album"
                  src={interno}
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest">
                  Interno
                </div>
              </button>

              {/* label */}
              <button
                type="button"
                onClick={() => setOpenImage(label)}
                className="md:col-span-4 group relative overflow-hidden aspect-[3/4] bg-[#efeeea] cursor-zoom-in"
              >
                <img
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                  alt="Label del disco"
                  src={label}
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest">
                  Label
                </div>
              </button>

              {/* immagine panoramica finale */}
              <button
                type="button"
                onClick={() => setOpenImage(coverFront)}
                className="md:col-span-12 group relative overflow-hidden aspect-[21/9] bg-[#efeeea] mt-2 md:mt-8 cursor-zoom-in"
              >
                <img
                  className="w-full h-full object-cover opacity-80"
                  alt="Copertina album in formato panoramico"
                  src={coverFront}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="font-serif text-4xl md:text-6xl text-white/35 select-none italic">
                    L’archivio vivente
                  </h3>
                </div>
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* =========================================================
          MODAL IMMAGINI
          Si apre quando clicchi una delle immagini della pagina
         ========================================================= */}
      {openImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/88 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpenImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenImage(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/92 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-900 shadow-lg"
            >
              Chiudi
            </button>

            <div className="bg-white overflow-hidden shadow-2xl">
              <img
                src={openImage}
                alt="Dettaglio album"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}