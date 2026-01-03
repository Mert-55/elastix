import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

export type RevenueBySegmentDTO = Record<keyof typeof RFMSegmentIds, number>;

export interface RevenueTimeSeriesItemDTO extends RevenueBySegmentDTO {
  date: string;
}
