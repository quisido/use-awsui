import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultActiveHref?: string | undefined;
}

export interface State {
  readonly activeHref: string;
  readonly handleFollow: (
    event: Readonly<CustomEvent<Readonly<SideNavigationProps.FollowDetail>>>,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useSideNavigation(props: Props = DEFAULT_PROPS): State {
  const { defaultActiveHref = '/' } = props;

  // States
  const [activeHref, setActiveHref] = useState(defaultActiveHref);

  return {
    activeHref,

    handleFollow: useCallback(
      (e: CustomEvent<SideNavigationProps.FollowDetail>): void => {
        setActiveHref(e.detail.href);
      },
      [],
    ),
  };
}
