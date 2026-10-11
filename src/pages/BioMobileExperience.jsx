import { motion } from "framer-motion";
import CarnevaleArchivePreview from "../components/CarnevaleArchivePreview";
import { BIO_PARAGRAPHS } from "../data/bioNarrative";
import { t } from "../i18n";

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

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeCinema },
  },
};

/** Scena visiva — solo immagine, senza testo collegato */
function BioMobileVisualScene({
  id,
  image,
  alt,
  objectPosition = "center center",
  fit = "cover",
  sceneClass = "",
  eager = false,
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeUp}
      className={["bio-mobile-visual-scene", sceneClass].filter(Boolean).join(" ")}
      aria-label={alt || undefined}
    >
      <div className="bio-mobile-visual-media">
        <img
          src={image}
          alt={alt}
          className={`bio-mobile-image ${fit === "contain" ? "bio-mobile-image--contain" : ""}`}
          style={{ objectPosition }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </motion.section>
  );
}

/** Scena testuale — paragrafi lunghi, nessuna immagine coperta */
function BioMobileTextScene({
  id,
  paragraphs,
  dark = false,
  sceneClass = "",
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className={[
        "bio-mobile-text-scene",
        dark ? "bio-mobile-text-scene--dark" : "",
        sceneClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="bio-mobile-panel">
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className={[
              "dikdik-prose bio-mobile-copy antialiased text-justify",
              i < paragraphs.length - 1 ? "mb-5" : "",
            ].join(" ")}
          >
            {text}
          </p>
        ))}
      </div>
    </motion.section>
  );
}

