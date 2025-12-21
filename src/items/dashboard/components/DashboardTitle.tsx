import { useActiveDashboard } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { DashboardId } from '@/common/types/DashboardIds';

export default function DashboardTitle() {
  const { activeDashboard } = useActiveDashboard();

  if (activeDashboard === DashboardId.Simulation) {
    return null;
  }

  return (
    <h1 className="text-lg font-semibold">
      {useFormatText({
        id: `dashboard.sidebar.segmentation.${activeDashboard}.title` as MessageId,
      })}
    </h1>
  );
}
