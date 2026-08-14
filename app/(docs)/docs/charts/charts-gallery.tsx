"use client"

import Link from "next/link"
import { RevenueAreaChart } from "@/app/registry/charts/revenue-area"
import { LiveTrafficChart } from "@/app/registry/charts/live-traffic"
import { RouteThroughputChart } from "@/app/registry/charts/route-throughput"
import { ActivityLatticeChart } from "@/app/registry/charts/activity-lattice"
import { ConversionCascadeChart } from "@/app/registry/charts/conversion-cascade"
import { LatencyBandsChart } from "@/app/registry/charts/latency-bands"
import { ShareRingChart } from "@/app/registry/charts/share-ring"
import { ActualForecastChart } from "@/app/registry/charts/actual-forecast"
import { QuotaGaugeChart } from "@/app/registry/charts/quota-gauge"
import { CohortRetentionChart } from "@/app/registry/charts/cohort-retention"
import { InfraTrioChart } from "@/app/registry/charts/infra-trio"
import { PeriodCompareChart } from "@/app/registry/charts/period-compare"

const TILES = [
  { href: "/docs/charts/revenue-area", name: "Revenue Area", node: <RevenueAreaChart /> },
  { href: "/docs/charts/live-traffic", name: "Live Traffic", node: <LiveTrafficChart /> },
  { href: "/docs/charts/route-throughput", name: "Route Throughput", node: <RouteThroughputChart /> },
  { href: "/docs/charts/share-ring", name: "Share Ring", node: <ShareRingChart /> },
  { href: "/docs/charts/actual-forecast", name: "Actual vs Forecast", node: <ActualForecastChart /> },
  { href: "/docs/charts/period-compare", name: "Period Compare", node: <PeriodCompareChart /> },
  { href: "/docs/charts/latency-bands", name: "Latency Bands", node: <LatencyBandsChart /> },
  { href: "/docs/charts/quota-gauge", name: "Quota Gauge", node: <QuotaGaugeChart /> },
  { href: "/docs/charts/infra-trio", name: "Infra Trio", node: <InfraTrioChart /> },
  { href: "/docs/charts/activity-lattice", name: "Activity Lattice", node: <ActivityLatticeChart /> },
  { href: "/docs/charts/conversion-cascade", name: "Conversion Cascade", node: <ConversionCascadeChart /> },
  { href: "/docs/charts/cohort-retention", name: "Cohort Retention", node: <CohortRetentionChart /> },
] as const

export function ChartsGallery() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {TILES.map((tile) => (
        <article key={tile.href} className="min-w-0">
          <Link
            href={tile.href}
            className="mb-3 inline-flex text-sm font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            {tile.name}
          </Link>
          {tile.node}
        </article>
      ))}
    </div>
  )
}
