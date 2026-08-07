import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Download, FileArchive } from 'lucide-react';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { AnimateEnter } from '@/app/home/AnimateEnter';
import { JsonLd } from '@/components/seo/json-ld';
import { Icons } from '@/components/icon';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { CopyButton } from './parts';

const url = `${siteConfig.url}/brandkit`;

export const metadata: Metadata = baseMetadata({
  title: 'Brand Kit',
  description:
    'Official Spectrum UI brand assets: logo mark and wordmark as SVG and PNG for light and dark backgrounds, plus typography, colors, and social links.',
  canonicalUrl: url,
});

/** The landing showcase-card treatment — layered ring shadow, no hard border. */
const CARD =
  'rounded-[24px] bg-white shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]';

const PILL_BUTTON =
  'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black px-6 font-inter text-[15px] font-medium text-white transition-[transform,background-color] duration-200 ease-out hover:bg-neutral-800 active:scale-[0.97] dark:bg-white dark:text-black dark:hover:bg-neutral-200';

type LogoAsset = {
  name: string;
  variant: 'Dark' | 'Light';
  note: string;
  base: string;
  pngSize: string;
  width: number;
  height: number;
  imgClass: string;
};

const LOGO_ASSETS: LogoAsset[] = [
  {
    name: 'Logo mark',
    variant: 'Dark',
    note: 'Use on light backgrounds.',
    base: 'spectrum-ui-mark-dark',
    pngSize: '901 × 1024',
    width: 35,
    height: 40,
    imgClass: 'h-24 w-auto sm:h-28',
  },
  {
    name: 'Logo mark',
    variant: 'Light',
    note: 'Use on dark backgrounds.',
    base: 'spectrum-ui-mark-light',
    pngSize: '901 × 1024',
    width: 35,
    height: 40,
    imgClass: 'h-24 w-auto sm:h-28',
  },
  {
    name: 'Wordmark',
    variant: 'Dark',
    note: 'Use on light backgrounds.',
    base: 'spectrum-ui-wordmark-dark',
    pngSize: '2400 × 452',
    width: 594,
    height: 112,
    imgClass: 'h-auto w-full max-w-sm',
  },
  {
    name: 'Wordmark',
    variant: 'Light',
    note: 'Use on dark backgrounds.',
    base: 'spectrum-ui-wordmark-light',
    pngSize: '2400 × 452',
    width: 594,
    height: 112,
    imgClass: 'h-auto w-full max-w-sm',
  },
];

const TYPEFACES = [
  {
    name: 'Spectral',
    role: 'Display',
    sample: 'The component library your AI agents are missing.',
    sampleClass: 'font-spectral font-light tracking-[-1px]',
    charsetClass: 'font-spectral font-light',
    token: 'font-spectral',
    detail: 'Serif · 300–700',
    href: 'https://fonts.google.com/specimen/Spectral',
    source: 'Google Fonts',
  },
  {
    name: 'Inter',
    role: 'Body',
    sample: 'Animation-ready components with copy-paste source.',
    sampleClass: 'font-inter tracking-[-0.4px]',
    charsetClass: 'font-inter',
    token: 'font-inter',
    detail: 'Sans · variable',
    href: 'https://fonts.google.com/specimen/Inter',
    source: 'Google Fonts',
  },
  {
    name: 'Geist Sans',
    role: 'Product UI',
    sample: 'Docs, blocks, and everything in between.',
    sampleClass: 'font-regular tracking-[-0.4px]',
    charsetClass: 'font-regular',
    token: 'font-regular',
    detail: 'Sans · variable',
    href: 'https://vercel.com/font',
    source: 'Vercel',
  },
  {
    name: 'Geist Mono',
    role: 'Labels & code',
    sample: 'UPPERCASE TAGS, FILENAMES, AND CODE.',
    sampleClass: 'font-mono tracking-[0.5px]',
    charsetClass: 'font-mono',
    token: 'font-mono',
    detail: 'Mono · variable',
    href: 'https://vercel.com/font',
    source: 'Vercel',
  },
];

