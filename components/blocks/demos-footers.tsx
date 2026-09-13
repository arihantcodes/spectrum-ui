'use client';

import { AskDocsFooter } from '@/components/spectrumui/blocks/footers/ask-docs-footer';
import { CareersFooter } from '@/components/spectrumui/blocks/footers/careers-footer';
import { ContactCardFooter } from '@/components/spectrumui/blocks/footers/contact-card-footer';
import { LinkSearchFooter } from '@/components/spectrumui/blocks/footers/link-search-footer';
import { MegaSitemapFooter } from '@/components/spectrumui/blocks/footers/mega-sitemap-footer';
import { MinimalFooter } from '@/components/spectrumui/blocks/footers/minimal-footer';
import { NeuralGridFooter } from '@/components/spectrumui/blocks/footers/neural-grid-footer';
import { NewsletterFooter } from '@/components/spectrumui/blocks/footers/newsletter-footer';
import { PolicyFooter } from '@/components/spectrumui/blocks/footers/policy-footer';
import { RegionPickerFooter } from '@/components/spectrumui/blocks/footers/region-picker-footer';
import { ReleaseFeedFooter } from '@/components/spectrumui/blocks/footers/release-feed-footer';
import { SalesCtaFooter } from '@/components/spectrumui/blocks/footers/sales-cta-footer';
import { ServiceStatusFooter } from '@/components/spectrumui/blocks/footers/service-status-footer';
import { SocialProofFooter } from '@/components/spectrumui/blocks/footers/social-proof-footer';
import { TokenStreamFooter } from '@/components/spectrumui/blocks/footers/token-stream-footer';
import { TrustCenterFooter } from '@/components/spectrumui/blocks/footers/trust-center-footer';
import { WaitlistFooter } from '@/components/spectrumui/blocks/footers/waitlist-footer';
import { WordmarkSpotlightFooter } from '@/components/spectrumui/blocks/footers/wordmark-spotlight-footer';
import { SPECTRUM } from '@/components/spectrumui/blocks/footers/footer-kit';
import {
  SPECTRUM_ANSWER,
  SPECTRUM_CITATIONS,
  SPECTRUM_COLUMNS,
  SPECTRUM_COMPLIANCE,
  SPECTRUM_CONTACT,
  SPECTRUM_COOKIES,
  SPECTRUM_INCIDENTS,
  SPECTRUM_MANIFESTO,
  SPECTRUM_META,
  SPECTRUM_PROMPTS,
  SPECTRUM_REGIONS,
  SPECTRUM_RELEASES,
  SPECTRUM_ROLES,
  SPECTRUM_SERVICES,
  SPECTRUM_SITEMAP,
  SPECTRUM_STATS,
  SPECTRUM_UTILITY,
  SPECTRUM_WAITLIST_AVATARS,
} from '@/components/spectrumui/blocks/footers/_fixtures/spectrum';

/**
 * Live footer demos, keyed by block slug.
 *
 * Footers are the one block type whose whole point is page width, so these
 * render on a bleed stage rather than the padded one the AI blocks use. `Frame`
 * wraps every demo so the block sits flush against the stage edges while the
 * stage itself stays scroll-safe.
 *
 * Every preview is Spectrum UI. The wave shipped with three invented companies
 * and read as three unrelated demos; dogfooding is the stronger showing, and
 * the links go to real routes rather than to `#`.
 */

/** Blocks sit flush to the stage edges; the stage handles the rounded corners. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

const SHORT_GROUPS = SPECTRUM_SITEMAP.slice(0, 4).map((group) => ({
  title: group.title,
  links: group.links.slice(0, 5),
}));

/* ── Mega Sitemap ───────────────────────────────────────── */

