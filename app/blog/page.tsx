import { getAllBlogPosts, BLOG_TOPICS } from '@/lib/blog';
import { Metadata } from 'next';
import { generateBlogListingStructuredData, generateBlogBreadcrumbs } from '@/lib/seo-utils';
import { JsonLd } from '@/components/seo/json-ld';
import { PostCard } from '@/components/blog/post-card';

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

  const baseUrl = 'https://ui.spectrumhq.in';

  const structuredData = generateBlogListingStructuredData(
    blogPosts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      author: { name: post.author.name },
    })),
  );

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
  ]);

  // Shelves in editorial order; posts inside each keep newest-first order.
  const shelves = BLOG_TOPICS.map((topic) => ({
    topic,
    posts: blogPosts.filter((post) => post.topic === topic),
  })).filter((shelf) => shelf.posts.length > 0);

  return (
    <>
      <JsonLd id="blog-structured-data" data={structuredData} />
      <JsonLd id="blog-breadcrumbs" data={breadcrumbData} />

      <div className="container-frame border-b border-border bg-background">
        <div className="px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-[52px]">
          {/* Header */}
          <header className="enter-fx flex max-w-2xl flex-col gap-5">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-[9px] w-[9px] border-l-2 border-t-2 border-neutral-400 dark:border-neutral-500"
              />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-900 dark:text-neutral-100">
                The Journal
              </span>
            </span>
            <h1 className="font-spectral text-[30px] font-light leading-[0.95] tracking-[-0.09em] text-black text-balance sm:text-[42px] lg:text-[54px] lg:leading-[51px] lg:tracking-[-5px] dark:text-white">
              Notes on design &amp; engineering.
            </h1>
            <p className="max-w-[46ch] text-[15px] leading-[1.7] text-muted-foreground">
              Short, practical reads on components, design systems, and the craft in between —
              every one of them under three minutes.
            </p>
          </header>

          {/* Topic shelves */}
          <div className="mt-16 flex flex-col gap-20">
            {shelves.map(({ topic, posts }) => {
              const id = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <section key={topic} aria-labelledby={`shelf-${id}`}>
                  <h2
                    id={`shelf-${id}`}
                    className="inline-flex h-8 items-center rounded-full bg-black/4.5 px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:bg-white/[0.07] dark:text-neutral-200 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  >
                    {topic}
                  </h2>
                  <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
