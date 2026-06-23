import { HeroContent } from "./HeroContent";
import { Spotlight } from "./Spotlight";

export function HeroSection() {
  return (
    <section className="relative flex sm:min-h-screen max-sm:pt-24 max-sm:pb-20 max-sm:max-h-[950px] flex-col items-center sm:justify-center">
      <Spotlight />
      <HeroContent />
    </section>
  );
}
