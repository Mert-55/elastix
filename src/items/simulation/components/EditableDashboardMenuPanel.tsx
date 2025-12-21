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
import { useDashboardNameValidation } from '@/items/dashboard/hooks/useDashboardNameValidation';
import { useState } from 'react';

export default function EditableDashboardMenuPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const { isValid, message } = useDashboardNameValidation(value);

  if (!isEditing) {
    return (
      <>
        {children}
        <Button
          variant="ghost"
          className="rounded-xl"
          size="icon"
          onClick={() => setIsEditing(true)}
        >
          <Icon name="edit" />
        </Button>
      </>
    );
  }

  return (
    <>
      <InputGroup
        className={cn(
          'rounded-xl',
          !isValid && 'bg-accent/10 border-destructive/30'
        )}
      >
        <InputGroupInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <OptionalTooltip open tooltip={message}>
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
        onClick={() => setIsEditing(false)}
        className="rounded-xl bg-primary/40 text-accent-foreground"
        disabled={!isValid}
      >
        {useFormatText({ id: 'common.save' })}
      </Button>
    </>
  );
}
