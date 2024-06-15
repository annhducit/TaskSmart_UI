import { createSlice } from '@reduxjs/toolkit';
import cookieUtils from '@/utils/cookieUtil';
import { signInAction } from './action';

export type WorkSpaceType = {
  id: string;
  name: string;
};

export type ProjectType = {
  id: string;
  name: string;
};

export type AuthData = {
  user: UserData;
  accessToken: string;
  refreshToken: string;
};

export type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  gender: string;
  position: string;
  organization: string;
  timeZone: number;
  profileImage: string;
  personalWorkSpace: WorkSpaceType;
  workspaces: WorkSpaceType[];
  projects: ProjectType[];
};

export interface AuthState {
  loadingState: LoadingState;
  data: AuthData;
  isSignedIn: boolean;
  isLoaded: boolean;
}

const initialState: AuthState = {
  loadingState: 'idle',
  isSignedIn: false,
  isLoaded: false,
  data: {
    accessToken: '',
    refreshToken: '',
    user: {
      id: '',
      name: '',
      username: '',
      email: '',
      gender: '',
      position: '',
      organization: '',
      timeZone: 0,
      profileImage: '',
      personalWorkSpace: {} as WorkSpaceType,
      workspaces: [],
      projects: [],
    },
  },
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceSignOut: (state) => {
      state.data = {} as AuthData;
      state.isLoaded = false;
      state.isSignedIn = false;
      state.loadingState = 'idle';
    },
    clearAuthentication: (state) => {
      cookieUtils.deleteCookie('access_token');
      cookieUtils.deleteCookie('refresh_token');
      state.data = undefined as unknown as AuthData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInAction.pending, (state) => {
      state.loadingState = 'loading';
      state.data = {} as AuthData;
      state.isLoaded = false;
      state.isSignedIn = false;
    });

    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded';
      state.isLoaded = true;
      if (action.payload.data) {
        state.data = action.payload.data as unknown as AuthData;
        state.isSignedIn = true;
        cookieUtils.setCookie('access_token', state.data.accessToken, 30);
        cookieUtils.setCookie('refresh_token', state.data.refreshToken, 30);
      } else {
        state.isSignedIn = false;
        state.data = {} as AuthData;
      }
    });

    builder.addCase(signInAction.rejected, (state) => {
      state.loadingState = 'failed';
      state.data = {} as AuthData;
      state.isSignedIn = false;
      state.isLoaded = true;
    });
  },
});

export const { clearAuthentication, forceSignOut } = auth.actions;
export default auth.reducer;
