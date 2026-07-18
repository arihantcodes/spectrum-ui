import { Metadata } from 'next'
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata'
import { DocsCatalog } from './docs-catalog'

export const metadata: Metadata = baseMetadata({
  title: 'Components',
  description:
    'Browse Spectrum UI’s animation-ready React components and blocks, with copy-paste source for Next.js, Tailwind CSS, Motion, and shadcn/ui projects.',
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
