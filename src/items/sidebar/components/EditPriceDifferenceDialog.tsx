import { useFormatText } from '@/common/hooks/useFormatText';
import { Button } from '@/common/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/common/ui/field';
import { Icon } from '@/common/ui/icon';
import { Input } from '@/common/ui/input';

export default function EditPriceDifferenceDialog({
  open,
  onOpenChange,
  itemName,
  onSave,
}: EditPriceDifferenceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Icon name="badge-percent" className="size-5" />
              {useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.title',
              })}
            </div>
          </DialogTitle>
          <DialogDescription>
            {useFormatText({
              id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.description',
              values: { itemName },
            })}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="py-3">
          <Field>
            <FieldLabel htmlFor="priceDifference">
              {useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.label',
              })}
            </FieldLabel>
            <Input
              id="priceDifference"
              name="priceDifference"
              type="number"
              placeholder={useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.placeholder',
              })}
              className="rounded-xl"
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl">
              {useFormatText({ id: 'common.cancel' })}
            </Button>
          </DialogClose>
          <Button type="submit" className="rounded-xl" onClick={onSave}>
            {useFormatText({
              id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.save',
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EditPriceDifferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  onSave: () => void;
}
