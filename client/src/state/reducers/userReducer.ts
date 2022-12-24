import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunkWithCustomError, isRejectedAuthAction } from '../utils'
import { v4 as uuid } from 'uuid'
import { UserCredentials, UserResponse, Info, NewUser } from 'shared'
import { FinishedGame, Tokens } from 'shared'
import userApi from '../../api/user'
import gameApi from '../../api/game'

type User = {
  username: string
  id: number
  accessToken: string | null
  refreshToken: string | null
  isGuest: boolean
  info: Info
  games: FinishedGame[]
}

const noInfo = { message: '', success: true }

const guestUser: User = {
  username: `guest_${uuid()}`,
  id: -1,
  accessToken: null,
  refreshToken: null,
  isGuest: true,
  info: noInfo,
  games: []
}

const login = createAsyncThunkWithCustomError('users/auth/login', async (credentials: UserCredentials) => await userApi.login(credentials))

const signup = createAsyncThunkWithCustomError('users/auth/signup', async (newUser: NewUser) => await userApi.signup(newUser))

const logout = createAsyncThunkWithCustomError('users/auth/logout', async (refreshToken: string) => await userApi.logout(refreshToken))

const getGames = createAsyncThunkWithCustomError('users/games/protected', async () => await gameApi.get())

const userSlice = createSlice({
  name: 'user',
  initialState: guestUser,
  reducers: {
    setTokens: (user, action: PayloadAction<Tokens>) => {
      const { accessToken, refreshToken } = action.payload
      console.log('Setting new tokens in reducer', accessToken, refreshToken)
      user.accessToken = accessToken
      user.refreshToken = refreshToken
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (user, action: PayloadAction<UserResponse>) => {
        const { username, id, accessToken, refreshToken } = action.payload
        return { username, id, accessToken, refreshToken, isGuest: false, info: noInfo, games: [] }
      })
      .addCase(signup.fulfilled, (user, action: PayloadAction<string>) => {
        user.info = { message: action.payload, success: true }
      })
      .addCase(logout.fulfilled, () => {
        return guestUser
      })
      .addMatcher(isRejectedAuthAction, (user, action) => {
        const error = action.payload
        user.info = { message: error, success: false }
      })
  }
})

const { setTokens } = userSlice.actions
export { login, signup, logout, getGames, setTokens }
export default userSlice.reducer
