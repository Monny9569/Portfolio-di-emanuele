import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PDF_URL = "/bio/un-carnevale-per-venezia-1980.pdf";

/** Allineato ai moduli foto della Bio: stesso bordo/raggio/ombra, senza rotazione. */
const archiveFramePaper =
  "overflow-hidden rounded-[14px] border border-[#d2c8bb]/85 bg-[#f1ebe2]/55 shadow-[0_6px_18px_rgba(38,28,20,0.075)]";

/** Variante "cinematic": nessun pannello beige, niente bordo netto, integra il PDF
 *   come reperto sospeso nell'atmosfera della scena (es. Bio Experience – Venezia). */
const archiveFrameCinematic = "overflow-hidden rounded-[3px]";

const sectionEase = [0.22, 1, 0.36, 1];
const lightboxEase = [0.22, 0.06, 0.2, 1];

async function loadPdfjs() {
  const [pdfjsLib, workerMod] = await Promise.all([
    import("pdfjs-dist"),
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default;
  return pdfjsLib;
}

/**
 * Disegna una pagina PDF su canvas con larghezza massima in CSS px (altezza proporzionale).
 */
async function renderPdfPageToCanvas(pdf, pageNumber, canvas, maxWidthCssPx) {
  if (!canvas) return;
  const page = await pdf.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  const scale = maxWidthCssPx / base.width;
  const viewport = page.getViewport({ scale });

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
  canvas.width = Math.floor(viewport.width * dpr);
  canvas.height = Math.floor(viewport.height * dpr);
  canvas.style.width = `${Math.round(viewport.width)}px`;
  /* Niente style.height inline: lascio decidere a CSS (h-auto) così se max-w-full
     clampa la larghezza su schermi stretti, l'altezza si adatta proporzionalmente
     dall'intrinsic aspect ratio del canvas (canvas.width / canvas.height). */
  canvas.style.height = "auto";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#fdfaf4";
  ctx.fillRect(0, 0, viewport.width, viewport.height);

  const renderTask = page.render({
    canvasContext: ctx,
    viewport,
  });
  await renderTask.promise;
}

/** Larghezza CSS che rispetta maxW e maxH (pagina singola). */
async function maxWidthFittingBox(pdf, pageNumber, maxW, maxH) {
  const page = await pdf.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  const wCap = Math.floor(Math.min(maxW, (maxH * base.width) / base.height));
  return Math.max(160, wCap);
}

export default function CarnevaleArchivePreview({ variant = "paper" }) {
  const isCinematic = variant === "cinematic";
  const archiveFrame = isCinematic ? archiveFrameCinematic : archiveFramePaper;
  const kickerColor = isCinematic ? "text-[#d9c8a8]" : "text-[#7a6d62]";
  const footerColor = isCinematic ? "text-[#cab895]" : "text-[#8a7b6e]";
  const noiseRounded = isCinematic ? "rounded-[3px]" : "rounded-[14px]";
  const innerCanvasFrame = isCinematic
    ? "rounded-[2px] bg-transparent"
    : "rounded-[10px] bg-[#f5f0e8]/90";
  const canvasRounded = isCinematic ? "rounded-[2px]" : "rounded-[8px]";

  const pdfRef = useRef(null);
  const thumbCanvasRef = useRef(null);
  const lightboxCanvasRef = useRef(null);
  const viewerScrollRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [open, setOpen] = useState(false);
  const [portalEl, setPortalEl] = useState(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  // Il PDF (libreria + worker + parsing) viene caricato solo quando la card sta
  // per entrare nel viewport: evita lavoro pesante durante lo scroll iniziale.
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = thumbCanvasRef.current?.parentElement ?? thumbCanvasRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNearViewport(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const pdfjsLib = await loadPdfjs();
        const pdf = await pdfjsLib.getDocument({ url: PDF_URL, withCredentials: false }).promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        /* Misura la larghezza disponibile per il thumb invece di usare un fisso 268px:
           su telefoni stretti (≤340px) la card può essere solo ~220px → renderizzo
           alla larghezza giusta così la bitmap è nitida e non viene clippata. */
        const canvasEl = thumbCanvasRef.current;
        const parentW =
          canvasEl?.parentElement?.getBoundingClientRect().width ?? 268;
        const targetW = Math.max(180, Math.min(268, Math.floor(parentW) - 4));
        await renderPdfPageToCanvas(pdf, 1, canvasEl, targetW);
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [nearViewport]);

  const layoutLightbox = useCallback(async () => {
    if (!open || !pdfRef.current || !lightboxCanvasRef.current || !viewerScrollRef.current) return;
    const el = viewerScrollRef.current;
    const canvas = lightboxCanvasRef.current;
    const r = el.getBoundingClientRect();
    const pad = 12;
    const maxW = Math.max(160, r.width - pad);
    const maxH = Math.max(120, r.height - pad);
    const w = await maxWidthFittingBox(pdfRef.current, 1, maxW, maxH);
    await renderPdfPageToCanvas(pdfRef.current, 1, canvas, w);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    let cancelled = false;
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        layoutLightbox();
      });
    });
    const el = viewerScrollRef.current;
    if (!el) {
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf1);
      };
    }
    const ro = new ResizeObserver(() => {
      if (!cancelled) layoutLightbox();
    });
    ro.observe(el);
    window.addEventListener("resize", layoutLightbox);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      ro.disconnect();
      window.removeEventListener("resize", layoutLightbox);
    };
  }, [open, layoutLightbox]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const overlay =
    portalEl &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="carnevale-pdf-viewer"
            role="presentation"
            className="fixed inset-0 z-[220] flex items-center justify-center p-2.5 sm:p-4 md:p-[max(1rem,min(3vw,2.5rem))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: lightboxEase }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 cursor-default bg-[#050403]/82 backdrop-blur-md"
              aria-label="Chiudi il documento"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease: lightboxEase }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="carnevale-lightbox-title"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.55, ease: lightboxEase }}
              className="relative z-10 flex h-[min(calc(100dvh-1.25rem),calc(100vh-1.25rem))] w-[min(calc(100vw-1.25rem),100%)] max-h-[min(calc(100dvh-1.25rem),calc(100vh-1.25rem))] max-w-[min(calc(100vw-1.25rem),100%)] flex-col overflow-hidden rounded-[12px] border border-white/[0.07] bg-[#141210]/95 shadow-[0_40px_120px_rgba(0,0,0,0.65)] md:h-[min(92vh,92dvh)] md:max-h-[92vh] md:w-[92vw] md:max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="carnevale-lightbox-title" className="sr-only">
                Un Carnevale per Venezia — documento PDF
              </h2>

              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/35 text-[#f0ebe3] shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-[#c4a574]/35 hover:bg-black/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a574]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908] sm:right-4 sm:top-4"
                aria-label="Chiudi"
              >
                <XMarkIcon className="h-5 w-5" strokeWidth={1.75} />
              </button>

              <div
                ref={viewerScrollRef}
                className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-clip bg-[radial-gradient(100%_70%_at_50%_0%,rgba(48,42,36,0.35)_0%,#0e0c0b_72%)]"
              >
                <div className="flex w-full flex-1 items-start justify-center px-2 pb-5 pt-14 sm:px-4 sm:pb-6 sm:pt-16">
                  <canvas
                    ref={lightboxCanvasRef}
                    className="h-auto max-w-full rounded-[2px] border border-white/[0.05] shadow-[0_20px_70px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>

              <p className="shrink-0 border-t border-white/[0.06] px-3 py-2.5 text-center font-bio-display text-[9px] font-medium uppercase tracking-[0.28em] text-[#8f877c] sm:px-4 sm:text-[10px] sm:tracking-[0.3em]">
                Archivio RAI · 1980 · prima pagina
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      portalEl,
    );

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.72, ease: sectionEase }}
        className="w-full"
      >
        <p className={`font-bio-display mb-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] md:text-[0.74rem] md:tracking-[0.24em] ${kickerColor}`}>
          Un Carnevale per Venezia
        </p>

        <button
          type="button"
          onClick={() => status === "ready" && setOpen(true)}
          disabled={status !== "ready"}
          className={`group w-full text-left outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-[#b8945d]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f0e6] disabled:pointer-events-none disabled:opacity-60 ${status === "error" ? "cursor-default" : ""}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Apri il documento d’archivio a schermo intero"
        >
          <motion.div
            whileHover={status === "ready" ? { y: -1 } : {}}
            transition={{ duration: 0.4, ease: sectionEase }}
            className={`relative ${archiveFrame} p-2 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_8px_22px_rgba(38,28,20,0.09)] group-focus-visible:shadow-[0_8px_22px_rgba(38,28,20,0.09)]`}
          >
            <div
              className={`pointer-events-none absolute inset-0 z-[1] opacity-[0.06] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20128%20128%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] ${noiseRounded}`}
              aria-hidden
            />
            <div className={`relative z-0 flex min-h-[168px] w-full items-center justify-center overflow-hidden ${innerCanvasFrame}`}>
              {status === "loading" ? (
                <span className="font-bio-display text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8b7c]">
                  Caricamento…
                </span>
              ) : null}
              {status === "error" ? (
                <span className="px-3 text-center font-bio-body text-[0.88rem] leading-snug text-[#5c5248]">
                  Documento non disponibile.
                </span>
              ) : null}
              <canvas
                ref={thumbCanvasRef}
                className={`relative z-[2] mx-auto block h-auto max-w-full ${canvasRounded} ${status === "ready" ? "opacity-100" : "hidden"}`}
                aria-hidden={status !== "ready"}
              />
            </div>
          </motion.div>
        </button>

        <p className={`font-bio-display mt-2.5 text-[10px] font-medium uppercase tracking-[0.28em] md:text-[11px] md:tracking-[0.3em] ${footerColor}`}>
          Archivio RAI · 1980
        </p>
      </motion.aside>

      {overlay}
    </>
  );
}
