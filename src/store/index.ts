import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './user';
import {
  useDispatch as _useDispatch,
  useSelector as _useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
