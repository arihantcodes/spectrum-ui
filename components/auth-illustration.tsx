import { Icons } from '@/components/icon'

/* ─── Tiny mock components that look like Spectrum UI's actual offerings ─── */

function MockButton({ variant, children }: { variant: 'primary' | 'outline' | 'ghost'; children: React.ReactNode }) {
  const base = 'px-4 py-2 rounded-lg text-xs font-medium transition-colors'
  const variants = {
    primary: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
    outline: 'border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
    ghost: 'text-neutral-500 dark:text-neutral-400',
  }
  return <div className={`${base} ${variants[variant]}`}>{children}</div>
}

function ComponentShowcase() {
  return (
    <div className="space-y-6">
      {/* Card component preview */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-2">
            <Icons.logo className="h-full w-full text-black dark:text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Quick Setup</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Copy & paste into your project</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MockButton variant="primary">Get Started</MockButton>
          <MockButton variant="outline">Learn More</MockButton>
        </div>
      </div>

      {/* Code snippet mini-preview */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600">terminal</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed">
          <div className="text-neutral-500 dark:text-neutral-500">
            <span className="text-neutral-400 dark:text-neutral-600">$</span>{' '}
            <span className="text-emerald-600 dark:text-emerald-400">npx</span>{' '}
            <span className="text-neutral-700 dark:text-neutral-300">spectrum-ui add button</span>
          </div>
          <div className="text-neutral-400 dark:text-neutral-600 mt-1">
            ✓ Installing component...
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 mt-0.5">
            ✓ Done! Component added to your project
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Components', value: '200+' },
          { label: 'Users', value: '5k+' },
          { label: 'GitHub Stars', value: '900+' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 text-center shadow-sm"
          >
            <p className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">{stat.value}</p>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Component list */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400 dark:text-neutral-600 mb-3">Popular</p>
        <div className="space-y-2">
          {[
            { name: 'Animated Button', tag: 'Interactive', color: 'bg-black' },
            { name: 'Data Table', tag: 'Layout', color: 'bg-gray-500' },
            { name: 'Modal Dialog', tag: 'Overlay', color: 'bg-gray-200' },
          ].map((comp) => (
            <div key={comp.name} className="flex items-center gap-3 py-1.5">
              <div className={`w-2 h-2 rounded-full ${comp.color} shrink-0`} />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 flex-1">{comp.name}</span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5">{comp.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AuthIllustration() {
  return (
    <div className="hidden lg:flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Gradient accent blurs */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-violet-200/30 dark:bg-violet-500/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full bg-indigo-200/20 dark:bg-indigo-500/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 xl:px-12 py-12">

        {/* Header */}
        <div className="mb-8">
          {/* <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 bg-white dark:bg-white border border-neutral-200 dark:border-transparent rounded-lg flex items-center justify-center p-1.5 shadow-sm">
              <Icons.logo className="h-full w-full text-black" />
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">Spectrum UI</span>
          </div> */}
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1.5">
            Build faster with 200+ components
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-sm">
            Production-ready React components. Copy, paste, and ship your next project in hours, not weeks.
          </p>
        </div>

        {/* Component showcase */}
        <ComponentShowcase />

        {/* Bottom trust badge */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[
              'https://randomuser.me/api/portraits/men/32.jpg',
              'https://randomuser.me/api/portraits/women/44.jpg',
              'https://randomuser.me/api/portraits/men/67.jpg',
              'https://randomuser.me/api/portraits/women/17.jpg',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Developer ${i + 1}`}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
              />
            ))}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Trusted by <span className="text-neutral-700 dark:text-neutral-300 font-medium">5,000+</span> developers
          </p>
        </div>
      </div>
    </div>
  )
}
