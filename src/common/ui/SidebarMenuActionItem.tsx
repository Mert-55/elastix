import type { IconName } from './icon';
import { Icon } from './icon';
import { SidebarMenuButton, SidebarMenuItem } from './sidebar';

export function SidebarMenuActionItem({
  icon,
  label,
  isActive,
  onSelect,
  disabled = false,
}: SidebarMenuActionItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        onClick={onSelect}
        disabled={disabled}
      >
        <Icon
          name={icon}
          className="transition-all data-[active=true]:fill-primary data-[active=true]:stroke-primary"
          data-active={isActive}
        />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export type SidebarMenuActionItemProps = {
  icon: IconName;
  label: string;
  isActive: boolean;
  onSelect?: () => void;
  disabled?: boolean;
};
