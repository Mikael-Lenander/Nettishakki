import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunkWithCustomError, isRejectedAction } from '../utils'
import { v4 as uuid } from 'uuid'
import { UserCredentials, UserResponse, Info, NewUser } from 'shared'
import userApi from '../../api/user'

type User = {
  username: string
  id: number
  accessToken: string | null
  refreshToken: string | null
  isGuest: boolean
  info: Info
}

const noInfo = { message: '', success: true }

const guestUser: User = {
  username: `guest_${uuid()}`,
  id: -1,
  accessToken: null,
  refreshToken: null,
  isGuest: true,
  info: noInfo
}

const login = createAsyncThunkWithCustomError('users/login', async (credentials: UserCredentials) => await userApi.login(credentials))

const signup = createAsyncThunkWithCustomError('users/signup', async (newUser: NewUser) => await userApi.signup(newUser))

const logout = createAsyncThunkWithCustomError('users/logout', async (refreshToken: string) => await userApi.logout(refreshToken))

const userSlice = createSlice({
  name: 'user',
  initialState: guestUser,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (user, action: PayloadAction<UserResponse>) => {
        const { username, id, accessToken, refreshToken } = action.payload
        return { username, id, accessToken, refreshToken, isGuest: false, info: noInfo }
      })
      .addCase(signup.fulfilled, (user, action: PayloadAction<string>) => {
        user.info = { message: action.payload, success: true }
      })
      .addCase(logout.fulfilled, () => {
        console.log('reducer logout')
        return guestUser
      })
      .addMatcher(isRejectedAction, (user, action) => {
        const error = action.payload
        user.info = { message: error, success: false }
      })
  }
})

export { login, signup, logout }
export default userSlice.reducer
