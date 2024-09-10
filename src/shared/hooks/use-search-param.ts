import { isEmpty } from 'lodash';
import { useCallback, useRef } from 'react';
import { type NavigateOptions, useSearchParams } from 'react-router-dom';
import type { SEARCH_PARAMS } from '../constant/search-param';

/**
 *
 * @param variant
 * @param options
 * @returns  [value, setValue, value]
 * @author Duc Nguyen
 */
const useSearchParam = <T = string>(
  variant: UseSearchParam<T>['Variant'],
  options?: UseSearchParam<T>['Option']
): [UseSearchParam<T>['Value'], UseSearchParam<T>['Dispatch'], UseSearchParam<T>['Value']] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const origin = searchParams.get(variant);

  const value =
    (options?.parser ? options?.parser(origin) : (origin as T)) ?? options?.defaultValue;

  const { current: valueRef } = useRef(value);

  const setValue = useCallback<UseSearchParam<T>['Dispatch']>(
    (value) => {
      setSearchParams(
        (searchParam) => {
          const urlSearchParams = new URLSearchParams(searchParam);

          const _value = value instanceof Function ? value(urlSearchParams) : value;

          if (isEmpty(_value) || !_value) {
            urlSearchParams.delete(variant);
          } else {
            urlSearchParams.set(variant, _value.toString());
          }

          return urlSearchParams;
        },
        {
          replace: options?.replace ?? true,
        }
      );
    },
    [options?.replace, setSearchParams, variant]
  );

  return [valueRef, setValue, value];
};

export interface UseSearchParam<T = string> {
  ReturnType: ReturnType<typeof useSearchParam<T>>;
  Dispatch: {
    (value: string | null | undefined): void;
    (callback: (searchParam: URLSearchParams) => string | null | undefined): void;
  };
  Variant: SEARCH_PARAMS;
  Value: T | undefined;
  Option: {
    defaultValue?: T;
    replace?: boolean;
    parser?: (value: string | null | undefined) => T;
  };
  GetValue: (key: SEARCH_PARAMS) => T | null;
  SetValues: (values: Record<string, string | null | undefined>, options?: NavigateOptions) => void;
}

export default useSearchParam;
