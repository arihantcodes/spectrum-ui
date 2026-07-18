import { Metadata } from 'next'
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata'
import { DocsCatalog } from './docs-catalog'

export const metadata: Metadata = baseMetadata({
  title: 'Components',
  description:
    'Browse 60+ free React and Next.js UI components from Spectrum UI. Copy-paste accessible Tailwind components for dashboards, SaaS, and modern web apps.',
  keywords: [
    'Spectrum UI components',
    'React UI component list',
    'Next.js component library',
    'Tailwind CSS components',
    'copy paste React components',
    'free UI components',
    'shadcn alternative components',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs',
})

export default function DocsPage() {
  return <DocsCatalog />
}
