import { Color, Move, PosType } from '../chess'
import { Info, GameOverMessage, TimeLeft, TimeControl } from './game'

export interface ServerToClientEvents {
  moveMade: (moves: Move[], isCheck: boolean, turn: Color, timeLeft: TimeLeft, date?: number) => void
  gameCreated: (info: Info, color?: Color, gameId?: string, timeControl?: TimeControl) => void
  joinedGame: (info: Info, opponentName?: string, color?: Color, gameId?: string, timeControl?: TimeControl) => void
  gameOver: (message: GameOverMessage, timeLeft?: TimeLeft) => void
  drawOffered: () => void
  drawOfferResponded: (accepted: boolean) => void
  getTime: (timeLeft: TimeLeft) => void
}

export interface ClientToServerEvents {
  makeMove: (oldPos: PosType, newPos: PosType, date?: number) => void
  createGame: (timeControl: TimeControl) => void
  joinGame: (gameId: string) => void
  resign: () => void
  offerDraw: () => void
  drawOfferResponse: (accepted: boolean) => void
  addDelayToTimer: (delay: number) => void
}
