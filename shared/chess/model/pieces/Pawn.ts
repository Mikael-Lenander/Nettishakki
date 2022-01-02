import { Color } from "../../types"
import { Piece } from './Piece'
import Pos from "../Pos"

export class Pawn extends Piece {

  constructor(color: Color, pos: Pos) {
    super(color, pos)
  }
}