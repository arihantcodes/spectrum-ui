export interface ChartLibraryItem {
  slug: string;
  name: string;
  description: string;
  registryName: string;
  /** The component you import — used by the docs' Usage snippet. */
  exportName: string;
  /** A minimal, real call of that component. */
  usage: string;
  /** Things that bite people, worth saying once on the page. */
  notes?: string[];
}

/** Chart types live on `/charts/<slug>`, not under `/docs`. */
export const CHART_LIBRARY: readonly ChartLibraryItem[] = [
  {
    slug: 'data',
    name: 'Connecting Real Data',
    description:
      'Wiring any chart to a real source: fetch in an effect, SWR or React Query, server components, and streaming — with every outcome mapped onto a status.',
    registryName: 'chart-data',
    exportName: 'useChartData',
    usage: 'const { data, status, retry } = useChartData<Point[]>(\'/api/metrics\');',
    notes: [
      'Every chart takes the same `status` union, so one fetch hook drives all of them.',
      '`retry` is wired to the error state\'s button — pass it straight through as `onRetry`.',
    ],
  },
  {
    slug: 'states',
    name: 'Chart States',
    description:
      'Loading skeletons, empty states and error states for every chart — one wrapper, six skeleton shapes, and a frame height that never shifts between them.',
    registryName: 'chart-states',
    exportName: 'ChartStatusSwitcher',
    usage: '<ChartStatusSwitcher />',
    notes: [
      '`ChartState` wraps anything, not just Spectrum charts — give it a height and a skeleton variant.',
      'The frame height is identical in all four states, so nothing shifts when data lands.',
    ],
  },
  {
    slug: 'stat-cards',
    name: 'Stat Cards',
    description:
      'KPI cards with a big value, the delta written as a sentence, and a scrubbable sparkline or progress bar beside it — the row every dashboard opens with.',
    registryName: 'stat-cards',
    exportName: 'StatCards',
    usage: '<StatCards cards={cards} columns={4} />',
    notes: [
      'Set `goodWhen: \'down\'` on metrics where falling is healthy, like churn — otherwise the delta turns red.',
      'Pass `previous` to compare against last period instead of the first point in the series.',
      'A card with `progress` renders a bar instead of a sparkline.',
    ],
  },
  {
    slug: 'market',
    name: 'Market Chart',
    description:
      'A trading-desk chart in pure SVG: OHLC candles, a volume pane, a snapping crosshair with axis-pinned price and time, a range selector, and a live tape.',
    registryName: 'market-chart',
    exportName: 'MarketChart',
    usage: '<MarketChart data={candles} symbol="SOL" name="Solana" />',
    notes: [
      'Candles need `{ t, open, high, low, close, volume }` with `t` in epoch milliseconds.',
      '`live` appends simulated ticks — drive it from your own socket by feeding `data` instead.',
      'Arrow keys scrub the crosshair once the plot has focus.',
    ],
  },
  {
    slug: 'indicators',
    name: 'Indicator Chart',
    description:
      'Price, RSI and MACD stacked on one time axis with a single crosshair that reports all three panes at once.',
    registryName: 'indicator-chart',
    exportName: 'IndicatorChart',
    usage: '<IndicatorChart data={candles} symbol="SOL" />',
    notes: [
      'RSI and MACD are computed from the full series, then sliced — so changing range never restates them.',
      '`rsi()` and `macd()` are exported if you want the numbers without the chart.',
    ],
  },
  {
    slug: 'depth',
    name: 'Depth Chart',
    description:
      'Cumulative bid and ask liquidity either side of the mid, with a crosshair that reports the size resting up to any price.',
    registryName: 'depth-chart',
    exportName: 'DepthChart',
    usage: '<DepthChart book={book} symbol="SOL" />',
    notes: [
      '`generateOrderBook()` from the engine builds a specimen book; swap it for your feed.',
      'Levels are cumulative from the mid outward — pass `total` already summed.',
    ],
  },
  {
    slug: 'order-book',
    name: 'Order Book',
    description:
      'A trading ladder with cumulative depth bars, a spread row, and flashing updates in live mode.',
    registryName: 'order-book',
    exportName: 'OrderBookLadder',
    usage: '<OrderBookLadder book={book} symbol="SOL" live />',
    notes: [
      'Hovering a row highlights every level between it and the touch — the sweep cost.',
      '`live` re-derives the book from a seeded nonce, so it stays deterministic across renders.',
    ],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio Chart',
    description:
      'Account value against cost basis with drawdown from the running peak shaded underneath.',
    registryName: 'portfolio-chart',
    exportName: 'PortfolioChart',
    usage: '<PortfolioChart data={points} label="Portfolio" />',
    notes: [
      'Drawdown is measured from the running peak inside the visible range, not all time.',
      '`basis` is capital deployed to date — the stepped dashed line.',
    ],
  },
  {
    slug: 'heatmap',
    name: 'Market Heatmap',
    description:
      'A squarified treemap sized by market cap and coloured on a diverging change ramp — the market map.',
    registryName: 'market-heatmap',
    exportName: 'MarketHeatmap',
    usage: '<MarketHeatmap data={constituents} cap={6} />',
    notes: [
      'Tiles too small to carry a ticker are folded into one `Other` tile, so it adapts to any width.',
      '`cap` is the percentage change that saturates the colour ramp.',
    ],
  },
  {
    slug: 'calendar',
    name: 'Calendar Heatmap',
    description:
      'A year of daily values as week columns — the contributions grid, with five quantised intensity steps, streak stats, and month rails.',
    registryName: 'calendar-heatmap',
    exportName: 'CalendarHeatmap',
    usage: '<CalendarHeatmap data={days} label="contributions" />',
    notes: [
      'Days need `{ t, value }` with `t` at UTC midnight; gaps are filled as zero.',
      'Intensity is quantised into five buckets — the eye cannot rank a continuous ramp.',
    ],
  },
  {
    slug: 'cohort',
    name: 'Cohort Retention',
    description:
      'The retention triangle: cohorts down, periods across, intensity by share retained, with a row and column crosshair and a period average.',
    registryName: 'cohort-chart',
    exportName: 'CohortChart',
    usage: '<CohortChart data={cohorts} period="Month" />',
    notes: [
      'Give later cohorts shorter `retention` arrays — the ragged edge is the point.',
      'Index 0 should always be 100; the chart does not normalise for you.',
    ],
  },
  {
    slug: 'histogram',
    name: 'Histogram',
    description:
      'A distribution of raw samples binned on nice edges, with p50 / p95 / p99 pinned onto the plot — the chart that shows the tail your average hides.',
    registryName: 'histogram-chart',
    exportName: 'HistogramChart',
    usage: '<HistogramChart data={samples} label="API latency" />',
    notes: [
      'Pass raw samples — the chart bins them itself on human-readable edges.',
      '`buildBins()` and `percentile()` are exported if you need the numbers elsewhere.',
    ],
  },
  {
    slug: 'bar',
    name: 'Bar Chart',
    description:
      'Vertical and horizontal bars with hatch, duotone, gradient, stripe, stack, and glow fills.',
    registryName: 'bar-chart',
    exportName: 'BarChart',
    usage: '<BarChart data={data} variant="gradient" />',
  },
  {
    slug: 'line',
    name: 'Line Chart',
    description: 'Multi-series lines with solid, dashed, bump, step, gradient, and glow strokes.',
    registryName: 'line-chart',
    exportName: 'LineChart',
    usage: '<LineChart data={data} curveType="bump" />',
  },
  {
    slug: 'area',
    name: 'Area Chart',
    description: 'Filled areas with gradient, hatch, dotted, stacked, and dashed-stroke variants.',
    registryName: 'area-chart',
    exportName: 'AreaChart',
    usage: '<AreaChart data={data} variant="gradient" />',
  },
  {
    slug: 'pie',
    name: 'Pie Chart',
    description: 'Pie and donut charts with padded sectors, labels, and optional sector glow.',
    registryName: 'pie-chart',
    exportName: 'PieChart',
    usage: '<PieChart data={data} />',
  },
  {
    slug: 'radar',
    name: 'Radar Chart',
    description: 'Radar plots with filled or outline series, circle grids, and glow.',
    registryName: 'radar-chart',
    exportName: 'RadarChart',
    usage: '<RadarChart data={data} />',
  },
  {
    slug: 'radial',
    name: 'Radial Chart',
    description: 'Full and semi-circle radial bars for share and progress.',
    registryName: 'radial-chart',
    exportName: 'RadialChart',
    usage: '<RadialChart data={data} />',
  },
  {
    slug: 'composed',
    name: 'Composed Chart',
    description: 'Bars, lines, and areas on one plot — mix fills, dashes, and glow per series.',
    registryName: 'composed-chart',
    exportName: 'ComposedChart',
    usage: '<ComposedChart data={data} />',
  },
  {
    slug: 'candlestick',
    name: 'Candlestick Chart',
    description:
      'OHLC candles with optional volume and hollow-up bodies — for stocks, SOL, and any market pair.',
    registryName: 'candlestick-chart',
    exportName: 'CandlestickChart',
    usage: '<CandlestickChart data={candles} showVolume />',
    notes: [
      'Built on Recharts. For a full trading surface use the Market Chart instead.',
    ],
  },
  {
    slug: 'price',
    name: 'Price Chart',
    description:
      'Ticker chrome with last price and signed delta. Use it for tokens, equities, or protocol TVL.',
    registryName: 'price-chart',
    exportName: 'PriceChart',
    usage: '<PriceChart data={series} symbol="SOL" name="Solana" />',
  },
  {
    slug: 'sparkline',
    name: 'Sparkline',
    description:
      'Compact inline price marks for watchlists, token tables, and portfolio rows.',
    registryName: 'sparkline-chart',
    exportName: 'Sparkline',
    usage: '<Sparkline data={series} filled />',
    notes: [
      '`framed={false}` drops the frame so it sits inline in a table row.',
    ],
  },
];

export function chartLibraryPath(slug: string) {
  return `/charts/${slug}`;
}

export function findChartBySlug(slug: string) {
  return CHART_LIBRARY.find((chart) => chart.slug === slug);
}

export function findChartByRegistryName(name: string) {
  return CHART_LIBRARY.find((chart) => chart.registryName === name);
}
