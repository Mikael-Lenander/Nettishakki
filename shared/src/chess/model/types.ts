import { Pos } from '..'
import { Piece } from './pieces'
import { GameOverMessage } from '../../types'

export type PieceType = Piece | null

export type SimplePiece = {
  color: Color
  name: PieceName
} | null

export type SimpleBoard = SimplePiece[][]

export type Color = 'white' | 'black'

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
}

export type GameStateChange = {
  moves: Move[]
  isCheck: boolean
  turn: Color
}

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = Array<Array<MockPiece>>
