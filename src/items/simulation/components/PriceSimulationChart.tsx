import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import type { ChartConfig } from '@/common/ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/common/ui/chart';
import { getColorBySegmentId } from '@/items/rfm-customer/config/areaChartConfig';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { PriceSimulationDataPoint } from '@/items/simulation/types/PriceSimulationData';
import { useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

export default function PriceSimulationChart({
  dataPoints,
  activeSegment,
  onActiveSegmentChange,
}: PriceSimulationChartProps) {
  const quantityLabel = useFormatText({
    id: 'simulation.priceImpact.yAxis.quantity',
  });
  const revenueLabel = useFormatText({
    id: 'simulation.priceImpact.yAxis.revenue',
  });
  const priceChangeLabel = useFormatText({
    id: 'simulation.priceImpact.xAxis.priceChange',
  });

  // Get segment-specific text labels
  const championLabel = useFormatText({ id: 'rfm.segment.champion.text' });
  const loyalLabel = useFormatText({ id: 'rfm.segment.loyal.text' });
  const potentialLabel = useFormatText({ id: 'rfm.segment.potential.text' });
  const atRiskLabel = useFormatText({ id: 'rfm.segment.at-risk.text' });
  const hibernatingLabel = useFormatText({
    id: 'rfm.segment.hibernating.text',
  });
  const lostLabel = useFormatText({ id: 'rfm.segment.lost.text' });

  const titleLabel = useFormatText({ id: 'simulation.priceImpact.title' });
  const descriptionLabel = useFormatText({
    id: 'simulation.priceImpact.description',
  });

  const segmentLabels: Record<RFMSegmentIds, string> = {
    [RFMSegmentIds.Champion]: championLabel,
    [RFMSegmentIds.LoyalCustomers]: loyalLabel,
    [RFMSegmentIds.PotentialLoyalists]: potentialLabel,
    [RFMSegmentIds.AtRisk]: atRiskLabel,
    [RFMSegmentIds.Hibernating]: hibernatingLabel,
    [RFMSegmentIds.Lost]: lostLabel,
  };

  const chartConfig: ChartConfig = {
    quantity: {
      label: quantityLabel,
      color: 'var(--chart-1)',
    },
    revenue: {
      label: revenueLabel,
      color: 'var(--chart-2)',
    },
  };

  // Filter data for active segment and transform for chart
  // useMemo for performance optimization when API data arrives
  const chartData = useMemo(
    () =>
      dataPoints
        .filter((point) => point.segmentId === activeSegment)
        .map((point) => ({
          priceChange: point.priceChangePercent,
          quantity: point.quantity,
          revenue: point.revenue,
          deltaQuantity: point.deltaQuantityPercent,
          deltaRevenue: point.deltaRevenuePercent,
        })),
    [dataPoints, activeSegment]
  );

  // Calculate totals for segment cards
  // Use closest to 0 or first datapoint as baseline for resilience
  const segmentTotals = useMemo(
    () =>
      Object.values(RFMSegmentIds).map((segmentId) => {
        const segmentPoints = dataPoints.filter(
          (p) => p.segmentId === segmentId
        );

        // Find baseline (0% price change) or fallback to closest to 0
        const baselineData =
          segmentPoints.find((p) => p.priceChangePercent === 0) ||
          segmentPoints.reduce((closest, point) => {
            return Math.abs(point.priceChangePercent) <
              Math.abs(closest.priceChangePercent)
              ? point
              : closest;
          }, segmentPoints[0]);

        return {
          segmentId,
          quantity: baselineData?.quantity || 0,
          revenue: baselineData?.revenue || 0,
        };
      }),
    [dataPoints]
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>{titleLabel}</CardTitle>
          <CardDescription>{descriptionLabel}</CardDescription>
        </div>
        <div className="flex flex-wrap">
          {segmentTotals.map(({ segmentId, quantity, revenue }) => (
            <button
              key={segmentId}
              type="button"
              data-active={activeSegment === segmentId}
              className={cn(
                'data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left sm:border-t-0 sm:border-l sm:px-6 sm:py-4 min-w-[120px]',
                'hover:bg-muted/30 transition-colors'
              )}
              onClick={() => onActiveSegmentChange(segmentId)}
              style={{
                borderLeftColor:
                  activeSegment === segmentId
                    ? getColorBySegmentId(segmentId)
                    : undefined,
                borderLeftWidth:
                  activeSegment === segmentId ? '3px' : undefined,
              }}
            >
              <span className="text-muted-foreground text-xs font-medium">
                {segmentLabels[segmentId]}
              </span>
              <span className="text-sm leading-none font-semibold">
                {quantity.toLocaleString()} units
              </span>
              <span className="text-xs text-muted-foreground">
                €{revenue.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full font-mono"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 48,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="priceChange"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
              label={{
                value: priceChangeLabel,
                position: 'insideBottom',
                offset: -5,
              }}
            />
            {/* Left Y-axis for Quantity */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: quantityLabel,
                angle: -90,
                position: 'insideLeft',
              }}
            />
            {/* Right Y-axis for Revenue */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              label={{
                value: revenueLabel,
                angle: 90,
                position: 'insideRight',
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="font-mono"
                  formatter={(value, name, props) => {
                    if (name === 'quantity') {
                      const formattedValue = `${value.toLocaleString()} (${props.payload.deltaQuantity > 0 ? '+' : ''}${props.payload.deltaQuantity}%)`;
                      return [formattedValue, quantityLabel];
                    }
                    if (name === 'revenue') {
                      const formattedValue = `€${value.toLocaleString()} (${props.payload.deltaRevenue > 0 ? '+' : ''}${props.payload.deltaRevenue}%)`;
                      return [formattedValue, revenueLabel];
                    }
                    return [value, name];
                  }}
                />
              }
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="line"
              wrapperStyle={{ paddingBottom: '12px' }}
            />
            {/* Quantity Line */}
            <Line
              yAxisId="left"
              dataKey="quantity"
              type="monotone"
              stroke={chartConfig.quantity.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={quantityLabel}
            />
            {/* Revenue Curve */}
            <Line
              yAxisId="right"
              dataKey="revenue"
              type="monotone"
              stroke={getColorBySegmentId(activeSegment)}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={revenueLabel}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type PriceSimulationChartProps = {
  dataPoints: PriceSimulationDataPoint[];
  activeSegment: RFMSegmentIds;
  onActiveSegmentChange: (segment: RFMSegmentIds) => void;
};
