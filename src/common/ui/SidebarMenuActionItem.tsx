import { useFormatText } from '@/common/hooks/useFormatText';
import { resolveTranslatableText, type TranslatableText } from '@/common/types';
import { OptionalTooltip } from '@/common/ui/OptionalTooltip';
import type { IconName } from './icon';
import { Icon } from './icon';
import { SidebarMenuButton, SidebarMenuItem } from './sidebar';

export function SidebarMenuActionItem({
  icon,
  label,
  isActive,
  onSelect,
  tooltip,
  children,
  disabled = false,
}: SidebarMenuActionItemProps) {
  const translatedTooltipOrNull =
    tooltip && useFormatText(resolveTranslatableText(tooltip));
  return (
    <SidebarMenuItem>
      <OptionalTooltip tooltip={translatedTooltipOrNull} side="right">
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
      </OptionalTooltip>
      {children}
    </SidebarMenuItem>
  );
}

export type SidebarMenuActionItemProps = {
  icon: IconName;
  label: string;
  tooltip?: TranslatableText;
  isActive: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};