const COLORS = [
  { name: 'Ink', hex: '#0A0A0A', role: 'Foreground' },
  { name: 'Paper', hex: '#FAFAFA', role: 'Surfaces' },
  { name: 'Orange', hex: '#F9452D', role: 'Light accent' },
  { name: 'Lime', hex: '#E1F435', role: 'Dark accent' },
];

const ABOUT_PARAGRAPHS = [
  'Spectrum UI is an open-source library of 250+ animation-ready blocks, components, and variants for React and Next.js, built with Tailwind CSS, Motion, TypeScript, and shadcn/ui.',
  'Every component ships as source code you own: copy it from the docs, install it with the shadcn CLI, or let your AI agent wire it in through the Spectrum UI MCP server.',
  'Spectrum UI is built by Arihant Jain and maintained in the open on GitHub under the MIT license.',
];

const FACTS = [
  { label: 'Product', value: 'Spectrum UI' },
  { label: 'Category', value: 'React component library' },
  { label: 'Library', value: '250+ blocks, components, and variants' },
  { label: 'Stack', value: 'Next.js, Tailwind CSS, Motion, TypeScript' },
  { label: 'License', value: 'MIT' },
  { label: 'Author', value: 'Arihant Jain' },
];

type IconProps = React.HTMLAttributes<SVGElement>;

const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const SOCIALS = [
  {
    name: 'X (Twitter)',
    handle: '@arihantcodes',
    href: siteConfig.links.twitter,
    Icon: Icons.twitter,
  },
  {
    name: 'GitHub',
    handle: 'arihantcodes/spectrum-ui',
    href: siteConfig.links.github,
    Icon: Icons.gitHub,
  },
  {
    name: 'LinkedIn',
    handle: 'in/arihantcodes',
    href: siteConfig.links.linkedin,
    Icon: LinkedInIcon,
  },
  {
    name: 'Instagram',
    handle: '@arihantjainn18',
    href: siteConfig.links.instagram,
    Icon: InstagramIcon,
  },
];

/** Chevron tag + Spectral heading — the landing section-header idiom. */
function SectionHeader({ tag, heading, sub }: { tag: string; heading: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
        />
        <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
          {tag}
        </span>
      </span>
      <h2 className="font-regular text-[22px] font-semibold leading-[1.2] tracking-[-0.5px] text-neutral-900 dark:text-neutral-100 sm:text-[24px]">
        {heading}
      </h2>
      {sub ? (
        <p className="max-w-[600px] font-inter text-[14px] leading-[21px] text-[#646464] dark:text-neutral-400">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/** Sections after the first share the changelog's dashed divider rhythm. */
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        'flex flex-col gap-8 border-t border-dashed border-black/[0.09] pt-12 dark:border-white/[0.09]',
        className,
      )}
    >
      {children}
    </section>
  );
}

function FileRow({ label, meta, href, kind }: { label: string; meta?: string; href: string; kind: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="min-w-0 truncate rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
        {label}
        {meta ? <span className="text-neutral-400 dark:text-neutral-500"> · {meta}</span> : null}
      </span>
      <a
        href={href}
        download
        className="shrink-0 font-inter text-xs font-medium text-neutral-900 underline-offset-4 transition-colors duration-200 ease-out hover:text-[#f9452d] hover:underline dark:text-neutral-100 dark:hover:text-[#E1F435]"
      >
        {kind}
      </a>
    </div>
  );
}

function LogoCard({ asset }: { asset: LogoAsset }) {
  const onLight = asset.variant === 'Dark';
  return (
    <div className={cn(CARD, 'overflow-hidden')}>
      <div
        className={cn(
          'flex min-h-52 items-center justify-center p-10 sm:min-h-60',
          onLight ? 'bg-white' : 'bg-[#0A0A0A]',
        )}
      >
        <Image
          src={`/brand/${asset.base}.svg`}
          alt={`Spectrum UI ${asset.name.toLowerCase()}, ${asset.variant.toLowerCase()} version`}
          width={asset.width}
          height={asset.height}
          className={asset.imgClass}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-4 border-t border-black/[0.06] p-5 dark:border-white/[0.08]">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
            {asset.name}
            <span className="text-neutral-400 dark:text-neutral-500"> — {asset.variant}</span>
          </h3>
          <p className="font-inter text-xs text-neutral-500 dark:text-neutral-400">{asset.note}</p>
        </div>
        <div className="grid gap-2">
          <FileRow label={`${asset.base}.svg`} href={`/brand/${asset.base}.svg`} kind="SVG" />
          <FileRow
            label={`${asset.base}.png`}
            meta={asset.pngSize}
            href={`/brand/${asset.base}.png`}
            kind="PNG"
          />
        </div>
      </div>
    </div>
  );
}

