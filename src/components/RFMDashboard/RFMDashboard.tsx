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
        'w-full px-6 grid grid-flow-row-dense grid-cols-7 gap-6 items-start mx-auto'
      )}
    >
      {/* TOP-Left Section: Actions and Segment Selection */}
      <RFMActionsSegmentsSection />
      {/* TOP-Right Section: KPI Overview */}
      <RFMKPISection
        segmentName={useFormatText({
          id: `${activeSegment}.text` as MessageId,
        })}
      />
      {/* FULL-WIDTH BOTTOM Section: Opportunity Matrix */}
      <RFMOpportunityMatrixSection />
    </main>
  );
}
