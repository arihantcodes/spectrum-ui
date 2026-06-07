'use client';

import { useSession } from 'next-auth/react';
import { useAuthGateStore } from '@/lib/auth-gate-store';

interface UseAuthGate {
  isAuthenticated: boolean;
  /** Run `callback` if authenticated; otherwise open the auth modal. */
  requireAuth: (callback?: () => void) => void;
  openAuthModal: () => void;
}

export function useAuthGate(): UseAuthGate {
  const { data: session, status } = useSession();
  const { open } = useAuthGateStore();

  const isAuthenticated = status === 'authenticated' && !!session?.user;

  const requireAuth = (callback?: () => void) => {
    if (isAuthenticated) {
      callback?.();
    } else {
      open();
    }
  };

  return {
    isAuthenticated,
    requireAuth,
    openAuthModal: open,
  };
}
