'use client';

import { useState, useEffect } from 'react';
import { Icons } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { type Template } from '@/types';

// ─── Waitlist form ─────────────────────────────────────────────────────────
function WaitlistForm({ id, size = 'default' }: { id: string; size?: 'default' | 'large' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch('https://chat.spectrumhq.in/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'spectrum pro' }),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error('Error joining waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-2.5 text-sm text-foreground 
        border border-border rounded-xl px-5 py-3.5 
        bg-neutral-50 dark:bg-neutral-900
        animate-in fade-in zoom-in duration-300">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>You&apos;re on the list — we&apos;ll reach out soon.</span>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 rounded-xl bg-background border-border 
          text-foreground placeholder:text-muted-foreground
          focus-visible:ring-1 focus-visible:ring-foreground/20
          ${size === 'large' ? 'h-12 text-base' : 'h-11'}`}
      />
      <Button
        type="submit"
        disabled={loading}
        className={`rounded-xl whitespace-nowrap font-semibold shrink-0
          ${size === 'large' ? 'h-12 px-7 text-base' : 'h-11 px-6 text-sm'}`}
      >
        {loading ? 'Joining…' : 'Get Access Now →'}
      </Button>
    </form>
  );
}

// ─── Mockups (unchanged — they're good) ──────────────────────────────────────
function SaaSMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-foreground/20" />
          <div className="h-1.5 w-12 rounded-full bg-foreground/15" />
        </div>
        <div className="flex gap-2.5">
          {[36, 28, 22].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-foreground/10" style={{ width: w }} />)}
        </div>
        <div className="h-5 w-14 rounded-md bg-foreground/15" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-5">
        <div className="h-1.5 w-16 rounded-full bg-foreground/10" />
        <div className="h-5 w-40 rounded-full bg-foreground/20" />
        <div className="h-2 w-32 rounded-full bg-foreground/[0.08]" />
        <div className="h-2 w-24 rounded-full bg-foreground/[0.08]" />
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-lg bg-foreground/20" />
          <div className="h-6 w-20 rounded-lg border border-foreground/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-border/50">
        {['a', 'b', 'c'].map((k, i) => (
          <div key={k} className={`px-3 py-3 ${i < 2 ? 'border-r border-border/50' : ''}`}>
            <div className="h-3 w-3 rounded-sm bg-foreground/15 mb-2" />
            <div className="h-1.5 w-10 rounded-full bg-foreground/15 mb-1" />
            <div className="h-1 w-8 rounded-full bg-foreground/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StartupMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <div className="h-2 w-14 rounded-full bg-foreground/[0.25]" />
        <div className="flex gap-2">
          {[24, 24, 24].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-foreground/10" style={{ width: w }} />)}
        </div>
        <div className="h-5 w-12 rounded-md bg-foreground/20" />
      </div>
      <div className="flex-1 grid grid-cols-5">
        <div className="col-span-3 p-4 flex flex-col justify-center gap-2.5">
          <div className="h-1.5 w-12 rounded-full bg-foreground/[0.12]" />
          <div className="h-5 w-28 rounded-full bg-foreground/[0.22]" />
          <div className="h-1.5 w-20 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-16 rounded-full bg-foreground/10" />
          <div className="mt-1 h-6 w-16 rounded-md bg-foreground/20" />
        </div>
        <div className="col-span-2 p-3 flex flex-col gap-2 border-l border-border/50">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 rounded-lg border border-foreground/[0.08] p-2">
              <div className="h-1.5 w-8 rounded-full bg-foreground/[0.18] mb-1.5" />
              <div className="h-1 w-12 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-foreground/20" />
          <div className="h-1.5 w-14 rounded-full bg-foreground/[0.18]" />
        </div>
        <div className="h-5 w-12 rounded-md bg-foreground/[0.18]" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="h-1.5 w-12 rounded-full bg-foreground/[0.12]" />
        <div className="h-5 w-36 rounded-full bg-foreground/[0.22]" />
        <div className="h-1.5 w-28 rounded-full bg-foreground/10" />
        <div className="h-1.5 w-20 rounded-full bg-foreground/10" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-16 rounded-md bg-foreground/20" />
          <div className="h-6 w-16 rounded-md border border-foreground/10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-3 mt-auto">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-9 rounded-lg border border-foreground/[0.08] bg-foreground/[0.03]" />
        ))}
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex">
      <div className="w-1/4 border-r border-border/50 p-3 flex flex-col gap-3">
        <div className="h-4 w-10/12 rounded bg-foreground/10 mb-2" />
        {[1, 2, 3, 4].map(i => <div key={i} className="h-1.5 w-full rounded-full bg-foreground/5" />)}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="h-3 w-16 rounded-full bg-foreground/20" />
          <div className="h-3 w-3 rounded-full bg-foreground/20" />
        </div>
        <div className="flex-1 border border-border/50 rounded-lg bg-foreground/5 p-3 flex gap-2 items-end justify-center">
          <div className="w-3 h-8 bg-foreground/20 rounded-t-sm" />
          <div className="w-3 h-12 bg-foreground/15 rounded-t-sm" />
          <div className="w-3 h-6 bg-foreground/10 rounded-t-sm" />
          <div className="w-3 h-16 bg-foreground/[0.25] rounded-t-sm" />
          <div className="w-3 h-10 bg-foreground/15 rounded-t-sm" />
        </div>
      </div>
    </div>
  );
}

function CommerceMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex flex-col">
      <div className="p-3 border-b border-border/50 flex justify-between items-center">
        <div className="h-2 w-12 bg-foreground/20 rounded-full" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 bg-foreground/10 rounded-full" />
          <div className="h-1.5 w-6 bg-foreground/10 rounded-full" />
        </div>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-foreground/5 border border-border/50 rounded flex flex-col items-center justify-center p-2 gap-1.5">
            <div className="h-6 w-full bg-foreground/10 rounded-sm mb-0.5" />
            <div className="h-1 w-8 bg-foreground/20 rounded-full" />
            <div className="h-1 w-4 bg-foreground/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogMockup() {
  return (
    <div className="w-full h-full bg-background border border-border/50 rounded-lg overflow-hidden flex flex-col items-center justify-center p-5">
      <div className="w-4/5 flex flex-col gap-2.5">
        <div className="h-4 w-full bg-foreground/20 rounded-md" />
        <div className="h-1.5 w-1/3 bg-foreground/10 rounded-full mb-2" />
        <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
        <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
        <div className="h-1.5 w-5/6 bg-foreground/10 rounded-full" />
      </div>
    </div>
  );
}

// ─── Template card ────────────────────────────────────────────────────────────
function TemplateCard({
  title,
  subtitle,
  Mockup,
  aspectClass = 'aspect-video',
}: {
  title: string;
  subtitle: string;
  Mockup: React.ComponentType;
  aspectClass?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col gap-3 group/template">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden rounded-xl border 
          border-neutral-200 dark:border-neutral-800 
          bg-neutral-100 dark:bg-neutral-900 
          transition-all duration-300 ${aspectClass}`}
        style={{
          transform: hovered ? 'scale(1.012)' : 'scale(1)',
          boxShadow: hovered
            ? '0 16px 48px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)'
            : 'none',
        }}
      >
        {/* Mockup */}
        <div
          className="absolute inset-0 p-1.5 transition-transform duration-500 ease-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        >
          <Mockup />
        </div>

        {/* Lock overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-xl 
            transition-all duration-500 ease-out 
            ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.25)' }}
        >
          <div
            className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl 
              bg-background/95 dark:bg-neutral-900/95 
              border border-neutral-200 dark:border-neutral-700 
              shadow-xl transition-all duration-500 ease-out"
            style={{
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-foreground">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs font-semibold text-foreground tracking-wide">
              Unlock with Pro
            </span>
          </div>
        </div>

        {/* PRO badge */}
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full 
          text-[10px] font-semibold bg-foreground text-background 
          tracking-wide shadow-sm">
          PRO
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground 
          group-hover/template:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
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
    <div className="relative p-7 flex flex-col gap-4 group 
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

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-8 text-center">
      <p className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
        {value}
      </p>
      <p className="text-sm text-muted-foreground mt-1.5">{label}</p>
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="container-wrapper relative">
        {/* Subtle grid — light mode */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),
               linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:96px_96px]
            [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_60%,transparent_100%)]
            dark:invisible"
        />

        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">

          {/* Badge — no "early access", just brand */}
          <div className="inline-flex items-center gap-2 rounded-full 
            border border-neutral-200 dark:border-neutral-800 
            bg-neutral-50 dark:bg-neutral-900/80
            px-3 py-1.5 text-xs font-medium text-muted-foreground mb-8">
            <div className="h-5 w-5 bg-white border border-neutral-200 
              dark:border-neutral-700 dark:bg-neutral-900 
              rounded-md flex items-center justify-center p-0.5 shrink-0">
              <Icons.logo className="h-3.5 w-3.5 text-foreground" />
            </div>
            Spectrum Pro — Premium templates for developers
          </div>

          {/* Headline — confident, no "coming soon" energy */}
          <h1 className="mx-auto max-w-4xl font-bold 
            text-4xl md:text-5xl lg:text-[3.75rem] 
            leading-[1.1] tracking-tight mb-5">
            Stop building UIs
            <br />
            <span className="text-muted-foreground">
              from scratch every time.
            </span>
          </h1>

          {/* Subtext — credibility first, then the ask */}
          <p className="text-base md:text-lg text-muted-foreground 
            max-w-lg mx-auto mb-4 leading-relaxed">
            Premium Next.js templates built on Spectrum UI — the library
            used by <span className="text-foreground font-medium">
              4,000+ developers
            </span> every month.
            Dark. Animated. Production-ready.
          </p>

          {/* Form — no name field, less friction */}
          <div className="flex flex-col items-center gap-4">
            <WaitlistForm id="hero-form" />

            {/* Social proof — this is real, use it confidently */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {[
                '989+ GitHub stars',
                '4,000 devs/month',
                'No spam',
              ].map((t) => (
                <span key={t}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── TEMPLATES ─────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest 
              text-muted-foreground mb-3">
              Templates
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Premium, production-ready starter kits.
            </h2>
          </div>

          {loading ? (
            <p className="text-muted-foreground text-sm">Loading templates...</p>
          ) : templates.length === 0 ? (
            <p className="text-muted-foreground text-sm">No templates available yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((t) => (
                <Link key={t.slug} href={`/pro/${t.slug}`}
                  className="group rounded-xl border
                    border-neutral-200 dark:border-neutral-800
                    bg-neutral-50 dark:bg-neutral-900/60
                    hover:border-neutral-300 dark:hover:border-neutral-700
                    transition-all duration-300 overflow-hidden
                    hover:shadow-lg block"
                >
                  {/* Thumbnail / Placeholder */}
                  <div className="aspect-video bg-neutral-100 dark:bg-neutral-800
                    flex items-center justify-center relative overflow-hidden">
                    {t.thumbnail_url ? (
                      <img src={t.thumbnail_url} alt={t.name}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                        <span className="text-xs font-medium">{t.category ?? 'Template'}</span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      flex items-center justify-center">
                      <span className="text-white text-sm font-semibold
                        bg-white/20 border border-white/30 px-4 py-2 rounded-lg">
                        View Details — ${(t.price / 100).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                      <span className="text-xs font-bold text-foreground">
                        ${(t.price / 100).toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.tagline}</p>
                    {t.tech_stack && t.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {t.tech_stack.map((tech) => (
                          <span key={tech}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full
                              bg-neutral-100 dark:bg-neutral-800
                              text-muted-foreground border border-neutral-200 dark:border-neutral-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-y 
        border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest 
              text-muted-foreground mb-3">
              What you get
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Built the right way, every time.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
            border border-neutral-200 dark:border-neutral-800 
            rounded-xl overflow-hidden 
            divide-x divide-y 
            divide-neutral-200 dark:divide-neutral-800">
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
          </div>
        </div>
      </section>
    </div>
  );
}