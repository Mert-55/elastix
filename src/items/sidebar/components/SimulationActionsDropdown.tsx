import { useFormatText } from '@/common/hooks/useFormatText';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/ui/dropdown-menu';
import { Icon } from '@/common/ui/icon';
import { SidebarMenuAction } from '@/common/ui/sidebar';

export default function SimulationActionsDropdown({
  onEditConfig,
  onChangeStockItem,
  onDelete,
}: SimulationActionsDropdownProps) {
  const editConfigLabel = useFormatText({
    id: 'simulation.sidebar.actions.editConfig',
  });
  const changeStockItemLabel = useFormatText({
    id: 'simulation.sidebar.actions.changeStockItem',
  });
  const deleteLabel = useFormatText({
    id: 'simulation.sidebar.actions.delete',
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <Icon name="more-horizontal" className="size-4" />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="rounded-xl">
        <DropdownMenuItem onSelect={onEditConfig}>
          <Icon name="badge-percent" className="size-4 mr-2" />
          <span>{editConfigLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onChangeStockItem}>
          <Icon name="boxes" className="size-4 mr-2" />
          <span>{changeStockItemLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Icon name="close" className="size-4 mr-2" />
          <span>{deleteLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SimulationActionsDropdownProps {
  onEditConfig: () => void;
  onChangeStockItem: () => void;
  onDelete: () => void;
}
