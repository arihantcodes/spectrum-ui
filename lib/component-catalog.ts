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

export const UI_COMPONENT_CATALOG = COMPONENT_CATALOG;

export function componentDocsPath(slug: string) {
  return `/docs/${slug}`;
}

export function findComponentByName(name: string) {
  return COMPONENT_CATALOG.find((component) => component.name === name);
}

/** A–Z sort with letter-leading names first; number-leading names (e.g. "3D") go last. */
export function compareComponentNames(a: string, b: string) {
  const aStartsWithDigit = /^\d/.test(a);
  const bStartsWithDigit = /^\d/.test(b);

  if (aStartsWithDigit !== bStartsWithDigit) {
    return aStartsWithDigit ? 1 : -1;
  }

  return a.localeCompare(b, undefined, { sensitivity: "base" });
}
