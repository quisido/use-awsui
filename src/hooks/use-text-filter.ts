import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultFilteringText?: string | undefined;
}

export interface State {
  readonly filteringText: string;
  readonly setFilteringText: (value: SetStateAction<string>) => void;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PROPS: Props = Object.freeze({});

export default function useTextFilter(props: Props = DEFAULT_PROPS): State {
  const { defaultFilteringText = '' } = props;

  // States
  const [filteringText, setFilteringText] =
    useState<TextFilterProps['filteringText']>(defaultFilteringText);

  return {
    filteringText,
    setFilteringText,

    handleChange: useCallback(
      (e: NonCancelableCustomEvent<TextFilterProps.ChangeDetail>): void => {
        setFilteringText(e.detail.filteringText);
      },
      [],
    ),
  };
}
