import { useState } from "react";

export default function FlipCard({
  frontImage,
  backImage,
  altFront = "Immagine fronte",
  altBack = "Immagine retro",
  className = "",
  aspectClass = "aspect-[1/1]",
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
          {/* Fronte */}
          <div
            className={`
              absolute inset-0 overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.14)]
              [backface-visibility:hidden] ${roundedClass}
            `}
          >
            <img
              src={frontImage}
              alt={altFront}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Retro */}
          <div
            className={`
              absolute inset-0 overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.14)]
              [transform:rotateY(180deg)] [backface-visibility:hidden]
              ${roundedClass}
            `}
          >
            <img
              src={backImage}
              alt={altBack}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pulsante flip solo mobile/tablet */}
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className={`
            md:hidden absolute ${buttonPosition} z-20
            inline-flex items-center justify-center
            rounded-full border border-white/30 bg-black/65
            px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white
            shadow-lg backdrop-blur-sm transition active:scale-95
          `}
          aria-label={flipped ? "Mostra fronte" : "Gira immagine"}
        >
          {flipped ? "Fronte" : "Gira"}
        </button>
      </div>
    </div>
  );
}