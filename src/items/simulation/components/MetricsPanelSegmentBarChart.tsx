import * as React from 'react';
import { useIntl } from 'react-intl';
import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from 'recharts';

import { useFormatText } from '@/common/hooks/useFormatText';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/common/ui/chart';
import { getColorBySegmentId } from '@/items/rfm-customer/config/areaChartConfig';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { RFMSegmentIds as RFMSegmentIdsEnum } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import type { MetricsMode } from '@/items/simulation/types';

export default function MetricsPanelSegmentBarChart({
  mode,
  activeSegment,
  priceChangePercent,
  className,
  ...props
}: MetricsPanelSegmentBarChartProps) {
  const { dataPoints } = usePriceSimulation();
  const intl = useIntl();

  const title = useFormatText({
    id:
      mode === 'revenue'
        ? 'simulation.metricsPanel.barChart.title.revenue'
        : 'simulation.metricsPanel.barChart.title.quantity',
    values: { priceChange: priceChangePercent },
  });

  const description = useFormatText({
    id: 'simulation.metricsPanel.barChart.description',
    values: { priceChange: priceChangePercent },
  });

  const tooltipBaseline = useFormatText({
    id: 'simulation.metricsPanel.tooltip.baseline',
  });

  const tooltipSimulated = useFormatText({
    id: 'simulation.metricsPanel.tooltip.simulated',
  });

  const tooltipChange = useFormatText({
    id: 'simulation.metricsPanel.tooltip.change',
  });

  const chartData = React.useMemo<SegmentBarDataItem[]>(() => {
    const segments = Object.values(RFMSegmentIdsEnum);

    const data = segments.map((segmentId) => {
      const baselinePoint = dataPoints.find(
        (point) =>
          point.segmentId === segmentId && point.priceChangePercent === 0
      );

      const simulatedPoint = dataPoints.find(
        (point) =>
          point.segmentId === segmentId &&
          point.priceChangePercent === priceChangePercent
      );

      const baselineValue =
        mode === 'revenue'
          ? (baselinePoint?.revenue ?? 0)
          : (baselinePoint?.quantity ?? 0);

      const simulatedValue =
        mode === 'revenue'
          ? (simulatedPoint?.revenue ?? 0)
          : (simulatedPoint?.quantity ?? 0);

      const deltaPercent =
        mode === 'revenue'
          ? (simulatedPoint?.deltaRevenuePercent ?? 0)
          : (simulatedPoint?.deltaQuantityPercent ?? 0);

      return {
        segmentId,
        segmentLabel: intl.formatMessage({ id: `${segmentId}.text` }),
        baselineValue,
        simulatedValue,
        deltaPercent,
        fill: getColorBySegmentId(segmentId),
        isActive: segmentId === activeSegment,
      };
    });

    // Sort by absolute delta (strongest reaction first)
    return data.sort(
      (a, b) => Math.abs(b.deltaPercent) - Math.abs(a.deltaPercent)
    );
  }, [dataPoints, mode, priceChangePercent, activeSegment, intl]);

  return (
    <Card data-chart={CHART_ID} className={className} {...props}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-full w-full min-h-48">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 24, top: 8, bottom: 8 }}
          >
            <YAxis
              dataKey="segmentLabel"
              type="category"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className={`fill-muted-foreground font-mono text-xs ${
                    chartData.find((d) => d.segmentLabel === payload.value)
                      ?.isActive
                      ? 'fill-foreground font-semibold'
                      : ''
                  }`}
                >
                  {payload.value}
                </text>
              )}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
              tick={{ className: 'fill-muted-foreground font-mono text-xs' }}
            />
            <ReferenceLine x={0} stroke="var(--border)" strokeWidth={1} />
            <ChartTooltip
              cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  formatter={(_value, _name, item) => {
                    const dataItem = item.payload as SegmentBarDataItem;
                    const isPositive = dataItem.deltaPercent >= 0;
                    return (
                      <div className="flex flex-col gap-1.5 font-mono text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            {tooltipBaseline}:
                          </span>
                          <span>{dataItem.baselineValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            {tooltipSimulated}:
                          </span>
                          <span>
                            {dataItem.simulatedValue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 border-t border-border pt-1.5">
                          <span className="text-muted-foreground">
                            {tooltipChange}:
                          </span>
                          <span
                            className={`font-semibold ${
                              isPositive ? 'text-primary' : 'text-destructive'
                            }`}
                          >
                            {isPositive ? '+' : ''}
                            {dataItem.deltaPercent}%
                          </span>
                        </div>
                      </div>
                    );
                  }}
                  labelFormatter={(label) => label}
                />
              }
            />
            <Bar dataKey="deltaPercent" radius={4}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.segmentId}
                  fill={
                    entry.deltaPercent >= 0
                      ? 'var(--primary)'
                      : 'var(--destructive)'
                  }
                  fillOpacity={entry.isActive ? 1 : 0.6}
                  stroke={entry.isActive ? 'var(--foreground)' : 'transparent'}
                  strokeWidth={entry.isActive ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CHART_ID = 'metrics-segment-bar';

type MetricsPanelSegmentBarChartProps = {
  mode: MetricsMode;
  activeSegment: RFMSegmentIds;
  priceChangePercent: number;
} & React.ComponentPropsWithoutRef<'div'>;

type SegmentBarDataItem = {
  segmentId: RFMSegmentIds;
  segmentLabel: string;
  baselineValue: number;
  simulatedValue: number;
  deltaPercent: number;
  fill: string;
  isActive: boolean;
};

const chartConfig: ChartConfig = {
  deltaPercent: {
    label: 'Change',
  },
};
