import type { DashboardId } from '@/common/types/DashboardIds';
import type { EditableGroupItems } from '@/common/types/EditableGroupItems';
import { SidebarMenuActionItem } from './SidebarMenuActionItem';

export function EditableSidebarMenuItem({
  item,
  activeDashboard,
  children,
  onSelect,
}: EditableSidebarMenuItemProps) {
  const { id, icon, title, tooltip } = item;
  const hasAction = Boolean(id);
  const isActive = hasAction && activeDashboard === id;
  const handleSelect = hasAction && id ? () => onSelect(id) : undefined;

  return (
    <SidebarMenuActionItem
      icon={icon}
      label={title}
      tooltip={tooltip}
      isActive={isActive}
      onSelect={handleSelect}
      disabled={!hasAction}
    >
      {children}
    </SidebarMenuActionItem>
  );
}

export type EditableGroupItem = EditableGroupItems[number];

export type EditableSidebarMenuItemProps = {
  item: EditableGroupItem;
  activeDashboard: DashboardId;
  children?: React.ReactNode;
  onSelect: (dashboardId: DashboardId) => void;
};
