import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';
import type { SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export interface Props {
  readonly defaultCurrentPageIndex?: number | undefined;
  readonly onCurrentPageIndexChange?:
    | ((currentPageIndex: number) => void)
    | undefined;
  readonly pageSize?: number | undefined;
}

export interface State {
  readonly currentPageIndex: number;
  readonly paginate: <Item>(items: readonly Item[]) => readonly Item[];
  readonly setCurrentPageIndex: (value: SetStateAction<number>) => void;
  readonly handleChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ) => void;
}

const ARRAY_INDEX_OFFSET = 1;
const DEFAULT_PROPS: Props = Object.freeze({});
const FIRST_PAGE = 1;

export default function usePagination(props?: Props): State {
  const {
    defaultCurrentPageIndex = FIRST_PAGE,
    onCurrentPageIndexChange,
    pageSize = Number.POSITIVE_INFINITY,
  } = props ?? DEFAULT_PROPS;

  // States
  const [currentPageIndex, setCurrentPageIndex] = useState(
    defaultCurrentPageIndex,
  );

  return {
    currentPageIndex,
    setCurrentPageIndex,

    handleChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
        >,
      ): void => {
        setCurrentPageIndex(e.detail.currentPageIndex);
        if (onCurrentPageIndexChange) {
          onCurrentPageIndexChange(e.detail.currentPageIndex);
        }
      },
      [onCurrentPageIndexChange],
    ),

    paginate: useCallback(
      <Item>(items: readonly Item[]): readonly Item[] => {
        const start: number =
          (currentPageIndex - ARRAY_INDEX_OFFSET) * pageSize;
        const end: number = start + pageSize;
        return items.slice(start, end);
      },
      [currentPageIndex, pageSize],
    ),
  };
}
