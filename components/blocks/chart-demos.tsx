'use client';

import * as React from 'react';
import {
  BumpAreaChart,
  DashedAreaChart,
  DefaultAreaChart,
  DottedAreaChart,
  HatchedAreaChart,
  SolidAreaChart,
  StackedAreaChart,
} from '@/app/registry/charts/area-chart';
import {
  DefaultBarChart,
  DuotoneBarChart,
  DuotoneReverseBarChart,
  GlowingBarChart,
  GradientBarChart,
  HatchedBarChart,
  HorizontalBarChart,
  PercentBarChart,
  StackedBarChart,
  StrippedBarChart,
} from '@/app/registry/charts/bar-chart';
import {
  DefaultCalendarHeatmap,
  DeploysCalendarHeatmap,
} from '@/app/registry/charts/calendar-heatmap';
import {
  DefaultCandlestickChart,
  HollowCandlestickChart,
  StockCandlestickChart,
  VolumeCandlestickChart,
} from '@/app/registry/charts/candlestick-chart';
import { FetchRecipe, QueryRecipe, StreamRecipe } from '@/app/registry/charts/chart-data';
import { DefaultCohortChart, WeeklyCohortChart } from '@/app/registry/charts/cohort-chart';
import {
  DashedComposedChart,
  DefaultComposedChart,
  DuotoneComposedChart,
  GlowingComposedChart,
  HatchedComposedChart,
} from '@/app/registry/charts/composed-chart';
import { BitcoinDepthChart, DefaultDepthChart } from '@/app/registry/charts/depth-chart';
import { DefaultHistogramChart, OrderValueHistogram } from '@/app/registry/charts/histogram-chart';
import { DefaultIndicatorChart, StockIndicatorChart } from '@/app/registry/charts/indicator-chart';
import {
  BumpLineChart,
  DashedLineChart,
  DefaultLineChart,
  GlowingLineChart,
  GradientLineChart,
  StepLineChart,
} from '@/app/registry/charts/line-chart';
import {
  AreaMarketChart,
  BitcoinMarketChart,
  CompactMarketChart,
  DefaultMarketChart,
  LiveMarketChart,
  StockMarketChart,
} from '@/app/registry/charts/market-chart';
import {
  DefaultOrderBook,
  EthereumOrderBook,
  LiveOrderBook,
} from '@/app/registry/charts/order-book';
import {
  DefaultPieChart,
  DonutPieChart,
  GlowingPieChart,
  LabeledPieChart,
  PaddedPieChart,
} from '@/app/registry/charts/pie-chart';
import { DefaultPortfolioChart, FlatPortfolioChart } from '@/app/registry/charts/portfolio-chart';
import {
  ComparePriceChart,
  DefaultPriceChart,
  StockPriceChart,
  TvlPriceChart,
} from '@/app/registry/charts/price-chart';
import {
  CircleGridRadarChart,
  DefaultRadarChart,
  GlowingRadarChart,
  LinesRadarChart,
} from '@/app/registry/charts/radar-chart';
import {
  DefaultRadialChart,
  GlowingRadialChart,
  SemiRadialChart,
} from '@/app/registry/charts/radial-chart';
import { BudgetStatCards, DefaultStatCards } from '@/app/registry/charts/stat-cards';

/**
 * Live previews for the Charts category. Each chart type is one block whose
 * variant pills switch between the demos the chart ships — the same set that
 * used to be stacked down /charts/<slug>, now selectable in place on the
 * specimen stage.
 */
