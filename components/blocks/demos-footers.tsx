'use client';

import { useSyncExternalStore } from 'react';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { ApiPlaygroundFooter } from '@/components/spectrumui/blocks/footers/api-playground-footer';
import { AskDocsFooter } from '@/components/spectrumui/blocks/footers/ask-docs-footer';
import { BigTypeFooter } from '@/components/spectrumui/blocks/footers/big-type-footer';
import { CareersFooter } from '@/components/spectrumui/blocks/footers/careers-footer';
import { CommandFooter } from '@/components/spectrumui/blocks/footers/command-footer';
import { ContactCardFooter } from '@/components/spectrumui/blocks/footers/contact-card-footer';
import { LinkSearchFooter } from '@/components/spectrumui/blocks/footers/link-search-footer';
import { MarqueeCtaFooter } from '@/components/spectrumui/blocks/footers/marquee-cta-footer';
import { MegaSitemapFooter } from '@/components/spectrumui/blocks/footers/mega-sitemap-footer';
import { MinimalFooter } from '@/components/spectrumui/blocks/footers/minimal-footer';
import { ModelStatusFooter } from '@/components/spectrumui/blocks/footers/model-status-footer';
import { NeuralGridFooter } from '@/components/spectrumui/blocks/footers/neural-grid-footer';
import { NewsletterFooter } from '@/components/spectrumui/blocks/footers/newsletter-footer';
import { ParallaxRevealFooter } from '@/components/spectrumui/blocks/footers/parallax-reveal-footer';
import { PolicyFooter } from '@/components/spectrumui/blocks/footers/policy-footer';
import { RegionPickerFooter } from '@/components/spectrumui/blocks/footers/region-picker-footer';
import { ReleaseFeedFooter } from '@/components/spectrumui/blocks/footers/release-feed-footer';
import { SalesCtaFooter } from '@/components/spectrumui/blocks/footers/sales-cta-footer';
import { ServiceStatusFooter } from '@/components/spectrumui/blocks/footers/service-status-footer';
import { SocialProofFooter } from '@/components/spectrumui/blocks/footers/social-proof-footer';
import { StudioFooter } from '@/components/spectrumui/blocks/footers/studio-footer';
import { TokenStreamFooter } from '@/components/spectrumui/blocks/footers/token-stream-footer';
import { TrustCenterFooter } from '@/components/spectrumui/blocks/footers/trust-center-footer';
import { WaitlistFooter } from '@/components/spectrumui/blocks/footers/waitlist-footer';
import { WordmarkSpotlightFooter } from '@/components/spectrumui/blocks/footers/wordmark-spotlight-footer';
import {
  CORMORANT,
  CORMORANT_ANSWER,
  CORMORANT_COMMANDS,
  CORMORANT_ENDPOINTS,
  CORMORANT_LINKS,
  CORMORANT_MANIFESTO,
  CORMORANT_MODELS,
  CORMORANT_RELEASES,
  FERNPOST,
  FERNPOST_ACCENTS,
  FERNPOST_LINKS,
  FERNPOST_NOW,
  FERNPOST_SOCIALS,
  FERNPOST_STATS,
  FERNPOST_WAITLIST_AVATARS,
  NORTHGATE,
  NORTHGATE_COLUMNS,
  NORTHGATE_COMPLIANCE,
  NORTHGATE_COOKIE_CATEGORIES,
  NORTHGATE_INCIDENTS,
  NORTHGATE_LEGAL,
  NORTHGATE_REGIONS,
  NORTHGATE_ROLES,
  NORTHGATE_SERVICES,
  NORTHGATE_SITEMAP,
} from '@/components/spectrumui/blocks/footers/_fixtures/brands';

/**
 * Live footer demos, keyed by block slug.
 *
 * Footers are the one block type whose whole point is page width, so these
 * render on a bleed stage rather than the padded one the AI blocks use. Two
 * consequences show up throughout this file:
 *
 *   - `Frame` wraps every demo so the block sits flush against the stage edges
 *     while the stage itself stays scroll-safe.
 *   - Anything that only reads correctly under real page scroll (the parallax
 *     reveal) gets a scroll container built for it here, not in the block.
 *
 * Copy comes from three fixture brands — Northgate (enterprise), Cormorant
 * (AI), Fernpost (small product) — so a reader scrolling the page sees three
 * coherent companies rather than twenty-five unrelated placeholders.
 */

