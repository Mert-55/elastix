import { useFormatText } from '@/common/hooks/useFormatText';
import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { Icon } from '@/common/ui/icon';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/common/ui/input-group';
import { OptionalTooltip } from '@/common/ui/OptionalTooltip';

export default function DashboardMenuEditMode({
  value,
  onChange,
  isValid,
  validationMessage,
  onSave,
}: DashboardMenuEditModeProps) {
  const saveText = useFormatText({ id: 'common.save' });

  return (
    <>
      <InputGroup
        className={cn(
          'rounded-xl',
          !isValid && 'bg-accent/10 border-accent-foreground'
        )}
      >
        <InputGroupInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <OptionalTooltip open tooltip={validationMessage} destructive>
          <InputGroupAddon align="inline-end">
            <div
              className={cn(
                'flex size-4 items-center justify-center rounded-full',
                isValid
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground'
              )}
            >
              <Icon name={isValid ? 'check' : 'info'} className="size-4" />
            </div>
          </InputGroupAddon>
        </OptionalTooltip>
      </InputGroup>
      <Button
        onClick={onSave}
        className="rounded-xl bg-primary/40 text-accent-foreground"
        disabled={!isValid}
      >
        {saveText}
      </Button>
    </>
  );
}

interface DashboardMenuEditModeProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  validationMessage: string | undefined;
  onSave: () => void;
}
