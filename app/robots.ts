import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const privateRoutes = [
  "/api/",
  "/bookmarks",
  "/create-user",
  "/dashboard",
  "/demo",
  "/payment-success",
  "/profile",
  "/sign-in",
  "/sign-up",
  "/success",
  "/unsubscribe",
];

const explicitlyAllowedCrawlers = [
  // OpenAI: GPTBot trains, OAI-SearchBot builds the ChatGPT search index that
  // produces citations, ChatGPT-User fetches on a live user request.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity: PerplexityBot indexes, Perplexity-User fetches per answer.
  "PerplexityBot",
  "Perplexity-User",
  // Google / Bing / Apple
  "Google-Extended",
  "Google-CloudVertexBot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  // Meta, Amazon, Mistral, You.com, Cohere
  "meta-externalagent",
  "Amazonbot",
  "MistralAI-User",
  "YouBot",
  "cohere-ai",
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
