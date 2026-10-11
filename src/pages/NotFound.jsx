import { Link } from "react-router-dom";
import { t } from "../i18n";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-paper px-6 text-center text-gray-900">
      <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-gray-500">{t("Errore 404", "Error 404")}</p>
      <h1 className="mb-6 font-serif text-4xl italic sm:text-5xl">{t("Pagina non trovata", "Page not found")}</h1>
      <div className="mb-8 h-px w-20 bg-[#b01c24]" />
      <Link
        to="/"
        className="text-[12px] uppercase tracking-[0.28em] text-gray-700 underline-offset-4 hover:underline"
      >
        {t("Torna alla home", "Back to home")}
      </Link>
    </main>
  );
}
