import { useFormatText } from '@/common/hooks/useFormatText';
import { Button } from '@/common/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import DataGrid from '@/common/ui/data-grid';
import { Icon } from '@/common/ui/icon';
import { Input } from '@/common/ui/input';
import { Skeleton } from '@/common/ui/skeleton';
import { useGetStockItemsQuery } from '@/services/hostApi';
import type { StockItemDTO } from '@/services/types/dto';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useCallback, useEffect, useState } from 'react';

// Debounce delay in milliseconds
const SEARCH_DEBOUNCE_MS = 300;

export default function InlineStockItemPicker({
  onSelect,
}: InlineStockItemPickerProps) {
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

  const { data, isLoading, isFetching } = useGetStockItemsQuery({
    query: debouncedQuery || undefined,
    limit: 100,
  });

  const title = useFormatText({ id: 'simulation.stockItemPicker.title' });
  const description = useFormatText({
    id: 'simulation.stockItemPicker.description',
  });
  const selectLabel = useFormatText({ id: 'common.select' });
  const searchPlaceholder = useFormatText({
    id: 'simulation.stockItemPicker.searchPlaceholder',
  });

  // Server already returns items sorted by revenue_desc (relevance)
  const stockItems = data?.items ?? [];

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
    }
  }, [selectedItem, onSelect]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search Input */}
        <div className="relative mb-4">
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

        <div className="h-[500px] mb-4">
          {isLoading ? (
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Icon name="loader-circle" className="size-4 animate-spin" />
                <span>Loading stock items...</span>
              </div>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <DataGrid
              rowData={stockItems}
              columnDefs={columnDefs}
              onRowClicked={handleRowClicked}
              rowSelection="single"
              getRowClass={(params) =>
                params.data?.id === selectedItem?.id
                  ? 'bg-primary/10'
                  : undefined
              }
            />
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSelect} disabled={!selectedItem}>
            {selectLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type InlineStockItemPickerProps = {
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
