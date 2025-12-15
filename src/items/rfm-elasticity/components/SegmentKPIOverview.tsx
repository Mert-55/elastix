import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { ScrollArea, ScrollBar } from '@/common/ui/scroll-area';
import { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import type {
  ChurnRiskLevel,
  PriceSensitivityLevel,
  RFMSegmentKPIData,
} from '@/items/rfm-elasticity/types/RFMSegmentKPIData';
import KPIRadialGauge from './KPIRadialGauge';

/**
 * Mock-Daten für die KPI-Anzeige
 * Diese Daten werden später von einem Hook/Backend bezogen
 */
const mockKPIDataBySegment: Record<RFMSegmentIds, RFMSegmentKPIData> = {
  [RFMSegmentIds.Champion]: {
    segmentId: RFMSegmentIds.Champion,
    priceSensitivity: { level: 'low', value: 25 },
    walletShare: { percentage: 45 },
    churnRisk: { level: 'low', value: 15 },
  },
  [RFMSegmentIds.LoyalCustomers]: {
    segmentId: RFMSegmentIds.LoyalCustomers,
    priceSensitivity: { level: 'low', value: 30 },
    walletShare: { percentage: 28 },
    churnRisk: { level: 'low', value: 20 },
  },
  [RFMSegmentIds.PotentialLoyalists]: {
    segmentId: RFMSegmentIds.PotentialLoyalists,
    priceSensitivity: { level: 'medium', value: 50 },
    walletShare: { percentage: 12 },
    churnRisk: { level: 'medium', value: 40 },
  },
  [RFMSegmentIds.AtRisk]: {
    segmentId: RFMSegmentIds.AtRisk,
    priceSensitivity: { level: 'high', value: 75 },
    walletShare: { percentage: 8 },
    churnRisk: { level: 'high', value: 70 },
  },
  [RFMSegmentIds.Hibernating]: {
    segmentId: RFMSegmentIds.Hibernating,
    priceSensitivity: { level: 'high', value: 80 },
    walletShare: { percentage: 4 },
    churnRisk: { level: 'high', value: 85 },
  },
  [RFMSegmentIds.Lost]: {
    segmentId: RFMSegmentIds.Lost,
    priceSensitivity: { level: 'high', value: 90 },
    walletShare: { percentage: 3 },
    churnRisk: { level: 'high', value: 95 },
  },
};

/**
 * Farben für die verschiedenen Level
 */
const levelColors: Record<PriceSensitivityLevel | ChurnRiskLevel, string> = {
  low: 'var(--chart-2)',
  medium: 'var(--chart-4)',
  high: 'var(--chart-1)',
};

/**
 * Props für die SegmentKPIOverview-Komponente
 */
export interface SegmentKPIOverviewProps {
  /** Das aktive Segment, für das KPIs angezeigt werden sollen */
  activeSegmentId: RFMSegmentIds | null;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * SegmentKPIOverview - Zeigt die drei Haupt-KPIs für ein RFM-Segment an
 *
 * KPIs:
 * - Segment-Preissensitivität: Zeigt ob man bei diesem Segment an der Preisschraube drehen kann
 * - Wallet Share: Prozentsatz des Gesamtumsatzes dieses Segments
 * - Abwanderungsrisiko (Churn Risk): Basierend auf dem Recency-Wert
 */
export default function SegmentKPIOverview({
  activeSegmentId,
  className,
}: SegmentKPIOverviewProps) {
  // Frühe Rückgabe wenn kein Segment ausgewählt ist
  if (!activeSegmentId) {
    return null;
  }

  // Mock-Daten holen - später durch Hook ersetzt
  const kpiData = mockKPIDataBySegment[activeSegmentId];

  if (!kpiData) {
    return null;
  }

  // Labels für die KPI-Anzeige
  const priceSensitivityLabel = useFormatText({
    id: 'rfm.kpi.priceSensitivity.label',
  });
  const walletShareLabel = useFormatText({ id: 'rfm.kpi.walletShare.label' });
  const churnRiskLabel = useFormatText({ id: 'rfm.kpi.churnRisk.label' });

  return (
    <ScrollArea
      className="w-full rounded-xl border whitespace-nowrap font-mono"
      type="always"
    >
      <div
        className={cn(
          'flex flex-nowrap items-center justify-center gap-8 p-7 bg-card/10 rounded-xl',
          className
        )}
      >
        <KPIRadialGauge
          value={kpiData.priceSensitivity.value}
          label={priceSensitivityLabel}
          valueSuffix="%"
          color={levelColors[kpiData.priceSensitivity.level]}
        />
        <KPIRadialGauge
          value={kpiData.walletShare.percentage}
          label={walletShareLabel}
          valueSuffix="%"
          color="var(--chart-3)"
        />
        <KPIRadialGauge
          value={kpiData.churnRisk.value}
          valueSuffix="%"
          label={churnRiskLabel}
          color={levelColors[kpiData.churnRisk.level]}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
