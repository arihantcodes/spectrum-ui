import { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes-config";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/colors`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pro`,
      lastModified: new Date("2026-03-22"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tos`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await getAllBlogPosts();
    blogPages = blogPosts
      .filter((post) => post.slug && post.date)
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    blogPages = [];
  }

  const componentPages: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    if (!route.children) continue;

    for (const child of route.children) {
      if (child.url.startsWith("http")) continue;

      const isComponent = route.groupKey === "components";
      componentPages.push({
        url: `${baseUrl}${child.url}`,
        lastModified: new Date("2026-03-22"),
        changeFrequency: isComponent ? "weekly" : "monthly",
        priority: isComponent ? 0.8 : 0.6,
      });
    }
  }

  return [...staticPages, ...blogPages, ...componentPages];
}
