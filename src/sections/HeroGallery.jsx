import { useEffect, useState } from "react";

import piano from "../assets/piano.jpg";
import canto from "../assets/canto.jpg";
import giada from "../assets/covergiada.jpg";
import giadaTitle from "../assets/Cover Giada_titolo.png";
import tuttoegiadiverso from "../assets/tuttoegiadiverso.jpeg";
import esse from "../assets/esse.jpeg";

export default function HeroGallery() {
  const slides = [
    {
      title: "Giada",
      subtitle:
        "Un brano intimo e delicato, sospeso tra memoria, emozione e cantautorato contemporaneo.",
      image: giada,
      label: "Ultima uscita",
      overlayTitle: giadaTitle,
      overlayText: 'Tratto dall’album “Tutto già diverso”',
    },
    {
      title: "",
      subtitle: "",
      image: piano,
      label: "",
    },
    {
      title: "",
      subtitle: "",
      image: canto,
      label: "",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const changeSlide = (newIndex) => {
    setNext(newIndex);
    setShowNext(true);

    setTimeout(() => {
      setCurrent(newIndex);
      setShowNext(false);
    }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = current === slides.length - 1 ? 0 : current + 1;
      changeSlide(newIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [current]);

  const active = slides[current];
  const nextSlide = slides[next];
  const hasTextContent = active.label || active.title || active.subtitle;
  const hasOverlayContent = active.overlayTitle || active.overlayText;

  return (
    <section className="relative pb-0">
      <div className="relative overflow-hidden h-screen">
        {/* immagine attuale */}
        <img
          src={active.image}
          alt={active.title || "slide"}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* immagine successiva con fade */}
        <img
          src={nextSlide.image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out ${
            showNext ? "opacity-100 scale-105" : "opacity-0 scale-110"
          }`}
        />

        {/* overlay cinematico */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* overlay grafico solo per Giada */}
        {hasOverlayContent && (
          <div className="absolute top-32 md:top-36 lg:top-40 right-10 md:right-16 lg:right-24">
            {active.overlayTitle && (
              <img
                src={active.overlayTitle}
                alt="Titolo Giada"
                className="ml-auto w-[280px] md:w-[360px] lg:w-[420px] h-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              />
            )}
          </div>
        )}

        {/* contenuto */}
        <div className="relative z-10 flex h-full items-end pb-20">
          <div className="w-full px-8 md:px-14 lg:px-20 flex justify-start">
            <div className="max-w-3xl text-left">
              {active.label && (
                <p className="text-[11px] uppercase tracking-[0.38em] text-white/70 mb-4">
                  {active.label}
                </p>
              )}

              {hasTextContent && (
                <div className="w-20 h-px bg-artist mt-6 mb-6" />
              )}

              {active.title && (
                <h1 className="font-serif italic text-white text-6xl md:text-7xl lg:text-8xl leading-none">
                  {active.title}
                </h1>
                )}
              {active.overlayText && (
                <p className="mt-3 text-white/55 text-[11px] uppercase tracking-[0.38em]">
                  Tratto dall’album “Tutto già diverso”
                </p>
              )}
              {active.subtitle && (
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mt-4">
                  {active.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}