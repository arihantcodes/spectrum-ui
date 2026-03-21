'use client';

import { useState } from 'react';
import { Icons } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Waitlist form ────────────────────────────────────────────────────────────
function WaitlistForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    console.log('Submitting waitlist form:', { email, name, source: 'spectrum pro' });
    try {
      const response = await fetch('https://chat.spectrumhq.in/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: 'spectrum pro',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const err = await response.text();
        console.error('Failed to join waitlist:', err);
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-foreground border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl px-5 py-3 animate-in fade-in zoom-in duration-300">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        You're on the list — we'll be in touch soon.
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="flex-1 h-11 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-[2] h-11 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" disabled={loading} className="h-12 px-6 rounded-xl whitespace-nowrap text-base font-semibold shadow-lg hover:shadow-xl transition-all">
        {loading ? 'Joining…' : 'Join Waitlist for Early Access →'}
      </Button>
    </form>
  );
}

// ─── Dark mockup previews ─────────────────────────────────────────────────────
function SaaSMockup() {
  return (
    <div className="w-full h-full bg-[#111113] rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white/20" />
          <div className="h-1.5 w-12 rounded-full bg-white/15" />
        </div>
        <div className="flex gap-2.5">
          {[36, 28, 22].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: w }} />)}
        </div>
        <div className="h-5 w-14 rounded-md bg-white/15" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 py-5">
        <div className="h-1.5 w-16 rounded-full bg-white/10" />
        <div className="h-5 w-40 rounded-full bg-white/20" />
        <div className="h-2 w-32 rounded-full bg-white/8" />
        <div className="h-2 w-24 rounded-full bg-white/8" />
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-lg bg-white/20" />
          <div className="h-6 w-20 rounded-lg border border-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/5">
        {['a', 'b', 'c'].map((k, i) => (
          <div key={k} className={`px-3 py-3 ${i < 2 ? 'border-r border-white/5' : ''}`}>
            <div className="h-3 w-3 rounded-sm bg-white/15 mb-2" />
            <div className="h-1.5 w-10 rounded-full bg-white/15 mb-1" />
            <div className="h-1 w-8 rounded-full bg-white/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StartupMockup() {
  return (
    <div className="w-full h-full bg-[#111113] rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="h-2 w-14 rounded-full bg-white/25" />
        <div className="flex gap-2">
          {[24, 24, 24].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: w }} />)}
        </div>
        <div className="h-5 w-12 rounded-md bg-white/20" />
      </div>
      <div className="flex-1 grid grid-cols-5">
        <div className="col-span-3 p-4 flex flex-col justify-center gap-2.5">
          <div className="h-1.5 w-12 rounded-full bg-white/12" />
          <div className="h-5 w-28 rounded-full bg-white/22" />
          <div className="h-1.5 w-20 rounded-full bg-white/10" />
          <div className="h-1.5 w-16 rounded-full bg-white/10" />
          <div className="mt-1 h-6 w-16 rounded-md bg-white/20" />
        </div>
        <div className="col-span-2 p-3 flex flex-col gap-2 border-l border-white/5">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 rounded-lg border border-white/8 p-2">
              <div className="h-1.5 w-8 rounded-full bg-white/18 mb-1.5" />
              <div className="h-1 w-12 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="w-full h-full bg-[#111113] rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-white/20" />
          <div className="h-1.5 w-14 rounded-full bg-white/18" />
        </div>
        <div className="h-5 w-12 rounded-md bg-white/18" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="h-1.5 w-12 rounded-full bg-white/12" />
        <div className="h-5 w-36 rounded-full bg-white/22" />
        <div className="h-1.5 w-28 rounded-full bg-white/10" />
        <div className="h-1.5 w-20 rounded-full bg-white/10" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-16 rounded-md bg-white/20" />
          <div className="h-6 w-16 rounded-md border border-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-3 mt-auto">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-9 rounded-lg border border-white/8 bg-white/3" />
        ))}
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
    <div className="flex flex-col gap-3">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 ${aspectClass}`}
        style={{
          transform: hovered ? 'scale(1.012)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Mockup */}
        <div className="absolute inset-0 p-1.5">
          <Mockup />
        </div>

        {/* Blur + lock */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl bg-background/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs font-medium text-foreground">Unlock with Pro</span>
          </div>
        </div>

        {/* PRO badge */}
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-foreground text-background tracking-wide">
          PRO
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-7 flex flex-col gap-4 group hover:bg-muted/60 transition-colors cursor-default">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted border border-border text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-200">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-1.5">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="container-wrapper relative">
        {/* Grid background — light mode only, matches home page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:96px_96px]
            [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_60%,transparent_100%)]
            dark:invisible"
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-muted-foreground mb-8">
            <div className="h-5 w-5 bg-white border border-neutral-200 dark:border-neutral-700 dark:bg-white rounded-md flex items-center justify-center p-0.5 shrink-0">
              <Icons.logo className="h-3.5 w-3.5 text-black" />
            </div>
            Early Access · Limited Spots
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl font-bold text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.12] tracking-tight mb-6">
            Premium Templates{' '}
            <br />
            <span className="text-muted-foreground">Built for Builders</span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Full Next.js + Framer Motion templates in Spectrum UI style. Dark. Animated. Production-ready.{' '}
            <br />
            <span className="text-foreground font-medium">Join the waitlist for early access + 30% off.</span>
          </p>

          {/* Form + social proof */}
          <div className="flex flex-col items-center gap-4">
            <WaitlistForm id="hero-form" />
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-5 flex-wrap">
              {['989 GitHub stars', '4,000 monthly users', 'No spam, ever'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-y border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-neutral-200 dark:divide-neutral-800">
            {[
              { value: '989+', label: 'GitHub Stars' },
              { value: '4,000+', label: 'Monthly Users' },
              { value: '20,000+', label: 'Monthly Pageviews' },
            ].map(({ value, label }) => (
              <div key={label} className="p-8 text-center">
                <p className="text-4xl font-bold text-foreground tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground mt-1.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ────────────────────────────────────────────────────────── */}
      <section className="container-wrapper">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">What's inside</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Spectrum Pro Templates</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Premium templates dropping soon. Join the waitlist to unlock early access and 30% off launch pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <TemplateCard
                title="SaaS Landing Page"
                subtitle="Next.js + Framer Motion · Full dark layout"
                Mockup={SaaSMockup}
                aspectClass="aspect-[4/3]"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <TemplateCard
                title="Startup Homepage"
                subtitle="Dark glassmorphism · Split hero"
                Mockup={StartupMockup}
              />
              <TemplateCard
                title="Developer Portfolio"
                subtitle="Animated sections · Project grid"
                Mockup={PortfolioMockup}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="container-wrapper border-y border-dashed border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">What you get</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Everything included</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden divide-x divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
            <FeatureCard
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
              title="Production Ready"
              desc="Ship in hours, not days. Battle-tested, deploy-ready out of the box."
            />
            <FeatureCard
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
              title="Spectrum Style"
              desc="Consistent Spectrum UI aesthetic across every template and page."
            />
            <FeatureCard
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>}
              title="Framer Motion"
              desc="Smooth, performant animations baked in. No config required."
            />
            <FeatureCard
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>}
              title="Full Source Code"
              desc="Private GitHub repo access on purchase. Own everything, no lock-in."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="container-wrapper">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="relative text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl px-8 py-16 md:py-20 overflow-hidden">
            {/* inner grid — light mode only */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10
                bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)]
                bg-[size:48px_48px] dark:invisible"
            />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-5">Early Access</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Be first. Get 30% off.
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Early waitlist members get an exclusive discount when Spectrum Pro launches.
            </p>
            <WaitlistForm id="cta-form" />
          </div>
        </div>
      </section>

    </div>
  );
}
