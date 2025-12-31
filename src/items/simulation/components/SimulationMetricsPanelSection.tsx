import { Card } from '@/common/ui/card';
import { Slider } from '@/common/ui/slider';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import MetricsPanelInteractivePieChart from '@/items/simulation/components/MetricsPanelInteractivePieChart';
import MetricsPanelSegmentBarChart from '@/items/simulation/components/MetricsPanelSegmentBarChart';
import MetricsPanelStackedRadialChart from '@/items/simulation/components/MetricsPanelStackedRadialChart';
import MetricsPanelToggleGroup from '@/items/simulation/components/MetricsPanelToggleGroup';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import type { MetricsMode } from '@/items/simulation/types';
import { useState } from 'react';
import MetricsDisplay from './MetricsDisplay';

export default function SimulationMetricsPanelSection({
  activeSegment,
}: SimulationMetricsPanelSectionProps) {
  const { settings } = usePriceSimulation();
  const [priceChangePercent, setPriceChangePercent] =
    useState(DEFAULT_PRICE_CHANGE);
  const [mode, setMode] = useState<MetricsMode>('revenue');

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full pb-2">
      <div>
        <Card className="grid grid-cols-[1fr_auto] gap-4 px-6 py-0 divide-x divide-border items-center max-w-154">
          <div className="pr-6 grid subgrid-cols-1 py-0 h-full">
            <Slider
              defaultValue={[DEFAULT_PRICE_CHANGE]}
              max={settings.upperBound}
              min={settings.lowerBound}
              step={settings.step}
              onValueChange={(value) => setPriceChangePercent(value[0])}
              className="w-auto"
              variant={priceChangePercent < 0 ? 'destructive' : 'primary'}
            />
          </div>
          <MetricsDisplay
            currentValue={priceChangePercent}
            lowerBound={settings.lowerBound}
            upperBound={settings.upperBound}
          />
        </Card>
        <MetricsPanelToggleGroup
          value={mode}
          onValueChange={(newMode) => setMode(newMode)}
        />
        <div className="grid grid-cols-[auto_auto] grid-rows-1 gap-4">
          <MetricsPanelInteractivePieChart
            mode={mode}
            priceChangePercent={priceChangePercent}
            activeSegment={activeSegment}
          />
          <MetricsPanelStackedRadialChart
            mode={mode}
            activeSegment={activeSegment}
            priceChangePercent={priceChangePercent}
          />
        </div>
      </div>
      <MetricsPanelSegmentBarChart
        mode={mode}
        activeSegment={activeSegment}
        priceChangePercent={priceChangePercent}
      />
    </div>
  );
}

type SimulationMetricsPanelSectionProps = {
  activeSegment: RFMSegmentIds;
};

const DEFAULT_PRICE_CHANGE = 0;
