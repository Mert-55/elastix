import type { StockItemDTO } from '../dto';

export interface StockItemsResponse {
  total: number;
  items: StockItemDTO[];
}
