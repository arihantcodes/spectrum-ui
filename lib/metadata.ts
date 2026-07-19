import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const MAX_METADATA_TITLE_LENGTH = 60;
export const MAX_METADATA_DESCRIPTION_LENGTH = 155;

function normalizeMetadataText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;

  const candidate = value.slice(0, maxLength - 1);
  const lastSpace = candidate.lastIndexOf(' ');
  const clipped = (lastSpace > maxLength * 0.6 ? candidate.slice(0, lastSpace) : candidate).replace(
    /[,:;.!?\s-]+$/,
    '',
  );

  return clipped + '…';
}

export function formatMetadataTitle(title: string, suffix = ' | Spectrum UI') {
  const normalizedTitle = normalizeMetadataText(title);
  const availableLength = MAX_METADATA_TITLE_LENGTH - suffix.length;
  return truncateAtWord(normalizedTitle, availableLength) + suffix;
}

export function formatMetadataDescription(description: string) {
  return truncateAtWord(normalizeMetadataText(description), MAX_METADATA_DESCRIPTION_LENGTH);
}

export function createNoIndexMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: formatMetadataTitle(title) },
    description: formatMetadataDescription(description),
    alternates: {
      canonical: siteConfig.url + path,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}
