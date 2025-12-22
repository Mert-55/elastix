import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';
import { Accordion } from '@/common/ui/accordion';
import { MarkdownPreviewCard } from '@/common/ui/markdown-preview-card';
import { DashboardAccordionSection } from '@/items/dashboard/components';
import EditableDashboardDescription from '@/items/dashboard/components/EditableDashboardDescription';
import { useEditingState } from '@/items/dashboard/hooks/useEditingState';

export default function SimulationDashboard() {
  const { isEditing } = useEditingState();
  const description: string | null = `# Simulation Dashboard

Dieses Dashboard ermöglicht die **Simulation** verschiedener Szenarien.

## Funktionen

- Echtzeitanalyse der Daten
- Interaktive Visualisierungen

> **Hinweis:** Alle Änderungen werden automatisch gespeichert.

---

**Weitere Informationen** finden Sie in der [Dokumentation](https://example.com).`; // Placeholder for actual description retrieval logic
  return (
    <div className={cn(tokens.dashboardMaxWidth, 'w-full mx-auto')}>
      {isEditing || !!!description ? (
        <EditableDashboardDescription isEditing={isEditing} />
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue="simulation-settings"
          className="px-6 overflow-y-auto"
        >
          <DashboardAccordionSection
            icon={'pilcrow'}
            value="simulation-settings"
            titleId="dashboard.editable.description.accordion.title"
          >
            <MarkdownPreviewCard markdown={description} />
          </DashboardAccordionSection>
        </Accordion>
      )}
    </div>
  );
}
