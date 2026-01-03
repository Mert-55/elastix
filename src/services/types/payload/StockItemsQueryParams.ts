import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface StockItemsQueryParams {
  segment?: keyof typeof RFMSegmentIds;
  page?: number;
  pageSize?: number;
}
