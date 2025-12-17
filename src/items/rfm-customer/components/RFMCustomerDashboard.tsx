import tokens from '@/app/config/tokens';
import { cn } from '@/common/lib/utils';
import RFMCustomerAreaChartAccordionItem from '@/items/rfm-customer/components/RFMCustomerAreaChartAccordionItem';
import RFMCustomerTreeMapAccordionItem from '@/items/rfm-customer/components/RFMCustomerTreeMapAccordionItem';
import { Accordion } from '@radix-ui/react-accordion';

export default function RFMCustomerDashboard() {
  return (
    <Accordion
      type="single"
      defaultValue={'segment-tree-map'}
      className={cn(
        tokens.dashboardMaxWidth,
        'w-full h-auto mx-auto px-6 pb-6 md:overflow-hidden'
      )}
    >
      <RFMCustomerTreeMapAccordionItem />
      <RFMCustomerAreaChartAccordionItem />
    </Accordion>
  );
}
