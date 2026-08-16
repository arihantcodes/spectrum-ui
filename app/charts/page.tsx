import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon';
import { siteConfig } from '@/config/site';
import { ChartStage } from './chart-stage';

export const metadata: Metadata = baseMetadata({
  title: 'Animated React Charts',
  description:
    'A full-viewport gallery of Spectrum UI chart components. Copy-paste React source for Next.js, Tailwind CSS, Recharts, and Motion. Built for product, trading, and onchain dashboards.',
  keywords: [
    'React charts',
    'animated chart components',
    'Recharts gallery',
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
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'spectrum-ui',
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export default async function ChartsLandingPage() {
  const stars = await getGithubStars();

  return (
    <div className="bg-background relative flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden lg:h-[calc(100dvh-3.5rem)]">
      <section className="relative z-10 flex flex-col justify-center px-6 pt-16 pb-10 sm:px-12 lg:h-full lg:w-[44%] lg:min-w-[26rem] lg:items-center lg:px-12 lg:pt-0 lg:pb-0">
        <div className="flex w-full max-w-md flex-col gap-7">
          <h1 className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-neutral-900 p-1.5 dark:bg-white">
              <Icons.logo className="h-full w-full text-white dark:text-black" />
            </span>
            <span className="font-spectral text-[2rem] leading-none font-light tracking-[-0.04em] text-neutral-950 dark:text-white">
              Spectrum Charts
            </span>
          </h1>
          <p className="text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            Animated chart components for product dashboards, trading UIs, and
            Solana apps. Built on Recharts and Motion — copy, paste, and ship.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full">
              <Link href="/charts/bar">
                Browse charts
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Icons.gitHub className="size-3.5" />
                Star on GitHub
                {stars !== null ? (
                  <span className="border-l border-neutral-200 pl-1.5 font-mono text-xs tabular-nums text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                    {formatStars(stars)}
                  </span>
                ) : null}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="relative h-[56dvh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <ChartStage className="absolute inset-0" />
        <div
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b lg:hidden"
        />
        <div
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-linear-to-r lg:block"
        />
      </div>
    </div>
  );
}
