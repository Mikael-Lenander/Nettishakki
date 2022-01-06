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

export type PosType = {
  x: number,
  y: number
}

export type Tuple2 = [number, number]

export type PieceName = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook'

export interface Move {
  pieceName: PieceName,
  pieceColor: Color,
  oldPos: Pos,
  newPos: Pos
}

export type Turn = {
  oldPos: PosType,
  newPos: PosType,
}

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = Array<Array<MockPiece>>
