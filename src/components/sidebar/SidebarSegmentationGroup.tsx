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
    title: 'dashboard.sidebar.segmentation.rfm.title',
    icon: 'customer-segmentation',
  },
  {
    title: 'dashboard.sidebar.segmentation.elasticity.title',
    icon: 'elasticity-segmentation',
  },
];
