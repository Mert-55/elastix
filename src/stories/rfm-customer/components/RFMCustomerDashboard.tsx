import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';
import RFMCustomerTreeMapAccordionItem from '@/stories/rfm-customer/components/RFMCustomerTreeMapAccordionItem';
import { Accordion } from '@radix-ui/react-accordion';

export default function RFMCustomerDashboard() {
  return (
    <Accordion
      type="single"
      defaultValue="segment-treemap"
      collapsible
      className={cn(
        tokens.dashboardMaxWidth,
        'w-full h-full mx-auto px-6 pb-6 md:overflow-hidden'
      )}
    >
      <RFMCustomerTreeMapAccordionItem />
    </Accordion>
  );
}
