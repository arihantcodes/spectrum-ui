import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { FrameBand } from '@/components/compare/frame';
import { Icons } from '@/components/icon';
import { siteConfig } from '@/config/site';
import { ChartsIndex } from './charts-index';
import { HeroChart } from './hero-chart';

export const metadata: Metadata = baseMetadata({
  title: 'Animated React Charts',
  description:
    "React chart components shadcn/ui doesn't ship: candlestick, order book, depth, cohort and histogram. Copy-paste for Next.js and Tailwind CSS.",
  keywords: [
    'React charts',
    'animated chart components',
    'React candlestick chart',
    'trading chart component',
    'Next.js charts',
    'dashboard charts',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/charts',
});

export const revalidate = 3600;

function formatStars(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(count);
}

async function getGithubStars(): Promise<number | null> {
  try {
    const { username, repository } = siteConfig.social.github;
    const res = await fetch(`https://api.github.com/repos/${username}/${repository}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'spectrum-ui' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

/**
 * Load-in stagger. `enter-fx` is the site's entrance — CSS, so a busy main
 * thread can't strand content, and it already degrades under
 * prefers-reduced-motion. Its default 0.6s is tuned for a full-page reveal and
 * reads as sluggish on a hero, so each item runs at 420ms with 60ms between
 * them: the last one lands at ~660ms, and the cascade is legible without the
 * page feeling like it is waiting on itself.
 */
function step(index: number) {
  return { animationDuration: '420ms', animationDelay: `${index * 60}ms` };
}

/** The chevron + mono eyebrow used across Spectrum's marketing pages. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="-rotate-90">
        <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
      </span>
      <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
        {children}
      </span>
    </div>
  );
}

export default async function ChartsLandingPage() {
  const stars = await getGithubStars();

  return (
    <>
      {/* Hero — copy left, a chart you can actually scrub on the right. */}
      <FrameBand dots>
        <section className="container grid gap-10 py-14 md:py-18 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
          <div className="text-center md:text-left">
            <div className="enter-fx flex justify-center md:justify-start" style={step(0)}>
              <Eyebrow>Charts</Eyebrow>
            </div>
            <h1
              className="enter-fx mx-auto mt-5 max-w-[24ch] font-spectral text-[32px] leading-[1.04] tracking-[-1.2px] text-[#111110] dark:text-neutral-50 md:mx-0 md:text-[44px]"
              style={step(1)}
            >
            Beautiful React Charts
              <br/>
              for Modern Web Apps
            </h1>
            <p
              className="enter-fx mx-auto mt-4 max-w-[46ch] font-inter text-[15.5px] leading-[1.6] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:mx-0 md:text-[16.5px]"
              style={step(2)}
            >
              Candlesticks, order books, depth and cohorts the set shadcn/ui
              leaves out, on a dependency-free SVG engine.
            </p>

            <div className="enter-fx mt-7 flex flex-col gap-3 md:flex-row" style={step(3)}>
              <Link
                href="/charts/market"
                className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#111110] px-5 font-inter text-[14px] font-medium text-white transition-[transform,background-color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#f9452d] dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-[#E1F435] md:w-auto"
              >
                Browse the charts
                <ArrowRight className="size-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-border px-5 font-inter text-[14px] font-medium text-[#111110] transition-[transform,border-color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:border-[#111110] dark:text-neutral-100 dark:hover:border-neutral-100 md:w-auto"
              >
                <Icons.gitHub className="size-3.5" />
                Star on GitHub
                {stars !== null ? (
                  <span className="ml-0.5 border-l border-border pl-2 font-mono text-[12px] tabular-nums text-[#080808]/55 dark:text-neutral-400">
                    {formatStars(stars)}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>

          <div className="enter-fx" style={step(4)}>
            <HeroChart />
          </div>
        </section>
      </FrameBand>

      {/* The index */}
      <FrameBand border="none">
        <section className="container pt-14 md:pt-18">
          <Eyebrow>Every chart</Eyebrow>
          <h2 className="mt-5 max-w-[20ch] font-spectral text-[26px] leading-[1.08] tracking-[-0.9px] text-[#111110] dark:text-neutral-50 md:text-[34px]">
            Live previews, not screenshots
          </h2>
          <p className="mt-4 max-w-[52ch] font-inter text-[15.5px] leading-[1.6] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[16px]">
            Every cell below is the real component running on this page. Open one
            for the variants, the props, and the source.
          </p>
        </section>
        <div className="container mt-10 px-0 xl:px-0">
          <div className="border-t border-border">
            <ChartsIndex />
          </div>
        </div>
      </FrameBand>
    </>
  );
}
