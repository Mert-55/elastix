import REFERENCE_DATE from '@/items/rfm-customer/config/referenceDate';
import type { SegmentAreaChartNode } from '@/items/rfm-customer/types/SegmentAreaChartNode';

/**
 * Time range filter options for area chart
 */
export enum FilterDayId {
  ONE_YEAR = '365d',
  SIX_MONTHS = '180d',
  THREE_MONTHS = '90d',
  MONTH = '30d',
  WEEK = '7d',
}

/**
 * Maps FilterDayId to number of days
 */
const FILTER_DAY_MAP: Record<FilterDayId, number> = {
  [FilterDayId.ONE_YEAR]: 365,
  [FilterDayId.SIX_MONTHS]: 180,
  [FilterDayId.THREE_MONTHS]: 90,
  [FilterDayId.MONTH]: 30,
  [FilterDayId.WEEK]: 7,
};

/**
 * Filters chart data based on time range relative to reference date
 *
 * @param chartData - Full dataset to filter
 * @param timeRange - Time range filter to apply
 * @returns Filtered dataset containing only dates within the specified range
 */
export function filterByDate(
  chartData: SegmentAreaChartNode[],
  timeRange: FilterDayId = FilterDayId.THREE_MONTHS
): SegmentAreaChartNode[] {
  const daysToSubtract = FILTER_DAY_MAP[timeRange];
  const startDate = new Date(REFERENCE_DATE);
  startDate.setDate(startDate.getDate() - daysToSubtract);

  return chartData.filter((node) => {
    const date = new Date(node.date);
    return date >= startDate;
  });
}