const NORTHGATE_COPYRIGHT = `© ${NORTHGATE.founded}–2026 ${NORTHGATE.legalName}`;
const CORMORANT_COPYRIGHT = `© 2026 ${CORMORANT.legalName}`;
const FERNPOST_COPYRIGHT = `© 2026 ${FERNPOST.legalName}`;

const NORTHGATE_UTILITY = NORTHGATE_LEGAL.slice(0, 4);
const CORMORANT_UTILITY = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Usage policy', href: '#' },
  { label: 'Status', href: '#' },
];
const FERNPOST_UTILITY = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Status', href: '#' },
];

/** Blocks sit flush to the stage edges; the stage handles the rounded corners. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/* ── Mega Sitemap ───────────────────────────────────────── */

const NORTHGATE_SOCIAL_ICONS = [
  { label: 'LinkedIn', href: '#', icon: <Linkedin className="size-4" /> },
  { label: 'GitHub', href: '#', icon: <Github className="size-4" /> },
  { label: 'X', href: '#', icon: <Twitter className="size-4" /> },
  { label: 'YouTube', href: '#', icon: <Youtube className="size-4" /> },
];

function MegaSitemapDemo({ variant }: { variant: 'Expanded' | 'Compact' }) {
  return (
    <Frame>
      <MegaSitemapFooter
        brand={NORTHGATE.legalName}
        tagline={`${NORTHGATE.tagline} Ingest, govern and query regulated data across six regions, with residency and lineage guaranteed end to end.`}
        columns={NORTHGATE_COLUMNS}
        legal={NORTHGATE_LEGAL}
        socials={NORTHGATE_SOCIAL_ICONS}
        regions={NORTHGATE_REGIONS.map((region) => region.name)}
        languages={['English (US)', 'Deutsch', '日本語', 'Português']}
        newsletter={{
          eyebrow: 'The infrastructure brief',
          blurb:
            'Architecture notes, incident write-ups and release detail. Once a month, no marketing.',
          cta: 'Subscribe',
        }}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Trust Center ───────────────────────────────────────── */

/* A trust footer's columns are shorter than a sitemap's — four links each, so
   the row reads as navigation rather than as a second sitemap. */
const TRUST_COLUMNS = NORTHGATE_SITEMAP.slice(0, 4).map((group) => ({
  title: group.title,
  links: group.links.slice(0, 4),
}));

function TrustCenterDemo({ variant }: { variant: 'Badges' | 'Detailed' }) {
  return (
    <Frame>
      <TrustCenterFooter
        brand={NORTHGATE.name}
        badges={NORTHGATE_COMPLIANCE}
        groups={TRUST_COLUMNS}
        links={NORTHGATE_UTILITY}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Region Picker ──────────────────────────────────────── */

function RegionPickerDemo({ variant }: { variant: 'Popover' | 'Inline' }) {
  return (
    <Frame>
      <RegionPickerFooter
        brand={NORTHGATE.name}
        regions={NORTHGATE_REGIONS}
        groups={NORTHGATE_SITEMAP.slice(0, 4)}
        links={NORTHGATE_UTILITY}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Service Status ─────────────────────────────────────── */

function ServiceStatusDemo({ variant }: { variant: 'Grid' | 'Bar' }) {
  return (
    <Frame>
      <ServiceStatusFooter
        brand={NORTHGATE.name}
        services={NORTHGATE_SERVICES}
        incidents={NORTHGATE_INCIDENTS}
        links={NORTHGATE_UTILITY}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Sales CTA ──────────────────────────────────────────── */

function SalesCtaDemo({ variant }: { variant: 'Split' | 'Stacked' }) {
  return (
    <Frame>
      <SalesCtaFooter
        brand={NORTHGATE.name}
        groups={NORTHGATE_SITEMAP.slice(0, 3)}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Link Search ────────────────────────────────────────── */

function LinkSearchDemo({ variant }: { variant: 'Search' | 'Browse' }) {
  return (
    <Frame>
      <LinkSearchFooter
        brand={NORTHGATE.name}
        groups={NORTHGATE_SITEMAP}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Careers ────────────────────────────────────────────── */

function CareersDemo({ variant }: { variant: 'Ticker' | 'List' }) {
  return (
    <Frame>
      <CareersFooter
        brand={NORTHGATE.name}
        roles={NORTHGATE_ROLES}
        groups={TRUST_COLUMNS}
        links={NORTHGATE_UTILITY}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Policy ─────────────────────────────────────────────── */

function PolicyDemo({ variant }: { variant: 'Bar' | 'Panel' }) {
  return (
    <Frame>
      <PolicyFooter
        brand={NORTHGATE.name}
        legalName={NORTHGATE.legalName}
        categories={NORTHGATE_COOKIE_CATEGORIES}
        legal={NORTHGATE_LEGAL}
        entities={['Northgate Systems GmbH', 'Northgate Systems UK Ltd', 'Northgate KK']}
        copyright={NORTHGATE_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Model Status ───────────────────────────────────────── */

function ModelStatusDemo({ variant }: { variant: 'Grid' | 'Row' }) {
  return (
    <Frame>
      <ModelStatusFooter
        brand={CORMORANT.name}
        models={CORMORANT_MODELS}
        groups={CORMORANT_LINKS}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Command ────────────────────────────────────────────── */

function CommandDemo({ variant }: { variant: 'Terminal' | 'Prompt' }) {
  return (
    <Frame>
      <CommandFooter
        brand={CORMORANT.name}
        commands={CORMORANT_COMMANDS}
        links={CORMORANT_UTILITY}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Ask Docs ───────────────────────────────────────────── */

function AskDocsDemo({ variant }: { variant: 'Inline' | 'Expanded' }) {
  return (
    <Frame>
      <AskDocsFooter
        key={variant}
        brand={CORMORANT.name}
        placeholder={CORMORANT_ANSWER.question}
        suggestions={['Rate limits', 'Tool use', 'Batch pricing']}
        answer={CORMORANT_ANSWER.answer}
        citations={CORMORANT_ANSWER.citations}
        links={CORMORANT_UTILITY}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Wordmark Spotlight ─────────────────────────────────── */

function WordmarkSpotlightDemo({ variant }: { variant: 'Spotlight' | 'Static' }) {
  return (
    <Frame>
      <WordmarkSpotlightFooter
        wordmark={CORMORANT.wordmark}
        tagline={CORMORANT.tagline}
        groups={CORMORANT_LINKS}
        legal={CORMORANT_UTILITY}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Token Stream ───────────────────────────────────────── */

function TokenStreamDemo({ variant }: { variant: 'Stream' | 'Instant' }) {
  return (
    <Frame>
      <TokenStreamFooter
        key={variant}
        brand={CORMORANT.legalName}
        manifesto={CORMORANT_MANIFESTO}
        groups={CORMORANT_LINKS}
        meta={[
          { label: 'Median p50', value: '210 ms' },
          { label: 'Uptime, 90d', value: '99.98%' },
          { label: 'Regions', value: '6' },
          { label: 'Models', value: '5 in GA' },
        ]}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Neural Grid ────────────────────────────────────────── */

function NeuralGridDemo({ variant }: { variant: 'Lattice' | 'Constellation' }) {
  return (
    <Frame>
      <NeuralGridFooter
        brand={CORMORANT.legalName}
        groups={CORMORANT_LINKS}
        legal={CORMORANT_UTILITY}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Release Feed ───────────────────────────────────────── */

function ReleaseFeedDemo({ variant }: { variant: 'Feed' | 'Compact' }) {
  return (
    <Frame>
      <ReleaseFeedFooter
        brand={CORMORANT.legalName}
        releases={CORMORANT_RELEASES}
        groups={CORMORANT_LINKS.slice(0, 2)}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── API Playground ─────────────────────────────────────── */

function ApiPlaygroundDemo({ variant }: { variant: 'Curl' | 'Python' }) {
  return (
    <Frame>
      <ApiPlaygroundFooter
        brand={CORMORANT.legalName}
        endpoints={CORMORANT_ENDPOINTS}
        groups={CORMORANT_LINKS.slice(1, 3)}
        copyright={CORMORANT_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Newsletter ─────────────────────────────────────────── */

function NewsletterDemo({ variant }: { variant: 'Panel' | 'Inline' }) {
  return (
    <Frame>
      <NewsletterFooter
        brand={FERNPOST.name}
        groups={FERNPOST_LINKS}
        socials={FERNPOST_SOCIALS}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Contact Card ───────────────────────────────────────── */

function ContactCardDemo({ variant }: { variant: 'Card' | 'Row' }) {
  return (
    <Frame>
      <ContactCardFooter
        brand={FERNPOST.name}
        email={FERNPOST.email}
        phone={FERNPOST.phone}
        address={FERNPOST.address}
        hours={FERNPOST.hours}
        utcOffset={FERNPOST.utcOffset}
        links={FERNPOST_UTILITY}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Social Proof ───────────────────────────────────────── */

function SocialProofDemo({ variant }: { variant: 'Marquee' | 'Grid' }) {
  return (
    <Frame>
      <SocialProofFooter
        brand={FERNPOST.name}
        stats={FERNPOST_STATS}
        links={FERNPOST_UTILITY}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Minimal ────────────────────────────────────────────── */

function MinimalDemo({ variant }: { variant: 'Bar' | 'Centered' }) {
  return (
    <Frame>
      <MinimalFooter
        brand={FERNPOST.name}
        clusters={FERNPOST_LINKS.map((group) => ({ title: group.title, links: group.links }))}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Big Type ───────────────────────────────────────────── */

function BigTypeDemo({ variant }: { variant: 'Fill' | 'Outline' }) {
  return (
    <Frame>
      <BigTypeFooter
        wordmark={FERNPOST.name}
        tagline={FERNPOST.tagline}
        columns={FERNPOST_LINKS}
        cta={{ label: 'Start a free workspace', href: '#' }}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Parallax Reveal ────────────────────────────────────── */

/**
 * The reveal only exists relative to a scroll container, so the demo supplies
 * one: a short scrollable page whose content slides up off the pinned footer.
 * Under reduced motion the sticky illusion is pointless, so it renders flat.
 */
function ParallaxRevealDemo({ variant }: { variant: 'Reveal' | 'Fixed' }) {
  const reduced = usePrefersReducedMotion();

  if (variant === 'Fixed' || reduced) {
    return (
      <Frame>
        <ParallaxRevealFooter
          brand={FERNPOST.name}
          columns={FERNPOST_LINKS}
          cta={{ label: 'Read the docs', href: '#' }}
          copyright={FERNPOST_COPYRIGHT}
          variant="Fixed"
        />
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="h-[420px] overflow-y-auto">
        <ParallaxRevealFooter
          brand={FERNPOST.name}
          columns={FERNPOST_LINKS}
          cta={{ label: 'Read the docs', href: '#' }}
          copyright={FERNPOST_COPYRIGHT}
          variant="Reveal"
        >
          <div className="px-6 py-14">
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.09em] text-neutral-400 dark:text-neutral-600">
              Scroll this panel
            </p>
            <h3 className="mt-3 max-w-[18ch] text-balance text-[30px] font-semibold leading-[1.12] tracking-[-1px] text-neutral-900 dark:text-neutral-50">
              The page lifts off the footer.
            </h3>
            <p className="mt-3 max-w-[52ch] text-pretty text-[13.5px] leading-[1.7] text-neutral-500 dark:text-neutral-400">
              The footer is pinned to the bottom of the scroll container from the start. What moves
              is the page above it, which carries an opaque background and a soft shadow so the edge
              reads as a lifted sheet rather than a seam.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Dashboards', 'Funnels', 'Retention'].map((title) => (
                <div
                  key={title}
                  className="rounded-xl border border-black/[0.07] px-4 py-6 text-[13px] text-neutral-500 dark:border-white/[0.08] dark:text-neutral-400"
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="mt-8 h-[180px] rounded-xl border border-dashed border-black/[0.09] dark:border-white/[0.09]" />
          </div>
        </ParallaxRevealFooter>
      </div>
    </Frame>
  );
}

/* ── Marquee CTA ────────────────────────────────────────── */

function MarqueeCtaDemo({ variant }: { variant: 'Band' | 'Ribbon' }) {
  return (
    <Frame>
      <MarqueeCtaFooter
        brand={FERNPOST.name}
        phrases={[
          'Ship the dashboard today',
          'No sales call required',
          'Free under 10k events',
          'Import from anywhere',
        ]}
        columns={FERNPOST_LINKS}
        socials={FERNPOST_SOCIALS}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Studio ─────────────────────────────────────────────── */

function StudioDemo({ variant }: { variant: 'Studio' | 'Quiet' }) {
  return (
    <Frame>
      <StudioFooter
        brand={FERNPOST.name}
        accents={FERNPOST_ACCENTS}
        now={FERNPOST_NOW}
        columns={FERNPOST_LINKS.slice(0, 2)}
        socials={FERNPOST_SOCIALS}
        utcOffset={FERNPOST.utcOffset}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Waitlist ───────────────────────────────────────────── */

function WaitlistDemo({ variant }: { variant: 'Waitlist' | 'Launched' }) {
  return (
    <Frame>
      <WaitlistFooter
        key={variant}
        brand={FERNPOST.name}
        avatars={FERNPOST_WAITLIST_AVATARS}
        links={FERNPOST_UTILITY}
        copyright={FERNPOST_COPYRIGHT}
        variant={variant}
      />
    </Frame>
  );
}

export const FOOTER_DEMOS: Record<string, (variant: string) => React.ReactNode> = {
  'mega-sitemap-footer': (variant) => (
    <MegaSitemapDemo variant={variant as 'Expanded' | 'Compact'} />
  ),
  'trust-center-footer': (variant) => (
    <TrustCenterDemo variant={variant as 'Badges' | 'Detailed'} />
  ),
  'region-picker-footer': (variant) => (
    <RegionPickerDemo variant={variant as 'Popover' | 'Inline'} />
  ),
  'service-status-footer': (variant) => <ServiceStatusDemo variant={variant as 'Grid' | 'Bar'} />,
  'sales-cta-footer': (variant) => <SalesCtaDemo variant={variant as 'Split' | 'Stacked'} />,
  'link-search-footer': (variant) => <LinkSearchDemo variant={variant as 'Search' | 'Browse'} />,
  'careers-footer': (variant) => <CareersDemo variant={variant as 'Ticker' | 'List'} />,
  'policy-footer': (variant) => <PolicyDemo variant={variant as 'Bar' | 'Panel'} />,
  'model-status-footer': (variant) => <ModelStatusDemo variant={variant as 'Grid' | 'Row'} />,
  'command-footer': (variant) => <CommandDemo variant={variant as 'Terminal' | 'Prompt'} />,
  'ask-docs-footer': (variant) => <AskDocsDemo variant={variant as 'Inline' | 'Expanded'} />,
  'wordmark-spotlight-footer': (variant) => (
    <WordmarkSpotlightDemo variant={variant as 'Spotlight' | 'Static'} />
  ),
  'token-stream-footer': (variant) => <TokenStreamDemo variant={variant as 'Stream' | 'Instant'} />,
  'neural-grid-footer': (variant) => (
    <NeuralGridDemo variant={variant as 'Lattice' | 'Constellation'} />
  ),
  'release-feed-footer': (variant) => <ReleaseFeedDemo variant={variant as 'Feed' | 'Compact'} />,
  'api-playground-footer': (variant) => (
    <ApiPlaygroundDemo variant={variant as 'Curl' | 'Python'} />
  ),
  'newsletter-footer': (variant) => <NewsletterDemo variant={variant as 'Panel' | 'Inline'} />,
  'contact-card-footer': (variant) => <ContactCardDemo variant={variant as 'Card' | 'Row'} />,
  'social-proof-footer': (variant) => <SocialProofDemo variant={variant as 'Marquee' | 'Grid'} />,
  'minimal-footer': (variant) => <MinimalDemo variant={variant as 'Bar' | 'Centered'} />,
  'big-type-footer': (variant) => <BigTypeDemo variant={variant as 'Fill' | 'Outline'} />,
  'parallax-reveal-footer': (variant) => (
    <ParallaxRevealDemo variant={variant as 'Reveal' | 'Fixed'} />
  ),
  'marquee-cta-footer': (variant) => <MarqueeCtaDemo variant={variant as 'Band' | 'Ribbon'} />,
  'studio-footer': (variant) => <StudioDemo variant={variant as 'Studio' | 'Quiet'} />,
  'waitlist-footer': (variant) => <WaitlistDemo variant={variant as 'Waitlist' | 'Launched'} />,
};
