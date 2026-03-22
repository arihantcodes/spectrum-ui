'use client'

import { useState } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 transition-colors rounded-md ${
        copied 
          ? 'text-green-500 bg-green-500/10' 
          : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-[#AAA] hover:bg-neutral-200 dark:hover:bg-[#222]'
      } ${className}`}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
    </button>
  )
}
