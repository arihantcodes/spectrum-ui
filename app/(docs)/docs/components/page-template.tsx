import React from 'react';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '@/components/bookmark-button';
import { getComponentDocByName } from '@/lib/component-docs';
import {
  ComponentOverview,
  ComponentReference,
} from '@/app/(docs)/docs/components/component-reference';

interface PageTemplateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  /** Explicit slug for bookmarking; falls back to slugified title */
  slug?: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const PageTemplate = ({ title, description, children, className, slug }: PageTemplateProps) => {
  const bookmarkSlug = slug ?? (title ? slugify(title) : '');
  const componentDoc = title ? getComponentDocByName(title) : undefined;

  return (
    <section className={cn('flex flex-col', className)}>
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-regular text-2xl leading-10 text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {title}
        </h1>
        {bookmarkSlug && (
          <BookmarkButton
            slug={bookmarkSlug}
            type="component"
            title={title ?? bookmarkSlug}
            className="mt-1 shrink-0"
          />
        )}
      </div>
      {componentDoc ? (
        <ComponentOverview component={componentDoc} />
      ) : description ? (
        <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance md:max-w-[80%] font-light">
          {description}
        </p>
      ) : null}
      {children}
      {componentDoc ? <ComponentReference component={componentDoc} /> : null}
    </section>
  );
};

const PageSubTitle = ({ children }: { children: React.ReactNode }) => {
  const text = children?.toString() ?? '';
  return (
    <h2
      id={slugify(text)}
      className="mb-6 mt-14 scroll-m-24 font-regular text-xl font-medium leading-7 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50"
    >
      {children}
    </h2>
  );
};

/** Sub-heading inside a section, e.g. an example title or API component name */
const PageSectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const text = children?.toString() ?? '';
  return (
    <h3
      id={slugify(text)}
      className={cn(
        'mb-2 mt-8 scroll-m-24 text-base font-medium leading-6 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50',
        className,
      )}
    >
      {children}
    </h3>
  );
};

export { PageTemplate, PageSubTitle, PageSectionTitle };
