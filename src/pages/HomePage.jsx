
import Navbar from '../components/Navbar';
import HeroGallery from "../sections/HeroGallery";
import Timeline from '../sections/Timeline';
import Footer from "../sections/footer";
import { t } from "../i18n";

export default function HomePage() {
 
  return (
    <div className="min-h-[100svh] w-full min-w-0 overflow-x-clip bg-paper font-sans antialiased text-gray-900">
      <Navbar />
      <main className="page-with-bottom-player min-w-0">

        <h1 className="sr-only">{t("Emanuele Monetti — cantautore e musicista", "Emanuele Monetti — singer-songwriter and musician")}</h1>
        <HeroGallery />
        <Timeline />

      </main>
      <Footer />
    </div>
  );
}
