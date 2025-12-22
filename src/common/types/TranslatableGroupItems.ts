import type { SidebarGroupItem } from '@/common/types/SidebarGroupItemModel';
import type { TranslatableText } from '@/common/types/TranslatableText';

export type TranslatableGroupItem = SidebarGroupItem<TranslatableText>;

export type TranslatableGroupItems = TranslatableGroupItem[];
