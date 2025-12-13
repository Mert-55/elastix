import { AgGridReact } from 'ag-grid-react';
import type { AgGridReactProps } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { useMemo } from 'react';
import { cn } from '@/common/lib/utils';

export interface DataGridProps<TData> extends Omit<
  AgGridReactProps<TData>,
  'theme'
> {
  /** Zusätzliche CSS-Klassen für den Container */
  className?: string;
  /** Höhe des Grids (default: 400px) */
  height?: string | number;
}

/**
 * Wiederverwendbare DataGrid Komponente basierend auf AG Grid
 * Nutzt automatisch das richtige Theme basierend auf dem aktuellen Color Scheme
 */
export default function DataGrid<TData>({
  className,
  rowData,
  columnDefs,
  defaultColDef,
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
    borderColor: 'transparent',
    wrapperBorderRadius: 'var(--radius-md)',
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
    <div className={cn('w-full min-h-0 max-h-full h-[400px]', className)}>
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
