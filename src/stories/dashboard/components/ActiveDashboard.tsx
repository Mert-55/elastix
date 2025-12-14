import { useActiveDashboard } from '@/app/providers';
import type { DashboardId } from '@/common/types/DashboardIds';
import { Activity } from 'react';

export function ActivityDashboardSwitcher({
  children,
  dashboardId,
}: {
  children: React.ReactNode;
  dashboardId: DashboardId;
}) {
  const { activeDashboard } = useActiveDashboard();
  return (
    <Activity mode={dashboardId === activeDashboard ? 'visible' : 'hidden'}>
      {children}
    </Activity>
  );
}
