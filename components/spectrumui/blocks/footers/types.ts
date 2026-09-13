export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
  seeAll?: { label: string; href: string };
}

export interface FooterSocial {
  label: string;
  href: string;
  handle?: string;
}

export type ServiceHealth = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface ServiceStatus {
  name: string;
  health: ServiceHealth;
  history: number[];
  uptime: string;
}

export interface FooterRegion {
  id: string;
  name: string;
  flag: string;
  locale: string;
  currency: string;
  residency: string;
  utcOffset: number;
}

export interface ComplianceBadge {
  id: string;
  label: string;
  scope: string;
  issued: string;
  href: string;
}

export interface ModelStatus {
  id: string;
  name: string;
  context: string;
  latencyMs: number;
  health: ServiceHealth;
  tier: string;
}

export interface OpenRole {
  title: string;
  department: string;
  location: string;
  type: string;
}

export interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  kind: 'model' | 'api' | 'platform';
}
