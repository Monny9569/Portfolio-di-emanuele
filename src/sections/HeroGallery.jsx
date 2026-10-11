import { useCallback, useEffect, useState } from "react";

import piano from "../assets/piano.jpg";
import canto from "../assets/canto.jpg";
import giada from "../assets/covergiada.jpg";
import giadaTitle from "../assets/Cover Giada_titolo.png";
import bio from "../assets/Bio.jpg";

// Durata della dissolvenza tra due slide
const TRANSITION_MS = 2000;

// Tempo totale prima del cambio automatico
const AUTOPLAY_MS = 9000;

// Configurazione slide
const slides = [
  {
    title: "Giada",
    alt: "Giada, copertina del singolo di Emanuele Monetti",
    subtitle: "  ",
    image: giada,
    label: "Ultima uscita",
    overlayTitle: giadaTitle,
    overlayText: 'Tratto dall’album “Tutto già diverso”',
    focusX: "50%",
    focusY: "42%",
    mode: "auto",
    extraZoom: 1.02,
    kenBurnsFrom: 1.02,
    kenBurnsTo: 1.08,
  },
  {
    title: "",
    subtitle: "",
    image: piano,
    label: "",
    focusX: "50%",
    focusY: "50%",
    mode: "auto",
    extraZoom: 1.0,
    kenBurnsFrom: 1.01,
    kenBurnsTo: 1.06,
  },
  {
    title: "",
    subtitle: "",
    image: canto,
    label: "",
    focusX: "50%",
    focusY: "28%",
    mode: "auto",
    extraZoom: 1.01,
    kenBurnsFrom: 1.03,
    kenBurnsTo: 1.09,
  },
  {
    title: "",
    subtitle: "",
    image: bio,
    label: "",
    focusX: "100%",
    focusY: "35%",
    mode: "auto",
    extraZoom: 1.0,
    kenBurnsFrom: 1.0,
    kenBurnsTo: 1.05,
  },
];

