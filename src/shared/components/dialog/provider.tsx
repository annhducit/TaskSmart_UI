import { createContext, useContext } from 'react';

export interface DialogContextType {
  open: boolean;
  onClose: (callback?: (urlSearchParams: URLSearchParams) => void) => void;
}

const dialogContext = createContext<DialogContextType>({
  open: false,
  onClose: () => {},
});

export const useDialogContext = () => {
  const ctx = useContext(dialogContext);

  if (!ctx) {
    throw new Error('useDialogContext must be using in DialogContextProvider');
  }
  return ctx;
};

export default dialogContext.Provider;
