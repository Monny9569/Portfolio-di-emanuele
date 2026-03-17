import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = [
    { name: "Home", path: "/" },
    { name: "Discografia", path: "#timeline" },
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper-soft/90 backdrop-blur-md text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          : "bg-black/10 backdrop-blur-sm text-white"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-8 md:px-14 py-5 md:py-6">
        {/* Logo */}
        <a
          href="/"
          className={`font-serif text-3xl md:text-4xl tracking-[0.08em] leading-none transition-colors duration-300 ${
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
                    ? "text-gray-900 hover:text-artist"
                    : "text-white hover:text-white/80"
                }`}
              >
                {item.name}
              </a>
              <span
                className={`absolute left-0 -bottom-1 h-px w-0 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-artist" : "bg-white"
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Apri menu"
        >
          <span
            className={`w-7 h-0.5 transition-colors duration-300 ${
              scrolled ? "bg-gray-900" : "bg-white"
            }`}
          ></span>
          <span
            className={`w-7 h-0.5 transition-colors duration-300 ${
              scrolled ? "bg-gray-900" : "bg-white"
            }`}
          ></span>
          <span
            className={`w-7 h-0.5 transition-colors duration-300 ${
              scrolled ? "bg-gray-900" : "bg-white"
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden px-8 py-6 transition-all duration-300 ${
            scrolled
              ? "bg-paper-soft/95 text-gray-900 border-t border-black/5"
              : "bg-black/60 text-white border-t border-white/10 backdrop-blur-md"
          }`}
        >
          <ul className="flex flex-col gap-5 text-lg font-medium tracking-[0.03em]">
            {items.map((item) => (
              <li key={item.name}>
                <a href={item.path} onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}