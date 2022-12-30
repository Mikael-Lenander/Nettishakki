import { Pos } from '..'
import { Piece } from './pieces'
import { GameOverMessage, TimeLeft } from '../../types'

export type PieceType = Piece | null

export type SimplePiece = {
  color: Color
  name: PieceName
  id: string
} | null

export type SimpleBoard = SimplePiece[][]

export const COLORS = ['white', 'black'] as const
export type Color = typeof COLORS[number]

export type Row = PieceType[]

export type BoardType = Array<Row>

export type Direction = {
  x: number
  y: number
}

export type PosType = Direction

export type PosString = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'}`

export type Tuple2 = [number, number]

export type PieceName = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook'

export interface Move {
  pieceName: PieceName
  pieceColor: Color
  pieceId: string
  oldPos: Pos
  newPos: Pos
}

export type Turn = {
  oldPos: Pos
  newPos: Pos
  turn: Color
  isCheck: boolean
}

export interface GameState {
  id: string
  active: boolean
  board: SimpleBoard
  turn: Color
  isCheck: boolean
  color: Color
  moves: Move[]
  opponentName: string
  overMessage: GameOverMessage | null
  drawOffer: {
    sent: boolean
    received: boolean
  }
  timeLeft: TimeLeft
  increment: number
  waitingForOpponent: boolean
  numLastMoves: number
}

export type GameStateChange = {
  moves: Move[]
  isCheck: boolean
  turn: Color
  timeLeft: TimeLeft
  delay: number
}

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = Array<Array<MockPiece>>
