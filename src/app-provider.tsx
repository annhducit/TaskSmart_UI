import { QueryClientProvider } from "@tanstack/react-query";
import { App as AntAppProvider, ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import locale from 'antd/locale/vi_VN';

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "./configs/theme";
import { queryClient } from "./configs/query-client";
import { PropsWithChildren } from "react";
import AxiosInterceptor from "./shared/components/axios-interceptor";


const AppProvider = (props: PropsWithChildren) => {
    const { children } = props;
    return (
        <AntAppProvider notification={{ placement: 'bottomLeft' }}>
          <StyleProvider hashPriority='low'>
            <QueryClientProvider client={queryClient}>
              <ConfigProvider theme={theme} locale={locale}>
                {/* <Provider store={store}> */}
                  {/* <PersistGate loading={<Loading.Page />} persistor={persistor}> */}
                    <AxiosInterceptor>{children}</AxiosInterceptor>
                  {/* </PersistGate> */}
                {/* </Provider> */}
                <ReactQueryDevtools />
              </ConfigProvider>
            </QueryClientProvider>
          </StyleProvider>
        </AntAppProvider>
    )
}

export default AppProvider;