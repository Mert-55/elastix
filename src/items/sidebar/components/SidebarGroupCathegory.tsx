import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';

import { SidebarGroup as Base, SidebarGroupLabel } from '@/common/ui/sidebar';
import {
  type GroupItems,
  SidebarGroupItems,
} from '@/common/ui/SidebarGroupItems';

export default function SidebarGroupCathegory({
  label,
  items,
}: SidebarGroupCathegory) {
  return (
    <Base>
      {label && (
        <SidebarGroupLabel>{useFormatText({ id: label })}</SidebarGroupLabel>
      )}
      <SidebarGroupItems items={items} />
    </Base>
  );
}

export type SidebarGroupCathegory = {
  label?: MessageId;
  items: GroupItems;
};
