import { Color, Direction } from "../../types"
import { Piece } from './Piece'
import Pos from "../Pos"

export class King extends Piece {
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

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }
}