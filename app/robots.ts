import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dashboard/", "/sign-in/"],
      },
      // AI / answer-engine crawlers (AEO + GEO)
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/agents.md", "/docs"],
        disallow: ["/api/", "/dashboard/", "/sign-in/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
