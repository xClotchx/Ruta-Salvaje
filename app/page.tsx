import { HeroSection } from "../components/sections/hero-section";
import { GallerySection } from "../components/sections/gallery-section";
import { MapSection } from "../components/sections/map-section";
import { ContactSection } from "../components/sections/contact-section";
import { BottomNav } from "../components/navigation/bottom-nav";
import { TopNav } from "../components/navigation/top-nav";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <div id="inicio">
        <HeroSection />
      </div>
      <GallerySection />
      <MapSection />
      <ContactSection />
      <TopNav />
      <BottomNav />
    </main>
  );
}
