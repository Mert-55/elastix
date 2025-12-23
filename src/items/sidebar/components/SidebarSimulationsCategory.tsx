import type { CategoryAction, EditableGroupItems } from '@/common/types';
import { EditableSidebarGroupItems } from '@/common/ui/EditableSidebarGroupItems';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';

export default function SidebarSimulationsCategory() {
  return (
    <SidebarGroupCategory
      groupAction={simulationsAction}
      label={simulationsLabel}
    >
      <EditableSidebarGroupItems items={simulationItems} />
    </SidebarGroupCategory>
  );
}

const simulationsLabel = 'dashboard.sidebar.simulations.label';
const simulationsAction: CategoryAction = {
  icon: 'plus',
  label: 'dashboard.sidebar.simulations.add',
  onClick: () => {},
};
const simulationItems: EditableGroupItems = [
  {
    title: 'Untitled Simulation 1',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 2',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 3',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 4',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 5',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 6',
    icon: 'elasticity-segmentation',
  },
  {
    title: 'Untitled Simulation 7',
    icon: 'elasticity-segmentation',
  },
];
