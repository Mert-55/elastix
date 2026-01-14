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
import { Icon } from '@/common/ui/icon';
import { Input } from '@/common/ui/input';
import { useGetStockItemsQuery } from '@/services/hostApi';
import type { StockItemDTO } from '@/services/types/dto';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Debounce delay in milliseconds
const SEARCH_DEBOUNCE_MS = 300;

export default function StockItemPickerDialog({
  open,
  onOpenChange,
  onSelect,
}: StockItemPickerDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<StockItemDTO | null>(null);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setDebouncedQuery('');
    }
  }, [open]);

  const { data, isLoading, isFetching } = useGetStockItemsQuery({
    query: debouncedQuery || undefined,
    limit: 100,
  });

  const title = useFormatText({ id: 'simulation.stockItemPicker.title' });
  const description = useFormatText({
    id: 'simulation.stockItemPicker.description',
  });
  const selectLabel = useFormatText({ id: 'common.select' });
  const cancelLabel = useFormatText({ id: 'common.cancel' });
  const searchPlaceholder = useFormatText({
    id: 'simulation.stockItemPicker.searchPlaceholder',
  });

  // Sort by revenue descending
  const stockItems = useMemo(() => {
    const items = data?.items ?? [];
    return [...items].sort(
      (a, b) => (b.revenuePotential ?? 0) - (a.revenuePotential ?? 0)
    );
  }, [data]);

  const handleRowClicked = useCallback(
    (event: RowClickedEvent<StockItemDTO>) => {
      if (event.data) {
        setSelectedItem(event.data);
      }
    },
    []
  );

  const handleSelect = useCallback(() => {
    if (selectedItem) {
      onSelect(selectedItem.id);
      onOpenChange(false);
      setSelectedItem(null);
    }
  }, [selectedItem, onSelect, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
    setSelectedItem(null);
  }, [onOpenChange]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-scroll flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-2">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9 pr-9"
          />
          {isFetching && (
            <Icon
              name="loader-circle"
              className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin"
            />
          )}
        </div>

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
