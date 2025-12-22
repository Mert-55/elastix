import type { TranslatableText } from '@/common/types';
import type { CategoryAction } from '@/common/types/CategoryAction';
import { SidebarGroup as Base } from '@/common/ui/sidebar';
import SidebarCategoryAction from './SidebarCategoryAction';
import SidebarCategoryLabel from './SidebarCategoryLabel';

export default function SidebarGroupCategory({
  label,
  children,
  groupAction,
}: SidebarGroupCategory) {
  return (
    <Base>
      <SidebarCategoryLabel label={label} />
      {groupAction && <SidebarCategoryAction action={groupAction} />}
      {children}
    </Base>
  );
}

export type SidebarGroupCategory = {
  children?: React.ReactNode;
  label?: TranslatableText;
  groupAction?: CategoryAction;
};
