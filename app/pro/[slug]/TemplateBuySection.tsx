'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { IconLock, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import { BuyModal } from '@/components/marketing/BuyModal'

import { type Template } from '@/types'
import { Globe } from 'lucide-react'

interface TemplateBuySectionProps {
  template: Pick<Template, 'slug' | 'name' | 'price' | 'tagline' | 'preview_url'>
  isOwned?: boolean
}

export function TemplateBuySection({ template, isOwned }: TemplateBuySectionProps) {
  const { data: session } = useSession()
  const [buyModalOpen, setBuyModalOpen] = useState(false)

  const previewBtn = template.preview_url && (
    <a
      href={template.preview_url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2
        bg-white hover:bg-neutral-50 text-neutral-900
        dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white
        border border-neutral-200 dark:border-neutral-800
        font-medium text-sm py-3 rounded-xl transition-all"
    >
      <Globe className='w-4 h-4' />
      Live Preview
    </a>
  )

  // Already owned → show dashboard link
  if (isOwned) {
    return (
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2
            bg-neutral-900 hover:bg-neutral-800 text-white
            dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
            font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          Go to Dashboard
        </Link>
        {previewBtn}
      </div>
    )
  }

  // Not signed in → show sign-in button that redirects back
  if (!session) {
    return (
      <div className="flex flex-col gap-3">
        <Link
          href={`/sign-in?callbackUrl=${encodeURIComponent(`/pro/${template.slug}`)}`}
          className="w-full flex items-center justify-center gap-2
            bg-neutral-900 hover:bg-neutral-800 text-white
            dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
            font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          <IconLock size={16} />
          Sign in to purchase
        </Link>
        {previewBtn}
      </div>
    )
  }

  // Signed in → show buy button + modal
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <button
        onClick={() => setBuyModalOpen(true)}
        className="w-full flex items-center justify-center gap-2
          bg-neutral-900 hover:bg-neutral-800 text-white
          dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
          font-semibold text-sm py-3 rounded-xl transition-colors"
      >
        <span className="font-bold mr-0.5">${(template.price / 100).toFixed(0)}</span>
        Purchase This Template
      </button>

      {previewBtn}

      <BuyModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        template={template}
      />
    </div>
  )
}
