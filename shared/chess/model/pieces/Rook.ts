import { Color, Direction } from "../../types"
import { LongRangePiece } from './Piece'
import Pos from "../Pos"

export class Rook extends LongRangePiece {
  directions: Direction[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ]

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }
}