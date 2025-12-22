import { useActiveDashboard } from '@/app/providers';
import type { TranslatableGroupItems } from '@/common/types';
import {
  getTranslatableSidebarMenuItemKey,
  TranslatableSidebarMenuItem,
} from './TranslatableSidebarMenuItem';
import { SidebarGroupContent, SidebarMenu } from './sidebar';

export function TranslatableSidebarGroupItems({
  items,
}: {
  items: TranslatableGroupItems;
  translatable?: boolean;
}) {
  const { activeDashboard, setActiveDashboard } = useActiveDashboard();

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <TranslatableSidebarMenuItem
            key={getTranslatableSidebarMenuItemKey(item)}
            item={item}
            activeDashboard={activeDashboard}
            onSelect={setActiveDashboard}
          />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
