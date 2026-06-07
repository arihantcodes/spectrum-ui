'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthGateStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const AuthGateContext = createContext<AuthGateStore>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function AuthGateProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthGateContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </AuthGateContext.Provider>
  );
}

export function useAuthGateStore(): AuthGateStore {
  return useContext(AuthGateContext);
}
