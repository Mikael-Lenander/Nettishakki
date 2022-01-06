import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {  Color } from 'shared/chess';
import { SimpleBoard, Board, Turn } from '../chess';

interface GameState {
  board: SimpleBoard,
  turn: Color,
  check: boolean
}

const initialState: GameState = {
  board: Board.simple(),
  turn: 'white',
  check: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<Turn>) => {
      const { oldPos, newPos } = action.payload
      const piece = state.board[oldPos.y][oldPos.x]
      state.board[oldPos.y][oldPos.x] = null
      state.board[newPos.y][newPos.x] = piece
      state.turn = state.turn === 'white' ? 'black' : 'white'
      state.check = false
    }
  }
})

export const { makeMove } = gameSlice.actions
export default gameSlice.reducer