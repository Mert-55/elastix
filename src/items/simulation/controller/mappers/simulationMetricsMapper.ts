import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { SimulationMetricsDTO } from '@/services/types/dto';

import type {
  SimulationMetrics,
  SimulationSegmentMetrics,
} from '@/items/simulation/types';

const SEGMENT_KEY_TO_ID: Record<string, RFMSegmentIds> = {
  Champion: RFMSegmentIds.Champion,
  LoyalCustomers: RFMSegmentIds.LoyalCustomers,
  PotentialLoyalists: RFMSegmentIds.PotentialLoyalists,
  AtRisk: RFMSegmentIds.AtRisk,
  Hibernating: RFMSegmentIds.Hibernating,
  Lost: RFMSegmentIds.Lost,
};

export const mapSimulationMetricsFromDTO = (
  dto: SimulationMetricsDTO
): SimulationMetrics => {
  const metrics: SimulationSegmentMetrics[] = [];

  for (const [key, value] of Object.entries(dto)) {
    const segmentId = SEGMENT_KEY_TO_ID[key];
    if (segmentId) {
      metrics.push({
        segmentId,
        priceChangePercent: value.priceChangePercent,
        quantity: value.quantity,
        revenue: value.revenue,
        deltaQuantityPercent: value.deltaQuantityPercent,
        deltaRevenuePercent: value.deltaRevenuePercent,
      });
    }
  }

  return metrics;
};
