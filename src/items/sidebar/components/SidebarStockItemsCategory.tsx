import type { MessageId } from '@/common/i18n';
import type { CategoryAction, EditableGroupItems } from '@/common/types';
import { EditableSidebarGroupItems } from '@/common/ui/EditableSidebarGroupItems';
import EditPriceDifferenceDialog from '@/items/sidebar/components/EditPriceDifferenceDialog';
import SidebarGroupCategory from '@/items/sidebar/components/SidebarGroupCategory';
import StockItemActionsDropdown from '@/items/sidebar/components/StockItemActionsDropdown';
import { useSimulationActions } from '@/items/simulation/controller';
import { usePriceSimulation } from '@/items/simulation/hooks/PriceSimulationProvider';
import { useGetStockItemsQuery } from '@/services/hostApi';
import { useMemo, useState } from 'react';

export default function SidebarStockItemsCategory() {
  const [showPriceDifferenceDialog, setShowPriceDifferenceDialog] =
    useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<string | null>(
    null
  );
  const { settings } = usePriceSimulation();
  const { create } = useSimulationActions();
  const { data: stockItemsData } = useGetStockItemsQuery({});

  const stockItemItems: EditableGroupItems = useMemo(
    () =>
      stockItemsData?.items.map((item) => ({
        title: item.itemName,
        icon: 'boxes' as const,
      })) ?? [],
    [stockItemsData]
  );

  const handleEditPriceDifference = (itemTitle?: string) => {
    setSelectedStockItem(itemTitle ?? null);
    setShowPriceDifferenceDialog(true);
  };

  const handleRemoveItem = () => {
    setSelectedStockItem(null);
  };

  const handleSavePriceDifference = (newSettings: typeof settings) => {
    if (selectedStockItem) {
      create({
        name: `${selectedStockItem} Simulation`,
        stockItemRef: selectedStockItem,
        priceRange: [
          newSettings.lowerBound,
          newSettings.upperBound,
          newSettings.step,
        ],
      });
    }
    setShowPriceDifferenceDialog(false);
    setSelectedStockItem(null);
  };

  const handleAddStockItem = () => {
    setShowPriceDifferenceDialog(true);
  };

  const stockItemAction: CategoryAction = {
    icon: 'plus',
    label: 'dashboard.sidebar.simulations.stockItems.add',
    onClick: handleAddStockItem,
  };

  return (
    <>
      <SidebarGroupCategory
        groupAction={stockItemAction}
        label={stockItemLabel}
      >
        <EditableSidebarGroupItems items={stockItemItems}>
          <StockItemActionsDropdown
            onEditPriceDifference={() => handleEditPriceDifference()}
            onRemoveItem={handleRemoveItem}
          />
        </EditableSidebarGroupItems>
      </SidebarGroupCategory>
      <EditPriceDifferenceDialog
        open={showPriceDifferenceDialog}
        onOpenChange={setShowPriceDifferenceDialog}
        itemName={selectedStockItem ?? 'Stock Item'}
        onSave={handleSavePriceDifference}
        initialSettings={settings}
      />
    </>
  );
}

const stockItemLabel: MessageId =
  'dashboard.sidebar.simulations.stockItems.label';
