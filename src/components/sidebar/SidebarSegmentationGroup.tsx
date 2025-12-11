import { type GroupItems } from '../ui/SidebarGroupItems';
import SidebarGroupCathegory from './SidebarGroupCathegory';

export default function SidebarSegmentationGroup() {
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
    title: 'dashboard.segmentation.rfm.title',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'dashboard.segmentation.customer.title',
    icon: 'customer-segmentation',
  },
];
