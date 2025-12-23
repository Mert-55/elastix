import type { MessageId } from '@/common/i18n';
import type { CategoryAction, EditableGroupItems } from '@/common/types';
import { EditableSidebarGroupItems } from '@/common/ui/EditableSidebarGroupItems';
import EditPriceDifferenceDialog from '@/items/sidebar/components/EditPriceDifferenceDialog';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';
import StockItemActionsDropdown from '@/items/sidebar/components/StockItemActionsDropdown';
import { useState } from 'react';

export default function SidebarStockItemsCategory() {
  const [showPriceDifferenceDialog, setShowPriceDifferenceDialog] =
    useState(false);

  const handleEditPriceDifference = () => {
    setShowPriceDifferenceDialog(true);
  };

  const handleRemoveItem = () => {
    // TODO: Implement remove item logic
  };

  const handleSavePriceDifference = () => {
    // TODO: Implement save logic
    setShowPriceDifferenceDialog(false);
  };

  return (
    <>
      <SidebarGroupCategory
        groupAction={stockItemAction}
        label={stockItemLabel}
      >
        <EditableSidebarGroupItems items={stockItemItems}>
          <StockItemActionsDropdown
            onEditPriceDifference={handleEditPriceDifference}
            onRemoveItem={handleRemoveItem}
          />
        </EditableSidebarGroupItems>
      </SidebarGroupCategory>
      <EditPriceDifferenceDialog
        open={showPriceDifferenceDialog}
        onOpenChange={setShowPriceDifferenceDialog}
        itemName="the selected stock item"
        onSave={handleSavePriceDifference}
      />
    </>
  );
}

const stockItemAction: CategoryAction = {
  icon: 'plus',
  label: 'dashboard.sidebar.simulations.stockItems.add',
  onClick: () => {},
};

const stockItemLabel: MessageId =
  'dashboard.sidebar.simulations.stockItems.label';
const stockItemItems: EditableGroupItems = [
  {
    title: 'Untitled Stock Item',
    icon: 'boxes',
  },
  {
    title: 'Gold Watch',
    icon: 'boxes',
    tooltip: {
      id: 'dashboard.sidebar.simulations.stockItems.tooltip',
      values: { priceDifference: '+5%' },
    },
  },
  {
    title: 'Toaster',
    icon: 'boxes',
    tooltip: {
      id: 'dashboard.sidebar.simulations.stockItems.tooltip',
      values: { priceDifference: '-15%' },
    },
  },
];
