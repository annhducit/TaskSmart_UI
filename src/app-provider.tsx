import { QueryClientProvider } from '@tanstack/react-query';
import { App as AntAppProvider, ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { Toaster } from 'sonner';

import locale from 'antd/locale/vi_VN';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from './configs/theme';
import { queryClient } from './configs/query-client';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './shared/components/loading';

const AppProvider = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <AntAppProvider notification={{ placement: 'bottomLeft' }}>
      <StyleProvider hashPriority='low'>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={theme} locale={locale}>
            <Provider store={store}>
              <PersistGate loading={<Loading.Page />} persistor={persistor}>
                {children}
              </PersistGate>
            </Provider>
            <Toaster
              position='bottom-right'
              toastOptions={{
                unstyled: true,
                className: 'flex items-center gap-2',

                classNames: {
                  error: 'bg-red-400/80 p-4 rounded text-white',
                  success: 'text-green-400 p-4 bg-black/50 rounded',
                  warning: 'text-yellow-400 p-4 z-10 bg-black/50 rounded',
                  info: 'bg-blue-400/80 p-4 rounded text-white',
                },
              }}
            />
            <ReactQueryDevtools />
          </ConfigProvider>
        </QueryClientProvider>
      </StyleProvider>
    </AntAppProvider>
  );
};

export default AppProvider;
