import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface StockItemsQueryParams {
  segmentFilter?: keyof typeof RFMSegmentIds;
  query?: string;
  sortBy?: 'quantity_asc' | 'quantity_desc' | 'revenue_asc' | 'revenue_desc';
  limit?: number;
  offset?: number;
}
