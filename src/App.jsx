import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DikDikPage from "./pages/DikDikPage";
import ScrollManager from "./components/ScrollManager";
import BackToTop from "./components/BackToTop";
import IreneFornaciari from "./pages/IreneFornaciari";
import Privacy from "./pages/Privacy";
import Cookie from "./pages/Cookie";
import CookieConsent from "./components/CookieConsent";




export default function App() {
  return (
    <>
      <ScrollManager />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dik-dik" element={<DikDikPage />} />
        <Route path="/irene-fornaciari" element={<IreneFornaciari />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie" element={<Cookie />} />
      </Routes>
      <BackToTop />
    </>
  );
}