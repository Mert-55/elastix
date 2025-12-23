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
import type { SimulationSettings } from '@/items/simulation/hooks/usePriceSimulationSettings';
import { useState } from 'react';

export default function EditPriceDifferenceDialog({
  open,
  onOpenChange,
  itemName,
  onSave,
  initialSettings,
}: EditPriceDifferenceDialogProps) {
  const [lowerBound, setLowerBound] = useState(
    initialSettings?.lowerBound ?? -20
  );
  const [upperBound, setUpperBound] = useState(
    initialSettings?.upperBound ?? 20
  );
  const [step, setStep] = useState(initialSettings?.step ?? 5);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    // Simple validation
    if (lowerBound < -30) {
      setError('Lower bound cannot be less than -30%');
      return;
    }
    if (upperBound > 30) {
      setError('Upper bound cannot be greater than 30%');
      return;
    }
    if (lowerBound >= upperBound) {
      setError('Lower bound must be less than upper bound');
      return;
    }
    if (step <= 0) {
      setError('Step must be greater than 0');
      return;
    }
    if (step > upperBound - lowerBound) {
      setError('Step is too large for the given range');
      return;
    }

    setError(null);
    onSave({ lowerBound, upperBound, step });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
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
        <FieldGroup className="py-3 gap-4">
          <Field>
            <FieldLabel htmlFor="lowerBound">
              {useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerBound',
              })}
            </FieldLabel>
            <Input
              id="lowerBound"
              name="lowerBound"
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(Number(e.target.value))}
              placeholder={useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerBoundPlaceholder',
              })}
              className="rounded-xl font-mono"
              min="-30"
              max="0"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="upperBound">
              {useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.upperBound',
              })}
            </FieldLabel>
            <Input
              id="upperBound"
              name="upperBound"
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(Number(e.target.value))}
              placeholder={useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.upperBoundPlaceholder',
              })}
              className="rounded-xl font-mono"
              min="0"
              max="30"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="step">
              {useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.step',
              })}
            </FieldLabel>
            <Input
              id="step"
              name="step"
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              placeholder={useFormatText({
                id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.stepPlaceholder',
              })}
              className="rounded-xl font-mono"
              min="1"
            />
          </Field>
          {error && <div className="text-sm text-destructive">{error}</div>}
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl">
              {useFormatText({ id: 'common.cancel' })}
            </Button>
          </DialogClose>
          <Button type="submit" className="rounded-xl" onClick={handleSave}>
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
  onSave: (settings: SimulationSettings) => void;
  initialSettings?: SimulationSettings;
}
