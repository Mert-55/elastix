import { useActiveDashboard } from '@/app/providers/ActiveDashboardProvider';
import { DashboardId } from '@/common/types/DashboardIds';
import { SidebarTrigger } from '@/common/ui/sidebar';
import EditableDashboardMenuPanel from '@/items/dashboard/components/EditableDashboardMenuPanel';
import DashboardTitle from './DashboardTitle';

export default function DashboardHeaderMenu() {
  const { activeDashboard } = useActiveDashboard();
  const isSimulation = activeDashboard === DashboardId.Simulation;

  return (
    <div className="inline-flex items-center gap-4">
      <SidebarTrigger />
      <div className="w-px h-6 bg-border" />
      {isSimulation ? (
        <EditableDashboardMenuPanel>
          <DashboardTitle />
        </EditableDashboardMenuPanel>
      ) : (
        <DashboardTitle />
      )}
    </div>
  );
}
