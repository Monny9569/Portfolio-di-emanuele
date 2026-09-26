
import Navbar from '../components/Navbar';
import HeroGallery from "../sections/HeroGallery";
import Timeline from '../sections/Timeline';
import Footer from "../sections/footer";

export default function HomePage() {
 
  return (
    <div className="min-h-[100svh] w-full min-w-0 overflow-x-hidden bg-paper font-sans antialiased text-gray-900">
      <Navbar />
      <main className="page-with-bottom-player min-w-0">

        <HeroGallery />
        <Timeline />

      </main>
      <Footer />
    </div>
  );
}
