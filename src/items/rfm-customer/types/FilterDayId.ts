import type { SegmentAreaChartNode } from '@/items/rfm-customer/types/SegmentAreaChartNode';

export enum FilterDayId {
  ONE_YEAR = '365d',
  SIX_MONTHS = '180d',
  THREE_MONTHS = '90d',
  MONTH = '30d',
  WEEK = '7d',
}

const FILTER_DAY_MAP: Record<FilterDayId, number> = {
  [FilterDayId.ONE_YEAR]: 365,
  [FilterDayId.SIX_MONTHS]: 180,
  [FilterDayId.THREE_MONTHS]: 90,
  [FilterDayId.MONTH]: 30,
  [FilterDayId.WEEK]: 7,
};

export function filterByDate(
  chartData: SegmentAreaChartNode[],
  timeRange: FilterDayId = FilterDayId.THREE_MONTHS
): SegmentAreaChartNode[] {
  if (chartData.length === 0) return [];

  const sortedData = [...chartData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const latestDate = new Date(sortedData[sortedData.length - 1].date);
  const daysToSubtract = FILTER_DAY_MAP[timeRange];
  const startDate = new Date(latestDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);

  return sortedData.filter((node) => {
    const date = new Date(node.date);
    return date >= startDate && date <= latestDate;
  });
}
