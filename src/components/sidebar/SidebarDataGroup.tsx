import { type GroupItems } from '../ui/SidebarGroupItems';
import SidebarGroupCathegory from './SidebarGroupCathegory';

export default function SidebarDataGroup() {
  return <SidebarGroupCathegory label={dataLabel} items={dataItems} />;
}

const dataLabel = 'dashboard.sidebar.data.label';

const dataItems: GroupItems = [
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
