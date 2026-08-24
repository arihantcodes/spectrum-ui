'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type ChartStatus,
  ChartDataTable,
  ChartState,
  Stat,
  Keyframes,
  formatCount,
  formatPct,
  intensityColor,
  mulberry32,
  onFillClass,
  seriesVarsClassName,
  useElementWidth,
  usePrefersReducedMotion,
} from './chart-engine';

export type Cohort = {
  label: string;
  size: number;
  retention: number[];
};

const MONTHS = [
  'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026',
  'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026',
];

function generateCohorts(seed: number, periods = 12): Cohort[] {
  const rand = mulberry32(seed);
  return MONTHS.map((label, index) => {
    const observed = periods - index;
    const size = Math.round(420 + rand() * 900 + index * 70);
    const retention: number[] = [100];
    const quality = 1 + index * 0.012;
    let value = 100;
    for (let p = 1; p < observed; p += 1) {
      const decay = p === 1 ? 0.52 + rand() * 0.12 : 0.9 + rand() * 0.07;
      value = Math.max(2, value * Math.min(0.995, decay * quality));
      retention.push(Math.round(value * 10) / 10);
    }
    return { label, size, retention };
  });
}

export const COHORTS = generateCohorts(90_210);

export interface CohortChartProps {
  className?: string;
  data?: Cohort[];
  period?: string;
  label?: string;
  hue?: string;
  status?: ChartStatus;
  onRetry?: () => void;
}

