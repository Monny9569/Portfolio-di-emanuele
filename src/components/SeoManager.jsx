import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SITE, DEFAULT_IMAGE, PAGES, NOT_FOUND } from "../data/seo";

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
