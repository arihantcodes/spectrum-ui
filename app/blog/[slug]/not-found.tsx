import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center font-inter dark:bg-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.035] dark:opacity-[0.05]"
      />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            404
          </span>
        </span>
        <h1 className="font-spectral text-[32px] font-light leading-[1.1] tracking-[-0.025em] text-neutral-900 sm:text-[42px] dark:text-neutral-50">
          This post doesn&apos;t exist.
        </h1>
        <p className="max-w-sm font-inter text-[15px] leading-[1.6] text-[#646464] dark:text-neutral-400">
          The article you&apos;re looking for may have been moved or never
          existed. Head back to the journal to keep reading.
        </p>
        <Link
          href="/blog"
          className="group mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-6 font-inter text-[14px] font-medium text-white transition-transform active:scale-[0.97] dark:bg-white dark:text-neutral-900"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
            <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to the journal
        </Link>
      </div>
    </div>
  );
}
