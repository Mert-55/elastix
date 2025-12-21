import { DashboardId } from '@/common/types/DashboardIds';
import { type GroupItems } from '@/common/ui/SidebarGroupItems';
import SidebarGroupCathegory from './SidebarGroupCathegory';

export default function SidebarSimulationGroup() {
  const simulationItems: GroupItems = [
    {
      id: DashboardId.RFMElasticity,
      title: 'dashboard.segmentation.rfm-elasticity.title',
      icon: 'back',
    },
  ];

  return (
    <SidebarGroupCathegory
      label={'dashboard.sidebar.actions.label'}
      items={simulationItems}
    />
  );
}
