import { useFormatText } from '@/common/hooks/useFormatText';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { MetricsMode } from '@/items/simulation/types';
import type { ViewBox } from 'recharts/types/util/types';

export default function MetricsPanelPieChartLabel({
  viewBox,
  value,
  mode,
}: MetricsPanelPieChartLabelProps) {
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
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan
        x={cx}
        y={cy}
        className="fill-foreground font-mono text-3xl font-bold"
      >
        {value.toLocaleString()}
      </tspan>
      <tspan
        x={cx}
        y={cy + 24}
        className="fill-muted-foreground font-mono text-sm"
      >
        {modeLabel}
      </tspan>
    </text>
  );
}

export type PieChartDataItem = {
  segmentId: RFMSegmentIds;
  value: number;
  fill: string;
};

type MetricsPanelPieChartLabelProps = {
  viewBox: ViewBox | undefined;
  value: number;
  mode: MetricsMode;
};

type PolarViewBox = {
  cx: number;
  cy: number;
};

function isPolarViewBox(viewBox: ViewBox | undefined): viewBox is PolarViewBox {
  return viewBox !== undefined && 'cx' in viewBox && 'cy' in viewBox;
}