export const CHART_BLOCK_DEMOS: Record<string, (variant: string) => React.ReactNode> = {
  area: (variant) => {
    switch (variant) {
      case 'Hatched':
        return <HatchedAreaChart />;
      case 'Dotted':
        return <DottedAreaChart />;
      case 'Solid':
        return <SolidAreaChart />;
      case 'Stacked':
        return <StackedAreaChart />;
      case 'Bump':
        return <BumpAreaChart />;
      case 'Dashed':
        return <DashedAreaChart />;
      default:
        return <DefaultAreaChart />;
    }
  },
  bar: (variant) => {
    switch (variant) {
      case 'Hatched':
        return <HatchedBarChart />;
      case 'Duotone':
        return <DuotoneBarChart />;
      case 'Duotone reverse':
        return <DuotoneReverseBarChart />;
      case 'Gradient':
        return <GradientBarChart />;
      case 'Stripped':
        return <StrippedBarChart />;
      case 'Stacked':
        return <StackedBarChart />;
      case 'Percent':
        return <PercentBarChart />;
      case 'Horizontal':
        return <HorizontalBarChart />;
      case 'Glowing':
        return <GlowingBarChart />;
      default:
        return <DefaultBarChart />;
    }
  },
  calendar: (variant) => {
    switch (variant) {
      case 'Deploys':
        return <DeploysCalendarHeatmap />;
      default:
        return <DefaultCalendarHeatmap />;
    }
  },
  candlestick: (variant) => {
    switch (variant) {
      case 'Stock':
        return <StockCandlestickChart />;
      case 'Volume':
        return <VolumeCandlestickChart />;
      case 'Hollow':
        return <HollowCandlestickChart />;
      default:
        return <DefaultCandlestickChart />;
    }
  },
  cohort: (variant) => {
    switch (variant) {
      case 'Weekly':
        return <WeeklyCohortChart />;
      default:
        return <DefaultCohortChart />;
    }
  },
  composed: (variant) => {
    switch (variant) {
      case 'Hatched':
        return <HatchedComposedChart />;
      case 'Duotone':
        return <DuotoneComposedChart />;
      case 'Dashed':
        return <DashedComposedChart />;
      case 'Glowing':
        return <GlowingComposedChart />;
      default:
        return <DefaultComposedChart />;
    }
  },
  data: (variant) => {
    switch (variant) {
      case 'Query':
        return <QueryRecipe />;
      case 'Stream':
        return <StreamRecipe />;
      default:
        return <FetchRecipe />;
    }
  },
  depth: (variant) => {
    switch (variant) {
      case 'Bitcoin':
        return <BitcoinDepthChart />;
      default:
        return <DefaultDepthChart />;
    }
  },
  histogram: (variant) => {
    switch (variant) {
      case 'Orders':
        return <OrderValueHistogram />;
      default:
        return <DefaultHistogramChart />;
    }
  },
  indicators: (variant) => {
    switch (variant) {
      case 'Stock':
        return <StockIndicatorChart />;
      default:
        return <DefaultIndicatorChart />;
    }
  },
  line: (variant) => {
    switch (variant) {
      case 'Dashed':
        return <DashedLineChart />;
      case 'Bump':
        return <BumpLineChart />;
      case 'Step':
        return <StepLineChart />;
      case 'Gradient':
        return <GradientLineChart />;
      case 'Glowing':
        return <GlowingLineChart />;
      default:
        return <DefaultLineChart />;
    }
  },
  market: (variant) => {
    switch (variant) {
      case 'Area':
        return <AreaMarketChart />;
      case 'Live':
        return <LiveMarketChart />;
      case 'Stock':
        return <StockMarketChart />;
      case 'Bitcoin':
        return <BitcoinMarketChart />;
      case 'Compact':
        return <CompactMarketChart />;
      default:
        return <DefaultMarketChart />;
    }
  },
  'order-book': (variant) => {
    switch (variant) {
      case 'Live':
        return <LiveOrderBook />;
      case 'Ethereum':
        return <EthereumOrderBook />;
      default:
        return <DefaultOrderBook />;
    }
  },
  pie: (variant) => {
    switch (variant) {
      case 'Donut':
        return <DonutPieChart />;
      case 'Padded':
        return <PaddedPieChart />;
      case 'Labels':
        return <LabeledPieChart />;
      case 'Glowing':
        return <GlowingPieChart />;
      default:
        return <DefaultPieChart />;
    }
  },
  portfolio: (variant) => {
    switch (variant) {
      case 'Flat':
        return <FlatPortfolioChart />;
      default:
        return <DefaultPortfolioChart />;
    }
  },
  price: (variant) => {
    switch (variant) {
      case 'Stock':
        return <StockPriceChart />;
      case 'TVL':
        return <TvlPriceChart />;
      case 'Compare':
        return <ComparePriceChart />;
      default:
        return <DefaultPriceChart />;
    }
  },
  radar: (variant) => {
    switch (variant) {
      case 'Lines':
        return <LinesRadarChart />;
      case 'Circle':
        return <CircleGridRadarChart />;
      case 'Glowing':
        return <GlowingRadarChart />;
      default:
        return <DefaultRadarChart />;
    }
  },
  radial: (variant) => {
    switch (variant) {
      case 'Semi':
        return <SemiRadialChart />;
      case 'Glowing':
        return <GlowingRadialChart />;
      default:
        return <DefaultRadialChart />;
    }
  },
  'stat-cards': (variant) => {
    switch (variant) {
      case 'Budget':
        return <BudgetStatCards />;
      default:
        return <DefaultStatCards />;
    }
  },
};
