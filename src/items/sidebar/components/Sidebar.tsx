import { Sidebar as Base, SidebarContent } from '@/common/ui/sidebar';
import SidebarDataGroup from './SidebarDataGroup';
import SidebarRFMSegmentationGroup from './SidebarRFMSegmentationGroup';
import SidebarSimulationGroup from './SidebarSimulationGroup';

export default function Sidebar() {
  return (
    <Base>
      <SidebarContent>
        <SidebarSimulationGroup />
        <SidebarRFMSegmentationGroup />
        <SidebarDataGroup />
      </SidebarContent>
    </Base>
  );
}
