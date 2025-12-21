import { useActiveDashboard } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { DashboardId } from '@/common/types/DashboardIds';

export default function DashboardTitle() {
  const { activeDashboard } = useActiveDashboard();

  //Info: Temporal change. This will be enhanced by a follow-up issue with metadata-generated titles
  if (activeDashboard === DashboardId.Simulation) {
    return <h1 className="text-lg font-semibold">Untitled Simulation</h1>;
  }

  return (
    <h1 className="text-lg font-semibold">
      {useFormatText({
        id: `dashboard.sidebar.segmentation.${activeDashboard}.title` as MessageId,
      })}
    </h1>
  );
}
