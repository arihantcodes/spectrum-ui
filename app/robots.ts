import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const privateRoutes = [
  "/api/",
  "/bookmarks",
  "/create-user",
  "/dashboard",
  "/demo",
  "/payment-success",
  "/pro/waitlist/success",
  "/profile",
  "/sign-in",
  "/success",
  "/unsubscribe",
];

const explicitlyAllowedCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privateRoutes,
      },
      ...explicitlyAllowedCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: privateRoutes,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
