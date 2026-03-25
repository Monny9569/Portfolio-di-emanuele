import { motion } from "framer-motion";
import { Instagram, Youtube, Music, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
     initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
      className="mt-32 py-20 border-t border-[#e6e1d6] text-center"
    >
      {/* MENU */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-10">
        <Link to="/contatti" className="hover:text-gray-900 transition">
          Contatti
        </Link>
        <Link to="/privacy" className="hover:text-gray-900 transition">
          Privacy
        </Link>
        <Link to="/cookie" className="hover:text-gray-900 transition">
          Cookie
        </Link>
      </div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mb-10">

        <a
            href="#"
            target="_blank"
            className="group p-3 rounded-full border border-[#e6e1d6] hover:border-gray-900 transition"
        >
            <Instagram className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition" />
        </a>

        <a
            href="#"
            target="_blank"
            className="group p-3 rounded-full border border-[#e6e1d6] hover:border-gray-900 transition"
        >
            <Youtube className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition" />
        </a>

        <a
            href="#"
            target="_blank"
            className="group p-3 rounded-full border border-[#e6e1d6] hover:border-gray-900 transition"
        >
            <Facebook className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition" />
        </a>

        <a
            href="#"
            target="_blank"
            className="group p-3 rounded-full border border-[#e6e1d6] hover:border-gray-900 transition"
        >
            <Music className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition" />
        </a>

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
        © {new Date().getFullYear()} Emanuele Monetti — Tutti i diritti riservati
      </motion.p>
    </motion.footer>
  );
}