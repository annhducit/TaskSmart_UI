import { createSlice } from '@reduxjs/toolkit'
import cookieUtils from '../../../utils/cookieUtil'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'

export type AuthType = {
  user: UserGeneralType
  accessToken: string
  refreshToken: string
}

export type UserGeneralType = {
  id?: string
  username?: string
  name?: string
  profileImageId?: string
}

const userUndefined: UserGeneralType = {
  id: undefined,
  username: undefined,
  name: undefined,
  profileImageId: undefined
}

const initialUserState = () : UserGeneralType => {
  if(cookieUtils.getCookie('user') && cookieUtils.getCookie('access_token')) {
    const user: UserGeneralType = JSON.parse(cookieUtils.getCookie('user') || '')
    return user ? user : userUndefined
  }
  return userUndefined;
}

export const userSlice: Slice<UserGeneralType> = createSlice({
  name: 'user',
  initialState: initialUserState(),
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthType>) => {
      cookieUtils.setCookie("access_token", action.payload.accessToken, 30)
      cookieUtils.setCookie("refresh_token", action.payload.refreshToken, 30)
      cookieUtils.setCookie("user", JSON.stringify(action.payload.user), 30)
      
      state.id = action.payload.user.id
      state.username = action.payload.user.username
      state.name = action.payload.user.name
      state.profileImageId = action.payload.user.profileImageId
    },

    clearAuthentication: (state) => {
      cookieUtils.deleteCookie('access_token')
      cookieUtils.deleteCookie('refresh_token')
      cookieUtils.deleteCookie('user')

      state.id = undefined
      state.username = undefined
      state.name = undefined
      state.profileImageId = undefined
    },
  }
})

export const {setAuthentication, clearAuthentication} = userSlice.actions
export default userSlice.reducer