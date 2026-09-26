import "./DikDikPage.css";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import dikdikFront from "../assets/press/V05.jpg";
import dikdikcd1 from "../assets/press/V07.jpg";
import dikdikArticle from "../assets/press/dikdik-article-full.jpg";
import dikdikConference from "../assets/press/conf.jpg";

const ELENCO_BRANI_LATO_A = [
  {
    titolo: "PAROLE D'AMORE",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (seconda voce), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "L'ULTIMO BATTITO DEL CUORE",
    autori: "Emanuele Monetti",
    musicisti: "Maurizio Solieri (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "LA FRENESIA",
    autori: "Emanuele Monetti",
    musicisti:
      "Maurizio Solieri (seconda voce), Maurizio Solieri (solo guitar)",
  },
  {
    titolo: "IL TEMPORALE",
    autori: "Emanuele Monetti",
    musicisti:
      "Ricky Gianco (seconda voce), Pietruccio Montalbetti (armonica), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "LA SPESA",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Ricky Gianco (coro), David Pieralisi (solo guitar), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "COME IL VENTO",
    autori: "Emanuele Monetti",
    musicisti:
      "Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "SI RIPETERÀ",
    autori: "Emanuele Monetti",
    musicisti:
      "Dario Baldan Bembo (organo Hammond), Riccardo Eterno (coro), Marco Ferradini (coro)",
  },
  {
    titolo: "COME FOSSE UNA CANZONE",
    autori: "Emanuele Monetti",
    musicisti:
      "Dario Baldan Bembo (organo Hammond), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (chitarra solista)",
  },
  {
    titolo: "NEGLI OCCHI MIEI",
    autori: "Emanuele Monetti",
    musicisti:
      "Riccardo Eterno (coro), Marco Ferradini (coro), Gae Manfredini (solo guitar), Pietruccio Montalbetti (armonica), Joe Vescovi (organo Hammond)",
  },
  {
    titolo: "I RAGAZZI DELLA VIA STENDHAL",
    autori:
      "Piercarlo D'Amato, Gioachino Lanotte, Emanuele Monetti, Pietruccio Montalbetti",
    musicisti:
      "Donato Begotti (solo guitar), Emanuela Cortesi (coro), Riccardo Eterno (coro), Marco Ferradini (coro), Pietruccio Montalbetti (armonica), Mario Neri (organo Hammond)",
  },
];

const motionEase = [0.22, 1, 0.36, 1];

function ScrollReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.68, delay, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}

/** Fotografia stile booklet / press kit: niente mat bianco, solo raggio + ombra */
function PressPhoto({
  src,
  alt,
  caption,
  variant = "fluid",
  loading = "lazy",
  className = "",
}) {
  return (
    <figure className={`dikdik-press-photo dikdik-press-photo--${variant} ${className}`.trim()}>
      <div className="dikdik-press-photo__imgwrap">
        <img src={src} alt={alt} loading={loading} decoding="async" />
      </div>
      {caption ? <figcaption className="dikdik-press-photo__cap">{caption}</figcaption> : null}
    </figure>
  );
}

