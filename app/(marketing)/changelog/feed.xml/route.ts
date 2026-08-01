import { CHANGELOG, changelogDate } from '@/content/changelog';
import { siteConfig } from '@/config/site';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function plainText(item: string) {
  return item.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export async function GET() {
  const url = `${siteConfig.url}/changelog`;

  const items = CHANGELOG.map((entry) => {
    const link = `${url}#${entry.slug}`;
    const title = `${changelogDate(entry.date)} — ${entry.groups
      .map((group) => group.label)
      .join(', ')}`;
    const description = entry.groups
      .flatMap((group) => group.items.map((item) => `• ${plainText(item)}`))
      .join('\n');

    return [
      '    <item>',
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${new Date(`${entry.date}T09:00:00Z`).toUTCString()}</pubDate>`,
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
    '    <description>Short, dated notes on every Spectrum UI release.</description>',
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
