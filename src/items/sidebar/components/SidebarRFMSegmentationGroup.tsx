import type { TranslatableGroupItems } from '@/common/types';
import { DashboardId } from '@/common/types/DashboardIds';
import { TranslatableSidebarGroupItems } from '@/common/ui/TranslatableSidebarGroupItems';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';

export default function SidebarRFMSegmentationGroup() {
  return (
    <SidebarGroupCategory label={segmentationLabel}>
      <TranslatableSidebarGroupItems items={segmentationItems} />
    </SidebarGroupCategory>
  );
}

const segmentationLabel = 'dashboard.sidebar.segmentation.label';

const segmentationItems: TranslatableGroupItems = [
  {
    id: DashboardId.RFMElasticity,
    title: 'dashboard.segmentation.rfm-elasticity.title',
    icon: 'elasticity-segmentation',
  },
  {
    id: DashboardId.RFMCustomer,
    title: 'dashboard.segmentation.rfm-customer.title',
    icon: 'customer-segmentation',
  },
];
