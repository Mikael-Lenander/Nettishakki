import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunkWithCustomError } from '../utils'
import { PlayerStats } from 'shared'
import gameApi from '../../api/game'

const initialState: PlayerStats & { fetching: boolean } = {
  games: [],
  gameCounts: {
    victories: 0,
    defeats: 0,
    draws: 0
  },
  fetching: false
}

const getGames = createAsyncThunkWithCustomError('users/games/protected', async () => await gameApi.get())

const playerStats = createSlice({
  name: 'playerStats',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getGames.pending, state => {
        state.fetching = true
      })
      .addCase(getGames.fulfilled, (state, action: PayloadAction<PlayerStats>) => {
        return { ...action.payload, fetching: false }
      })
})

export { getGames }
export default playerStats.reducer
