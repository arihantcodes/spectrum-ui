import { auth } from '@/auth'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import Link from 'next/link'
import {
  IconBrandGithub,
  IconExternalLink,
  IconPackage,
} from '@tabler/icons-react'
import { formatDate } from '@/lib/utils'
import { RestoreAccessButton } from '@/components/dashboard/RestoreAccessButton'

export default async function DashboardPage() {
  const session = await auth()
  const email   = session?.user?.email!

  // Fetch all active orders with template details
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      id,
      email,
      github_username,
      template_slug,
      amount,
      currency,
      status,
      github_access_granted,
      payment_id,
      purchased_at,
      templates (
        name,
        tagline,
        tech_stack,
        github_repo,
        preview_url,
        thumbnail_url
      )
    `)
    .eq('email', email)
    .eq('status', 'active')
    .order('purchased_at', { ascending: false })

  const hasGitHub = !!session?.user?.githubUsername

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Empty state */}
      {!orders?.length && (
        <div className="bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] rounded-xl p-12
          text-center dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)] shadow-sm">
          <div className="w-12 h-12 bg-white dark:bg-[#161616] border border-neutral-200 dark:border-[#222]
            rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm dark:shadow-none">
            <IconPackage size={20} className="text-neutral-400 dark:text-[#444]" />
          </div>
          <p className="text-neutral-500 dark:text-[#666] text-sm mb-1">No templates yet</p>
          <p className="text-neutral-400 dark:text-[#444] text-xs mb-5">
            Your purchases will appear here
          </p>
          <Link href="/pro"
             className="inline-flex items-center gap-1.5
              bg-[#6366F1] hover:bg-[#4F46E5] text-white
              text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            Browse templates →
          </Link>
        </div>
      )}

      {/* Orders list */}
      <div className="space-y-4">
        {orders?.map((order: any) => (
          <div key={order.id}
            className="group bg-neutral-50 dark:bg-[#0A0A0A] border border-neutral-200 dark:border-[#222] rounded-2xl p-6
              hover:border-neutral-300 dark:hover:border-[#333] transition-all duration-300
              dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)] shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-0.5">

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">

                {/* Name + status */}
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h2 className="font-semibold text-neutral-900 dark:text-[#F5F5F5]">
                    {order.templates?.name}
                  </h2>
                  <span className="text-[10px] bg-[#22C55E]/10
                    border border-[#22C55E]/20 text-[#22C55E]
                    px-2 py-0.5 rounded-full font-medium">
                    Active
                  </span>
                  {!order.github_access_granted && (
                    <span className="text-[10px] bg-[#F59E0B]/10
                      border border-[#F59E0B]/20 text-[#F59E0B]
                      px-2 py-0.5 rounded-full font-medium">
                      Pending access
                    </span>
                  )}
                </div>

                <p className="text-sm text-neutral-500 dark:text-[#666] mb-3">
                  {order.templates?.tagline}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {order.templates?.tech_stack?.map((tech: string) => (
                    <span key={tech}
                      className="text-[11px] bg-white dark:bg-[#161616] border border-neutral-200 dark:border-[#222]
                        text-neutral-500 dark:text-[#555] px-2 py-0.5 rounded-md shadow-sm dark:shadow-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={`https://github.com/${order.templates?.github_repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2
                    bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
                    text-xs font-semibold px-3.5 py-2 rounded-lg
                    transition-colors"
                >
                  <IconBrandGithub size={14} />
                  Open Repo
                </a>
                
                {!order.github_access_granted && (
                  <RestoreAccessButton paymentId={order.payment_id} />
                )}

                <a
                  href={order.templates?.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 justify-center
                    border border-neutral-200 hover:border-neutral-300 dark:border-[#222] dark:hover:border-[#333]
                    text-neutral-600 hover:text-neutral-900 dark:text-[#666] dark:hover:text-[#A0A0A0]
                    text-xs px-3.5 py-2 rounded-lg bg-white dark:bg-transparent
                    transition-all shadow-sm dark:shadow-none"
                >
                  <IconExternalLink size={13} />
                  Preview
                </a>
              </div>
            </div>

            {/* Footer row */}
            <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-[#1A1A1A]
              flex items-center justify-between flex-wrap gap-3">
              <div className="group relative flex items-center">
                <code className="text-[11px] text-neutral-800 dark:text-[#555] font-mono bg-neutral-200/40 dark:bg-[#161616]/50 px-3 py-1.5 rounded-lg border border-neutral-200/50 dark:border-[#222]/50">
                  git clone https://github.com/{order.templates?.github_repo}
                </code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`git clone https://github.com/${order.templates?.github_repo}`)
                  }}
                  className="ml-2 p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-[#888] transition-colors rounded-md hover:bg-neutral-200 dark:hover:bg-[#222]"
                  title="Copy to clipboard"
                >
                  <IconExternalLink size={12} className="rotate-45" /> 
                </button>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-medium text-neutral-500 dark:text-[#444] uppercase tracking-tight">
                <span>
                  {new Intl.NumberFormat(order.currency === 'INR' ? 'en-IN' : 'en-US', {
                    style: 'currency',
                    currency: order.currency || 'USD',
                    minimumFractionDigits: (order.amount % 100 === 0) ? 0 : 2
                  }).format(order.amount / 100)}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-[#222]" />
                <span>{formatDate(order.purchased_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer help */}
      {!!orders?.length && (
        <p className="text-center text-xs text-neutral-500 dark:text-[#444] mt-8">
          Issue with access?{' '}
          <a href="mailto:jainari1208@gmail.com"
            className="text-neutral-700 dark:text-[#666] hover:text-neutral-900 dark:hover:text-[#888] transition-colors underline underline-offset-2">
            Email us →
          </a>
        </p>
      )}
    </div>
  )
}