export default function BrandKitPage() {
  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Brand Kit', url },
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <JsonLd id="brandkit-breadcrumb" data={breadcrumb} />

      <div className="container-frame">
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 sm:px-8">
          {/* Header */}
          <AnimateEnter isWhileInView={false} className="pb-10 pt-14 lg:pt-20">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
              />
              <span className="font-mono text-xs font-medium uppercase leading-[16.8px] text-neutral-900 dark:text-neutral-100">
                Brand kit
              </span>
            </span>
            <h1 className="mt-3 font-regular text-[32px] font-semibold leading-[1.1] tracking-[-1.2px] text-black dark:text-white md:text-[38px]">
              Spectrum UI brand assets
            </h1>
            <p className="mt-4 max-w-[600px] font-inter text-[14px] leading-[21px] text-[#646464] dark:text-neutral-400">
              Logos, type, color, and links — everything you need to write about or link to
              Spectrum UI. Download files individually below, or grab the whole kit at once.
            </p>
          </AnimateEnter>

          {/* Download-everything card */}
          <AnimateEnter delay={0.12} isWhileInView={false}>
            <div className={cn(CARD, 'flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6')}>
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
                  <FileArchive className="size-4" />
                </span>
                <div>
                  <h2 className="font-inter text-[16px] font-medium text-neutral-900 dark:text-neutral-100">
                    The whole kit
                  </h2>
                  <p className="mt-0.5 font-inter text-[14px] leading-[21px] text-[#646464] dark:text-neutral-400">
                    Marks and wordmarks in light and dark — SVG and transparent PNG, plus a readme.
                  </p>
                </div>
              </div>
              <a href="/brand/spectrum-ui-brand-kit.zip" download className={cn(PILL_BUTTON, 'w-full sm:w-auto')}>
                <Download className="size-4" />
                Download ZIP
              </a>
            </div>
          </AnimateEnter>

          {/* Logos */}
          <Section className="mt-14">
            <AnimateEnter>
              <SectionHeader
                tag="Logos"
                heading="The mark and the lockup."
                sub="The dark versions sit on light backgrounds, the light versions on dark. Please don't redraw, recolor, stretch, or add effects to either."
              />
            </AnimateEnter>
            <div className="grid gap-4 md:grid-cols-2">
              {LOGO_ASSETS.map((asset, i) => (
                <AnimateEnter key={asset.base} delay={(i % 2) * 0.08}>
                  <LogoCard asset={asset} />
                </AnimateEnter>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section className="mt-14">
            <AnimateEnter>
              <SectionHeader
                tag="Typography"
                heading="Four voices, one system."
                sub="Spectral carries the headlines, Inter carries marketing copy, Geist Sans carries the product, and Geist Mono carries labels, tags, and code."
              />
            </AnimateEnter>
            <div className="grid gap-4 md:grid-cols-2">
              {TYPEFACES.map((face, i) => (
                <AnimateEnter key={face.name} delay={(i % 2) * 0.08}>
                  <div className={cn(CARD, 'flex h-full flex-col gap-6 p-6')}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                        {face.name}
                      </h3>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28px] text-neutral-500 dark:text-neutral-400">
                        {face.role}
                      </span>
                    </div>
                    <p
                      className={cn(
                        face.sampleClass,
                        'text-[26px] leading-[1.2] text-neutral-900 dark:text-neutral-100 sm:text-[28px]',
                      )}
                    >
                      {face.sample}
                    </p>
                    <p className={cn(face.charsetClass, 'break-words text-[14px] leading-[1.6] text-neutral-400 dark:text-neutral-500')}>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]">
                      <span className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                        {face.token}
                      </span>
                      <a
                        href={face.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-inter text-xs font-medium text-neutral-900 underline-offset-4 transition-colors duration-200 ease-out hover:text-[#f9452d] hover:underline dark:text-neutral-100 dark:hover:text-[#E1F435]"
                      >
                        {face.source}
                        <ArrowUpRight className="size-3" />
                      </a>
                    </div>
                  </div>
                </AnimateEnter>
              ))}
            </div>
          </Section>

          {/* Colors */}
          <Section className="mt-14">
            <AnimateEnter>
              <SectionHeader
                tag="Colors"
                heading="Ink, paper, and two accents."
                sub="The interface stays monochrome; orange carries the accent in light mode and lime carries it in dark mode."
              />
            </AnimateEnter>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLORS.map((color, i) => (
                <AnimateEnter key={color.hex} delay={i * 0.06}>
                  <div className={cn(CARD, 'overflow-hidden')}>
                    <div
                      className="h-24 border-b border-black/[0.06] dark:border-white/[0.08]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex items-center justify-between gap-2 p-4">
                      <div className="min-w-0">
                        <p className="font-inter text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {color.name}
                          <span className="font-normal text-neutral-400 dark:text-neutral-500"> · {color.role}</span>
                        </p>
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{color.hex}</p>
                      </div>
                      <CopyButton text={color.hex} label={`Copy ${color.hex}`} />
                    </div>
                  </div>
                </AnimateEnter>
              ))}
            </div>
          </Section>

          {/* Boilerplate */}
          <Section className="mt-14">
            <AnimateEnter>
              <SectionHeader
                tag="Boilerplate"
                heading="Describing Spectrum UI."
                sub="Roundup post, newsletter, or model context — copy either description verbatim."
              />
            </AnimateEnter>
            <div className="grid gap-4">
              <AnimateEnter>
                <div className={cn(CARD, 'p-6')}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                      About
                    </h3>
                    <CopyButton text={ABOUT_PARAGRAPHS.join('\n\n')} label="Copy description" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {ABOUT_PARAGRAPHS.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="max-w-[720px] font-inter text-[14px] leading-[22px] text-[#646464] dark:text-neutral-400"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimateEnter>
              <div className="grid items-start gap-4 md:grid-cols-2">
                <AnimateEnter>
                  <div className={cn(CARD, 'p-6')}>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                        One-liner
                      </h3>
                      <CopyButton text={siteConfig.shortDescription} label="Copy one-liner" />
                    </div>
                    <p className="font-inter text-[14px] leading-[22px] text-[#646464] dark:text-neutral-400">
                      {siteConfig.shortDescription}
                    </p>
                  </div>
                </AnimateEnter>
                <AnimateEnter delay={0.08}>
                  <div className={cn(CARD, 'p-6')}>
                    <h3 className="mb-4 font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                      Facts
                    </h3>
                    <dl className="grid gap-2">
                      {FACTS.map((fact) => (
                        <div
                          key={fact.label}
                          className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 rounded-lg bg-neutral-50 px-3 py-2 dark:bg-neutral-900/60"
                        >
                          <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.28px] text-neutral-500 dark:text-neutral-400">
                            {fact.label}
                          </dt>
                          <dd className="font-inter text-[13px] leading-[19px] text-neutral-900 dark:text-neutral-100">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </AnimateEnter>
              </div>
            </div>
          </Section>

          {/* Social */}
          <Section className="mt-14">
            <AnimateEnter>
              <SectionHeader
                tag="Social"
                heading="Follow along."
                sub="Component drops, changelog notes, and the occasional build-in-public thread."
              />
            </AnimateEnter>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SOCIALS.map((social, i) => (
                <AnimateEnter key={social.name} delay={i * 0.06}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      CARD,
                      'group flex h-full flex-col gap-8 p-5 transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-black text-white transition-transform duration-200 ease-out group-hover:scale-105 dark:bg-white dark:text-black">
                        <social.Icon className="size-4" />
                      </span>
                      <ArrowUpRight className="size-4 text-neutral-400 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f9452d] dark:group-hover:text-[#E1F435]" />
                    </div>
                    <div>
                      <p className="font-inter text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                        {social.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                </AnimateEnter>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
