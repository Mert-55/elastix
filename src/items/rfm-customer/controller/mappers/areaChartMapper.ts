import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { RevenueTimeSeriesResponse } from '@/services/types';

import type { SegmentAreaChartNode } from '../../types/SegmentAreaChartNode';

export const mapAreaChartFromResponse = (
  response: RevenueTimeSeriesResponse
): SegmentAreaChartNode[] =>
  response.items.map((item) => ({
    [RFMSegmentIds.Champion]: item.Champion ?? 0,
    [RFMSegmentIds.LoyalCustomers]: item.LoyalCustomers ?? 0,
    [RFMSegmentIds.PotentialLoyalists]: item.PotentialLoyalists ?? 0,
    [RFMSegmentIds.AtRisk]: item.AtRisk ?? 0,
    [RFMSegmentIds.Hibernating]: item.Hibernating ?? 0,
    [RFMSegmentIds.Lost]: item.Lost ?? 0,
    date: item.date,
  }));
