import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { hasExternalMediaConsent } from "../utils/cookieConsent";
import { getBackdropFilterSupported } from "../utils/backdropSupport";

const YT_API_SRC = "https://www.youtube.com/iframe_api";
/** Linguetta laterale: fissa, non misurata dal ResizeObserver (evita loop layout). */
const PLAYER_TAB_WIDTH_PX = 40;

/** Carica una sola volta lo script della YouTube IFrame Player API. */
function loadYouTubeIframeAPI() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && typeof window.YT.Player === "function") {
    return Promise.resolve(window.YT);
  }
  if (window.__ytIframeApiPromise) return window.__ytIframeApiPromise;

  window.__ytIframeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") {
        try {
          previous();
        } catch {
          // altri listeners non devono bloccare
        }
      }
      resolve(window.YT);
    };
    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const tag = document.createElement("script");
      tag.src = YT_API_SRC;
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return window.__ytIframeApiPromise;
}

/** Accepts embed URLs or normal watch / youtu.be links and returns an embed URL. */
export function toYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return url;
  const s = url.trim();
  if (!s.startsWith("http")) return s;
  if (s.includes("/embed/")) return s;
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, "");
    if (
      (host === "youtube.com" || host === "m.youtube.com") &&
      (u.pathname === "/watch" || u.pathname.startsWith("/watch/"))
    ) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore
  }
  return s;
}

/** Merges common embed params (autoplay after user opened the player, etc.). */
function withYouTubeEmbedParams(embedUrl, { autoplay = true } = {}) {
  if (!embedUrl || typeof embedUrl !== "string") return embedUrl;
  try {
    const u = new URL(embedUrl);
    if (!u.hostname.replace(/^www\./, "").includes("youtube")) return embedUrl;
    if (autoplay) u.searchParams.set("autoplay", "1");
    u.searchParams.set("playsinline", "1");
    u.searchParams.set("rel", "0");
    u.searchParams.set("modestbranding", "1");
    u.searchParams.set("enablejsapi", "1");
    if (typeof window !== "undefined" && window.location?.origin) {
      u.searchParams.set("origin", window.location.origin);
    }
    return u.toString();
  } catch {
    return embedUrl;
  }
}

