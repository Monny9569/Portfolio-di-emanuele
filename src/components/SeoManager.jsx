import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://emanuelemonetti.com";
const SITE_NAME = "Emanuele Monetti";
const DEFAULT_IMAGE = `${SITE}/og-image.jpg`;

const PAGES = {
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

const NOT_FOUND = {
  title: `Pagina non trovata — ${SITE_NAME}`,
  description: "La pagina richiesta non esiste.",
  noindex: true,
};

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    const match = selector.match(/\[([\w:-]+)="([^"]+)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Aggiorna title, description, canonical e Open Graph a ogni cambio di route. */
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const known = PAGES[path];
    const base = PAGES[known?.canonical ?? path] ?? null;
    const page = base ?? NOT_FOUND;
    const canonicalPath = known?.canonical ?? path;
    const url = `${SITE}${canonicalPath === "/" ? "/" : canonicalPath}`;

    document.title = page.title;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", DEFAULT_IMAGE);
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    setMeta('meta[name="robots"]', "content", page.noindex ? "noindex" : "index,follow");
  }, [pathname]);

  return null;
}
