import { Link } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { t } from "../i18n";

/** Stile unico per tutti i pulsanti “LEGGI” del sito (Diario di Bordo, ecc.) */
export const readButtonClassName =
  "group inline-flex min-h-[44px] max-md:px-4 max-md:py-2 max-md:text-[9px] max-md:tracking-[0.2em] items-center gap-2 rounded-full border border-[#b01c24]/45 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:border-[#b01c24] hover:bg-[#b01c24] hover:text-white sm:px-6 sm:py-3";

export default function ReadButton({ to, href, className = "", children = t("Leggi", "Read") }) {
  const classes = [readButtonClassName, className].filter(Boolean).join(" ");

  const content = (
    <>
      <BookOpenIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" aria-hidden />
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
