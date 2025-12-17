import { useFormatText } from '@/common/hooks/useFormatText';
import { CardHeader, CardTitle } from '@/common/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';
import { FilterDayId } from '@/items/rfm-customer/types/FilterDayId';

interface SegmentCardHeaderProps {
  /** Currently selected time range filter */
  timeRange: FilterDayId;
  /** Callback to update time range */
  setTimeRange: (timeRange: FilterDayId) => void;
}

/**
 * Card header with title and time range filter selector
 */
export default function SegmentCardHeader({
  timeRange,
  setTimeRange,
}: SegmentCardHeaderProps) {
  return (
    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 font-mono sm:flex-row">
      <div className="grid flex-1 gap-1">
        <CardTitle>
          {useFormatText({
            id: 'rfm.customer.area-chart.description',
            values: { days: timeRange.slice(0, -1) },
          })}
        </CardTitle>
      </div>
      <Select
        value={timeRange}
        onValueChange={setTimeRange as (value: string) => void}
      >
        <SelectTrigger
          className="hidden w-[160px] rounded-xl sm:ml-auto sm:flex"
          aria-label={useFormatText({
            id: 'rfm.customer.area-chart.time-range.aria-label',
          })}
        >
          <SelectValue
            placeholder={useFormatText({
              id: 'rfm.customer.area-chart.time-range.3-months',
            })}
          />
        </SelectTrigger>
        <SelectContent className="rounded-xl font-mono">
          <SelectItem value={FilterDayId.ONE_YEAR} className="rounded-lg">
            {useFormatText({
              id: 'rfm.customer.area-chart.time-range.1-year',
            })}
          </SelectItem>
          <SelectItem value={FilterDayId.SIX_MONTHS} className="rounded-lg">
            {useFormatText({
              id: 'rfm.customer.area-chart.time-range.6-months',
            })}
          </SelectItem>
          <SelectItem value={FilterDayId.THREE_MONTHS} className="rounded-lg">
            {useFormatText({
              id: 'rfm.customer.area-chart.time-range.3-months',
            })}
          </SelectItem>
          <SelectItem value={FilterDayId.MONTH} className="rounded-lg">
            {useFormatText({
              id: 'rfm.customer.area-chart.time-range.30-days',
            })}
          </SelectItem>
          <SelectItem value={FilterDayId.WEEK} className="rounded-lg">
            {useFormatText({
              id: 'rfm.customer.area-chart.time-range.7-days',
            })}
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
  );
}
