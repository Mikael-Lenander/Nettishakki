import { Color, Direction } from "../../types"
import { Piece } from './Piece'
import Pos from "../Pos"

export class Knight extends Piece {
  directions: Direction[] = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ]

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }
}