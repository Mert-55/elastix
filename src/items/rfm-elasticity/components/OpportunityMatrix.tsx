import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import DataGrid from '@/common/ui/data-grid';
import type {
  ElasticityType,
  OpportunityMatrixItem,
  PriceRecommendation,
} from '@/items/rfm-elasticity/types/OpportunityMatrixItem';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { useMemo } from 'react';

/**
 * Mock-Daten für die Opportunity Matrix
 * Gefiltert nach Segment, sortiert nach Umsatzpotenzial
 */
const mockOpportunityData: OpportunityMatrixItem[] = [
  // Champions
  {
    id: '1',
    itemName: 'Premium Organic Coffee',
    elasticity: -0.4,
    elasticityType: 'inelastic',
    purchaseFrequency: 12,
    revenuePotential: 8.5,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '2',
    itemName: 'Artisan Bread Loaf',
    elasticity: -0.6,
    elasticityType: 'inelastic',
    purchaseFrequency: 8,
    revenuePotential: 6.2,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '3',
    itemName: 'Fresh Salmon Fillet',
    elasticity: -0.8,
    elasticityType: 'inelastic',
    purchaseFrequency: 4,
    revenuePotential: 5.1,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '4',
    itemName: 'Imported Olive Oil',
    elasticity: -0.5,
    elasticityType: 'inelastic',
    purchaseFrequency: 3,
    revenuePotential: 4.8,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '5',
    itemName: 'Aged Parmesan Cheese',
    elasticity: -0.7,
    elasticityType: 'inelastic',
    purchaseFrequency: 5,
    revenuePotential: 4.2,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '6',
    itemName: 'Organic Milk',
    elasticity: -1.2,
    elasticityType: 'elastic',
    purchaseFrequency: 15,
    revenuePotential: -2.1,
    recommendation: 'hold',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '7',
    itemName: 'Free Range Eggs',
    elasticity: -1.1,
    elasticityType: 'elastic',
    purchaseFrequency: 10,
    revenuePotential: -1.5,
    recommendation: 'hold',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '8',
    itemName: 'Premium Organic Coffee',
    elasticity: -0.4,
    elasticityType: 'inelastic',
    purchaseFrequency: 12,
    revenuePotential: 8.5,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },
  {
    id: '9',
    itemName: 'Premium Organic Coffee',
    elasticity: -0.4,
    elasticityType: 'inelastic',
    purchaseFrequency: 12,
    revenuePotential: 8.5,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.Champion,
  },

  // Loyal Customers
  {
    id: '10',
    itemName: 'Whole Grain Pasta',
    elasticity: -0.5,
    elasticityType: 'inelastic',
    purchaseFrequency: 6,
    revenuePotential: 5.5,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.LoyalCustomers,
  },
  {
    id: '11',
    itemName: 'Greek Yogurt',
    elasticity: -0.6,
    elasticityType: 'inelastic',
    purchaseFrequency: 8,
    revenuePotential: 4.8,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.LoyalCustomers,
  },
  {
    id: '12',
    itemName: 'Almond Butter',
    elasticity: -0.7,
    elasticityType: 'inelastic',
    purchaseFrequency: 4,
    revenuePotential: 3.9,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.LoyalCustomers,
  },
  {
    id: '13',
    itemName: 'Fresh Berries Mix',
    elasticity: -1.3,
    elasticityType: 'elastic',
    purchaseFrequency: 7,
    revenuePotential: -3.2,
    recommendation: 'hold',
    segmentId: RFMSegmentIds.LoyalCustomers,
  },

  // Potential Loyalists
  {
    id: '14',
    itemName: 'Sparkling Water',
    elasticity: -0.9,
    elasticityType: 'inelastic',
    purchaseFrequency: 5,
    revenuePotential: 2.8,
    recommendation: 'hold',
    segmentId: RFMSegmentIds.PotentialLoyalists,
  },
  {
    id: '15',
    itemName: 'Granola Bars',
    elasticity: -1.1,
    elasticityType: 'elastic',
    purchaseFrequency: 4,
    revenuePotential: -1.8,
    recommendation: 'hold',
    segmentId: RFMSegmentIds.PotentialLoyalists,
  },
  {
    id: '16',
    itemName: 'Protein Powder',
    elasticity: -0.8,
    elasticityType: 'inelastic',
    purchaseFrequency: 2,
    revenuePotential: 3.5,
    recommendation: 'increase',
    segmentId: RFMSegmentIds.PotentialLoyalists,
  },

  // At Risk
  {
    id: '17',
    itemName: 'Budget Rice',
    elasticity: -1.5,
    elasticityType: 'elastic',
    purchaseFrequency: 3,
    revenuePotential: -4.5,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.AtRisk,
  },
  {
    id: '18',
    itemName: 'Store Brand Cereal',
    elasticity: -1.8,
    elasticityType: 'elastic',
    purchaseFrequency: 2,
    revenuePotential: -5.2,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.AtRisk,
  },
  {
    id: '19',
    itemName: 'Frozen Pizza',
    elasticity: -1.4,
    elasticityType: 'elastic',
    purchaseFrequency: 4,
    revenuePotential: -3.8,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.AtRisk,
  },

  // Hibernating
  {
    id: '20',
    itemName: 'Instant Noodles',
    elasticity: -2.0,
    elasticityType: 'elastic',
    purchaseFrequency: 1,
    revenuePotential: -6.5,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.Hibernating,
  },
  {
    id: '21',
    itemName: 'Canned Soup',
    elasticity: -1.6,
    elasticityType: 'elastic',
    purchaseFrequency: 2,
    revenuePotential: -4.8,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.Hibernating,
  },

  // Lost
  {
    id: '22',
    itemName: 'Generic Cola',
    elasticity: -2.5,
    elasticityType: 'elastic',
    purchaseFrequency: 1,
    revenuePotential: -8.2,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.Lost,
  },
  {
    id: '23',
    itemName: 'Budget Chips',
    elasticity: -2.2,
    elasticityType: 'elastic',
    purchaseFrequency: 1,
    revenuePotential: -7.1,
    recommendation: 'discount',
    segmentId: RFMSegmentIds.Lost,
  },
];

/**
 * Badge Komponente für Elastizitäts-Anzeige
 */
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
  // Daten nach Segment filtern und nach Umsatzpotenzial sortieren
  const filteredData = useMemo(() => {
    if (!activeSegmentId) return [];
    return mockOpportunityData
      .filter((item) => item.segmentId === activeSegmentId)
      .sort((a, b) => b.revenuePotential - a.revenuePotential);
  }, [activeSegmentId]);

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
    <div className={cn('h-full', className)}>
      <DataGrid<OpportunityMatrixItem>
        rowData={filteredData}
        columnDefs={columnDefs}
        domLayout="normal"
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
        rowSelection="single"
        suppressCellFocus
      />
    </div>
  );
}
