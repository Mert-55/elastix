import { useFormatText } from '@/hooks/useFormatText';
import type { MessageId } from '@/i18n';

import { SidebarGroup as Base, SidebarGroupLabel } from '../ui/sidebar';
import { type GroupItems,SidebarGroupItems } from '../ui/SidebarGroupItems';

export default function SidebarGroupCathegory({
  label,
  items,
}: SidebarGroupCathegory) {
  return (
    <Base>
      {label && (
        <SidebarGroupLabel>
          {useFormatText({
            id: label,
          })}
        </SidebarGroupLabel>
      )}
      <SidebarGroupItems items={items} />
    </Base>
  );
}

export type SidebarGroupCathegory = { label?: MessageId; items: GroupItems };
