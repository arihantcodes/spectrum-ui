import { MetadataRoute } from "next";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/blog";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { COMPONENT_CATALOG, componentDocsPath } from "@/lib/component-catalog";
import { TOPIC_HUB_LINKS, topicHubPath } from "@/lib/topic-hub-links";

type SitemapEntry = MetadataRoute.Sitemap[number];
type RouteConfig = Pick<SitemapEntry, "changeFrequency" | "priority">;

const projectRoot = process.cwd();
const appDirectory = path.join(projectRoot, "app");
const pageFilePattern = /^page\.(?:js|jsx|mdx|ts|tsx)$/;
const componentRoutes = new Set(
  COMPONENT_CATALOG.map((component) => componentDocsPath(component.slug)),
);
const topicHubRoutes = new Set(
  TOPIC_HUB_LINKS.map((hub) => topicHubPath(hub.slug)),
);
const nonIndexableRoutes = new Set([
  "/bookmarks",
  "/create-user",
  "/dashboard",
  "/demo",
  "/payment-success",
  "/pro/waitlist/success",
  "/profile",
  "/registry/responsive-modal",
  "/sign-in",
  "/success",
  "/unsubscribe",
]);

const routeConfig: Record<string, RouteConfig> = {
  "/": { changeFrequency: "weekly", priority: 1 },
  "/blog": { changeFrequency: "weekly", priority: 0.8 },
  "/colors": { changeFrequency: "monthly", priority: 0.5 },
  "/docs": { changeFrequency: "weekly", priority: 0.9 },
  "/docs/guides": { changeFrequency: "monthly", priority: 0.7 },
  "/docs/installation": { changeFrequency: "monthly", priority: 0.8 },
  "/docs/mcp": { changeFrequency: "monthly", priority: 0.7 },
  "/faqs": { changeFrequency: "monthly", priority: 0.5 },
  "/founder-story": { changeFrequency: "yearly", priority: 0.3 },
  "/privacy-policy": { changeFrequency: "yearly", priority: 0.2 },
  "/pro": { changeFrequency: "weekly", priority: 0.7 },
  "/sponsor": { changeFrequency: "monthly", priority: 0.3 },
  "/templates": { changeFrequency: "monthly", priority: 0.7 },
  "/tos": { changeFrequency: "yearly", priority: 0.2 },
};

function discoverPageFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return discoverPageFiles(entryPath);
    return pageFilePattern.test(entry.name) ? [entryPath] : [];
  });
}

function routeFromPageFile(filePath: string): string | null {
  const routeSegments = path
    .relative(appDirectory, path.dirname(filePath))
    .split(path.sep)
    .filter((segment) => segment && !segment.startsWith("("));

  if (
    routeSegments.some(
      (segment) => segment.startsWith("[") || segment.startsWith("@"),
    )
  ) {
    return null;
  }

  return routeSegments.length ? "/" + routeSegments.join("/") : "/";
}

function latestModified(sourceFiles: string[]): Date | undefined {
  const timestamps = sourceFiles.flatMap((sourceFile) => {
    try {
      return [statSync(sourceFile).mtimeMs];
    } catch {
      return [];
    }
  });

  if (!timestamps.length) return undefined;
  return new Date(Math.max(...timestamps));
}

function validDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getRouteConfig(route: string): RouteConfig {
  if (componentRoutes.has(route)) {
    return { changeFrequency: "weekly", priority: 0.8 };
  }

  if (topicHubRoutes.has(route)) {
    return { changeFrequency: "weekly", priority: 0.8 };
  }

  if (route.startsWith("/templates/")) {
    return { changeFrequency: "monthly", priority: 0.6 };
  }

  return (
    routeConfig[route] ?? { changeFrequency: "monthly", priority: 0.5 }
  );
}

function createEntry({
  route,
  sourceFiles,
  fallbackDate,
  config = getRouteConfig(route),
}: {
  route: string;
  sourceFiles: string[];
  fallbackDate?: Date;
  config?: RouteConfig;
}): SitemapEntry {
  const lastModified = latestModified(sourceFiles) ?? fallbackDate;

  return {
    url: route === "/" ? siteConfig.url : siteConfig.url + route,
    ...(lastModified ? { lastModified } : {}),
    ...config,
  };
}

async function getBlogPages(): Promise<MetadataRoute.Sitemap> {
  try {
    const blogPosts = await getAllBlogPosts();

    return blogPosts
      .filter((post) => post.slug)
      .map((post) =>
        createEntry({
          route: "/blog/" + post.slug,
          sourceFiles: [
            path.join(projectRoot, "content", "blog", post.slug + ".tsx"),
          ],
          fallbackDate: validDate(post.date),
          config: { changeFrequency: "monthly", priority: 0.7 },
        }),
      );
  } catch {
    return [];
  }
}

async function getTemplatePages(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data: templates } = await supabaseAdmin
      .from("templates")
      .select("slug, created_at")
      .eq("is_published", true);

    return (templates ?? []).map((template) =>
      createEntry({
        route: "/pro/" + template.slug,
        sourceFiles: [],
        fallbackDate: validDate(template.created_at),
        config: { changeFrequency: "monthly", priority: 0.7 },
      }),
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = discoverPageFiles(appDirectory).flatMap((filePath) => {
    const route = routeFromPageFile(filePath);

    if (!route || nonIndexableRoutes.has(route)) return [];

    const sourceFiles = [filePath];
    const localLayout = path.join(path.dirname(filePath), "layout.tsx");
    if (existsSync(localLayout)) sourceFiles.push(localLayout);

    if (route === "/") {
      sourceFiles.push(path.join(appDirectory, "layout.tsx"));
    }

    if (route === "/docs") {
      sourceFiles.push(
        path.join(appDirectory, "(docs)", "docs", "docs-catalog.tsx"),
        path.join(projectRoot, "content", "component-catalog.json"),
      );
    }

    if (topicHubRoutes.has(route)) {
      sourceFiles.push(
        path.join(projectRoot, "components", "topic-hub-page.tsx"),
        path.join(projectRoot, "content", "topic-hubs.ts"),
        path.join(projectRoot, "lib", "topic-hub-metadata.ts"),
        path.join(projectRoot, "lib", "topic-hub-structured-data.ts"),
      );
    }

    return [createEntry({ route, sourceFiles })];
  });

  const machineReadablePages = [
    createEntry({
      route: "/llms.txt",
      sourceFiles: [path.join(projectRoot, "public", "llms.txt")],
      config: { changeFrequency: "weekly", priority: 0.6 },
    }),
    createEntry({
      route: "/llms-full.txt",
      sourceFiles: [path.join(projectRoot, "public", "llms-full.txt")],
      config: { changeFrequency: "weekly", priority: 0.5 },
    }),
    createEntry({
      route: "/agents.md",
      sourceFiles: [path.join(projectRoot, "public", "agents.md")],
      config: { changeFrequency: "monthly", priority: 0.4 },
    }),
  ];

  const [blogPages, templatePages] = await Promise.all([
    getBlogPages(),
    getTemplatePages(),
  ]);
  const entries = [
    ...staticPages,
    ...machineReadablePages,
    ...blogPages,
    ...templatePages,
  ];
  const uniqueEntries = new Map(entries.map((entry) => [entry.url, entry]));

  return [...uniqueEntries.values()].sort((a, b) => a.url.localeCompare(b.url));
}
