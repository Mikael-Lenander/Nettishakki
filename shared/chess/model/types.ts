import { Pos } from '..'
import { Piece } from './pieces'

export type PieceType = Piece | null

export type SimplePiece = {
  color: Color,
  name: PieceName
} | null

export type SimpleBoard = SimplePiece[][]

export type Color = 'white' | 'black'

export type Row = PieceType[]

export type BoardType = Array<Row>

export type Direction = {
  x: number,
  y: number
}

export type PosType = Direction

export type Tuple2 = [number, number]

export type PieceName = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook'

export interface Move {
  pieceName: PieceName,
  pieceColor: Color,
  oldPos: Pos,
  newPos: Pos
}

export type Turn = {
  oldPos: Pos,
  newPos: Pos,
  turn: Color,
  check: boolean
}

export interface GameState {
  board: SimpleBoard,
  turn: Color,
  isCheck: boolean,
  color: Color,
  moves: Move[]
}

export type GameStateChange = {
  moves: Move[],
  isCheck: boolean,
  turn: Color
}

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = Array<Array<MockPiece>>
