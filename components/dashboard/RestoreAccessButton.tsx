'use client'

import { useState } from 'react'
import { IconRotate, IconCheck, IconLoader2 } from '@tabler/icons-react'

interface RestoreAccessButtonProps {
  paymentId: string
}

export function RestoreAccessButton({ paymentId }: RestoreAccessButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRestore = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/restore-access', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ paymentId }),
      })

      if (!res.ok) throw new Error('Failed to restore access')
      
      setStatus('success')
      // Refresh after a delay to show updated status
      setTimeout(() => window.location.reload(), 2000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <button
      onClick={handleRestore}
      disabled={status === 'loading' || status === 'success'}
      className={`flex items-center gap-2 justify-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all
        ${status === 'success' 
          ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
          : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20'}
        disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {status === 'loading' ? (
        <>
          <IconLoader2 size={14} className="animate-spin" />
          Restoring Access...
        </>
      ) : status === 'success' ? (
        <>
          <IconCheck size={14} />
          Invitation Sent!
        </>
      ) : (
        <>
          <IconRotate size={14} />
          Retry Invitation
        </>
      )}
    </button>
  )
}
