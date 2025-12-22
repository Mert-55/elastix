import type { TranslatableGroupItems } from '@/common/types';
import { DashboardId } from '@/common/types/DashboardIds';
import { TranslatableSidebarGroupItems } from '@/common/ui/TranslatableSidebarGroupItems';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';

export default function SidebarActionsGroup() {
  const simulationItems: TranslatableGroupItems = [
    {
      id: DashboardId.RFMElasticity,
      title: 'dashboard.segmentation.rfm-elasticity.title',
      icon: 'back',
    },
  ];

  return (
    <SidebarGroupCategory label={'dashboard.sidebar.actions.label'}>
      <TranslatableSidebarGroupItems items={simulationItems} />
    </SidebarGroupCategory>
  );
}
