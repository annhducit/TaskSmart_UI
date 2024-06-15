import { createSlice } from '@reduxjs/toolkit';
import { getUserInformationAction } from './action';

export type WorkSpaceType = {
  id: string;
  name: string;
};

export type ProjectType = {
  id: string;
  name: string;
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
  data: UserData;
  isSignedIn: boolean;
  isLoaded: boolean;
}
const initialState: AuthState = {
  loadingState: 'idle',
  isSignedIn: false,
  isLoaded: false,
  data: {
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
};
export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearInformation: (state) => {
      state.loadingState = 'idle';
      state.data = {} as UserData;
      state.isLoaded = false;
    },
  },
  extraReducers: (builder) => {
    /**
     * GetUserInformation
     */
    builder.addCase(getUserInformationAction.pending, (state) => {
      state.loadingState = 'loading';
      state.isLoaded = false;
    });
    builder.addCase(getUserInformationAction.fulfilled, (state, action) => {
      state.loadingState = 'succeeded';
      state.isLoaded = true;
      if (action.payload) {
        state.data = {
          ...action.payload,
          user: action.payload,
        };
      }
    });
    builder.addCase(getUserInformationAction.rejected, (state) => {
      state.loadingState = 'failed';
      state.data = {} as UserData;
      state.isLoaded = true;
    });
  },
});

export const { clearInformation } = user.actions;

export default user.reducer;
