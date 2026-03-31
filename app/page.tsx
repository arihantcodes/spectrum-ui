import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
const HomeCardCollection = dynamic(() => import('@/components/homecard'), {
  ssr: true,
  loading: () => <div className="animate-pulse h-[400px] w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg"></div>
});
import { HeroSection } from './home';
import { PromoBanner } from '@/components/promo-banner';

export const metadata: Metadata = {
  title: "Spectrum UI — 250+ Free React & Next.js UI Components",
  description:
    "Copy-paste beautiful UI components built with React, Next.js, Tailwind CSS, and shadcn/ui. 250+ production-ready components, blocks, and templates. Free and open source.",
  alternates: {
    canonical: "https://ui.spectrumhq.in",
  },
  openGraph: {
    title: "Spectrum UI — 250+ Free React & Next.js UI Components",
    description:
      "Copy-paste beautiful UI components built with React, Next.js, Tailwind CSS, and shadcn/ui. Free and open source.",
    url: "https://ui.spectrumhq.in",
    type: "website",
  },
};


const Homepage = () => {
  return (
    <>
      {/* Pro Banner */}
      <PromoBanner />

      <div className="container-wrapper">
        <HeroSection />
      </div>

      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex flex-col justify-center items-center my-8 md:my-12">
            <h2 className="font-bold text-2xl md:text-4xl mb-4 tracking-tight text-neutral-900 dark:text-white">
              Ready-to-Use UI Blocks
            </h2>
          </div>

          <HomeCardCollection />
        </div>
      </div>
    </>
  );
};

export default Homepage;
