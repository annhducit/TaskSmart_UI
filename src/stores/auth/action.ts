import { tsmAxios } from '@/configs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthData } from '.';
import type { AxiosResponse } from 'axios';

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
    return res;
  }
);

export const signInGoogleAction = createAsyncThunk(
  'auth/sign-in-google',
  (
    data: AxiosResponse<
      {
        data: AuthData;
      },
      any
    >
  ) => {
    return data;
  }
);
export const signInGithubAction = createAsyncThunk(
  'auth/sign-in-github',
  (
    data: AxiosResponse<
      {
        data: AuthData;
      },
      any
    >
  ) => {
    return data;
  }
);