export function CohortChart({
  className,
  data = COHORTS,
  period = 'Month',
  label = 'Signup cohort retention',
  hue = 'var(--spectrum-series-1)',
  status = 'ready',
  onRetry,
}: CohortChartProps) {
  const reduce = usePrefersReducedMotion();
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const [hovered, setHovered] = React.useState<{ row: number; col: number } | null>(null);

  const periods = React.useMemo(
    () => Math.max(1, ...data.map((c) => c.retention.length)),
    [data],
  );

  const averages = React.useMemo(() => {
    const out: (number | null)[] = [];
    for (let p = 0; p < periods; p += 1) {
      const seen = data.map((c) => c.retention[p]).filter((v): v is number => v != null);
      out.push(seen.length ? seen.reduce((a, b) => a + b, 0) / seen.length : null);
    }
    return out;
  }, [data, periods]);

  const LABEL_W = 92;
  const SIZE_W = 54;
  const HEAD_H = 26;
  const ROW_H = 30;
  const GAP = 2;

  const available = Math.max(160, width - LABEL_W - SIZE_W);
  const colW = Math.max(34, Math.floor(available / periods));
  const w = LABEL_W + SIZE_W + periods * colW;
  const h = HEAD_H + (data.length + 1) * ROW_H + 8;

  const ready = width > 0;
  const totalUsers = data.reduce((sum, c) => sum + c.size, 0);

  const cellX = (col: number) => LABEL_W + SIZE_W + col * colW;

  return (
    <div
      ref={wrapRef}
      className={cn('flex w-full flex-col text-neutral-400 dark:text-neutral-500', seriesVarsClassName, className)}
    >
      <Keyframes />

      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <p className="font-mono text-[12px] font-medium tracking-wide text-neutral-950 dark:text-white">
            {label}
          </p>
          <p className="mt-0.5 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
            <Stat ready={status === 'ready'}>
              {data.length} cohorts · {formatCount(totalUsers)} users
            </Stat>
          </p>
        </div>
        <p className="font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
          <Stat ready={status === 'ready'}>
            {period} 1 avg{' '}
            <span className="font-medium text-neutral-950 dark:text-white">
              {averages[1] == null ? '—' : formatPct(averages[1])}
            </span>
          </Stat>
        </p>
      </div>

      <ChartState
        status={status}
        height={h}
        variant="grid"
        empty={{ title: 'No cohorts yet', description: 'Cohorts appear once the first signups complete a period.' }}
        onRetry={onRetry}
      >
      <div className="relative w-full overflow-x-auto">
        {!ready ? null : (
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            className="block select-none"
            role="img"
            aria-label={`${label}. ${data.length} cohorts over ${periods} periods. ${period} 1 average ${averages[1] == null ? 'unavailable' : formatPct(averages[1])}.`}
            onPointerLeave={() => setHovered(null)}
          >
            <g className="font-mono uppercase tracking-wider" fontSize={9} fill="currentColor">
              <text x={0} y={HEAD_H - 10}>Cohort</text>
              <text x={LABEL_W} y={HEAD_H - 10}>Users</text>
              {Array.from({ length: periods }, (_, col) => (
                <text
                  key={col}
                  x={cellX(col) + colW / 2}
                  y={HEAD_H - 10}
                  textAnchor="middle"
                  opacity={hovered && hovered.col === col ? 1 : 0.7}
                >
                  {col}
                </text>
              ))}
            </g>

            {data.map((cohort, row) => {
              const y = HEAD_H + row * ROW_H;
              const rowActive = hovered?.row === row;
              return (
                <g key={cohort.label}>
                  <text
                    x={0}
                    y={y + ROW_H / 2}
                    dominantBaseline="middle"
                    fontSize={11}
                    className={cn(
                      'font-mono tabular-nums',
                      rowActive
                        ? 'fill-neutral-950 dark:fill-white'
                        : 'fill-neutral-500 dark:fill-neutral-400',
                    )}
                  >
                    {cohort.label}
                  </text>
                  <text
                    x={LABEL_W}
                    y={y + ROW_H / 2}
                    dominantBaseline="middle"
                    fontSize={11}
                    className="fill-neutral-400 font-mono tabular-nums dark:fill-neutral-500"
                  >
                    {formatCount(cohort.size)}
                  </text>

                  {cohort.retention.map((value, col) => {
                    const intensity = value / 100;
                    const active = hovered?.row === row && hovered?.col === col;
                    const inCross = hovered != null && (hovered.row === row || hovered.col === col);
                    return (
                      <g
                        key={col}
                        onPointerEnter={() => setHovered({ row, col })}
                        style={{
                          animation: reduce
                            ? undefined
                            : `spectrum-mc-fade 300ms ease-out ${Math.min(col * 22 + row * 12, 520)}ms both`,
                        }}
                      >
                        <rect
                          x={cellX(col) + GAP / 2}
                          y={y + GAP / 2}
                          width={colW - GAP}
                          height={ROW_H - GAP}
                          rx={4}
                          fill={intensityColor(intensity, hue)}
                          stroke={active ? 'currentColor' : 'transparent'}
                          strokeWidth={1.5}
                          className="text-neutral-900 dark:text-white"
                          style={{
                            opacity: hovered && !inCross ? 0.4 : 1,
                            transition: reduce ? undefined : 'opacity 140ms ease-out',
                          }}
                        />
                        <text
                          x={cellX(col) + colW / 2}
                          y={y + ROW_H / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={10}
                          fontWeight={500}
                          className={cn('pointer-events-none font-mono tabular-nums', onFillClass(intensity))}
                          style={{
                            opacity: hovered && !inCross ? 0.45 : 1,
                            transition: reduce ? undefined : 'opacity 140ms ease-out',
                          }}
                        >
                          {colW >= 40 ? value.toFixed(0) : ''}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            <g>
              <line
                x1={0}
                x2={w}
                y1={HEAD_H + data.length * ROW_H + 2}
                y2={HEAD_H + data.length * ROW_H + 2}
                stroke="currentColor"
                strokeOpacity={0.16}
                shapeRendering="crispEdges"
              />
              <text
                x={0}
                y={HEAD_H + data.length * ROW_H + ROW_H / 2 + 4}
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                className="fill-neutral-950 font-mono dark:fill-white"
              >
                Average
              </text>
              {averages.map((value, col) =>
                value == null ? null : (
                  <text
                    key={col}
                    x={cellX(col) + colW / 2}
                    y={HEAD_H + data.length * ROW_H + ROW_H / 2 + 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={600}
                    className="fill-neutral-700 font-mono tabular-nums dark:fill-neutral-200"
                    opacity={hovered && hovered.col !== col ? 0.45 : 1}
                  >
                    {colW >= 40 ? value.toFixed(0) : ''}
                  </text>
                ),
              )}
            </g>
          </svg>
        )}
      </div>
      </ChartState>

      <ChartDataTable
        caption={`${label} — retention by cohort and ${period.toLowerCase()}`}
        columns={['Cohort', 'Users', ...Array.from({ length: periods }, (_, i) => `${period} ${i}`)]}
        rows={data.map((c) => [
          c.label,
          c.size,
          ...Array.from({ length: periods }, (_, i) =>
            c.retention[i] == null ? '—' : formatPct(c.retention[i]),
          ),
        ])}
      />
      <p
        className="mt-2 h-4 font-mono text-[11px] tabular-nums text-neutral-600 transition-opacity duration-150 dark:text-neutral-300"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-live="polite"
      >
        {hovered && data[hovered.row]?.retention[hovered.col] != null
          ? `${data[hovered.row].label} · ${period} ${hovered.col} · ${formatPct(
              data[hovered.row].retention[hovered.col],
            )} of ${formatCount(data[hovered.row].size)} retained`
          : ' '}
      </p>
    </div>
  );
}

export function DefaultCohortChart(props: CohortChartProps) {
  return <CohortChart {...props} />;
}

export function WeeklyCohortChart(props: CohortChartProps) {
  return (
    <CohortChart
      data={generateCohorts(31_337)}
      period="Week"
      label="Weekly activation cohorts"
      hue="var(--spectrum-series-3)"
      {...props}
    />
  );
}
