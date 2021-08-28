import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { RadioGroupProps } from '@awsui/components-react/radio-group';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultValue?: string | null | undefined;
}

export interface State {
  readonly setValue: (value: SetStateAction<string | null>) => void;
  readonly value: string | null;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<RadioGroupProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useRadioGroup(props: Props = DEFAULT_PROPS): State {
  const { defaultValue = null } = props;

  // States
  const [value, setValue] = useState<string | null>(defaultValue);

  return {
    setValue,
    value,

    handleChange: useCallback(
      (e: NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>): void => {
        setValue(e.detail.value);
      },
      [],
    ),
  };
}
