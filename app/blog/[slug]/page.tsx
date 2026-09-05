import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog"
import { Metadata } from "next"
import {
  generateBlogStructuredData,
  generateBlogBreadcrumbs,
  generateFAQStructuredData,
  toIsoDate,
} from "@/lib/seo-utils"
import { JsonLd } from "@/components/seo/json-ld"
import OnThisPage from "@/app/(docs)/layout-parts/on-this-page"
import { BlogHighlighter } from "@/components/blog/highlighter"
import { PostCard } from "@/components/blog/post-card"
import {
  createNoIndexMetadata,
  formatMetadataDescription,
  formatMetadataTitle,
} from "@/lib/metadata"

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPost(params.slug)

  if (!post) {
    return createNoIndexMetadata({
      title: "Blog Post Not Found",
      description: "The requested Spectrum UI blog post could not be found.",
      path: `/blog/${params.slug}`,
    })
  }

  const baseUrl = "https://ui.spectrumhq.in"
  const blogUrl = `${baseUrl}/blog/${post.slug}`
  const metadataTitle = formatMetadataTitle(post.title)
  const metadataDescription = formatMetadataDescription(post.excerpt)
  const publishedTime = toIsoDate(post.date)

  return {
    title: { absolute: metadataTitle },
    description: metadataDescription,
    keywords: [
      "React components",
      "Tailwind CSS",
      "Next.js",
      "shadcn/ui",
      "design system",
      "frontend development",
      post.category?.toLowerCase() || "",
    ].filter(Boolean),
    authors: [{ name: post.author.name, url: "https://ui.spectrumhq.in" }],
    creator: post.author.name,
    publisher: "Spectrum UI",
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: blogUrl,
      siteName: "Spectrum UI",
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime,
      authors: [post.author.name],
      section: post.category || "Engineering",
      tags: [
        "UI components",
        "React",
        "Tailwind CSS",
        "Next.js",
        post.category || "Engineering",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      creator: "@arihantcodes",
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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const baseUrl = "https://ui.spectrumhq.in"
  const blogUrl = `${baseUrl}/blog/${post.slug}`
  const isoDate = toIsoDate(post.date)

  // Keep reading: same shelf first, then the most recent of the rest.
  const allPosts = await getAllBlogPosts()
  const others = allPosts.filter((p) => p.slug !== post.slug)
  const sameTopic = others.filter((p) => p.topic === post.topic)
  const related = [...sameTopic, ...others.filter((p) => !sameTopic.includes(p))].slice(0, 3)

  const structuredData = generateBlogStructuredData({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: blogUrl,
    image: `${baseUrl}/og.png`,
    category: post.category || "Engineering",
    topic: post.topic,
    readTime: post.readTime,
  })

  const breadcrumbData = generateBlogBreadcrumbs([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: blogUrl },
  ])

  // FAQ feeds "People also ask" + AI answer extraction — the strongest AEO
  // signal we can attach per post. Rendered visibly below the article too.
  const faqData = post.faqs?.length ? generateFAQStructuredData(post.faqs) : null

  return (
    <>
      <JsonLd id="blog-post-structured-data" data={structuredData} />
      <JsonLd id="blog-post-breadcrumbs" data={breadcrumbData} />
      {faqData && <JsonLd id="blog-post-faq" data={faqData} />}

      {/* Article band — framed by the site's side borders, like every
          landing section. A three-track grid (gutter · article · gutter)
          keeps the reading column dead-center on the page while the TOC
          rides the right gutter and never nudges the text off-center. */}
      <section className="container-frame bg-background">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-y-0 px-5 py-12 sm:px-8 sm:py-16 xl:grid-cols-[1fr_minmax(0,40rem)_1fr] xl:gap-x-10">
          <div className="hidden xl:block" aria-hidden="true" />
          <div className="mx-auto w-full max-w-160 xl:mx-0 xl:max-w-none">
            <div className="enter-fx w-full">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
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

              <article itemScope itemType="https://schema.org/BlogPosting" className="mt-9">
                <header className="border-b border-border/70 pb-8">
                  {/* datePublished stays machine-readable here (and in JSON-LD)
                      for SEO even though the author byline is intentionally gone. */}
                  <p className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    <span>{post.topic}</span>
                    <span aria-hidden="true" className="text-border">/</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true" className="text-border">/</span>
                    <time dateTime={isoDate}>{post.date}</time>
                  </p>

                  <h1
                    itemProp="headline"
                    className="mt-5 font-spectral text-[30px] font-light leading-[1.02] tracking-[-0.09em] text-black text-balance sm:text-[42px] sm:leading-none lg:tracking-[-3px] dark:text-white"
                  >
                    {post.title}
                  </h1>

                  <p
                    data-blog-excerpt
                    className="mt-4 text-[16px] leading-[1.7] text-muted-foreground"
                  >
                    {post.excerpt}
                  </p>
                </header>

                {/* Client wrapper enables Medium-style persistent highlights. */}
                <BlogHighlighter storageKey={post.slug}>
                  <div
                    id="post-body"
                    itemProp="articleBody"
                    className="typeset typeset-article mt-9"
                  >
                    {post.content}
                  </div>
                </BlogHighlighter>

                {/* FAQ — visible Q&A that mirrors the FAQPage JSON-LD, so the
                    same answers an assistant quotes are on the page too. */}
                {post.faqs?.length ? (
                  <section aria-labelledby="faq-heading" className="mt-14 border-t border-border/70 pt-10">
                    <h2
                      id="faq-heading"
                      className="font-spectral text-[24px] font-light leading-[1.1] tracking-[-0.04em] text-foreground sm:text-[28px]"
                    >
                      Frequently asked questions
                    </h2>
                    <dl className="mt-6 divide-y divide-border/60">
                      {post.faqs.map((faq) => (
                        <div key={faq.question} className="py-5 first:pt-0">
                          <dt className="text-[15.5px] font-medium text-foreground">{faq.question}</dt>
                          <dd className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">
                            {faq.answer}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ) : null}
              </article>
            </div>
          </div>

          {/* TOC rides the right gutter track — same tree-rail style as the
              docs "On This Page". */}
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <OnThisPage containerSelector="#post-body" />
            </div>
          </aside>
        </div>
      </section>

      {/* Keep reading */}
      {related.length > 0 && (
        <section className="container-frame bg-background">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8">
            <h2 className="inline-flex h-8 items-center rounded-full bg-black/4.5 px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:bg-white/[0.07] dark:text-neutral-200 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09),inset_0_1px_0_rgba(255,255,255,0.05)]">
              Keep reading
            </h2>
            <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
