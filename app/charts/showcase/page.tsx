import type { Metadata } from 'next';
import { createNoIndexMetadata } from '@/lib/metadata';
import { ShowcaseStage } from './showcase-stage';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Charts showcase capture stage',
  description:
    'Internal capture stage used to record the Spectrum Charts reel. Not part of the public documentation.',
  path: '/charts/showcase',
});

export default function ChartsShowcasePage() {
  return (
    // A fixed, opaque overlay rather than an in-flow section: the root layout
    // renders nav, a chat widget and a notification badge, and every one of
    // them would otherwise land in the recording.
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background [--showcase-accent:#f9452d] dark:[--showcase-accent:#E1F435]"
      data-showcase-stage
    >
      {/* The floating CTA would sit in every frame. The Next dev indicator is
          dev-only and disappears in a production build, which is what the reel
          is recorded against. */}
      <style>{`
        [data-work-with-me],
        nextjs-portal { display: none !important; }
      `}</style>
      <ShowcaseStage />
    </div>
  );
}
