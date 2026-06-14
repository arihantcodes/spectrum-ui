import { getAllBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { generateBlogListingStructuredData, generateBlogBreadcrumbs } from '@/lib/seo-utils';
import { BlogList } from './blog-list';

export const metadata: Metadata = {
  title: 'Blog | Spectrum UI - UI Components & Design System',
  description: 'Learn about UI components, React development, design systems, and frontend best practices. Expert insights on building scalable web applications with modern tools.',
  keywords: [
    'UI components blog',
    'React development',
    'design system',
    'frontend development',
    'web development',
    'UI/UX',
    'component library',
    'Tailwind CSS',
    'Next.js',
    'shadcn/ui',
    'engineering blog',
    'web design',
    'user interface',
    'frontend engineering',
  ].join(', '),
  authors: [{ name: 'Arihant Jain', url: 'https://ui.spectrumhq.in' }],
  creator: 'Arihant Jain',
  publisher: 'Spectrum UI',
  openGraph: {
    title: 'Blog | Spectrum UI - UI Components & Design System',
    description: 'Learn about UI components, React development, design systems, and frontend best practices. Expert insights on building scalable web applications.',
    url: 'https://ui.spectrumhq.in/blog',
    siteName: 'Spectrum UI',
    images: [
      {
        url: 'https://ui.spectrumhq.in/og.png',
        width: 1200,
        height: 630,
        alt: 'Spectrum UI Blog - UI Components & Design System',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Spectrum UI - UI Components & Design System',
    description: 'Learn about UI components, React development, design systems, and frontend best practices.',
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

  console.log(
    'Blog posts fetched:',
    blogPosts.map((post) => post),
  );

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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <BlogList blogPosts={blogPosts} />
    </>
  );
}
