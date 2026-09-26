import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 300 : false
  );

  // Monitoriamo lo scroll
  useEffect(() => {
    let currentVisibility = window.scrollY > 300;

    const toggleVisibility = () => {
      const nextVisibility = window.scrollY > 300;
      if (nextVisibility === currentVisibility) return;

      currentVisibility = nextVisibility;
      setIsVisible(nextVisibility);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        onClick={scrollToTop}
        // Ecco la nuova configurazione colori:
        className="back-to-top-btn fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px)+0.75rem)] right-4 flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border-2 border-black bg-black p-3 text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-black sm:right-8 md:bottom-8 z-50"
        >
        <ChevronUpIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