export default function HeroGallery() {
  // Slide attuale
  const [current, setCurrent] = useState(0);

  // Slide precedente, mantenuta durante il crossfade
  const [previous, setPrevious] = useState(null);

  // True mentre avviene la transizione
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fase usata per far partire davvero il fade dopo il mount
  const [fadePhase, setFadePhase] = useState("idle");

  // Dimensioni reali delle immagini
  const [imageMeta, setImageMeta] = useState({});

  // Legge proporzioni reali dell'immagine
  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();

      img.onload = () =>
        resolve({
          src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });

      img.onerror = () =>
        resolve({
          src,
          width: 0,
          height: 0,
        });

      img.src = src;
    });

  // Precarica tutte le immagini all'avvio
  useEffect(() => {
    let mounted = true;

    Promise.all(slides.map((slide) => preloadImage(slide.image))).then((results) => {
      if (!mounted) return;

      const metaMap = {};

      results.forEach((item) => {
        metaMap[item.src] = {
          width: item.width,
          height: item.height,
          ratio: item.width && item.height ? item.width / item.height : 1,
        };
      });

      setImageMeta(metaMap);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Decide come mostrare l'immagine: cover/contain, zoom iniziale/finale, focus
  const getImageConfig = (slide) => {
    const meta = imageMeta[slide.image];
    const ratio = meta?.ratio || 1.5;

    const focusX = slide.focusX || "50%";
    const focusY = slide.focusY || "50%";
    const extraZoom = slide.extraZoom ?? 1;

    let fitMode = "cover";
    let baseZoom = 1.04;

    // Modalità forzata
    if (slide.mode === "cover") {
      fitMode = "cover";
      baseZoom = 1.04;
    } else if (slide.mode === "contain") {
      fitMode = "contain";
      baseZoom = 1;
    } else {
      // Modalità automatica in base alla proporzione
      if (ratio >= 1.7) {
        fitMode = "cover";
        baseZoom = 1.02;
      } else if (ratio >= 1.15) {
        fitMode = "cover";
        baseZoom = 1.05;
      } else if (ratio >= 0.9) {
        fitMode = "cover";
        baseZoom = 1.08;
      } else {
        fitMode = "contain";
        baseZoom = 1;
      }
    }

    return {
      fitMode,
      objectPosition: `${focusX} ${focusY}`,
      startScale: (slide.kenBurnsFrom ?? baseZoom) * extraZoom,
      endScale: (slide.kenBurnsTo ?? baseZoom + 0.05) * extraZoom,
    };
  };

  // Avvia il crossfade tra slide
  const goToSlide = useCallback((newIndex) => {
    if (newIndex === current || isTransitioning) return;

    // Salva la vecchia slide per tenerla sotto durante la dissolvenza
    setPrevious(current);

    // Imposta subito la nuova slide
    setCurrent(newIndex);

    // Avvia stato di transizione
    setIsTransitioning(true);
    setFadePhase("prepare");

    // Doppio frame: assicura che il browser monti entrambe prima del fade
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFadePhase("running");
      });
    });

    // A fine transizione rimuove la precedente
    setTimeout(() => {
      setPrevious(null);
      setIsTransitioning(false);
      setFadePhase("idle");
    }, TRANSITION_MS);
  }, [current, isTransitioning]);

  // Cambio automatico
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = current === slides.length - 1 ? 0 : current + 1;
      goToSlide(newIndex);
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [current, goToSlide]);

  // Render di una slide completa
  const renderSlideLayer = (slide, index, type) => {
    const config = getImageConfig(slide);
    const fitClass = config.fitMode === "contain" ? "object-contain" : "object-cover";

    const isPrevious = type === "previous";
    const isCurrent = type === "current";

    // Stato opacità:
    // - la vecchia parte visibile e poi cala
    // - la nuova parte invisibile e poi entra
    let opacityClass = "opacity-100";

    if (isTransitioning && isPrevious) {
      opacityClass = fadePhase === "running" ? "opacity-0" : "opacity-100";
    }

    if (isTransitioning && isCurrent) {
      opacityClass = fadePhase === "running" ? "opacity-100" : "opacity-0";
    }

    return (
      <div
        key={`${slide.image}-${index}-${type}`}
        className={`absolute inset-0 ${opacityClass} transition-opacity ease-in-out`}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
        {/* Sfondo nero di sicurezza */}
        <div className="absolute inset-0 bg-black" />

        {/* Immagine:
            - parte già con lo zoom iniziale applicato
            - poi continua col movimento lento */}
        <img
          src={slide.image}
          alt={slide.alt || ""}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={{
            objectPosition: config.objectPosition,
            transform: `scale(${config.startScale})`,
          }}
          decoding="async"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 && isCurrent ? "high" : undefined}
        />

        {/* Overlay per profondità e leggibilità */}
        <div className="absolute inset-0 bg-black/10 md:bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent md:from-black/55 md:via-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/8 md:from-black/30 md:to-black/10" />

        {/* Eventuale grafica in alto a destra */}
        {(slide.overlayTitle || slide.overlayText) && (
          <div className="absolute top-[calc(var(--nav-height-current,64px)+1rem)] right-4 z-30 max-w-[min(72vw,280px)] sm:right-6 md:top-36 md:right-16 md:max-w-none lg:top-40 lg:right-24">
            {slide.overlayTitle && (
              <img
                src={slide.overlayTitle}
                alt="Giada"
                className="ml-auto h-auto w-full max-w-[220px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.4)] sm:max-w-[260px] md:max-w-[360px] md:w-[360px] lg:w-[420px]"
              />
            )}
          </div>
        )}

        {/* Testi */}
        <div className="relative z-30 flex h-full items-end pb-[max(4.5rem,env(safe-area-inset-bottom,0px)+3.5rem)] md:pb-20">
          <div className="flex w-full justify-start px-4 sm:px-6 md:px-14 lg:px-20">
            <div className="max-w-3xl text-left">
              {slide.label && (
                <p className="mb-4 text-[11px] uppercase tracking-[0.38em] text-white/70">
                  {slide.label}
                </p>
              )}

              {(slide.label || slide.title || slide.subtitle) && (
                <div className="mt-6 mb-6 h-px w-20 bg-artist" />
              )}

              {slide.title && (
                <h2 className="font-serif text-4xl leading-none text-white italic sm:text-5xl md:text-7xl lg:text-8xl">
                  {slide.title}
                </h2>
              )}

              {slide.overlayText && (
                <p className="mt-3 text-[11px] uppercase tracking-[0.38em] text-white/55">
                  {slide.overlayText}
                </p>
              )}

              {slide.subtitle && (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="hero-gallery" className="relative pb-0">
      <div className="relative min-h-[100svh] max-h-[100svh] overflow-hidden bg-black">
        {/* Vecchia slide: resta sotto e svanisce */}
        {previous !== null && renderSlideLayer(slides[previous], previous, "previous")}

        {/* Nuova slide: entra sopra con dissolvenza */}
        {renderSlideLayer(slides[current], current, "current")}

        {/* Pallini */}
        <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.75rem)] left-1/2 z-40 flex -translate-x-1/2 gap-3 md:bottom-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Vai alla slide ${index + 1}`}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                current === index
                  ? "scale-110"
                  : ""
              }`}
            >
              <span
                className={`block h-2 w-2 rounded-full border transition-all duration-300 ${
                  current === index
                    ? "border-white/70 bg-white/35"
                    : "border-white/25 bg-transparent"
                }`}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}