/** Scena documento — cornice protagonista, senza testo lungo */
function BioMobileDocumentVisualScene({
  id,
  children,
  kicker,
  sceneClass = "",
  darkBg = true,
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeUp}
      className={[
        "bio-mobile-document-scene",
        darkBg ? "bio-mobile-document-scene--dark" : "",
        sceneClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {kicker && <p className="bio-mobile-document-scene__kicker">{kicker}</p>}
      <div className="bio-mobile-document-frame">{children}</div>
    </motion.section>
  );
}

export default function BioMobileExperience() {
  return (
    <main className="bio-mobile-experience md:hidden" aria-label={t("Biografia — diario visivo mobile", "Biography — mobile visual diary")}>
      {/* Capitolo I — Origini */}
      <BioMobileVisualScene
        id="bio-m-visual-1"
        sceneClass="bio-mobile-visual-scene--intro"
        image={img263}
        alt={t("Emanuele Monetti, anni delle prime canzoni", "Emanuele Monetti, the years of his first songs")}
        objectPosition="28% 100%"
        eager
      />
      <BioMobileTextScene
        id="bio-m-text-1"
        paragraphs={[BIO_PARAGRAPHS[0], BIO_PARAGRAPHS[1]]}
      />

      {/* Capitolo II — RCA / Centocittà */}
      <BioMobileVisualScene
        id="bio-m-visual-2"
        sceneClass="bio-mobile-visual-scene--piano"
        image={img174}
        alt={t("Emanuele Monetti al pianoforte", "Emanuele Monetti at the piano")}
        objectPosition="50% 22%"
      />
      <BioMobileTextScene id="bio-m-text-2" paragraphs={[BIO_PARAGRAPHS[2]]} />

      {/* Capitolo III — Venezia / Archivio RAI (ordine mobile: testo → immagine → documento) */}
      <div className="bio-mobile-venice-chapter flex flex-col">
        <BioMobileTextScene
          id="bio-m-text-3"
          paragraphs={[BIO_PARAGRAPHS[3]]}
          dark
          sceneClass="bio-mobile-venice-chapter__text order-1"
        />
        <BioMobileVisualScene
          id="bio-m-visual-3"
          sceneClass="bio-mobile-visual-scene--venice bio-mobile-venice-chapter__visual order-2"
          image={venezia}
          alt={t("Maschera veneziana e gondole al Bacino di San Marco", "Venetian mask and gondolas at the St Mark's Basin")}
          objectPosition="58% 52%"
        />
        <BioMobileDocumentVisualScene
          id="bio-m-doc-3"
          kicker={t("Archivio RAI", "RAI Archive")}
          sceneClass="bio-mobile-document-scene--pdf bio-mobile-venice-chapter__doc order-3"
        >
          <CarnevaleArchivePreview variant="cinematic" />
        </BioMobileDocumentVisualScene>
      </div>

      {/* Capitolo IV — Castrocaro (ordine mobile: testo → immagine live) */}
      <div className="bio-mobile-castrocaro-chapter flex flex-col">
        <BioMobileTextScene
          id="bio-m-text-4"
          paragraphs={[BIO_PARAGRAPHS[4]]}
          sceneClass="bio-mobile-castrocaro-chapter__text order-1"
        />
        <BioMobileVisualScene
          id="bio-m-visual-4"
          sceneClass="bio-mobile-castrocaro-chapter__visual order-2"
          image={leleLive}
          alt={t("Emanuele Monetti in concerto", "Emanuele Monetti in concert")}
          objectPosition="50% 42%"
        />
      </div>

      {/* Capitolo V — Sony */}
      <BioMobileVisualScene
        id="bio-m-visual-5"
        sceneClass="bio-mobile-visual-scene--studio"
        image={img262}
        alt={t("Emanuele Monetti in studio", "Emanuele Monetti in the studio")}
        objectPosition="50% 38%"
      />
      <BioMobileTextScene id="bio-m-text-5" paragraphs={[BIO_PARAGRAPHS[5]]} dark />

      {/* Capitolo VI — Dik Dik (ordine mobile: foto studio → testo 1997 → abbraccio) */}
      <div className="bio-mobile-dikdik-chapter flex flex-col">
        <BioMobileVisualScene
          id="bio-m-visual-6"
          sceneClass="bio-mobile-visual-scene--dikdik bio-mobile-dikdik-chapter__visual order-1"
          image={img176}
          alt={t("Emanuele Monetti al pianoforte", "Emanuele Monetti at the piano")}
          objectPosition="48% 36%"
        />
        <BioMobileTextScene
          id="bio-m-text-6"
          paragraphs={[BIO_PARAGRAPHS[6]]}
          sceneClass="bio-mobile-dikdik-chapter__text order-2"
        />
        <BioMobileDocumentVisualScene
          id="bio-m-doc-6"
          kicker={t("In studio con i Dik Dik", "In the studio with the Dik Dik")}
          sceneClass="bio-mobile-dikdik-chapter__doc order-3"
          darkBg
        >
          <img
            src={dikDikPhoto}
            alt={t("Emanuele Monetti con i Dik Dik", "Emanuele Monetti with the Dik Dik")}
            className="bio-mobile-document-frame__photo"
            loading="lazy"
            decoding="async"
          />
        </BioMobileDocumentVisualScene>
      </div>

      {/* Capitolo VII — Irene */}
      <BioMobileVisualScene
        id="bio-m-visual-7"
        image={img262}
        alt={t("Emanuele Monetti dal vivo", "Emanuele Monetti live")}
        objectPosition="44% 40%"
      />
      <BioMobileTextScene id="bio-m-text-7" paragraphs={[BIO_PARAGRAPHS[7]]} dark />

      {/* Capitolo VIII — Album */}
      <BioMobileDocumentVisualScene
        id="bio-m-doc-8"
        sceneClass="bio-mobile-document-scene--album"
        darkBg
      >
        <img
          src={tuttoCd}
          alt={t("Album …Tutto è già diverso", "Album …Tutto è già diverso")}
          className="bio-mobile-document-frame__photo"
          loading="lazy"
          decoding="async"
        />
      </BioMobileDocumentVisualScene>
      <BioMobileTextScene
        id="bio-m-text-8"
        paragraphs={[BIO_PARAGRAPHS[8]]}
        sceneClass="bio-mobile-text-scene--after-album"
      />

      {/* Capitolo IX — ESSE */}
      <BioMobileVisualScene
        id="bio-m-visual-9"
        sceneClass="bio-mobile-visual-scene--esse"
        image={esseArt}
        alt={t("ESSE — opera strumentale", "ESSE — instrumental work")}
        objectPosition="50% 46%"
        fit="contain"
      />
      <BioMobileTextScene id="bio-m-text-9" paragraphs={[BIO_PARAGRAPHS[9]]} dark />

      {/* Capitolo X — Singoli */}
      <BioMobileVisualScene
        id="bio-m-visual-10"
        sceneClass="bio-mobile-visual-scene--copertine"
        image={copertineImg}
        alt={t("Copertine dei singoli recenti", "Covers of the recent singles")}
        objectPosition="50% 40%"
      />
      <BioMobileTextScene id="bio-m-text-10" paragraphs={[BIO_PARAGRAPHS[10]]} />
    </main>
  );
}
