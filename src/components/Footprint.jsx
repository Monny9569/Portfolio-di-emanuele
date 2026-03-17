{/* Footprints disabled */}
import { motion, useTransform } from "framer-motion";

export default function Footprint({ style, side, progress, stepPosition }) {
  const opacity = useTransform(
    progress,
    [stepPosition - 0.08, stepPosition, stepPosition + 0.08],
    [0, 0.55, 0]
  );

  const scale = useTransform(
    progress,
    [stepPosition - 0.08, stepPosition, stepPosition + 0.08],
    [0.9, 1, 0.9]
  );

  const y = useTransform(
    progress,
    [stepPosition - 0.08, stepPosition, stepPosition + 0.08],
    [8, 0, -8]
  );

  return (
    <motion.div
      style={{ ...style, opacity, scale, y }}
      className={`absolute left-1/2 z-20 ${
      side === "left"
        ? "-translate-x-[6px] rotate-[198deg]"
        : "translate-x-[0px] rotate-[162deg]"
      }`}
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 70 110"
        fill="currentColor"
        className="text-gray-500/80"
        aria-hidden="true"
      >
        {/* Tallone */}
        <ellipse cx="35" cy="88" rx="14" ry="18" />

        {/* Pianta del piede */}
        <path d="M34 22
                 C24 24, 18 34, 19 47
                 C20 58, 24 69, 28 76
                 C31 81, 39 81, 43 75
                 C47 69, 50 59, 50 48
                 C50 36, 45 26, 34 22Z" />

        {/* Dita */}
        <circle cx="18" cy="18" r="4.5" />
        <circle cx="25" cy="11" r="5" />
        <circle cx="34" cy="8" r="5.5" />
        <circle cx="43" cy="11" r="5" />
        <circle cx="50" cy="18" r="4.5" />
      </svg>
    </motion.div>
  );
}