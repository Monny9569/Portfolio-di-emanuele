import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import CarnevaleArchivePreview from "../components/CarnevaleArchivePreview";
import Footer from "../sections/footer";

import img174 from "../assets/bio/img174.png";
import img175 from "../assets/bio/img175.png";
import img176 from "../assets/bio/img176.png";
import img262 from "../assets/bio/img262.png";
import img263 from "../assets/bio/img263.png";
import leleLive from "../assets/bio/lele_live.png";
import tuttoCd from "../assets/bio/tuttoegiadiverso-cd.png";
import { BIO_PARAGRAPHS } from "../data/bioNarrative";

const sectionEase = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: sectionEase, delay: i * 0.04 },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: sectionEase },
  },
};

const prose =
  "font-bio-body text-[1.04rem] leading-[1.86] tracking-[0.018em] text-[#4a4036] text-pretty [hyphens:none] antialiased sm:text-[1.06rem] sm:leading-[1.88] md:text-[1.09rem] md:leading-[1.9] lg:text-[1.11rem] lg:leading-[1.92] [&_strong]:font-extrabold";

const sceneGrid =
  "grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 xl:gap-x-14";

/** Colonna immagini: stessa larghezza su tutte le scene (griglia editoriale). */
const visualCol =
  "mx-auto w-full min-w-0 max-w-[300px] shrink-0 lg:mx-0 lg:max-w-[300px] lg:justify-self-end";

/** Modulo fotografico unico: raggio, bordo, ombra allineati. */
const photoModule =
  "overflow-hidden rounded-[14px] border border-[#d2c8bb]/85 bg-[#f1ebe2]/55 shadow-[0_6px_18px_rgba(38,28,20,0.075)]";

/** Stack verticale tra moduli nella stessa scena. */
const visualStackGap = "flex flex-col gap-3.5";

function BioParagraphs({ indices, startDelay = 0 }) {
  return (
    <div className="min-w-0 max-w-[38rem] space-y-7 md:space-y-8">
      {indices.map((idx, i) => (
        <motion.p
          key={idx}
          custom={i + startDelay}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className={prose}
        >
          {BIO_PARAGRAPHS[idx]}
        </motion.p>
      ))}
    </div>
  );
}

/** Testo 1979–1983 (prima riga della sezione centrale). */
function BioCentral1979() {
  return <BioParagraphs indices={[2]} startDelay={0} />;
}

/** Testo 1980 — affiancato in griglia al documento d’archivio. */
function BioCentral1980() {
  return <BioParagraphs indices={[3]} startDelay={0} />;
}

/** Castrocaro, Sony, Dik Dik, Irene. */
function BioCentralRest() {
  return (
    <div className="min-w-0 max-w-[38rem] space-y-7 md:space-y-8">
      <BioParagraphs indices={[4, 5]} startDelay={0} />
      <BioParagraphs indices={[6, 7]} startDelay={2} />
    </div>
  );
}

function NarrativeVisual({ children, className = "" }) {
  return <aside className={`${visualCol} ${className}`}>{children}</aside>;
}

/** Contenitore immagine con padding interno costante. */
function BioPhotoFrame({ children, className = "" }) {
  return <div className={`${photoModule} ${className}`}>{children}</div>;
}

