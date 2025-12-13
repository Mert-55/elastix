import { cn } from '@/lib/utils';
import tokens from '@/constants/tokens';
import type { MessageId } from '@/i18n';
import { useFormatText } from '@/hooks/useFormatText';
import { useRFMSegment } from '@/providers';

import RFMActionsSegmentsSection from './RFMActionsSegmentsSection';
import RFMKPISection from './RFMKPISection';
import RFMOpportunityMatrixSection from './RFMOpportunityMatrixSection';

export default function RFMDashboard() {
  const { activeSegment } = useRFMSegment();
  return (
    <main
      className={cn(
        tokens.dashboardMaxWidth,
        'w-full h-full mx-auto px-6 pb-6 grid grid-flow-row-dense md:grid-cols-subgrid md:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-7 gap-4 md:overflow-hidden' //'h-full w-full px-6 pb-6 mx-auto grid grid-cols-7 grid-rows-[auto_1fr] gap-6'
      )}
    >
      <RFMActionsSegmentsSection />
      <RFMKPISection
        segmentName={useFormatText({
          id: `${activeSegment}.text` as MessageId,
        })}
      />
      <RFMOpportunityMatrixSection />
    </main>
  );
}
