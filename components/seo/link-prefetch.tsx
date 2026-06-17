"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Component to prefetch important routes for better performance
 * Place this in your layout to prefetch key pages
 */
export function LinkPrefetch() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical routes
    const criticalRoutes = [
      "/docs",
      "/docs/installation",
      "/docs/accordion",
      "/docs/button",
      "/docs/card",
      "/docs/navbar",
      "/docs/modal",
    ];

    // Prefetch after a short delay to not impact initial load
    const timer = setTimeout(() => {
      criticalRoutes.forEach((route) => {
        router.prefetch(route);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

