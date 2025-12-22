import { useFormatText } from '@/common/hooks/useFormatText';
import type { DashboardId } from '@/common/types/DashboardIds';
import type { TranslatableGroupItem } from '@/common/types/TranslatableGroupItems';
import { resolveTranslatableText } from '@/common/types/TranslatableText';
import { SidebarMenuActionItem } from './SidebarMenuActionItem';

export type TranslatableSidebarMenuItemProps = {
  item: TranslatableGroupItem;
  activeDashboard: DashboardId;
  onSelect: (dashboardId: DashboardId) => void;
};

export function getTranslatableSidebarMenuItemKey(item: TranslatableGroupItem) {
  const { id } = resolveTranslatableText(item.title);
  return item.id ?? id;
}

export function TranslatableSidebarMenuItem({
  item,
  activeDashboard,
  onSelect,
}: TranslatableSidebarMenuItemProps) {
  const { id, icon, title } = item;
  const { id: titleKey, values: titleValues } = resolveTranslatableText(title);

  const translatedTitle = useFormatText({
    id: titleKey,
    values: titleValues,
  });
  const { isActive, disabled, handleSelect } = getSidebarMenuItemBehavior({
    itemId: id,
    activeDashboard,
    onSelect,
  });

  return (
    <SidebarMenuActionItem
      icon={icon}
      label={translatedTitle}
      isActive={isActive}
      onSelect={handleSelect}
      disabled={disabled}
    />
  );
}

type SidebarMenuItemBehaviorOptions = {
  itemId?: DashboardId;
  activeDashboard: DashboardId;
  onSelect: (dashboardId: DashboardId) => void;
};

type SidebarMenuItemBehavior = {
  disabled: boolean;
  isActive: boolean;
  handleSelect?: () => void;
};

function getSidebarMenuItemBehavior({
  itemId,
  activeDashboard,
  onSelect,
}: SidebarMenuItemBehaviorOptions): SidebarMenuItemBehavior {
  if (!itemId) {
    return { disabled: true, isActive: false };
  }

  const isActive = activeDashboard === itemId;

  return {
    disabled: false,
    isActive,
    handleSelect: () => onSelect(itemId),
  };
}
