# Emanuele Monetti — sito ufficiale

Sito portfolio di Emanuele Monetti: biografia, discografia, uscite, collaborazioni e contatti.
Online su <https://emanuelemonetti.com>.

## Stack
- React 18 + Vite 8, React Router 7
- Tailwind CSS 4, Framer Motion, GSAP
- Cloudflare Pages + Pages Functions (`functions/api/contact.js`, invio email via Resend)

## Sviluppo
```bash
npm ci
npm run dev      # server di sviluppo
npm run lint     # ESLint
npm run build    # build di produzione in dist/
```

## Variabili d'ambiente (Cloudflare Pages)
`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`

## Note
- Font self-hosted in `public/fonts` (nessuna richiesta a terze parti prima del consenso).
- SEO per pagina in `src/components/SeoManager.jsx`; `robots.txt` e `sitemap.xml` in `public/`.
- Le pagine secondarie sono caricate in lazy-loading (`src/App.jsx`).
