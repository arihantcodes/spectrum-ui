import { Icons } from '@/components/icon'

export function AuthIllustration() {
  return (
    <div className="hidden lg:flex flex-col bg-neutral-50 dark:bg-[#0a0a0a] relative overflow-hidden h-full">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Gradient accent blurs */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-violet-200/30 dark:bg-violet-500/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full bg-indigo-200/20 dark:bg-indigo-500/5 blur-3xl" />

      {/* Content Container (Low contrast, non-interactive) */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 xl:px-16 py-12 w-full max-w-xl mx-auto select-none pointer-events-none opacity-80 dark:opacity-80 transition-opacity duration-300">
        
        {/* Subtle Header */}
        <div className="mb-8 text-left">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="h-4.5 w-4.5  text-neutral-400 dark:text-neutral-600">
              <Icons.logo className="h-full w-full" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              SPECTRUM UI
            </span>
          </div>
          <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">
            Developer Studio
          </h2>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-xs mt-1">
            Visualizing status, analytics, and framework assets in a calm workspace.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/40 backdrop-blur-[2px] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-200/10 dark:shadow-black/20 flex flex-col">
          {/* Faux Browser Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200/30 dark:border-neutral-800/30 bg-neutral-100/10 dark:bg-neutral-900/10">
            {/* Window control dots */}
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
            {/* Faux search bar */}
            <div className="mx-auto w-32 h-3.5 rounded bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/10 dark:border-neutral-800/10 flex items-center justify-center">
              <div className="w-10 h-0.5 rounded bg-neutral-300/40 dark:bg-neutral-700/40" />
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="p-5 space-y-5">
            {/* Main Sparkline Panel */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">System Uptime</span>
                  <h3 className="text-lg font-light text-neutral-800 dark:text-neutral-200 tracking-tight mt-0.5">99.98% Operational</h3>
                </div>
                <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">Live feed</span>
              </div>

              {/* Sparkline chart SVG */}
              <div className="h-24 w-full border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl overflow-hidden bg-neutral-50/10 dark:bg-neutral-950/10 relative">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Faint grid lines */}
                  <line x1="0" y1="25" x2="400" y2="25" stroke="rgba(128, 128, 128, 0.03)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(128, 128, 128, 0.03)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(128, 128, 128, 0.03)" strokeWidth="1" strokeDasharray="3,3" />
                  {/* Filled area */}
                  <path
                    d="M0,85 Q30,68 60,78 T120,50 T180,65 T240,35 T300,55 T360,28 T400,22 L400,100 L0,100 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Stroke path */}
                  <path
                    d="M0,85 Q30,68 60,78 T120,50 T180,65 T240,35 T300,55 T360,28 T400,22"
                    fill="none"
                    stroke="rgba(99, 102, 241, 0.25)"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            </div>

            {/* Split cards for metrics and logs */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1: Metric + Radial indicator */}
              <div className="border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl p-3 bg-neutral-50/10 dark:bg-neutral-950/10 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Resource Load</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <svg className="w-8 h-8 transform -rotate-90">
                      <circle cx="16" cy="16" r="13" stroke="rgba(128, 128, 128, 0.06)" strokeWidth="2.5" fill="none" />
                      <circle
                        cx="16"
                        cy="16"
                        r="13"
                        stroke="rgba(99, 102, 241, 0.25)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeDasharray="81.68"
                        strokeDashoffset="53"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div>
                      <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">35% CPU</div>
                      <div className="text-[8px] text-neutral-400 dark:text-neutral-500">Optimized</div>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-neutral-200/30 dark:bg-neutral-800/30 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-400/20 dark:bg-neutral-600/20 w-3/5 rounded-full" />
                </div>
              </div>

              {/* Card 2: Faded Logs */}
              <div className="border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl p-3 bg-neutral-50/10 dark:bg-neutral-950/10 flex flex-col justify-between h-28">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Console logs</span>
                  <div className="space-y-1 mt-1.5 font-mono text-[8px] text-neutral-400 dark:text-neutral-500 leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                      <span>env verified</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                      <span>assets optimized</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-450 dark:bg-neutral-550 animate-pulse" />
                      <span>listening on port 3000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Row */}
            <div className="border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl p-3 bg-neutral-50/10 dark:bg-neutral-950/10 flex items-center justify-between text-[9px] font-mono text-neutral-400 dark:text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/30 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500/40"></span>
                </span>
                <span>Active Region: Global Edge</span>
              </div>
              <div>Latency: 14ms</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
