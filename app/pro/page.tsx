'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { type Template } from '@/types';
import Image from 'next/image';

// ─── Template card ────────────────────────────────────────────────────────────
function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/pro/${template.slug}`}
      className="group relative flex flex-col rounded-xl border
        border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-950
        hover:border-neutral-300 dark:hover:border-neutral-700
        transition-all duration-300 overflow-hidden
        hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]
        dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden">
        {template.thumbnail_url ? (
          <Image
            src={template.thumbnail_url}
            alt={template.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span className="text-[11px] font-medium">{template.category ?? 'Template'}</span>
            </div>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg
          text-xs font-bold bg-white dark:bg-neutral-900
          text-foreground border border-neutral-200 dark:border-neutral-700 shadow-sm">
          ${(template.price / 100).toFixed(0)}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]
          opacity-0 group-hover:opacity-100 transition-all duration-300
          flex items-center justify-center">
          <span className="text-white text-sm font-semibold
            bg-white/15 border border-white/20 px-5 py-2.5 rounded-lg
            backdrop-blur-sm transition-transform duration-300
            translate-y-2 group-hover:translate-y-0">
            View Template
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {template.tagline}
          </p>
        </div>
        {template.tech_stack && template.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {template.tech_stack.slice(0, 5).map((tech) => (
              <span key={tech}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md
                  bg-neutral-100 dark:bg-neutral-800
                  text-muted-foreground">
                {tech}
              </span>
            ))}
            {template.tech_stack.length > 5 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md
                bg-neutral-100 dark:bg-neutral-800 text-muted-foreground">
                +{template.tech_stack.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative p-6 md:p-7 flex flex-col gap-4 group
      hover:bg-neutral-50 dark:hover:bg-neutral-900/60
      transition-colors cursor-default overflow-hidden">
      <div className="absolute inset-0
        bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]
        dark:bg-[radial-gradient(#334155_1px,transparent_1px)]
        [background-size:16px_16px]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 w-9 h-9 rounded-lg flex items-center justify-center
        bg-muted border border-border text-foreground
        group-hover:bg-foreground group-hover:text-background
        group-hover:scale-110 transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-sm font-semibold text-foreground mb-1.5">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left
          hover:text-foreground transition-colors"
      >
        <span className="text-sm font-medium text-foreground pr-4">{question}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight ?? 0 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-sm text-muted-foreground leading-relaxed pb-5">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });
      if (data) setTemplates(data);
      if (error) console.error('Error fetching templates:', error);
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO + TEMPLATES (value upfront) ─────────────────────────────── */}
      <section id="templates" className="container-wrapper relative overflow-hidden scroll-mt-20">
        {/* Grid bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
               linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:64px_64px]
            [mask-image:radial-gradient(ellipse_70%_50%_at_50%_20%,#000_60%,transparent_100%)]
            dark:opacity-40"
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-20">
          {/* Compact hero headline */}
          <div className="max-w-3xl mb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl
              leading-[1.1] tracking-tight mb-4">
              Premium Next.js templates.{' '}
              <span className="text-muted-foreground">Buy once, own forever.</span>
            </h1>
            <div className="flex items-center gap-6 flex-wrap">
              {[
                'Full source code',
                'Private GitHub access',
                'Lifetime updates',
              ].map((t) => (
                <span key={t}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="text-green-500 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Templates grid — immediately visible */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                    <div className="h-3 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-20 rounded-xl border border-dashed
              border-neutral-200 dark:border-neutral-800">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="mx-auto text-muted-foreground mb-3">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <p className="text-sm text-muted-foreground">
                New templates dropping soon. Stay tuned.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((t) => (
                <TemplateCard key={t.slug} template={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-y
        border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4
            divide-y sm:divide-y-0 sm:divide-x
            divide-neutral-200 dark:divide-neutral-800">
            {[
              { value: '989+', label: 'GitHub Stars' },
              { value: '4,000+', label: 'Monthly Developers' },
              { value: '20,000+', label: 'Monthly Pageviews' },
              { value: '100%', label: 'Source Code Access' },
            ].map(({ value, label }) => (
              <div key={label} className="p-6 md:p-8 text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight tabular-nums">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="container-wrapper border-y
        border-neutral-200 dark:border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest
              text-primary mb-3">
              How it works
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              From purchase to production in minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: '01',
                title: 'Pick a template',
                desc: 'Browse our collection and choose the template that fits your project. Each one is designed for a specific use case.',
              },
              {
                step: '02',
                title: 'Get instant access',
                desc: 'Complete your purchase and get immediate access to the private GitHub repository with the full source code.',
              },
              {
                step: '03',
                title: 'Ship your project',
                desc: 'Clone the repo, customize it to your brand, and deploy. No configuration headaches — it works out of the box.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <span className="text-xs font-bold text-primary tabular-nums">
                  {step}
                </span>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ──────────────────────────────────────────────────── */}
      <section className="container-wrapper">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest
              text-primary mb-3">
              What you get
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Built the right way, every time
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
            border border-neutral-200 dark:border-neutral-800
            rounded-xl overflow-hidden
            divide-x divide-y
            divide-neutral-200 dark:divide-neutral-800
            [&>*:nth-child(-n+4)]:border-t-0
            [&>*:first-child]:border-l-0">
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
              title="Production Ready"
              desc="Zero config needed. Clone, install, deploy. Every template works out of the box."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              }
              title="Spectrum Design System"
              desc="Consistent tokens, spacing, and components across every template. Cohesive by default."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              }
              title="Framer Motion"
              desc="Spring-based animations throughout. Smooth, performant, no setup required."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              }
              title="Full Source Code"
              desc="Private GitHub repo access on purchase. No license drama, no lock-in. It's yours."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              title="TypeScript First"
              desc="Fully typed with strict mode. Catch errors at build time, not runtime."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              }
              title="SEO Optimized"
              desc="Metadata, Open Graph, sitemaps, and structured data baked into every page."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              }
              title="Responsive Design"
              desc="Pixel-perfect on every screen size. Mobile-first layouts that scale beautifully."
            />
            <FeatureCard
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              }
              title="Dark Mode"
              desc="Light and dark themes built in. Automatic detection with manual toggle support."
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-t
        border-neutral-200 dark:border-neutral-800">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest
              text-primary mb-3">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Common questions
            </h2>
          </div>

          <div>
            <FAQItem
              question="What do I get after purchasing?"
              answer="You get immediate access to a private GitHub repository containing the full source code of the template. Clone it, customize it, and deploy — it's yours to keep forever."
            />
            <FAQItem
              question="Can I use a template for multiple projects?"
              answer="Yes. Each purchase grants you a license to use the template in unlimited personal and commercial projects. No per-project fees."
            />
            <FAQItem
              question="Do I get updates?"
              answer="Yes, you get lifetime updates to the template. When we push improvements, bug fixes, or new features, you'll have access to them in the GitHub repo."
            />
            <FAQItem
              question="What tech stack do the templates use?"
              answer="All templates are built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Framer Motion. Some templates include additional integrations like Supabase, Stripe, or NextAuth."
            />
            <FAQItem
              question="Can I get a refund?"
              answer="Due to the digital nature of the product (full source code access), we generally do not offer refunds. However, if you experience any issues, reach out to us and we'll work with you to resolve them."
            />
            <FAQItem
              question="Do I need a Spectrum Pro subscription?"
              answer="No subscription needed. Each template is a one-time purchase. Buy what you need, when you need it."
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      {/* <section className="container-wrapper border-t
        border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Stop building from scratch
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">
            Get a production-ready Next.js template and launch your project
            in hours, not weeks.
          </p>
          <Button asChild size="lg" className="rounded-xl h-12 px-8 text-sm font-semibold">
            <a href="#templates">Browse Templates</a>
          </Button>
        </div>
      </section> */}
    </div>
  );
}
