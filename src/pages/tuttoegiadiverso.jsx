// TuttoEGiaDiversoPage.jsx
// Vite + React + Tailwind
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import BottomYouTubePlayer from "../components/BottomYouTubePlayer";
import releasesData from "../data/releases";
import {
  getPlayableTracks,
  releasePlayerKey,
} from "../utils/releasePlayer";
// Immagini
import coverFront from "../assets/albums/tutto-front.jpg";
import coverBack from "../assets/albums/tutto-back.jpg";
import articolo from "../assets/albums/articolo-la-nuova.jpg";
import credits from "../assets/albums/credits.jpg";
import discoa from "../assets/albums/discoa.jpg";
import { t } from "../i18n";
const easeOut = [0.22, 1, 0.36, 1];
const SECTION_COUNT = 5;

const tracklistContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
};
const tracklistItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

export default function TuttoEGiaDiversoPage() {
  const prefersReducedMotion = useReducedMotion();
  const scrollReveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28, scale: 0.988 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-72px 0px -40px 0px", amount: 0.2 },
        transition: { duration: 0.68, ease: easeOut },
      };

  const heroEnter = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, ease: easeOut },
      };

  const [openImage, setOpenImage] = useState(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const tuttoRelease = useMemo(
    () => releasesData.find((r) => r.pageLink === "/tuttoegiadiverso"),
    []
  );

  const openTuttoPlayer = () => {
    if (!tuttoRelease) return;
    const playable = getPlayableTracks(tuttoRelease);
    if (playable.length === 0) return;
    const key = releasePlayerKey(tuttoRelease);
    setCurrentPlayer((prev) =>
      prev?.playerKey === key
        ? null
        : {
            playerKey: key,
            albumTitle: tuttoRelease.title,
            coverImage: tuttoRelease.image,
            tracks: playable,
          }
    );
  };
  const { scrollYProgress } = useScroll();
  const heroSectionRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroCoverY = useTransform(heroScrollProgress, [0, 1], [0, 52]);

  const sectionRefs = useRef([]);
  const [blurSectionIndex, setBlurSectionIndex] = useState(null);
  // Tracklist
  const tracks = [
    { title: "Giada", duration: "4:08" },
    { title: "Parole d'amore", duration: "4:06" },
    { title: "La spesa", duration: "3:49" },
    { title: "Come fosse una canzone", duration: "3:56" },
    { title: "Dopo di me", duration: "4:40" },
    { title: "Come il vento", duration: "4:20" },
    { title: "Negli occhi miei", duration: "4:15" },
    { title: "L'ultimo battito del cuore", duration: "3:53" },
    { title: "Sorriderai", duration: "4:09" },
    { title: "…Tutto è già diverso", duration: "4:05" },
  ];
  // Crediti
  const creditGroups = [
    {
      title: t("Testi e musica", "Lyrics and music"),
      lines: ["Emanuele Monetti"],
    },
    {
      title: t("Arrangiamenti", "Arrangements"),
      lines: ["Daniele Cimitan", "Piercarlo D'Amato", "Emanuele Monetti"],
    },
    {
      title: t("Musicisti", "Musicians"),
      lines: [
        t("Programmazione e tastiere: Daniele Cimitan", "Programming and keyboards: Daniele Cimitan"),
        t("Pianoforte: Emanuele Monetti, Francesco Sartori", "Piano: Emanuele Monetti, Francesco Sartori"),
        t("Chitarra elettrica e acustica: Al Guariento", "Electric and acoustic guitar: Al Guariento"),
        t("Basso: Massimo Vanzan", "Bass: Massimo Vanzan"),
        t("Sax soprano: Maurizio Caldura", "Soprano sax: Maurizio Caldura"),
      ],
    },
  ];
  const creditStudioBlocks = [
    t(
      "Registrato al New Tendency Studio da Daniele Cimitan. Mixato al Condulmer Recording Studio da Sandro Franchin. Mastering: Davide Truccolo.",
      "Recorded at New Tendency Studio by Daniele Cimitan. Mixed at Condulmer Recording Studio by Sandro Franchin. Mastering: Davide Truccolo."
    ),
    t(
      "Produzione artistica: Piercarlo D'Amato. Produttore esecutivo: Ricky Gianco.",
      "Artistic production: Piercarlo D'Amato. Executive producer: Ricky Gianco."
    ),
  ];
  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset una tantum quando il blur viene disattivato
      setBlurSectionIndex(null);
      return;
    }
    const mobileMq = window.matchMedia("(max-width: 767px)");
    if (mobileMq.matches) {
      setBlurSectionIndex(null);
      return;
    }
    const updateBlur = () => {
      const list = sectionRefs.current;
      if (!list[0]) return;
      const mid = window.innerHeight * 0.36;
      let idx = 0;
      for (let i = 0; i < SECTION_COUNT; i++) {
        const el = list[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) idx = i;
      }
      let blur = null;
      if (idx > 0) {
        const prevEl = list[idx - 1];
        if (prevEl) {
          const r = prevEl.getBoundingClientRect();
          if (r.bottom > 12 && r.top < window.innerHeight - 12) blur = idx - 1;
        }
      }
      setBlurSectionIndex(blur);
    };
    const onScroll = () => requestAnimationFrame(updateBlur);
    updateBlur();
    queueMicrotask(updateBlur);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion]);

  /** Indizio visivo molto leggero sulla sezione sopra (niente scroll snap sul documento) */
  const sectionLayerClass = (index) => {
    const blurred =
      !prefersReducedMotion && blurSectionIndex === index;
    return [
      "min-h-0",
      "transition-[filter,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      blurred
        ? "max-md:blur-0 max-md:opacity-100 max-md:saturate-100 blur-[0.5px] opacity-[0.98] saturate-[0.995]"
        : "blur-0 opacity-100 saturate-100",
    ].join(" ");
  };

  return (
    <>
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 right-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-[#92484f] via-[#b85d66] to-[#92484f]"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
      )}
      <section className="page-with-bottom-player min-h-[100svh] w-full min-w-0 overflow-x-clip bg-[#f3efe6]">
        
        {/* =======================================================
            1. HERO
           ======================================================= */}
        <section
          ref={(el) => {
            sectionRefs.current[0] = el;
            heroSectionRef.current = el;
          }}
          className={`relative flex min-h-[min(100svh,920px)] items-center overflow-x-clip px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 md:pt-28 lg:px-16 ${sectionLayerClass(0)}`}
        >
          <motion.div
            className="mx-auto w-full min-w-0 max-w-7xl"
            {...heroEnter}
          >
            
            {/* Link ritorno */}
            <div className="mb-14">
              <Link
                to="/#timeline"
                className="group inline-flex min-h-[44px] items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-gray-500 transition-colors duration-300 hover:text-gray-900"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {t("Torna al Diario di Bordo", "Back to the Logbook")}
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Colonna testo */}
              <div className="order-2 lg:order-1">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#92484f] mb-4 block">
                  {t("Album · Ottobre 2014", "Album · October 2014")}
                </span>
                <h1 className="mb-10 max-w-full font-serif text-3xl leading-[1.15] text-balance text-[#161616] sm:text-4xl md:text-5xl lg:text-5xl xl:max-w-none xl:text-[3.4rem] xl:whitespace-nowrap">
                  …Tutto è già <span className="italic">diverso</span>
                </h1>
                {/* Bottone Ascolta — apre il player YouTube in basso */}
                <button
                  type="button"
                  onClick={openTuttoPlayer}
                  className="group inline-flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-[#92484f] hover:bg-[#92484f] hover:text-white sm:px-8 sm:py-4"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t("Ascolta", "Listen")}
                </button>
              </div>
              {/* Colonna immagine */}
              <div className="order-1 lg:order-2 flex justify-center overflow-visible">
                <button
                  type="button"
                  onClick={() => setOpenImage(coverFront)}
                  className="group cursor-zoom-in"
                >
                  <div className="cover-elevated w-full max-w-md lg:max-w-lg">
                    <motion.img
                      src={coverFront}
                      alt={t("Copertina album Tutto è già diverso", "Album cover of Tutto è già diverso")}
                      className="block w-full transition-shadow duration-500 will-change-transform"
                      style={{
                        y: prefersReducedMotion ? 0 : heroCoverY,
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </section>
        {/* =======================================================
            2. CD APERTO — immagine full (al posto sezione Giada)
           ======================================================= */}
        <section
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className={`relative flex min-h-[min(72svh,640px)] items-center justify-center overflow-hidden bg-[#ebe6df] px-4 py-14 sm:py-16 md:min-h-[85svh] md:py-20 ${sectionLayerClass(
            1
          )}`}
        >
          <motion.div className="mx-auto w-full max-w-5xl" {...scrollReveal}>
            <button
              type="button"
              onClick={() => setOpenImage(discoa)}
              className="cover-elevated mx-auto block w-full max-w-4xl cursor-zoom-in"
              aria-label={t("Ingrandisci foto CD jewel case", "Enlarge photo of the CD jewel case")}
            >
              <img
                src={discoa}
                alt={t("Jewel case con CD aperto", "Jewel case with the CD open")}
                className="block h-auto w-full object-contain"
              />
            </button>
          </motion.div>
        </section>
        {/* =======================================================
            3. TRACKLIST
           ======================================================= */}
        <section
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className={`py-24 md:py-32 bg-[#f3efe6] ${sectionLayerClass(2)}`}
        >
          <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Lista brani */}
              <motion.div {...scrollReveal}>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
                  Tracklist
                </h2>
                <div className="h-px w-12 bg-[#92484f] mb-10" />
                {prefersReducedMotion ? (
                  <ul className="space-y-4">
                    {tracks.map((track, index) => (
                      <li
                        key={track.title}
                        className="flex justify-between items-baseline gap-4 group cursor-default"
                        onMouseEnter={() => setActiveTrackIndex(index)}
                        onMouseLeave={() => setActiveTrackIndex(null)}
                      >
                        <span
                          className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                            activeTrackIndex === index
                              ? "text-[#92484f]"
                              : "text-gray-900"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}. {track.title}
                        </span>
                        <span
                          className={`text-sm italic transition-colors duration-300 ${
                            activeTrackIndex === index
                              ? "text-[#92484f]/70"
                              : "text-gray-400"
                          }`}
                        >
                          {track.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <motion.ul
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-48px 0px", amount: 0.2 }}
                    variants={tracklistContainerVariants}
                  >
                    {tracks.map((track, index) => (
                      <motion.li
                        key={track.title}
                        className="flex justify-between items-baseline gap-4 group cursor-default"
                        variants={tracklistItemVariants}
                        onMouseEnter={() => setActiveTrackIndex(index)}
                        onMouseLeave={() => setActiveTrackIndex(null)}
                      >
                        <span
                          className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
                            activeTrackIndex === index
                              ? "text-[#92484f]"
                              : "text-gray-900"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}. {track.title}
                        </span>
                        <span
                          className={`text-sm italic transition-colors duration-300 ${
                            activeTrackIndex === index
                              ? "text-[#92484f]/70"
                              : "text-gray-400"
                          }`}
                        >
                          {track.duration}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
              {/* Retro copertina */}
              <motion.div
                className="flex justify-center lg:justify-end"
                {...scrollReveal}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 0.65,
                        ease: easeOut,
                        delay: 0.12,
                      }
                }
              >
                <button
                  type="button"
                  onClick={() => setOpenImage(coverBack)}
                  className="cursor-zoom-in"
                >
                  <div className="cover-elevated w-full max-w-md">
                    <img
                      src={coverBack}
                      alt={t("Retro copertina", "Back cover")}
                      className="block w-full transition-shadow duration-500"
                    />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </section>
        {/* =======================================================
            4. CREDITI
           ======================================================= */}
        <section
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          className={`py-20 md:py-28 bg-[#eae6de] ${sectionLayerClass(3)}`}
        >
          <motion.div
            className="mx-auto w-full min-w-0 max-w-7xl px-4 md:px-10 lg:px-4"
            {...scrollReveal}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-y-12 lg:gap-x-20">
              {/* Immagine crediti */}
              <div className="w-full flex items-start lg:justify-start">
                <button
                  type="button"
                  onClick={() => setOpenImage(credits)}
                  className="cursor-zoom-in w-full h-full"
                  aria-label={t("Guarda immagine crediti", "View credits image")}
                >
                  <div className="cover-elevated w-full max-w-none overflow-hidden rounded">
                    <img
                      src={credits}
                      alt={t("Crediti album", "Album credits")}
                      className="block h-auto w-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </button>
              </div>

              {/* Testo crediti: sinistra titoli; destra studio/produzione senza titoli */}
              <div className="flex min-w-0 flex-col justify-stretch md:px-10 lg:px-12">
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-14">
                  <div className="space-y-6 sm:space-y-7">
                    {creditGroups.map((group) => (
                      <div key={group.title}>
                        <h4 className="text-[13px] md:text-sm uppercase tracking-[0.19em] text-[#92484f] font-semibold mb-2 md:mb-2.5">
                          {group.title}
                        </h4>
                        <div className="space-y-0.5 break-words text-[1rem] font-[450] leading-snug text-[#222326] md:text-base">
                          {group.lines.map((line) => (
                            <p key={line} className="whitespace-pre-line">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 break-words text-[1rem] font-[450] leading-relaxed text-[#222326] md:text-base sm:pt-0.5">
                    {creditStudioBlocks.map((block) => (
                      <p key={block}>{block}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        {/* =======================================================
            5. RASSEGNA STAMPA
           ======================================================= */}
        <section
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          className={`py-24 md:py-32 bg-[#f3efe6] ${sectionLayerClass(4)}`}
        >
          <motion.div
            className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16"
            {...scrollReveal}
          >
            <p className="font-serif text-lg md:text-xl text-gray-800 text-center leading-relaxed mb-10 max-w-3xl mx-auto">
              {t(
                <>
                  Articolo di Alessandro Torre dalla &ldquo;NUOVA di Venezia Mestre&rdquo; del
                  10.10.2014
                </>,
                <>
                  Article by Alessandro Torre from &ldquo;NUOVA di Venezia Mestre&rdquo;,
                  10.10.2014
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => setOpenImage(articolo)}
              className="cursor-zoom-in block w-full"
            >
              <img
                src={articolo}
                alt={t("Articolo La Nuova", "La Nuova article")}
                className="w-full h-auto shadow-[0_30px_70px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_90px_rgba(0,0,0,0.25)] transition-shadow duration-500"
              />
            </button>
          </motion.div>
        </section>
      </section>
      {/* =======================================================
          MODAL IMMAGINI
         ======================================================= */}
      {currentPlayer && (
        <BottomYouTubePlayer
          player={currentPlayer}
          onClose={() => setCurrentPlayer(null)}
        />
      )}

      {openImage && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 supports-[backdrop-filter]:backdrop-blur-sm"
          onClick={() => setOpenImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenImage(null)}
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top,0px))] z-20 inline-flex min-h-[44px] items-center rounded-full bg-white/90 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gray-900 shadow-lg transition-colors hover:bg-white"
            >
              {t("Chiudi", "Close")}
            </button>
            <img
              src={openImage}
              alt={t("Dettaglio", "Detail")}
              className="h-auto max-h-[min(88svh,100%)] w-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}