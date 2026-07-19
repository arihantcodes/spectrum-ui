import { getAllBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { generateBlogListingStructuredData, generateBlogBreadcrumbs } from '@/lib/seo-utils';
import { BlogList } from './blog-list';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: {
    absolute: 'Blog | Spectrum UI',
  },
  description:
    'UI components, React, design systems, and frontend engineering from Spectrum UI. Practical guides for shipping better Next.js interfaces.',
  keywords: [
    'UI components blog',
    'React development',
    'design system',
    'frontend development',
    'Tailwind CSS',
    'Next.js',
    'Spectrum UI blog',
  ],
  authors: [{ name: 'Arihant Jain', url: 'https://ui.spectrumhq.in' }],
  creator: 'Arihant Jain',
  publisher: 'Spectrum UI',
  openGraph: {
    title: 'Blog | Spectrum UI',
    description:
      'UI components, React, design systems, and frontend engineering from Spectrum UI.',
    url: 'https://ui.spectrumhq.in/blog',
    siteName: 'Spectrum UI',
    images: [
      {
        url: 'https://ui.spectrumhq.in/og.png',
        width: 1200,
        height: 630,
        alt: 'Spectrum UI Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Spectrum UI',
    description:
      'UI components, React, design systems, and frontend engineering from Spectrum UI.',
    creator: '@arihantcodes',
    images: ['https://ui.spectrumhq.in/og.png'],
  },
  alternates: {
    canonical: 'https://ui.spectrumhq.in/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  const baseUrl = "https://ui.spectrumhq.in";
  
  // Generate structured data for blog listing
  const structuredData = generateBlogListingStructuredData(
    blogPosts.map(post => ({
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      author: { name: post.author.name },
    }))
  );

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
  ]);

  return (
    <>
      <JsonLd id="blog-structured-data" data={structuredData} />
      <JsonLd id="blog-breadcrumbs" data={breadcrumbData} />
      
      <BlogList blogPosts={blogPosts} />
    </>
  );
}
