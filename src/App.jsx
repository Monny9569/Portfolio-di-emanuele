import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DikDikPage from "./pages/DikDikPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dik-dik" element={<DikDikPage />} />
    </Routes>
  );
}