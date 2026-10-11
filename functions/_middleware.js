/* global HTMLRewriter */
/**
 * Cloudflare Pages middleware — solo SEO/HTTP, nessun effetto sulla grafica.
 *
 * - inietta title/description/canonical/Open Graph per route nell'HTML iniziale,
 *   cosi' le anteprime social (che non eseguono JavaScript) mostrano la pagina giusta
 * - risponde con status 404 reale alle URL inesistenti (il client mostra la stessa
 *   pagina "non trovata" di prima)
 */
import { SITE, DEFAULT_IMAGE, PAGES, NOT_FOUND } from "../src/data/seo.js";

function resolvePage(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const entry = PAGES[path];
  if (!entry) return { page: NOT_FOUND, canonicalPath: path, status: 404 };
  const canonicalPath = entry.canonical ?? path;
  return { page: PAGES[canonicalPath], canonicalPath, status: 200 };
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const isPageRequest =
    (request.method === "GET" || request.method === "HEAD") &&
    !url.pathname.startsWith("/api/") &&
    !/\.[a-z0-9]+$/i.test(url.pathname);

  if (!isPageRequest) return next();

  const response = await next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const { page, canonicalPath, status } = resolvePage(url.pathname);
  const pageUrl = `${SITE}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const set = (name, value) => ({
    element(el) {
      el.setAttribute(name, value);
    },
  });

  let rewriter = new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(page.title);
      },
    })
    .on('meta[name="description"]', set("content", page.description))
    .on('link[rel="canonical"]', set("href", pageUrl))
    .on('meta[property="og:title"]', set("content", page.title))
    .on('meta[property="og:description"]', set("content", page.description))
    .on('meta[property="og:url"]', set("content", pageUrl))
    .on('meta[property="og:image"]', set("content", DEFAULT_IMAGE))
    .on('meta[name="twitter:title"]', set("content", page.title))
    .on('meta[name="twitter:description"]', set("content", page.description));

  if (page.noindex) {
    rewriter = rewriter.on("head", {
      element(el) {
        el.append('<meta name="robots" content="noindex" />', { html: true });
      },
    });
  }

  const rewritten = rewriter.transform(response);
  return new Response(rewritten.body, {
    status,
    headers: rewritten.headers,
  });
}
