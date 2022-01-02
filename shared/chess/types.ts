import { Piece } from './model/pieces'

export type PieceType = Piece | null

export type Color = 'white' | 'black'

// export type Pos = {
//   x: number,
//   y: number
// }

export type Row = PieceType[]

export type BoardType = Array<Row>

export type Direction = {
  x: number,
  y: number
}

type MockPiece = null | 0 | '' | 1 | 'x' | 'P'

export type MockBoard = MockPiece[][]