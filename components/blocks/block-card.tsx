import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlockStage } from '@/components/blocks/block-stage';
import { CopyCli } from '@/components/blocks/copy-cli';
import { blockCliCommand, blockPath, type BlockCatalogItem } from '@/lib/block-catalog';
import { cn } from '@/lib/utils';

interface BlockCardProps {
  block: BlockCatalogItem;
  /** Total in the category, for the "01 / 08" catalog label. */
  total: number;
  /** The block's poster frame — a designed rest state, never an empty one. */
  preview: React.ReactNode;
  /** The lead card in a category spans two columns. */
  featured?: boolean;
  className?: string;
}

/**
 * One specimen: a real preview, a catalog number, and the install command.
 *
 * The card is a link, but the copy control inside it is a button — CopyCli stops
 * propagation so copying never navigates.
 */
export function BlockCard({ block, total, preview, featured, className }: BlockCardProps) {
  const number = String(block.index).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-[14px] bg-white p-4 dark:bg-[#0F0F10]',
        // A ring, not a border: it never affects layout, so it can animate
        // without reflow. No drop shadow — depth comes from the hairline.
        'shadow-[0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]',
        'transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]',
        // Gated: touch devices fire :hover on tap, so an ungated lift sticks.
        '[@media(hover:hover)]:hover:-translate-y-0.5',
        'hover:shadow-[0_0_0_1px_rgba(0,0,0,0.13)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.13)]',
        'focus-within:shadow-[0_0_0_1px_rgba(249,69,45,0.5)] dark:focus-within:shadow-[0_0_0_1px_rgba(225,244,53,0.5)]',
        featured && 'lg:col-span-2',
        className,
      )}
    >
      {/* Meta row: catalog number, new flag, copy command */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-medium tabular-nums text-neutral-400 dark:text-neutral-600">
            {number}
            <span className="mx-0.5 opacity-50">/</span>
            {totalLabel}
          </span>
          {block.new && (
            <span
              aria-label="Recently added"
              className="size-1.5 rounded-full bg-[#f9452d] dark:bg-[#E1F435]"
            />
          )}
        </div>
        <CopyCli command={blockCliCommand(block.slug)} />
      </div>

      <BlockStage ratio="16/10" rulers={Boolean(featured)}>
        {preview}
      </BlockStage>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium leading-tight tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
            {/* Stretched link keeps the whole card clickable without nesting
                interactive elements inside an anchor. */}
            <Link href={blockPath(block.category, block.slug)} className="after:absolute after:inset-0">
              {block.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-[1.5] text-neutral-500 dark:text-neutral-400">
            {block.description}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-neutral-300 transition-[transform,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f9452d] dark:text-neutral-600 dark:group-hover:text-[#E1F435]"
        />
      </div>

      <div className="mt-3 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-600">
        <span>{block.subcategory}</span>
        {block.variants.length > 1 && (
          <>
            <span aria-hidden className="opacity-40">
              ·
            </span>
            <span>
              {block.variants.length} variants
            </span>
          </>
        )}
      </div>
    </div>
  );
}
