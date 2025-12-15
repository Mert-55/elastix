import tokens from '@/app/config/tokens';
import { useRFMSegment } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import type { MessageId } from '@/common/i18n';
import { cn } from '@/common/lib/utils';

import RFMActionsSegmentsSection from './RFMActionsSegmentsSection';
import RFMKPISection from './RFMKPISection';
import RFMOpportunityMatrixSection from './RFMOpportunityMatrixSection';

export default function RFMElasticityDashboard() {
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
