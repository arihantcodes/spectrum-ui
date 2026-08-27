"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/provider";
import { PostHogIdentify } from "@/components/posthog-identify";
import { AuthGateProvider } from "@/lib/auth-gate-store";
import { AuthGateModal } from "@/components/auth-gate-modal";
import { BookmarkProvider } from "@/lib/bookmark-store";
import { CommandMenu } from "@/components/command-menu";

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
          <PostHogIdentify />
          <AuthGateProvider>
            <BookmarkProvider>
              {children}
              <AuthGateModal />
              <CommandMenu />
            </BookmarkProvider>
          </AuthGateProvider>
        </PostHogProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

