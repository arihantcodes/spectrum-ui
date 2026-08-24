'use client';

import * as React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart as RechartsComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  AreaFillDefs,
  AnimatedDashedStroke,
  BarFillDefs,
  type BarFillVariant,
  ChartActiveDot,
  ChartFrame,
  ChartGlowFilter,
  chartGrid,
  ChartLegend,
  ChartLoadingBars,
  ChartPlotSurface,
  ChartRestingDot,
  ChartTooltipContent,
  chartXAxis,
  chartYAxis,
  type ChartDotRenderProps,
  MONTHLY_TRAFFIC,
  RevealMask,
  SERIES,
  type StrokeVariant,
  areaFillUrl,
  barFillUrl,
  createGrowBarShape,
  HoverIndexProvider,
  readActiveTooltipIndex,
  strokeDasharray,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from './chart-kit';

const BAR_RADIUS = [4, 4, 0, 0] as [number, number, number, number];

export interface SpectrumComposedChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  barVariant?: BarFillVariant;
  lineStroke?: StrokeVariant;
  lineCurve?: 'monotone' | 'bump' | 'step';
  glowing?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
}

export function ComposedChart({
  className,
  data = MONTHLY_TRAFFIC,
  barVariant = 'default',
  lineStroke = 'solid',
  lineCurve = 'monotone',
  glowing = false,
  isLoading = false,
  showLegend = true,
}: SpectrumComposedChartProps) {
  const id = useChartId('composed');
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const glowId = `${id}-glow`;
  const maskId = `${id}-reveal`;
  const maskStyle = reduce ? undefined : { mask: `url(#${maskId})` };

  const barShape = React.useMemo(
    () =>
      createGrowBarShape({
        introStartedAt,
        dataLength: data.length,
        reduce,
        radius: BAR_RADIUS,
        stripped: barVariant === 'stripped',
        glowId: glowing ? glowId : undefined,
      }),
    [introStartedAt, data.length, reduce, barVariant, glowing, glowId],
  );

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <ChartPlotSurface>
          <HoverIndexProvider value={activeIndex}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              onMouseMove={(state) => {
                const next = readActiveTooltipIndex(state);
                setActiveIndex((current) => (current === next ? current : next));
              }}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <defs>
                <BarFillDefs id={`${id}-bar`} color={SERIES.desktop.color} variant={barVariant} />
                <AreaFillDefs id={`${id}-area`} color={SERIES.mobile.color} variant="gradient" />
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
                <RevealMask id={maskId} introStartedAt={introStartedAt} reduce={reduce} />
              </defs>
              <CartesianGrid {...chartGrid} />
              <XAxis {...chartXAxis} dataKey="month" />
              <YAxis {...chartYAxis} />
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.05 }}
                content={<ChartTooltipContent />}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={SERIES.mobile.color}
                strokeWidth={1.5}
                fill={areaFillUrl(`${id}-area`, 'gradient', SERIES.mobile.color)}
                isAnimationActive={false}
                legendType="none"
                tooltipType="none"
                style={maskStyle}
              />
              <Bar
                dataKey="desktop"
                name={SERIES.desktop.label}
                fill={barFillUrl(`${id}-bar`, barVariant, SERIES.desktop.color)}
                radius={BAR_RADIUS}
                maxBarSize={28}
                isAnimationActive={false}
                shape={barShape}
              />
              <Line
                type={lineCurve}
                dataKey="mobile"
                name={`${SERIES.mobile.label} trend`}
                stroke={SERIES.mobile.color}
                strokeWidth={2.25}
                strokeDasharray={strokeDasharray(lineStroke)}
                dot={(props: ChartDotRenderProps) => (
                  <ChartRestingDot
                    key={`dot-${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    color={SERIES.mobile.color}
                    maskId={reduce ? undefined : maskId}
                  />
                )}
                activeDot={(props: ChartDotRenderProps) => (
                  <ChartActiveDot key={`active-${props.index}`} cx={props.cx} cy={props.cy} color={SERIES.mobile.color} />
                )}
                isAnimationActive={false}
                legendType="none"
                style={maskStyle}
              >
                {lineStroke === 'animated-dashed' ? <AnimatedDashedStroke /> : null}
              </Line>
            </RechartsComposedChart>
          </ResponsiveContainer>
          </HoverIndexProvider>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart {...props} />;
}

export function HatchedComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart barVariant="hatched" {...props} />;
}

export function DuotoneComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart barVariant="duotone" {...props} />;
}

export function DashedComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart lineStroke="animated-dashed" {...props} />;
}

export function GlowingComposedChart(props: SpectrumComposedChartProps) {
  return <ComposedChart glowing {...props} />;
}
