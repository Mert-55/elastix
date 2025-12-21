import { useActiveDashboard } from '@/app/providers';
import { useFormatText } from '@/common/hooks/useFormatText';
import { DashboardId } from '@/common/types/DashboardIds';
import { Button } from '@/common/ui/button';
import { Icon } from '@/common/ui/icon';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/common/ui/item';

export default function RFMSimulationActionItem() {
  const { setActiveDashboard } = useActiveDashboard();

  return (
    <Item
      variant="outline"
      size="sm"
      onClick={() => setActiveDashboard(DashboardId.Simulation)}
      className="w-fit gap-4 bg-linear-to-r from-primary/16 to-accent/32 ease-in hover:from-primary/24 hover:to-accent/12 hover:border-ring"
    >
      <ItemMedia variant="icon" className="bg-secondary border-ring rounded-xl">
        <Icon
          name="elasticity-segmentation"
          className="text-secondary-foreground"
        />
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
