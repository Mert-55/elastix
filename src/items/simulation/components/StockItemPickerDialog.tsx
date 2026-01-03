import { useFormatText } from '@/common/hooks/useFormatText';
import { Button } from '@/common/ui/button';
import DataGrid from '@/common/ui/data-grid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/ui/dialog';
import { useGetStockItemsQuery } from '@/services/hostApi';
import type { StockItemDTO } from '@/services/types/dto';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useMemo, useState } from 'react';

export default function StockItemPickerDialog({
  open,
  onOpenChange,
  onSelect,
}: StockItemPickerDialogProps) {
  const { data, isLoading } = useGetStockItemsQuery({});
  const [selectedItem, setSelectedItem] = useState<StockItemDTO | null>(null);

  const title = useFormatText({ id: 'simulation.stockItemPicker.title' });
  const description = useFormatText({
    id: 'simulation.stockItemPicker.description',
  });
  const selectLabel = useFormatText({ id: 'common.select' });
  const cancelLabel = useFormatText({ id: 'common.cancel' });

  // Sort by revenue descending
  const stockItems = useMemo(() => {
    const items = data?.items ?? [];
    return [...items].sort(
      (a, b) => (b.revenuePotential ?? 0) - (a.revenuePotential ?? 0)
    );
  }, [data]);

  const handleRowClicked = (event: RowClickedEvent<StockItemDTO>) => {
    if (event.data) {
      setSelectedItem(event.data);
    }
  };

  const handleSelect = () => {
    if (selectedItem) {
      onSelect(selectedItem.id);
      onOpenChange(false);
      setSelectedItem(null);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedItem(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-scroll flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="h-[400px] min-h-0 flex-1 overflow-y-scroll rounded-xl">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          ) : (
            <DataGrid
              rowData={stockItems}
              columnDefs={columnDefs}
              onRowClicked={handleRowClicked}
              rowSelection="single"
              className="h-100"
            />
          )}
        </div>
        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={handleSelect} disabled={!selectedItem}>
            {selectLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type StockItemPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (stockItemRef: string) => void;
};

const columnDefs: ColDef<StockItemDTO>[] = [
  { field: 'itemName', headerName: 'Item Name', flex: 2, sortable: true },
  {
    field: 'revenuePotential',
    headerName: 'Revenue',
    width: 130,
    sortable: true,
    sort: 'desc',
    valueFormatter: (params) =>
      params.value ? `€${params.value.toLocaleString()}` : '-',
  },
  {
    field: 'purchaseFrequency',
    headerName: 'Units',
    width: 100,
    sortable: true,
    valueFormatter: (params) => params.value?.toLocaleString() ?? '-',
  },
  { field: 'elasticity', headerName: 'Elasticity', width: 100, sortable: true },
  { field: 'segment', headerName: 'Segment', width: 130, sortable: true },
];
