import { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes-config";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { comparisons } from "@/lib/comparisons";

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
      lastModified: new Date("2026-07-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/agents.md`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 0.4,
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
    // GEO/AEO comparison + roundup pages
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-animated-react-component-libraries`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-react-component-libraries`,
      lastModified: new Date("2026-07-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/awesome`,
      lastModified: new Date("2026-07-20"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified: new Date("2026-07-20"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...comparisons.map((c) => ({
      url: `${baseUrl}/compare/${c.slug}`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
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

  // Component pages not (yet) registered in ROUTES; listed here so crawlers still find them
  const extraComponentPaths = [
    "/docs/animated-switch",
    "/docs/animatedcard",
    "/docs/animateddrawer",
    "/docs/animatedtext",
    "/docs/avatar-stack",
    "/docs/command-palette",
    "/docs/discloseimage",
    "/docs/face-rating",
    "/docs/follow-button",
    "/docs/github-card",
    "/docs/heading-with-anchor",
    "/docs/hold-to-confirm",
    "/docs/input",
    "/docs/input-model",
    "/docs/kanban",
    "/docs/kbd-key",
    "/docs/like-button",
    "/docs/login",
    "/docs/morph-button",
    "/docs/notification-bell",
    "/docs/password-strength",
    "/docs/product-card",
    "/docs/quantity-stepper",
    "/docs/reaction-bar",
    "/docs/share-button",
    "/docs/star-rating",
    "/docs/status-badge",
    "/docs/swipe-to-delete",
    "/docs/task-checkbox",
    "/docs/testimonials",
    "/docs/tilt-card",
    "/docs/undo-pill",
  ];
  const seenComponentUrls = new Set(componentPages.map((p) => p.url));
  for (const path of extraComponentPaths) {
    const url = `${baseUrl}${path}`;
    if (seenComponentUrls.has(url)) continue;
    componentPages.push({
      url,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Pro template detail pages
  let templatePages: MetadataRoute.Sitemap = [];
  try {
    const { data: templates } = await supabaseAdmin
      .from("templates")
      .select("slug, created_at")
      .eq("is_published", true);

    if (templates) {
      templatePages = templates.map((t) => ({
        url: `${baseUrl}/pro/${t.slug}`,
        lastModified: new Date(t.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    templatePages = [];
  }

  return [...staticPages, ...blogPages, ...componentPages, ...templatePages];
}
