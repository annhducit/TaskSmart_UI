import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cookieUtils from '../../../utils/cookieUtil'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { tsmAuthAxios } from '@/configs/axios'

export type AuthType = {
  user: UserType
  accessToken: string
  refreshToken: string
}
export type UserWrapperType = {
  data?: UserType
}
export type UserType = {
  id: string
  name: string
  username: string
  email: string
  gender: string
  position: string
  organization : string
  timeZone: number
  profileImage: string
  personalWorkSpace: WorkSpaceType
  workspaces: WorkSpaceType[]
  projects: ProjectType[]
}


export type WorkSpaceType = {
  id: string
  name: string
}

export type ProjectType = {
  id: string
  name: string
}

const workspacesUndefined : WorkSpaceType = {
  id: "",
  name: ""
}

const userUndefined :  UserType = {
  id: "",
  name: "",
  username: "",
  email: "",
  gender: "",
  position: "",
  organization : "",
  timeZone: 0,
  profileImage: "",
  personalWorkSpace: workspacesUndefined,
  workspaces: [],
  projects: []
}

const userWrapperUndefined: UserWrapperType = {
  data: userUndefined
}

export const getUserInformation = createAsyncThunk('user/fetchUser', async () => {
  const user = await tsmAuthAxios.get('/users/profile')
  return {...user.data, profileImage: 'http://localhost:8888/api/img/' + user.data.profileImageId}
});

export const userSlice: Slice<UserWrapperType> = createSlice({
  name: 'user',
  initialState: userWrapperUndefined,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthType>) => {
      cookieUtils.setCookie("access_token", action.payload.accessToken, 30)
      cookieUtils.setCookie("refresh_token", action.payload.refreshToken, 30)
      
      state.data = action.payload.user
    },

    clearAuthentication: (state) => {
      cookieUtils.deleteCookie('access_token')
      cookieUtils.deleteCookie('refresh_token')
      state.data = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInformation.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const {setAuthentication, clearAuthentication} = userSlice.actions
export default userSlice.reducer