import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DikDikPage from "./pages/DikDikPage";
import ScrollManager from "./components/ScrollManager";
import BackToTop from "./components/BackToTop";
import IreneFornaciari from "./pages/IreneFornaciari";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dik-dik" element={<DikDikPage />} />
        <Route path="/irene-fornaciari" element={<IreneFornaciari />} />
      </Routes>
      <BackToTop />
    </>
  );
}