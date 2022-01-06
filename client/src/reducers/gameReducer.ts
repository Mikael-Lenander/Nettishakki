import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, GameStateChange, GameState } from '../chess';

const initialState: GameState = {
  board: Board.simple(),
  turn: 'white',
  isCheck: false,
  color: 'white',
  moves: []
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<GameStateChange>) => {
      const { moves, turn, isCheck } = action.payload
      moves.forEach(move => {
        state.board[move.newPos.y][move.newPos.x] = { name: move.pieceName, color: move.pieceColor }
        state.board[move.oldPos.y][move.oldPos.x] = null
        state.moves.push(move)
      })
      state.turn = turn
      state.isCheck = isCheck
    }
  }
})

export const { makeMove } = gameSlice.actions
export default gameSlice.reducer