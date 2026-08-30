'use client';

import { cn } from '@/lib/utils';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface PriceFigureProps {
  value: number;
  currency?: string;
  decimals?: number;
  className?: string;
}

function Digit({ digit }: { digit: number }) {
  return (
    <span className="relative block h-[1em] w-[1ch] overflow-hidden">
      <span
        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(-${digit * 10}%)` }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="flex h-[1em] items-center justify-center leading-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export function PriceFigure({ value, currency = '$', decimals = 0, className }: PriceFigureProps) {
  const negative = value < 0;
  const body = Math.abs(value).toFixed(decimals);
  const grouped = body.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const label = `${negative ? '−' : ''}${currency}${grouped}`;

  return (
    <span className={cn('inline-flex leading-none tabular-nums', className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="inline-flex">
        {negative && <span className="flex h-[1em] items-center leading-none">−</span>}
        {currency && <span className="flex h-[1em] items-center leading-none">{currency}</span>}
        {grouped.split('').map((character, index) =>
          /\d/.test(character) ? (
            <Digit key={`${index}-digit`} digit={Number(character)} />
          ) : (
            <span key={`${index}-${character}`} className="flex h-[1em] items-center leading-none">
              {character}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export default PriceFigure;
