import { Color, Direction } from "../../types"
import { LongRangePiece } from './Piece'
import Pos from "../Pos"

export class Bishop extends LongRangePiece {
  directions: Direction[] = [ 
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 }
   ]

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }
}