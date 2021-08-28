import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultVisible?: boolean | undefined;
}

export interface State {
  readonly setVisible: (value: SetStateAction<boolean | undefined>) => void;
  readonly visible: boolean | undefined;
  readonly handleDismiss: (
    event: Readonly<NonCancelableCustomEvent<Readonly<Record<string, never>>>>,
  ) => void;
}

const DEFAULT_PROPS: Readonly<Props> = Object.freeze({});

export default function useAlert(
  props: Readonly<Props> = DEFAULT_PROPS,
): State {
  const { defaultVisible } = props;

  // States
  const [visible, setVisible] = useState<boolean | undefined>(defaultVisible);

  return {
    setVisible,
    visible,

    handleDismiss: useCallback((): void => {
      setVisible(false);
    }, []),
  };
}
