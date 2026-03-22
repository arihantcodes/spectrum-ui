import { LucideIcon } from "lucide-react";

export interface Template {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number;
  category: string | null;
  tech_stack: string[] | null;
  preview_url: string | null;
  thumbnail_url: string | null;
  github_repo: string;
  dodo_product_id: string | null;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Order {
  id: string;
  email: string;
  github_username: string;
  template_slug: string;
  payment_id: string;
  amount: number;
  currency: string;
  status: 'active' | 'refunded' | 'cancelled';
  github_access_granted: boolean;
  email_sent: boolean;
  purchased_at: string;
  templates?: Template; // Joined template data
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  github_username: string | null;
  last_sign_in: string;
  created_at: string;
}

export type RoutesProps = {
  groupKey: string;
  groupValue: string;
  icon: LucideIcon;
  children: {
    label: string;
    value: string;
    url: string;
    tag?: {
      label: "new" | "most-popular" | "updated";
      color: "bg-lime-400" | "bg-amber-500" | "bg-blue-400";
    };
  }[];
};
