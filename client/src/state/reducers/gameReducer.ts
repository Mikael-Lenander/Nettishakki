import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, GameStateChange, Color, GameOverMessage, GameState, TimeLeft, TimeControl } from 'shared'

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
  },
  timeLeft: {
    white: 0,
    black: 0
  },
  increment: 0,
  waitingForOpponent: false
}

type NewGame = {
  color: Color
  gameId: string
  timeControl: TimeControl
}

type StartGame = {
  opponentName: string
}

type GameOver = {
  overMessage: GameOverMessage
  timeLeft: TimeLeft
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (game, action: PayloadAction<GameStateChange>) => {
      const { moves, turn, isCheck, timeLeft, delay } = action.payload
      moves.forEach(move => {
        game.board[move.newPos.y][move.newPos.x] = { name: move.pieceName, color: move.pieceColor }
        game.board[move.oldPos.y][move.oldPos.x] = null
        game.moves.push(move)
      })
      game.isCheck = isCheck
      game.timeLeft = timeLeft
      if (game.moves.length > 1) {
        game.timeLeft[game.turn] += delay
        console.log(`delay ${delay} added to ${game.turn}`)
      } else {
        console.log(`delay not added to ${game.turn}`)
      }
      game.turn = turn
      console.log('time left', game.timeLeft)
    },
    initializeGame: (game, action: PayloadAction<NewGame>) => {
      const { color, gameId, timeControl } = action.payload
      game.color = color
      game.id = gameId
      game.active = false
      game.increment = timeControl.increment
      game.timeLeft.white = timeControl.time
      game.timeLeft.black = timeControl.time
      game.waitingForOpponent = true
    },
    startGame: (game, action: PayloadAction<StartGame>) => {
      const { opponentName } = action.payload
      game.active = true
      game.board = Board.simple()
      game.turn = 'white'
      game.isCheck = false
      game.moves = []
      game.opponentName = opponentName
      game.overMessage = null
      game.drawOffer.sent = false
      game.drawOffer.received = false
      game.waitingForOpponent = false
    },
    gameOver: (game, action: PayloadAction<GameOver>) => {
      const { overMessage, timeLeft } = action.payload
      game.active = false
      game.overMessage = overMessage
      if (timeLeft) game.timeLeft = timeLeft
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
    },
    changeTime: (game, action: PayloadAction<{ delta: number; color: Color }>) => {
      const { delta, color } = action.payload
      game.timeLeft[color] += delta
    },
    setTimers: (game, action: PayloadAction<TimeLeft>) => {
      game.timeLeft = action.payload
    }
  }
})

export const { makeMove, startGame, initializeGame, gameOver, offerDraw, drawOffered, resetDrawOffers, changeTime, setTimers } =
  gameSlice.actions
export default gameSlice.reducer
