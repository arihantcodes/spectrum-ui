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
  title: {
    absolute: "Spectrum UI — Animated React Components & Blocks",
  },
  description:
    "Open-source, animation-ready React components and blocks built with Next.js, Tailwind CSS, Motion, TypeScript, and shadcn/ui for SaaS and AI apps.",
  alternates: {
    canonical: "https://ui.spectrumhq.in",
  },
  openGraph: {
    title: "Spectrum UI — Animated React Components & Blocks",
    description:
      "Open-source, animation-ready React components and blocks built with Next.js, Tailwind CSS, Motion, TypeScript, and shadcn/ui for SaaS and AI apps.",
    url: "https://ui.spectrumhq.in",
    type: "website",
    siteName: "Spectrum UI",
    images: [
      {
        url: "https://ui.spectrumhq.in/og.png",
        width: 1200,
        height: 630,
        alt: "Spectrum UI — React UI components for Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum UI — Animated React Components & Blocks",
    description:
      "Open-source, animation-ready React components and blocks built with Next.js, Tailwind CSS, Motion, TypeScript, and shadcn/ui for SaaS and AI apps.",
    images: ["https://ui.spectrumhq.in/og.png"],
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
