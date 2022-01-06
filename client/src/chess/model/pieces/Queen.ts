import { Color, Direction, PieceName } from "../types"
import { LongRangePiece } from './Piece'

export class Queen extends LongRangePiece {
  name: PieceName = 'queen'
  directions: Direction[] = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ]

  constructor(color: Color, x: number, y: number) {
    super(color, x, y)
  }
}