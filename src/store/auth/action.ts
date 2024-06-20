import { tsmAxios } from '@/configs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData } from '.';

export const signInAction = createAsyncThunk(
  'auth/sign-in',
  async (data: {
    user: string;
    username?: string | undefined;
    email?: string | undefined;
    password: string;
  }) => {
    const res = await tsmAxios.post<{ data: AuthData }>('/auth/login', data);
    return res;
  }
);

export const reSignInAction = createAsyncThunk(
  'auth/re-sign-in',
  async (payload: { refreshToken: string }) => {
    const { refreshToken } = payload;
    const res = await tsmAxios.post<{ data: AuthData }>('/auth/refresh', {
      refresh: `Bearer ${refreshToken}`,
    });
    return res.data;
  }
);
