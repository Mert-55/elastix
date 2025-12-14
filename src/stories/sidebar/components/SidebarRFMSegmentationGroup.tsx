import { DashboardId } from '@/common/types/DashboardIds';
import { type GroupItems } from '@/common/ui/SidebarGroupItems';
import SidebarGroupCathegory from './SidebarGroupCathegory';

export default function SidebarRFMSegmentationGroup() {
  return (
    <SidebarGroupCathegory
      label={segmentationLabel}
      items={segmentationItems}
    />
  );
}

const segmentationLabel = 'dashboard.sidebar.segmentation.label';

const segmentationItems: GroupItems = [
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
