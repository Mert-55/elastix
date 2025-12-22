import type { DashboardId } from '@/common/types/DashboardIds';
import type { IconName } from '@/common/ui/icon';

export type EditableGroupItems = {
  id?: DashboardId;
  title: string;
  icon: IconName;
  url?: string;
}[];
