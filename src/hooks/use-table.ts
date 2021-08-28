import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TableProps } from '@awsui/components-react/table';
import { useCallback, useState } from 'react';
import getDefaultTableProps from '../utils/get-default-table-props';
import isSortable from '../utils/is-sortable';

export interface Props<Item> {
  readonly defaultSelectedItems?: readonly Item[] | undefined;
  readonly defaultSortingColumn?: TableProps.SortingColumn<Item> | undefined;
  readonly defaultSortingDescending?: boolean | undefined;
  readonly onSelectionChange?:
    | ((selectedItems: readonly Item[]) => void)
    | undefined;
  readonly onSortingChange?:
    | ((state: TableProps.SortingState<Item>) => void)
    | undefined;
}

export interface State<Item> {
  readonly selectedItems: readonly Item[] | undefined;
  readonly sort: (a: Item, b: Item) => number;
  readonly sortingColumn: Readonly<TableProps.SortingColumn<Item>> | undefined;
  readonly sortingDescending: boolean | undefined;
  readonly handleSelectionChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TableProps.SelectionChangeDetail<Item>>>
    >,
  ) => void;
  readonly handleSortingChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TableProps.SortingState<Item>>>
    >,
  ) => void;
}

const NO_SORT = 0;
const SORT_BACKWARDS = -1;
const SORT_FORWARDS = 1;

export default function useTable<Item>(props?: Props<Item>): State<Item> {
  const {
    defaultSelectedItems,
    defaultSortingColumn,
    defaultSortingDescending,
    onSelectionChange,
    onSortingChange,
  } = props ?? getDefaultTableProps<Item>();

  // States
  const [selectedItems, setSelectedItems] = useState<
    readonly Item[] | undefined
  >(defaultSelectedItems);
  const [sortingColumn, setSortingColumn] = useState<
    TableProps.SortingColumn<Item> | undefined
  >(defaultSortingColumn);
  const [sortingDescending, setSortingDescending] = useState<
    boolean | undefined
  >(defaultSortingDescending);

  return {
    selectedItems,
    sortingColumn,
    sortingDescending,

    handleSelectionChange: useCallback(
      (
        e: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<Item>>,
      ): void => {
        if (typeof onSelectionChange === 'function') {
          onSelectionChange(e.detail.selectedItems);
        }
        setSelectedItems(e.detail.selectedItems);
      },
      [onSelectionChange],
    ),

    handleSortingChange: useCallback(
      (e: NonCancelableCustomEvent<TableProps.SortingState<Item>>): void => {
        if (typeof onSortingChange === 'function') {
          onSortingChange(e.detail);
        }
        setSortingColumn(e.detail.sortingColumn);
        setSortingDescending(e.detail.isDescending);
      },
      [onSortingChange],
    ),

    sort: useCallback(
      (a: Item, b: Item): number => {
        if (typeof sortingColumn === 'undefined') {
          return NO_SORT;
        }
        if (typeof sortingColumn.sortingComparator !== 'undefined') {
          const rank: number = sortingColumn.sortingComparator(a, b);
          if (sortingDescending === true) {
            return SORT_BACKWARDS * rank;
          }
          return rank;
        }
        if (typeof sortingColumn.sortingField === 'undefined') {
          return NO_SORT;
        }

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const field: keyof Item = sortingColumn.sortingField as keyof Item;
        const aValue: unknown = a[field];
        const bValue: unknown = b[field];
        if (!isSortable(aValue) || !isSortable(bValue)) {
          return NO_SORT;
        }
        if (aValue < bValue) {
          if (sortingDescending === true) {
            return SORT_FORWARDS;
          }
          return SORT_BACKWARDS;
        }
        if (aValue > bValue) {
          if (sortingDescending === true) {
            return SORT_BACKWARDS;
          }
          return SORT_FORWARDS;
        }
        return NO_SORT;
      },
      [sortingColumn, sortingDescending],
    ),
  };
}
