import Link from 'next/link';
import { ArrowUpRight, Info } from 'lucide-react';

import CommandFigure from '@/app/(docs)/docs/components/code-card/parts/command-figure';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { TerminalIcon } from '@/app/(docs)/layout-parts/docs-icons';
import { InlineCode } from '@/components/ui/inline-code';

/** Question and answer rows shown in the components.json figure */
const CONFIG_QUESTIONS = [
  { question: 'Which style would you like to use?', answer: 'New York' },
  { question: 'Which color would you like to use as base color?', answer: 'Zinc' },
  { question: 'Do you want to use CSS variables for colors?', answer: 'yes' },
];

const NEXT_STEPS = [
  {
    href: '/docs',
    title: 'Browse components',
    description: 'Look through every component and copy the ones you need.',
  },
  {
    href: '/docs/mcp',
    title: 'Set up the MCP server',
    description: 'Let your AI editor add Spectrum UI components for you.',
  },
];

/** One step in the vertical guide: number chip, connecting rail, content */
function Step({
  number,
  title,
  id,
  isLast = false,
  children,
}: {
  number: number;
  title: string;
  id: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="relative flex gap-4 sm:gap-5">
      <div className="flex flex-col items-center">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white font-mono text-[13px] leading-none text-neutral-500 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-400">
          {number}
        </span>
        {!isLast && <span className="mt-2 w-px flex-1 bg-black/6 dark:bg-white/8" />}
      </div>
      <div className={isLast ? 'min-w-0 flex-1' : 'min-w-0 flex-1 pb-12'}>
        <h2
          id={id}
          className="scroll-m-24 text-base font-medium leading-7 text-neutral-900 dark:text-neutral-100"
        >
          {title}
        </h2>
        {children}
      </div>
    </li>
  );
}

/** Small link card shown under "Next steps" */
function NextStepCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[14px] border border-black/8 bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-black/16 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 active:translate-y-0 active:shadow-none dark:border-white/10 dark:bg-white/2 dark:hover:border-white/20 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
    >
      <span className="flex items-center gap-1 text-sm font-medium leading-5 text-neutral-900 dark:text-neutral-100">
        {title}
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 -translate-x-0.5 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
      </span>
      <span className="mt-1.5 block text-[13px] leading-5 tracking-wide text-neutral-500 dark:text-neutral-400">
        {description}
      </span>
    </Link>
  );
}

export default function InstallationPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="max-w-2xl animate-fade-up">
        <p className="font-mono text-[13px] leading-4 text-neutral-400 dark:text-neutral-500">
          Getting Started
        </p>
        <h1 className="mt-2 text-2xl leading-10 text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          Installation
        </h1>
        <p className="mt-2 text-[15px] tracking-wide text-neutral-400 dark:text-neutral-400">
          Set up Spectrum UI in a new or existing Next.js project. It only takes a few minutes.
        </p>
      </div>

      {/* Note */}
      <div
        className="mt-8 flex animate-fade-up items-start gap-2.5 rounded-[14px] border border-black/8 bg-black/2 px-4 py-3.5 dark:border-white/10 dark:bg-white/3"
        style={{ animationDelay: '60ms' }}
      >
        <Info className="mt-0.5 size-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
        <p className="text-[13px] leading-5 tracking-wide text-neutral-500 dark:text-neutral-400">
          Using Next.js 15 with React 19? Read the{' '}
          <a
            href="https://ui.shadcn.com/docs/react-19"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
          >
            Next.js 15 and React 19 guide
          </a>{' '}
          first.
        </p>
      </div>

      {/* Steps */}
      <ol className="mt-12 flex animate-fade-up flex-col" style={{ animationDelay: '120ms' }}>
        <Step number={1} title="Create a project" id="create-a-project">
          <p className="mt-2 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            Start with a new Next.js project, or skip this step if you already have one.
          </p>
          <CommandFigure
            className="mt-4"
            commands={{
              bun: 'bunx create-next-app@latest',
              npm: 'npx create-next-app@latest',
              pnpm: 'pnpm create next-app@latest',
              yarn: 'yarn create next-app',
            }}
          />
        </Step>

        <Step number={2} title="Set up shadcn/ui" id="set-up-shadcn-ui">
          <p className="mt-2 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            Run the <InlineCode>init</InlineCode> command. It installs the needed packages and
            prepares Tailwind CSS for you.
          </p>
          <CommandFigure
            className="mt-4"
            commands={{
              bun: 'bunx --bun shadcn@latest init',
              npm: 'npx shadcn@latest init',
              pnpm: 'pnpm dlx shadcn@latest init',
              yarn: 'yarn dlx shadcn@latest init',
            }}
          />
          <p className="mt-3 text-[13px] leading-5 tracking-wide text-neutral-400 dark:text-neutral-500">
            You can add the <InlineCode>-d</InlineCode> flag to skip the questions and use the
            default settings.
          </p>
        </Step>

        <Step number={3} title="Configure components.json" id="configure-components-json">
          <p className="mt-2 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            The <InlineCode>init</InlineCode> command asks you a few questions. Your answers are
            saved in <InlineCode>components.json</InlineCode>.
          </p>
          <figure className="mt-4 overflow-hidden rounded-[14px] border border-black/8 bg-white dark:border-white/10 dark:bg-neutral-950">
            <div className="flex h-[41px] items-center gap-2 border-b border-black/5 px-4 dark:border-white/6">
              <TerminalIcon className="size-4 shrink-0 text-[#686868] dark:text-neutral-400" />
              <span className="font-mono text-[13px] text-[#686868] dark:text-neutral-400">
                components.json
              </span>
            </div>
            <div className="flex flex-col gap-3 px-4 py-[18px]">
              {CONFIG_QUESTIONS.map((row) => (
                <div
                  key={row.question}
                  className="flex flex-wrap items-baseline gap-x-2 font-mono text-[13px] leading-5"
                >
                  <span className="text-neutral-400 dark:text-neutral-500">{row.question}</span>
                  <span className="text-neutral-300 dark:text-neutral-600">›</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {row.answer}
                  </span>
                </div>
              ))}
            </div>
          </figure>
        </Step>

        <Step number={4} title="Add components" id="add-components" isLast>
          <p className="mt-2 max-w-2xl text-sm leading-6 tracking-wide text-neutral-500 dark:text-neutral-400">
            That is it. You can now add any Spectrum UI component with one command. Here is an
            example for the Accordion.
          </p>
          <CommandFigure
            className="mt-4"
            cli="@spectrumui/accordion"
            componentName="Accordion"
            requireAuth
          />
          <p className="mb-1.5 mt-4 text-[13px] leading-5 tracking-wide text-neutral-400 dark:text-neutral-500">
            The code lands in your project, so you can import it like any of your own components.
          </p>
          <CodeHighlight
            code={`import { Accordion } from "@/components/ui/accordion";`}
            requireAuth={false}
          />
        </Step>
      </ol>

      {/* Next steps */}
      <div className="animate-fade-up" style={{ animationDelay: '180ms' }}>
        <h2
          id="next-steps"
          className="mb-6 mt-14 scroll-m-24 font-regular text-xl font-medium leading-7 tracking-[-0.01em] text-neutral-900 dark:text-neutral-50"
        >
          Next steps
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NEXT_STEPS.map((step) => (
            <NextStepCard key={step.href} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
