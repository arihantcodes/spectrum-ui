'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/events'

export function ProWaitlistSuccessTracker() {
  useEffect(() => {
    trackEvent({ name: 'pro_waitlist_success_viewed' })
  }, [])

  return null
}
