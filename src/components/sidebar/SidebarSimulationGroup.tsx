import { type GroupItems } from '../ui/SidebarGroupItems';
import SidebarGroupCathegory from './SidebarGroupCathegory';

export default function SidebarSimulationGroup() {
  return <SidebarGroupCathegory items={simulationItems} />;
}

const simulationItems: GroupItems = [];
