import React from 'react';
import { Metadata } from 'next';

import { PageSectionTitle, PageSubTitle, PageTemplate } from '../components/page-template';
import PreviewCodeCard from '@/app/(docs)/docs/components/preview-code-card';
import CodeHighlight from '@/app/(docs)/docs/components/code-card/parts/code-highlight';
import { PropsTable } from '@/app/(docs)/docs/components/props-table/props-table';
import { InlineCode } from '@/components/ui/inline-code';
import { baseMetadata } from '@/app/(docs)/layout-parts/base-metadata';
import { SEOWrapper } from '@/app/(docs)/docs/components/seo-wrapper';

import DataTableDemo from './data-table-demo';
import DataTableVariantsDemo from './data-table-variants-demo';
import DataTableStatesDemo from './data-table-states-demo';
import DataTableStickyDemo from './data-table-sticky-demo';
import DataTablePowerDemo from './data-table-power-demo';

const keywords = [
  'react data table',
  'shadcn data table',
  'sortable table component',
  'react table row selection',
  'tailwind data table',
  'next.js table component',
  'react data grid',
  'expandable table rows',
];

export const metadata: Metadata = baseMetadata({
  title: 'Data Table',
  description:
    'A typed data table with sorting, search, row selection and expandable rows. A free React and Next.js component built with Motion, TypeScript and Tailwind CSS.',
  keywords,
  canonicalUrl: 'https://ui.spectrumhq.in/docs/data-table',
});

