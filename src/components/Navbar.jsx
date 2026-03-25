import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null); 

  const items = [
    { name: "Home", path: "/" },
    { name: "Discografia", path: "#timeline" },
    //{ name: "Collaborazioni", path: "#collaborations" },
    { name: "Chi sono", path: "#about" },
    { name: "Contatti", path: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const handleMenuNavigation = (e, path) => {
  e.preventDefault();

  setActiveLink(path);

  setTimeout(() => {
    setIsOpen(false);
    setActiveLink(null);
    window.location.href = path;
  }, 300);
};
  
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f3efe6]/90 backdrop-blur-md text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "bg-black/10 backdrop-blur-sm text-white"
        }`}
      >
        <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-5 sm:px-8 md:px-14 py-4 md:py-6">
          {/* Logo */}
          <a
            href="/"
            className={`font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.04em] leading-[0.95] transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Emanuele Monetti
          </a>

          {/* Menu desktop */}
          <ul className="hidden md:flex items-center gap-10 lg:gap-14 text-[16px] font-medium tracking-[0.05em]">
            {items.map((item) => (
              <li key={item.name} className="group relative">
                <a
                  href={item.path}
                  className={`relative py-2 transition-colors duration-300 ${
                    scrolled
                      ? "text-gray-900 hover:text-[#b01c24]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {item.name}
                </a>
                <span
                  className={`absolute left-0 -bottom-1 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-[#b01c24]" : "bg-white"
                  }`}
                />
              </li>
            ))}
          </ul>

          {/* Bottone mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
            md:hidden inline-flex items-center justify-center whitespace-nowrap
            rounded-full px-4 py-2
            text-[11px] uppercase tracking-[0.22em]
            min-w-[110px]
            transition-all duration-300 ease-out active:scale-95
            ${
              isOpen
                ? "bg-[#b01c24] text-white shadow-lg"
                : scrolled
                ? "border border-gray-300 bg-white/80 text-gray-900 hover:scale-105"
                : "border border-white/30 bg-black/15 text-white backdrop-blur-sm hover:scale-105"
            }
          `}
            aria-label="Menu"
          >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="ml-2">{isOpen ? "×" : "+"}</span>
          </button>
        </nav>
      </header>

      {/* Menu mobile animato */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[120] bg-black/55 backdrop-blur-md px-4 py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <motion.div
              className="h-full w-full rounded-[2rem] bg-[#f3efe6] shadow-[0_30px_80px_rgba(0,0,0,0.28)] overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.985 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            >
              {/* Top */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5">
                <div className="text-[12px] uppercase tracking-[0.28em] text-gray-700">
                  Menu
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Chiudi menu"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b01c24] text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="h-px bg-[#e6e1d6] mx-6" />

              {/* Links */}
              <motion.div className="px-6 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <ul className="flex flex-col">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.name}
                      className="border-b border-[#e6e1d6] last:border-b-0"
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.35 + index * 0.10,
                        ease: "easeOut",
                      }}
                    >
                     <a
                      href={item.path}
                      onClick={(e) => handleMenuNavigation(e, item.path)}
                      className={`
                        block py-7 px-3 -mx-3 rounded-xl
                        font-serif italic text-[2.6rem] leading-none
                        transition-all duration-300
                        ${
                          activeLink === item.path
                            ? "bg-[#b01c24]/15 text-[#b01c24] translate-x-1"
                            : "text-gray-900 hover:text-[#b01c24]"
                        }
                      `}
                    >
                      {item.name}
                    </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              

              {/* Blocco visual/social */}
              <motion.div
                className="mt-auto px-6 pb-6 pt-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: 0.28, ease: "easeOut" }}
              >
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-[1.75rem]">
                    <img
                      src="/timeline/tuttoegiadiverso.jpeg"
                      alt="Seguimi su Instagram"
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end">
                      <div className="p-5 text-white">
                        <p className="text-[11px] uppercase tracking-[0.28em] mb-2 text-white/80">
                          Instagram
                        </p>
                        <p className="font-serif italic text-2xl">
                          Frammenti di musica
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="pt-5">
                  <p className="font-serif text-xl text-gray-900">
                    Emanuele Monetti
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.24em] text-gray-500 mt-2">
                    Cantautore · Autore · Compositore
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}