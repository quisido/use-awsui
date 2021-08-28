import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TabsProps } from '@awsui/components-react/tabs';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultActiveTabId?: string | undefined;
}

export interface State {
  readonly activeTabId: string | undefined;
  readonly setActiveTabId: (value: SetStateAction<string | undefined>) => void;
  readonly handleChange: (
    event: Readonly<NonCancelableCustomEvent<Readonly<TabsProps.ChangeDetail>>>,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useTabs(props: Props = DEFAULT_PROPS): State {
  const { defaultActiveTabId } = props;

  // States
  const [activeTabId, setActiveTabId] =
    useState<TabsProps['activeTabId']>(defaultActiveTabId);

  return {
    activeTabId,
    setActiveTabId,

    handleChange: useCallback(
      (e: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void => {
        setActiveTabId(e.detail.activeTabId);
      },
      [],
    ),
  };
}
