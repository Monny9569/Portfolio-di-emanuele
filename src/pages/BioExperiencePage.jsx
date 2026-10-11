import { useCallback, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import BioMobileExperience from "./BioMobileExperience";
import Footer from "../sections/footer";
import CarnevaleArchivePreview from "../components/CarnevaleArchivePreview";
import { BIO_PARAGRAPHS } from "../data/bioNarrative";

import img174 from "../assets/bio/img174.png";
import img176 from "../assets/bio/img176.png";
import dikDikPhoto from "../assets/bio/dikdik-photo.jpg";
import img262 from "../assets/bio/img262.png";
import img263 from "../assets/bio/img263.png";
import leleLive from "../assets/bio/lele_live.png";
import tuttoCd from "../assets/bio/tuttoegiadiverso-cd.png";
import esseArt from "../assets/bio/esse.png";
import venezia from "../assets/bio/venezia.jpg";
import copertineImg from "../assets/bio/copertine.jpg";

const easeCinema = [0.22, 0.08, 0.25, 1];

/** Entrata scena: fade lento + leggero sollevamento */
const sceneSection = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.35, ease: easeCinema },
  },
};

const fadeSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.38, ease: easeCinema },
  },
};

const staggerText = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.22 },
  },
};

const staggerSoft = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.18 },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.02, ease: easeCinema },
  },
};

/* Stessa tipografia della pagina Dik Dik (.dikdik-prose, definita in index.css):
   font-open-sans-sc · font-medium · text-base/lg/[1.22rem] · leading 1.92/1.98/2.02
   · letter-spacing normale · text-wrap pretty · hyphens off · strong extrabold.
   Qui aggiungo solo il colore testo adatto al fondo scuro della Bio Experience. */
const bodyOnDark = "dikdik-prose text-[#d8cfc3] antialiased text-justify";

const grainLayer = (
  <div
    className="pointer-events-none fixed inset-0 z-[1] opacity-[0.042] mix-blend-soft-light"
    aria-hidden
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
    }}
  />
);

/** Immagine full-bleed: micro parallax + zoom leggero legati allo scroll (sezione). */
function ParallaxSceneBg({
  src,
  alt = "",
  objectPosition,
  objectPositionClassName,
  loading = "lazy",
  eager = false,
  /** `heroSubject`: crop moderato (es. Scena II). `narrativePortrait`: crop minimo + parallax leggerissimo (es. Scena I). */
  variant = "default",
  /** Moltiplicatore di scale aggiunto sopra il respiro animato (per zoom cinematografico statico).
   *  Resta 1 di default; se >1 produce uno zoom controllato senza alterare parallax/useTransform. */
  baselineScale = 1,
  /** Solo con `heroSubject`: `headroom` abbassa leggermente il frame (più aria sopra il volto). */
  heroSubjectFrame = "default",
  /** Solo con `narrativePortrait`: `grounded` ancora il crop dal basso (persona + piano). */
  portraitGrounded = false,
  /** Offset Y statico sul media (es. "8%" per abbassare il soggetto nella slide). */
  mediaTranslateY = "0%",
  /** Offset X statico sul media (es. "-10%" per spostare il soggetto a sinistra). */
  mediaTranslateX = "0%",
  /** `"contain"`: mostra l’immagine intera con letterboxing; default `"cover"`. */
  mediaFit = "cover",
  /** Frame pieno senza overscan (es. Scena II: `inset-0` + `object-cover`). */
  mediaSimpleCover = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isNarrativePortrait = variant === "narrativePortrait";
  const isHeroSubject = variant === "heroSubject" || isNarrativePortrait;

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isNarrativePortrait ? ["-0.85%", "0.85%"] : isHeroSubject ? ["-1.25%", "1.25%"] : ["-3.5%", "3.5%"],
  );
  const y = useMotionTemplate`calc(${yParallax} + ${mediaTranslateY})`;
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isNarrativePortrait
      ? [1.002 * baselineScale, 1.011 * baselineScale, 1.002 * baselineScale]
      : isHeroSubject
        ? [1.006 * baselineScale, 1.02 * baselineScale, 1.006 * baselineScale]
        : [1.03 * baselineScale, 1.065 * baselineScale, 1.03 * baselineScale],
  );

  const simpleCoverFrameClass = mediaSimpleCover
    ? "absolute inset-0 h-full w-full object-cover will-change-transform"
    : null;

  const imgFrameClass =
    simpleCoverFrameClass ??
    (mediaFit === "contain"
      ? "absolute inset-0 h-full w-full max-w-none object-contain will-change-transform"
      : isNarrativePortrait
        ? portraitGrounded
          ? "absolute inset-x-0 bottom-0 left-0 h-[112%] w-[103%] max-w-none max-h-none object-cover will-change-transform"
          : "absolute inset-0 h-[102%] w-[101%] max-w-none -left-[0.5%] -top-[0.75%] object-cover will-change-transform"
        : isHeroSubject
          ? heroSubjectFrame === "headroom"
            ? "absolute inset-0 h-[102%] w-[101%] max-w-none -left-[0.5%] top-[1.25%] object-cover will-change-transform"
            : "absolute inset-0 h-[104%] w-[103%] max-w-none -left-[1.5%] -top-[2%] object-cover will-change-transform"
          : "absolute inset-0 h-[112%] w-full max-w-none -top-[6%] object-cover will-change-transform");

  const posStyle =
    objectPosition && !objectPositionClassName ? { objectPosition } : {};

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={
          mediaSimpleCover
            ? { x: mediaTranslateX, scale, ...posStyle }
            : { x: mediaTranslateX, y, scale, ...posStyle }
        }
        className={`${imgFrameClass} ${objectPositionClassName ?? ""}`}
        loading={eager ? "eager" : loading}
        decoding="async"
      />
    </div>
  );
}

