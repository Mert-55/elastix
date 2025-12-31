import tokens from '@/app/config/tokens';
import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { Accordion } from '@/common/ui/accordion';
import { MarkdownPreviewCard } from '@/common/ui/markdown-preview-card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import EditableDashboardDescription from '@/items/dashboard/components/EditableDashboardDescription';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import PriceSimulationChart from '@/items/simulation/components/PriceSimulationChart';
import SimulationMetricsPanelSection from '@/items/simulation/components/SimulationMetricsPanelSection';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import { useState } from 'react';

export default function SimulationDashboard() {
  const { isEditing } = useEditingState();
  const { dataPoints } = usePriceSimulation();
  const [activeSegment, setActiveSegment] = useState<RFMSegmentIds>(
    RFMSegmentIds.Champion
  );
  const description = DEFAULT_DESCRIPTION;
  const translatedSegmentName = useFormatText({
    id: `${RFMSegmentIds.Champion}.text`,
  });

  if (isEditing || !description) {
    return <EditableDashboardDescription isEditing={isEditing} />;
  }

  return (
    <div
      className={cn(tokens.dashboardMaxWidth, 'w-full mx-auto overflow-y-auto')}
    >
      <Accordion
        type="multiple"
        defaultValue={DEFAULT_OPEN_SECTIONS}
        className="px-6 overflow-y-auto"
      >
        <DashboardAccordionSection
          icon="pilcrow"
          value="simulation-description"
          titleTranslatable="dashboard.editable.description.accordion.title"
        >
          <MarkdownPreviewCard markdown={description} />
        </DashboardAccordionSection>
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

const DEFAULT_DESCRIPTION = `# Simulation Dashboard

Dieses Dashboard ermöglicht die **Simulation** verschiedener Szenarien.

## Funktionen

- Echtzeitanalyse der Daten
- Interaktive Visualisierungen

> **Hinweis:** Alle Änderungen werden automatisch gespeichert.

---

**Weitere Informationen** finden Sie in der [Dokumentation](https://github.com/Mert-55).`;

const DEFAULT_OPEN_SECTIONS = [
  'simulation-description',
  'price-impact-analysis',
  'metrics-panel',
];
