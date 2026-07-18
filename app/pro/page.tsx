import { ProWaitlistSection } from '@/components/marketing/ProWaitlistSection'

export default function ProPage() {
  return (
    <>
      <section className="container-wrapper border-b border-neutral-200 dark:border-neutral-800 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">
                Launching soon
              </p>
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-4 text-foreground">
                Spectrum Pro is coming.{' '}
                <span className="text-muted-foreground">
                  Lock in early-bird pricing today.
                </span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-6">
                Pay once to join the waitlist. Get all premium templates, pro
                components, private Discord, and priority support when we launch.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {['Perpetual license', 'All templates included', 'Priority support'].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 dark:text-green-400"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            <ProWaitlistSection />
          </div>
        </div>
      </section>
    </>
  )
}
