import { useFormatText } from '@/common/hooks/useFormatText';
import { Card, CardContent } from '@/common/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/common/ui/chart';
import SegmentCardHeader from '@/items/rfm-customer/components/SegmentAreaChart/SegmentCardHeader';
import {
  getColorBySegmentId,
  rfmSegmentAreaChartConfig,
} from '@/items/rfm-customer/config/areaChartConfig';
import areaChartSegmentsData from '@/items/rfm-customer/model/areaChartSegmentsData';
import {
  filterByDate,
  FilterDayId,
} from '@/items/rfm-customer/types/FilterDayId';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

export const description =
  'Interactive RFM customer segment area chart with time range filtering';

/**
 * RFMAreaChart - Displays customer segment trends over time
 *
 * Features:
 * - Stacked area chart showing all RFM segments
 * - Time range filter (7/30/90 days)
 * - Interactive tooltip and legend
 * - Gradient fills for visual distinction
 */
export default function RFMAreaChart() {
  const [timeRange, setTimeRange] = useState<FilterDayId>(
    FilterDayId.THREE_MONTHS
  );

  // Filter chart data based on selected time range
  const filteredData = useMemo(
    () => filterByDate(areaChartSegmentsData, timeRange),
    [timeRange]
  );
  const getSegmentText = (segmentId: RFMSegmentIds): string =>
    useFormatText({ id: `${segmentId}.text` });
  const getRFMSegmentLabels = (): Record<RFMSegmentIds, string> => ({
    [RFMSegmentIds.Champion]: getSegmentText(RFMSegmentIds.Champion),
    [RFMSegmentIds.LoyalCustomers]: getSegmentText(
      RFMSegmentIds.LoyalCustomers
    ),
    [RFMSegmentIds.PotentialLoyalists]: getSegmentText(
      RFMSegmentIds.PotentialLoyalists
    ),
    [RFMSegmentIds.AtRisk]: getSegmentText(RFMSegmentIds.AtRisk),
    [RFMSegmentIds.Hibernating]: getSegmentText(RFMSegmentIds.Hibernating),
    [RFMSegmentIds.Lost]: getSegmentText(RFMSegmentIds.Lost),
  });
  return (
    <Card className="pt-0 w-full">
      <SegmentCardHeader timeRange={timeRange} setTimeRange={setTimeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 font-mono">
        <ChartContainer
          config={rfmSegmentAreaChartConfig(getRFMSegmentLabels())}
          className="aspect-auto h-80 w-full"
        >
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey={RFMSegmentIds.Champion}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.Champion)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.Champion)}
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey={RFMSegmentIds.LoyalCustomers}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.LoyalCustomers)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.LoyalCustomers)}
              strokeWidth={2}
              stackId="b"
            />
            <Area
              dataKey={RFMSegmentIds.PotentialLoyalists}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.PotentialLoyalists)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.PotentialLoyalists)}
              strokeWidth={2}
              stackId="c"
            />
            <Area
              dataKey={RFMSegmentIds.AtRisk}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.AtRisk)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.AtRisk)}
              strokeWidth={2}
              stackId="d"
            />
            <Area
              dataKey={RFMSegmentIds.Hibernating}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.Hibernating)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.Hibernating)}
              strokeWidth={2}
              stackId="e"
            />
            <Area
              dataKey={RFMSegmentIds.Lost}
              type="monotone"
              fill={getColorBySegmentId(RFMSegmentIds.Lost)}
              fillOpacity={0.6}
              stroke={getColorBySegmentId(RFMSegmentIds.Lost)}
              strokeWidth={2}
              stackId="f"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