/** Dipinto/opera come scena: parallax morbido + responsive contain/cover.
 *  - Mobile (portrait): object-contain per non perdere il soggetto del dipinto wide.
 *  - Desktop (>=md): object-cover con object-position calibrato per evitare crop sulle figure. */
function ParallaxEsseArt({ src, alt = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-1.4%", "1.4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.012, 1.028, 1.012]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full max-w-none object-contain object-center will-change-transform md:object-cover md:object-[50%_46%]"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Immagine in riquadro: solo micro-zoom scroll per profondità. */
function ParallaxFramedImg({ src, alt, className = "", imgClassName = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.045, 1.02]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ scale }}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function SceneLabel({ children, className = "" }) {
  return (
    <p
      className={`font-open-sans-sc font-medium mb-5 text-[10px] uppercase tracking-[0.2em] text-[#9a8a78] antialiased sm:text-[11px] sm:tracking-[0.38em] ${className}`}
    >
      {children}
    </p>
  );
}

/** Velo cinematografico per la zona lettura. Niente più "card":
 *   - nessun bordo, nessun radius, nessun blur, nessuna shadow
 *   - solo un gradient morbido direzionale che si dissolve dietro al testo
 *   - su desktop il gradient è orizzontale (dal lato testo verso il centro scena)
 *   - su mobile diventa verticale (top o bottom secondo dove cade il testo nello stack)
 *   - il testo ha un text-shadow leggero per restare leggibile anche dove il gradient sfuma
 */
function BioReadVeil({
  children,
  direction = "left",
  mobileAnchor = "top",
  className = "",
}) {
  return (
    <div
      data-bio-veil-direction={direction}
      data-bio-veil-anchor={mobileAnchor}
      className={[
        "bio-mobile-copy-zone bio-mobile-text-panel relative px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7",
        "[&_p.dikdik-prose]:text-[#ebe4d8] [&_p.dikdik-prose]:[text-shadow:0_2px_18px_rgba(0,0,0,0.55)]",
        "max-md:[&_p.dikdik-prose]:[text-shadow:none]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

const BIO_SCENE_COUNT = 10;

/** Scroll alla scena: ora ogni scena occupa esattamente un viewport (100dvh)
 *  e parte dal proprio top, quindi è sufficiente allinearsi al top del bordo scena.
 *  La navbar (position: fixed) "vela" naturalmente i primi pixel: i layout di scena
 *  hanno già pt-20/pt-24 interno per non finire sotto la navbar. */
function scrollToBioSceneId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
}

/** Indicatore in fondo scena: invito elegante alla scena successiva / riavvio. */
function BioSceneScrollCue({ sceneIndex, footerFade = true }) {
  const isLast = sceneIndex >= BIO_SCENE_COUNT;
  const reduceMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    const id = isLast ? "bio-scene-1" : `bio-scene-${sceneIndex + 1}`;
    scrollToBioSceneId(id);
  }, [isLast, sceneIndex]);

  const bounceTransition = reduceMotion
    ? undefined
    : {
        duration: 1.85,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.42, 0, 0.58, 1],
      };

  return (
    <div
      className={[
        "relative z-[35] flex w-full shrink-0 justify-center px-4 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] md:pb-[max(0.65rem,env(safe-area-inset-bottom,0px))]",
        footerFade
          ? "bg-linear-to-t from-black/55 via-black/18 to-transparent pt-3 md:pt-4"
          : "bg-transparent pt-2 md:pt-3",
      ].join(" ")}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={isLast ? "Torna alla prima scena" : "Vai alla scena successiva"}
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#e8dcc8]/55 bg-[rgba(22,19,16,0.72)] text-[#faf3e8] shadow-[0_0_0_1px_rgba(232,220,200,0.12),0_4px_14px_rgba(0,0,0,0.35),0_0_28px_rgba(196,165,116,0.18)] backdrop-blur-[8px] transition-[border-color,background-color,box-shadow,color,transform] duration-300 ease-out hover:border-[#f5ebe0]/85 hover:bg-[rgba(32,28,24,0.82)] hover:text-white hover:shadow-[0_0_0_1px_rgba(245,235,224,0.22),0_8px_28px_rgba(0,0,0,0.42),0_0_36px_rgba(212,188,148,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4bc94]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908] md:h-11 md:w-11"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={bounceTransition}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        {isLast ? (
          <ChevronUpIcon
            className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] md:h-[1.125rem] md:w-[1.125rem]"
            strokeWidth={2}
            aria-hidden
          />
        ) : (
          <ChevronDownIcon
            className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] md:h-[1.125rem] md:w-[1.125rem]"
            strokeWidth={2}
            aria-hidden
          />
        )}
      </motion.button>
    </div>
  );
}

