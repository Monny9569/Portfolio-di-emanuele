import { motion } from "framer-motion";
import { Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { socialLinks } from "../data/social";
import amazonMusicIcon from "../assets/amazon-music-icon.png";
import AppleMusicGlyph from "../components/AppleMusicGlyph";
import SpotifyGlyph from "../components/SpotifyGlyph";
import { t } from "../i18n";

const footerIconById = {
  youtube: Youtube,
  facebook: Facebook,
  applemusic: AppleMusicGlyph,
  spotify: SpotifyGlyph,
};

const footerHover = {
  youtube: "hover:border-red-400/35 hover:bg-red-500/10 hover:text-red-600",
  facebook: "hover:border-blue-400/35 hover:bg-[#1877f2]/10 hover:text-[#1877f2]",
  applemusic:
    "hover:border-[#b78a8e]/35 hover:bg-[#b78a8e]/10 hover:text-[#9a6e72]",
  spotify:
    "hover:border-green-400/35 hover:bg-green-500/10 hover:text-green-600",
  amazonmusic:
    "hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-700",
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="mt-20 border-t border-[#e6e1d6] px-4 py-16 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] text-center sm:mt-24 sm:py-20 md:mt-32 md:py-20"
    >
      {/* MENU */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-10">
        <Link to="/contatti" className="hover:text-gray-900 transition">
          {t("Contatti", "Contact")}
        </Link>
        <Link to="/privacy" className="hover:text-gray-900 transition">
          Privacy
        </Link>
        <Link to="/cookie" className="hover:text-gray-900 transition">
          Cookie
        </Link>
      </div>

      {/* SOCIAL — chip moderni */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-3.5 mb-10 px-2">
        {socialLinks.map((item) => {
          const Icon = footerIconById[item.id];
          const isAmazon = item.id === "amazonmusic";
          const usesGlyph = item.id === "applemusic" || item.id === "spotify";
          const hover = footerHover[item.id] ?? "";
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel ?? item.label}
              className={`
                group inline-flex items-center gap-2.5 rounded-full border border-[#e6e1d6]/90
                bg-white/60 px-4 py-2.5 text-[12px] font-medium text-gray-600 shadow-sm
                backdrop-blur-sm transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-md
                ${hover}
              `}
            >
              {isAmazon ? (
                <img
                  src={amazonMusicIcon}
                  alt=""
                  className="h-[15px] w-auto max-h-[15px] object-contain object-left opacity-90 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              ) : Icon ? (
                usesGlyph ? (
                  <Icon className="h-[15px] w-[15px] text-gray-500 transition-colors group-hover:text-current" />
                ) : (
                  <Icon
                    className="h-[15px] w-[15px] text-gray-500 transition-colors group-hover:text-current"
                    strokeWidth={2}
                  />
                )
              ) : null}
              <span className="tracking-tight">{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* LINEA CENTRALE */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        className="h-px bg-[#b01c24] mx-auto mb-6"
      />

      {/* COPYRIGHT */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-[11px] text-gray-500"
      >
        {t(`© ${new Date().getFullYear()} Emanuele Monetti — Tutti i diritti riservati`, `© ${new Date().getFullYear()} Emanuele Monetti — All rights reserved`)}
      </motion.p>
    </motion.footer>
  );
}
