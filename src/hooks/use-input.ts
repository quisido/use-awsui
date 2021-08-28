import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { InputProps } from '@awsui/components-react/input';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultValue?: string | undefined;
}

export interface State {
  readonly setValue: (value: SetStateAction<string>) => void;
  readonly value: string;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<InputProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useInput(props: Props = DEFAULT_PROPS): State {
  const { defaultValue = '' } = props;

  // States
  const [value, setValue] = useState<string>(defaultValue);

  return {
    setValue,
    value,

    handleChange: useCallback(
      (e: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
        setValue(e.detail.value);
      },
      [],
    ),
  };
}
