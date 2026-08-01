import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, LayoutGrid, Palette, Sparkles, Zap } from 'lucide-react';

import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';
import { TOPIC_HUB_LINKS, topicHubPath } from '@/lib/topic-hub-links';

export const metadata: Metadata = baseMetadata({
  title: 'Guides & Tutorials',
  description:
    'Learn how to build modern React applications with Spectrum UI. Step-by-step tutorials, best practices, and real-world examples.',
  keywords: [
    'React tutorials',
    'UI component guide',
    'Next.js tutorials',
    'React best practices',
    'component library tutorial',
    'modern UI development',
    'React design patterns',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/guides',
});

const GUIDES = [
  {
    title: 'Install Spectrum UI',
    description: 'Set up Next.js and shadcn/ui, then add your first component in a few minutes.',
    icon: Zap,
    href: '/docs/installation',
    tag: 'Start here',
  },
  {
    title: 'Explore the components',
    description: 'Browse the full list of components and copy the ones you need.',
    icon: LayoutGrid,
    href: '/docs',
    tag: 'Components',
  },
  {
    title: 'Set up the MCP server',
    description: 'Connect your AI editor so it can search and add components for you.',
    icon: Sparkles,
    href: '/docs/mcp',
    tag: 'AI tools',
  },
  {
    title: 'Make it your own',
    description: 'Edit the copied code and change the styles to match your brand.',
    icon: Palette,
    href: '/docs/button',
    tag: 'Styling',
  },
];

const LEARNING_POINTS = [
  'How to add Spectrum UI components to a React or Next.js app',
  'How to keep your pages fast and easy to use for everyone',
  'How to change a component so it matches your design',
  'Patterns that real production apps use',
  'How to work faster with AI tools like the MCP server',
];

const POPULAR_PAGES = [
  {
    title: 'Installation',
    description: 'Install and set up Spectrum UI',
    href: '/docs/installation',
  },
  {
    title: 'Accordion',
    description: 'Build accessible accordions in React',
    href: '/docs/accordion',
  },
  {
    title: 'Button',
    description: 'Create custom button variants with Tailwind',
    href: '/docs/button',
  },
  { title: 'Card', description: 'Design beautiful card layouts', href: '/docs/card' },
];

const sectionTitle =
  'scroll-m-24 font-regular text-xl font-medium leading-7 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50';

export default function GuidesPage() {
  return (
    <SEOWrapper
      componentName="Guides & Tutorials"
      description="Learn how to build modern React applications with Spectrum UI. Step-by-step tutorials, best practices, and real-world examples."
      url="https://ui.spectrumhq.in/docs/guides"
      schemaType="collectionPage"
      keywords={[
        'React tutorials',
        'UI component guide',
        'Next.js tutorials',
        'React best practices',
        'component library tutorial',
        'modern UI development',
        'React design patterns',
      ]}
    >
      <div className="w-full">
        {/* Header */}
        <div className="max-w-2xl animate-fade-up">
          <p className="font-mono text-[13px] leading-4 text-neutral-400 dark:text-neutral-500">
            Getting Started
          </p>
          <h1 className="mt-2 text-2xl leading-10 text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            Guides
          </h1>
          <p className="mt-2 text-[15px] tracking-wide text-neutral-400 dark:text-neutral-400">
            Short guides that help you learn Spectrum UI and get more out of it.
          </p>
        </div>

        {/* Guide cards */}
        <div
          className="mt-10 grid animate-fade-up grid-cols-1 gap-4 sm:grid-cols-2"
          style={{ animationDelay: '60ms' }}
        >
          {GUIDES.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex flex-col rounded-[14px] border border-black/8 bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-black/16 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 active:translate-y-0 active:shadow-none dark:border-white/10 dark:bg-white/2 dark:hover:border-white/20 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
              >
                <span className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center rounded-[10px] bg-black/4 transition-colors duration-200 group-hover:bg-black/6 dark:bg-white/6 dark:group-hover:bg-white/9">
                    <Icon className="size-4 text-neutral-600 dark:text-neutral-300" />
                  </span>
                  <span className="rounded-[6px] bg-black/4 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-neutral-500 dark:bg-white/6 dark:text-neutral-400">
                    {guide.tag}
                  </span>
                </span>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium leading-5 text-neutral-900 dark:text-neutral-100">
                  {guide.title}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 -translate-x-0.5 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
                </span>
                <span className="mt-1.5 text-[13px] leading-5 tracking-wide text-neutral-500 dark:text-neutral-400">
                  {guide.description}
                </span>
              </Link>
            );
          })}
        </div>

        <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h2 id="topic-guides" className={`mt-14 ${sectionTitle}`}>
            Topic guides
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            Learn a UI category, compare when to use it, browse matching Spectrum UI components, and
            start from a working code example.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TOPIC_HUB_LINKS.map((hub) => (
              <Link
                key={hub.slug}
                href={topicHubPath(hub.slug)}
                className="group flex items-center justify-between gap-4 rounded-[12px] border border-black/8 bg-white px-4 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-black/2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/2 dark:text-neutral-200 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
              >
                {hub.label}
                <ArrowUpRight className="size-3.5 shrink-0 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* What you will learn */}
        <section className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          <h2 id="what-you-will-learn" className={`mt-14 ${sectionTitle}`}>
            What you will learn
          </h2>
          <ul className="mt-5 flex flex-col gap-3">
            {LEARNING_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-black/4 dark:bg-white/6">
                  <Check className="size-3 text-neutral-600 dark:text-neutral-300" />
                </span>
                <span className="text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why Spectrum UI */}
        <section className="animate-fade-up" style={{ animationDelay: '180ms' }}>
          <h2 id="why-spectrum-ui" className={`mt-14 ${sectionTitle}`}>
            Why Spectrum UI?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            Spectrum UI is a collection of React components for modern web apps. It is built with
            TypeScript and Tailwind CSS, and it cares about accessibility from the start. You get
            beautiful and responsive interfaces without writing all the boilerplate yourself. And
            since the code lives in your project, there is nothing extra to maintain.
          </p>
        </section>

        {/* Popular pages */}
        <section className="animate-fade-up" style={{ animationDelay: '240ms' }}>
          <h2 id="popular-pages" className={`mt-14 ${sectionTitle}`}>
            Popular pages
          </h2>
          <div className="mt-5 overflow-hidden rounded-[14px] border border-black/8 bg-white dark:border-white/10 dark:bg-white/2">
            <div className="flex flex-col divide-y divide-black/6 dark:divide-white/8">
              {POPULAR_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex h-12 items-center gap-3 px-4 transition-colors duration-150 hover:bg-black/2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/20 dark:hover:bg-white/4 dark:focus-visible:ring-white/30"
                >
                  <span className="shrink-0 text-sm font-medium leading-5 text-neutral-800 dark:text-neutral-200">
                    {page.title}
                  </span>
                  <span className="hidden truncate text-[13px] leading-5 tracking-wide text-neutral-400 dark:text-neutral-500 sm:inline">
                    {page.description}
                  </span>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-0.5 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
}
