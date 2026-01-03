import type { RevenueTimeSeriesItemDTO } from '../dto';

export interface RevenueTimeSeriesResponse {
  total: number;
  items: RevenueTimeSeriesItemDTO[];
}
