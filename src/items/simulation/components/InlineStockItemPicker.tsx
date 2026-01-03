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
import { Skeleton } from '@/common/ui/skeleton';
import { useGetStockItemsQuery } from '@/services/hostApi';
import type { StockItemDTO } from '@/services/types/dto';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useMemo, useState } from 'react';

export default function InlineStockItemPicker({
  onSelect,
}: InlineStockItemPickerProps) {
  const { data, isLoading } = useGetStockItemsQuery({});
  const [selectedItem, setSelectedItem] = useState<StockItemDTO | null>(null);

  const title = useFormatText({ id: 'simulation.stockItemPicker.title' });
  const description = useFormatText({
    id: 'simulation.stockItemPicker.description',
  });
  const selectLabel = useFormatText({ id: 'common.select' });

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
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
