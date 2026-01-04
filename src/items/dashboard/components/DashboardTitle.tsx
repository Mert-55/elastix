import { useActiveDashboard } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { DashboardId } from '@/common/types/DashboardIds';
import { useSimulationContext } from '@/items/simulation/controller/SimulationProvider';

export default function DashboardTitle() {
  const { activeDashboard } = useActiveDashboard();
  const { activeSimulation, activeStockItemName } = useSimulationContext();

  if (activeDashboard === DashboardId.Simulation) {
    const title = activeSimulation?.name ?? 'Untitled Simulation';
    return (
      <h1 className="text-lg font-semibold">
        {title}
        {activeStockItemName && (
          <span className="text-muted-foreground font-normal">
            {' : '}
            {activeStockItemName}
          </span>
        )}
      </h1>
    );
  }

  return (
    <h1 className="text-lg font-semibold">
      {useFormatText({
        id: `dashboard.sidebar.segmentation.${activeDashboard}.title` as MessageId,
      })}
    </h1>
  );
}
