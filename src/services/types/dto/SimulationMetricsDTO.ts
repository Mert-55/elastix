import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface SimulationSegmentMetricsDTO {
  priceChangePercent: number;
  quantity: number;
  revenue: number;
  deltaQuantityPercent: number;
  deltaRevenuePercent: number;
}

export type SimulationMetricsDTO = Record<
  keyof typeof RFMSegmentIds,
  SimulationSegmentMetricsDTO
>;
