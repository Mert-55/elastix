import { useActiveDashboard } from '@/app/providers/ActiveDashboardProvider';
import { DashboardId } from '@/common/types/DashboardIds';
import { Sidebar as Base, SidebarContent } from '@/common/ui/sidebar';
import SidebarDataGroup from './SidebarDataGroup';
import SidebarRFMSegmentationGroup from './SidebarRFMSegmentationGroup';
import SidebarSimulationGroup from './SidebarSimulationGroup';

export default function Sidebar() {
  const { activeDashboard } = useActiveDashboard();
  const onSimulation = activeDashboard === DashboardId.Simulation;
  return (
    <Base>
      <SidebarContent>
        {/* Go back to current simulation, later */}
        {onSimulation && <SidebarSimulationGroup />}
        {!onSimulation && <SidebarRFMSegmentationGroup />}
        {!onSimulation && <SidebarDataGroup />}
      </SidebarContent>
    </Base>
  );
}
