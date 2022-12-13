import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { NewUser } from 'shakki'

type User = {
  username: string
  id: number
  accessToken: string | null
  refreshToken: string | null
  isGuest: boolean
  message: string
}

const guestUser: User = {
  username: `guest_${uuid()}`,
  id: -1,
  accessToken: null,
  refreshToken: null,
  isGuest: true,
  message: ''
}

const login = createAsyncThunk(
  'users/login',
  async ({ username, password })
)

const userSlice = createSlice({
  name: 'user',
  initialState: guestUser,
  reducers: {
    login: (user, action: PayloadAction<Omit<User, 'isGuest'>>) => {
      const { username, id, accessToken, refreshToken } = action.payload
      return { username, id, accessToken, refreshToken, isGuest: false, message: '' }
    }
  }
})

export default userSlice.reducer
