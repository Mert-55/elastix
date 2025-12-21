import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';

import { useActiveDashboard } from '@/app/providers';
import type { DashboardId } from '@/common/types/DashboardIds';
import { Icon, type IconName } from './icon';
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';

export function SidebarGroupItems({ items }: { items: GroupItems }) {
  const { activeDashboard, setActiveDashboard } = useActiveDashboard();

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map(({ id, title, icon }) => {
          const isActive = id ? activeDashboard === id : false;
          const hasAction = !!id;

          const [titleKey, titleValues] =
            typeof title === 'string'
              ? [title, undefined]
              : [title.id, title.values];

          return (
            <SidebarMenuItem key={id || titleKey}>
              <SidebarMenuButton
                isActive={isActive}
                onClick={hasAction ? () => setActiveDashboard(id) : undefined}
                disabled={!hasAction}
              >
                <Icon
                  name={icon}
                  className="transition-all data-[active=true]:fill-primary data-[active=true]:stroke-primary"
                  data-active={isActive}
                />
                <span>
                  {useFormatText({ id: titleKey, values: titleValues })}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

export type GroupItems = {
  id?: DashboardId;
  title:
    | MessageId
    | { id: MessageId; values?: Record<string, string | number> };
  icon: IconName;
  url?: string;
}[];
