import * as React from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import type { ViewBox } from 'recharts/types/util/types';

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
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import type { MetricsMode } from '@/items/simulation/types';

export default function MetricsPanelStackedRadialChart({
  mode,
  activeSegment,
  priceChangePercent,
  className,
  ...props
}: MetricsPanelStackedRadialChartProps) {
  const { dataPoints } = usePriceSimulation();

  const translatedSegment = useFormatText({
    id: `${activeSegment}.text`,
  });

  const title = useFormatText({
    id:
      mode === 'revenue'
        ? 'simulation.metricsPanel.stackedChart.title.revenue'
        : 'simulation.metricsPanel.stackedChart.title.quantity',
    values: { segment: translatedSegment },
  });

  const description = useFormatText({
    id: 'simulation.metricsPanel.stackedChart.description',
    values: { priceChange: priceChangePercent },
  });

  const { chartData, deltaPercent } = React.useMemo(() => {
    const baselinePoint = dataPoints.find(
      (point) =>
        point.segmentId === activeSegment && point.priceChangePercent === 0
    );

    const simulatedPoint = dataPoints.find(
      (point) =>
        point.segmentId === activeSegment &&
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

    const delta =
      mode === 'revenue'
        ? (simulatedPoint?.deltaRevenuePercent ?? 0)
        : (simulatedPoint?.deltaQuantityPercent ?? 0);

    return {
      chartData: [{ baseline: baselineValue, simulated: simulatedValue }],
      deltaPercent: delta,
    };
  }, [dataPoints, activeSegment, priceChangePercent, mode]);

  const totalValue = chartData[0].simulated;

  return (
    <Card data-chart={CHART_ID} className={className} {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => (
                  <RadialChartLabel
                    viewBox={viewBox}
                    value={totalValue}
                    deltaPercent={deltaPercent}
                    mode={mode}
                  />
                )}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="baseline"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-baseline)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="simulated"
              fill="var(--color-simulated)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type PolarViewBox = {
  cx: number;
  cy: number;
};

function isPolarViewBox(viewBox: ViewBox | undefined): viewBox is PolarViewBox {
  return viewBox !== undefined && 'cx' in viewBox && 'cy' in viewBox;
}

type RadialChartLabelProps = {
  viewBox: ViewBox | undefined;
  value: number;
  deltaPercent: number;
  mode: MetricsMode;
};

function RadialChartLabel({
  viewBox,
  value,
  deltaPercent,
  mode,
}: RadialChartLabelProps) {
  const isPositive = deltaPercent >= 0;
  const modeLabel = useFormatText({
    id:
      mode === 'revenue'
        ? 'simulation.metricsPanel.pieChart.label.revenue'
        : 'simulation.metricsPanel.pieChart.label.quantity',
  });

  if (!isPolarViewBox(viewBox)) {
    return null;
  }

  const { cx, cy } = viewBox;

  return (
    <text x={cx} y={cy} textAnchor="middle">
      <tspan
        x={cx}
        y={cy - 16}
        className="fill-foreground font-mono text-2xl font-bold"
      >
        {value.toLocaleString()}
      </tspan>
      <tspan
        x={cx}
        y={cy + 4}
        className={`font-mono text-sm ${isPositive ? 'fill-primary' : 'fill-destructive'}`}
      >
        {isPositive ? '+' : ''}
        {deltaPercent}% {modeLabel}
      </tspan>
    </text>
  );
}

const CHART_ID = 'metrics-radial-stacked';

type MetricsPanelStackedRadialChartProps =
  React.ComponentPropsWithoutRef<'div'> & {
    mode: MetricsMode;
    activeSegment: RFMSegmentIds;
    priceChangePercent: number;
  };

const chartConfig: ChartConfig = {
  baseline: {
    label: 'Baseline (0%)',
    color: 'var(--chart-2)',
  },
  simulated: {
    label: 'Simulated',
    color: 'var(--chart-1)',
  },
};
