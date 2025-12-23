import { useActiveDashboard } from '@/app/providers';
import type { EditableGroupItems } from '@/common/types/EditableGroupItems';
import { EditableSidebarMenuItem } from '@/common/ui/EditableSidebarMenuItem';
import { MoreOrLessMenuItems } from '@/common/ui/MoreOrLessMenuItems';
import { useState } from 'react';
import { SidebarGroupContent, SidebarMenu } from './sidebar';

export function EditableSidebarGroupItems({
  items,
  children,
}: {
  items: EditableGroupItems;
  children?: React.ReactNode;
}) {
  const { activeDashboard, setActiveDashboard } = useActiveDashboard();
  const [viewMore, setViewMore] = useState(true);
  const reducedItems = reduceItems(items, viewMore);
  const hasMoreItems = items.length > REDUCED_ITEMS_COUNT;

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {reducedItems.map((item) => (
          <EditableSidebarMenuItem
            key={item.id ?? item.title}
            item={item}
            activeDashboard={activeDashboard}
            onSelect={setActiveDashboard}
          >
            {children}
          </EditableSidebarMenuItem>
        ))}
        {hasMoreItems && (
          <MoreOrLessMenuItems
            hiddenItemsCount={items.length - REDUCED_ITEMS_COUNT}
            viewMore={viewMore}
            onModeChange={() => setViewMore((prev) => !prev)}
          />
        )}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

const REDUCED_ITEMS_COUNT = 4;

const reduceItems = (items: EditableGroupItems, viewMore: boolean) => {
  if (viewMore) {
    return items;
  }
  return items.slice(0, REDUCED_ITEMS_COUNT);
};
