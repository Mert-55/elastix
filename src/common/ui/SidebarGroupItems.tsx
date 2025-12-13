import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/app/i18n';

import { Icon, type IconName } from './icon';
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './sidebar';

export function SidebarGroupItems({ items }: { items: GroupItems }) {
  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map(({ title, url, icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton asChild>
              <a href={url}>
                <Icon name={icon} />
                <span>{useFormatText({ id: title })}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

export type GroupItems = {
  title: MessageId;
  icon: IconName;
  url?: string;
}[];
