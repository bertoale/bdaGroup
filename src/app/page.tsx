import { Navbar } from "@/sections/layout/navbar";
import { Footer } from "@/sections/layout/footer";
import { HomeHero } from "@/sections/home/home-hero";
import { HomeIntro } from "@/sections/home/home-intro";
import { HomeWhyUs } from "@/sections/home/home-why-us";
import { HomeBusinessUnits } from "@/sections/home/home-business-units";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { AmbientBackground } from "@/components/ui/ambient-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-gold selection:text-brand-navy relative">
      <AmbientBackground />
      <Navbar />
      <CursorSpotlight />
      <main className="flex-1">
        <HomeHero />
        <HomeIntro />
        <HomeWhyUs />
        <HomeBusinessUnits />
      </main>
      <Footer />
    </div>
  );
}
