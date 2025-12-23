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
import type { SimulationSettings } from '@/items/simulation/hooks/PriceSimulationProvider';
import { useState } from 'react';

interface EditPriceDifferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  onSave: (settings: SimulationSettings) => void;
  initialSettings?: SimulationSettings;
}

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

  const lowerBoundMinError = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerBoundMinError',
    values: { min: -30 },
  });
  const upperBoundMaxError = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.upperBoundMaxError',
    values: { max: 30 },
  });
  const lowerLessThanUpperError = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerLessThanUpperError',
  });
  const stepPositiveError = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.stepPositiveError',
  });
  const stepTooLargeError = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.stepTooLargeError',
  });
  const dialogTitle = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.title',
  });
  const dialogDescription = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.description',
    values: { itemName },
  });
  const lowerBoundLabel = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerBound',
  });
  const lowerBoundPlaceholder = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.lowerBoundPlaceholder',
  });
  const upperBoundLabel = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.upperBound',
  });
  const upperBoundPlaceholder = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.upperBoundPlaceholder',
  });
  const stepLabel = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.step',
  });
  const stepPlaceholder = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.stepPlaceholder',
  });
  const cancelText = useFormatText({ id: 'common.cancel' });
  const saveText = useFormatText({
    id: 'dashboard.sidebar.simulations.stockItems.priceDifferenceDialog.save',
  });

  const handleSave = () => {
    // Simple validation
    if (lowerBound < -30) {
      setError(lowerBoundMinError);
      return;
    }
    if (upperBound > 30) {
      setError(upperBoundMaxError);
      return;
    }
    if (lowerBound >= upperBound) {
      setError(lowerLessThanUpperError);
      return;
    }
    if (step <= 0) {
      setError(stepPositiveError);
      return;
    }
    if (step > upperBound - lowerBound) {
      setError(stepTooLargeError);
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
              {dialogTitle}
            </div>
          </DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <FieldGroup className="py-3 gap-4">
          <Field>
            <FieldLabel htmlFor="lowerBound">{lowerBoundLabel}</FieldLabel>
            <Input
              id="lowerBound"
              name="lowerBound"
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(Number(e.target.value))}
              placeholder={lowerBoundPlaceholder}
              className="rounded-xl font-mono"
              min="-30"
              max="0"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="upperBound">{upperBoundLabel}</FieldLabel>
            <Input
              id="upperBound"
              name="upperBound"
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(Number(e.target.value))}
              placeholder={upperBoundPlaceholder}
              className="rounded-xl font-mono"
              min="0"
              max="30"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="step">{stepLabel}</FieldLabel>
            <Input
              id="step"
              name="step"
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              placeholder={stepPlaceholder}
              className="rounded-xl font-mono"
              min="1"
            />
          </Field>
          {error && <div className="text-sm text-destructive">{error}</div>}
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl">
              {cancelText}
            </Button>
          </DialogClose>
          <Button type="submit" className="rounded-xl" onClick={handleSave}>
            {saveText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
