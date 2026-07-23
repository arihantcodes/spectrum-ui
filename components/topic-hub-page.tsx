import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Code2, Component, Layers3 } from 'lucide-react';

import CommandFigure from '@/app/(docs)/docs/components/code-card/parts/command-figure';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { JsonLd } from '@/components/seo/json-ld';
import { TopicHubFaq } from '@/components/topic-hub-faq';
import type { TopicHub } from '@/content/topic-hubs';
import { getRelatedTopicHubs, getTopicHubComponents } from '@/content/topic-hubs';
import { createTopicHubStructuredData } from '@/lib/topic-hub-structured-data';
import { topicHubPath } from '@/lib/topic-hub-links';

const sectionClassName =
  'border-t border-neutral-200 px-5 py-14 dark:border-neutral-800 sm:px-8 md:px-10 md:py-20';
const eyebrowClassName =
  'font-regular text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-500';
const headingClassName =
  'mt-3 max-w-3xl font-regular text-2xl font-semibold tracking-[-0.015em] text-neutral-900 dark:text-neutral-50 sm:text-[28px]';
const bodyClassName =
  'font-regular text-[15px] leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base';

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
  const exportMatch = hub.codeExample.code.match(/export function (\w+)/);
  const codeExampleTitle = exportMatch ? `${exportMatch[1]}.tsx` : undefined;

  return (
    <>
      <TopicHubStructuredData hub={hub} />
      <article className="container-frame border-b border-neutral-200 dark:border-neutral-800">
        <header className="px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2 font-regular text-sm text-neutral-500 dark:text-neutral-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
                  /
                </li>
                <li>
                  <Link
                    href="/docs/guides"
                    className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
                  >
                    Guides
                  </Link>
                </li>
                <li aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
                  /
                </li>
                <li aria-current="page" className="text-neutral-900 dark:text-neutral-200">
                  {hub.label}
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-regular text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
              <Layers3 className="size-3.5" aria-hidden="true" />
              Developer guide
            </div>
            <h1 className="mt-5 max-w-4xl text-balance font-regular text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-[56px]">
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
                className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-5 font-regular text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-50 dark:text-neutral-900 dark:focus-visible:ring-neutral-600"
              >
                Browse {components.length} components
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#example"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 font-regular text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
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
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 md:grid-cols-3">
              {hub.whenToUse.map((useCase) => (
                <div key={useCase.title} className="bg-white p-6 dark:bg-neutral-950">
                  <span className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
                    <Check
                      className="size-4 text-neutral-700 dark:text-neutral-300"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-5 font-regular text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 font-regular text-sm leading-6 text-neutral-600 dark:text-neutral-400">
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
                  className="group flex min-h-40 flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-[transform,border-color,background-color] hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/40"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
                      <Component
                        className="size-4 text-neutral-700 dark:text-neutral-300"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="rounded-full border border-neutral-200 px-2.5 py-1 font-regular text-[11px] font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
                      {component.category}
                    </span>
                  </span>
                  <span className="mt-5 flex items-center gap-1.5 font-regular text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {component.name}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 font-regular text-sm leading-5 text-neutral-600 dark:text-neutral-400">
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
            <div className="mt-8 space-y-4">
              {hub.codeExample.installCommands.map((command) => {
                const addMatch = command.match(/shadcn(?:@latest)?\s+add\s+(.+)$/);
                return addMatch ? (
                  <CommandFigure key={command} cli={addMatch[1].trim()} requireAuth={false} />
                ) : (
                  <CommandFigure key={command} command={command} requireAuth={false} />
                );
              })}
              <CodeHighlight
                code={hub.codeExample.code}
                lang="tsx"
                requireAuth={false}
                title={codeExampleTitle}
              />
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
                  className="group rounded-xl border border-neutral-200 p-5 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
                >
                  <BookOpen
                    className="size-5 text-neutral-500 dark:text-neutral-400"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 flex items-center gap-1.5 font-regular text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {guide.title}
                    <ArrowUpRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2 font-regular text-sm leading-6 text-neutral-600 dark:text-neutral-400">
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
                  className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-5 font-regular text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900/40"
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
            <TopicHubFaq faqs={hub.faqs} />
          </div>
        </section>
      </article>
    </>
  );
}
