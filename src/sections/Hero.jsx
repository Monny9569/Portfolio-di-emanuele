import heroImg from '../assets/hero-artist.jpg';


export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden px-10">
      {/* L'immagine con un overlay leggero per far leggere il testo */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={heroImg} 
          alt="Emanuele" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
          <h2 className="text-6xl font-serif italic mb-6 tracking-tight">
            Musica che racconta
          </h2>
          <a
              href="#timeline"
              className="inline-flex items-center gap-2 px-6 py-3 mt-2 border border-white/70 bg-black/20 text-white text-xs uppercase tracking-[0.28em] hover:bg-artist hover:border-artist hover:text-white transition-all duration-300"
            >
            Ascolta il mio nuovo album
          </a>
        </div>
      </div>
    </section>
  );
}