import * as React from 'react';
import { useIntl } from 'react-intl';
import { Label, Pie, PieChart, Sector } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/common/ui/chart';
import { getColorBySegmentId } from '@/items/rfm-customer/config/areaChartConfig';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { RFMSegmentIds as RFMSegmentIdsEnum } from '@/items/rfm-elasticity/types/RFMSegmentId';
import MetricsPanelPieChartLabel from '@/items/simulation/components/MetricsPanelPieChartLabel';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import type { MetricsMode } from '@/items/simulation/types';
import type { PieChartDataItem } from './MetricsPanelPieChartLabel';

function useBuildChartConfig(segments: RFMSegmentIdsEnum[]): ChartConfig {
  const intl = useIntl();

  return React.useMemo(
    () =>
      segments.reduce<ChartConfig>(
        (config, segmentId) => ({
          ...config,
          [segmentId]: {
            label: intl.formatMessage({ id: `${segmentId}.text` }),
            color: getColorBySegmentId(segmentId),
          },
        }),
        {}
      ),
    [segments, intl]
  );
}

export default function MetricsPanelInteractivePieChart({
  mode,
  activeSegment,
  priceChangePercent,
  className,
  ...props
}: MetricsPanelInteractivePieChartProps) {
  const { dataPoints } = usePriceSimulation();
  const translatedActiveSegment = useFormatText({
    id: `${activeSegment}.text`,
  });
  const title = useFormatText({
    id:
      mode === 'revenue'
        ? 'simulation.metricsPanel.interactiveChart.title.revenue'
        : 'simulation.metricsPanel.interactiveChart.title.quantity',
    values: { segment: translatedActiveSegment },
  });

  const description = useFormatText({
    id: 'simulation.metricsPanel.interactiveChart.description',
    values: { priceChange: priceChangePercent },
  });

  const chartData = React.useMemo<PieChartDataItem[]>(() => {
    const segments = Object.values(RFMSegmentIdsEnum);

    return segments.map((segmentId) => {
      const segmentDataPoints = dataPoints.filter(
        (point) =>
          point.segmentId === segmentId && point.priceChangePercent === 0
      );

      const value =
        segmentDataPoints.length > 0
          ? mode === 'revenue'
            ? segmentDataPoints[0].revenue
            : segmentDataPoints[0].quantity
          : 0;

      return {
        segmentId,
        value,
        fill: getColorBySegmentId(segmentId),
      };
    });
  }, [dataPoints, mode]);

  const chartConfig = useBuildChartConfig(Object.values(RFMSegmentIdsEnum));

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.segmentId === activeSegment),
    [chartData, activeSegment]
  );

  const activeValue = chartData[activeIndex]?.value ?? 0;

  return (
    <Card data-chart={CHART_ID} className={className} {...props}>
      <ChartStyle id={CHART_ID} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={CHART_ID}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="segmentId"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...sectorProps
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...sectorProps} outerRadius={outerRadius + 10} />
                  <Sector
                    {...sectorProps}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => (
                  <MetricsPanelPieChartLabel
                    viewBox={viewBox}
                    value={activeValue}
                    mode={mode}
                  />
                )}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CHART_ID = 'metrics-pie-interactive';

type MetricsPanelInteractivePieChartProps = {
  mode: MetricsMode;
  activeSegment: RFMSegmentIds;
  priceChangePercent: number;
} & React.ComponentPropsWithoutRef<'div'>;
