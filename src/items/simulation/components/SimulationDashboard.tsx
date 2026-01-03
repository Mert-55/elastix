import tokens from '@/app/config/tokens';
import { useWithToast } from '@/app/controller/hooks';
import { useSimulationContext } from '@/app/controller/SimulationProvider';
import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { Accordion } from '@/common/ui/accordion';
import { MarkdownPreviewCard } from '@/common/ui/markdown-preview-card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import EditableDashboardDescription from '@/items/dashboard/components/EditableDashboardDescription';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import InlineStockItemPicker from '@/items/simulation/components/InlineStockItemPicker';
import PriceSimulationChart from '@/items/simulation/components/PriceSimulationChart';
import { SimulationDashboardSkeleton } from '@/items/simulation/components/SimulationDashboardSkeleton';
import SimulationMetricsPanelSection from '@/items/simulation/components/SimulationMetricsPanelSection';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function SimulationDashboard() {
  const { isEditing } = useEditingState();
  const { activeSimulation, actions } = useSimulationContext();
  const { dataPoints, isLoading } = usePriceSimulation();
  const { showWarning } = useWithToast();
  const [activeSegment, setActiveSegment] = useState<RFMSegmentIds>(
    RFMSegmentIds.Champion
  );

  // Track if we've shown the insufficient data warning
  const hasShownWarningRef = useRef(false);

  const description = activeSimulation?.description ?? null;
  const hasStockItem = Boolean(activeSimulation?.stockItemRef);

  const translatedSegmentName = useFormatText({
    id: `${RFMSegmentIds.Champion}.text`,
  });

  // Check if all data values are zero (insufficient data)
  const hasInsufficientData = useMemo(() => {
    if (dataPoints.length === 0) return false;
    return dataPoints.every((dp) => dp.quantity === 0 && dp.revenue === 0);
  }, [dataPoints]);

  // Show warning toast when insufficient data is detected
  useEffect(() => {
    if (hasInsufficientData && !isLoading && !hasShownWarningRef.current) {
      hasShownWarningRef.current = true;
      showWarning(
        'Insufficient Data',
        'Not enough transaction data available for this stock item. Try selecting a different item with more historical data.'
      );
    }
    // Reset when data becomes sufficient
    if (!hasInsufficientData) {
      hasShownWarningRef.current = false;
    }
  }, [hasInsufficientData, isLoading, showWarning]);

  const handleStockItemSelect = async (stockItemRef: string) => {
    if (activeSimulation) {
      // Since PUT endpoint doesn't support stockItemRef updates,
      // we create a new simulation with the selected stock item and delete the old one
      try {
        await actions.create({
          name: activeSimulation.name,
          stockItemRef,
          priceRange: [
            activeSimulation.priceRange.from,
            activeSimulation.priceRange.to,
            activeSimulation.priceRange.step,
          ],
          description: activeSimulation.description,
        });
        await actions.remove(activeSimulation.id);
      } catch (error) {
        console.error('Failed to update stock item:', error);
      }
    }
  };

  if (isEditing) {
    return <EditableDashboardDescription isEditing={isEditing} />;
  }

  // If no stock item is set, show the inline stock item picker
  if (!hasStockItem) {
    return (
      <div className={cn(tokens.dashboardMaxWidth, 'w-full mx-auto p-6')}>
        <InlineStockItemPicker onSelect={handleStockItemSelect} />
      </div>
    );
  }

  // Show loading state while fetching simulation metrics
  if (isLoading) {
    return (
      <div
        className={cn(
          tokens.dashboardMaxWidth,
          'w-full mx-auto overflow-y-auto'
        )}
      >
        <SimulationDashboardSkeleton />
      </div>
    );
  }

  const openSections = description
    ? DEFAULT_OPEN_SECTIONS
    : DEFAULT_OPEN_SECTIONS.filter((s) => s !== 'simulation-description');

  return (
    <div
      className={cn(tokens.dashboardMaxWidth, 'w-full mx-auto overflow-y-auto')}
    >
      <Accordion
        type="multiple"
        defaultValue={openSections}
        className="px-6 overflow-y-auto"
      >
        {description && (
          <DashboardAccordionSection
            icon="pilcrow"
            value="simulation-description"
            titleTranslatable="dashboard.editable.description.accordion.title"
          >
            <MarkdownPreviewCard markdown={description} />
          </DashboardAccordionSection>
        )}
        <DashboardAccordionSection
          icon="chart-spline"
          value="price-impact-analysis"
          titleTranslatable="simulation.priceImpact.title"
        >
          <PriceSimulationChart
            dataPoints={dataPoints}
            activeSegment={activeSegment}
            onActiveSegmentChange={setActiveSegment}
          />
        </DashboardAccordionSection>
        <DashboardAccordionSection
          icon="chart-pie"
          value="metrics-panel"
          titleTranslatable={{
            id: 'simulation.metricsPanel.title',
            values: { segmentName: translatedSegmentName },
          }}
        >
          <SimulationMetricsPanelSection activeSegment={activeSegment} />
        </DashboardAccordionSection>
      </Accordion>
    </div>
  );
}

const DEFAULT_OPEN_SECTIONS = [
  'simulation-description',
  'price-impact-analysis',
  'metrics-panel',
];
