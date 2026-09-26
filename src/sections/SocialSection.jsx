import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Youtube, Facebook } from "lucide-react";
import { socialLinks } from "../data/social";
import amazonMusicIcon from "../assets/amazon-music-icon.png";
import AppleMusicGlyph from "../components/AppleMusicGlyph";
import SpotifyGlyph from "../components/SpotifyGlyph";

const iconById = {
  youtube: Youtube,
  facebook: Facebook,
  applemusic: AppleMusicGlyph,
  spotify: SpotifyGlyph,
};

/** Accenti brand molto soft — presenza discreta */
const brandSurface = {
  youtube: {
    iconWrap: "bg-red-500/[0.07] text-red-600/85",
    bottomBar: "bg-gradient-to-r from-red-600/55 to-red-700/50",
  },
  facebook: {
    iconWrap: "bg-[#1877f2]/[0.07] text-[#1877f2]/85",
    bottomBar: "bg-gradient-to-r from-[#1877f2]/50 to-[#0a4fbf]/45",
  },
  applemusic: {
    iconWrap: "bg-[#b78a8e]/[0.08] text-[#9a6e72]/90",
    bottomBar: "bg-gradient-to-r from-[#b78a8e]/45 to-[#9a6e72]/45",
  },
  spotify: {
    iconWrap: "bg-green-500/[0.07] text-green-600/90",
    bottomBar: "bg-gradient-to-r from-green-600/45 to-green-700/45",
  },
  amazonmusic: {
    iconWrap: "bg-sky-500/[0.06] text-sky-700/85",
    bottomBar: "bg-gradient-to-r from-sky-600/40 to-cyan-600/40",
  },
};

export default function SocialSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blobTopY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [48, -72]
  );
  const blobTopScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1.05]
  );
  const blobBottomY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-36, 52]
  );
  const blobBottomX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 24]
  );
  const contentLift = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [18, -12]
  );

  return (
    <section
      ref={sectionRef}
      id="social"
      className="relative z-0 overflow-x-hidden py-16 md:py-24 border-t border-[#e6e1d6]/50"
    >
      {/* avanzamento lettura mentre scrolli nella sezione */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-[#e8e4dc]/80 z-[1]"
        aria-hidden
      >
        <motion.div
          className="h-full w-full origin-left bg-[#b01c24]"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* sfondo: mesh morbido */}
      <div
        className="pointer-events-none absolute inset-0 bg-paper"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[min(100%,640px)] -translate-x-1/2 rounded-full bg-[#b01c24]/[0.025] blur-3xl md:blur-[100px]"
        aria-hidden
        style={{ y: blobTopY, scale: blobTopScale }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-stone-300/12 blur-3xl"
        aria-hidden
        style={{ y: blobBottomY, x: blobBottomX }}
      />

      <motion.div
        className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-8 md:px-10 lg:px-12"
        style={{ y: contentLift }}
      >
        <div className="mb-10 md:mb-12 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-[10px] font-medium uppercase tracking-[0.32em] text-gray-400"
          >
            RESTA IN CONTATTO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-3xl md:text-[2.15rem] font-serif italic text-gray-800 leading-[1.12]"
          >
            Tra musica e storie
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-px w-16 origin-left bg-[#b01c24]/70"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-4 text-[13px] md:text-sm text-gray-500 leading-relaxed font-normal"
          >
            Restiamo in contatto sui social e sulle piattaforme musicali.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:gap-2.5 lg:grid-cols-4 lg:gap-2.5 xl:gap-2.5">
          {socialLinks.map((item, index) => {
            const Icon = iconById[item.id];
            const isAmazon = item.id === "amazonmusic";
            const usesGlyph = item.id === "applemusic" || item.id === "spotify";
            const surface = brandSurface[item.id] ?? brandSurface.youtube;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel ?? item.label}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -3, scale: 1.015 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 480, damping: 32 }}
                  className="group relative flex min-h-[44px] flex-col items-center justify-center overflow-hidden rounded-[1rem] border border-[#e8e4dc]/90 bg-white/90 px-2 py-3 text-center shadow-[0_1px_10px_rgba(0,0,0,0.035)] transition-[box-shadow,border-color,background-color] duration-300 hover:border-[#ddd8cf] hover:bg-white hover:shadow-[0_6px_22px_-6px_rgba(0,0,0,0.07)] motion-reduce:transition-none md:min-h-[4.75rem] md:py-3.5"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] ring-0 transition-[box-shadow] duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(176,28,36,0.07)] motion-reduce:group-hover:shadow-none"
                    aria-hidden
                  />
                  <div
                    className={`
                      pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-center
                      scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      motion-reduce:transition-none
                      ${surface.bottomBar}
                      group-hover:scale-x-100
                    `}
                    aria-hidden
                  />

                  <span
                    className={`
                      relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                      transition-transform duration-300 ease-out motion-reduce:transition-none
                      ${surface.iconWrap}
                      group-hover:scale-[1.04]
                    `}
                  >
                    {isAmazon ? (
                      <img
                        src={amazonMusicIcon}
                        alt=""
                        className="h-4 w-4 object-contain opacity-90"
                        aria-hidden
                      />
                    ) : Icon ? (
                      usesGlyph ? (
                        <Icon className="h-4 w-4" />
                      ) : (
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.45}
                        />
                      )
                    ) : null}
                  </span>

                  <div className="relative mt-2 w-full transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-px">
                    <span className="text-[11px] font-medium tracking-tight text-gray-800 transition-colors duration-300 group-hover:text-[#8f2a32]">
                      {item.label}
                    </span>
                    <p className="mt-0.5 text-[11px] leading-snug text-gray-400 font-normal transition-colors duration-300 group-hover:text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
