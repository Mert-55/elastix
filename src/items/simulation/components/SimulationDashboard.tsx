import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';
import { Accordion } from '@/common/ui/accordion';
import { MarkdownPreviewCard } from '@/common/ui/markdown-preview-card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import EditableDashboardDescription from '@/items/dashboard/components/EditableDashboardDescription';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';
import PriceSimulationChart from '@/items/simulation/components/PriceSimulationChart';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';

export default function SimulationDashboard() {
  const { isEditing } = useEditingState();
  const { dataPoints } = usePriceSimulation();

  const description: string | null = `# Simulation Dashboard

Dieses Dashboard ermöglicht die **Simulation** verschiedener Szenarien.

## Funktionen

- Echtzeitanalyse der Daten
- Interaktive Visualisierungen

> **Hinweis:** Alle Änderungen werden automatisch gespeichert.

---

**Weitere Informationen** finden Sie in der [Dokumentation](https://github.com/Mert-55).`; // Placeholder for actual description retrieval logic
  return (
    <div
      className={cn(tokens.dashboardMaxWidth, 'w-full mx-auto overflow-y-auto')}
    >
      {isEditing || !!!description ? (
        <EditableDashboardDescription isEditing={isEditing} />
      ) : (
        <Accordion
          type="multiple"
          defaultValue={['price-impact-analysis', 'simulation-description']}
          className="px-6 overflow-y-auto"
        >
          <DashboardAccordionSection
            icon={'pilcrow'}
            value="simulation-description"
            titleId="dashboard.editable.description.accordion.title"
          >
            <MarkdownPreviewCard markdown={description} />
          </DashboardAccordionSection>
          <DashboardAccordionSection
            icon={'analytics'}
            value="price-impact-analysis"
            titleId="simulation.priceImpact.title"
          >
            <PriceSimulationChart dataPoints={dataPoints} />
          </DashboardAccordionSection>
        </Accordion>
      )}
    </div>
  );
}
