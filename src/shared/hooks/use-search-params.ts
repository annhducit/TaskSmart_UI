import { useCallback } from 'react';
import { useSearchParams as useRRDSearchParams } from 'react-router-dom';
import type { UseSearchParam } from './use-search-param';

const useSearchParams = <T = string>() => {
  const [searchParams, setSearchParams] = useRRDSearchParams();

  const get = useCallback<UseSearchParam<T>['GetValue']>(
    (key) => searchParams.get(key) as T,
    [searchParams]
  );

  const set = useCallback<UseSearchParam<T>['SetValues']>(
    (values, options) => {
      setSearchParams((searchParam) => {
        const urlSearchParams = new URLSearchParams(searchParam);

        Object.entries(values).forEach(([key, value]) => {
          if (value === null || value === undefined) {
            urlSearchParams.delete(key);
          } else {
            urlSearchParams.set(key, value.toString());
          }
        });

        return urlSearchParams;
      }, options);
    },
    [setSearchParams]
  );

  return { get, set };
};

export default useSearchParams;
