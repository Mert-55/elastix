import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export interface StockItemDTO {
  id: string;
  itemName: string;
  elasticity: number;
  purchaseFrequency: number;
  revenuePotential: number;
  segment: keyof typeof RFMSegmentIds;
}
