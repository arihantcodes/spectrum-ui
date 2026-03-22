import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconBrandGithub,
  IconExternalLink,
  IconArrowLeft,
  IconCheck,
  IconCode,
  IconDevices,
  IconRocket,
} from '@tabler/icons-react'
import { TemplateBuySection } from './TemplateBuySection'

// ── SSR: Fetch template at build/request time ────────────────────────────────
const getTemplate = cache(async (slug: string) => {
  const { data, error } = await supabaseAdmin
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) return null
  return data
})

// ── SEO: Dynamic metadata ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplate(slug)
  if (!template) return { title: 'Template Not Found' }

  return {
    title: `${template.name} — Spectrum Pro`,
    description: template.tagline ?? `Premium ${template.name} template by Spectrum UI`,
    openGraph: {
      title: `${template.name} — Spectrum Pro`,
      description: template.tagline ?? undefined,
      images: template.thumbnail_url ? [template.thumbnail_url] : undefined,
    },
  }
}

// ── Page Component ───────────────────────────────────────────────────────────
export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = await getTemplate(slug)
  if (!template) notFound()

  const priceDisplay = `$${(template.price / 100).toFixed(2).replace(/\.00$/, '')}`

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/pro"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground
            hover:text-foreground transition-colors"
        >
          <IconArrowLeft size={14} />
          Back to templates
        </Link>
      </div>

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left — Preview */}
          <div className="lg:col-span-3">
            {/* Live Preview / Thumbnail */}
            <div className="aspect-video rounded-xl border border-neutral-200 dark:border-neutral-800
              bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative group">
              {template.preview_url ? (
                <>
                  <iframe
                    src={template.preview_url}
                    title={`${template.name} Preview`}
                    className="w-full h-full border-0 pointer-events-none"
                    loading="lazy"
                  />
                  {/* Click to open full preview */}
                  <a
                    href={template.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center
                      bg-black/0 group-hover:bg-black/40 transition-all duration-300 cursor-pointer"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      text-white text-sm font-semibold bg-white/20 backdrop-blur-sm
                      border border-white/30 px-5 py-2.5 rounded-lg
                      flex items-center gap-2">
                      <IconExternalLink size={15} />
                      Open Live Preview
                    </span>
                  </a>
                </>
              ) : template.thumbnail_url ? (
                <img
                  src={template.thumbnail_url}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <IconDevices size={40} strokeWidth={1.5} />
                    <span className="text-sm font-medium">Preview coming soon</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {template.description && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-3">About this template</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </div>
            )}

            {/* What's Included */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">What&apos;s included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <IconCode size={16} />, text: 'Full source code access' },
                  { icon: <IconBrandGithub size={16} />, text: 'Private GitHub repo' },
                  { icon: <IconRocket size={16} />, text: 'Production-ready setup' },
                  { icon: <IconCheck size={16} />, text: 'Free updates forever' },
                ].map((item, i) => (
                  <div key={i}
                    className="flex items-center gap-3 p-3 rounded-lg
                      bg-neutral-50 dark:bg-neutral-900/60
                      border border-neutral-200 dark:border-neutral-800">
                    <div className="text-muted-foreground">{item.icon}</div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Buy Card (sticky) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800
                bg-neutral-50 dark:bg-[#111] p-6
                shadow-sm dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
                {/* Name + Price */}
                <div className="mb-4">
                  {template.category && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest
                      text-muted-foreground mb-2 block">
                      {template.category}
                    </span>
                  )}
                  <h1 className="text-2xl font-bold text-foreground">{template.name}</h1>
                  {template.tagline && (
                    <p className="text-sm text-muted-foreground mt-1">{template.tagline}</p>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-foreground">{priceDisplay}</span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </div>

                {/* Tech Stack */}
                {template.tech_stack && template.tech_stack.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest
                      text-muted-foreground mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {template.tech_stack.map((tech: string) => (
                        <span key={tech}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md
                            bg-white dark:bg-neutral-800
                            border border-neutral-200 dark:border-neutral-700
                            text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buy Button — Client Component */}
                <TemplateBuySection
                  template={{
                    slug: template.slug,
                    name: template.name,
                    price: template.price,
                    tagline: template.tagline ?? '',
                  }}
                />

                {/* Guarantees */}
                <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-neutral-800">
                  <ul className="space-y-2">
                    {[
                      'One-time payment, yours forever',
                      'Instant GitHub repo access',
                      'Clone, customize, and ship',
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <IconCheck size={13} className="text-green-500 shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Live preview link */}
              {template.preview_url && (
                <a
                  href={template.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2
                    text-sm text-muted-foreground hover:text-foreground
                    transition-colors py-2"
                >
                  <IconExternalLink size={14} />
                  View live preview
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
