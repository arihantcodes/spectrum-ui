'use client';

import { Check, Layers, Sparkles, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REVEAL_KEYFRAMES, revealClass, revealDelay, useReveal } from './reveal';
import type { FeatureGroup, FeatureValue, Plan } from './types';

export type DarkMatrixVariant = 'Sections' | 'Flat';

export interface DarkMatrixProps {
  plans: Plan[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  groups: FeatureGroup[];
  hints?: Record<string, string>;
  variant?: DarkMatrixVariant;
  className?: string;
}

const ICONS = [Layers, Zap, Sparkles];

function Value({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <>
        <Check
          aria-hidden
          strokeWidth={2.4}
          className="mx-auto size-4 text-[#0e9f7e] dark:text-[#4be0c0]"
        />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <X
          aria-hidden
          strokeWidth={2}
          className="mx-auto size-4 text-[#b4b4bb] dark:text-[#55555d]"
        />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="tabular-nums">{value}</span>;
}

export function DarkMatrix({
  plans,
  groups,
  eyebrow,
  heading,
  subheading,
  hints = {},
  variant = 'Sections',
  className,
}: DarkMatrixProps) {
  const { ref, shown } = useReveal<HTMLElement>();
  const rows = groups.flatMap((group) => group.rows);

  const body = (rowsToRender: typeof rows) =>
    rowsToRender.map((row) => (
      <tr key={row.label}>
        <th
          scope="row"
          className="bg-white py-4 pl-5 pr-4 text-left text-[13.5px] font-normal text-[#5c5c64] [border-bottom:1px_dashed_#dcdce1] dark:bg-[#131316] dark:text-[#a5a5ad] dark:[border-bottom:1px_dashed_#2b2b30]"
        >
          <span className="inline-flex items-center gap-2.5">
            {row.label}
            {(row.hint ?? hints[row.label]) && (
              <span
                title={row.hint ?? hints[row.label]}
                className="grid size-4 place-items-center rounded-full border border-[#c4c4cb] text-[9px] text-[#6d6d75] dark:border-[#3f3f46] dark:text-[#8f8f96]"
              >
                ?<span className="sr-only">{row.hint ?? hints[row.label]}</span>
              </span>
            )}
          </span>
        </th>
        {row.values.map((value, index) => (
          <td
            key={plans[index]?.id ?? index}
            className="bg-white px-4 py-4 text-center text-[13.5px] text-[#2a2a2f] [border-bottom:1px_dashed_#dcdce1] [border-left:1px_solid_#e7e7ea] dark:bg-[#131316] dark:text-[#d4d4da] dark:[border-bottom:1px_dashed_#2b2b30] dark:[border-left:1px_solid_#232327]"
          >
            <Value value={value} />
          </td>
        ))}
      </tr>
    ));

  return (
    <section
      ref={ref}
      className={cn(
        '@container w-full rounded-3xl bg-[#f7f7f8] p-4 dark:bg-[#09090b] sm:p-8',
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: REVEAL_KEYFRAMES }} />

      <div className={cn('overflow-x-auto', revealClass(shown))} style={revealDelay(shown, 0)}>
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Plan comparison</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[34%] pb-5 pr-6 text-left align-bottom">
                {heading && (
                  <span className="block">
                    {eyebrow && (
                      <span className="block font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#0e9f7e] dark:text-[#4be0c0]">
                        {eyebrow}
                      </span>
                    )}
                    <span className="mt-2 block text-balance text-[22px] font-semibold leading-[1.15] tracking-[-0.4px] text-[#0f0f11] dark:text-white">
                      {heading}
                    </span>
                    {subheading && (
                      <span className="mt-1.5 block text-pretty text-[12.5px] font-normal leading-[1.5] text-[#5c5c64] dark:text-[#a5a5ad]">
                        {subheading}
                      </span>
                    )}
                  </span>
                )}
              </th>
              {plans.map((plan, index) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <th
                    key={plan.id}
                    scope="col"
                    className="border-l border-[#e2e2e6] px-4 pb-5 dark:border-[#232327]"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <Icon
                          aria-hidden
                          strokeWidth={1.8}
                          className="size-4 text-[#0f0f11] dark:text-white"
                        />
                        <span className="text-[14.5px] font-semibold text-[#0f0f11] dark:text-white">
                          {plan.name}
                        </span>
                      </span>
                      <button
                        type="button"
                        className={cn(
                          'whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11.5px] font-medium',
                          'transition-[transform,background-color] duration-150 active:scale-[0.96]',
                          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0e9f7e] dark:focus-visible:ring-[#4be0c0]',
                          plan.featured
                            ? 'bg-[#0f0f11] text-white hover:bg-black dark:bg-white dark:text-[#09090b] dark:hover:bg-[#e7e7ea]'
                            : 'bg-[#e7e7ea] text-[#0f0f11] hover:bg-[#dcdce0] dark:bg-[#232328] dark:text-white dark:hover:bg-[#2e2e34]',
                        )}
                      >
                        {plan.cta}
                      </button>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          {variant === 'Sections' ? (
            groups.map((group) => (
              <tbody key={group.label}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={plans.length + 1}
                    className="pb-4 pt-7 text-left text-[14px] font-medium text-[#1c1c20] dark:text-[#e7e7ec]"
                  >
                    {group.label}
                  </th>
                </tr>
                {body(group.rows)}
              </tbody>
            ))
          ) : (
            <tbody>{body(rows)}</tbody>
          )}
        </table>
      </div>
    </section>
  );
}

export default DarkMatrix;
