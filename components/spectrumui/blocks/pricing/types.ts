export type BillingPeriod = 'monthly' | 'annual';

export interface PlanPrice {
  monthly: number;
  annual: number;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: PlanPrice | null;
  unit?: string;
  cta: string;
  featured?: boolean;
  badge?: string;
  inherits?: string;
  features: string[];
  footnote?: string;
}

export type FeatureValue = string | boolean;

export interface FeatureRow {
  label: string;
  hint?: string;
  values: FeatureValue[];
}

export interface FeatureGroup {
  label: string;
  rows: FeatureRow[];
}

export interface RateTier {
  from: number;
  to?: number;
  unitPrice: number;
}

export interface MeteredProduct {
  id: string;
  name: string;
  description?: string;
  unit: string;
  unitPlural: string;
  included: number;
  tiers: RateTier[];
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  bonus: number;
  price: number;
  featured?: boolean;
  note?: string;
}

export interface CreditRate {
  id: string;
  label: string;
  credits: number;
  per: number;
  unitLabel: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  unit?: string;
  perSeat?: boolean;
  defaultOn?: boolean;
}

export interface ModelRate {
  id: string;
  name: string;
  context: string;
  input: number;
  output: number;
  cacheWrite: number;
  cacheRead: number;
  badge?: string;
}

export interface UsageDimension {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface ComplianceItem {
  id: string;
  label: string;
  detail: string;
}

export interface RecommenderOption {
  id: string;
  label: string;
  scores: Record<string, number>;
  reason?: string;
}

export interface RecommenderQuestion {
  id: string;
  label: string;
  hint?: string;
  options: RecommenderOption[];
}

export interface PlanFamily {
  id: string;
  label: string;
  description: string;
  plans: Plan[];
  footnote?: string;
}
