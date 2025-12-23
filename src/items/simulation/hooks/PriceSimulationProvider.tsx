import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { PriceSimulationDataPoint } from '@/items/simulation/types/PriceSimulationData';
import { createContext, useContext, useState, type ReactNode } from 'react';

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

interface PriceSimulationContextValue {
  settings: SimulationSettings;
  dataPoints: PriceSimulationDataPoint[];
  updateSettings: (newSettings: Partial<SimulationSettings>) => void;
}

const PriceSimulationContext = createContext<
  PriceSimulationContextValue | undefined
>(undefined);

export function PriceSimulationProvider({ children }: { children: ReactNode }) {
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

    // Avoid infinite loop if step is zero
    if (step === 0) {
      if (!Number.isNaN(lowerBound)) {
        points.push(lowerBound);
      }
      if (
        !Number.isNaN(upperBound) &&
        (points.length === 0 || Math.abs(points[points.length - 1] - upperBound) > 1e-9)
      ) {
        points.push(upperBound);
      }
      return points;
    }

    const epsilon = 1e-9;
    // Generate points using an integer index to limit floating-point accumulation
    for (let i = 0; ; i++) {
      const price = lowerBound + i * step;
      if (step > 0) {
        if (price > upperBound + epsilon) break;
      } else {
        if (price < upperBound - epsilon) break;
      }
      points.push(price);
    }

    // Ensure the upperBound is included when appropriate
    if (
      !Number.isNaN(upperBound) &&
      (points.length === 0 ||
        Math.abs(points[points.length - 1] - upperBound) > epsilon)
    ) {
      points.push(upperBound);
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

  return (
    <PriceSimulationContext.Provider
      value={{ settings, dataPoints, updateSettings }}
    >
      {children}
    </PriceSimulationContext.Provider>
  );
}

export function usePriceSimulation() {
  const context = useContext(PriceSimulationContext);
  if (!context) {
    throw new Error(
      'usePriceSimulation must be used within PriceSimulationProvider'
    );
  }
  return context;
}
