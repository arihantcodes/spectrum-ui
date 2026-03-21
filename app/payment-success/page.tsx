import { IconCheck, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Success icon */}
        <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20
          rounded-full flex items-center justify-center mx-auto mb-6">
          <IconCheck size={28} className="text-[#22C55E]" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment successful.
        </h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          Check your email for access instructions.
          Accept the GitHub invitation to clone your template.
        </p>

        {/* Quick start */}
        <div className="bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222]
          rounded-xl p-5 mb-6 text-left
          shadow-sm dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
            Next steps
          </p>
          <ol className="space-y-2">
            {[
              'Accept GitHub repo invitation (check email)',
              'Clone your private repository',
              'Run npm install && npm run dev',
              'Ship.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <span className="text-[#6366F1] font-mono mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/dashboard"
            className="flex items-center justify-center gap-2
              bg-[#6366F1] hover:bg-[#4F46E5] text-white
              font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
            <IconBrandGithub size={16} />
            Go to Dashboard
          </Link>
          <Link href="/pro"
            className="text-muted-foreground hover:text-foreground text-sm py-2 transition-colors">
            Browse more templates
          </Link>
        </div>
      </div>
    </div>
  )
}
