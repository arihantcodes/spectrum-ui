import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-frame border-b border-border bg-background">
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 py-20 text-center">
        <span className="inline-flex h-8 items-center rounded-full bg-black/[0.045] px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-700 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:bg-white/[0.07] dark:text-neutral-200 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.09)]">
          404
        </span>
        <h1 className="font-spectral text-[30px] font-light leading-[1] tracking-[-0.09em] text-black [text-wrap:balance] sm:text-[42px] dark:text-white">
          This post doesn&rsquo;t exist.
        </h1>
        <p className="max-w-sm text-[15px] leading-[1.75] text-muted-foreground">
          The article you&rsquo;re looking for may have moved or never existed. Head back to the
          journal to keep reading.
        </p>
        <Link
          href="/blog"
          className="mt-2 inline-flex h-11 items-center rounded-full bg-primary px-6 text-[14px] font-medium text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3)] transition-[transform,background-color] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98] dark:shadow-[0_0_20px_rgba(255,255,255,0.18)]"
        >
          Back to the journal
        </Link>
      </div>
    </div>
  );
}
