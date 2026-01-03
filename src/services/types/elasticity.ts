import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface SegmentMetricsDTO {
  priceSensitivity: number;
  walletShare: number;
  churnRisk: number;
}

export type ElasticityMetricsResponse = Record<
  keyof typeof RFMSegmentIds,
  SegmentMetricsDTO
>;

export interface StockItemDTO {
  id: string;
  itemName: string;
  elasticity: number;
  purchaseFrequency: number;
  revenuePotential: number;
  segment: keyof typeof RFMSegmentIds;
}

export interface StockItemsResponse {
  total: number;
  items: StockItemDTO[];
}

export interface StockItemsQueryParams {
  segment?: keyof typeof RFMSegmentIds;
  page?: number;
  pageSize?: number;
}