export default function BioPage() {
  return (
    <div className="min-h-screen w-full bg-paper font-sans text-gray-900">
      <Navbar />

      <main className="relative overflow-hidden pt-28 font-bio-body antialiased md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_92%_at_50%_-8%,rgba(255,254,250,0.95)_0%,rgba(246,241,231,0.95)_46%,rgba(237,228,211,0.96)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(172,138,92,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(172,138,92,0.06)_1px,transparent_1px)] bg-size-[28px_28px] opacity-50" />
        <div
          className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22g%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.88%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23g)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-multiply"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-[#fffef8]/75 to-transparent" />

        <section className="relative mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32 lg:max-w-[1180px] lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: "easeOut" }}
          >
            <div className="mb-10 border-b border-[#d9ceba] pb-6">
              <Link
                to="/"
                className="font-bio-display inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-[#786756] transition hover:text-[#4f4337] md:text-[11px] md:tracking-[0.34em]"
              >
                <span aria-hidden>←</span>
                Torna alla home
              </Link>
            </div>

            <header className="mb-14 md:mb-16 lg:mb-20">
              <p className="font-bio-display mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7a6d62] md:text-[11px] md:tracking-[0.34em]">
                Cantautore · autore · compositore
              </p>
              <h1 className="font-bio-display text-[clamp(2.65rem,6.5vw,4.15rem)] font-medium italic leading-[1.02] tracking-[0.02em] text-[#342c26]">
                Biografia
              </h1>
              <div className="mt-4 h-px w-24 bg-[#b8945d]" />
            </header>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.58, ease: sectionEase }}
              className="mb-14 md:mb-16 lg:mb-20"
              aria-label="Scegli come leggere la biografia"
            >
              <p className="font-bio-display mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a7b6e] md:mb-8 md:text-[11px] md:tracking-[0.3em]">
                Due modi di entrare nella storia
              </p>
              <div className="mx-auto grid max-w-[52rem] gap-5 sm:gap-6 md:grid-cols-2 lg:max-w-none lg:gap-8">
                <a
                  href="#contenuto-biografia"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-[#d2c8bb]/90 bg-[linear-gradient(165deg,rgba(255,254,252,0.98)_0%,rgba(248,243,235,0.96)_48%,rgba(241,235,226,0.94)_100%)] p-6 shadow-[0_8px_28px_rgba(38,28,20,0.06)] ring-1 ring-[#b8945d]/[0.12] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#b8945d]/35 hover:shadow-[0_18px_48px_rgba(38,28,20,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8945d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0] sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#b8945d]/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  <div>
                    <h2 className="font-bio-display text-[1.15rem] font-medium italic leading-snug tracking-[0.02em] text-[#342c26] sm:text-[1.22rem]">
                      Versione editoriale
                    </h2>
                    <p className={`${prose} mt-3 text-[0.98rem] leading-[1.78] sm:mt-4 sm:text-[1.02rem] sm:leading-[1.82]`}>
                      Una biografia classica, raffinata e leggibile.
                    </p>
                  </div>
                  <p className="font-bio-display mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7a6d62] transition group-hover:text-[#534a40] sm:mt-8 sm:text-[11px] sm:tracking-[0.28em]">
                    Leggi la Bio
                    <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </p>
                </a>

                <Link
                  to="/bio-experience"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-[#d2c8bb]/90 bg-[linear-gradient(168deg,rgba(255,254,252,0.98)_0%,rgba(248,243,235,0.96)_50%,rgba(237,228,211,0.55)_100%)] p-6 shadow-[0_8px_28px_rgba(38,28,20,0.06)] ring-1 ring-[#b01c24]/[0.1] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#b01c24]/25 hover:shadow-[0_18px_48px_rgba(176,28,36,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b01c24]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0] sm:p-7"
                >
                  <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-[#b01c24]/[0.06] blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  <div>
                    <h2 className="font-bio-display text-[1.15rem] font-medium italic leading-snug tracking-[0.02em] text-[#342c26] sm:text-[1.22rem]">
                      Bio Experience
                    </h2>
                    <p className={`${prose} mt-3 text-[0.98rem] leading-[1.78] sm:mt-4 sm:text-[1.02rem] sm:leading-[1.82]`}>
                      Un racconto cinematografico a scene.
                    </p>
                  </div>
                  <p className="font-bio-display mt-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#7a6d62] transition group-hover:text-[#b01c24] sm:mt-8 sm:text-[11px] sm:tracking-[0.28em]">
                    Vivi la Bio Experience
                    <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </p>
                </Link>
              </div>
            </motion.div>

            <div id="contenuto-biografia" className="scroll-mt-28 md:scroll-mt-36 flex flex-col gap-16 md:gap-[4.25rem] lg:gap-24">
              {/* Scena 1 — Origini: modulo compatto (principale + secondaria, stessa griglia) */}
              <div className={sceneGrid}>
                <BioParagraphs indices={[0, 1]} />
                <NarrativeVisual className={visualStackGap}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                    variants={imageReveal}
                  >
                    <BioPhotoFrame>
                      <div className="p-1.5 sm:p-2">
                        <img
                          src={img174}
                          alt="Emanuele Monetti al pianoforte, anni giovanili"
                          className="aspect-[3/4] w-full rounded-[10px] object-cover object-[50%_38%]"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    </BioPhotoFrame>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={imageReveal}
                    className="self-end"
                  >
                    <BioPhotoFrame className="w-[82%]">
                      <div className="p-1.5 sm:p-2">
                        <img
                          src={img175}
                          alt=""
                          className="aspect-[5/4] w-full rounded-[10px] object-cover object-[50%_18%]"
                          loading="lazy"
                          decoding="async"
                          aria-hidden
                        />
                      </div>
                    </BioPhotoFrame>
                  </motion.div>
                </NarrativeVisual>
              </div>

              {/* Sezione centrale: tre “piani” narrativi — documento sempre in colonna destra accanto al §1980 */}
              <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
                <div className={sceneGrid}>
                  <BioCentral1979 />
                  <NarrativeVisual className={visualStackGap}>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={imageReveal}
                    >
                      <BioPhotoFrame>
                        <div className="flex h-[148px] w-full items-center justify-center bg-[#e8e3dc]/90 p-2">
                          <img
                            src={leleLive}
                            alt="Emanuele Monetti in concerto"
                            className="max-h-full w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </BioPhotoFrame>
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={imageReveal}
                    >
                      <BioPhotoFrame>
                        <div className="p-1.5 sm:p-2">
                          <img
                            src={img262}
                            alt="Dal vivo sul palco"
                            className="h-[192px] w-full rounded-[10px] object-cover object-[52%_48%] sm:h-[200px]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </BioPhotoFrame>
                    </motion.div>
                  </NarrativeVisual>
                </div>

                <div className={sceneGrid}>
                  <BioCentral1980 />
                  <NarrativeVisual>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={imageReveal}
                    >
                      <CarnevaleArchivePreview />
                    </motion.div>
                  </NarrativeVisual>
                </div>

                <div className={sceneGrid}>
                  <BioCentralRest />
                  <NarrativeVisual className={visualStackGap}>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={imageReveal}
                    >
                      <BioPhotoFrame>
                        <div className="p-1.5 sm:p-2">
                          <img
                            src={img176}
                            alt="Al pianoforte"
                            className="h-[200px] w-full rounded-[10px] object-cover object-[48%_32%] sm:h-[208px]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </BioPhotoFrame>
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={imageReveal}
                    >
                      <BioPhotoFrame>
                        <div className="p-1.5 sm:p-2">
                          <img
                            src={img263}
                            alt=""
                            className="h-[176px] w-full rounded-[10px] object-cover object-[48%_38%] sm:h-[184px]"
                            loading="lazy"
                            decoding="async"
                            aria-hidden
                          />
                        </div>
                      </BioPhotoFrame>
                    </motion.div>
                  </NarrativeVisual>
                </div>
              </div>

              {/* Scena CD — capitolo finale, niente card “prodotto” */}
              <div className={sceneGrid}>
                <BioParagraphs indices={[8]} />
                <NarrativeVisual className="flex flex-col items-center gap-5 pt-2 lg:items-end lg:pt-4">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={imageReveal}
                    className="flex w-full flex-col items-center lg:items-end"
                  >
                    <div className="w-full max-w-[248px] px-2 py-6 sm:max-w-[260px] sm:py-8">
                      <img
                        src={tuttoCd}
                        alt="Album …Tutto è già diverso"
                        className="w-full rounded-[6px] object-contain drop-shadow-[0_14px_32px_rgba(24,18,12,0.14)] transition-[filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:drop-shadow-[0_18px_40px_rgba(24,18,12,0.18)]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="h-px w-12 bg-[#c4a574]/55" aria-hidden />
                    <p className="font-bio-display mt-4 max-w-[16rem] text-center text-[10px] font-medium uppercase leading-relaxed tracking-[0.28em] text-[#7d6f62] sm:text-[11px] sm:tracking-[0.3em] lg:text-right">
                      …Tutto è già diverso
                    </p>
                  </motion.div>
                </NarrativeVisual>
              </div>

              <div className="max-w-[38rem] space-y-7 md:space-y-8">
                <BioParagraphs indices={[9, 10]} />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
