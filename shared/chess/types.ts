import { Pos } from '.'
import { Piece } from './model/pieces'

export type PieceType = Piece | null

export type Color = 'white' | 'black'

export type Row = PieceType[]

export type BoardType = Array<Row>

export type Direction = {
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

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = Array<Array<MockPiece>>
