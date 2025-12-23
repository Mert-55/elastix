import type { DashboardId } from '@/common/types/DashboardIds';
import type { TranslatableText } from '@/common/types/TranslatableText';
import type { IconName } from '@/common/ui/icon';

export type EditableGroupItems = {
  id?: DashboardId;
  title: string;
  icon: IconName;
  tooltip?: TranslatableText;
  url?: string;
}[];
