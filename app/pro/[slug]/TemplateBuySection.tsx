'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { IconLock, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import { BuyModal } from '@/components/marketing/BuyModal'

import { type Template } from '@/types'

interface TemplateBuySectionProps {
  template: Pick<Template, 'slug' | 'name' | 'price' | 'tagline'>
  isOwned?: boolean
}

export function TemplateBuySection({ template, isOwned }: TemplateBuySectionProps) {
  const { data: session } = useSession()
  const [buyModalOpen, setBuyModalOpen] = useState(false)

  // Already owned → show dashboard link
  if (isOwned) {
    return (
      <Link
        href="/dashboard"
        className="w-full flex items-center justify-center gap-2
          bg-neutral-900 hover:bg-neutral-800 text-white
          dark:bg-[#F5F5F5] dark:hover:bg-white dark:text-[#080808]
          font-semibold text-sm py-3 rounded-xl transition-colors"
      >
        Go to Dashboard
      </Link>
    )
  }

  // Not signed in → show sign-in button that redirects back
  if (!session) {
    return (
      <Link
        href={`/sign-in?callbackUrl=${encodeURIComponent(`/pro/${template.slug}`)}`}
        className="w-full flex items-center justify-center gap-2
          bg-[#6366F1] hover:bg-[#4F46E5] text-white
          font-semibold text-sm py-3 rounded-xl transition-colors"
      >
        <IconBrandGithub size={16} />
        Sign in to purchase
      </Link>
    )
  }

  // Signed in → show buy button + modal
  return (
    <>
      <button
        onClick={() => setBuyModalOpen(true)}
        className="w-full flex items-center justify-center gap-2
          bg-[#6366F1] hover:bg-[#4F46E5] text-white
          font-semibold text-sm py-3 rounded-xl transition-colors"
      >
        <IconLock size={15} />
        Purchase for ${(template.price / 100).toFixed(0)}
      </button>

      <BuyModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        template={template}
      />
    </>
  )
}
