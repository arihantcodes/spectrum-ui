import type { Props } from '@/app/(docs)/docs/components/props-table/props-table';

/**
 * Props documented on each chart's docs page.
 *
 * Only the props worth reaching for — `className` and the state props are
 * shared by every chart and appended from `SHARED_CHART_PROPS`, so they are
 * not repeated here.
 */

/** On every chart in the collection. */
export const SHARED_CHART_PROPS: Props[] = [
  {
    prop: 'status',
    required: false,
    type: "'ready' | 'loading' | 'empty' | 'error'",
    default: "'ready'",
    description:
      'Which state to render. All four reserve the same frame height, so nothing shifts when data lands.',
  },
  {
    prop: 'onRetry',
    required: false,
    type: '() => void',
    description: 'Called by the retry button in the error state. Omit it and no button is shown.',
  },
  {
    prop: 'className',
    required: false,
    type: 'string',
    description: 'Merged onto the root element.',
  },
];

const HEIGHT: Props = {
  prop: 'height',
  required: false,
  type: 'number',
  description: 'Plot height in pixels. The header sits above it, so the card is taller than this.',
};

export const CHART_PROPS: Record<string, Props[]> = {
  'stat-cards': [
    {
      prop: 'cards',
      required: false,
      type: 'StatCardData[]',
      default: 'STAT_CARDS',
      description:
        'One entry per tile. Each takes a label, a series or value, and optionally previous, progress, format, goodWhen and deltaLabel.',
    },
    {
      prop: 'columns',
      required: false,
      type: '1 | 2 | 3 | 4',
      default: '2',
      description: 'Grid columns at the widest breakpoint. Always one column on mobile.',
    },
  ],
  market: [
    {
      prop: 'data',
      required: false,
      type: 'Candle[]',
      default: 'SOL_MARKET',
      description: 'OHLC series as { t, open, high, low, close, volume }, with t in epoch ms.',
    },
    { prop: 'symbol', required: false, type: 'string', default: "'SOL'", description: 'Ticker shown in the header.' },
    { prop: 'name', required: false, type: 'string', default: "'Solana'", description: 'Long name beside the ticker.' },
    {
      prop: 'variant',
      required: false,
      type: "'candles' | 'area'",
      default: "'candles'",
      description: 'Candles, or a baseline area shaded against the first close in view.',
    },
    { prop: 'showVolume', required: false, type: 'boolean', default: 'true', description: 'Volume pane under the price plot.' },
    { prop: 'hollowUp', required: false, type: 'boolean', default: 'false', description: 'Hollow bodies on up candles — the stock-desk look.' },
    {
      prop: 'ranges',
      required: false,
      type: 'MarketRange[]',
      default: 'MARKET_RANGES',
      description: 'Range selector options. Each is a label plus a bar count, or null for the whole series.',
    },
    { prop: 'defaultRange', required: false, type: 'string', default: "'3M'", description: 'Which range is selected on mount.' },
    { prop: 'showRangeSelector', required: false, type: 'boolean', default: 'true', description: 'Hide it for a compact card.' },
    { prop: 'live', required: false, type: 'boolean', default: 'false', description: 'Append simulated ticks and flash the header on each one.' },
    { prop: 'compactPrice', required: false, type: 'boolean', default: 'false', description: 'Abbreviate the headline price, for assets in the thousands.' },
    HEIGHT,
  ],
  indicators: [
    { prop: 'data', required: false, type: 'Candle[]', default: 'SOL_MARKET', description: 'OHLC series. RSI and MACD are computed from it.' },
    { prop: 'symbol', required: false, type: 'string', default: "'SOL'", description: 'Ticker shown in the header.' },
    { prop: 'name', required: false, type: 'string', default: "'Solana'", description: 'Long name beside the ticker.' },
    { prop: 'ranges', required: false, type: 'MarketRange[]', default: 'MARKET_RANGES', description: 'Range selector options.' },
    { prop: 'defaultRange', required: false, type: 'string', default: "'3M'", description: 'Which range is selected on mount.' },
    HEIGHT,
  ],
  depth: [
    { prop: 'book', required: false, type: 'OrderBook', default: 'SOL_BOOK', description: 'Mid, spread, and cumulative bid/ask levels.' },
    { prop: 'symbol', required: false, type: 'string', default: "'SOL'", description: 'Ticker shown in the header.' },
    { prop: 'name', required: false, type: 'string', default: "'Solana · USDC'", description: 'Pair label beside the ticker.' },
    HEIGHT,
  ],
  'order-book': [
    { prop: 'book', required: false, type: 'OrderBook', default: 'SOL_LADDER', description: 'Mid, spread, and the levels to ladder out.' },
    { prop: 'symbol', required: false, type: 'string', default: "'SOL'", description: 'Ticker shown in the header.' },
    { prop: 'live', required: false, type: 'boolean', default: 'false', description: 'Perturb resting size on an interval and flash the rows that moved.' },
  ],
  portfolio: [
    { prop: 'data', required: false, type: 'PortfolioPoint[]', default: 'PORTFOLIO', description: 'Series of { t, value, basis }, oldest first.' },
    { prop: 'label', required: false, type: 'string', default: "'Portfolio'", description: 'Header label.' },
    { prop: 'showDrawdown', required: false, type: 'boolean', default: 'true', description: 'The drawdown pane below the value plot.' },
    { prop: 'ranges', required: false, type: 'MarketRange[]', default: 'MARKET_RANGES', description: 'Range selector options.' },
    { prop: 'defaultRange', required: false, type: 'string', default: "'1Y'", description: 'Which range is selected on mount.' },
    HEIGHT,
  ],
  heatmap: [
    { prop: 'data', required: false, type: 'TreemapInput[]', default: 'CRYPTO_MAP', description: 'Each entry needs a label, a weight for area, and a change for colour.' },
    { prop: 'cap', required: false, type: 'number', default: '6', description: 'Percentage change that saturates the diverging ramp.' },
    { prop: 'title', required: false, type: 'string', description: 'Header title.' },
    { prop: 'subtitle', required: false, type: 'string', description: 'Line under the title.' },
    HEIGHT,
  ],
  calendar: [
    { prop: 'data', required: false, type: 'CalendarDay[]', default: 'CONTRIBUTIONS', description: 'One { t, value } per day, oldest first.' },
    { prop: 'cell', required: false, type: 'number', default: '13', description: 'Cell edge in pixels. Cells shrink below this to fit narrow containers.' },
    { prop: 'label', required: false, type: 'string', default: "'contributions'", description: 'Noun used in the total and the hover readout.' },
    { prop: 'hue', required: false, type: 'string', default: 'series-3', description: 'CSS colour for the intensity ramp.' },
  ],
  cohort: [
    { prop: 'data', required: false, type: 'Cohort[]', default: 'COHORTS', description: 'Each cohort needs a label, a size, and a retention array starting at 100.' },
    { prop: 'period', required: false, type: 'string', default: "'Month'", description: 'Column heading prefix — Month, Week or Day.' },
    { prop: 'label', required: false, type: 'string', description: 'Header title.' },
    { prop: 'hue', required: false, type: 'string', default: 'series-1', description: 'CSS colour for the intensity ramp.' },
  ],
  histogram: [
    { prop: 'data', required: false, type: 'number[]', default: 'LATENCY_MS', description: 'Raw samples. The chart bins them itself.' },
    { prop: 'label', required: false, type: 'string', default: "'API latency'", description: 'Header title.' },
    { prop: 'format', required: false, type: '(value: number) => string', description: 'Formats bin edges, percentile pins and the hover readout.' },
    { prop: 'percentiles', required: false, type: 'number[]', default: '[50, 95, 99]', description: 'Which percentiles to pin onto the plot.' },
    { prop: 'bins', required: false, type: 'number', default: '26', description: 'Target bin count. The real count lands on a nice step near it.' },
    HEIGHT,
  ],
};
