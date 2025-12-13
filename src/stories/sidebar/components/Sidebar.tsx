import { Sidebar as Base, SidebarContent } from '@/common/ui/sidebar';
import SidebarDataGroup from './SidebarDataGroup';
import SidebarSegmentationGroup from './SidebarSegmentationGroup';
import SidebarSimulationGroup from './SidebarSimulationGroup';

export default function Sidebar() {
  return (
    <Base>
      <SidebarContent>
        <SidebarSimulationGroup />
        <SidebarSegmentationGroup />
        <SidebarDataGroup />
      </SidebarContent>
    </Base>
  );
}
