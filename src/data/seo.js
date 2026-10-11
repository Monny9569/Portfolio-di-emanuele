// Metadati SEO per route: condivisi tra il client (SeoManager) e la Function di Pages.
export const SITE = "https://emanuelemonetti.com";
export const SITE_NAME = "Emanuele Monetti";
export const DEFAULT_IMAGE = `${SITE}/og-image.jpg`;

export const PAGES = {
  "/": {
    title: "Emanuele Monetti — Cantautore e musicista",
    description:
      "Sito ufficiale di Emanuele Monetti: cantautore e musicista. Biografia, discografia, uscite, collaborazioni e contatti.",
  },
  "/bio": {
    title: "Biografia — Emanuele Monetti",
    description:
      "La storia di Emanuele Monetti: dalle prime canzoni a Castrocaro, dal Carnevale di Venezia ai Dik Dik, fino ai dischi più recenti.",
  },
  "/bio-experience": { canonical: "/bio" },
  "/tuttoegiadiverso": {
    title: "Tutto già diverso — Emanuele Monetti",
    description:
      "Tutto già diverso, l'album di Emanuele Monetti: copertine, crediti, tracce e ascolto.",
  },
  "/esse": {
    title: "ESSE — Emanuele Monetti",
    description:
      "ESSE: il progetto discografico di Emanuele Monetti, tra musica, immagini e parole.",
  },
  "/dik-dik": {
    title: "Dik Dik — Emanuele Monetti",
    description:
      "La collaborazione di Emanuele Monetti con i Dik Dik: articoli, fotografie e racconti.",
  },
  "/irene-fornaciari": {
    title: "Irene Fornaciari — Emanuele Monetti",
    description: "La collaborazione di Emanuele Monetti con Irene Fornaciari.",
  },
  "/contatti": {
    title: "Contatti — Emanuele Monetti",
    description:
      "Scrivi a Emanuele Monetti per collaborazioni, concerti, richieste stampa e informazioni.",
  },
  "/privacy": {
    title: "Privacy — Emanuele Monetti",
    description: "Informativa sulla privacy del sito di Emanuele Monetti.",
  },
  "/cookie": {
    title: "Cookie — Emanuele Monetti",
    description: "Informativa e preferenze sui cookie del sito di Emanuele Monetti.",
  },
};

export const NOT_FOUND = {
  title: `Pagina non trovata — ${SITE_NAME}`,
  description: "La pagina richiesta non esiste.",
  noindex: true,
};
