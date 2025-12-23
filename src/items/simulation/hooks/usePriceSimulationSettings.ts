import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { PriceSimulationDataPoint } from '@/items/simulation/types/PriceSimulationData';
import { useState } from 'react';

export interface SimulationSettings {
  lowerBound: number;
  upperBound: number;
  step: number;
}

interface SegmentElasticity {
  segmentId: RFMSegmentIds;
  baseQuantity: number;
  baseRevenue: number;
  elasticity: number;
}

const SEGMENT_ELASTICITIES: SegmentElasticity[] = [
  {
    segmentId: RFMSegmentIds.Champion,
    baseQuantity: 1200,
    baseRevenue: 48000,
    elasticity: 0.6,
  },
  {
    segmentId: RFMSegmentIds.LoyalCustomers,
    baseQuantity: 850,
    baseRevenue: 32000,
    elasticity: 0.8,
  },
  {
    segmentId: RFMSegmentIds.PotentialLoyalists,
    baseQuantity: 620,
    baseRevenue: 21000,
    elasticity: 1.2,
  },
  {
    segmentId: RFMSegmentIds.AtRisk,
    baseQuantity: 380,
    baseRevenue: 12500,
    elasticity: 1.5,
  },
  {
    segmentId: RFMSegmentIds.Hibernating,
    baseQuantity: 180,
    baseRevenue: 5400,
    elasticity: 1.8,
  },
  {
    segmentId: RFMSegmentIds.Lost,
    baseQuantity: 50,
    baseRevenue: 1200,
    elasticity: 2.0,
  },
];

/**
 * Hook for managing price simulation settings and generating data points
 *
 * Generates chart data based on user-defined price range and step size
 * Each segment has predefined elasticity values that determine price sensitivity
 */
export function usePriceSimulationSettings() {
  const [settings, setSettings] = useState<SimulationSettings>({
    lowerBound: -20,
    upperBound: 20,
    step: 5,
  });

  const generatePricePoints = (
    lowerBound: number,
    upperBound: number,
    step: number
  ): number[] => {
    const points: number[] = [];
    for (let price = lowerBound; price <= upperBound; price += step) {
      points.push(price);
    }
    return points;
  };

  const generateDataPoints = (
    currentSettings: SimulationSettings
  ): PriceSimulationDataPoint[] => {
    const pricePoints = generatePricePoints(
      currentSettings.lowerBound,
      currentSettings.upperBound,
      currentSettings.step
    );

    const dataPoints: PriceSimulationDataPoint[] = [];

    SEGMENT_ELASTICITIES.forEach(
      ({ segmentId, baseQuantity, baseRevenue, elasticity }) => {
        pricePoints.forEach((priceChange) => {
          // Quantity changes inversely with price (elasticity factor)
          const quantityChangePercent = -priceChange * elasticity;
          const quantity = baseQuantity * (1 + quantityChangePercent / 100);

          // Revenue is affected by both price and quantity changes
          const revenueChangePercent =
            priceChange +
            quantityChangePercent +
            (priceChange * quantityChangePercent) / 100;
          const revenue = baseRevenue * (1 + revenueChangePercent / 100);

          dataPoints.push({
            segmentId,
            priceChangePercent: priceChange,
            quantity: Math.round(quantity),
            revenue: Math.round(revenue * 100) / 100,
            deltaQuantityPercent: Math.round(quantityChangePercent * 10) / 10,
            deltaRevenuePercent: Math.round(revenueChangePercent * 10) / 10,
          });
        });
      }
    );

    return dataPoints;
  };

  const dataPoints = generateDataPoints(settings);

  const updateSettings = (newSettings: Partial<SimulationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const validateSettings = (newSettings: SimulationSettings): string | null => {
    if (newSettings.lowerBound >= newSettings.upperBound) {
      return 'Lower bound must be less than upper bound';
    }
    if (newSettings.step <= 0) {
      return 'Step must be greater than 0';
    }
    if (newSettings.step > newSettings.upperBound - newSettings.lowerBound) {
      return 'Step is too large for the given range';
    }
    return null;
  };

  return {
    settings,
    dataPoints,
    updateSettings,
    validateSettings,
  };
}
