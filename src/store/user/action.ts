import { tsmAxios } from '@/configs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';

export const getUserInformationAction = createAsyncThunk(
  'user/information',
  async (_payload, { rejectWithValue }) => {
    try {
      const user = await tsmAxios.get('/users/profile');
      return user.data;
    } catch (error) {
      return rejectWithValue(Number(get(error, 'response.status', get(error, 'message', '401'))));
    }
  }
);
