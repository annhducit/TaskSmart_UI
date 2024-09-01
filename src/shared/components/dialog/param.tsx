import type { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParam from '@/shared/hooks/use-search-param';
import { Suspense, useCallback, useMemo } from 'react';
import DialogProvider, { type DialogContextType } from './provider';
import Loading from '../loading';
import type { DialogProps } from './dialog';
import Dialog from './dialog';

type Props = DialogProps & {
  paramKey: SEARCH_PARAMS;
  paramValue: SEARCH_PARAMS_VALUE;
  replace?: boolean;
};

export const ParamDialog = (props: Props) => {
  const { paramKey, paramValue, replace, children, ...rest } = props;

  const [, setParam, param] = useSearchParam(paramKey, { replace });

  const isOpen = param === paramValue;

  const handleClose = useCallback<DialogContextType['onClose']>(
    (callback) => {
      setParam((searchParam) => {
        callback?.(searchParam);
        return undefined;
      });
    },
    [setParam]
  );

  const ctxValue = useMemo<DialogContextType>(
    () => ({
      open: isOpen,
      onClose: handleClose,
    }),
    [isOpen, handleClose]
  );

  return (
    <DialogProvider value={ctxValue}>
      <Dialog {...rest}>
        <Suspense fallback={<Loading.Spinner />}>{children}</Suspense>
      </Dialog>
    </DialogProvider>
  );
};

export default ParamDialog;
