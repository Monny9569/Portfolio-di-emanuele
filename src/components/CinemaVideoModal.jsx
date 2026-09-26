import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { hasExternalMediaConsent } from "../utils/cookieConsent";
import {
  exitCinemaFullscreen,
  isMobileViewport,
} from "../utils/cinemaVideoGesture";
import { loadYouTubeIframeAPI } from "../utils/youtubeIframeApi";

/** Estrae l’ID video da URL watch / youtu.be / embed. */
function youtubeVideoId(url) {
  if (!url || typeof url !== "string") return null;
  const s = url.trim();
  if (!s.startsWith("http")) return null;
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/")[2] || null;
      }
      if (u.pathname === "/watch" || u.pathname.startsWith("/watch/")) {
        return u.searchParams.get("v");
      }
    }
  } catch {
    return null;
  }
  return null;
}

/** Embed cinema: nocookie, autoplay solo dopo click «Guarda il video». */
export function toCinemaEmbedUrl(url) {
  const id = youtubeVideoId(url);
  if (!id) return "";
  const u = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  u.searchParams.set("autoplay", "1");
  u.searchParams.set("rel", "0");
  u.searchParams.set("modestbranding", "1");
  u.searchParams.set("playsinline", "1");
  u.searchParams.set("controls", "1");
  u.searchParams.set("iv_load_policy", "3");
  u.searchParams.set("fs", "1");
  if (typeof window !== "undefined" && window.location?.origin) {
    u.searchParams.set("origin", window.location.origin);
  }
  return u.toString();
}

function requestElementFullscreen(el) {
  if (!el) return Promise.reject(new Error("no element"));
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  return Promise.reject(new Error("fullscreen unsupported"));
}

const PREVIEW_DELAY_MS = 1500;
const AUTOPLAY_CHECK_MS = 2000;
const COVER_FADE_MS = 0.4;

