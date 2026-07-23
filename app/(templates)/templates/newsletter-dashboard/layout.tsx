import type { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';

export const metadata: Metadata = baseMetadata({
  title: 'Newsletter Dashboard — React Template',
  description:
    'Preview and copy a React newsletter dashboard with subscriber data, campaign analytics, charts, and a responsive Next.js layout.',
  canonicalUrl: 'https://ui.spectrumhq.in/templates/newsletter-dashboard',
});

export default function NewsletterDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
