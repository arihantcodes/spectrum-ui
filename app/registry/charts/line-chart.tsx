'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  AnimatedDashedStroke,
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
  strokeDasharray,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from './chart-kit';

export type LineCurve = 'monotone' | 'bump' | 'step' | 'linear';

export interface SpectrumLineChartProps {
  className?: string;
  data?: typeof MONTHLY_TRAFFIC;
  curveType?: LineCurve;
  strokeVariant?: StrokeVariant;
  desktopStroke?: StrokeVariant;
  mobileStroke?: StrokeVariant;
  glowing?: boolean;
  gradientStroke?: boolean;
  isLoading?: boolean;
  showLegend?: boolean;
  showDots?: boolean;
}

export function LineChart({
  className,
  data = MONTHLY_TRAFFIC,
  curveType = 'monotone',
  strokeVariant = 'solid',
  desktopStroke,
  mobileStroke,
  glowing = false,
  gradientStroke = false,
  isLoading = false,
  showLegend = true,
  showDots = true,
}: SpectrumLineChartProps) {
  const id = useChartId('line');
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const glowId = `${id}-glow`;
  const maskId = `${id}-reveal`;
  const desktopKind = desktopStroke ?? strokeVariant;
  const mobileKind = mobileStroke ?? strokeVariant;
  const desktopColor = gradientStroke ? `url(#${id}-desktop-stroke)` : SERIES.desktop.color;
  const mobileColor = gradientStroke ? `url(#${id}-mobile-stroke)` : SERIES.mobile.color;
  const maskStyle = reduce ? undefined : { mask: `url(#${maskId})` };

  return (
    <ChartFrame className={cn('flex flex-col', className)}>
      {showLegend ? <ChartLegend /> : null}
      {isLoading ? (
        <ChartLoadingBars />
      ) : (
        <ChartPlotSurface>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                {gradientStroke ? (
                  <>
                    <linearGradient id={`${id}-desktop-stroke`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={SERIES.desktop.color} />
                      <stop offset="100%" stopColor={SERIES.mobile.color} />
                    </linearGradient>
                    <linearGradient id={`${id}-mobile-stroke`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={SERIES.mobile.color} />
                      <stop offset="100%" stopColor={SERIES.desktop.color} />
                    </linearGradient>
                  </>
                ) : null}
                {glowing ? <ChartGlowFilter id={glowId} /> : null}
                <RevealMask id={maskId} introStartedAt={introStartedAt} reduce={reduce} />
              </defs>
              <CartesianGrid {...chartGrid} />
              <XAxis {...chartXAxis} dataKey="month" />
              <YAxis {...chartYAxis} />
              <Tooltip
                cursor={{ stroke: 'currentColor', strokeOpacity: 0.22, strokeDasharray: '4 4' }}
                content={<ChartTooltipContent />}
              />
              <Line
                type={curveType}
                dataKey="desktop"
                name={SERIES.desktop.label}
                stroke={desktopColor}
                strokeWidth={2.25}
                strokeDasharray={strokeDasharray(desktopKind)}
                dot={
                  showDots
                    ? (props: ChartDotRenderProps) => (
                        <ChartRestingDot
                          key={`dot-${props.index}`}
                          cx={props.cx}
                          cy={props.cy}
                          color={SERIES.desktop.color}
                          maskId={reduce ? undefined : maskId}
                        />
                      )
                    : false
                }
                activeDot={(props: ChartDotRenderProps) => (
                  <ChartActiveDot key={`active-${props.index}`} cx={props.cx} cy={props.cy} color={SERIES.desktop.color} />
                )}
                isAnimationActive={false}
                filter={glowing ? `url(#${glowId})` : undefined}
                style={maskStyle}
              >
                {desktopKind === 'animated-dashed' ? <AnimatedDashedStroke /> : null}
              </Line>
              <Line
                type={curveType}
                dataKey="mobile"
                name={SERIES.mobile.label}
                stroke={mobileColor}
                strokeWidth={2.25}
                strokeDasharray={strokeDasharray(mobileKind)}
                dot={
                  showDots
                    ? (props: ChartDotRenderProps) => (
                        <ChartRestingDot
                          key={`dot-${props.index}`}
                          cx={props.cx}
                          cy={props.cy}
                          color={SERIES.mobile.color}
                          maskId={reduce ? undefined : maskId}
                        />
                      )
                    : false
                }
                activeDot={(props: ChartDotRenderProps) => (
                  <ChartActiveDot key={`active-${props.index}`} cx={props.cx} cy={props.cy} color={SERIES.mobile.color} />
                )}
                isAnimationActive={false}
                style={maskStyle}
              >
                {mobileKind === 'animated-dashed' ? <AnimatedDashedStroke /> : null}
              </Line>
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartPlotSurface>
      )}
    </ChartFrame>
  );
}

export function DefaultLineChart(props: SpectrumLineChartProps) {
  return <LineChart {...props} />;
}

export function DashedLineChart(props: SpectrumLineChartProps) {
  return <LineChart strokeVariant="animated-dashed" {...props} />;
}

export function BumpLineChart(props: SpectrumLineChartProps) {
  return <LineChart curveType="bump" {...props} />;
}

export function StepLineChart(props: SpectrumLineChartProps) {
  return <LineChart curveType="step" {...props} />;
}

export function GlowingLineChart(props: SpectrumLineChartProps) {
  return <LineChart glowing {...props} />;
}

export function GradientLineChart(props: SpectrumLineChartProps) {
  return <LineChart gradientStroke {...props} />;
}
