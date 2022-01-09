import { Color, Direction, PieceName } from "../types"
import { LongRangePiece } from './Piece'

export class Rook extends LongRangePiece {
  name: PieceName = 'rook'
  directions: Direction[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }
}