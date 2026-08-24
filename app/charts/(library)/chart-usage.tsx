import React from 'react';
import { PageSubTitle } from '@/app/(docs)/docs/components/page-template';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { InlineCode } from '@/components/ui/inline-code';
import type { ChartLibraryItem } from '@/lib/chart-library';
import { CHART_PROPS, SHARED_CHART_PROPS } from '@/lib/chart-props';

/** Render `backticked` spans in a note as inline code. */
function withCode(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
      <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

/**
 * The "how do I actually use this" half of a chart page: which files to copy,
 * where they go, the import, and the props. Written from the registry so the
 * file list can never drift from what the CLI installs.
 */
export function ChartUsage({
  chart,
  files,
  dependencies,
}: {
  chart: ChartLibraryItem;
  files: string[];
  dependencies: string[];
}) {
  const componentProps = CHART_PROPS[chart.slug];
  const target = (path: string) =>
    `components/spectrumui/charts/${path.split('/').pop() ?? path}`;

  const importLine = `import { ${chart.exportName} } from '@/components/spectrumui/charts/${chart.registryName}';`;

  return (
    <>
      <PageSubTitle>Manual installation</PageSubTitle>
      <p className="mt-2 text-[15px] leading-[1.7] text-[#080808]/70 dark:text-neutral-400">
        Prefer to copy by hand? Open the <strong>Code</strong> tab on any example above and switch
        to the file you need — every source file is there, not just the demo. Drop{' '}
        {files.length === 1 ? 'it' : 'them'} in your project like this:
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {files.map((path) => (
          <li
            key={path}
            className="flex flex-wrap items-center gap-2 text-[14px] text-[#080808]/70 dark:text-neutral-400"
          >
            <InlineCode>{path.split('/').pop()}</InlineCode>
            <span aria-hidden>→</span>
            <InlineCode>{target(path)}</InlineCode>
          </li>
        ))}
      </ul>

      {dependencies.length ? (
        <p className="mt-4 text-[15px] leading-[1.7] text-[#080808]/70 dark:text-neutral-400">
          Then install its dependencies: <InlineCode>npm i {dependencies.join(' ')}</InlineCode>
        </p>
      ) : (
        <p className="mt-4 text-[15px] leading-[1.7] text-[#080808]/70 dark:text-neutral-400">
          There is nothing to install — this chart draws its own SVG and imports only{' '}
          <InlineCode>@/lib/utils</InlineCode>.
        </p>
      )}

      <PageSubTitle>Usage</PageSubTitle>
      <div className="mt-3">
        <CodeHighlight code={`${importLine}\n\n${chart.usage}`} requireAuth={false} />
      </div>

      {chart.notes?.length ? (
        <ul className="mt-5 flex flex-col gap-2.5">
          {chart.notes.map((note) => (
            <li
              key={note}
              className="relative pl-4 text-[15px] leading-[1.7] text-[#080808]/70 before:absolute before:left-0 before:top-[0.7em] before:size-1 before:rounded-full before:bg-[#f9452d] dark:text-neutral-400 dark:before:bg-[#E1F435]"
            >
              {withCode(note)}
            </li>
          ))}
        </ul>
      ) : null}

      {componentProps?.length ? (
        <PropsTable title="Props" props={[...componentProps, ...SHARED_CHART_PROPS]} />
      ) : null}
    </>
  );
}
