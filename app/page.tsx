import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
const HomeCardCollection = dynamic(() => import('@/components/homecard'), {
  ssr: true,
  loading: () => <div className="animate-pulse h-[400px] w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg"></div>
});
import { HeroSection } from './home';
import { FAQSection } from '@/components/faq-section';
import { ShowcaseSection } from '@/components/showcase';

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


      <div className="container-frame border-b border-border">
        <HeroSection />
      </div>

      <div className="container-frame border-b border-border">
        <ShowcaseSection />
      </div>
      <div className="container-frame border-t border-border bg-neutral-50/10 dark:bg-neutral-950/10">
        <FAQSection />
      </div>


    </>
  );
};

export default Homepage;
