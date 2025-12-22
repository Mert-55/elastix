import type { DashboardId } from '@/common/types/DashboardIds';
import type { EditableGroupItems } from '@/common/types/EditableGroupItems';
import { SidebarMenuActionItem } from './SidebarMenuActionItem';

export function EditableSidebarMenuItem({
  item,
  activeDashboard,
  onSelect,
}: EditableSidebarMenuItemProps) {
  const { id, icon, title } = item;
  const hasAction = Boolean(id);
  const isActive = hasAction && activeDashboard === id;
  const handleSelect = hasAction && id ? () => onSelect(id) : undefined;

  return (
    <SidebarMenuActionItem
      icon={icon}
      label={title}
      isActive={isActive}
      onSelect={handleSelect}
      disabled={!hasAction}
    />
  );
}

export type EditableGroupItem = EditableGroupItems[number];

export type EditableSidebarMenuItemProps = {
  item: EditableGroupItem;
  activeDashboard: DashboardId;
  onSelect: (dashboardId: DashboardId) => void;
};
