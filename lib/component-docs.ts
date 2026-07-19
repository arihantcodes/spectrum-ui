import componentDocsData from '@/content/component-docs.json';

export interface ComponentDocProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ComponentDocLink {
  slug: string;
  name: string;
  description: string;
}

export interface ComponentDocFAQ {
  question: string;
  answer: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  dependencies: string[];
  registryDependencies: string[];
  installation: {
    cliCommands: string[];
    dependencyCommands: string[];
    manualPaths: string[];
  };
  coverage: {
    installation: boolean;
    usage: boolean;
    props: boolean;
  };
  props: ComponentDocProp[];
  useCases: string[];
  features: string[];
  accessibility: string[];
  customization: string[];
  related: ComponentDocLink[];
  faqs: ComponentDocFAQ[];
}

export const componentDocs = componentDocsData as ComponentDoc[];

const componentDocsBySlug = new Map(componentDocs.map((component) => [component.slug, component]));
const componentDocsByName = new Map(
  componentDocs.map((component) => [component.name.toLowerCase(), component]),
);

export function getComponentDocBySlug(slug: string) {
  return componentDocsBySlug.get(slug);
}

export function getComponentDocByName(name: string) {
  return componentDocsByName.get(name.toLowerCase());
}

export function getComponentDocFromUrl(url: string) {
  const slug = new URL(url).pathname.split('/').filter(Boolean).at(-1);
  return slug ? getComponentDocBySlug(slug) : undefined;
}
