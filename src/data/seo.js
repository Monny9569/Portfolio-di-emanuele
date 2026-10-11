// Metadati SEO per route: condivisi tra il client (SeoManager) e la Function di Pages.
import { t } from "../i18n";

export const SITE = "https://emanuelemonetti.com";
export const SITE_NAME = "Emanuele Monetti";
export const DEFAULT_IMAGE = `${SITE}/og-image.jpg`;

export const PAGES = {
  "/": {
    title: t(
      "Emanuele Monetti — Cantautore e musicista",
      "Emanuele Monetti — Singer-songwriter and musician",
    ),
    description: t(
      "Sito ufficiale di Emanuele Monetti: cantautore e musicista. Biografia, discografia, uscite, collaborazioni e contatti.",
      "Official website of Emanuele Monetti: singer-songwriter and musician. Biography, discography, releases, collaborations and contacts.",
    ),
  },
  "/bio": {
    title: t("Biografia — Emanuele Monetti", "Biography — Emanuele Monetti"),
    description: t(
      "La storia di Emanuele Monetti: dalle prime canzoni a Castrocaro, dal Carnevale di Venezia ai Dik Dik, fino ai dischi più recenti.",
      "The story of Emanuele Monetti: from his first songs at Castrocaro, from the Venice Carnival to the Dik Dik, up to his most recent records.",
    ),
  },
  "/bio-experience": { canonical: "/bio" },
  "/tuttoegiadiverso": {
    title: t(
      "Tutto già diverso — Emanuele Monetti",
      "Tutto già diverso — Emanuele Monetti",
    ),
    description: t(
      "Tutto già diverso, l'album di Emanuele Monetti: copertine, crediti, tracce e ascolto.",
      "Tutto già diverso, the album by Emanuele Monetti: artwork, credits, tracks and listening.",
    ),
  },
  "/esse": {
    title: t("ESSE — Emanuele Monetti", "ESSE — Emanuele Monetti"),
    description: t(
      "ESSE: il progetto discografico di Emanuele Monetti, tra musica, immagini e parole.",
      "ESSE: the record project by Emanuele Monetti, between music, images and words.",
    ),
  },
  "/dik-dik": {
    title: t("Dik Dik — Emanuele Monetti", "Dik Dik — Emanuele Monetti"),
    description: t(
      "La collaborazione di Emanuele Monetti con i Dik Dik: articoli, fotografie e racconti.",
      "Emanuele Monetti's collaboration with the Dik Dik: articles, photographs and stories.",
    ),
  },
  "/irene-fornaciari": {
    title: t(
      "Irene Fornaciari — Emanuele Monetti",
      "Irene Fornaciari — Emanuele Monetti",
    ),
    description: t(
      "La collaborazione di Emanuele Monetti con Irene Fornaciari.",
      "Emanuele Monetti's collaboration with Irene Fornaciari.",
    ),
  },
  "/contatti": {
    title: t("Contatti — Emanuele Monetti", "Contact — Emanuele Monetti"),
    description: t(
      "Scrivi a Emanuele Monetti per collaborazioni, richieste stampa e informazioni.",
      "Write to Emanuele Monetti for collaborations, press requests and information.",
    ),
  },
  "/privacy": {
    title: t("Privacy — Emanuele Monetti", "Privacy — Emanuele Monetti"),
    description: t(
      "Informativa sulla privacy del sito di Emanuele Monetti.",
      "Privacy policy of Emanuele Monetti's website.",
    ),
  },
  "/cookie": {
    title: t("Cookie — Emanuele Monetti", "Cookies — Emanuele Monetti"),
    description: t(
      "Informativa e preferenze sui cookie del sito di Emanuele Monetti.",
      "Cookie policy and preferences for Emanuele Monetti's website.",
    ),
  },
};

export const NOT_FOUND = {
  title: t(
    `Pagina non trovata — ${SITE_NAME}`,
    `Page not found — ${SITE_NAME}`,
  ),
  description: t("La pagina richiesta non esiste.", "The requested page does not exist."),
  noindex: true,
};
