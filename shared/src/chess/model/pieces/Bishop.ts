import { Color, Direction, PieceName } from '../types'
import { LongRangePiece } from './Piece'

export class Bishop extends LongRangePiece {
  name: PieceName = 'bishop'
  directions: Direction[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 }
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }
}
