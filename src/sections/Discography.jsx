import giada from '../assets/giada.jpeg';
import { PlayIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Discography() {
  const latestRelease = {
    label: "Ultima uscita",
    date: "Giugno 2026",
    title: "Giada",
    image: giada,
    description:
      "Un brano intimo e delicato, sospeso tra memoria, emozione e cantautorato contemporaneo.",
    listenLink: "https://open.spotify.com/...",
    buyLink: "https://..."
  };

  return (
    <section className="py-24 px-10 bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Testo */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.45em] text-gray-400">
              {latestRelease.label}
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-serif italic text-gray-900">
              {latestRelease.title}
            </h2>

            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-gray-400">
              {latestRelease.date}
            </p>

            <p className="mt-8 text-gray-500 leading-relaxed font-light max-w-lg">
              {latestRelease.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={latestRelease.listenLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-300 px-5 py-3 hover:bg-black hover:text-white transition-all"
              >
                <PlayIcon className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">Ascolta</span>
              </a>

              <a
                href={latestRelease.buyLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-gray-300 px-5 py-3 hover:bg-black hover:text-white transition-all"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">Compra</span>
              </a>
            </div>
          </div>

          {/* Copertina */}
          <div className="group">
            <div className="cover-elevated aspect-square w-full bg-paperSoft p-2 rounded-2xl transition-all duration-500">
              <img
                src={latestRelease.image}
                alt={latestRelease.title}
                className="w-full h-full object-cover rounded-xl border border-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}