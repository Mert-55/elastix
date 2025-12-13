import { useFormatText } from '@/hooks/useFormatText';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item';

export function RFMSimulationActionItem() {
  return (
    <Item variant="muted" size="sm" className="w-fit gap-4">
      <ItemMedia variant="icon">
        <Icon name="elasticity-segmentation" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          {useFormatText({
            id: 'rfm.accordion.action.simulation.title',
          })}
        </ItemTitle>
        <ItemDescription>
          {useFormatText({
            id: 'rfm.accordion.action.simulation.description',
          })}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          {useFormatText({
            id: 'common.start',
          })}
        </Button>
      </ItemActions>
    </Item>
  );
}
