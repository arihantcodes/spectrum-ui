import { CHANGELOG } from '@/content/changelog';
import { siteConfig } from '@/config/site';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const url = `${siteConfig.url}/changelog`;

  const items = CHANGELOG.map((entry) => {
    const link = `${url}#${entry.slug}`;
    const description = [
      ...entry.body,
      ...(entry.sections?.flatMap((section) =>
        section.items.map((item) => `• ${item}`),
      ) ?? []),
    ].join('\n\n');

    return [
      '    <item>',
      `      <title>${escapeXml(entry.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${new Date(`${entry.date}T09:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(entry.area)}</category>`,
      `      <description>${escapeXml(description)}</description>`,
      '    </item>',
    ].join('\n');
  }).join('\n');

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Spectrum UI Changelog</title>',
    `    <link>${url}</link>`,
    `    <atom:link href="${url}/feed.xml" rel="self" type="application/rss+xml"/>`,
    '    <description>New AI blocks, component updates, and MCP server improvements from Spectrum UI.</description>',
    '    <language>en</language>',
    `    <lastBuildDate>${new Date(`${CHANGELOG[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
