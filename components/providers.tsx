"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/provider";
import { AuthGateProvider } from "@/lib/auth-gate-store";
import { AuthGateModal } from "@/components/auth-gate-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <PostHogProvider>
          <AuthGateProvider>
            {children}
            <AuthGateModal />
          </AuthGateProvider>
        </PostHogProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
