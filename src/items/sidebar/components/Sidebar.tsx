import { useActiveDashboard } from '@/app/providers/ActiveDashboardProvider';
import { DashboardId } from '@/common/types/DashboardIds';
import { Sidebar as ShadncSidebar, SidebarContent } from '@/common/ui/sidebar';
import SidebarSimulationsCategory from '@/items/sidebar/components/SidebarSimulationsCategory';
import SidebarStockItemsCategory from '@/items/sidebar/components/SidebarStockItemsCategory';
import SidebarActionsGroup from './SidebarActionsGroup';
import SidebarDataGroup from './SidebarDataGroup';
import SidebarRFMSegmentationGroup from './SidebarRFMSegmentationGroup';

export default function Sidebar() {
  const { activeDashboard } = useActiveDashboard();
  const onSimulation = activeDashboard === DashboardId.Simulation;

  const Content = ({ children }: { children: React.ReactNode }) => (
    <ShadncSidebar>
      <SidebarContent>{children}</SidebarContent>
    </ShadncSidebar>
  );

  const SimulationSidebarContent = () => (
    <Content>
      <SidebarActionsGroup />
      <SidebarSimulationsCategory />
      <SidebarStockItemsCategory />
    </Content>
  );

  const RFMDashboardSidebarContent = () => (
    <Content>
      <SidebarRFMSegmentationGroup />
      <SidebarDataGroup />
    </Content>
  );

  return onSimulation ? (
    <SimulationSidebarContent />
  ) : (
    <RFMDashboardSidebarContent />
  );
}
