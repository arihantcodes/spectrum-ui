import componentCatalog from '@/content/component-catalog.json';

export interface ComponentCatalogItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  /** Recently shipped — drives the "New" badge in the docs sidebar. */
  new?: boolean;
}

export const COMPONENT_CATALOG = componentCatalog as readonly ComponentCatalogItem[];

export function componentDocsPath(slug: string) {
  return `/docs/${slug}`;
}

export function findComponentByName(name: string) {
  return COMPONENT_CATALOG.find((component) => component.name === name);
}
