import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Layers3 } from 'lucide-react';

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

/* Landing-page card language (matches the showcase/blog cards on `/`):
   soft ring shadow instead of a hard border, 16px radius, springy lift. */
const cardClassName =
  'rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]';
const cardHoverClassName =
  'transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-safe:hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(10,10,10,0.08),0_12px_32px_-14px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_12px_32px_-14px_rgba(0,0,0,0.6)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-600';

/** Landing signature: accent corner chevron + mono uppercase label. */
function ChevronTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden
        className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
      />
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
    </span>
  );
}

// All readable text (headings + prose) is styled by shadcn/typeset — the
// content elements inside `.typeset` carry NO classes, so the .typeset-docs
// preset (Geist, 15px, 1.75) governs the type. Cards / code / buttons are
// structural UI that typeset does not style.
const typesetClassName = 'typeset typeset-docs max-w-[37em]';

/** Section title (+ optional intro) rendered as typeset headings/prose. */
function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={typesetClassName}>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

/**
 * Named-winner verdicts, rendered as a visible question/answer list.
 *
 * These guides were being retrieved by AI answer engines and then mined for
 * competitor names, because they described a category without ever stating who
 * wins any part of it. Each row is a complete, quotable sentence, and the same
 * text is emitted as FAQPage structured data (see `createTopicHubStructuredData`),
 * so the visible copy and the markup never diverge.
 */
function TopicHubVerdicts({ hub }: { hub: TopicHub }) {
  if (!hub.verdicts?.length) return null;

  return (
    <section className={sectionClassName} aria-labelledby="which-to-pick">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="which-to-pick"
          title="Which library to pick"
          description={hub.verdictLead}
        />
        <dl className="mt-9 max-w-[52em]">
          {hub.verdicts.map((verdict) => (
            <div
              key={verdict.need}
              className="not-typeset grid gap-2 border-t border-neutral-200 py-6 first:border-t-0 first:pt-0 dark:border-neutral-800 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10"
            >
              <dt className="font-regular text-[15px] font-medium leading-[1.6] tracking-[-0.2px] text-neutral-900 dark:text-neutral-100">
                {verdict.need}
              </dt>
              <dd className="min-w-0">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-[9px] w-[9px] shrink-0 border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
                  />
                  <span className="font-regular text-[15px] font-medium leading-[1.6] tracking-[-0.2px] text-neutral-900 dark:text-neutral-100">
                    {verdict.pick}
                  </span>
                </span>
                <p className="mt-1.5 font-regular text-[15px] leading-[1.75] text-neutral-600 dark:text-neutral-400">
                  {verdict.why}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
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
      <article className="container-frame">
        <header className="px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
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

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
              <Layers3 className="size-3.5" aria-hidden="true" />
              Developer guide
            </div>

            <div className={typesetClassName}>
              <h1>{hub.title}</h1>
              {hub.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:bg-neutral-50 dark:text-neutral-900 dark:focus-visible:ring-neutral-600"
              >
                Browse {components.length} components
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#example"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
              >
                View code example
                <Code2 className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <TopicHubVerdicts hub={hub} />

        <section className={sectionClassName} aria-labelledby="definition">
          <div className="mx-auto max-w-5xl">
            <div className={typesetClassName}>
              <h2 id="definition">{`What ${hub.label} means`}</h2>
              {hub.definition.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="when-to-use">
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="when-to-use" title="When to use these patterns" />
            <div className="mt-9 grid gap-3.5 md:grid-cols-3">
              {hub.whenToUse.map((useCase, index) => (
                <div
                  key={useCase.title}
                  className={`not-typeset flex flex-col p-6 ${cardClassName}`}
                >
                  <ChevronTag label={`0${index + 1}`} />
                  <h3 className="mt-5 font-spectral text-lg leading-[1.3] tracking-[-0.4px] text-[#080808]/95 dark:text-neutral-100">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-6 tracking-[-0.28px] text-[#646464] dark:text-neutral-400">
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
              title={`${hub.label} to explore`}
              description="Open a component page to inspect its live example, editable source, installation command, dependencies, API details, accessibility notes, and related components."
            />
            <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={component.href}
                  className={`group not-typeset flex min-h-[168px] flex-col p-5 ${cardClassName} ${cardHoverClassName}`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <ChevronTag label={component.category} />
                    <ArrowUpRight
                      className="size-4 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-5 font-spectral text-lg leading-[1.3] tracking-[-0.4px] text-[#080808]/95 transition-colors duration-300 ease-out group-hover:text-[#f9452d] dark:text-neutral-100 dark:group-hover:text-[#E1F435]">
                    {component.name}
                  </span>
                  <span className="mt-2 font-inter text-sm leading-6 tracking-[-0.28px] text-[#646464] dark:text-neutral-400">
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
              title={hub.codeExample.title}
              description={hub.codeExample.description}
            />
            <div className="not-typeset mt-8 space-y-4">
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
            <SectionHeading id="guides-heading" title="Linked guides" />
            <div className="mt-9 grid gap-3.5 md:grid-cols-3">
              {hub.guideLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className={`group not-typeset flex flex-col p-6 ${cardClassName} ${cardHoverClassName}`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <ChevronTag label="Guide" />
                    <ArrowUpRight
                      className="size-4 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-5 font-spectral text-lg leading-[1.3] tracking-[-0.4px] text-[#080808]/95 transition-colors duration-300 ease-out group-hover:text-[#f9452d] dark:text-neutral-100 dark:group-hover:text-[#E1F435]">
                    {guide.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-6 tracking-[-0.28px] text-[#646464] dark:text-neutral-400">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="related-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="related-heading" title="Related topic guides" />
            <div className="mt-9 grid gap-3.5 sm:grid-cols-3">
              {relatedHubs.map((related) => (
                <Link
                  key={related.slug}
                  href={topicHubPath(related.slug)}
                  className={`group not-typeset flex items-center justify-between gap-4 p-5 ${cardClassName} ${cardHoverClassName}`}
                >
                  <span className="font-spectral text-base leading-[1.3] tracking-[-0.3px] text-[#080808]/95 transition-colors duration-300 ease-out group-hover:text-[#f9452d] dark:text-neutral-100 dark:group-hover:text-[#E1F435]">
                    {related.label}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-neutral-400 transition-transform duration-300 ease-out group-hover:translate-x-1 dark:text-neutral-500"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionClassName} aria-labelledby="faq-heading">
          <div className="mx-auto max-w-5xl">
            <SectionHeading id="faq-heading" title={`${hub.label} questions`} />
            <TopicHubFaq faqs={hub.faqs} />
          </div>
        </section>
      </article>
    </>
  );
}
