import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getBackdropFilterSupported } from "./utils/backdropSupport";
import HomePage from "./pages/HomePage";
import ScrollManager from "./components/ScrollManager";
import SeoManager from "./components/SeoManager";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";

// Le pagine secondarie vengono caricate on demand: la home resta leggera.
const DikDikPage = lazy(() => import("./pages/DikDikPage"));
const TuttoEGiaDiverso = lazy(() => import("./pages/tuttoegiadiverso"));
const IreneFornaciari = lazy(() => import("./pages/IreneFornaciari"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookie = lazy(() => import("./pages/Cookie"));
const Contatti = lazy(() => import("./pages/Contatti"));
const BioExperiencePage = lazy(() => import("./pages/BioExperiencePage"));
const Esse = lazy(() => import("./pages/Esse"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  useEffect(() => {
    const ok = getBackdropFilterSupported();
    document.documentElement.classList.toggle("legacy-ui-compat", !ok);
    return () => document.documentElement.classList.remove("legacy-ui-compat");
  }, []);

  return (
    <>
      <ScrollManager />
      <SeoManager />
      <CookieConsent />
      <Suspense fallback={<div className="min-h-[100svh] bg-paper" aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dik-dik" element={<DikDikPage />} />
          <Route path="/irene-fornaciari" element={<IreneFornaciari />} />
          <Route path="/tuttoegiadiverso" element={<TuttoEGiaDiverso />} />
          <Route path="/esse" element={<Esse />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/bio" element={<BioExperiencePage />} />
          <Route path="/bio-experience" element={<BioExperiencePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </>
  );
}
