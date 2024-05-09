/**
 * @fileoverview App component
 * @author Duc Nguyen
 */

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import arraySupport from 'dayjs/plugin/arraySupport';
import AppRouter from './modules';
import { Suspense } from 'react';
import AppProvider from './app-provider';
import Loading from './shared/components/loading';
import FallbackErrorBoundary from './shared/components/fallback/fallback-error-boundary';

dayjs.extend(customParseFormat);
dayjs.extend(arraySupport);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

function App() {
  return (
    <BrowserRouter>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={FallbackErrorBoundary}>
            <AppProvider>
              <Suspense fallback={<Loading.Page />}>
                <AppRouter />
              </Suspense>
            </AppProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </BrowserRouter>
  );
}

export default App;
