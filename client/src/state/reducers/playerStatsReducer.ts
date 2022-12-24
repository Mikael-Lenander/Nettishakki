import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunkWithCustomError } from '../utils'
import { PlayerStats } from 'shared'
import gameApi from '../../api/game'

const initialState: PlayerStats = {
  games: [],
  gameCounts: {
    victories: 0,
    defeats: 0,
    draws: 0
  }
}

const getGames = createAsyncThunkWithCustomError('users/games/protected', async () => await gameApi.get())

const playerStats = createSlice({
  name: 'playerStats',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getGames.fulfilled, (state, action: PayloadAction<PlayerStats>) => {
      return action.payload
    })
})

export { getGames }
export default playerStats.reducer