/** Breve effetto “proiettore acceso” — solo all’apertura. */
function CinemaScreenReveal({ active }) {
  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[15] overflow-hidden rounded-md md:rounded-lg"
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.65, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.42, ease: "easeOut", delay: 0.06 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[88%] -translate-x-1/2 -translate-y-1/2 origin-center bg-gradient-to-r from-transparent via-[#f3efe8]/50 to-transparent shadow-[0_0_28px_rgba(243,239,232,0.28)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.95, 0.35, 0] }}
        transition={{
          type: "tween",
          duration: 0.58,
          ease: "easeOut",
          times: [0, 0.32, 0.68, 1],
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-md ring-1 ring-[#f3efe8]/25 md:rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0] }}
        transition={{ type: "tween", duration: 0.62, ease: "easeOut", times: [0, 0.4, 1] }}
      />
    </motion.div>
  );
}

export default function CinemaVideoModal({
  open,
  title,
  youtubeUrl,
  coverImage,
  onClose,
}) {
  const reduceMotion = useReducedMotion();
  const canLoadEmbed = hasExternalMediaConsent();

  const [session, setSession] = useState({
    title: "",
    youtubeUrl: "",
    coverImage: undefined,
  });
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [showFullscreenBtn, setShowFullscreenBtn] = useState(false);
  const [showScreenReveal, setShowScreenReveal] = useState(false);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const [iframeEpoch, setIframeEpoch] = useState(0);
  const videoFrameRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const previewTimerRef = useRef(null);
  const autoplayCheckRef = useRef(null);

  const videoId = youtubeVideoId(session.youtubeUrl);
  const embedSrc =
    canLoadEmbed && videoId ? toCinemaEmbedUrl(session.youtubeUrl) : "";

  const posterSrc =
    session.coverImage ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "");

  const mobile = isMobileViewport();

  const openTransition = {
    type: "tween",
    duration: reduceMotion ? 0.15 : mobile ? 0.22 : 0.3,
    ease: "easeOut",
  };
  const exitTransition = {
    type: "tween",
    duration: reduceMotion ? 0.12 : 0.22,
    ease: "easeIn",
  };

  const shellInitial = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: mobile ? 0.98 : 0.94,
        y: mobile ? 8 : 24,
      };
  const shellAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, y: 0 };
  const shellExit = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: mobile ? 0.98 : 0.96,
        y: mobile ? 10 : 18,
      };

  const clearPreviewTimer = useCallback(() => {
    if (previewTimerRef.current != null) {
      window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
  }, []);

  const tryMobileFullscreen = useCallback(() => {
    if (!isMobileViewport()) return;
    const shell =
      document.querySelector("[data-cinema-shell]") ?? videoFrameRef.current;
    if (!shell) return;
    requestElementFullscreen(shell).catch(() => {
      setShowFullscreenBtn(true);
    });
  }, []);

  const handleClose = useCallback(() => {
    clearPreviewTimer();
    if (autoplayCheckRef.current != null) {
      window.clearTimeout(autoplayCheckRef.current);
      autoplayCheckRef.current = null;
    }
    try {
      ytPlayerRef.current?.destroy?.();
    } catch {
      // best-effort
    }
    ytPlayerRef.current = null;
    exitCinemaFullscreen();
    onClose();
  }, [onClose, clearPreviewTimer]);

  const handleExitComplete = useCallback(() => {
    setShouldLoadIframe(false);
    setShowFullscreenBtn(false);
    setShowScreenReveal(false);
    setShowTapToPlay(false);
    setIframeEpoch(0);
    document.body.style.overflow = "";
  }, []);

  const beginPlayback = useCallback(() => {
    if (!canLoadEmbed) {
      window.dispatchEvent(new Event("cookie-reset"));
      return;
    }
    clearPreviewTimer();
    setShowTapToPlay(false);
    setShouldLoadIframe(true);
  }, [canLoadEmbed, clearPreviewTimer]);

  const handleTapToPlay = useCallback(() => {
    setShowTapToPlay(false);
    const yt = ytPlayerRef.current;
    if (yt && typeof yt.playVideo === "function") {
      try {
        yt.playVideo();
        return;
      } catch {
        // remount iframe nel gesto utente
      }
    }
    setIframeEpoch((n) => n + 1);
  }, []);

  const handleFullscreenClick = useCallback(() => {
    tryMobileFullscreen();
  }, [tryMobileFullscreen]);

  useEffect(() => {
    if (!open) return undefined;
    setSession({ title, youtubeUrl, coverImage });
    setShouldLoadIframe(false);
    setShowFullscreenBtn(false);
    setShowTapToPlay(false);
    setIframeEpoch(0);
    setShowScreenReveal(!reduceMotion);
    document.body.style.overflow = "hidden";

    const previewDelay = reduceMotion ? 400 : PREVIEW_DELAY_MS;
    if (canLoadEmbed) {
      previewTimerRef.current = window.setTimeout(() => {
        previewTimerRef.current = null;
        setShouldLoadIframe(true);
      }, previewDelay);
    }

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearPreviewTimer();
      window.removeEventListener("keydown", onKey);
    };
  }, [
    open,
    title,
    youtubeUrl,
    coverImage,
    reduceMotion,
    handleClose,
    canLoadEmbed,
    clearPreviewTimer,
  ]);

  useEffect(() => {
    if (!shouldLoadIframe || !canLoadEmbed || !embedSrc) return undefined;

    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !YT || !iframeRef.current) return;
      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        // best-effort
      }
      ytPlayerRef.current = null;

      try {
        ytPlayerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onReady: () => {
              if (cancelled) return;
              autoplayCheckRef.current = window.setTimeout(() => {
                autoplayCheckRef.current = null;
                if (cancelled) return;
                try {
                  const state = ytPlayerRef.current?.getPlayerState?.();
                  if (
                    state !== YT.PlayerState.PLAYING &&
                    state !== YT.PlayerState.BUFFERING
                  ) {
                    setShowTapToPlay(true);
                  }
                } catch {
                  setShowTapToPlay(true);
                }
              }, AUTOPLAY_CHECK_MS);
            },
            onStateChange: (event) => {
              if (cancelled) return;
              if (
                event.data === YT.PlayerState.PLAYING ||
                event.data === YT.PlayerState.BUFFERING
              ) {
                setShowTapToPlay(false);
                if (autoplayCheckRef.current != null) {
                  window.clearTimeout(autoplayCheckRef.current);
                  autoplayCheckRef.current = null;
                }
              }
            },
          },
        });
      } catch {
        setShowTapToPlay(true);
      }
    });

    return () => {
      cancelled = true;
      if (autoplayCheckRef.current != null) {
        window.clearTimeout(autoplayCheckRef.current);
        autoplayCheckRef.current = null;
      }
      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        // best-effort
      }
      ytPlayerRef.current = null;
    };
  }, [shouldLoadIframe, canLoadEmbed, embedSrc, iframeEpoch]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open ? (
        <motion.div
          key="cinema-video-overlay"
          data-cinema-shell
          role="presentation"
          className="fixed inset-0 z-[200] flex max-md:h-[100dvh] max-md:w-full max-md:items-stretch max-md:justify-center max-md:p-0 md:items-center md:justify-center md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={openTransition}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 65% at 50% 42%, rgba(28,26,24,0.96) 0%, rgba(4,4,4,0.98) 52%, #000 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={openTransition}
            aria-hidden
          />

          <motion.button
            type="button"
            className="absolute inset-0 cursor-default bg-black/35 max-md:bg-black/55"
            aria-label="Chiudi il video"
            onClick={handleClose}
            tabIndex={-1}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={open ? openTransition : exitTransition}
          />

          <button
            type="button"
            onClick={handleClose}
            className="cinema-close-mobile md:hidden"
            aria-label="Chiudi video"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden />
          </button>

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cinema-video-title"
            initial={shellInitial}
            animate={shellAnimate}
            exit={shellExit}
            transition={open ? openTransition : exitTransition}
            className="relative z-10 flex h-full w-full min-w-0 flex-col max-md:max-h-[100dvh] max-md:pt-[calc(env(safe-area-inset-top,0px)+3.25rem)] md:h-auto md:max-w-6xl md:pt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="cinema-video-title" className="sr-only">
              {session.title ? `Video: ${session.title}` : "Video"}
            </h2>

            <motion.div
              className="flex min-h-0 flex-1 flex-col overflow-hidden max-md:rounded-none md:rounded-2xl md:border md:border-white/[0.09] md:bg-[#060606] md:shadow-[0_40px_120px_rgba(0,0,0,0.85),0_0_80px_rgba(120,90,60,0.06)] md:ring-1 md:ring-white/[0.06]"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, boxShadow: "0 0 0 rgba(243,239,232,0)" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      boxShadow:
                        "0 40px 120px rgba(0,0,0,0.85), 0 0 48px rgba(243,239,232,0.04)",
                    }
              }
              exit={{ opacity: 0 }}
              transition={{
                type: "tween",
                duration: reduceMotion ? 0.15 : 0.32,
                ease: "easeOut",
              }}
            >
              <header className="relative z-20 flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.07] bg-[#0a0a0a]/95 px-3 py-2.5 max-md:border-b-0 max-md:bg-transparent max-md:px-3 max-md:py-2 max-md:pr-14 md:px-5 md:py-3.5">
                <motion.div
                  className="min-w-0 pr-2"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "tween",
                    duration: reduceMotion ? 0.12 : 0.28,
                    ease: "easeOut",
                    delay: reduceMotion ? 0 : 0.08,
                  }}
                >
                  {session.title ? (
                    <p className="truncate font-serif text-base italic leading-tight text-[#f3efe8] md:text-xl">
                      {session.title}
                    </p>
                  ) : null}
                </motion.div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="hidden h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 transition hover:border-white/30 hover:bg-white/10 hover:text-white md:inline-flex"
                  aria-label="Chiudi video"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden />
                </button>
              </header>

              <motion.div
                className="flex min-h-0 flex-1 flex-col bg-black p-1.5 max-md:p-1 md:p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "tween",
                  duration: reduceMotion ? 0.12 : 0.26,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : 0.05,
                }}
              >
                <motion.div
                  ref={videoFrameRef}
                  className="relative isolate z-0 mx-auto flex min-h-0 w-full max-w-full flex-1 flex-col justify-center overflow-hidden rounded-md bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] max-md:min-h-0 max-md:flex-1 max-md:rounded-sm md:aspect-video md:max-h-[min(72vh,820px)] md:flex-none md:rounded-lg md:shadow-[0_0_60px_rgba(0,0,0,0.9)]"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.97 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.98 }
                  }
                  transition={open ? openTransition : exitTransition}
                >
                  <CinemaScreenReveal active={showScreenReveal} />

                  {shouldLoadIframe && canLoadEmbed && embedSrc ? (
                    <motion.iframe
                      ref={iframeRef}
                      key={`${embedSrc}-${iframeEpoch}`}
                      src={embedSrc}
                      title={
                        session.title ? `Video: ${session.title}` : "Video"
                      }
                      className="absolute inset-0 z-0 h-full w-full border-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "tween",
                        duration: reduceMotion ? 0.15 : COVER_FADE_MS,
                        ease: "easeOut",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                    />
                  ) : null}

                  {showTapToPlay && shouldLoadIframe ? (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
                      <button
                        type="button"
                        onClick={handleTapToPlay}
                        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#f3efe8]/40 bg-black/70 px-8 py-3.5 font-serif text-sm italic text-[#f3efe8] shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-sm transition hover:border-[#f3efe8]/60 hover:bg-black/85 active:scale-[0.98]"
                      >
                        Tocca per avviare
                      </button>
                    </div>
                  ) : null}

                  <AnimatePresence>
                    {!shouldLoadIframe ? (
                      <motion.div
                        key="cinema-preview"
                        className="absolute inset-0 z-10 flex aspect-video w-full flex-1 items-center justify-center bg-black max-md:aspect-auto max-md:min-h-[min(72dvh,100%)] md:aspect-video md:min-h-0 md:flex-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "tween",
                          duration: reduceMotion ? 0.15 : COVER_FADE_MS,
                          ease: "easeOut",
                        }}
                      >
                        {posterSrc ? (
                          <img
                            src={posterSrc}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-55"
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25"
                          aria-hidden
                        />
                        <motion.div
                          className="relative z-10 flex flex-col items-center gap-4 px-6 text-center"
                          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: "tween",
                            duration: reduceMotion ? 0.12 : 0.28,
                            ease: "easeOut",
                            delay: reduceMotion ? 0 : 0.18,
                          }}
                        >
                          {canLoadEmbed ? (
                            <button
                              type="button"
                              onClick={beginPlayback}
                              className="inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-[#f3efe8]/35 bg-black/55 text-[#f3efe8] shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition hover:scale-[1.03] hover:border-[#f3efe8]/55 hover:bg-black/70 active:scale-[0.98]"
                              aria-label={
                                session.title
                                  ? `Avvia il video ${session.title}`
                                  : "Avvia il video"
                              }
                            >
                              <PlayIcon className="ml-1 h-9 w-9" aria-hidden />
                            </button>
                          ) : (
                            <>
                              <p className="max-w-xs font-serif text-sm leading-relaxed text-[#f3efe8]/90 md:text-base">
                                Per guardare il video abilita i contenuti esterni.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  window.dispatchEvent(
                                    new Event("cookie-reset"),
                                  );
                                }}
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#b01c24] px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#e8c4c6] transition hover:bg-[#b01c24] hover:text-white"
                              >
                                Gestisci preferenze
                              </button>
                            </>
                          )}
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {showFullscreenBtn && shouldLoadIframe ? (
                    <button
                      type="button"
                      onClick={handleFullscreenClick}
                      className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm md:hidden"
                    >
                      Schermo intero
                    </button>
                  ) : null}
                </motion.div>
              </motion.div>

              <footer className="hidden shrink-0 border-t border-white/[0.06] px-5 py-2 text-center md:block">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                  Premi ESC per uscire
                </p>
              </footer>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
