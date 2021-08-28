import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ToggleProps } from '@awsui/components-react/toggle';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultChecked?: boolean | undefined;
  readonly onChange?: ((checked: boolean) => void) | undefined;
}

export interface State {
  readonly checked: boolean;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<ToggleProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useToggle(props: Props = DEFAULT_PROPS): State {
  const { defaultChecked = false, onChange } = props;

  // States
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  return {
    checked,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<ToggleProps.ChangeDetail>>
        >,
      ): void => {
        setChecked(e.detail.checked);
        if (onChange) {
          onChange(e.detail.checked);
        }
      },
      [onChange],
    ),
  };
}
