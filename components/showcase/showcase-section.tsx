'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { AnimateEnter } from '@/app/home/AnimateEnter';

import { AccountAccessCard } from './account-access-card';
import { AIChatCard } from './ai-chat-card';
import { CommandSearch } from './command-search';
import { FAQTabsCard } from './faq-tabs-card';
import { NavListCard, SUPPORT_NAV_ITEMS } from './nav-list-card';
import { RecentActivity } from './recent-activity';
import { TransferFundsCard } from './transfer-funds-card';

export interface ShowcaseSectionProps {
  tag?: string;
  heading?: string;
  className?: string;
  /** Replace the default card grid entirely. */
  children?: React.ReactNode;
}

// Scroll reveal on top of the stall-proof CSS reveal: content is visible at
// rest and only hidden pre-paint when it starts below the fold.
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <AnimateEnter delay={delay} className={className}>
      {children}
    </AnimateEnter>
  );
}

export function ShowcaseSection({
  tag = 'Showcase',
  heading = "Everything you'll want to steal.",
  className,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className={cn('px-4 pb-14 pt-[38px] sm:px-8 lg:px-[50px]', className)}>
      {/* Header */}
      <AnimateEnter duration={0.5} className="flex flex-col items-center gap-[3px] text-center">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
          />
          <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
            {tag}
          </span>
        </span>
        <h2 className="font-spectral text-2xl leading-[28.8px] tracking-[-1px] text-[#2d2f2e] dark:text-neutral-200">
          {heading}
        </h2>
      </AnimateEnter>

      {/* Card grid */}
      {children ?? (
        <div className="mt-9 grid grid-cols-1 items-start gap-3.5 md:grid-cols-2 lg:grid-cols-[512fr_330fr_378fr]">
          {/* Left column */}
          <div className="flex min-w-0 flex-col gap-3.5 md:col-span-2 lg:col-span-1">
            <Reveal>
              <CommandSearch />
            </Reveal>
            <Reveal delay={0.08}>
              <RecentActivity />
            </Reveal>
          </div>

          {/* Middle column */}
          <div className="flex min-w-0 flex-col gap-3.5">
            <Reveal delay={0.08}>
              <AccountAccessCard />
            </Reveal>
            <Reveal delay={0.16}>
              <AIChatCard className="min-h-[560px]" />
            </Reveal>
            <Reveal delay={0.24} className="grid grid-cols-2 items-start gap-3">
              <NavListCard />
              <NavListCard title="Support" items={SUPPORT_NAV_ITEMS} />
            </Reveal>
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-col gap-3.5">
            <Reveal delay={0.16}>
              <TransferFundsCard />
            </Reveal>
            <Reveal delay={0.24}>
              <FAQTabsCard />
            </Reveal>
          </div>
        </div>
      )}
    </section>
  );
}
