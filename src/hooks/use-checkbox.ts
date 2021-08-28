import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { CheckboxProps } from '@awsui/components-react/checkbox';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultChecked?: boolean | undefined;
}

export interface State {
  readonly checked: boolean;
  readonly setChecked: (value: SetStateAction<boolean>) => void;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<CheckboxProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useCheckbox(props: Props = DEFAULT_PROPS): State {
  const { defaultChecked = false } = props;

  // States
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  return {
    checked,
    setChecked,

    handleChange: useCallback(
      (e: NonCancelableCustomEvent<CheckboxProps.ChangeDetail>): void => {
        setChecked(e.detail.checked);
      },
      [],
    ),
  };
}
