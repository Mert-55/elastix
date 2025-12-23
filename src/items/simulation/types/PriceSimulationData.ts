import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';

/**
 * Represents a single data point in the price simulation chart
 * Shows the impact of price changes on quantity and revenue for a specific segment
 */
export interface PriceSimulationDataPoint {
  /** RFM segment identifier */
  segmentId: RFMSegmentIds;

  /** Percentage change in price (e.g., -15, 0, +10) */
  priceChangePercent: number;

  /** Absolute quantity after price change */
  quantity: number;

  /** Absolute revenue after price change */
  revenue: number;

  /** Percentage change in quantity compared to baseline (0% price change) */
  deltaQuantityPercent: number;

  /** Percentage change in revenue compared to baseline (0% price change) */
  deltaRevenuePercent: number;
}

/**
 * Complete simulation data for all segments across price change spectrum
 * This is the expected API response format
 */
export interface PriceSimulationResponse {
  /** Array of data points for all segments and price change values */
  dataPoints: PriceSimulationDataPoint[];

  /** Metadata about the simulation */
  metadata: {
    /** Stock item ID being simulated */
    stockItemId: string;

    /** Name of the stock item */
    stockItemName: string;

    /** Timestamp of simulation generation */
    generatedAt: string;

    /** Base price used for calculations */
    basePrice: number;
  };
}
