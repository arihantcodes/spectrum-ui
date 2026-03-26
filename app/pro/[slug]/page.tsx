import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { cache } from 'react'
import type { Metadata } from 'next'
import { 
  IconInfoCircle, 
  IconBrandNextjs, 
  IconBrandTailwind, 
  IconBrandFigma, 
  IconMarkdown,
  IconCalendar,
  IconVersions,
  IconBrandReact,
  IconBrandFramer,
  IconFileCode
} from '@tabler/icons-react'
import { TemplateBuySection } from './TemplateBuySection'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { ImageGallery } from '@/components/template/Gallery'
import { Icons } from '@/components/icon'
import { cn } from '@/lib/utils'

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

// ── Helper: Map Tech to Icons ───────────────────────────────────────────────
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <IconBrandNextjs size={18} className="text-black dark:text-white" />
  if (t.includes('react')) return <IconBrandReact size={18} className="text-[#61DAFB]" />
  if (t.includes('tailwind')) return <IconBrandTailwind size={18} className="text-[#38BDF8]" />
  if (t.includes('typescript')) return <Icons.typeScript className="h-[18px] w-[18px]" />
  if (t.includes('figma')) return <IconBrandFigma size={18} className="text-[#F24E1E]" />
  if (t.includes('framer')) return <IconBrandFramer size={18} className="text-black dark:text-white" />
  if (t.includes('markdown') || t.includes('mdx')) return <IconMarkdown size={18} className="text-[#000000] dark:text-white" />
  if (t.includes('shadcn')) return <Icons.shadcnblock className="h-[18px] w-[18px]" />
  if (t.includes('contentlayer')) return <IconFileCode size={18} className="text-[#7C3AED]" />
  return <IconInfoCircle size={18} className="text-muted-foreground" />
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

  // ── Ownership Check ──
  const session = await auth()
  let isOwned = false
  if (session?.user?.email) {
    const { count } = await supabaseAdmin
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .eq('email', session.user.email)
      .eq('template_slug', slug)
      .eq('status', 'active')
    isOwned = (count ?? 0) > 0
  }

  // Gallery images (fallback to thumbnail if no more images)
  const galleryImages = template.thumbnail_url ? [template.thumbnail_url] : []
  // In a real scenario, we might have multiple images in a JSON field
  
  const lastUpdated = template.created_at ? new Date(template.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'March 2024'

  const features = (template.features && template.features.length > 0) ? template.features : [
    '100+ components included',
    'Responsive mobile-first design',
    'SEO and metadata optimized',
    'Dark mode support out of the box',
    'Clean and documented source code',
    'Production ready with 100% type safety',
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* ── Header Area ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <BreadcrumbNav 
          items={[
            { label: 'Pro', href: '/pro' },
            { label: template.name }
          ]} 
        />
      </div>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Right: Product Info (Reordered to top on mobile) ──────────────── */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-12 self-start order-1 lg:order-2">
            {/* Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{template.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {template.tagline || "A premium, production-ready template for modern web applications."}
              </p>
            </div>

            {/* Premium Banner */}
            {/* <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded-2xl flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <IconCheck size={14} strokeWidth={3} />
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                Get lifetime access to <span className="font-bold">all templates</span> and blocks on the <Link href="/pricing" className="underline hover:opacity-80 transition-opacity">Premium Plan 🚀</Link>
              </p>
            </div> */}

            {/* Version Selection */}
            <div className="space-y-4">
              <div className={cn(
                "group relative p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white dark:bg-black",
                "border-[#6366F1] ring-4 ring-[#6366F1]/10"
              )}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <IconBrandNextjs size={20} />
                    <span className="font-bold">Next.js</span>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-[#6366F1] flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#6366F1]" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Premium Next.js Template</p>
              </div>
            </div>

            {/* Buy Section */}
            <TemplateBuySection
              isOwned={isOwned}
              template={{
                slug: template.slug,
                name: template.name,
                price: template.price,
                tagline: template.tagline ?? '',
                preview_url: template.preview_url,
              }}
            />

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-6 py-4 border-y border-neutral-100 dark:border-neutral-900">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-muted-foreground">
                   <IconVersions size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Version</p>
                   <p className="text-sm font-semibold">1.0.0</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-muted-foreground">
                   <IconCalendar size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Updated</p>
                   <p className="text-sm font-semibold">{lastUpdated}</p>
                 </div>
               </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {template.tech_stack?.map((tech: string) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center transition-transform hover:scale-110">
                      {getTechIcon(tech)}
                    </div>
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Features</h3>
              <ul className="space-y-3">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-muted-foreground group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Left: Image Gallery (Below info on mobile) ─────────────────── */}
          <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
            <ImageGallery images={galleryImages} alt={template.name} />
            
            {/* Description */}
            <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-900">
              <h2 className="text-2xl font-bold tracking-tight">About this template</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-base">
                {template.description || "The ultimate foundation for your next project. Built with precision and a focus on developer experience."}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
