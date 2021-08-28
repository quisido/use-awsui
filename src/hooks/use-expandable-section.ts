import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { ExpandableSectionProps } from '@awsui/components-react/expandable-section';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultExpanded?: boolean | undefined;
}

export interface State {
  readonly expanded: boolean | undefined;
  readonly setExpanded: (value: SetStateAction<boolean | undefined>) => void;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<ExpandableSectionProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useExpandableSection(
  props: Props = DEFAULT_PROPS,
): State {
  const { defaultExpanded } = props;

  // States
  const [expanded, setExpanded] = useState<boolean | undefined>(
    defaultExpanded,
  );

  return {
    expanded,
    setExpanded,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<
            Readonly<ExpandableSectionProps.ChangeDetail>
          >
        >,
      ): void => {
        setExpanded(e.detail.expanded);
      },
      [],
    ),
  };
}