/* Layout scena
 * Mobile (< md): flusso naturale a blocchi con `min-h: viewport` (almeno una schermata,
 *   ma il contenuto può estendere la scena se serve → niente testo tagliato, niente
 *   PDF/immagini che fuoriescono dal box scuro).
 * md+ : torna lo "slide cinematografico" a viewport fisso (h + max-h + overflow-hidden,
 *   flex chain con min-h-0 + flex-1) → resa desktop INVARIATA.
 */
const bioSceneStage =
  "bio-scene-stage relative md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden";

const bioSceneFrame =
  "relative box-border min-h-[var(--bio-viewport-scene,100svh)] overflow-x-clip md:flex md:h-[var(--bio-viewport-scene,100svh)] md:max-h-[var(--bio-viewport-scene,100svh)] md:min-h-0 md:flex-col md:overflow-hidden";

const bioSceneFill =
  "relative z-10 w-full md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden";

const bioSceneFillCentered = `${bioSceneFill} md:justify-center`;

/** Solo scene VIII / IX: entrata contemplativa (fade + rise lento). */
const bioFinaleParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.24, delayChildren: 0.2 },
  },
};
const bioFinaleChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.42, ease: easeCinema },
  },
};

const bioFinaleGrainStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
};

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function subscribeDesktopViewport(callback) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopViewportSnapshot() {
  return typeof window !== "undefined" &&
    window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getDesktopViewportServerSnapshot() {
  return false;
}

export default function BioExperiencePage() {
  const isDesktop = useSyncExternalStore(
    subscribeDesktopViewport,
    getDesktopViewportSnapshot,
    getDesktopViewportServerSnapshot,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("bio-experience-snap", isDesktop);

    return () => {
      root.classList.remove("bio-experience-snap");
    };
  }, [isDesktop]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const clearDesktopLayoutState = () => {
      root.style.removeProperty("--bio-snap-pad-top");
      root.style.removeProperty("--bio-viewport-scene");
      root.style.removeProperty("--bio-viewport-scene-dvh");
    };

    if (!isDesktop) {
      clearDesktopLayoutState();
      return clearDesktopLayoutState;
    }

    const measure = () => {
      const header = document.querySelector(".site-header");
      const h = header?.getBoundingClientRect().height ?? 72;
      const pad = Math.ceil(h + 8);
      root.style.setProperty("--bio-snap-pad-top", `${pad}px`);
      root.style.setProperty("--bio-viewport-scene", "100svh");
      root.style.removeProperty("--bio-viewport-scene-dvh");
    };

    measure();
    const header = document.querySelector(".site-header");
    const ro = header ? new ResizeObserver(measure) : null;
    if (header && ro) ro.observe(header);
    window.addEventListener("resize", measure);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      clearDesktopLayoutState();
    };
  }, [isDesktop]);

  const sceneViewport = { once: true, amount: 0.22, margin: "-8% 0px -8% 0px" };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0a0908] text-[#ebe6dc]">
      {isDesktop ? grainLayer : null}
      <Navbar />

      {isDesktop ? (
        <div className="relative z-10">
        <main>
        {/* Scena I — frame cinematografico unico: media full-bleed + testo integrato */}
        <motion.section
          id="bio-scene-1"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip`}
        >
          <div className={bioSceneStage}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.25, ease: easeCinema }}
              className="pointer-events-none absolute inset-0 z-0"
            >
              <ParallaxSceneBg
                src={img263}
                alt="Emanuele Monetti, anni delle prime canzoni"
                variant="narrativePortrait"
                portraitGrounded
                objectPosition="28% 100%"
                baselineScale={1}
                objectPositionClassName="object-[28%_100%]"
                eager
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.35)_38%,transparent_62%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.92)_100%)]"
              aria-hidden
            />
            <div className="relative z-20 flex min-h-0 w-full flex-1 flex-col justify-end px-5 pb-5 pt-20 sm:px-8 sm:pb-6 sm:pt-24 md:items-center md:justify-center md:px-10 md:pb-8 lg:px-14 xl:px-16">
              <motion.div
                variants={staggerText}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25, margin: "-6% 0px" }}
                className="bio-mobile-copy-zone relative z-20 w-full max-w-[min(100%,22rem)] sm:max-w-md md:ml-[52%] md:max-w-[min(100%,26rem)] lg:ml-[50%] lg:max-w-[28rem] xl:ml-[49%] [&_p.dikdik-prose]:text-[#ebe6dc] [&_p.dikdik-prose]:[text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_0_56px_rgba(0,0,0,0.5)] max-md:[&_p.dikdik-prose]:[text-shadow:none]"
              >
                <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy mb-5 sm:mb-6`}>
                  {BIO_PARAGRAPHS[0]}
                </motion.p>
                <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy`}>
                  {BIO_PARAGRAPHS[1]}
                </motion.p>
              </motion.div>
            </div>
            <BioSceneScrollCue sceneIndex={1} />
          </div>
        </motion.section>

        {/* Scena II — fullscreen immersivo: una sola immagine, testo in colonna */}
        <motion.section
          id="bio-scene-2"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip`}
        >
          <div className={bioSceneStage}>
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
              <motion.img
                src={img174}
                alt="Emanuele Monetti al pianoforte, anni giovanili"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{
                  objectPosition: "50% 8%",
                  transform: "translateY(5%) scale(1.08)",
                  transformOrigin: "center center",
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-[#0a0908]/95 via-[#080706]/32 to-transparent lg:from-[#0a0908]/92 lg:via-[#060504]/16 lg:to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-[#0a0908]/72 via-[#0a0908]/08 to-[#0a0908]/20 lg:from-[#0a0908]/48 lg:via-transparent lg:to-[#0a0908]/22"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_96%_78%_at_82%_40%,transparent_0%,transparent_40%,rgba(4,3,2,0.26)_88%)]"
              aria-hidden
            />
            <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[min(100%,1420px)] flex-1 grid-cols-1 content-center gap-5 px-5 pb-4 pt-20 sm:px-8 sm:pt-24 md:gap-6 lg:grid-cols-[min(38vw,420px)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-10 lg:pb-6 xl:grid-cols-[min(36vw,440px)_minmax(0,1fr)] xl:pl-16">
              <div className="max-w-[min(100%,22rem)] sm:max-w-md lg:col-start-1 lg:max-w-[23rem] lg:justify-self-start lg:pb-0">
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 1.2, ease: easeCinema, delay: 0.06 }}
                  className="bio-mobile-copy-zone [&_p.dikdik-prose]:text-[#ebe6dc] [&_p.dikdik-prose]:[text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_0_48px_rgba(0,0,0,0.5)] max-md:[&_p.dikdik-prose]:[text-shadow:none]"
                >
                  <motion.div
                    variants={staggerSoft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                  >
                    <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy`}>
                      {BIO_PARAGRAPHS[2]}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
              <div className="hidden min-h-0 lg:col-start-2 lg:row-start-1 lg:block" aria-hidden />
            </div>
            <BioSceneScrollCue sceneIndex={2} footerFade={false} />
          </div>
        </motion.section>

        {/* Scena III */}
        <motion.section
          id="bio-scene-3"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip bg-[#0a0807]`}
        >
          <div className={bioSceneStage}>
            <ParallaxSceneBg
              src={venezia}
              alt="Maschera veneziana e gondole al Bacino di San Marco — Un carnevale per Venezia (1980)"
              variant="default"
              objectPositionClassName="object-[62%_55%] sm:object-[58%_52%] md:object-[52%_50%] lg:object-[48%_48%]"
            />
            <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
              {/* Vignettatura morbida ai bordi per fondere l'immagine con la cornice scena */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_122%_100%_at_50%_50%,transparent_36%,rgba(0,0,0,0.52)_100%)] opacity-[0.8]" />
              {/* Gradient direzionale per il testo: su mobile dall'alto (testo in cima allo stack), su desktop da sinistra (lato testo, opposto al foglio PDF) */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,2,0.7)_0%,rgba(5,3,2,0.32)_26%,transparent_56%,transparent_72%,rgba(5,3,2,0.4)_100%)] md:bg-[linear-gradient(90deg,rgba(6,4,2,0.78)_0%,rgba(6,4,2,0.5)_22%,rgba(6,4,2,0.18)_48%,transparent_72%)]" />
              <div
                className="absolute inset-0 opacity-[0.022] mix-blend-soft-light"
                style={bioFinaleGrainStyle}
              />
            </div>
            <div className={`${bioSceneFill} min-h-0 justify-start pt-[max(5.5rem,var(--bio-snap-pad-top,5rem))] pb-6 md:pt-[max(6rem,var(--bio-snap-pad-top,5rem))] md:pb-8`}>
              <div className="relative z-10 mx-auto flex w-full max-w-[min(92vw,32rem)] flex-1 flex-col items-center justify-between gap-5 px-5 pb-4 sm:px-8 max-md:min-h-0 md:ml-auto md:mr-10 md:max-w-[30rem] md:flex-none md:justify-start md:gap-4 md:px-0 md:translate-y-8 lg:mr-16 lg:translate-y-12 xl:mr-24 xl:translate-y-16">
                <motion.div
                  variants={staggerText}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.22 }}
                  className="bio-mobile-copy-zone bio-mobile-text-panel w-full"
                >
                  <motion.p
                    variants={lineReveal}
                    className={`${bodyOnDark} bio-mobile-copy w-full max-w-[30rem]`}
                  >
                    {BIO_PARAGRAPHS[3]}
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.15, ease: easeCinema, delay: 0.12 }}
                  className="bio-mobile-pdf-slot relative w-full max-w-[min(100%,12.5rem)] sm:max-w-[13.5rem] md:max-w-[14rem] opacity-95"
                >
                  <div className="relative w-full origin-top scale-[0.92] rounded-[3px] p-1 bg-transparent shadow-[0_10px_32px_-20px_rgba(0,0,0,0.52)] ring-1 ring-white/[0.04] md:scale-[0.9]">
                    <CarnevaleArchivePreview variant="cinematic" />
                  </div>
                </motion.div>
              </div>
            </div>
            <BioSceneScrollCue sceneIndex={3} />
          </div>
        </motion.section>

        {/* Scena IV — palco e concorsi: 1984 (Castrocaro / CGD) */}
        <motion.section
          id="bio-scene-4"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip bg-[#060504]`}
        >
          <div className={bioSceneStage}>
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
              <ParallaxSceneBg
                src={leleLive}
                alt="Emanuele Monetti in concerto"
                variant="heroSubject"
                objectPositionClassName="object-[50%_48%] sm:object-[50%_46%] md:object-[50%_44%] lg:object-[50%_42%] xl:object-[50%_40%]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-[#0a0908]/92 via-[#0a0908]/38 to-transparent lg:from-[#0a0908]/88 lg:via-[#0a0908]/22 lg:to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-[#0a0908]/60 via-transparent to-[#0a0908]/18"
              aria-hidden
            />
            <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[min(100%,1420px)] flex-1 grid-cols-1 content-start px-5 pb-5 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[min(38vw,460px)_minmax(0,1fr)] lg:items-start lg:px-12 lg:pt-[22vh] xl:px-16 xl:pt-[20vh]">
              <div className="max-w-[min(100%,22rem)] sm:max-w-md lg:col-start-1 lg:max-w-[28rem] lg:justify-self-start lg:pb-0 lg:-translate-x-4 lg:-translate-y-6 xl:-translate-x-6 xl:-translate-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: easeCinema, delay: 0.06 }}
                  className="bio-mobile-copy-zone bio-mobile-text-panel [&_p.dikdik-prose]:text-[#ebe6dc] [&_p.dikdik-prose]:[text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_0_48px_rgba(0,0,0,0.5)] max-md:[&_p.dikdik-prose]:[text-shadow:none]"
                >
                  <motion.div
                    variants={staggerSoft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.22 }}
                  >
                    <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy`}>
                      {BIO_PARAGRAPHS[4]}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <BioSceneScrollCue sceneIndex={4} />
          </div>
        </motion.section>

        {/* Scena IV BIS — produzione e discografia: 1987 (Paolo Cattaneo / Sony Records) */}
        <motion.section
          id="bio-scene-5"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip bg-[#060504]`}
        >
          <div className={bioSceneStage}>
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_60%,rgba(36,28,22,0.16)_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]"
              aria-hidden
            />
            <div
              className={`${bioSceneFill} min-h-0 justify-start pt-[max(4.5rem,calc(var(--bio-snap-pad-top,5rem)*0.9))] pb-2 sm:pt-24 md:pb-3`}
            >
              <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[min(100%,1240px)] flex-1 flex-col px-5 sm:px-8 md:px-10 lg:px-12">
                <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-5 pb-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-7 xl:gap-9">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.1, ease: easeCinema, delay: 0.06 }}
                    className="relative z-[2] order-2 flex min-h-0 min-w-0 flex-col justify-center lg:order-1"
                  >
                    <BioReadVeil
                      direction="left"
                      mobileAnchor="bottom"
                      className="w-full max-w-none py-6 sm:py-7 md:px-8 md:py-8"
                    >
                      <motion.div
                        variants={staggerSoft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.22 }}
                      >
                        <motion.p variants={lineReveal} className={bodyOnDark}>
                          {BIO_PARAGRAPHS[5]}
                        </motion.p>
                      </motion.div>
                    </BioReadVeil>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 1.2, ease: easeCinema }}
                    className="bio-mobile-photo-slot relative z-0 order-1 w-full overflow-hidden rounded-[14px] border border-[rgba(255,245,232,0.12)] bg-[#0a0908] shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_28px_88px_rgba(0,0,0,0.55)] max-lg:min-h-[min(38svh,320px)] max-lg:max-h-[min(46svh,400px)] lg:order-2 lg:h-full lg:min-h-0 lg:max-h-none"
                  >
                    <ParallaxFramedImg
                      src={img262}
                      alt="Emanuele Monetti, anni delle produzioni discografiche"
                      className="absolute inset-0"
                      imgClassName="object-[50%_42%] sm:object-[50%_40%] lg:object-[50%_38%]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#060504]/60 via-transparent to-[#060504]/14"
                      aria-hidden
                    />
                  </motion.div>
                </div>
              </div>
            </div>
            <BioSceneScrollCue sceneIndex={5} />
          </div>
        </motion.section>

        {/* Scena V — Dik Dik / Ricky Gianco 1997: fullscreen + sfumatura editoriale */}
        <motion.section
          id="bio-scene-6"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={fadeSlow}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip`}
        >
          <motion.div className={bioSceneStage}>
            <motion.div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <img
                src={img176}
                alt="Emanuele Monetti al pianoforte"
                className="absolute inset-0 h-full w-full object-cover object-[52%_40%] sm:object-[50%_38%] md:object-[48%_36%] lg:object-[46%_34%]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.10)_42%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.68)_100%)]"
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_44%_58%_at_78%_48%,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.36)_42%,rgba(0,0,0,0.14)_68%,transparent_86%)]"
              aria-hidden
            />
            <motion.div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[min(100%,1420px)] flex-1 flex-col justify-end px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 max-md:min-h-0 md:items-end md:justify-end lg:px-10 lg:pb-20 xl:px-12">
              <motion.div className="relative z-10 ml-auto flex w-full max-w-[28rem] flex-col gap-5 max-md:mr-0 max-md:max-w-none lg:mr-8 xl:mr-10 2xl:mr-12 lg:translate-x-20 lg:translate-y-16 xl:translate-x-28 xl:translate-y-20 2xl:translate-x-32 2xl:translate-y-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 1.15, ease: easeCinema, delay: 0.06 }}
                  className="bio-mobile-copy-zone bio-mobile-text-panel [&_p.dikdik-prose]:text-[#ebe6dc] [&_p.dikdik-prose]:[text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_0_48px_rgba(0,0,0,0.45)] max-md:[&_p.dikdik-prose]:[text-shadow:none]"
                >
                  <motion.div
                    variants={staggerSoft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy`}>
                      {BIO_PARAGRAPHS[6]}
                    </motion.p>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 1.05, ease: easeCinema, delay: 0.12 }}
                  className="relative w-[min(62%,15rem)] self-start overflow-hidden rounded-[12px] border border-white/[0.12] bg-black/20 p-1.5 shadow-[0_16px_44px_rgba(0,0,0,0.42)]"
                >
                  <img
                    src={dikDikPhoto}
                    alt="Emanuele Monetti con i Dik Dik"
                    className="block aspect-[4/3] w-full rounded-[8px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <BioSceneScrollCue sceneIndex={6} />
          </motion.div>
        </motion.section>

        {/* Scena VI — Irene e nuove collaborazioni: seconda foto fullscreen (no ripetizione img176) */}
        <motion.section
          id="bio-scene-7"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={fadeSlow}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip`}
        >
          <div className={bioSceneStage}>
            <div className="pointer-events-none absolute inset-0 z-0">
              <ParallaxSceneBg
                src={img262}
                alt="Emanuele Monetti dal vivo"
                variant="heroSubject"
                objectPositionClassName="object-[48%_46%] sm:object-[46%_44%] md:object-[44%_42%] lg:object-[42%_40%] xl:object-[40%_38%]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-[#0a0908]/95 via-[#080706]/34 to-transparent lg:from-[#0a0908]/90 lg:via-[#060504]/14 lg:to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-[#0a0908]/70 via-[#0a0908]/06 to-[#0a0908]/18 lg:from-[#0a0908]/46 lg:via-transparent lg:to-[#0a0908]/12]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_96%_80%_at_78%_42%,transparent_0%,transparent_38%,rgba(4,3,2,0.28)_90%)]"
              aria-hidden
            />
            <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[min(100%,1420px)] flex-1 grid-cols-1 content-end gap-5 px-5 pb-3 pt-20 sm:px-8 sm:pt-24 md:gap-6 lg:grid-cols-[min(42vw,460px)_minmax(0,1fr)] lg:items-end lg:gap-10 lg:px-10 lg:pb-5 xl:grid-cols-[min(40vw,480px)_minmax(0,1fr)] xl:pl-12">
              <div className="max-w-[min(100%,22rem)] sm:max-w-md lg:col-start-1 lg:max-w-none lg:justify-self-start lg:pb-1">
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 1.2, ease: easeCinema, delay: 0.06 }}
                >
                  <BioReadVeil
                    direction="left"
                    mobileAnchor="bottom"
                    className="mb-0 sm:mb-0"
                  >
                    <motion.div
                      variants={staggerSoft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.32 }}
                    >
                      <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy`}>
                        {BIO_PARAGRAPHS[7]}
                      </motion.p>
                    </motion.div>
                  </BioReadVeil>
                </motion.div>
              </div>
              <div className="hidden min-h-0 lg:col-start-2 lg:row-start-1 lg:block" aria-hidden />
            </div>
            <BioSceneScrollCue sceneIndex={7} />
          </div>
        </motion.section>

        {/* Scena VII — …Tutto è già diverso */}
        <motion.section
          id="bio-scene-8"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip bg-linear-to-b from-[#0a0908] via-[#0f0d0b] to-[#14110e]`}
        >
          <div className={bioSceneStage}>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-linear-to-r from-transparent via-[#c4a574]/35 to-transparent" />
            <div className={`${bioSceneFill} min-h-0 justify-start pt-[max(5.5rem,var(--bio-snap-pad-top,5rem))] pb-6 md:pt-[max(6rem,var(--bio-snap-pad-top,5rem))] md:pb-8`}>
              <motion.div
                variants={staggerText}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.26 }}
                className="mx-auto flex min-h-0 w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6 md:max-w-5xl lg:max-w-[min(100%,56rem)]"
              >
                <motion.p variants={lineReveal} className={`${bodyOnDark} bio-mobile-copy bio-mobile-text-panel mb-3 max-w-2xl md:mb-5 md:bg-transparent md:border-0 md:p-0 md:shadow-none`}>
                  {BIO_PARAGRAPHS[8]}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 36, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 1.55, delay: 0.12, ease: easeCinema }}
                  className="bio-mobile-album-slot relative w-full max-w-[min(96vw,580px)] sm:max-w-[min(92vw,640px)] md:max-w-[min(88vw,720px)] lg:max-w-[min(82vw,880px)] xl:max-w-[min(78vw,960px)]"
                >
                  <div
                    className="pointer-events-none absolute -inset-8 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(196,165,116,0.16)_0%,transparent_68%)] md:-inset-12"
                    aria-hidden
                  />
                  <img
                    src={tuttoCd}
                    alt="Album …Tutto è già diverso"
                    className="relative z-[1] w-full max-h-[min(42svh,420px)] object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.55)] max-md:max-h-[min(38svh,360px)] md:max-h-[min(46svh,500px)]"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>
            </div>
            <BioSceneScrollCue sceneIndex={8} />
          </div>
        </motion.section>

        {/* Scena VIII */}
        <motion.section
          id="bio-scene-9"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip border-t border-white/[0.06] bg-[#0a0b0e]`}
        >
          <div className={bioSceneStage}>
            <ParallaxEsseArt
              src={esseArt}
              alt="ESSE — opera strumentale di Emanuele Monetti"
            />
            <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
              {/* Vignettatura ai bordi per fondere l'opera con la cornice scena */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_96%_at_50%_50%,transparent_42%,rgba(0,0,0,0.48)_100%)] opacity-[0.78]" />
              {/* Lente morbida dietro al testo: scurisce SOLO l'area centrale per leggibilità senza slavare il dipinto */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_44%_34%_at_50%_55%,rgba(8,9,12,0.5)_0%,rgba(8,9,12,0.22)_55%,transparent_82%)] md:bg-[radial-gradient(ellipse_38%_28%_at_50%_54%,rgba(8,9,12,0.48)_0%,rgba(8,9,12,0.2)_56%,transparent_84%)]" />
              {/* Banda inferiore appena percettibile per dare peso al cue di scroll */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,12,0.18)_0%,transparent_22%,transparent_78%,rgba(5,6,9,0.34)_100%)] opacity-[0.7]" />
              <div
                className="absolute inset-0 opacity-[0.022] mix-blend-soft-light"
                style={bioFinaleGrainStyle}
              />
            </div>
            <div className={`${bioSceneFillCentered} relative z-10 min-h-0 justify-center px-6 py-10 md:px-14 md:py-16`}>
              <div className="mx-auto w-full max-w-[min(100%,38rem)] text-center md:max-w-[min(100%,42rem)] lg:max-w-[min(100%,44rem)]">
                <motion.div
                  variants={bioFinaleParent}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.22 }}
                  className="bio-mobile-text-panel md:bg-transparent md:border-0 md:p-0 md:shadow-none"
                >
                  <motion.p
                    variants={bioFinaleChild}
                    className="dikdik-prose bio-mobile-copy text-[#ece2d3] antialiased [text-shadow:0_2px_22px_rgba(0,0,0,0.6)]"
                  >
                    {BIO_PARAGRAPHS[9]}
                  </motion.p>
                </motion.div>
              </div>
            </div>
            <BioSceneScrollCue sceneIndex={9} />
          </div>
        </motion.section>

        {/* Scena IX — singoli 2019–oggi: copertine full-bleed */}
        <motion.section
          id="bio-scene-10"
          initial="hidden"
          whileInView="visible"
          viewport={sceneViewport}
          variants={sceneSection}
          className={`bio-exp-scene ${bioSceneFrame} snap-start snap-always overflow-x-clip`}
        >
          <div className={bioSceneStage}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.25, ease: easeCinema }}
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
              <img
                src={copertineImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-[50%_42%] sm:object-[50%_40%] md:object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-black/5" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 74%, rgba(0,0,0,0.08) 86%, rgba(0,0,0,0.18) 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] opacity-[0.022] mix-blend-soft-light"
              style={bioFinaleGrainStyle}
              aria-hidden
            />
            <div
              className={`${bioSceneFillCentered} relative z-10 min-h-0 flex-1 items-center justify-center px-5 pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] pt-20 sm:px-6 md:px-10 md:pb-20 md:pt-24`}
            >
              <motion.div
                variants={bioFinaleParent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                className="bio-mobile-text-panel relative z-10 mx-auto w-full max-w-[min(100%,22rem)] text-center sm:max-w-md md:max-w-[min(100%,42rem)] md:bg-transparent md:border-0 md:p-0 md:shadow-none lg:max-w-[min(100%,44rem)] md:translate-y-[4vh]"
              >
                <motion.p
                  variants={bioFinaleChild}
                  className="dikdik-prose bio-mobile-copy text-base font-semibold text-[#f3eadc] antialiased sm:text-lg md:text-[1.22rem] md:drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)] md:[text-shadow:0_2px_20px_rgba(0,0,0,0.72),0_1px_4px_rgba(0,0,0,0.55)]"
                >
                  {BIO_PARAGRAPHS[10]}
                </motion.p>
              </motion.div>
            </div>
            <BioSceneScrollCue sceneIndex={10} footerFade={false} />
          </div>
        </motion.section>
        </main>
        </div>
      ) : (
        <BioMobileExperience />
      )}

      <div className="relative z-10 [scroll-snap-align:none] border-t border-white/[0.06] bg-[#0a0908]">
        <Footer />
      </div>
    </div>
  );
}
