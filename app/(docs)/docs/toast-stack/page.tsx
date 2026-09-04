import React from 'react';
import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { Metadata } from 'next';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import ToastStackDemo from './toast-stack-demo';

export const metadata: Metadata = baseMetadata({
  title: 'Toast Stack',
  description:
    'Stacked toasts with status morphs, swipe to dismiss, actions and layout-aware motion. A free React and Next.js component built with Motion and Tailwind CSS.',
  keywords: [
    'toast stack React',
    'animated toast notifications',
    'stacked toasts',
    'swipe to dismiss toast',
    'beUI toast',
    'status toast loading success',
    'Next.js notifications',
  ],
  canonicalUrl: 'https://ui.spectrumhq.in/docs/toast-stack',
});

const page = () => {
  const description =
    'Stacked toasts with status morphs, swipe to dismiss, actions and layout-aware motion.';

  return (
    <SEOWrapper
      componentName="Toast Stack"
      description={description}
      url="https://ui.spectrumhq.in/docs/toast-stack"
      keywords={[
        'toast stack React',
        'animated toast notifications',
        'stacked toasts',
        'swipe to dismiss toast',
      ]}
    >
      <PageTemplate title="Toast Stack" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/toast-stack/toast-stack-demo.tsx"
          installCodePath="components/motion/animated-toast-stack.tsx"
          cli="@spectrumui/toast-stack"
          installScript="npm i motion clsx tailwind-merge lucide-react"
        >
          <ToastStackDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={
              'import { AnimatedToastStack, useAnimatedToastStack } from "@/components/motion/animated-toast-stack"'
            }
            requireAuth={false}
          />
          <CodeHighlight
            code={
              'const { toasts, showToast, updateToast, dismissToast } = useAnimatedToastStack()\n\nconst id = showToast({ status: "loading", title: "Deploying…", duration: 0 })\nupdateToast(id, { status: "success", title: "Deployed" })\n\n<AnimatedToastStack toasts={toasts} onDismiss={dismissToast} position="bottom-right" />'
            }
            requireAuth={false}
          />
        </div>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">AnimatedToastStack</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          beUI&apos;s Animated Toast Stack (beui.dev, MIT), installed from its shadcn registry into
          components/motion. Pair it with the useAnimatedToastStack hook, which returns toasts plus
          showToast, updateToast, dismissToast and clearToasts. A toast can morph from loading to
          success or error in place.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'toasts',
                required: true,
                type: 'AnimatedToast[]',
                description: 'Toasts to render, from the hook',
              },
              {
                prop: 'onDismiss',
                required: false,
                type: '(id: string) => void',
                description: 'Fires when a toast is swiped or closed',
              },
              {
                prop: 'position',
                required: false,
                type: 'ToastPosition',
                description: 'Corner or edge to stack from',
                default: '"bottom-right"',
              },
              {
                prop: 'placement',
                required: false,
                type: '"static" | "fixed" | "absolute"',
                description: 'static renders inline; fixed floats over the page',
              },
              {
                prop: 'portal',
                required: false,
                type: 'boolean',
                description: 'Render into a portal (defaults to true when fixed)',
              },
              {
                prop: 'maxVisible',
                required: false,
                type: 'number',
                description: 'How many toasts show before older ones collapse',
              },
              {
                prop: 'icons',
                required: false,
                type: 'Partial<Record<ToastStatus, ReactNode>>',
                description: 'Override the status icons',
              },
              {
                prop: 'renderToast',
                required: false,
                type: '(toast: AnimatedToast) => ReactNode',
                description: 'Fully custom toast renderer',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes for the stack',
              },
            ]}
          />
        </div>
        <PageSectionTitle className="mt-10">useAnimatedToastStack</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Owns the toast list and auto-dismiss timers.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'initialToasts',
                required: false,
                type: 'ToastInput[]',
                description: 'Toasts present on mount',
              },
              {
                prop: 'defaultDuration',
                required: false,
                type: 'number',
                description: 'Auto-dismiss in ms; a toast with duration 0 stays',
                default: '4200',
              },
              {
                prop: 'limit',
                required: false,
                type: 'number',
                description: 'Maximum toasts kept in the list',
              },
            ]}
          />
        </div>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
