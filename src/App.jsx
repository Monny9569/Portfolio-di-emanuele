import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getBackdropFilterSupported } from "./utils/backdropSupport";
import HomePage from "./pages/HomePage";
import DikDikPage from "./pages/DikDikPage";
import TuttoEGiaDiverso from "./pages/tuttoegiadiverso";
import ScrollManager from "./components/ScrollManager";
import BackToTop from "./components/BackToTop";
import IreneFornaciari from "./pages/IreneFornaciari";
import Privacy from "./pages/Privacy";
import Cookie from "./pages/Cookie";
import Contatti from "./pages/Contatti";
import BioExperiencePage from "./pages/BioExperiencePage";
import Esse from "./pages/Esse";
import CookieConsent from "./components/CookieConsent";




export default function App() {
  useEffect(() => {
    const ok = getBackdropFilterSupported();
    document.documentElement.classList.toggle("legacy-ui-compat", !ok);
    return () => document.documentElement.classList.remove("legacy-ui-compat");
  }, []);

  return (
    <>
      <ScrollManager />
      <CookieConsent />
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
      </Routes>
      <BackToTop />
    </>
  );
}