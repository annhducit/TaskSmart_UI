import { createSlice } from '@reduxjs/toolkit';
import { reSignInAction, signInAction, signInGithubAction, signInGoogleAction } from './action';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
  profileImagePath: string;
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
      profileImagePath: '',
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

    /**
     * reSignIn
     */
    builder.addCase(reSignInAction.pending, (state) => {
      state.loadingState = 'loading';
      state.isLoaded = false;
    });
    builder.addCase(reSignInAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded';
      if (action.payload.data) {
        state.data = action.payload.data as unknown as AuthData;
      }
    });
    builder.addCase(reSignInAction.rejected, (state) => {
      state.loadingState = 'failed';
      state.data = {} as AuthData;
      state.isSignedIn = false;
      state.isLoaded = true;
    });

    /**
     * OAuth Google
     */
    builder.addCase(signInGoogleAction.pending, (state) => {
      state.loadingState = 'loading';
      state.data = {} as AuthData;
      state.isLoaded = false;
      state.isSignedIn = false;
    });
    builder.addCase(signInGoogleAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded';
      state.isLoaded = true;
      if (action.payload.data) {
        state.data = action.payload.data as unknown as AuthData;
        state.isSignedIn = true;
      } else {
        state.isSignedIn = false;
        state.data = {} as AuthData;
      }
    });
    builder.addCase(signInGoogleAction.rejected, (state) => {
      state.loadingState = 'failed';
      state.data = {} as AuthData;
      state.isSignedIn = false;
      state.isLoaded = true;
    });
    /**
     * OAuth Github
     */
    builder.addCase(signInGithubAction.pending, (state) => {
      state.loadingState = 'loading';
      state.data = {} as AuthData;
      state.isLoaded = false;
      state.isSignedIn = false;
    });
    builder.addCase(signInGithubAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded';
      state.isLoaded = true;
      if (action.payload.data) {
        state.data = action.payload.data as unknown as AuthData;
        state.isSignedIn = true;
      } else {
        state.isSignedIn = false;
        state.data = {} as AuthData;
      }
    });
    builder.addCase(signInGithubAction.rejected, (state) => {
      state.loadingState = 'failed';
      state.data = {} as AuthData;
      state.isSignedIn = false;
      state.isLoaded = true;
    });
  },
});

export const { forceSignOut } = auth.actions;
export default persistReducer(
  {
    key: 'auth',
    storage,
  },
  auth.reducer
);
