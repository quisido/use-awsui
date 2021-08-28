import type { NonCancelableCustomEvent } from '@awsui/components-react';
import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { useCallback, useMemo, useState } from 'react';
import getDefaultCollectionPreferencesProps from '../utils/get-default-collection-preferences-props';

export interface Props<Custom> {
  readonly defaultCustom?: Custom | undefined;
  readonly defaultPageSize?: number | undefined;
  readonly defaultVisibleContent?: readonly string[] | undefined;
  readonly defaultWrapLines?: boolean | undefined;
  readonly onCustomChange?: ((custom?: Custom) => void) | undefined;
  readonly onPageSizeChange?: ((pageSize?: number) => void) | undefined;
  readonly onVisibleContentChange?:
    | ((visibleContent?: readonly string[]) => void)
    | undefined;
  readonly onWrapLinesChange?: ((wrapLines?: boolean) => void) | undefined;
}

export interface State<Custom> {
  readonly custom: Custom | undefined;
  readonly pageSize: number | undefined;
  readonly preferences: CollectionPreferencesProps.Preferences;
  readonly visibleContent: readonly string[] | undefined;
  readonly wrapLines: boolean | undefined;
  readonly handleConfirm: (
    event: Readonly<
      NonCancelableCustomEvent<
        Readonly<CollectionPreferencesProps.Preferences<Custom>>
      >
    >,
  ) => void;
}

export default function useCollectionPreferences<Custom>(
  props?: Props<Custom>,
): State<Custom> {
  const {
    defaultCustom,
    defaultPageSize,
    defaultVisibleContent,
    defaultWrapLines,
    onCustomChange,
    onPageSizeChange,
    onVisibleContentChange,
    onWrapLinesChange,
  } = props ?? getDefaultCollectionPreferencesProps<Custom>();

  // States
  const [custom, setCustom] = useState<Custom | undefined>(defaultCustom);
  const [pageSize, setPageSize] = useState<number | undefined>(defaultPageSize);
  const [visibleContent, setVisibleContent] = useState<
    readonly string[] | undefined
  >(defaultVisibleContent);
  const [wrapLines, setWrapLines] = useState<boolean | undefined>(
    defaultWrapLines,
  );

  return {
    custom,
    pageSize,
    visibleContent,
    wrapLines,

    handleConfirm: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<
            Readonly<CollectionPreferencesProps.Preferences<Custom>>
          >
        >,
      ): void => {
        const newCustom: Custom | undefined = e.detail.custom;
        setCustom(newCustom);
        if (typeof onCustomChange === 'function' && custom !== newCustom) {
          onCustomChange(newCustom);
        }

        const newPageSize: number | undefined = e.detail.pageSize;
        setPageSize(newPageSize);
        if (
          typeof onPageSizeChange === 'function' &&
          pageSize !== newPageSize
        ) {
          onPageSizeChange(newPageSize);
        }

        const newVisibleContent: readonly string[] | undefined =
          e.detail.visibleContent;
        setVisibleContent(newVisibleContent);
        if (
          typeof onVisibleContentChange === 'function' &&
          visibleContent !== newVisibleContent
        ) {
          onVisibleContentChange(newVisibleContent);
        }

        const newWrapLines: boolean | undefined = e.detail.wrapLines;
        setWrapLines(newWrapLines);
        if (
          typeof onWrapLinesChange === 'function' &&
          wrapLines !== newWrapLines
        ) {
          onWrapLinesChange(e.detail.wrapLines);
        }
      },
      [
        custom,
        onCustomChange,
        onPageSizeChange,
        onVisibleContentChange,
        onWrapLinesChange,
        pageSize,
        visibleContent,
        wrapLines,
      ],
    ),

    preferences: useMemo(
      (): CollectionPreferencesProps.Preferences<Custom> => ({
        custom,
        pageSize,
        visibleContent,
        wrapLines,
      }),
      [custom, pageSize, visibleContent, wrapLines],
    ),
  };
}