export default function DikDikPage() {
  return (
    <main className="dikdik-page font-open-sans-sc">
      <div className="dikdik-page__grain" aria-hidden />

      <header className="dikdik-hero">
        <motion.div
          className="dikdik-hero__media"
          initial={{ scale: 1.035 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.25, ease: motionEase }}
        >
          <img
            src={dikdikConference}
            alt="Conferenza stampa dei Dik Dik a Milano, settembre 1997"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
        <div className="dikdik-hero__overlay" aria-hidden />
        <div className="dikdik-hero__sepia" aria-hidden />

        <div className="dikdik-container dikdik-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, ease: motionEase }}
          >
            <p className="dikdik-hero__kicker">Collaborazione</p>
            <h1 className="dikdik-hero__title font-serif">DIK DIK</h1>
            <p className="dikdik-hero__lede">
              Nel 1997 la storica band italiana <strong> DIK DIK </strong> decide di uscire dopo quasi 20 anni con un album di canzoni
              inedite.
            </p>
          </motion.div>
          <div className="dikdik-hero__actions">
            <Link to="/#timeline" className="dikdik-hero__back">
              <span aria-hidden>←</span>
              Torna al Diario di Bordo
            </Link>
          </div>
        </div>
      </header>

      {/* Racconto: composizione unica anno-atmosfera + colonna editoriale + testo (griglia 45/55) */}
      <section className="dikdik-section dikdik-section--narrative dikdik-section--narrow-top">
        <div className="dikdik-container">
          <p className="sr-only">
            Anno 1997 · Isole in viaggio · collaborazione tra i Dik Dik e Emanuele Monetti.
          </p>
          <ScrollReveal className="dikdik-narrative">
            <div className="dikdik-narrative__atmos" aria-hidden>
              <span className="dikdik-year-num dikdik-year-num--atmos">1997</span>
            </div>

            <aside className="dikdik-narrative__meta">
              <p className="dikdik-micro-label">Isole in viaggio</p>
              <blockquote className="dikdik-narrative__pull">
                <p>Quasi vent&apos;anni dopo, un disco di brani inediti · produzione Ricky Gianco.</p>
              </blockquote>
              <div className="dikdik-narrative__ornament" aria-hidden />
            </aside>

            <div className="dikdik-narrative__body">
              <p className="dikdik-kicker dikdik-kicker--inset">Collaborazione</p>
              <h2 className="dikdik-prose-intro dikdik-prose-intro--lead font-serif">Dik Dik</h2>
              <hr className="dikdik-rule dikdik-rule--inset" />
              <div className="dikdik-prose dikdik-prose--balanced dikdik-prose--narrative">
                <p>
                  Nel 1997 la storica band italiana <strong>Dik Dik</strong> decide di uscire dopo quasi 20 anni con un album di canzoni
                  inedite. Per l&apos;occasione scelgono come autore <strong>Emanuele Monetti</strong>.
                </p>
                <p>
                  Monetti firmerà tutti i brani dell&apos;intero album <em className="dikdik-prose-album">Isole in viaggio</em>, prodotto da
                  Ricky Gianco. Il progetto è molto ambizioso e vede la collaborazione di musicisti come Dario Baldan Bembo, Maurizio
                  Solieri e Marco Ferradini, per citarne alcuni.
                </p>
                <p>
                  La promozione dell&apos;album non sarà all&apos;altezza e per questo motivo resterà lontano da&nbsp;&nbsp;programmazioni
                  radiotelevisive.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Immagine + citazione: solo sfondo, overlay, testo nel container 1120 */}
      <section className="dikdik-quote-strip" aria-labelledby="dikdik-quote-heading">
        <div className="dikdik-quote-strip__media" aria-hidden>
          <img src={dikdikFront} alt="" className="dikdik-quote-strip__photo" />
        </div>
        <div className="dikdik-quote-strip__shade" aria-hidden />
        <div className="dikdik-container dikdik-quote-strip__inner">
          <h2 id="dikdik-quote-heading" className="sr-only">
            Nota sulla ricezione del disco
          </h2>
          <blockquote className="dikdik-quote-strip__text font-serif">
            Resta comunque, ancora oggi, uno dei lavori più apprezzati dagli operatori del settore, dello storico gruppo.
          </blockquote>
        </div>
      </section>

      {/* Immagini: conferenza a tutta fascia, sotto copertina + retro */}
      <section className="dikdik-section dikdik-section--press" aria-labelledby="dikdik-press-heading">
        <div className="dikdik-container">
          <ScrollReveal delay={0.04}>
            <header className="dikdik-press-head">
              <h2 id="dikdik-press-heading" className="dikdik-press-title">
                Immagini e memoria
              </h2>
              <p className="dikdik-press-sub">Fotografie, copertine e documenti legati a Isole in viaggio.</p>
            </header>

            <p className="dikdik-press-leadin">
              Una raccolta di materiali visivi legati all&apos;album e alla conferenza stampa del 1997.
            </p>

            <div className="dikdik-press-stack">
              <PressPhoto
                variant="wide"
                src={dikdikConference}
                alt="Conferenza stampa dei Dik Dik a Milano, settembre 1997"
                caption={
                  <>
                    Conferenza stampa, Milano · 1997.
                    <span className="dikdik-cap-break" />
                    <span className="dikdik-cap-label">Da Sinistra:</span> Ricky Gianco, PEPE (DikDik), Piercarlo D&apos;Amato, Emanuele
                    Monetti, LALLO (DikDik), PIETRUCCIO (DikDik).
                  </>
                }
              />
              <div className="dikdik-press-pair">
                <PressPhoto
                  variant="square"
                  src={dikdikFront}
                  alt="Dik Dik - Isole in viaggio - copertina"
                  caption="Copertina · Isole in viaggio"
                />
                <PressPhoto
                  variant="square"
                  src={dikdikcd1}
                  alt="Dik Dik - Isole in viaggio - retro copertina"
                  caption="Retro copertina · Isole in viaggio"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="dikdik-section">
        <div className="dikdik-container">
          <ScrollReveal delay={0.03}>
            <div className="dikdik-section-head">
              <div>
                <h2 className="dikdik-section-title">Elenco brani</h2>
                <hr className="dikdik-rule-wide" />
              </div>
              <span className="dikdik-year-accent font-serif">1997</span>
            </div>
            <ol className="dikdik-tracks-grid">
              {ELENCO_BRANI_LATO_A.map((row, index) => (
                <motion.li
                  key={row.titolo}
                  className="track-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.52, delay: index * 0.015, ease: motionEase }}
                >
                  <div className="track-card__meta">
                    <span className="track-card__num">{index + 1}</span>
                    <h3 className="track-card__title font-serif">{row.titolo}</h3>
                  </div>
                  <div className="track-card__row">
                    <p className="track-card__label">Autori</p>
                    <p className="track-card__text">{row.autori}</p>
                  </div>
                  <div className="track-card__row">
                    <p className="track-card__label track-card__label--muted">Musicisti</p>
                    <p className="track-card__text">{row.musicisti}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="dikdik-section dikdik-section--article">
        <div className="dikdik-container">
          <ScrollReveal delay={0.05}>
            <article className="dikdik-article-shell">
              <header className="dikdik-article-shell__header">
                <p className="dikdik-article-shell__label">Dal CORRIERE DELLA SERA</p>
                <h2 className="dikdik-article-shell__title font-serif">Articolo di Mario Luzzatto Fegiz</h2>
                <p className="dikdik-article-shell__dek">
                  Articolo di giornale dedicato ai Dik Dik e alla collaborazione con Emanuele Monetti.
                </p>
                <div className="dikdik-article-shell__rule" aria-hidden />
              </header>
              <PressPhoto
                variant="document"
                src={dikdikArticle}
                alt="Articolo di giornale dedicato ai Dik Dik e alla collaborazione con Emanuele Monetti"
                caption="Articolo di giornale dedicato ai Dik Dik e alla collaborazione con Emanuele Monetti"
                className="dikdik-article-shell__visual"
              />
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="dikdik-section dikdik-section--closing">
        <img className="dikdik-closing__bg-img" src={dikdikFront} alt="" aria-hidden />
        <div className="dikdik-container dikdik-closing__inner">
          <ScrollReveal delay={0.04} className="dikdik-closing__single">
            <p className="dikdik-closing-line font-serif">
              Dik Dik · <em>Isole in viaggio</em> · 1997
            </p>
            <p className="dikdik-closing-sub">Collaborazione con Emanuele Monetti · autore dell&apos;album</p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
