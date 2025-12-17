import type { ChartConfig } from '@/common/ui/chart';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

/**
 * Chart configuration for RFM segment area chart
 * Defines colors and labels for each segment
 */
export const rfmSegmentAreaChartConfig = (
  segmentText: Record<RFMSegmentIds, string>
) =>
  ({
    [RFMSegmentIds.Champion]: {
      label: segmentText[RFMSegmentIds.Champion],
      color: 'var(--primary)',
    },
    [RFMSegmentIds.LoyalCustomers]: {
      label: segmentText[RFMSegmentIds.LoyalCustomers],
      color: 'var(--chart-4)',
    },
    [RFMSegmentIds.PotentialLoyalists]: {
      label: segmentText[RFMSegmentIds.PotentialLoyalists],
      color: 'var(--chart-4)',
    },
    [RFMSegmentIds.AtRisk]: {
      label: segmentText[RFMSegmentIds.AtRisk],
      color: 'var(--destructive)',
    },
    [RFMSegmentIds.Hibernating]: {
      label: segmentText[RFMSegmentIds.Hibernating],
      color: 'var(--chart-2)',
    },
    [RFMSegmentIds.Lost]: {
      label: segmentText[RFMSegmentIds.Lost],
      color: 'var(--secondary)',
    },
  }) satisfies ChartConfig;

/**
 * Gets the color for a specific RFM segment from the chart config
 * @param rfmSegmentId - RFM segment identifier
 * @returns CSS color variable string
 */
export function getColorBySegmentId(rfmSegmentId: RFMSegmentIds): string {
  return rfmSegmentAreaChartConfig({} as Record<RFMSegmentIds, string>)[
    rfmSegmentId
  ].color;
}
