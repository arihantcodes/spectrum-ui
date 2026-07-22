import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { generateBlogStructuredData, generateBlogBreadcrumbs, toIsoDate } from '@/lib/seo-utils';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { BlogCard } from '../blog-card';
import { JsonLd } from '@/components/seo/json-ld';
import {
  createNoIndexMetadata,
  formatMetadataDescription,
  formatMetadataTitle,
} from '@/lib/metadata';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return createNoIndexMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested Spectrum UI blog post could not be found.',
      path: `/blog/${params.slug}`,
    });
  }

  const baseUrl = 'https://ui.spectrumhq.in';
  const blogUrl = `${baseUrl}/blog/${post.slug}`;
  const metadataTitle = formatMetadataTitle(post.title);
  const metadataDescription = formatMetadataDescription(post.excerpt);
  const publishedTime = toIsoDate(post.date);

  return {
    title: { absolute: metadataTitle },
    description: metadataDescription,
    keywords: [
      'React components',
      'Tailwind CSS',
      'Next.js',
      'shadcn/ui',
      'design system',
      'frontend development',
      post.category?.toLowerCase() || '',
    ].filter(Boolean),
    authors: [{ name: post.author.name, url: 'https://ui.spectrumhq.in' }],
    creator: post.author.name,
    publisher: 'Spectrum UI',
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: blogUrl,
      siteName: 'Spectrum UI',
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime,
      authors: [post.author.name],
      section: post.category || 'Engineering',
      tags: ['UI components', 'React', 'Tailwind CSS', 'Next.js', post.category || 'Engineering'],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataTitle,
      description: metadataDescription,
      creator: '@arihantcodes',
      images: [`${baseUrl}/og.png`],
    },
    alternates: {
      canonical: blogUrl,
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
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = 'https://ui.spectrumhq.in';
  const blogUrl = `${baseUrl}/blog/${post.slug}`;

  // Related posts: same category first, then fill with the most recent others.
  const allPosts = await getAllBlogPosts();
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category && p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))].slice(0, 3);

  const authorRole = post.author.role || 'Design Engineer';

  // Generate structured data
  const structuredData = generateBlogStructuredData({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: blogUrl,
    image: `${baseUrl}/og.png`,
    category: post.category || 'Engineering',
  });

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: blogUrl },
  ]);

  return (
    <>
      <JsonLd id="blog-post-structured-data" data={structuredData} />
      <JsonLd id="blog-post-breadcrumbs" data={breadcrumbData} />

      <div className="relative min-h-screen font-inter text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        {/* Page-wide grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] dark:opacity-[0.05]"
        />

        <div className="relative z-10">
          {/* Article */}
          <section className="container-frame border-b border-border">
            <div className="mx-auto max-w-[768px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
              {/* Back link */}
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-inter text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
                >
                  <path
                    d="M10 3L5 8l5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                The Journal
              </Link>

              <article itemScope itemType="https://schema.org/BlogPosting" className="mt-8">
                {/* Header */}
                <header className="flex flex-col gap-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="h-[9px] w-[9px] border-l-2 border-t-2 border-neutral-400 dark:border-neutral-500"
                    />
                    <span className="font-inter text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
                      {post.category || 'Engineering'}
                      <span className="mx-2 text-neutral-300 dark:text-neutral-600">/</span>
                      {post.readTime}
                    </span>
                  </div>

                  <h1
                    itemProp="headline"
                    className="font-regular text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-neutral-900 sm:text-[44px] dark:text-neutral-50"
                  >
                    {post.title}
                  </h1>

                  <p className="max-w-[62ch] font-inter text-[17px] leading-[1.6] text-neutral-600 dark:text-neutral-400">
                    {post.excerpt}
                  </p>

                  {/* Byline */}
                  <div className="mt-2 flex items-center justify-between gap-4 border-t border-black/[0.07] pt-6 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
                        <AvatarImage src={post.author.avatar || '/placeholder.svg'} />
                        <AvatarFallback className="bg-neutral-100 text-[13px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-200">
                          {post.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                        className="flex flex-col leading-tight"
                      >
                        <span
                          itemProp="name"
                          className="text-[14px] font-medium text-neutral-900 dark:text-neutral-100"
                        >
                          {post.author.name}
                        </span>
                        <span className="text-[12.5px] text-neutral-500 dark:text-neutral-500">
                          {authorRole}
                        </span>
                      </div>
                    </div>
                    <time
                      itemProp="datePublished"
                      dateTime={post.date}
                      className="font-inter text-[11px] uppercase tracking-[0.04em] text-neutral-500 dark:text-neutral-500"
                    >
                      {post.date}
                    </time>
                  </div>
                </header>

                {/* Article Content */}
                <div
                  itemProp="articleBody"
                  className="prose prose-neutral dark:prose-invert mt-10 max-w-none font-inter text-[15px] leading-[1.75] text-neutral-700 dark:text-neutral-300 prose-headings:font-regular prose-headings:font-semibold prose-headings:tracking-[-0.015em] prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-[3px] dark:prose-a:text-neutral-100 prose-code:font-mono prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100"
                >
                  {post.content}
                </div>
              </article>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="container-frame border-b border-border">
            <div className="mx-auto max-w-[768px] px-5 py-16 sm:px-8">
              <NewsletterSignup variant="inline" />
            </div>
          </section>

          {/* Related Posts */}
          {related.length > 0 && (
            <section className="container-frame border-b border-border">
              <div className="mx-auto max-w-[768px] px-5 py-16 sm:px-8">
                <div className="mb-8 flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-[9px] w-[9px] border-l-2 border-t-2 border-neutral-400 dark:border-neutral-500"
                  />
                  <h2 className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-neutral-900 dark:text-neutral-100">
                    Keep reading
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
                  {related.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
