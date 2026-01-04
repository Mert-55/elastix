import { cn } from '@/common/lib/utils';
import { themeQuartz } from 'ag-grid-community';
import type { AgGridReactProps } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export interface DataGridProps<TData> extends Omit<
  AgGridReactProps<TData>,
  'theme'
> {
  className?: string;
  height?: string | number;
  isLoading?: boolean;
}

export default function DataGrid<TData>({
  className,
  rowData,
  columnDefs,
  defaultColDef,
  isLoading,
  ...props
}: DataGridProps<TData>) {
  const theme = themeQuartz.withParams({
    accentColor: 'var(--primary)',
    backgroundColor: 'var(--muted-item)',
    browserColorScheme: 'light',
    chromeBackgroundColor: 'var(--muted-item)',
    foregroundColor: 'var(--foreground)',
    headerFontSize: 14,
    headerBackgroundColor: 'var(--muted-item)',
    headerFontFamily: 'var(--font-mono)',
    headerFontWeight: 'var(--font-weight-semibold)',
    borderColor: 'transparent',
    wrapperBorderRadius: 'var(--radius-xl)',
  });

  const mergedDefaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      ...defaultColDef,
    }),
    [defaultColDef]
  );

  return (
    <div
      className={cn('relative w-full min-h-0 max-h-full h-[600px]', className)}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <AgGridReact<TData>
        theme={theme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={mergedDefaultColDef}
        animateRows
        {...props}
      />
    </div>
  );
}
