import { tsmAxios } from '@/configs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserInformationAction = createAsyncThunk('auth/sign-in', async () => {
  const user = await tsmAxios.get('/users/profile');
  return {
    ...user.data,
    profileImage: 'http://localhost:8888/api/img/' + user.data.profileImageId,
  };
});
