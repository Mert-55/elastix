import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { ScrollArea, ScrollBar } from '@/common/ui/scroll-area';
import { Skeleton } from '@/common/ui/skeleton';
import { useSegmentKPIOverview } from '@/items/rfm-elasticity/controller/segmentKPIController';
import type { RFMSegmentIds } from '@/items/rfm-elasticity/types/RFMSegmentId';
import {
  getRiskLevel,
  type RiskLevel,
} from '@/items/rfm-elasticity/types/RFMSegmentKPIData';
import KPIRadialGauge from './KPIRadialGauge';

const levelColors: Record<RiskLevel, string> = {
  low: 'var(--chart-2)',
  medium: 'var(--chart-4)',
  high: 'var(--chart-1)',
};

function KPIGaugeSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="w-[140px] h-[140px] rounded-full" />
      <Skeleton className="w-24 h-4" />
    </div>
  );
}

export interface SegmentKPIOverviewProps {
  activeSegmentId: RFMSegmentIds | null;
  className?: string;
}

export default function SegmentKPIOverview({
  activeSegmentId,
  className,
}: SegmentKPIOverviewProps) {
  const { kpiData, isLoading } = useSegmentKPIOverview(activeSegmentId);

  if (!activeSegmentId) {
    return null;
  }

  const priceSensitivityLabel = useFormatText({
    id: 'rfm.kpi.priceSensitivity.label',
  });
  const walletShareLabel = useFormatText({ id: 'rfm.kpi.walletShare.label' });
  const churnRiskLabel = useFormatText({ id: 'rfm.kpi.churnRisk.label' });

  if (isLoading || !kpiData) {
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
          <KPIGaugeSkeleton />
          <KPIGaugeSkeleton />
          <KPIGaugeSkeleton />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

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
          value={kpiData.priceSensitivity}
          label={priceSensitivityLabel}
          valueSuffix="%"
          color={levelColors[getRiskLevel(kpiData.priceSensitivity)]}
        />
        <KPIRadialGauge
          value={kpiData.walletShare}
          label={walletShareLabel}
          valueSuffix="%"
          color="var(--chart-3)"
        />
        <KPIRadialGauge
          value={kpiData.churnRisk}
          valueSuffix="%"
          label={churnRiskLabel}
          color={levelColors[getRiskLevel(kpiData.churnRisk)]}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