export default function BottomYouTubePlayer({ player, onClose }) {
  const backdropOk = getBackdropFilterSupported();
  const [isOpen, setIsOpen] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  /** YouTube has no official audio-only embed; false = cover art + hidden video (audio still plays). */
  const [showVideo, setShowVideo] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const canLoadEmbed = hasExternalMediaConsent();

  const tracks = player?.tracks ?? [];
  const currentTrack = tracks[trackIndex];
  const hasMultiple = tracks.length > 1;

  const embedSrc = useMemo(() => {
    if (!currentTrack?.youtubeEmbed) return "";
    const base = toYouTubeEmbedUrl(currentTrack.youtubeEmbed);
    return withYouTubeEmbedParams(base, { autoplay: true });
  }, [currentTrack?.youtubeEmbed]);

  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const shellRef = useRef(null);
  const lastInsetHeightRef = useRef(0);

  useEffect(() => {
    if (player) {
      setIsOpen(true);
      setShowVideo(false);
      setShowTrackList(false);
      setTrackIndex(0);
      setIsPlaying(false);
    }
  }, [player?.playerKey]);

  useEffect(() => {
    const root = document.documentElement;
    lastInsetHeightRef.current = 0;
    root.style.setProperty(
      "--bottom-player-tab-width",
      `${PLAYER_TAB_WIDTH_PX}px`,
    );

    const syncPlayerInset = () => {
      const shell = shellRef.current;
      if (!shell) return;
      const h = Math.ceil(shell.getBoundingClientRect().height);
      if (Math.abs(h - lastInsetHeightRef.current) <= 1) return;
      lastInsetHeightRef.current = h;
      if (isOpen) {
        root.style.setProperty("--bottom-player-open-height", `${h}px`);
      } else {
        root.style.setProperty("--bottom-player-collapsed-height", `${h}px`);
      }
    };

    const syncBodyClass = () => {
      document.body.classList.remove(
        "has-bottom-player",
        "has-bottom-player-open",
        "has-bottom-player-collapsed",
      );
      document.body.classList.add(
        isOpen ? "has-bottom-player-open" : "has-bottom-player-collapsed",
      );
    };

    syncBodyClass();
    syncPlayerInset();
    const ro = new ResizeObserver(() => {
      syncPlayerInset();
    });
    const shell = shellRef.current;
    if (shell) ro.observe(shell);
    window.addEventListener("resize", syncPlayerInset, { passive: true });
    return () => {
      document.body.classList.remove(
        "has-bottom-player",
        "has-bottom-player-open",
        "has-bottom-player-collapsed",
      );
      ro.disconnect();
      window.removeEventListener("resize", syncPlayerInset);
      root.style.removeProperty("--bottom-player-open-height");
      root.style.removeProperty("--bottom-player-collapsed-height");
      root.style.removeProperty("--bottom-player-tab-width");
    };
  }, [player?.playerKey, isOpen]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const root = document.documentElement;
    const h = Math.ceil(shell.getBoundingClientRect().height);
    lastInsetHeightRef.current = h;
    if (isOpen) {
      root.style.setProperty("--bottom-player-open-height", `${h}px`);
    } else {
      root.style.setProperty("--bottom-player-collapsed-height", `${h}px`);
    }
  }, [player?.playerKey, isOpen, hasMultiple]);

  /**
   * Quando l'iframe è montato e c'è un embedSrc, aggancia la YouTube IFrame
   * Player API per controllare play/pausa senza aprire YouTube.
   * Il `key={embedSrc}` sull'iframe ne forza il remount al cambio traccia,
   * quindi anche questo effetto si rieseguirà ricreando il player.
   */
  useEffect(() => {
    if (!canLoadEmbed || !embedSrc) return undefined;
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !YT || !iframeRef.current) return;
      try {
        ytPlayerRef.current = new YT.Player(iframeRef.current, {
          events: {
            onReady: () => {
              if (cancelled) return;
              try {
                const state = ytPlayerRef.current?.getPlayerState?.();
                setIsPlaying(state === YT.PlayerState.PLAYING);
              } catch {
                setIsPlaying(false);
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              if (event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === YT.PlayerState.PAUSED ||
                event.data === YT.PlayerState.ENDED ||
                event.data === YT.PlayerState.CUED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.error("YouTube IFrame Player init failed", err);
      }
    });

    return () => {
      cancelled = true;
      try {
        ytPlayerRef.current?.destroy?.();
      } catch {
        // best-effort
      }
      ytPlayerRef.current = null;
      setIsPlaying(false);
    };
  }, [embedSrc, canLoadEmbed]);

  if (!player || tracks.length === 0) return null;

  const goPrev = () => setTrackIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setTrackIndex((i) => Math.min(tracks.length - 1, i + 1));

  const toggleTrackList = () => setShowTrackList((v) => !v);

  const togglePlayPause = () => {
    const yt = ytPlayerRef.current;
    if (!yt) return;
    try {
      if (isPlaying && typeof yt.pauseVideo === "function") {
        yt.pauseVideo();
      } else if (typeof yt.playVideo === "function") {
        yt.playVideo();
      }
    } catch (err) {
      console.error("YouTube play/pause toggle failed", err);
    }
  };

  return (
    <div
      ref={shellRef}
      className={`bottom-player-shell fixed left-0 w-fit max-w-[100vw] shadow-[0_20px_48px_rgba(0,0,0,0.32)] max-md:bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] md:bottom-6 ${
        backdropOk ? "z-50" : "z-[90]"
      }`}
    >
      {/*
        La linguetta è position:absolute su left-full del wrapper (non una seconda colonna flex):
        altrimenti sopra la linguetta resta un rettangolo alto quanto il pannello ma vuoto/trasparente.
      */}
      <div
        className={`relative inline-flex min-h-0 ${
          !isOpen ? "min-h-16 md:min-h-20" : ""
        }`}
      >
        <div
          className={`min-h-0 overflow-hidden ${
            isOpen
              ? "w-[min(300px,calc(100vw-var(--bottom-player-tab-width,40px)-0.5rem))] sm:w-[min(340px,92vw)]"
              : "w-0 max-h-0"
          }`}
        >
          <div
            className="player-shell w-[min(300px,calc(100vw-var(--bottom-player-tab-width,40px)-0.5rem))] sm:w-[min(340px,92vw)] rounded-l-2xl border-r-0 px-2.5 py-2.5 sm:px-3 sm:py-3"
            style={{
              backgroundColor: "#242424",
              color: "#f7f1e8",
              border: "1px solid rgba(247, 241, 232, 0.12)",
              borderRight: 0,
            }}
          >
          <div className="flex items-start justify-between gap-2 mb-2 pr-1">
            <div className="min-w-0">
              <p
                className="text-[9px] uppercase tracking-[0.28em] mb-0.5"
                style={{ color: "rgba(247, 241, 232, 0.55)" }}
              >
                In ascolto
              </p>

              <h3
                className="font-serif italic text-lg leading-tight truncate"
                style={{ color: "#f7f1e8" }}
              >
                {player.albumTitle}
              </h3>
              {currentTrack?.title && (
                <p
                  className="mt-0.5 text-xs truncate font-serif"
                  style={{ color: "rgba(247, 241, 232, 0.75)" }}
                >
                  {currentTrack.title}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center text-xl leading-none transition hover:text-[#f7f1e8]!"
              style={{ color: "rgba(247, 241, 232, 0.55)" }}
              aria-label="Chiudi player"
              title="Chiudi player"
            >
              ✕
            </button>
          </div>

          {hasMultiple && (
            <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={trackIndex <= 0}
                className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  border: "1px solid rgba(247, 241, 232, 0.22)",
                  color: "rgba(247, 241, 232, 0.9)",
                }}
                aria-label="Traccia precedente"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span
                className="text-[9px] uppercase tracking-[0.2em] tabular-nums"
                style={{ color: "rgba(247, 241, 232, 0.5)" }}
              >
                {trackIndex + 1} / {tracks.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={trackIndex >= tracks.length - 1}
                className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  border: "1px solid rgba(247, 241, 232, 0.22)",
                  color: "rgba(247, 241, 232, 0.9)",
                }}
                aria-label="Traccia successiva"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleTrackList}
                aria-expanded={showTrackList}
                aria-label={
                  showTrackList
                    ? "Torna alla copertina"
                    : "Mostra elenco tracce"
                }
                title={showTrackList ? "Torna alla copertina" : "Elenco tracce"}
                className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full transition"
                style={{
                  border: showTrackList
                    ? "1px solid rgba(247, 241, 232, 0.4)"
                    : "1px solid rgba(247, 241, 232, 0.22)",
                  backgroundColor: showTrackList
                    ? "rgba(247, 241, 232, 0.15)"
                    : "transparent",
                  color: showTrackList
                    ? "#f7f1e8"
                    : "rgba(247, 241, 232, 0.85)",
                }}
              >
                <QueueListIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="relative overflow-hidden rounded-lg">
            {canLoadEmbed ? (
              <>
                <div
                  className={`relative h-[140px] w-full bg-black sm:h-[168px] ${
                    backdropOk ? "" : "isolate"
                  }`}
                >
                  <iframe
                    key={embedSrc}
                    ref={iframeRef}
                    src={embedSrc}
                    width="100%"
                    height="168"
                    title={`YouTube: ${currentTrack?.title ?? player.albumTitle}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className={`absolute inset-0 z-0 h-full w-full border-0 ${
                      showVideo ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {!showVideo && hasMultiple && (
                    <div className="absolute inset-0 z-10 [perspective:1200px]">
                      <div
                        className={`relative h-full w-full transition-[transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] ${
                          showTrackList
                            ? "[transform:rotateY(180deg)]"
                            : "[transform:rotateY(0deg)]"
                        }`}
                      >
                        <div className="absolute inset-0 [backface-visibility:hidden] bg-black">
                          {player.coverImage ? (
                            <img
                              src={player.coverImage}
                              alt=""
                              className="h-full w-full object-cover pointer-events-none"
                            />
                          ) : (
                            <div
                              className="h-full w-full bg-gradient-to-b from-zinc-800 to-black"
                              aria-hidden
                            />
                          )}
                        </div>
                        <div
                          className="absolute inset-0 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]"
                          style={{
                            backgroundColor: "#121212",
                            color: "#f7f1e8",
                          }}
                        >
                          <p
                            className="shrink-0 px-2 pt-2 pb-1 text-[8px] uppercase tracking-[0.35em]"
                            style={{ color: "rgba(247, 241, 232, 0.45)" }}
                          >
                            Tracce
                          </p>
                          <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-1.5 pb-2">
                            {tracks.map((t, i) => (
                              <li key={`${t.title}-${i}`}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTrackIndex(i);
                                    setShowTrackList(false);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition"
                                  style={{
                                    backgroundColor:
                                      i === trackIndex
                                        ? "rgba(247, 241, 232, 0.16)"
                                        : "transparent",
                                    color:
                                      i === trackIndex
                                        ? "#f7f1e8"
                                        : "rgba(247, 241, 232, 0.78)",
                                  }}
                                >
                                  <span
                                    className="w-4 shrink-0 text-center text-[9px] tabular-nums"
                                    style={{
                                      color: "rgba(247, 241, 232, 0.4)",
                                    }}
                                  >
                                    {i + 1}
                                  </span>
                                  <span className="min-w-0 flex-1 font-serif">
                                    {t.title}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {!showVideo && !hasMultiple && player.coverImage && (
                    <img
                      src={player.coverImage}
                      alt=""
                      className="absolute inset-0 z-10 h-full w-full object-cover pointer-events-none"
                    />
                  )}
                  {!showVideo && !hasMultiple && !player.coverImage && (
                    <div
                      className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-800 to-black pointer-events-none"
                      aria-hidden
                    />
                  )}

                  {!showTrackList && (
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? "Metti in pausa" : "Riproduci"}
                      title={isPlaying ? "Metti in pausa" : "Riproduci"}
                      className="absolute left-1/2 top-1/2 z-30 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition active:scale-95"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "#f7f1e8",
                        border: "1px solid rgba(247, 241, 232, 0.45)",
                        boxShadow:
                          "0 8px 22px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(0, 0, 0, 0.18)",
                      }}
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-7 w-7" aria-hidden />
                      ) : (
                        <PlayIcon className="ml-0.5 h-7 w-7" aria-hidden />
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setShowVideo((v) => {
                        const next = !v;
                        if (next) setShowTrackList(false);
                        return next;
                      });
                    }}
                    className={`absolute bottom-1.5 right-1.5 z-30 rounded-full px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.2em] hover:bg-black/85! ${
                      backdropOk ? "backdrop-blur-sm" : ""
                    }`}
                    style={{
                      backgroundColor: backdropOk
                        ? "rgba(0, 0, 0, 0.55)"
                        : "rgba(0, 0, 0, 0.88)",
                      color: "#f7f1e8",
                    }}
                  >
                    {showVideo ? "Solo audio" : "Mostra youtube"}
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-[#e6e1d6] bg-[#f3efe6] p-6 text-center">
                <p className="font-serif text-lg text-gray-800 mb-4">
                  Per visualizzare questo contenuto è necessario abilitare i contenuti esterni.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new Event("cookie-reset"));
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:bg-[#b01c24] hover:text-white"
                >
                  Gestisci preferenze
                </button>
              </div>
            )}
          </div>
        </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`player-shell absolute left-full top-1/2 z-10 flex h-16 min-h-[44px] w-10 min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-2xl shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition hover:text-[#f7f1e8]! md:h-20 ${
            !isOpen ? "rounded-l-2xl" : ""
          }`}
          style={{
            backgroundColor: "#242424",
            color: "rgba(247, 241, 232, 0.75)",
            border: "1px solid rgba(247, 241, 232, 0.12)",
            borderLeft: 0,
          }}
          aria-label={isOpen ? "Nascondi player" : "Mostra player"}
        >
          <span className="text-lg leading-none">
            {isOpen ? "‹" : "›"}
          </span>
        </button>
      </div>
    </div>
  );
}
