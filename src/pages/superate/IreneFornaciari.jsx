import "./DikDikPage.css";
import "./IreneFornaciari.css";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ireneCover from "../assets/press/V01.jpg";
import ireneRetro from "../assets/press/V02.jpg";
import ireneDetail from "../assets/press/V03.jpg";

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

function PressPhoto({ src, alt, caption, variant = "fluid", loading = "lazy", className = "" }) {
  return (
    <figure className={`dikdik-press-photo dikdik-press-photo--${variant} ${className}`.trim()}>
      <div className="dikdik-press-photo__imgwrap">
        <img src={src} alt={alt} loading={loading} decoding="async" />
      </div>
      {caption ? <figcaption className="dikdik-press-photo__cap">{caption}</figcaption> : null}
    </figure>
  );
}

export default function IreneFornaciari() {
  return (
    <main className="dikdik-page dikdik-page--irene font-open-sans-sc">
      <div className="dikdik-page__grain" aria-hidden />

      <header className="dikdik-hero">
        <motion.div
          className="dikdik-hero__media"
          initial={{ scale: 1.035 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.25, ease: motionEase }}
        >
          <img
            src={ireneCover}
            alt="Vintage Baby — arte di copertina"
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
            <h1 className="dikdik-hero__title font-serif">Irene Fornaciari</h1>
            <p className="dikdik-hero__lede">
              Nel 2009 collabora con <strong>Irene Fornaciari</strong> all&apos;album <strong>VINTAGE BABY</strong>.
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

      <section className="dikdik-section dikdik-section--narrative dikdik-section--narrow-top">
        <div className="dikdik-container">
          <p className="sr-only">
            Anno 2009 · Vintage Baby · collaborazione tra Irene Fornaciari ed Emanuele Monetti.
          </p>
          <ScrollReveal className="dikdik-narrative dikdik-narrative--irene">
            <div className="dikdik-narrative__atmos" aria-hidden>
              <span className="dikdik-year-num dikdik-year-num--atmos dikdik-year-num--irene-atmos">2009</span>
            </div>

            <aside className="dikdik-narrative__meta">
              <p className="dikdik-micro-label">Vintage Baby</p>
              <blockquote className="dikdik-narrative__pull">
                <p>Album del 2009 · LA TIRITERA DELLA SERA · testo italiano condiviso.</p>
              </blockquote>
              <div className="dikdik-narrative__ornament" aria-hidden />
            </aside>

            <div className="dikdik-narrative__body">
              <p className="dikdik-kicker dikdik-kicker--inset">Collaborazione</p>
              <h2 id="irene-narrative-title" className="dikdik-prose-intro dikdik-prose-intro--lead font-serif">
                Irene Fornaciari
              </h2>
              <hr className="dikdik-rule dikdik-rule--inset dikdik-rule--irene" />
              <div className="dikdik-prose dikdik-prose--balanced dikdik-prose--narrative">
                <p>
                  Nel 2009 <strong>Emanuele Monetti</strong> ha collaborato con <strong>Irene Fornaciari</strong> all&apos;album{" "}
                  <strong>VINTAGE BABY</strong>, firmando assieme ad Irene il testo originale italiano del brano{" "}
                  <strong>LA TIRITERA DELLA SERA</strong>{" "}
                  <span className="irene-intro-italic">(cover di Ride My See-Saw)</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="dikdik-quote-strip" aria-labelledby="irene-quote-heading">
        <div className="dikdik-quote-strip__media" aria-hidden>
          <img src={ireneCover} alt="" className="dikdik-quote-strip__photo" />
        </div>
        <div className="dikdik-quote-strip__shade" aria-hidden />
        <div className="dikdik-container dikdik-quote-strip__inner">
          <h2 id="irene-quote-heading" className="sr-only">
            Nota sul brano LA TIRITERA DELLA SERA
          </h2>
          <blockquote className="dikdik-quote-strip__text font-serif">
            I testi originali italiani di <strong>LA TIRITERA DELLA SERA</strong> sono firmati da Emanuele Monetti e Irene
            Fornaciari.
          </blockquote>
        </div>
      </section>

      <section className="dikdik-section dikdik-section--press" aria-labelledby="irene-press-heading">
        <div className="dikdik-container">
          <ScrollReveal delay={0.04}>
            <header className="dikdik-press-head">
              <h2 id="irene-press-heading" className="dikdik-press-title">
                Il progetto in immagini
              </h2>
              <p className="dikdik-press-sub">Copertine e materiali visivi dall&apos;album Vintage Baby.</p>
            </header>

            <div className="dikdik-press-stack">
              <PressPhoto variant="wide" src={ireneCover} alt="Vintage Baby · copertina album" caption="Vintage Baby · copertina" />
              <div className="dikdik-press-pair">
                <PressPhoto variant="square" src={ireneRetro} alt="Vintage Baby · retro copertina" caption="Retro copertina" />
                <PressPhoto variant="square" src={ireneDetail} alt="Vintage Baby · dettaglio album" caption="Dettaglio album" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="dikdik-section dikdik-section--closing">
        <img className="dikdik-closing__bg-img" src={ireneCover} alt="" aria-hidden />
        <div className="dikdik-container dikdik-closing__inner">
          <ScrollReveal delay={0.04} className="dikdik-closing__single">
            <p className="dikdik-closing-line font-serif">
              Irene Fornaciari · <em>Vintage Baby</em> · 2009
            </p>
            <p className="dikdik-closing-sub">Collaborazione con Emanuele Monetti</p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
