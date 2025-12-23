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

export default function StockItemActionsDropdown({
  onEditPriceDifference,
  onRemoveItem,
}: StockItemActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <Icon name="more-horizontal" className="size-4" />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="rounded-xl">
        <DropdownMenuItem onSelect={onEditPriceDifference}>
          <Icon name="badge-percent" className="size-4 mr-2" />
          <span>
            {useFormatText({
              id: 'dashboard.sidebar.simulations.stockItems.editPriceDifference',
            })}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onRemoveItem}>
          <Icon name="close" className="size-4 mr-2" />
          <span>
            {useFormatText({
              id: 'dashboard.sidebar.simulations.stockItems.removeItem',
            })}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface StockItemActionsDropdownProps {
  onEditPriceDifference: () => void;
  onRemoveItem: () => void;
}