const page = () => {
  const description =
    'A typed data table with sorting, search and row selection, where rows glide into their new order.';

  return (
    <SEOWrapper
      componentName="Data Table"
      description={description}
      url="https://ui.spectrumhq.in/docs/data-table"
      keywords={keywords.slice(0, 4)}
    >
      <PageTemplate title="Data Table" description={description}>
        <PreviewCodeCard
          path="app/(docs)/docs/data-table/data-table-demo.tsx"
          installCodePath="components/spectrumui/data-table.tsx"
          cli="@spectrumui/data-table"
          installScript="npm i motion"
        >
          <DataTableDemo />
        </PreviewCodeCard>

        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { DataTable, type DataTableColumn } from "@/components/spectrumui/data-table"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`interface Invoice {
  id: string
  customer: string
  status: "paid" | "pending" | "failed"
  amount: number
}

const columns: DataTableColumn<Invoice>[] = [
  { id: "customer", header: "Customer", sortable: true, value: (row) => row.customer },
  { id: "status", header: "Status", sortable: true, value: (row) => row.status },
  { id: "amount", header: "Amount", sortable: true, numeric: true, value: (row) => row.amount },
]

<DataTable
  data={invoices}
  columns={columns}
  rowId={(row) => row.id}
  caption="Invoices from the last 30 days."
  searchable
  selectable
  pageSize={10}
  defaultSort={{ columnId: "amount", direction: "desc" }}
  bulkActions={({ ids, clear }) => (
    <button onClick={() => exportInvoices(ids).then(clear)}>Export</button>
  )}
/>`}
            requireAuth={false}
          />
        </div>

        <PageSubTitle>How it behaves</PageSubTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          <InlineCode>DataTable</InlineCode> is generic over your row type, so{' '}
          <InlineCode>cell</InlineCode>, <InlineCode>value</InlineCode> and{' '}
          <InlineCode>rowId</InlineCode> all receive a typed row and never an{' '}
          <InlineCode>any</InlineCode>. It renders one real <InlineCode>&lt;table&gt;</InlineCode>:
          sortable headers carry <InlineCode>aria-sort</InlineCode> and a real button, selection
          uses real checkboxes with a mixed state on the header, disclosure buttons carry{' '}
          <InlineCode>aria-expanded</InlineCode>, and a single polite live region announces the row
          and selection counts.
        </p>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The toolbar composes like a product screen: title on the leading side; filter pills, the
          optional search field and your own actions (the <InlineCode>toolbar</InlineCode> slot) on
          the trailing side. <InlineCode>quickFilter</InlineCode> renders one pill per distinct
          value of a column with a live count, so filtering a status is one tap instead of a typed
          query — search stays opt-in for the long lists where free text earns its place. The search
          mark is Iconly Light, an outline glyph: fill is reserved for a state that is already on.
          Focusing the field darkens that stroke and eases the input wider so the query has room,
          and the clear control blooms in — scale, opacity and blur — rather than popping onto the
          trailing edge. Filter pills share one sliding fill, so choosing a status is a transfer of
          the same chip, not a repaint. The checkbox fill grows into its box and the tick draws;
          selected counts and page ranges roll to the new figure. An empty body staggers its icon,
          title and action, because that screen appears once. Sorting is a three-step cycle —
          ascending, descending, off — so a table can always be put back in source order, and blanks
          stay at the bottom in both directions. Changing the sort moves each row to its new
          position on a critically damped spring rather than repainting the body, and the caret
          rotates between the two directions instead of swapping for a second glyph. Hovering a row
          stays a <InlineCode>100ms</InlineCode> tint, because a row is hovered hundreds of times a
          session. Only the bulk-action bar, which appears once per selection, gets a spring. Under{' '}
          <InlineCode>prefers-reduced-motion</InlineCode> every one of those becomes instant, and
          each state keeps a static cue: a filled checkbox, an <InlineCode>aria-sort</InlineCode>{' '}
          value.
        </p>

        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          It is also built for the keyboard. The grid takes a single <InlineCode>Tab</InlineCode>{' '}
          stop and then moves a cursor rather than focus, so arrow keys walk the rows while the
          controls inside a row keep their own keys: <InlineCode>Space</InlineCode> selects,{' '}
          <InlineCode>Shift</InlineCode> with the arrows or a click takes the whole range,{' '}
          <InlineCode>⌘A</InlineCode> takes the page, <InlineCode>⌘C</InlineCode> copies the
          selection as TSV straight into a spreadsheet, and <InlineCode>Escape</InlineCode> clears.
          Select every row on a page and the table offers the rest of the matches instead of
          pretending six was what you meant.
        </p>

        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Deleting is the one place the table lets motion take real time. Call{' '}
          <InlineCode>remove()</InlineCode> from the bulk bar or a row action and the rows sweep out
          to the start edge one after another, roughly a frame apart, accelerating away rather than
          easing to a stop — an undertow, not a blink. Each row is pulled the instant its own sweep
          ends, so the rows beneath begin closing the gap while the next one is still on its way
          out, and the wave drains down the table. <InlineCode>onDelete</InlineCode> fires once at
          the end with the ids, which is when you remove them from your own data. Under reduced
          motion the rows simply go.
        </p>

        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">DataTable</PageSectionTitle>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'data',
                required: true,
                type: 'readonly T[]',
                description: 'Rows to render',
              },
              {
                prop: 'columns',
                required: true,
                type: 'DataTableColumn<T>[]',
                description: 'Column definitions, start to end',
              },
              {
                prop: 'rowId',
                required: true,
                type: '(row: T) => string',
                description: 'Stable identity per row; selection and disclosure are keyed on it',
              },
              {
                prop: 'rowLabel',
                required: false,
                type: '(row: T) => string',
                description:
                  'Names a row for screen readers, e.g. on its checkbox. Defaults to the first cell',
              },
              {
                prop: 'variant',
                required: false,
                type: '"default" | "bordered" | "striped" | "minimal" | "panel"',
                default: '"default"',
                description: 'Surface treatment: frame, header fill and row separation',
              },
              {
                prop: 'density',
                required: false,
                type: '"compact" | "default" | "relaxed"',
                default: '"default"',
                description: 'Row height, cell padding and type size',
              },
              {
                prop: 'caption',
                required: false,
                type: 'string',
                description: 'Sentence describing the table for screen readers; never painted',
              },
              {
                prop: 'title',
                required: false,
                type: 'ReactNode',
                description: 'Heading at the start of the toolbar',
              },
              {
                prop: 'toolbar',
                required: false,
                type: 'ReactNode',
                description: 'Controls parked at the end of the toolbar',
              },
              {
                prop: 'searchable',
                required: false,
                type: 'boolean',
                default: 'false',
                description:
                  'Adds a search field on the toolbar\u2019s trailing side. Reach for it on long free-text lists; enumerable columns read better as a quickFilter',
              },
              {
                prop: 'searchText',
                required: false,
                type: '(row: T) => string',
                description: 'Override the haystack a query runs against',
              },
              {
                prop: 'quickFilter',
                required: false,
                type: '{ columnId: string; label?: string; getValue?: (row: T) => string; options?: { value: string; label?: ReactNode }[]; allLabel?: string }',
                description:
                  'One-tap value pills with live counts at the end of the toolbar; options default to the column\u2019s distinct values',
              },
              {
                prop: 'defaultSort',
                required: false,
                type: 'DataTableSort | null',
                default: 'null',
                description: 'Sort the table starts on, when uncontrolled',
              },
              {
                prop: 'sort',
                required: false,
                type: 'DataTableSort | null',
                description: 'Controlled sort; pair with onSortChange',
              },
              {
                prop: 'onSortChange',
                required: false,
                type: '(sort: DataTableSort | null) => void',
                description: 'Fires on every header click, including the one that clears the sort',
              },
              {
                prop: 'selectable',
                required: false,
                type: 'boolean',
                default: 'false',
                description: 'Adds the checkbox column and the header select-all',
              },
              {
                prop: 'selectedIds',
                required: false,
                type: 'string[]',
                description: 'Controlled selection; pair with onSelectedChange',
              },
              {
                prop: 'defaultSelectedIds',
                required: false,
                type: 'string[]',
                description: 'Rows selected on mount, when uncontrolled',
              },
              {
                prop: 'onSelectedChange',
                required: false,
                type: '(ids: string[]) => void',
                description: 'Fires with the full selection whenever it changes',
              },
              {
                prop: 'bulkActions',
                required: false,
                type: '(ctx: { ids: string[]; rows: T[]; clear: () => void; remove: () => void }) => ReactNode',
                description:
                  'Actions for the bar that rises over the rows once something is selected',
              },
              {
                prop: 'renderDetail',
                required: false,
                type: '(row: T) => ReactNode',
                description:
                  'Panel revealed under a row by a leading disclosure button, one at a time',
              },
              {
                prop: 'rowActions',
                required: false,
                type: '(row: T, actions: { remove: () => void }) => ReactNode',
                description: 'Trailing cell, revealed on row hover and on keyboard focus',
              },
              {
                prop: 'onDelete',
                required: false,
                type: '(ids: string[]) => void',
                description:
                  'Fires once the removal wave has finished; drop the ids from your own data here',
              },
              {
                prop: 'pageSize',
                required: false,
                type: 'number',
                description: 'Rows per page. Omit to render every row',
              },
              {
                prop: 'loading',
                required: false,
                type: 'boolean',
                default: 'false',
                description: 'Swaps the body for skeleton rows and marks the table aria-busy',
              },
              {
                prop: 'skeletonRows',
                required: false,
                type: 'number',
                default: '5',
                description: 'How many skeleton rows to show while loading',
              },
              {
                prop: 'emptyState',
                required: false,
                type: 'ReactNode',
                description: 'Replaces the built-in empty and no-results state',
              },
              {
                prop: 'onRowClick',
                required: false,
                type: '(row: T) => void',
                description:
                  'Makes the row clickable and turns the first cell into its keyboard activator',
              },
              {
                prop: 'keyboardNavigation',
                required: false,
                type: 'boolean',
                default: 'true',
                description:
                  'Arrow-key cursor, Shift range selection and the \u2318A / \u2318C / Space shortcuts',
              },
              {
                prop: 'clipboard',
                required: false,
                type: 'boolean',
                default: 'true',
                description:
                  'Copy button in the bulk bar, and \u2318C, writing the selection as TSV',
              },
              {
                prop: 'totals',
                required: false,
                type: 'string[]',
                description:
                  'Column ids to sum in a footer that rolls to its new value as you filter',
              },
              {
                prop: 'resizableColumns',
                required: false,
                type: 'boolean',
                default: 'false',
                description:
                  'Drag a header\u2019s trailing edge to resize it; the splitter also takes arrow keys',
              },
              {
                prop: 'pinFirstColumn',
                required: false,
                type: 'boolean',
                default: 'false',
                description:
                  'Keeps the leading cells in place, with a shadow, while the table scrolls sideways',
              },
              {
                prop: 'stickyHeader',
                required: false,
                type: 'boolean',
                default: 'false',
                description: 'Pins the header and lifts it with a shadow once the body scrolls',
              },
              {
                prop: 'maxHeight',
                required: false,
                type: 'number | string',
                description: 'Caps the scroll area, e.g. 360 or "60vh". Pairs with stickyHeader',
              },
              {
                prop: 'animate',
                required: false,
                type: 'boolean',
                default: 'true',
                description: 'Set false to drop the reorder, disclosure and selection motion',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Additional classes merged onto the outer wrapper',
              },
            ]}
          />
        </div>

        <PageSectionTitle>DataTableColumn</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A column renders through <InlineCode>cell</InlineCode> and sorts and searches through{' '}
          <InlineCode>value</InlineCode>. Give a column both when its cell renders markup: the table
          cannot compare a React element, so a sortable badge column needs the raw value behind it.
          With neither, the column falls back to reading <InlineCode>row[id]</InlineCode>.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: 'id',
                required: true,
                type: 'string',
                description: 'Stable key, and the property read off the row when value is absent',
              },
              {
                prop: 'header',
                required: true,
                type: 'ReactNode',
                description: 'Header label',
              },
              {
                prop: 'cell',
                required: false,
                type: '(row: T, index: number) => ReactNode',
                description: 'Rendered cell. Falls back to the column value, printed as text',
              },
              {
                prop: 'value',
                required: false,
                type: '(row: T) => string | number | boolean | Date | null | undefined',
                description: 'The comparable, searchable value behind the cell',
              },
              {
                prop: 'sortable',
                required: false,
                type: 'boolean',
                default: 'false',
                description: 'Turns the header into a three-step sort button',
              },
              {
                prop: 'numeric',
                required: false,
                type: 'boolean',
                default: 'false',
                description: 'End-aligns the column and switches it to tabular figures',
              },
              {
                prop: 'align',
                required: false,
                type: '"start" | "center" | "end"',
                default: '"start"',
                description: 'Overrides the alignment numeric would otherwise pick',
              },
              {
                prop: 'width',
                required: false,
                type: 'number | string',
                description: 'Column width hint passed to the header cell',
              },
              {
                prop: 'hideBelow',
                required: false,
                type: '"sm" | "md" | "lg"',
                description:
                  'Drops the column below this breakpoint instead of scrolling the table',
              },
              {
                prop: 'formatTotal',
                required: false,
                type: '(sum: number) => string',
                description: 'Renders this column\u2019s footer sum. Defaults to a grouped integer',
              },
              {
                prop: 'className',
                required: false,
                type: 'string',
                description: 'Classes merged onto every body cell in the column',
              },
              {
                prop: 'headerClassName',
                required: false,
                type: 'string',
                description: 'Classes merged onto the header cell',
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">Everything at once</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          A pipeline table with the whole surface turned on: a pinned first column and pinned header
          for a grid wider than its box, draggable column widths, a rolling{' '}
          <InlineCode>totals</InlineCode> footer that recounts as you filter, and the keyboard
          model. Click into the table and walk it with the arrow keys, and{' '}
          <InlineCode>⌘C</InlineCode> puts what you picked on the clipboard as TSV.
        </p>
        <PreviewCodeCard
          path="app/(docs)/docs/data-table/data-table-power-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <DataTablePowerDemo />
        </PreviewCodeCard>

        <PageSectionTitle>Variants and density</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Five surfaces and three densities. <InlineCode>panel</InlineCode> trades the border for a
          layered shadow so it reads as elevated on any background, <InlineCode>minimal</InlineCode>{' '}
          drops the frame for a table that sits inside an existing card, and{' '}
          <InlineCode>compact</InlineCode> is the density an operations tool wants when the screen
          has to hold thirty rows.
        </p>
        <PreviewCodeCard
          path="app/(docs)/docs/data-table/data-table-variants-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <DataTableVariantsDemo />
        </PreviewCodeCard>

        <PageSectionTitle>Pinned header on a long, dense table</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          The shape an operations tool needs: <InlineCode>compact</InlineCode> density,{' '}
          <InlineCode>stickyHeader</InlineCode> and a <InlineCode>maxHeight</InlineCode> so the
          table scrolls inside its own box rather than pushing the page down. The header picks up a
          shadow the moment the body scrolls under it, and drops it again at the top.{' '}
          <InlineCode>onRowClick</InlineCode> makes the row clickable and turns its first cell into
          a real button, so opening a row does not become a mouse-only action.
        </p>
        <PreviewCodeCard
          path="app/(docs)/docs/data-table/data-table-sticky-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <DataTableStickyDemo />
        </PreviewCodeCard>

        <PageSectionTitle>Loading and empty states</PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          <InlineCode>loading</InlineCode> keeps the header and column widths in place and swaps the
          body for skeleton rows, so the table does not resize when the data lands. An empty table
          tells the two cases apart: no data at all, or no match for the current search, which comes
          with a button that clears it.
        </p>
        <PreviewCodeCard
          path="app/(docs)/docs/data-table/data-table-states-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <DataTableStatesDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  );
};

export default page;