function MegaSitemapDemo({ variant }: { variant: 'Expanded' | 'Compact' }) {
  return (
    <Frame>
      <MegaSitemapFooter
        brand={SPECTRUM.name}
        tagline={`${SPECTRUM.tagline} Fifty-eight components and ninety-three blocks, installed with the shadcn CLI or copied straight out of the page.`}
        columns={SPECTRUM_COLUMNS}
        legal={SPECTRUM_UTILITY}
        regions={SPECTRUM_REGIONS.map((region) => region.name)}
        languages={['English (US)', 'Deutsch', '日本語', 'Português']}
        newsletter={{
          eyebrow: 'The Spectrum brief',
          blurb: 'New blocks, breaking changes and the occasional teardown. Once a month.',
          cta: 'Subscribe',
        }}
        copyright={SPECTRUM.copyright}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Trust Center ───────────────────────────────────────── */

function TrustCenterDemo({ variant }: { variant: 'Badges' | 'Detailed' }) {
  return (
    <Frame>
      <TrustCenterFooter
        brand={SPECTRUM.name}
        badges={SPECTRUM_COMPLIANCE}
        groups={SHORT_GROUPS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        regions={SPECTRUM_REGIONS}
        groups={SHORT_GROUPS}
        note="Docs and registry are served from the edge in every region. Nothing you install leaves your machine."
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        services={SPECTRUM_SERVICES}
        incidents={SPECTRUM_INCIDENTS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        headline="Priced per seat until it should not be."
        blurb="Move the slider for an indicative annual figure. Anything above four hundred seats is quoted, not listed."
        groups={SHORT_GROUPS.slice(0, 3)}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        groups={SPECTRUM_SITEMAP}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        headline="We are hiring design engineers who read the source."
        roles={SPECTRUM_ROLES}
        groups={SHORT_GROUPS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        legalName={SPECTRUM.name}
        categories={SPECTRUM_COOKIES.map((category) => ({
          id: category.id,
          label: category.label,
          description: category.blurb,
          locked: category.required,
        }))}
        legal={SPECTRUM_UTILITY}
        entities={['Spectrum UI', 'ui.spectrumhq.in', 'Registry CDN']}
        copyright={SPECTRUM.copyright}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Ask the docs ───────────────────────────────────────── */

function AskDocsDemo({ variant }: { variant: 'Inline' | 'Expanded' }) {
  return (
    <Frame>
      <AskDocsFooter
        brand={SPECTRUM.name}
        headline="Ask the docs anything."
        placeholder="How do I install a block?"
        suggestions={SPECTRUM_PROMPTS}
        groups={SHORT_GROUPS}
        answer={SPECTRUM_ANSWER}
        citations={SPECTRUM_CITATIONS.map((citation, index) => ({
          index: index + 1,
          title: citation.label,
          href: citation.href,
        }))}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        wordmark="SPECTRUM"
        tagline={SPECTRUM.tagline}
        groups={SHORT_GROUPS}
        legal={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        manifesto={SPECTRUM_MANIFESTO}
        meta={SPECTRUM_META}
        groups={SHORT_GROUPS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        headline="Every component readable, every animation in CSS."
        groups={SHORT_GROUPS}
        legal={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        releases={SPECTRUM_RELEASES}
        changelogHref="/changelog"
        groups={SHORT_GROUPS.slice(0, 3)}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        headline="One short email when something worth copying ships."
        blurb="New blocks, breaking changes and the occasional teardown. No drip sequence."
        cadence="Roughly monthly · 2,400 readers"
        readers={SPECTRUM_WAITLIST_AVATARS}
        groups={SHORT_GROUPS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        blurb="Real people answer. Usually within a working day."
        email={SPECTRUM_CONTACT.email}
        phone={SPECTRUM_CONTACT.phone}
        address={SPECTRUM_CONTACT.address}
        hours={SPECTRUM_CONTACT.hours}
        utcOffset={SPECTRUM_CONTACT.utcOffset}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
        variant={variant}
      />
    </Frame>
  );
}

/* ── Logo Wall ──────────────────────────────────────────── */

function SocialProofDemo({ variant }: { variant: 'Marquee' | 'Grid' }) {
  return (
    <Frame>
      <SocialProofFooter
        brand={SPECTRUM.name}
        stats={SPECTRUM_STATS}
        eyebrow="Shipping on Spectrum UI"
        groups={SHORT_GROUPS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        clusters={SHORT_GROUPS}
        copyright={SPECTRUM.copyright}
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
        brand={SPECTRUM.name}
        headline="Spectrum Pro. Get in before we open the doors."
        blurb="Templates, Figma kits and the private blocks. Invites go out in the order they were requested."
        avatars={SPECTRUM_WAITLIST_AVATARS}
        links={SPECTRUM_UTILITY}
        copyright={SPECTRUM.copyright}
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
  'ask-docs-footer': (variant) => <AskDocsDemo variant={variant as 'Inline' | 'Expanded'} />,
  'wordmark-spotlight-footer': (variant) => (
    <WordmarkSpotlightDemo variant={variant as 'Spotlight' | 'Static'} />
  ),
  'token-stream-footer': (variant) => <TokenStreamDemo variant={variant as 'Stream' | 'Instant'} />,
  'neural-grid-footer': (variant) => (
    <NeuralGridDemo variant={variant as 'Lattice' | 'Constellation'} />
  ),
  'release-feed-footer': (variant) => <ReleaseFeedDemo variant={variant as 'Feed' | 'Compact'} />,
  'newsletter-footer': (variant) => <NewsletterDemo variant={variant as 'Panel' | 'Inline'} />,
  'contact-card-footer': (variant) => <ContactCardDemo variant={variant as 'Card' | 'Row'} />,
  'social-proof-footer': (variant) => <SocialProofDemo variant={variant as 'Marquee' | 'Grid'} />,
  'minimal-footer': (variant) => <MinimalDemo variant={variant as 'Bar' | 'Centered'} />,
  'waitlist-footer': (variant) => <WaitlistDemo variant={variant as 'Waitlist' | 'Launched'} />,
};
