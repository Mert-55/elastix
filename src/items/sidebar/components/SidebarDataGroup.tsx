import type { TranslatableGroupItems } from '@/common/types';
import { TranslatableSidebarGroupItems } from '@/common/ui/TranslatableSidebarGroupItems';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';

export default function SidebarDataGroup() {
  return (
    <SidebarGroupCategory label={dataLabel}>
      <TranslatableSidebarGroupItems items={dataItems} />
    </SidebarGroupCategory>
  );
}

const dataLabel = 'dashboard.sidebar.data.label';

const dataItems: TranslatableGroupItems = [
  {
    title: 'dashboard.sidebar.data.customer.title',
    icon: 'customer-data',
  },
  {
    title: 'dashboard.sidebar.data.stock.title',
    icon: 'stock-data',
  },
  {
    title: 'dashboard.sidebar.data.transaction.title',
    icon: 'transaction-data',
  },
];
