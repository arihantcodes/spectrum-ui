import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { InlineCode } from '@/components/ui/inline-code';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import TreeNavDemo from './tree-nav-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Tree Nav',
  description:
    'A nav list with a tree rail and a spring marker that follows hover and settles on the active link. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'tree nav component',
    'React sidebar navigation',
    'animated sidebar indicator',
    'docs sidebar component',
    'hover follow indicator',
    'spring animated marker',
    'Next.js sidebar nav',
    'Tailwind navigation list',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/tree-nav',
});

const page = () => {
  const description =
    'A nav list with a tree rail and a spring marker that follows hover and settles on the active link.';

  return (
    <SEOWrapper
      componentName="Tree Nav"
      description={description}
      url="https://ui.spectrumhq.in/docs/tree-nav"
      keywords={[
        'tree nav component',
        'React sidebar navigation',
        'animated sidebar indicator',
        'docs sidebar component',
      ]}
    >
      <PageTemplate title="Tree Nav" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/tree-nav/tree-nav-demo.tsx"
          installCodePath="components/spectrumui/tree-nav.tsx"
          cli="@spectrumui/tree-nav"
          installScript="npm i motion"
        >
          <TreeNavDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import Link from "next/link"
import { TreeNav } from "@/components/spectrumui/tree-nav"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<TreeNav
  items={[
    { label: "Overview", href: "/docs" },
    { label: "Installation", href: "/docs/installation" },
    { label: "Tree Nav", href: "/docs/tree-nav", badge: "New" },
  ]}
  activeHref={pathname}
  linkComponent={Link}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">TreeNav</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a <InlineCode>ul</InlineCode> of links with a tree rail down the left. One shared
          background pill and a diamond marker rest on the row whose <InlineCode>href</InlineCode>{' '}
          matches <InlineCode>activeHref</InlineCode>, glide to the hovered or focused row on a
          critically damped spring, and spring back on leave. Motion runs on motion values, so
          hovering never re-renders the list, and only transform and opacity animate. Row centres
          are measured, so badges never misplace the marker. Reduced-motion users get instant moves.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'items',
                required: true,
                type: '{ label: string; href: string; badge?: string; external?: boolean }[]',
                description: 'Links to render, top to bottom',
              },
              {
                prop: 'activeHref',
                required: false,
                type: 'string',
                description: 'href of the current page; the background and marker rest on this row',
              },
              {
                prop: 'followHover',
                required: false,
                type: 'boolean',
                default: 'true',
                description:
                  'Glide the background and marker to the hovered row and spring back on leave',
              },
              {
                prop: 'linkComponent',
                required: false,
                type: `"a" | ComponentType<AnchorHTMLAttributes>`,
                default: `"a"`,
                description: 'Element used for links, e.g. Next.js Link',
              },
              {
                prop: 'onSelect',
                required: false,
                type: '(item: TreeNavItem, event: MouseEvent) => void',
                description:
                  'Fires on click with the item; call preventDefault to handle routing yourself',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Additional classes merged with the list styles',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
