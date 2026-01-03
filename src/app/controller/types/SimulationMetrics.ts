import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface SimulationSegmentMetrics {
  segmentId: RFMSegmentIds;
  priceChangePercent: number;
  quantity: number;
  revenue: number;
  deltaQuantityPercent: number;
  deltaRevenuePercent: number;
}

export type SimulationMetrics = SimulationSegmentMetrics[];
