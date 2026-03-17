import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitoriamo lo scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
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
        className="fixed bottom-8 right-8 p-3 bg-black text-white border-2 border-black rounded-full shadow-xl hover:bg-white hover:text-black transition-all duration-300 z-50"
        >
        <ChevronUpIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}