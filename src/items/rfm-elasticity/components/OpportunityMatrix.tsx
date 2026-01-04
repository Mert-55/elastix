import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import DataGrid from '@/common/ui/data-grid';
import { useOpportunityMatrix } from '@/items/rfm-elasticity/controller/opporunityMatrixController';
import type {
  ElasticityType,
  OpportunityMatrixItem,
  PriceRecommendation,
} from '@/items/rfm-elasticity/types/OpportunityMatrixItem';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

function ElasticityBadge({
  value,
  type,
}: {
  value: number;
  type: ElasticityType;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        type === 'inelastic'
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      )}
    >
      ε = {value.toFixed(2)}
    </span>
  );
}

/**
 * Recommendation Badge Komponente
 */
function RecommendationBadge({
  recommendation,
}: {
  recommendation: PriceRecommendation;
}) {
  const increaseLabel = useFormatText({
    id: 'rfm.opportunity.recommendation.increase',
  });
  const holdLabel = useFormatText({
    id: 'rfm.opportunity.recommendation.hold',
  });
  const discountLabel = useFormatText({
    id: 'rfm.opportunity.recommendation.discount',
  });

  const config: Record<
    PriceRecommendation,
    { label: string; className: string; icon: string }
  > = {
    increase: {
      label: increaseLabel ?? 'Increase Price',
      className:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      icon: '↑',
    },
    hold: {
      label: holdLabel ?? 'Hold Price',
      className:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: '→',
    },
    discount: {
      label: discountLabel ?? 'Discount',
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      icon: '↓',
    },
  };

  const { label, className, icon } = config[recommendation];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        className
      )}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}

export interface OpportunityMatrixProps {
  /** Das aktive Segment, nach dem gefiltert werden soll */
  activeSegmentId: RFMSegmentIds | null;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * OpportunityMatrix - Zeigt die Top-Items mit Umsatzpotenzial
 *
 * Features:
 * - Dynamische Filterung nach RFM-Segment
 * - Sortierung nach Umsatzpotenzial
 * - Farbcodierte Elastizitäts-Badges
 * - Preis-Empfehlungen
 */
export default function OpportunityMatrix({
  activeSegmentId,
  className,
}: OpportunityMatrixProps) {
  const {
    items,
    page,
    totalPages,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
    isFetching,
  } = useOpportunityMatrix(activeSegmentId);

  // Localized column headers
  const itemNameLabel =
    useFormatText({ id: 'rfm.opportunity.column.itemName' }) ?? 'Item Name';
  const elasticityLabel =
    useFormatText({ id: 'rfm.opportunity.column.elasticity' }) ??
    'Price Elasticity (ε)';
  const purchaseFrequencyLabel =
    useFormatText({ id: 'rfm.opportunity.column.purchaseFrequency' }) ??
    'Purchase Frequency';
  const revenuePotentialLabel =
    useFormatText({ id: 'rfm.opportunity.column.revenuePotential' }) ??
    'Revenue Potential';
  const recommendationLabel =
    useFormatText({ id: 'rfm.opportunity.column.recommendation' }) ??
    'Recommendation';
  const perMonthFormat =
    useFormatText({ id: 'rfm.opportunity.format.perMonth' }) ?? 'x / Month';

  // Spalten-Definition
  const columnDefs = useMemo<ColDef<OpportunityMatrixItem>[]>(
    () => [
      {
        field: 'itemName',
        headerName: itemNameLabel,
        flex: 2,
        minWidth: 180,
      },
      {
        field: 'elasticity',
        headerName: elasticityLabel,
        flex: 1,
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams<OpportunityMatrixItem>) => {
          if (!params.data) return null;
          return (
            <ElasticityBadge
              value={params.data.elasticity}
              type={params.data.elasticityType}
            />
          );
        },
      },
      {
        field: 'purchaseFrequency',
        headerName: purchaseFrequencyLabel,
        flex: 1,
        minWidth: 120,
        valueFormatter: (params) => `${params.value}${perMonthFormat}`,
      },
      {
        field: 'revenuePotential',
        headerName: revenuePotentialLabel,
        flex: 1,
        minWidth: 130,
        sort: 'desc',
        valueFormatter: (params) => {
          const val = params.value as number;
          const sign = val >= 0 ? '+' : '';
          return `${sign}${val.toFixed(1)}%`;
        },
        cellStyle: (params) => {
          const val = params.value as number;
          return {
            color: val >= 0 ? 'var(--chart-2)' : 'var(--chart-1)',
            fontWeight: 600,
          };
        },
      },
      {
        field: 'recommendation',
        headerName: recommendationLabel,
        flex: 1,
        minWidth: 140,
        cellRenderer: (params: ICellRendererParams<OpportunityMatrixItem>) => {
          if (!params.data) return null;
          return (
            <RecommendationBadge recommendation={params.data.recommendation} />
          );
        },
      },
    ],
    [
      itemNameLabel,
      elasticityLabel,
      purchaseFrequencyLabel,
      revenuePotentialLabel,
      recommendationLabel,
      perMonthFormat,
    ]
  );

  if (!activeSegmentId) {
    return null;
  }

  return (
    <div className={cn('h-full flex flex-col', className)}>
      <DataGrid<OpportunityMatrixItem>
        rowData={items}
        columnDefs={columnDefs}
        domLayout="normal"
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
        rowSelection="single"
        suppressCellFocus
        isLoading={isFetching}
      />
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            disabled={!hasPrev || isFetching}
          >
            <ChevronLeft className="h-2 w-2" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            disabled={!hasNext || isFetching}
          >
            <ChevronRight className="h-2 w-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
