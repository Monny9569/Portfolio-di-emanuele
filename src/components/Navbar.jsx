import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import bioPortrait from "../assets/Bio.jpg";
import { socialLinks } from "../data/social";
import { getBackdropFilterSupported } from "../utils/backdropSupport";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const backdropOk = getBackdropFilterSupported();
  const instagram = socialLinks.find((s) => s.id === "instagram");
  const [isOpen, setIsOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [activeLink, setActiveLink] = useState(null);
  const headerRef = useRef(null);
  const isOverHeroRef = useRef(true);

  const items = [
    { name: "Home", path: "/" },
    { name: "Diario di Bordo", path: "#timeline" },
    //{ name: "Collaborazioni", path: "#collaborations" },
    { name: "Bio", path: "/bio" },
    { name: "Contatti", path: "/contatti" },
  ];

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let navHeight = 0;
    const syncNavHeight = () => {
      const nextHeight = Math.ceil(header.getBoundingClientRect().height);
      if (nextHeight === navHeight) return;

      navHeight = nextHeight;
      document.documentElement.style.setProperty(
        "--nav-height-current",
        `${nextHeight}px`
      );
    };

    const updateIsOverHero = (nextValue) => {
      if (nextValue === isOverHeroRef.current) return;
      isOverHeroRef.current = nextValue;
      setIsOverHero(nextValue);
    };

    syncNavHeight();
    const navRo = new ResizeObserver(syncNavHeight);
    navRo.observe(header);

    const hero = document.getElementById("hero-gallery");
    if (!hero) {
      updateIsOverHero(false);
      return () => navRo.disconnect();
    }

    let ticking = false;
    let rafId = null;
    const NAV_PAD = 4;

    const computeOverHero = () => {
      const r = hero.getBoundingClientRect();
      return r.bottom > navHeight + NAV_PAD && r.top < navHeight;
    };

    const flush = () => {
      ticking = false;
      rafId = null;
      updateIsOverHero(computeOverHero());
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    flush();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(hero);
    ro.observe(header);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      navRo.disconnect();
    };
  }, [location.pathname]);

  const heroGlass = isOverHero && backdropOk;
  const heroLegacyBar = isOverHero && !backdropOk;

  const headerSurface = heroGlass
    ? "border-b border-white/10 bg-white/10 shadow-lg shadow-black/10 md:backdrop-blur-xl"
    : heroLegacyBar
      ? "border-b border-stone-400/25 bg-[#efede6]/95 shadow-[0_6px_28px_rgba(0,0,0,0.07)]"
      : "border-b border-black/5 bg-stone-200/90 shadow-[0_8px_28px_rgba(0,0,0,0.05)] md:backdrop-blur-md";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const isRouteActive = (path) => {
    if (path === "/contatti") {
      return location.pathname === "/contatti";
    }
    if (path === "/bio") {
      return location.pathname === "/bio" || location.pathname === "/bio-experience";
    }
    return false;
  };

  /** Su rotte tipo /contatti o /bio gli anchor (#timeline) puntano alla home. */
  const resolveNavHref = (path) => {
    if (path.startsWith("#")) {
      return location.pathname === "/" ? path : `/${path}`;
    }
    return path;
  };

  const handleMenuNavigation = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveLink(null);

    if (path.startsWith("#")) {
      const href = resolveNavHref(path);
      if (location.pathname === "/" && href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.location.href = href;
      return;
    }

    navigate(path);
  };

  const menuBlur = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

  const menuOverlayVariants = {
    hidden: {
      opacity: 0,
      scale: menuBlur ? 1.04 : 1,
      filter: menuBlur ? "blur(16px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: menuBlur ? 0.96 : 1,
      filter: menuBlur ? "blur(14px)" : "blur(0px)",
      transition: {
        duration: 0.52,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const menuShellVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 32, mass: 0.88 },
    },
  };

  const menuListVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.085, delayChildren: 0.12 },
    },
  };

  const menuLinkVariants = {
    hidden: { opacity: 0, x: -36, scale: 0.94 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 440, damping: 26 },
    },
  };

  const menuToggleVariants = {
    idle: { scale: 1 },
    tap: { scale: 0.88 },
    justOpened: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.42, times: [0, 0.3, 1], ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`site-header fixed left-0 top-0 w-full transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${headerSurface}`}
        initial={false}
        layout={false}
      >
        <nav className="mx-auto flex min-h-[var(--nav-height-mobile,64px)] min-w-0 max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 md:min-h-[var(--nav-height-desktop,80px)] md:gap-8 md:px-14 md:py-6">
          {/* Firma artista — font-brand (BLACK NAPKINS) */}
          <a
            href="/"
            className={`font-brand min-w-0 shrink text-balance font-normal transition-[color,opacity,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-[0.92] active:opacity-90 max-[380px]:text-[1.35rem] text-[clamp(1.45rem,3.8vw,2.35rem)] leading-[1.05] tracking-[0.02em] sm:max-w-[55%] sm:text-[clamp(1.55rem,3.2vw,2.45rem)] md:max-w-none md:text-[clamp(1.65rem,2.6vw,2.6rem)] ${
              heroGlass
                ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.12)]"
                : "text-stone-900 [text-shadow:0_1px_1px_rgba(255,255,255,0.45)]"
            }`}
          >
            Emanuele Monetti
          </a>

          {/* Menu desktop — stesso font del logo, look premium e minimale */}
          <ul className="font-brand hidden min-w-0 items-center gap-12 text-[18px] font-normal leading-[1.38] tracking-[0.19em] antialiased md:flex md:text-[19px] md:gap-[3.35rem] lg:gap-[3.9rem] lg:text-[clamp(18px,1.1vw,21px)] lg:tracking-[0.2em] xl:tracking-[0.205em]">
            {items.map((item) => {
              const isActive = isRouteActive(item.path);
              return (
              <li key={item.name} className="group relative">
                <a
                  href={resolveNavHref(item.path)}
                  className={`relative isolate py-2.5 transition-[color,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-colors ${
                    isActive
                      ? heroGlass
                        ? "text-white"
                        : "text-[#534a40]"
                      : ""
                  } ${
                    heroGlass
                      ? "text-[rgba(255,255,255,0.92)] hover:text-[rgba(255,255,255,0.97)] hover:opacity-[0.98] hover:-translate-y-px"
                      : "text-[#6d6256] hover:text-[#534a40] hover:opacity-[0.98] hover:-translate-y-px"
                  }`}
                >
                  {item.name}
                </a>
                <span
                  className={`absolute -bottom-[3px] left-0 h-px origin-left transition-[width,opacity] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-all ${
                    isActive ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-85"
                  } ${
                    heroGlass ? "bg-white/[0.72] group-hover:bg-white/[0.86]" : "bg-[#6d6256]/35 group-hover:bg-[#534a40]/55"
                  }`}
                />
              </li>
            )})}
          </ul>

          {/* Toggle menu mobile: tap + pulse leggero all’apertura */}
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            variants={menuToggleVariants}
            initial="idle"
            animate={isOpen ? "justOpened" : "idle"}
            whileTap="tap"
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
            className={`
            relative flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-full
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden
            ${
              isOpen
                ? "bg-[#b01c24] text-white shadow-[0_8px_24px_rgba(176,28,36,0.35)]"
                : heroGlass
                  ? "border border-white/28 bg-white/14 text-white shadow-sm backdrop-blur-sm hover:border-white/50 hover:bg-white/22"
                  : "border border-stone-400/60 bg-stone-100/90 text-stone-900 shadow-sm hover:border-stone-500/50 hover:bg-stone-50"
            }
          `}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          >
            {/* Tre segmenti sfalsati (chiuso) → X centrata (aperto) */}
            <span className="relative block h-[14px] w-[22px]" aria-hidden>
              <span
                className={`absolute block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen
                    ? "left-1/2 top-1/2 w-[22px] -translate-x-1/2 -translate-y-1/2 rotate-45"
                    : "right-0 top-0 w-[13px]"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-[1.5px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ease-out ${
                  isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen
                    ? "left-1/2 top-1/2 w-[22px] -translate-x-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0 left-0 w-[10px]"
                }`}
              />
            </span>
          </motion.button>
        </nav>
      </motion.header>

      {/* Menu mobile — carta del sito, sezioni più ricche + apertura animata */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex min-h-0 max-w-[100vw] flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-paper will-change-[transform,opacity,filter] md:hidden"
            variants={menuOverlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Profondità + trama */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf8f3] via-paper to-[#e8e3d8]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]"
              aria-hidden
            />

            {/* Lampo rosso in apertura */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-[1] bg-[#b01c24]"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
            {/* Onda leggera dal basso */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[45%] bg-gradient-to-t from-[#b01c24]/[0.12] to-transparent"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />

            <motion.div
              className="relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16"
              variants={menuShellVariants}
              initial="hidden"
              animate="show"
            >
              <header className="flex shrink-0 items-center gap-4 rounded-2xl border border-[#e0d9ce] bg-gradient-to-br from-white/90 via-[#faf7f0]/95 to-[#f0ebe3]/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.07)] ring-1 ring-[#b01c24]/[0.12] sm:gap-5 sm:rounded-[1.35rem] sm:p-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-inner ring-2 ring-[#b01c24]/35 ring-offset-2 ring-offset-[#faf7f0] sm:h-[4.25rem] sm:w-[4.25rem]">
                  <img
                    src={bioPortrait}
                    alt="Emanuele Monetti"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#b01c24]/10 to-transparent" />
                </div>
                <div className="min-w-0 border-l border-[#b01c24]/20 pl-4 sm:pl-5">
                  <p className="font-brand text-[clamp(1.35rem,5vw,1.85rem)] font-normal leading-[1.05] tracking-[0.02em] text-[#b01c24] [text-shadow:0_1px_1px_rgba(255,255,255,0.5)]">
                    Emanuele Monetti
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.28em] text-gray-600 sm:text-[11px] sm:tracking-[0.32em]">
                    Cantautore · Autore · Compositore
                  </p>
                </div>
              </header>

              <nav
                className="flex min-h-0 flex-1 flex-col justify-center py-5 sm:py-6"
                aria-label="Navigazione principale"
              >
                <motion.ul
                  className="flex flex-col gap-3 sm:gap-3.5"
                  variants={menuListVariants}
                  initial="hidden"
                  animate="show"
                >
                  {items.map((item) => {
                    const isActive = activeLink === item.path || isRouteActive(item.path);
                    return (
                    <motion.li key={item.name} variants={menuLinkVariants}>
                      <a
                        href={resolveNavHref(item.path)}
                        onClick={(e) => handleMenuNavigation(e, item.path)}
                        className={`
                          group relative flex min-h-[44px] w-full items-center overflow-hidden rounded-2xl border px-4 py-3.5 shadow-sm transition-[border-color,box-shadow,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[1.25rem] sm:px-5 sm:py-[1.15rem]
                          ${
                            isActive
                              ? "border-[#b01c24]/50 bg-gradient-to-r from-[#b01c24]/14 to-[#b01c24]/[0.06] text-[#1f1c19] shadow-[0_10px_32px_rgba(176,28,36,0.15)]"
                              : "border-[#d5cdc0] bg-gradient-to-r from-white/85 to-[#f5f1ea]/90 text-gray-800 hover:border-[#b01c24]/35 hover:from-white hover:to-[#faf6ef] hover:shadow-[0_14px_36px_rgba(176,28,36,0.1)]"
                          }
                        `}
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-[#b01c24] transition-all duration-300 group-hover:h-[60%] ${
                            isActive ? "h-[70%] opacity-100" : "opacity-0"
                          }`}
                          aria-hidden
                        />
                        <span className="font-brand relative pl-3 text-[clamp(1.16rem,4.7vw,1.88rem)] font-normal leading-[1.35] tracking-[0.18em] antialiased sm:pl-4 sm:text-[clamp(1.24rem,4.4vw,1.96rem)] sm:tracking-[0.19em]">
                          {item.name}
                        </span>
                        <span
                          className={`ml-auto text-lg transition-transform duration-300 group-hover:translate-x-0.5 ${
                            isActive
                              ? "text-[#b01c24]"
                              : "text-[#b01c24]/35 group-hover:text-[#b01c24]/80"
                          }`}
                          aria-hidden
                        >
                          →
                        </span>
                      </a>
                    </motion.li>
                  )})}
                </motion.ul>
              </nav>

              <div className="mt-auto flex shrink-0 flex-col items-center gap-5 sm:gap-6">
                {instagram && (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex w-full max-w-md items-center gap-3 overflow-hidden rounded-full border-2 border-[#b01c24]/25 bg-[#2b2926] px-3 py-2.5 pl-3 shadow-[0_16px_48px_rgba(0,0,0,0.28)] transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#b01c24]/60 before:to-transparent hover:border-[#b01c24]/45 hover:shadow-[0_20px_56px_rgba(176,28,36,0.22)] active:scale-[0.99] sm:gap-4 sm:py-3 sm:pl-3.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <img
                      src="/timeline/tuttoegiadiverso.jpeg"
                      alt=""
                      className="relative z-[1] h-[3.25rem] w-[3.25rem] shrink-0 rounded-xl object-cover shadow-md ring-2 ring-white/15 sm:h-14 sm:w-14"
                    />
                    <div className="relative z-[1] min-w-0 flex-1 pr-2 text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b01c24] sm:text-[11px] sm:tracking-[0.26em]">
                        {instagram.label}
                      </p>
                      <p className="mt-0.5 truncate font-sans text-sm font-semibold text-white sm:text-base">
                        Frammenti di musica
                      </p>
                      {instagram.description && (
                        <p className="mt-0.5 truncate text-xs text-white/50">
                          {instagram.description}
                        </p>
                      )}
                    </div>
                    <span
                      className="relative z-[1] mr-1 shrink-0 rounded-full bg-white/10 px-2 py-1 text-base text-white/50 transition group-hover:bg-[#b01c24]/25 group-hover:text-[#b01c24]"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Chiudi menu"
                  className="relative flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full bg-[#1f1c19] text-[#b01c24] shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-4 ring-[#b01c24]/0 transition hover:scale-105 hover:bg-black hover:ring-[#b01c24]/25 active:scale-95"
                >
                  <span className="absolute inset-2 rounded-full border border-white/10" aria-hidden />
                  <span className="relative block h-5 w-5" aria-hidden>
                    <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current shadow-[0_0_8px_rgba(176,28,36,0.5)]" />
                    <span className="absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current shadow-[0_0_8px_rgba(176,28,36,0.5)]" />
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
