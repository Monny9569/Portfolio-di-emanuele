import {
  ChevronDownIcon,
  PlayIcon,
  ShoppingBagIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import ReadButton from "../components/ReadButton";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { requestCinemaFullscreenFromGesture } from "../utils/cinemaVideoGesture";
import BottomYouTubePlayer from "../components/BottomYouTubePlayer";
import CinemaVideoModal from "../components/CinemaVideoModal";
import FlipCard from "../components/FlipCard";
import Footprint from "../components/Footprint";
import { t } from "../i18n";
import releasesData from "../data/releases";
import {
  getPlayableTracks,
  hasValidListeningUrl,
  releasePlayerKey,
} from "../utils/releasePlayer";
export default function Timeline() {
  const showFootprints = false;
  const timelineRef = useRef(null);
  const timelineEndRef = useRef(null);

  const [openArticle, setOpenArticle] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [cinemaVideo, setCinemaVideo] = useState(null);
  const [showScrollCue, setShowScrollCue] = useState(false);
  const [isScrollCueEnabled, setIsScrollCueEnabled] = useState(() =>
    typeof window !== "undefined"
      ? !window.matchMedia("(max-width: 430px)").matches
      : false
  );

  const releases = releasesData.filter((item) => item.disabled !== true);

  // funzione per determinare la classe di aspect ratio in base al formato del disco
  const getAspectClass = (item) => {
    const format = item.format?.trim().toLowerCase();

    if (format === "album") return  "aspect-square"//"aspect-[5/4]";
    if (format === "singolo" || format === "single") return "aspect-square";
    if (format === " ") return "aspect-square";
    // fallback di sicurezza
    return "aspect-square";
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 430px)");
    const handleMediaChange = (event) => {
      const enabled = !event.matches;
      setIsScrollCueEnabled(enabled);
      if (!enabled) setShowScrollCue(false);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isScrollCueEnabled || !("IntersectionObserver" in window)) return;

    const section = timelineRef.current;
    const end = timelineEndRef.current;
    if (!section || !end) return;

    let timelineActive = false;
    let endReached = false;

    const syncVisibility = () => {
      const nextVisible = timelineActive && !endReached;
      setShowScrollCue((current) =>
        current === nextVisible ? current : nextVisible
      );
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        timelineActive = entry.isIntersecting;
        syncVisibility();
      },
      { rootMargin: "0px 0px -15% 0px" }
    );

    const hideAtEndObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
          endReached = true;
          syncVisibility();
        }
      },
      { rootMargin: "0px 0px -32% 0px" }
    );

    const showBeforeEndObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          endReached = false;
          syncVisibility();
        }
      },
      { rootMargin: "0px 0px -24% 0px" }
    );

    sectionObserver.observe(section);
    hideAtEndObserver.observe(end);
    showBeforeEndObserver.observe(end);

    return () => {
      sectionObserver.disconnect();
      hideAtEndObserver.disconnect();
      showBeforeEndObserver.disconnect();
    };
  }, [isScrollCueEnabled]);

  return (
    <>
      <section
        ref={timelineRef}
        id="timeline"
        className="relative z-0 overflow-x-clip bg-paper py-16 sm:py-20 md:py-40 scroll-mt-[var(--nav-height-current,64px)]"
      >
        {showFootprints && <Footprint />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
          {/* titolo sezione */}
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900">
              {t("Diario di Bordo", "Logbook")}
            </h2>
            <div className="w-24 h-px bg-[#b01c24] mx-auto mt-4" />
          </div>

          {/* linea centrale fissa */}
          <div className="timeline-axis" aria-hidden="true" />

          {/* contenuti — mobile: editoriale 2 col + asse centrale; md+: layout desktop */}
          <div className="timeline-track relative z-10 min-w-0">
            {releases.map((item, index) => {
              const isReversed = index % 2 === 1;

              const renderMedia = () => (
                <div className="timeline-item-mobile__media flex min-w-0 md:w-[44%] md:justify-center">
                  <div className="timeline-cover-mobile w-full min-w-0 md:mx-auto md:max-w-[min(100%,460px)]">
                    {item.type === "press" ? (
                      <button
                        type="button"
                        onClick={() => setOpenArticle(item)}
                        className="w-full text-left transition-transform duration-500 hover:scale-[1.015]"
                      >
                        <div className="cover-elevated rounded-none bg-white">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="timeline-cover-mobile__img block w-full h-auto object-contain"
                          />
                        </div>
                      </button>
                    ) : (
                      <FlipCard
                        frontImage={item.image}
                        backImage={item.backImage || item.image}
                        altFront={item.title}
                        altBack={t(`${item.title} retro`, `${item.title} back cover`)}
                        className="w-full"
                        aspectClass={getAspectClass(item)}
                        roundedClass="0"
                        buttonPosition="bottom-2 right-2 md:bottom-3 md:right-3"
                      />
                    )}
                  </div>
                </div>
              );

              const renderText = () => (
                <div className="timeline-item-mobile__text min-w-0 md:w-[44%]">
                  <div className="mx-auto min-w-0 max-w-[470px] max-md:mx-0 max-md:max-w-none md:mx-0">
                    <h3 className="mb-3 font-serif text-[1.05rem] italic leading-[1.2] text-gray-900 break-words whitespace-pre-line max-md:pr-0 sm:max-md:text-[1.15rem] md:mb-4 md:text-[2.5rem] md:leading-tight">
                      {item.title}
                    </h3>

                    <div className="mb-3 h-px w-10 bg-[#b01c24] max-md:w-8 md:mb-5 md:w-16" />
                    {item.format && item.format.trim() !== "" && (
                      <p className="mb-2 inline-block border border-[#b01c24] px-2 py-0.5 text-[8px] uppercase tracking-[0.28em] text-[#b01c24] max-md:leading-tight md:mb-4 md:px-3 md:py-1 md:text-[10px] md:tracking-[0.35em]">
                        {item.format}
                      </p>
                    )}

                    {item.subtitle && (
                      <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-gray-500 max-md:leading-snug md:mb-3 md:text-[12px] md:tracking-[0.25em]">
                        {item.subtitle}
                      </p>
                    )}
                    {item.description?.trim() && (
                      <p className="mb-4 font-serif text-[0.8rem] leading-[1.55] text-gray-700 break-words max-md:max-w-none sm:max-md:text-[0.85rem] md:mb-6 md:max-w-[520px] md:text-[1.1rem] md:leading-[1.9]">
                        {item.description}
                      </p>
                    )}

                    {item.credits && item.credits.length > 0 && (
                      <div className="mb-4 space-y-1 max-md:space-y-0.5 md:mb-6 md:space-y-2">
                        {item.credits.map((credit, i) => (
                          <p
                            key={i}
                            className="max-md:text-[0.68rem] max-md:leading-snug text-[0.9rem] leading-[1.6] text-gray-500 italic"
                          >
                            {credit}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex max-md:mt-2 max-md:flex-col max-md:items-start max-md:gap-2 md:flex-wrap md:gap-3">
                      {item.type === "music" && item.cinemaVideoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            flushSync(() => {
                              setCinemaVideo({
                                title: item.title,
                                url: item.cinemaVideoUrl,
                                coverImage: item.image,
                              });
                            });
                            requestCinemaFullscreenFromGesture();
                          }}
                          aria-label={t(`Guarda il video ${item.title}`, `Watch the video ${item.title}`)}
                          className="group inline-flex min-h-[44px] max-md:px-4 max-md:py-2 max-md:text-[9px] max-md:tracking-[0.2em] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:px-6 sm:py-3"
                        >
                          <VideoCameraIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                          {t("Video", "Video")}
                        </button>
                      )}

                      {item.type === "music" &&
                        getPlayableTracks(item).length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const tracks = getPlayableTracks(item);
                              if (tracks.length === 0) return;
                              const key = releasePlayerKey(item);
                              setCurrentPlayer((prev) =>
                                prev?.playerKey === key
                                  ? null
                                  : {
                                      playerKey: key,
                                      albumTitle: item.title,
                                      coverImage: item.image,
                                      tracks,
                                    }
                              );
                            }}
                            className="group inline-flex min-h-[44px] max-md:px-4 max-md:py-2 max-md:text-[9px] max-md:tracking-[0.2em] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:px-6 sm:py-3"
                          >
                            <PlayIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                            {t("Ascolta", "Listen")}
                          </button>
                        )}

                      {item.type === "music" &&
                        !item.cinemaVideoUrl &&
                        hasValidListeningUrl(item.listenLink) &&
                        getPlayableTracks(item).length === 0 && (
                          <a
                            href={item.listenLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex min-h-[44px] max-md:px-4 max-md:py-2 max-md:text-[9px] max-md:tracking-[0.2em] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:px-6 sm:py-3"
                          >
                            <PlayIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                            {t("Ascolta", "Listen")}
                          </a>
                        )}

                      {(item.type === "music" || item.type === "press") &&
                        item.pageLink && <ReadButton to={item.pageLink} />}

                      {item.type === "music" &&
                        item.buyLink &&
                        item.buyLink !== "https://..." && (
                          <a
                            href={item.buyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex min-h-[44px] max-md:px-4 max-md:py-2 max-md:text-[9px] max-md:tracking-[0.2em] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:px-6 sm:py-3"
                          >
                            <ShoppingBagIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                            {t("Compra", "Buy")}
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={`timeline-item-mobile group relative min-w-0 md:mb-36 md:flex md:flex-row md:items-center md:justify-between md:py-0 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* mobile: anno + pallino sopra il contenuto */}
                  <div
                    className="timeline-item-mobile__marker pointer-events-none md:hidden"
                    aria-hidden="true"
                  >
                    <span className="timeline-year-mobile">{item.date}</span>
                    <span className="timeline-dot-mobile" />
                  </div>

                  {/* mobile: due colonne con alternanza */}
                  <div className="timeline-item-mobile__content md:hidden">
                    <div className="timeline-item-mobile__left min-w-0">
                      {isReversed ? renderMedia() : renderText()}
                    </div>
                    <div className="timeline-item-mobile__right min-w-0">
                      {isReversed ? renderText() : renderMedia()}
                    </div>
                  </div>

                  {/* desktop: media poi testo (invariato) */}
                  <div className="hidden md:contents">
                    {renderMedia()}
                    {renderText()}
                  </div>

                  {/* desktop: anno + pallino centrati sull’asse */}
                  <div className="absolute left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center md:flex">
                    <span className="mb-2 text-[11px] tracking-[0.35em] uppercase text-gray-500">
                      {item.date}
                    </span>
                    <div className="h-3.5 w-3.5 rounded-full bg-red-600 shadow-[0_0_0_6px_rgba(243,239,230,1)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            ref={timelineEndRef}
            className="timeline-end-sentinel"
            aria-hidden="true"
          />
        </div>

      </section>

      {isScrollCueEnabled && (
        <div
          aria-hidden={!showScrollCue}
          className={`timeline-scroll-cue ${showScrollCue ? "is-visible" : "is-hidden"}`}
        >
          <div className="timeline-scroll-cue__inner">
            <span className="timeline-scroll-cue__text">
              {t("SCORRI", "SCROLL")}
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              className="timeline-scroll-cue__circle"
            >
              <ChevronDownIcon className="timeline-scroll-cue__icon" />
            </motion.div>
          </div>
        </div>
      )}

      {/* player YouTube */}
     {currentPlayer && (
        <BottomYouTubePlayer
          player={currentPlayer}
          onClose={() => setCurrentPlayer(null)}
        />
      )}

      <CinemaVideoModal
        open={!!cinemaVideo}
        title={cinemaVideo?.title ?? ""}
        youtubeUrl={cinemaVideo?.url ?? ""}
        coverImage={cinemaVideo?.coverImage}
        onClose={() => setCinemaVideo(null)}
      />

      {/* modal articolo */}
      {openArticle && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 supports-[backdrop-filter]:backdrop-blur-sm"
          onClick={() => setOpenArticle(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenArticle(null)}
              className="absolute top-4 right-4 z-20 min-h-[44px] rounded-full bg-white/90 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-gray-900 shadow-lg"
            >
              {t("Chiudi", "Close")}
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
