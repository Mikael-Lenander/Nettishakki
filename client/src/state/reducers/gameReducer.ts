import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, GameStateChange, Color, GameOverMessage, GameState } from 'shared'

const initialState: GameState = {
  id: null,
  active: false,
  board: Board.simple(),
  turn: 'white',
  isCheck: false,
  color: 'black',
  moves: [],
  opponentName: '',
  overMessage: null,
  drawOffer: {
    sent: false,
    received: false
  }
}

type NewGame = {
  color: Color
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
      game.drawOffer.sent = false
      game.drawOffer.received = false
    },
    gameOver: (game, action: PayloadAction<GameOverMessage>) => {
      game.active = false
      game.overMessage = action.payload
    },
    offerDraw: game => {
      game.drawOffer.sent = true
    },
    drawOffered: game => {
      game.drawOffer.received = true
    },
    resetDrawOffers: game => {
      game.drawOffer.received = false
      game.drawOffer.sent = false
    }
  }
})

export const { makeMove, startGame, initializeGame, gameOver, offerDraw, drawOffered, resetDrawOffers } = gameSlice.actions
export default gameSlice.reducer
