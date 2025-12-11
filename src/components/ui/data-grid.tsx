import { AgGridReact } from 'ag-grid-react';
import type { AgGridReactProps } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

/**
 * AG Grid Theme das unsere CSS-Variablen nutzt
 * Funktioniert automatisch mit Light/Dark Mode
 */
const lightTheme = themeQuartz.withParams({
  accentColor: 'var(--primary)',
  backgroundColor: 'var(--card)',
  browserColorScheme: 'light',
  chromeBackgroundColor: 'var(--muted)',
  foregroundColor: 'var(--foreground)',
  headerFontSize: 14,
  oddRowBackgroundColor: 'var(--muted)',
  borderColor: 'var(--border)',
});

const darkTheme = themeQuartz.withParams({
  accentColor: 'var(--primary)',
  backgroundColor: 'var(--card)',
  browserColorScheme: 'dark',
  chromeBackgroundColor: 'var(--muted)',
  foregroundColor: 'var(--foreground)',
  headerFontSize: 14,
  oddRowBackgroundColor: 'var(--muted)',
  borderColor: 'var(--border)',
});

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
  height = 400,
  rowData,
  columnDefs,
  defaultColDef,
  ...props
}: DataGridProps<TData>) {
  // Detect dark mode
  const isDarkMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

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
      className={cn('w-full rounded-md overflow-hidden', className)}
      style={{ height }}
    >
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
