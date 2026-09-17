'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  EmptyAction,
  EmptyPanel,
  EmptyState,
  IconBag,
  IconBuy,
  IconPlus,
  SPRING_ENTRANCE,
  SPRING_SNAPPY,
  VIEWPORT,
} from './empty-state-kit';

export type CartEmptyVariant = 'Recent' | 'Minimal';

export interface CartProduct {
  id: string;
  name: string;
  detail: string;
  price: number;
}

export interface CartEmptyProps {
  panelTitle?: string;
  title?: string;
  description?: string;
  /** What the reader was looking at. An empty cart with no way back is a dead end. */
  products?: CartProduct[];
  currency?: string;
  shopLabel?: string;
  onAdd?: (id: string) => void;
  variant?: CartEmptyVariant;
  className?: string;
}

const PRODUCTS: CartProduct[] = [
  { id: 'p1', name: 'Field Notebook', detail: 'A5 · dot grid', price: 18 },
  { id: 'p2', name: 'Machined Pen', detail: 'Brass · 0.5mm', price: 64 },
  { id: 'p3', name: 'Desk Mat', detail: 'Wool felt · charcoal', price: 45 },
];

export function CartEmpty({
  panelTitle = 'Cart',
  title = 'Your cart is empty',
  description = 'Nothing in here yet. These are the three things you looked at last, and adding one puts it straight in the bag.',
  products = PRODUCTS,
  currency = '$',
  shopLabel = 'Continue shopping',
  onAdd,
  variant = 'Recent',
  className,
}: CartEmptyProps) {
  const [lines, setLines] = React.useState<string[]>([]);
  const reduced = useReducedMotion();

  const subtotal = lines.reduce(
    (sum, id) => sum + (products.find((product) => product.id === id)?.price ?? 0),
    0,
  );

  function add(id: string) {
    setLines((current) => [...current, id]);
    onAdd?.(id);
  }

  return (
    <EmptyPanel
      title={panelTitle}
      meta={lines.length ? `${lines.length} item${lines.length > 1 ? 's' : ''}` : 'No items'}
      toolbar={
        <span className="flex items-center gap-1.5 rounded-full border border-black/[0.07] px-2.5 py-1 dark:border-white/[0.09]">
          <span className="text-neutral-400 [&_svg]:size-3.5 dark:text-neutral-500">
            <IconBag />
          </span>
          <span className="overflow-hidden font-mono text-[12.5px] tabular-nums text-neutral-600 dark:text-neutral-300">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={subtotal}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={SPRING_SNAPPY}
                className="inline-block"
              >
                {currency}
                {subtotal}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      }
      className={className}
    >
      <EmptyState
        icon={<IconBag />}
        backdrop="orbit"
        badge={
          lines.length ? (
            <motion.span
              key={lines.length}
              initial={reduced ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={SPRING_SNAPPY}
              className="grid size-[18px] place-items-center rounded-full bg-neutral-900 font-mono text-[12px] font-medium tabular-nums text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
            >
              {lines.length}
            </motion.span>
          ) : undefined
        }
        title={
          lines.length ? `${lines.length} item${lines.length > 1 ? 's' : ''} in the bag` : title
        }
        description={
          lines.length
            ? `Subtotal ${currency}${subtotal}. Shipping and tax are worked out at checkout.`
            : description
        }
        actions={
          lines.length ? (
            <>
              <EmptyAction icon={<IconBuy />}>Checkout</EmptyAction>
              <EmptyAction emphasis="quiet" onClick={() => setLines([])}>
                Empty the bag
              </EmptyAction>
            </>
          ) : (
            <EmptyAction emphasis="secondary">{shopLabel}</EmptyAction>
          )
        }
        footnote={lines.length ? undefined : 'Free returns for 30 days, no questions.'}
      >
        {variant === 'Recent' && (
          <div className="grid w-full max-w-[520px] grid-cols-1 gap-2 sm:grid-cols-3">
            {products.map((product, index) => {
              const count = lines.filter((id) => id === product.id).length;
              return (
                <motion.div
                  key={product.id}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={
                    reduced ? { duration: 0.15 } : { ...SPRING_ENTRANCE, delay: 0.05 * index }
                  }
                  className={cn(
                    'flex flex-col rounded-xl border p-3 text-left transition-colors duration-200',
                    count
                      ? 'border-black/[0.14] bg-black/[0.025] dark:border-white/20 dark:bg-white/[0.05]'
                      : 'border-black/[0.07] dark:border-white/[0.09]',
                  )}
                >
                  <span
                    aria-hidden
                    className="mb-2.5 h-14 rounded-lg bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.045)_0_6px,transparent_6px_12px)] dark:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_6px,transparent_6px_12px)]"
                  />
                  <span className="truncate text-[13.5px] font-medium text-neutral-800 dark:text-neutral-100">
                    {product.name}
                  </span>
                  <span className="truncate text-[12.5px] text-neutral-400 dark:text-neutral-500">
                    {product.detail}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-[13px] tabular-nums text-neutral-700 dark:text-neutral-200">
                      {currency}
                      {product.price}
                    </span>
                    <EmptyAction
                      emphasis="secondary"
                      icon={<IconPlus />}
                      onClick={() => add(product.id)}
                      aria-label={`Add ${product.name} to the bag`}
                      className="h-7 px-2 text-[12.5px]"
                    >
                      {count ? `${count}` : 'Add'}
                    </EmptyAction>
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </EmptyState>
    </EmptyPanel>
  );
}
