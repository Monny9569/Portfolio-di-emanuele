import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { t } from "../i18n";

export default function FlipCard({
  frontImage,
  backImage,
  altFront = t("Immagine fronte", "Front image"),
  altBack = t("Immagine retro", "Back image"),
  className = "",
  aspectClass = "aspect-[1/1]",
  shadowClass = "cover-elevated",
  roundedClass = "rounded-[22px]",
  buttonPosition = "bottom-3 right-3",
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`relative w-full [perspective:1400px] ${className}`}>
      <div
        className={`
          group relative w-full ${aspectClass}
        `}
      >
        <div
          className={`
            relative h-full w-full transition-transform duration-700
            [transform-style:preserve-3d]
            md:group-hover:[transform:rotateY(180deg)]
            ${flipped ? "[transform:rotateY(180deg)]" : ""}
          `}
        >
          {/* Fronte: ombra sul wrapper esterno (no overflow) così non viene tagliata */}
          <div
            className={`
              absolute inset-0 ${shadowClass}
              [backface-visibility:hidden] ${roundedClass}
            `}
          >
            <div
              className={`absolute inset-0 overflow-hidden ${roundedClass}`}
            >
              <img
                src={frontImage}
                alt={altFront}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Retro */}
          <div
            className={`
              absolute inset-0 ${shadowClass}
              [transform:rotateY(180deg)] [backface-visibility:hidden]
              ${roundedClass}
            `}
          >
            <div
              className={`absolute inset-0 overflow-hidden ${roundedClass}`}
            >
              <img
                src={backImage}
                alt={altBack}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Flip solo mobile: freccia rotonda = “gira per vedere il retro” */}
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className={`
            md:hidden absolute ${buttonPosition} z-20
            flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full
            border border-white/20 bg-black/30 text-white/80
            shadow-none backdrop-blur-[6px] transition
            active:scale-95 active:bg-black/45
          `}
          aria-label={flipped ? t("Mostra fronte", "Show front") : t("Vedi il retro della copertina", "See the back of the cover")}
        >
          <ArrowPathIcon
            className={`h-4 w-4 stroke-[1.65] transition-transform duration-500 ease-out ${
              flipped ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}