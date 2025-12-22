import type { DashboardId } from '@/common/types/DashboardIds';
import type { IconName } from '@/common/ui/icon';

export type SidebarGroupItemModel = {
  id?: DashboardId;
  icon: IconName;
  url?: string;
};

export type SidebarGroupItem<TTitle> = SidebarGroupItemModel & {
  title: TTitle;
};
