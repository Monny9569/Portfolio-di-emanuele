import { useEffect, useState } from "react";
import { hasExternalMediaConsent } from "../utils/cookieConsent";


export default function BottomSpotifyPlayer({ player, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const canLoadEmbed = hasExternalMediaConsent();

  useEffect(() => {
    if (player) {
      setIsOpen(true);
    }
  }, [player]);

  if (!player) return null;

  return (

    <div
      className={`fixed bottom-6 left-0 z-50 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-[450px]"
      }`}
    >
      <div className="relative flex items-stretch">
        {/* Linguetta laterale */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 h-24 w-12 rounded-r-2xl border border-white/10 border-l-0 bg-[#1a1a1a]/95 text-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.28)] hover:text-white transition"
          aria-label={isOpen ? "Chiudi player" : "Apri player"}
        >
          <div className="flex h-full items-center justify-center">
            <span className="text-xl leading-none">
              {isOpen ? "‹" : "›"}
            </span>
          </div>
        </button>

        {/* Player */}
        <div className="w-[460px] max-w-[92vw] rounded-r-2xl border border-white/10 bg-[#1a1a1a]/95 shadow-[0_24px_60px_rgba(0,0,0,0.35)] px-4 py-4">
          <div className="flex items-start justify-between gap-4 mb-3 pr-6">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/40 mb-1">
                In ascolto
              </p>

              <h3 className="text-white/95 font-serif italic text-xl leading-tight truncate">
                {player.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 text-white/45 hover:text-white text-2xl leading-none transition"
              aria-label="Chiudi player"
              title="Chiudi player"
            >
              ✕
            </button>
          </div>

          <div className="rounded-xl overflow-hidden">
            {canLoadEmbed ? (
            <iframe
              src={player.embed}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          ) : (
            <div className="rounded-xl border border-[#e6e1d6] bg-[#f3efe6] p-6 text-center">
              <p className="font-serif text-lg text-gray-800 mb-4">
                Per visualizzare questo contenuto è necessario abilitare i contenuti esterni.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("cookie-reset"));
                }}
                className="inline-flex items-center justify-center rounded-full border border-[#b01c24] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#b01c24] transition-all duration-300 hover:bg-[#b01c24] hover:text-white"
              >
                Gestisci preferenze
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}