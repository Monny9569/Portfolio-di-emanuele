import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Discography from './sections/Discography'; // 1. Importa
import Timeline from './sections/Timeline'; // Importa la timeline
import BackToTop from './components/BackToTop'; // pulsante per tornare su
import HeroGallery from "./sections/HeroGallery";
import PressArticle from "./components/PressArticle";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans antialiased text-gray-900">
      <Navbar />
      <main>
        <HeroGallery />
        <Timeline />
        <PressArticle />
        {/* Sezione Biografia Veloce */}
        <section className="py-24 px-10 max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-3xl mb-6 italic text-gray-800 font-medium">
            L'anima pop-rock di un cantautore moderno.
          </h3>
          <p className="text-gray-500 leading-relaxed font-light tracking-wide italic">
            "La mia musica nasce tra i binari della nostalgia e la voglia di raccontare il presente.
            Ogni nota è un frammento di vita vissuta, ogni testo una fotografia dell'anima."
          </p>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}