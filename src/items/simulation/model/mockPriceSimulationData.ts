import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type {
  PriceSimulationDataPoint,
  PriceSimulationResponse,
} from '@/items/simulation/types/PriceSimulationData';

/**
 * Mock data for price simulation chart
 * Shows how different customer segments react to price changes
 *
 * Price changes range from -20% to +20% in 5% increments
 * Each segment has different price sensitivity:
 * - Champions: Less price sensitive, higher baseline
 * - Loyal: Moderately price sensitive
 * - Potential: More price sensitive
 * - At Risk: Highly price sensitive
 * - Hibernating: Very price sensitive
 * - Lost: Minimal engagement
 */

const priceChangePoints = [-20, -15, -10, -5, 0, 5, 10, 15, 20];

// Generate data points for each segment across price changes
const generateSegmentData = (
  segmentId: RFMSegmentIds,
  baseQuantity: number,
  baseRevenue: number,
  priceElasticity: number
): PriceSimulationDataPoint[] => {
  return priceChangePoints.map((priceChange) => {
    // Quantity changes inversely with price (elasticity factor)
    const quantityChangePercent = -priceChange * priceElasticity;
    const quantity = baseQuantity * (1 + quantityChangePercent / 100);

    // Revenue is affected by both price and quantity changes
    const revenueChangePercent =
      priceChange +
      quantityChangePercent +
      (priceChange * quantityChangePercent) / 100;
    const revenue = baseRevenue * (1 + revenueChangePercent / 100);

    return {
      segmentId,
      priceChangePercent: priceChange,
      quantity: Math.round(quantity),
      revenue: Math.round(revenue * 100) / 100,
      deltaQuantityPercent: Math.round(quantityChangePercent * 10) / 10,
      deltaRevenuePercent: Math.round(revenueChangePercent * 10) / 10,
    };
  });
};

const mockDataPoints: PriceSimulationDataPoint[] = [
  // Champions - Low price sensitivity (elasticity: 0.6)
  ...generateSegmentData(RFMSegmentIds.Champion, 1200, 48000, 0.6),

  // Loyal Customers - Moderate price sensitivity (elasticity: 0.8)
  ...generateSegmentData(RFMSegmentIds.LoyalCustomers, 850, 32000, 0.8),

  // Potential Loyalists - Higher price sensitivity (elasticity: 1.2)
  ...generateSegmentData(RFMSegmentIds.PotentialLoyalists, 620, 21000, 1.2),

  // At Risk - High price sensitivity (elasticity: 1.5)
  ...generateSegmentData(RFMSegmentIds.AtRisk, 380, 12500, 1.5),

  // Hibernating - Very high price sensitivity (elasticity: 1.8)
  ...generateSegmentData(RFMSegmentIds.Hibernating, 180, 5400, 1.8),

  // Lost - Minimal engagement (elasticity: 2.0)
  ...generateSegmentData(RFMSegmentIds.Lost, 50, 1200, 2.0),
];

export const mockPriceSimulationData: PriceSimulationResponse = {
  dataPoints: mockDataPoints,
  metadata: {
    stockItemId: 'item-001',
    stockItemName: 'Gold Watch',
    generatedAt: new Date().toISOString(),
    basePrice: 399.99,
  },
};
