
import Navbar from '../components/Navbar';
import HeroGallery from "../sections/HeroGallery";
import Timeline from '../sections/Timeline';
import PressArticle from "../components/PressArticle";
import BackToTop from '../components/BackToTop';
import Footer from "../sections/footer";
import CookieConsent from "../components/CookieConsent";

export default function HomePage() {
 
  return (
    <div className="min-h-screen bg-paper font-sans antialiased text-gray-900">
      <Navbar />
      <main>

        <HeroGallery />
        <Timeline />
        <PressArticle />

      </main>
      <BackToTop />
      <Footer />
      <CookieConsent />
    </div>
  );
}