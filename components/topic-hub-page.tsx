import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Code2, Component, Layers3 } from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import type { TopicHub } from '@/content/topic-hubs';
import { getRelatedTopicHubs, getTopicHubComponents } from '@/content/topic-hubs';
import { createTopicHubStructuredData } from '@/lib/topic-hub-structured-data';
import { topicHubPath } from '@/lib/topic-hub-links';

const sectionClassName = 'border-t border-border px-5 py-14 sm:px-8 md:px-10 md:py-20';
const eyebrowClassName =
  'font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground';
const headingClassName =
  'mt-3 max-w-3xl text-2xl font-medium tracking-[-0.02em] text-foreground sm:text-3xl';
const bodyClassName = 'text-[15px] leading-7 tracking-[0.005em] text-muted-foreground sm:text-base';

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className={eyebrowClassName}>{eyebrow}</p>
      <h2 id={id} className={headingClassName}>
        {title}
      </h2>
      {description ? <p className={`mt-4 max-w-3xl ${bodyClassName}`}>{description}</p> : null}
    </div>
  );
}

function TopicHubStructuredData({ hub }: { hub: TopicHub }) {
  const { collection, breadcrumbs, faq } = createTopicHubStructuredData(hub);

  return (
    <>
      <JsonLd id={`${hub.slug}-collection`} data={collection} />
      <JsonLd id={`${hub.slug}-breadcrumbs`} data={breadcrumbs} />
      <JsonLd id={`${hub.slug}-faqs`} data={faq} />
    </>
  );
}

export function TopicHubPage({ hub }: { hub: TopicHub }) {
  const components = getTopicHubComponents(hub);
  const relatedHubs = getRelatedTopicHubs(hub);

  return (
    <>
      <TopicHubStructuredData hub={hub} />
      <article className="container-frame border-b border-border">
        <header className="relative overflow-hidden px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,hsl(var(--muted))_0,transparent_35%)] opacity-70"
          />
          <div className="relative mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/docs/guides" className="transition-colors hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground">
                  {hub.label}
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
              <Layers3 className="size-3.5" aria-hidden="true" />
              Developer guide
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              {hub.title}
            </h1>
            <div className="mt-7 flex max-w-3xl flex-col gap-4">
              {hub.intro.map((paragraph) => (
                <p key={paragraph} className={bodyClassName}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Browse {components.length} components
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#example"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                View code example
                <Code2 className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <section className={sectionClassName} aria-labelledby="definition">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              id="definition"
              eyebrow="Definition"
              title={`What ${hub.label} means`}
            />
            <div className="mt-7 grid gap-5 md:grid-cols-2 md:gap-10">
              {hub.definition.map((paragraph) => (
                <p key={paragraph} className={bodyClassName}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="when-to-use">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              id="when-to-use"
              eyebrow="Decision guide"
              title="When to use these patterns"
            />
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {hub.whenToUse.map((useCase) => (
                <div key={useCase.title} className="bg-background p-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <Check className="size-4 text-foreground" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-medium text-foreground">{useCase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="components"
          className={`${sectionClassName} scroll-m-16`}
          aria-labelledby="components-heading"
        >
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              id="components-heading"
              eyebrow="Spectrum UI catalog"
              title={`${hub.label} to explore`}
              description="Open a component page to inspect its live example, editable source, installation command, dependencies, API details, accessibility notes, and related components."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={component.href}
                  className="group flex min-h-40 flex-col rounded-xl border border-border bg-background p-5 transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <Component className="size-4 text-foreground" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {component.category}
                    </span>
                  </span>
                  <span className="mt-5 flex items-center gap-1.5 text-base font-medium text-foreground">
                    {component.name}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 text-sm leading-5 text-muted-foreground">
                    {component.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="example"
          className={`${sectionClassName} scroll-m-16`}
          aria-labelledby="example-heading"
        >
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              id="example-heading"
              eyebrow="Working example"
              title={hub.codeExample.title}
              description={hub.codeExample.description}
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-neutral-950 text-neutral-100 shadow-sm">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-xs text-neutral-400">
                <Code2 className="size-4" aria-hidden="true" />
                Install
              </div>
              <div className="space-y-2 border-b border-white/10 px-5 py-4">
                {hub.codeExample.installCommands.map((command) => (
                  <pre key={command} className="overflow-x-auto font-mono text-[13px] leading-6">
                    <code>{command}</code>
                  </pre>
                ))}
              </div>
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-xs text-neutral-400">
                <Code2 className="size-4" aria-hidden="true" />
                React
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-neutral-200">
                <code>{hub.codeExample.code}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="guides-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="guides-heading" eyebrow="Further reading" title="Linked guides" />
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {hub.guideLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-xl border border-border p-5 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <BookOpen className="size-5 text-muted-foreground" aria-hidden="true" />
                  <h3 className="mt-5 flex items-center gap-1.5 text-base font-medium text-foreground">
                    {guide.title}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="related-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              id="related-heading"
              eyebrow="Explore next"
              title="Related topic guides"
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {relatedHubs.map((related) => (
                <Link
                  key={related.slug}
                  href={topicHubPath(related.slug)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border p-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {related.label}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="faq-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="faq-heading" eyebrow="FAQ" title={`${hub.label} questions`} />
            <div className="mt-8 divide-y divide-border border-y border-border">
              {hub.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer pr-6 text-base font-medium text-foreground marker:text-muted-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
