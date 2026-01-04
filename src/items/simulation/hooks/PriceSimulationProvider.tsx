import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import { useSimulationContext } from '@/items/simulation/controller/SimulationProvider';
import type { PriceSimulationDataPoint } from '@/items/simulation/types/PriceSimulationData';
import { useGetSimulationMetricsQuery } from '@/services/hostApi';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

export interface SimulationSettings {
  lowerBound: number;
  upperBound: number;
  step: number;
}

interface PriceSimulationContextValue {
  settings: SimulationSettings;
  dataPoints: PriceSimulationDataPoint[];
  isLoading: boolean;
}

const PriceSimulationContext = createContext<
  PriceSimulationContextValue | undefined
>(undefined);

// Mapping from API segment keys to RFMSegmentIds
const SEGMENT_KEY_TO_ID: Record<string, RFMSegmentIds> = {
  Champion: RFMSegmentIds.Champion,
  LoyalCustomers: RFMSegmentIds.LoyalCustomers,
  PotentialLoyalists: RFMSegmentIds.PotentialLoyalists,
  AtRisk: RFMSegmentIds.AtRisk,
  Hibernating: RFMSegmentIds.Hibernating,
  Lost: RFMSegmentIds.Lost,
};

// Default elasticity values per segment for generating simulation data
const SEGMENT_ELASTICITIES: Record<
  RFMSegmentIds,
  { baseQuantity: number; baseRevenue: number; elasticity: number }
> = {
  [RFMSegmentIds.Champion]: {
    baseQuantity: 1200,
    baseRevenue: 48000,
    elasticity: 0.6,
  },
  [RFMSegmentIds.LoyalCustomers]: {
    baseQuantity: 850,
    baseRevenue: 32000,
    elasticity: 0.8,
  },
  [RFMSegmentIds.PotentialLoyalists]: {
    baseQuantity: 620,
    baseRevenue: 21000,
    elasticity: 1.2,
  },
  [RFMSegmentIds.AtRisk]: {
    baseQuantity: 380,
    baseRevenue: 12500,
    elasticity: 1.5,
  },
  [RFMSegmentIds.Hibernating]: {
    baseQuantity: 180,
    baseRevenue: 5400,
    elasticity: 1.8,
  },
  [RFMSegmentIds.Lost]: {
    baseQuantity: 50,
    baseRevenue: 1200,
    elasticity: 2.0,
  },
};

export function PriceSimulationProvider({ children }: { children: ReactNode }) {
  const { activeSimulation } = useSimulationContext();

  // Fetch simulation metrics from API when we have an active simulation with a stock item
  const {
    data: metricsData,
    isLoading: isLoadingMetrics,
    isFetching,
  } = useGetSimulationMetricsQuery(activeSimulation?.id ?? '', {
    skip: !activeSimulation?.id || !activeSimulation?.stockItemRef,
  });

  // Get settings from active simulation or use defaults
  const settings: SimulationSettings = useMemo(() => {
    if (activeSimulation?.priceRange) {
      return {
        lowerBound: activeSimulation.priceRange.from,
        upperBound: activeSimulation.priceRange.to,
        step: activeSimulation.priceRange.step,
      };
    }
    return {
      lowerBound: -20,
      upperBound: 20,
      step: 5,
    };
  }, [activeSimulation]);

  // Generate price points based on settings
  const generatePricePoints = (
    lowerBound: number,
    upperBound: number,
    step: number
  ): number[] => {
    const points: number[] = [];

    if (step === 0) {
      if (!Number.isNaN(lowerBound)) points.push(lowerBound);
      if (
        !Number.isNaN(upperBound) &&
        (points.length === 0 ||
          Math.abs(points[points.length - 1] - upperBound) > 1e-9)
      ) {
        points.push(upperBound);
      }
      return points;
    }

    const epsilon = 1e-9;
    for (let i = 0; ; i++) {
      const price = lowerBound + i * step;
      if (step > 0) {
        if (price > upperBound + epsilon) break;
      } else {
        if (price < upperBound - epsilon) break;
      }
      points.push(price);
    }

    if (
      !Number.isNaN(upperBound) &&
      (points.length === 0 ||
        Math.abs(points[points.length - 1] - upperBound) > epsilon)
    ) {
      points.push(upperBound);
    }

    if (lowerBound <= 0 && upperBound >= 0 && !points.includes(0)) {
      points.push(0);
      points.sort((a, b) => a - b);
    }

    return points;
  };

  // Generate data points using API metrics if available, otherwise use defaults
  const dataPoints: PriceSimulationDataPoint[] = useMemo(() => {
    const pricePoints = generatePricePoints(
      settings.lowerBound,
      settings.upperBound,
      settings.step
    );

    const result: PriceSimulationDataPoint[] = [];

    // If we have API metrics, use them to get base values and calculate elasticity
    if (metricsData) {
      for (const [key, value] of Object.entries(metricsData)) {
        const segmentId = SEGMENT_KEY_TO_ID[key];
        if (!segmentId) continue;

        // Get elasticity factor from defaults (API should provide this in the future)
        const segmentElasticity = SEGMENT_ELASTICITIES[segmentId];
        const elasticity = segmentElasticity?.elasticity ?? 1.0;

        // Use API metrics as base values at 0% price change
        const baseQuantity = value.quantity;
        const baseRevenue = value.revenue;

        pricePoints.forEach((priceChange) => {
          const quantityChangePercent = -priceChange * elasticity;
          const quantity = baseQuantity * (1 + quantityChangePercent / 100);
          const revenueChangePercent =
            priceChange +
            quantityChangePercent +
            (priceChange * quantityChangePercent) / 100;
          const revenue = baseRevenue * (1 + revenueChangePercent / 100);

          result.push({
            segmentId,
            priceChangePercent: priceChange,
            quantity: Math.round(quantity),
            revenue: Math.round(revenue * 100) / 100,
            deltaQuantityPercent: Math.round(quantityChangePercent * 10) / 10,
            deltaRevenuePercent: Math.round(revenueChangePercent * 10) / 10,
          });
        });
      }
    } else {
      // Fallback to default mock data when no API metrics available
      for (const [
        segmentId,
        { baseQuantity, baseRevenue, elasticity },
      ] of Object.entries(SEGMENT_ELASTICITIES)) {
        pricePoints.forEach((priceChange) => {
          const quantityChangePercent = -priceChange * elasticity;
          const quantity = baseQuantity * (1 + quantityChangePercent / 100);
          const revenueChangePercent =
            priceChange +
            quantityChangePercent +
            (priceChange * quantityChangePercent) / 100;
          const revenue = baseRevenue * (1 + revenueChangePercent / 100);

          result.push({
            segmentId: segmentId as RFMSegmentIds,
            priceChangePercent: priceChange,
            quantity: Math.round(quantity),
            revenue: Math.round(revenue * 100) / 100,
            deltaQuantityPercent: Math.round(quantityChangePercent * 10) / 10,
            deltaRevenuePercent: Math.round(revenueChangePercent * 10) / 10,
          });
        });
      }
    }

    return result;
  }, [settings, metricsData]);

  return (
    <PriceSimulationContext.Provider
      value={{
        settings,
        dataPoints,
        isLoading: isLoadingMetrics || isFetching,
      }}
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
