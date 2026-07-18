import type { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";

export const metadata: Metadata = baseMetadata({
  title: "Pharmacy Dashboard — React Template",
  description:
    "Preview and copy a React pharmacy dashboard for inventory, prescriptions, sales, and operational data in a responsive Next.js layout.",
  canonicalUrl: "https://ui.spectrumhq.in/templates/pharmacy-dashboard",
});

export default function PharmacyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
