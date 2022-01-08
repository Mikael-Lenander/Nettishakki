import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, GameStateChange, GameState, Color } from '../../chess'
import { GameOverMessage } from 'shared/types'

const initialState: GameState = {
  id: null,
  active: false,
  board: Board.simple(),
  turn: 'white',
  isCheck: false,
  color: 'black',
  moves: [],
  opponentName: '',
  overMessage: null
}

type NewGame = {
  color: Color,
  gameId: string
}

type StartGame = {
  opponentName: string
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (game, action: PayloadAction<GameStateChange>) => {
      const { moves, turn, isCheck } = action.payload
      moves.forEach(move => {
        game.board[move.newPos.y][move.newPos.x] = { name: move.pieceName, color: move.pieceColor }
        game.board[move.oldPos.y][move.oldPos.x] = null
        game.moves.push(move)
      })
      game.turn = turn
      game.isCheck = isCheck
    },
    initializeGame: (game, action: PayloadAction<NewGame>) => {
      const { color, gameId } = action.payload
      game.color = color
      game.id = gameId
      game.active = false
    },
    startGame: (game, action: PayloadAction<StartGame>) => {
      game.active = true
      game.board = Board.simple()
      game.turn = 'white'
      game.isCheck = false
      game.moves = []
      game.opponentName = action.payload.opponentName
      game.overMessage = null
    },
    gameOver: (game, action: PayloadAction<GameOverMessage>) => {
      game.active = false
      game.overMessage = action.payload
    }
  }
})

export const { makeMove, startGame, initializeGame, gameOver } = gameSlice.actions
export default gameSlice.reducer